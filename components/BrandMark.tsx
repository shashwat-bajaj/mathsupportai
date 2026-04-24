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
              'radial-gradient(circle at 30% 28%, rgba(255,255,255,0.22), transparent 36%), linear-gradient(135deg, rgba(255,255,255,0.16), transparent 58%)',
            pointerEvents: 'none'
          }}
        />
        <span
          style={{
            position: 'absolute',
            inset: 7,
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.14)',
            pointerEvents: 'none'
          }}
        />
        <span
          style={{
            position: 'relative',
            fontSize: '1rem',
            letterSpacing: '-0.02em'
          }}
        >
          ∑
        </span>
      </span>

      <span className="brandText">
        <span className="brandTitle">MathSupport AI</span>
        <span className="brandSubtitle">Clearer math, step by step</span>
      </span>
    </a>
  );
}