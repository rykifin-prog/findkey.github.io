export type NavSection = 'public' | 'utility' | 'member' | 'admin';

export type NavItem = {
  href: string;
  label: string;
  section: NavSection;
};

// Navigation is intentionally defined here (UI structure), not in content files.
// Brief/content documents should only manage editorial data and never control routes.
export const NAVIGATION: NavItem[] = [
  { href: '/', label: 'Public', section: 'public' },
  { href: '/pricing', label: 'Pricing', section: 'public' },
  { href: '/auth/sign-in', label: 'Sign in', section: 'utility' },
  { href: '/studio', label: 'Studio', section: 'member' },
  { href: '/studio/admin', label: 'Admin', section: 'admin' }
];
