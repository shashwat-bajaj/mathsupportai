export default function BrandMark() {
  return (
    <a href="/" className="brandLink" aria-label="MathSupport AI home">
      <span
        className="brandBadge"
        style={{
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <span
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.18), transparent 55%)',
            pointerEvents: 'none'
          }}
        />
        <span style={{ position: 'relative' }}>∑</span>
      </span>

      <span className="brandText">
        <span className="brandTitle">MathSupport AI</span>
        <span className="brandSubtitle">Clearer math, step by step</span>
      </span>
    </a>
  );
}