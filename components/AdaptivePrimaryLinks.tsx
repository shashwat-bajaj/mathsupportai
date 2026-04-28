'use client';

import { usePathname } from 'next/navigation';

type ActiveSubjectNav = {
  key: 'math' | 'physics';
  basePath: string;
  label: string;
};

const tutoveraLinks = [
  { href: '/', label: 'TutoVera' },
  { href: '/math', label: 'Math' },
  { href: '/physics', label: 'Physics' },
  { href: '/chemistry', label: 'Chemistry' },
  { href: '/biology', label: 'Biology' }
];

function getActiveSubjectNav(pathname: string): ActiveSubjectNav | null {
  if (pathname === '/math' || pathname.startsWith('/math/')) {
    return {
      key: 'math',
      basePath: '/math',
      label: 'Math'
    };
  }

  if (pathname === '/physics' || pathname.startsWith('/physics/')) {
    return {
      key: 'physics',
      basePath: '/physics',
      label: 'Physics'
    };
  }

  return null;
}

function getSubjectProductLinks(subject: ActiveSubjectNav) {
  const links = [
    { href: subject.basePath, label: subject.label },
    { href: `${subject.basePath}/tutor`, label: 'Students' },
    { href: `${subject.basePath}/parents`, label: 'Parents' },
    { href: `${subject.basePath}/history`, label: 'History' }
  ];

  if (subject.key === 'math') {
    links.push({ href: '/math/about', label: 'About' });
  }

  links.push({ href: '/contact', label: 'Contact' });

  return links;
}

export default function AdaptivePrimaryLinks() {
  const pathname = usePathname();
  const activeSubject = getActiveSubjectNav(pathname);
  const links = activeSubject ? getSubjectProductLinks(activeSubject) : tutoveraLinks;

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