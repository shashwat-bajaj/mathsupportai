'use client';

import { useEffect, useMemo, useState } from 'react';
import { compileGraphExpression, sampleGraph } from '@/lib/graphing';

type GraphSuccess = {
  ok: true;
  label: string;
  points: Array<{ x: number; y: number }>;
  xMin: number;
  xMax: number;
  autoYMin: number;
  autoYMax: number;
};

type GraphFailure = {
  ok: false;
  error: string;
};

const DEFAULT_X_MIN = -10;
const DEFAULT_X_MAX = 10;
const DEFAULT_ZOOM = 1;

function formatTick(value: number, span: number) {
  if (Math.abs(value) < 0.0000001) return '0';

  const roundedInteger = Math.round(value);
  if (Math.abs(value - roundedInteger) < 0.0000001) {
    return String(roundedInteger);
  }

  if (span <= 4) {
    return Number(value.toFixed(2)).toString();
  }

  if (span <= 20) {
    return Number(value.toFixed(1)).toString();
  }

  return Number(value.toFixed(0)).toString();
}

function buildTicks(min: number, max: number, count = 6) {
  const ticks: number[] = [];
  for (let i = 0; i <= count; i += 1) {
    ticks.push(min + ((max - min) * i) / count);
  }
  return ticks;
}

function zoomToFactor(factor: number) {
  return Math.min(Math.max(factor, 0.5), 3);
}

export default function FunctionGraph({ expression }: { expression: string }) {
  const [xMin, setXMin] = useState(DEFAULT_X_MIN);
  const [xMax, setXMax] = useState(DEFAULT_X_MAX);
  const [yMin, setYMin] = useState(-10);
  const [yMax, setYMax] = useState(10);
  const [manualY, setManualY] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM);

  useEffect(() => {
    setXMin(DEFAULT_X_MIN);
    setXMax(DEFAULT_X_MAX);
    setManualY(false);
    setZoomLevel(DEFAULT_ZOOM);
  }, [expression]);

  const graph = useMemo<GraphSuccess | GraphFailure>(() => {
    try {
      if (!Number.isFinite(xMin) || !Number.isFinite(xMax)) {
        throw new Error('Enter valid x-range values.');
      }

      if (xMin >= xMax) {
        throw new Error('X min must be smaller than X max.');
      }

      const compiled = compileGraphExpression(expression);
      const sampled = sampleGraph(compiled.evaluate, xMin, xMax);

      return {
        ok: true,
        label: compiled.label,
        points: sampled.points,
        xMin: sampled.xMin,
        xMax: sampled.xMax,
        autoYMin: sampled.yMin,
        autoYMax: sampled.yMax
      };
    } catch (error: any) {
      return {
        ok: false,
        error: error?.message || 'Could not graph this expression.'
      };
    }
  }, [expression, xMin, xMax]);

  useEffect(() => {
    if (graph.ok && !manualY) {
      setYMin(Number(graph.autoYMin.toFixed(2)));
      setYMax(Number(graph.autoYMax.toFixed(2)));
    }
  }, [graph, manualY]);

  function resetView() {
    setXMin(DEFAULT_X_MIN);
    setXMax(DEFAULT_X_MAX);
    setManualY(false);
    setZoomLevel(DEFAULT_ZOOM);
  }

  function fitY() {
    if (!graph.ok) return;
    setManualY(false);
    setYMin(Number(graph.autoYMin.toFixed(2)));
    setYMax(Number(graph.autoYMax.toFixed(2)));
  }

  function applyZoom(nextZoom: number) {
    const safeZoom = zoomToFactor(nextZoom);
    const center = (xMin + xMax) / 2;
    const baseHalfRange = (DEFAULT_X_MAX - DEFAULT_X_MIN) / 2;
    const nextHalfRange = baseHalfRange / safeZoom;

    setZoomLevel(safeZoom);
    setXMin(Number((center - nextHalfRange).toFixed(4)));
    setXMax(Number((center + nextHalfRange).toFixed(4)));
  }

  function zoomBy(factor: number) {
    const currentHalfRange = (xMax - xMin) / 2;
    const baseHalfRange = (DEFAULT_X_MAX - DEFAULT_X_MIN) / 2;
    const nextHalfRange = currentHalfRange * factor;
    const inferredZoom = baseHalfRange / nextHalfRange;
    applyZoom(inferredZoom);
  }

  if (!expression.trim()) return null;

  if (!graph.ok) {
    return (
      <div className="card graphCard">
        <h3 style={{ margin: 0 }}>Graph</h3>
        <p className="small">{graph.error}</p>
      </div>
    );
  }

  if (!Number.isFinite(yMin) || !Number.isFinite(yMax) || yMin >= yMax) {
    return (
      <div className="card graphCard">
        <div className="graphHeader">
          <h3 style={{ margin: 0 }}>Graph</h3>
          <span className="small">{graph.label}</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12
          }}
        >
          <div>
            <label>X min</label>
            <input
              type="number"
              step="any"
              value={xMin}
              onChange={(e) => setXMin(Number(e.target.value))}
            />
          </div>

          <div>
            <label>X max</label>
            <input
              type="number"
              step="any"
              value={xMax}
              onChange={(e) => setXMax(Number(e.target.value))}
            />
          </div>

          <div>
            <label>Y min</label>
            <input
              type="number"
              step="any"
              value={yMin}
              onChange={(e) => {
                setManualY(true);
                setYMin(Number(e.target.value));
              }}
            />
          </div>

          <div>
            <label>Y max</label>
            <input
              type="number"
              step="any"
              value={yMax}
              onChange={(e) => {
                setManualY(true);
                setYMax(Number(e.target.value));
              }}
            />
          </div>
        </div>

        <div className="buttonRow">
          <button type="button" className="secondary" onClick={resetView}>
            Reset
          </button>
        </div>

        <p className="small">Y min must be smaller than Y max.</p>
      </div>
    );
  }

  const width = 680;
  const height = 380;
  const padding = 34;

  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  const mapX = (x: number) =>
    padding + ((x - graph.xMin) / (graph.xMax - graph.xMin)) * plotWidth;

  const mapY = (y: number) =>
    padding + (1 - (y - yMin) / (yMax - yMin)) * plotHeight;

  const path = graph.points
    .map((point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${command}${mapX(point.x).toFixed(2)},${mapY(point.y).toFixed(2)}`;
    })
    .join(' ');

  const xAxisVisible = yMin <= 0 && yMax >= 0;
  const yAxisVisible = graph.xMin <= 0 && graph.xMax >= 0;

  const xAxisY = xAxisVisible ? mapY(0) : null;
  const yAxisX = yAxisVisible ? mapX(0) : null;

  const xTicks = buildTicks(graph.xMin, graph.xMax, 6);
  const yTicks = buildTicks(yMin, yMax, 6);

  const clipId = `graph-clip-${expression.replace(/[^a-z0-9]/gi, '').slice(0, 24) || 'plot'}`;
  const xSpan = graph.xMax - graph.xMin;
  const ySpan = yMax - yMin;

  return (
    <div className="card graphCard">
      <div className="graphHeader">
        <h3 style={{ margin: 0 }}>Graph</h3>
        <span className="small">{graph.label}</span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 12
        }}
      >
        <div>
          <label>X min</label>
          <input
            type="number"
            step="any"
            value={xMin}
            onChange={(e) => setXMin(Number(e.target.value))}
          />
        </div>

        <div>
          <label>X max</label>
          <input
            type="number"
            step="any"
            value={xMax}
            onChange={(e) => setXMax(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Y min</label>
          <input
            type="number"
            step="any"
            value={yMin}
            onChange={(e) => {
              setManualY(true);
              setYMin(Number(e.target.value));
            }}
          />
        </div>

        <div>
          <label>Y max</label>
          <input
            type="number"
            step="any"
            value={yMax}
            onChange={(e) => {
              setManualY(true);
              setYMax(Number(e.target.value));
            }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        <label style={{ marginBottom: 0 }}>Zoom</label>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          value={zoomLevel}
          onChange={(e) => applyZoom(Number(e.target.value))}
        />
      </div>

      <div className="buttonRow">
        <button type="button" className="secondary" onClick={() => zoomBy(0.7)}>
          Zoom In
        </button>
        <button type="button" className="secondary" onClick={() => zoomBy(1.4)}>
          Zoom Out
        </button>
        <button type="button" className="secondary" onClick={fitY}>
          Fit Y
        </button>
        <button type="button" className="secondary" onClick={resetView}>
          Reset
        </button>
      </div>

      <div className="graphFrame">
        <svg viewBox={`0 0 ${width} ${height}`} className="graphSvg" aria-label={graph.label}>
          <defs>
            <clipPath id={clipId}>
              <rect x={padding} y={padding} width={plotWidth} height={plotHeight} rx="12" />
            </clipPath>
          </defs>

          <rect
            x={padding}
            y={padding}
            width={plotWidth}
            height={plotHeight}
            fill="none"
            stroke="var(--border)"
            rx="12"
          />

          {xTicks.map((tick) => {
            const x = mapX(tick);
            return (
              <g key={`x-grid-${tick}`}>
                <line
                  x1={x}
                  y1={padding}
                  x2={x}
                  y2={height - padding}
                  stroke="var(--border)"
                  opacity="0.45"
                />
                <text
                  x={x}
                  y={height - padding + 18}
                  fontSize="11"
                  textAnchor="middle"
                  fill="var(--text-soft)"
                >
                  {formatTick(tick, xSpan)}
                </text>
              </g>
            );
          })}

          {yTicks.map((tick) => {
            const y = mapY(tick);
            return (
              <g key={`y-grid-${tick}`}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="var(--border)"
                  opacity="0.45"
                />
                <text
                  x={padding - 8}
                  y={y + 4}
                  fontSize="11"
                  textAnchor="end"
                  fill="var(--text-soft)"
                >
                  {formatTick(tick, ySpan)}
                </text>
              </g>
            );
          })}

          {xAxisY !== null ? (
            <line
              x1={padding}
              y1={xAxisY}
              x2={width - padding}
              y2={xAxisY}
              stroke="var(--text)"
              opacity="0.85"
              strokeWidth="1.5"
            />
          ) : null}

          {yAxisX !== null ? (
            <line
              x1={yAxisX}
              y1={padding}
              x2={yAxisX}
              y2={height - padding}
              stroke="var(--text)"
              opacity="0.85"
              strokeWidth="1.5"
            />
          ) : null}

          {path ? (
            <path
              d={path}
              clipPath={`url(#${clipId})`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}

          <text
            x={width - padding + 6}
            y={xAxisY !== null ? xAxisY - 6 : height - padding - 6}
            fontSize="12"
            fill="var(--text)"
          >
            x
          </text>

          <text
            x={yAxisX !== null ? yAxisX + 6 : padding + 6}
            y={padding - 8}
            fontSize="12"
            fill="var(--text)"
          >
            y
          </text>
        </svg>
      </div>

      <p className="small">
        Use the zoom slider or buttons to inspect the graph more closely, then use Fit Y or Reset
        to return to a cleaner view.
      </p>
    </div>
  );
}