'use client';

import { useMemo } from 'react';
import { compileGraphExpression, sampleGraph } from '@/lib/graphing';

type GraphSuccess = {
  ok: true;
  label: string;
  points: Array<{ x: number; y: number }>;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

type GraphFailure = {
  ok: false;
  error: string;
};

function formatTick(value: number) {
  if (Math.abs(value) < 0.00001) return '0';
  return Number(value.toFixed(2)).toString();
}

function buildTicks(min: number, max: number, count = 6) {
  const ticks: number[] = [];
  for (let i = 0; i <= count; i += 1) {
    ticks.push(min + ((max - min) * i) / count);
  }
  return ticks;
}

export default function FunctionGraph({ expression }: { expression: string }) {
  const graph = useMemo<GraphSuccess | GraphFailure>(() => {
    try {
      const compiled = compileGraphExpression(expression);
      const sampled = sampleGraph(compiled.evaluate);

      return {
        ok: true,
        label: compiled.label,
        ...sampled
      };
    } catch (error: any) {
      return {
        ok: false,
        error: error?.message || 'Could not graph this expression.'
      };
    }
  }, [expression]);

  if (!expression.trim()) return null;

  if (!graph.ok) {
    return (
      <div className="card graphCard">
        <h3 style={{ margin: 0 }}>Graph</h3>
        <p className="small">{graph.error}</p>
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
    padding + (1 - (y - graph.yMin) / (graph.yMax - graph.yMin)) * plotHeight;

  const path = graph.points
    .map((point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${command}${mapX(point.x).toFixed(2)},${mapY(point.y).toFixed(2)}`;
    })
    .join(' ');

  const xAxisVisible = graph.yMin <= 0 && graph.yMax >= 0;
  const yAxisVisible = graph.xMin <= 0 && graph.xMax >= 0;

  const xAxisY = xAxisVisible ? mapY(0) : null;
  const yAxisX = yAxisVisible ? mapX(0) : null;

  const xTicks = buildTicks(graph.xMin, graph.xMax, 6);
  const yTicks = buildTicks(graph.yMin, graph.yMax, 6);

  return (
    <div className="card graphCard">
      <div className="graphHeader">
        <h3 style={{ margin: 0 }}>Graph</h3>
        <span className="small">{graph.label}</span>
      </div>

      <div className="graphFrame">
        <svg viewBox={`0 0 ${width} ${height}`} className="graphSvg" aria-label={graph.label}>
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
                  {formatTick(tick)}
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
                  {formatTick(tick)}
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

          <path
            d={path}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

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
        Graphing appears when you explicitly ask to graph or plot a function. Use <code>*</code>
        for multiplication where needed, such as <code>2*x</code>.
      </p>
    </div>
  );
}