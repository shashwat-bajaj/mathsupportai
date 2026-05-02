import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 180,
  height: 180
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '180px',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '42px',
          background:
            'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.32), transparent 34%), linear-gradient(135deg, #5b4fd8 0%, #29315f 48%, #13382f 100%)',
          color: '#f8f3ea',
          boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.16)'
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 62,
            fontWeight: 850,
            letterSpacing: '-0.09em',
            transform: 'translateX(-2px)'
          }}
        >
          TV
        </div>
      </div>
    ),
    size
  );
}