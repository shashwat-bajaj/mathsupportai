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

export function normalizeGraphExpression(input: string) {
  let expr = input.trim();

  expr = expr.replace(/[−–—]/g, '-');
  expr = expr.replace(/^f\s*\(\s*x\s*\)\s*=\s*/i, '');
  expr = expr.replace(/^y\s*=\s*/i, '');
  expr = expr.replace(/^=\s*/, '');
  expr = expr.replace(/^["'`]+|["'`]+$/g, '');

  return expr.trim();
}

export function isExplicitGraphRequest(input: string) {
  return /\b(graph|plot|draw|show\s+the\s+graph|show\s+the\s+plot|sketch)\b/i.test(input);
}

function cleanExtractedExpression(input: string) {
  let candidate = input.trim();

  candidate = candidate.split('\n')[0].trim();
  candidate = candidate.replace(/[.?!]+$/, '').trim();
  candidate = candidate.replace(/^["'`]+|["'`]+$/g, '');
  candidate = candidate.replace(/\s{2,}/g, ' ');

  return normalizeGraphExpression(candidate);
}

function looksGraphable(candidate: string) {
  return (
    /x/i.test(candidate) ||
    /\b(sin|cos|tan|sqrt|log|ln|exp)\b/i.test(candidate)
  );
}

function stripTrailingGraphWords(candidate: string) {
  return candidate
    .replace(/\b(and\s+)?graph(?:\s+the\s+function)?\b.*$/i, '')
    .replace(/\b(and\s+)?plot(?:\s+the\s+function)?\b.*$/i, '')
    .replace(/\b(and\s+)?draw(?:\s+the\s+function)?\b.*$/i, '')
    .trim();
}

export function extractGraphExpressionFromPrompt(input: string) {
  const text = input.trim();

  // 1. Standard y= or f(x)= forms
  const equationMatch = text.match(/(?:y\s*=|f\s*\(\s*x\s*\)\s*=)\s*([^\n]+)/i);
  if (equationMatch?.[1]) {
    return cleanExtractedExpression(stripTrailingGraphWords(equationMatch[1]));
  }

  // 2. Prompts like "Solve x^2 - 5x + 6 = 0 and graph the function"
  const solveAndGraphMatch = text.match(
    /\bsolve\s+(.+?)\s*=\s*0\b.*\b(graph|plot|draw|sketch)\b/i
  );
  if (solveAndGraphMatch?.[1]) {
    const candidate = cleanExtractedExpression(solveAndGraphMatch[1]);
    if (looksGraphable(candidate)) return candidate;
  }

  // 3. General explicit graph requests
  if (!isExplicitGraphRequest(text)) return '';

  // 4. "graph x^2 - 5x + 6", "plot sin(x)", etc.
  const graphOfMatch = text.match(
    /\b(?:graph|plot|draw|sketch|show(?:\s+the)?\s+(?:graph|plot)?)\b(?:\s+of)?\s+([^\n]+)/i
  );
  if (graphOfMatch?.[1]) {
    const candidate = cleanExtractedExpression(stripTrailingGraphWords(graphOfMatch[1]));
    if (looksGraphable(candidate)) return candidate;
  }

  // 5. Fallback: if the prompt has something like "... x^2 - 5x + 6 = 0 ..."
  // and also explicitly asks to graph, use the left-hand side before = 0
  const equalZeroMatch = text.match(/([a-z0-9().+\-*/^\s]*x[a-z0-9().+\-*/^\s]*)\s*=\s*0/i);
  if (equalZeroMatch?.[1]) {
    const candidate = cleanExtractedExpression(equalZeroMatch[1]);
    if (looksGraphable(candidate)) return candidate;
  }

  // 6. Final fallback: grab the first math-like chunk with x
  const mathishMatch = text.match(/([a-z0-9().+\-*/^\s]*x[a-z0-9().+\-*/^\s]*)/i);
  if (mathishMatch?.[1]) {
    let candidate = cleanExtractedExpression(mathishMatch[1]);

    // Remove leading English verbs if they slipped in
    candidate = candidate.replace(/^(solve|graph|plot|draw|sketch)\s+/i, '').trim();

    if (looksGraphable(candidate)) return candidate;
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
  expr = expr.replace(/(\d)\(/g, '$1*(');
  expr = expr.replace(/(x)\(/g, '$1*(');
  expr = expr.replace(/\)(\d|x)/g, ')*$1');
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