import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TutoVera',
    short_name: 'TutoVera',
    description:
      'A calm AI learning platform for Math, Physics, Chemistry, and Biology.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#101426',
    theme_color: '#101426',
    categories: ['education', 'productivity'],
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any'
      }
    ]
  };
}