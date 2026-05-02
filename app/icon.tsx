import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '9px',
          background:
            'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.34), transparent 32%), linear-gradient(135deg, #5b4fd8 0%, #29315f 48%, #13382f 100%)',
          color: '#f8f3ea',
          fontSize: 13,
          fontWeight: 850,
          letterSpacing: '-0.08em'
        }}
      >
        TV
      </div>
    ),
    size
  );
}