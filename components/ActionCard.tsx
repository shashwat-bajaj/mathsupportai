import type { ReactNode } from 'react';

export default function ActionCard({
  title,
  description,
  action
}: {
  title: string;
  description: ReactNode;
  action: ReactNode;
}) {
  return (
    <div
      className="card"
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gap: 14,
        height: '100%',
        minHeight: 220
      }}
    >
      <div style={{ display: 'grid', gap: 8 }}>
        <span className="badge">Action</span>
        <h3 style={{ margin: 0 }}>{title}</h3>
      </div>

      <div
        className="small"
        style={{
          margin: 0,
          lineHeight: 1.6,
          maxWidth: 460
        }}
      >
        {description}
      </div>

      <div
        className="buttonRow"
        style={{
          marginTop: 'auto',
          paddingTop: 10,
          borderTop: '1px solid var(--border)'
        }}
      >
        {action}
      </div>
    </div>
  );
}