'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './site-header.module.css';

const NAV_ITEMS = [
  { href: '/public', label: 'Briefs' },
  { href: '/method', label: 'Method' }
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({ pathname }: { pathname: string }) {
  return (
    <>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={styles.navLink}
          aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary">
        <div className={styles.leftCluster}>
          <Link href="/" className={styles.logo}>
            Findkey
          </Link>
          <div className={styles.desktopLinks}>
            <NavLinks pathname={pathname} />
          </div>
        </div>

        <div className={styles.rightCluster}>
          <Link href="/auth/sign-in" className={styles.signInLink}>
            Sign In
          </Link>
          <Link href="/join" className={styles.joinButton}>
            Join
          </Link>

          <details className={styles.mobileMenu}>
            <summary className={styles.menuTrigger} aria-label="Open menu">
              Menu
            </summary>
            <div className={styles.mobilePanel}>
              <NavLinks pathname={pathname} />
              <Link href="/auth/sign-in" className={styles.navLink}>
                Sign In
              </Link>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
