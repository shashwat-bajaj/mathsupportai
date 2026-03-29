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
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: 10
      }}
    >
      <div
        style={{
          display: 'grid',
          gap: 8
        }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>

        <div
          className="small"
          style={{
            margin: 0,
            minHeight: '2.8em',
            lineHeight: 1.4
          }}
        >
          {description}
        </div>
      </div>

      <div
        className="buttonRow"
        style={{
          marginTop: 'auto',
          paddingTop: 4
        }}
      >
        {action}
      </div>
    </div>
  );
}