import Link from 'next/link';
import { NAVIGATION } from '@/lib/site-structure';

type MainNavProps = {
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const SECTION_ORDER = ['public', 'member', 'admin', 'utility'] as const;

export function MainNav({ isAuthenticated, isAdmin }: MainNavProps) {
  const items = NAVIGATION.filter((item) => {
    if (item.section === 'member') {
      return isAuthenticated;
    }

    if (item.section === 'admin') {
      return isAuthenticated && isAdmin;
    }

    if (item.section === 'utility') {
      return !isAuthenticated;
    }

    return true;
  }).sort((a, b) => SECTION_ORDER.indexOf(a.section) - SECTION_ORDER.indexOf(b.section));

  return (
    <>
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </>
  );
}
