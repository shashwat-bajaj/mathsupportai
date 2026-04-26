export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/math`, lastModified: new Date() },
    { url: `${base}/math/tutor`, lastModified: new Date() },
    { url: `${base}/math/parents`, lastModified: new Date() },
    { url: `${base}/math/pricing`, lastModified: new Date() },
    { url: `${base}/login`, lastModified: new Date() }
  ];
}