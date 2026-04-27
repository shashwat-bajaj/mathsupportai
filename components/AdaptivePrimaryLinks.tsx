'use client';

import { usePathname } from 'next/navigation';

const solvyqLinks = [
  { href: '/', label: 'Solvyq' },
  { href: '/math', label: 'Math' },
  { href: '/physics', label: 'Physics' },
  { href: '/chemistry', label: 'Chemistry' },
  { href: '/biology', label: 'Biology' }
];

const mathProductLinks = [
  { href: '/', label: 'Home' },
  { href: '/math/tutor', label: 'Students' },
  { href: '/math/parents', label: 'Parents' },
  { href: '/math/history', label: 'History' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export default function AdaptivePrimaryLinks() {
  const pathname = usePathname();
  const links = pathname === '/' ? solvyqLinks : mathProductLinks;

  return (
    <>
      {links.map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
    </>
  );
}