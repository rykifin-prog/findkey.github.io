'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './primary-nav.module.css';

type PrimaryNavProps = {
  isAuthenticated: boolean;
};

type NavItem = {
  href: string;
  label: string;
};

const leftNavItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/method', label: 'Method' },
  { href: '/briefs', label: 'Briefs' },
  { href: '/pricing', label: 'Pricing' }
];

const rightBaseItems: NavItem[] = [{ href: '/studio', label: 'Studio' }];

export default function PrimaryNav({ isAuthenticated }: PrimaryNavProps) {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className={styles.group}>
        {leftNavItems.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} pathname={pathname} />
        ))}
      </div>
      <div className={styles.group}>
        {rightBaseItems.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} pathname={pathname} />
        ))}
        <NavLink
          href={isAuthenticated ? '/studio' : '/auth/sign-in'}
          label={isAuthenticated ? 'Account' : 'Sign in'}
          pathname={pathname}
        />
      </div>
    </nav>
  );
}

function NavLink({ href, label, pathname }: NavItem & { pathname: string }) {
  const isActive = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link className={`${styles.link} ${isActive ? styles.active : ''}`} href={href}>
      {label}
    </Link>
  );
}
