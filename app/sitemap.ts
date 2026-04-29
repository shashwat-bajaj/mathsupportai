import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tutovera.com').replace(/\/$/, '');
  const lastModified = new Date();

  const routes = [
    '/',
    '/about',
    '/contact',
    '/pricing',
    '/privacy',
    '/terms',

    '/math',
    '/math/tutor',
    '/math/parents',
    '/math/history',
    '/math/about',

    '/physics',
    '/physics/tutor',
    '/physics/parents',
    '/physics/history',
    '/physics/about',

    '/chemistry',
    '/chemistry/tutor',
    '/chemistry/parents',
    '/chemistry/history',
    '/chemistry/about',

    '/biology',
    '/biology/tutor',
    '/biology/parents',
    '/biology/history',
    '/biology/about'
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified
  }));
}