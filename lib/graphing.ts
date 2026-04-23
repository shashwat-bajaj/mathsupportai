type GraphPoint = { x: number; y: number };

const ALLOWED_IDENTIFIERS = new Set([
  'x',
  'sin',
  'cos',
  'tan',
  'asin',
  'acos',
  'atan',
  'sqrt',
  'abs',
  'log',
  'ln',
  'exp',
  'floor',
  'ceil',
  'round',
  'min',
  'max',
  'pi',
  'e'
]);

function containsStandaloneX(text: string) {
  return /(^|[^a-z])x([^a-z]|$)/i.test(text);
}

export function normalizeGraphExpression(input: string) {
  let expr = input.trim();

  expr = expr.replace(/[−–—]/g, '-');
  expr = expr.replace(/^f\s*\(\s*x\s*\)\s*=\s*/i, '');
  expr = expr.replace(/^y\s*=\s*/i, '');
  expr = expr.replace(/^=\s*/, '');
  expr = expr.replace(/^["'`$]+|["'`$]+$/g, '');
  expr = expr.replace(/\\left/g, '');
  expr = expr.replace(/\\right/g, '');
  expr = expr.replace(/\s+/g, ' ');

  return expr.trim();
}

export function isExplicitGraphRequest(input: string) {
  return /\b(graph|grpah|plot|draw|show\s+the\s+graph|show\s+the\s+plot|sketch)\b/i.test(
    input
  );
}

export function isGraphReferenceRequest(input: string) {
  return /\b(graph|grpah|plot|sketch|curve)\b/i.test(input);
}

export function isGraphOnlyDisplayRequest(input: string) {
  const text = input.trim();

  const hasGraphWord =
    /\b(graph|grpah|plot|draw|sketch|show\s+the\s+graph|show\s+the\s+plot)\b/i.test(text);

  const asksForExplanation =
    /\b(explain|describe|what does|how does|why does|meaning|interpret)\b/i.test(text);

  const otherStrongIntent =
    /\b(solve|factor|simplify|differentiate|derivative|integrate|integral|diagnose|quiz|hint|teach)\b/i.test(
      text
    );

  return hasGraphWord && !asksForExplanation && !otherStrongIntent;
}

function cleanExtractedExpression(input: string) {
  let candidate = input.trim();

  candidate = candidate.split('\n')[0].trim();
  candidate = candidate.replace(/[.?!]+$/, '').trim();
  candidate = candidate.replace(/^["'`$]+|["'`$]+$/g, '');
  candidate = candidate.replace(/\s{2,}/g, ' ');

  return normalizeGraphExpression(candidate);
}

function looksGraphable(candidate: string) {
  const cleaned = normalizeGraphExpression(candidate);

  return containsStandaloneX(cleaned) || /\b(sin|cos|tan|sqrt|log|ln|exp)\b/i.test(cleaned);
}

function stripTrailingGraphWords(candidate: string) {
  return candidate
    .replace(/\b(and\s+)?graph(?:\s+the\s+function)?\b.*$/i, '')
    .replace(/\b(and\s+)?grpah(?:\s+the\s+function)?\b.*$/i, '')
    .replace(/\b(and\s+)?plot(?:\s+the\s+function)?\b.*$/i, '')
    .replace(/\b(and\s+)?draw(?:\s+the\s+function)?\b.*$/i, '')
    .replace(/\b(and\s+)?sketch(?:\s+the\s+function)?\b.*$/i, '')
    .trim();
}

function stripLeadingEnglishWords(candidate: string) {
  return candidate
    .replace(/^(solve|graph|grpah|plot|draw|sketch|find|show|consider|given)\s+/i, '')
    .replace(/^(the|function|equation)\s+/i, '')
    .trim();
}

function maybeReturnGraphable(candidate: string) {
  let cleaned = stripLeadingEnglishWords(
    cleanExtractedExpression(stripTrailingGraphWords(candidate))
  );

  const equalZeroMatch = cleaned.match(/^(.+?)\s*=\s*0$/i);
  if (equalZeroMatch?.[1]) {
    const leftSide = normalizeGraphExpression(equalZeroMatch[1].trim());
    if (looksGraphable(leftSide)) {
      cleaned = leftSide;
    }
  }

  if (cleaned.includes('=')) {
    return '';
  }

  return looksGraphable(cleaned) ? cleaned : '';
}

function isPureMathishExpression(text: string) {
  const cleaned = normalizeGraphExpression(text);

  if (!cleaned || cleaned.length > 80 || /\n/.test(cleaned)) return false;

  return /^[a-z0-9().+\-*/^\s=]+$/i.test(cleaned) && looksGraphable(cleaned);
}

export function extractRememberedGraphExpression(input: string) {
  const text = input.trim();
  if (!text) return '';

  const explicit = extractGraphExpressionFromPrompt(text);
  if (explicit) return explicit;

  if (isPureMathishExpression(text)) {
    return maybeReturnGraphable(text);
  }

  const equationMatch = text.match(/(?:y\s*=|f\s*\(\s*x\s*\)\s*=)\s*([^\n]+)/i);
  if (equationMatch?.[1]) {
    const candidate = maybeReturnGraphable(equationMatch[1]);
    if (candidate) return candidate;
  }

  const equalZeroMatch = text.match(
    /([a-z0-9().+\-*/^\s]*(?:x|sin|cos|tan|sqrt|log|ln|exp)[a-z0-9().+\-*/^\s]*)\s*=\s*0\b/i
  );
  if (equalZeroMatch?.[1]) {
    const candidate = maybeReturnGraphable(equalZeroMatch[1]);
    if (candidate) return candidate;
  }

  return '';
}

export function extractGraphExpressionFromPrompt(input: string) {
  const text = input.trim();

  if (!text) return '';

  const equationMatch = text.match(/(?:y\s*=|f\s*\(\s*x\s*\)\s*=)\s*([^\n]+)/i);
  if (equationMatch?.[1]) {
    const candidate = maybeReturnGraphable(equationMatch[1]);
    if (candidate) return candidate;
  }

  const solveAndGraphMatch = text.match(
    /\bsolve\s+(.+?)\s*=\s*0\b.*\b(graph|grpah|plot|draw|sketch)\b/i
  );
  if (solveAndGraphMatch?.[1]) {
    const candidate = maybeReturnGraphable(solveAndGraphMatch[1]);
    if (candidate) return candidate;
  }

  if (!isExplicitGraphRequest(text)) return '';

  const graphOfMatch = text.match(
    /\b(?:graph|grpah|plot|draw|sketch|show(?:\s+the)?\s+(?:graph|plot)?)\b(?:\s+of)?\s+([^\n]+)/i
  );
  if (graphOfMatch?.[1]) {
    const candidate = maybeReturnGraphable(graphOfMatch[1]);
    if (candidate) return candidate;
  }

  const equalZeroMatch = text.match(
    /([a-z0-9().+\-*/^\s]*(?:x|sin|cos|tan|sqrt|log|ln|exp)[a-z0-9().+\-*/^\s]*)\s*=\s*0/i
  );
  if (equalZeroMatch?.[1]) {
    const candidate = maybeReturnGraphable(equalZeroMatch[1]);
    if (candidate) return candidate;
  }

  const mathishMatch = text.match(
    /([a-z0-9().+\-*/^\s]*(?:x|sin|cos|tan|sqrt|log|ln|exp)[a-z0-9().+\-*/^\s]*)/i
  );
  if (mathishMatch?.[1]) {
    const candidate = maybeReturnGraphable(mathishMatch[1]);
    if (candidate) return candidate;
  }

  return '';
}

export function compileGraphExpression(input: string) {
  const normalized = normalizeGraphExpression(input);

  if (!normalized) {
    throw new Error('Enter a function like y = x^2 - 5*x + 6');
  }

  const identifiers = normalized.toLowerCase().match(/[a-z_]+/g) || [];
  for (const identifier of identifiers) {
    if (!ALLOWED_IDENTIFIERS.has(identifier)) {
      throw new Error(`Unsupported graph expression: "${identifier}"`);
    }
  }

  let expr = normalized.toLowerCase().replace(/\s+/g, '');

  expr = expr.replace(/(\d)(x)/g, '$1*$2');
  expr = expr.replace(/(\d)([a-z])/g, '$1*$2');
  expr = expr.replace(/(\d)\(/g, '$1*(');
  expr = expr.replace(/(x)\(/g, '$1*(');
  expr = expr.replace(/\)(\d|x)/g, ')*$1');
  expr = expr.replace(/\)([a-z])/g, ')*$1');
  expr = expr.replace(/\^/g, '**');

  expr = expr.replace(/\bpi\b/g, 'Math.PI');
  expr = expr.replace(/\be\b/g, 'Math.E');

  expr = expr.replace(/\bsin\b/g, 'Math.sin');
  expr = expr.replace(/\bcos\b/g, 'Math.cos');
  expr = expr.replace(/\btan\b/g, 'Math.tan');
  expr = expr.replace(/\basin\b/g, 'Math.asin');
  expr = expr.replace(/\bacos\b/g, 'Math.acos');
  expr = expr.replace(/\batan\b/g, 'Math.atan');
  expr = expr.replace(/\bsqrt\b/g, 'Math.sqrt');
  expr = expr.replace(/\babs\b/g, 'Math.abs');
  expr = expr.replace(/\blog\b/g, 'Math.log10');
  expr = expr.replace(/\bln\b/g, 'Math.log');
  expr = expr.replace(/\bexp\b/g, 'Math.exp');
  expr = expr.replace(/\bfloor\b/g, 'Math.floor');
  expr = expr.replace(/\bceil\b/g, 'Math.ceil');
  expr = expr.replace(/\bround\b/g, 'Math.round');
  expr = expr.replace(/\bmin\b/g, 'Math.min');
  expr = expr.replace(/\bmax\b/g, 'Math.max');

  const evaluator = new Function(
    'x',
    `"use strict"; return (${expr});`
  ) as (x: number) => number;

  return {
    label: `y = ${normalized}`,
    evaluate: (x: number) => {
      const y = evaluator(x);
      return Number(y);
    }
  };
}

export function sampleGraph(
  evaluate: (x: number) => number,
  xMin = -10,
  xMax = 10,
  samples = 401
) {
  const points: GraphPoint[] = [];

  for (let i = 0; i < samples; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / (samples - 1);
    const y = evaluate(x);

    if (Number.isFinite(y) && Math.abs(y) < 1_000_000) {
      points.push({ x, y });
    }
  }

  if (points.length < 2) {
    throw new Error('Could not generate enough graph points.');
  }

  let yMin = Math.min(...points.map((p) => p.y));
  let yMax = Math.max(...points.map((p) => p.y));

  if (yMin === yMax) {
    yMin -= 1;
    yMax += 1;
  }

  const padding = (yMax - yMin) * 0.12;
  yMin -= padding;
  yMax += padding;

  return {
    points,
    xMin,
    xMax,
    yMin,
    yMax
  };
}