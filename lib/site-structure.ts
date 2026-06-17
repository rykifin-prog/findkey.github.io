export type Role = 'public' | 'member' | 'admin';

export type NavigationGroup = 'public' | 'utility' | 'member' | 'admin';

export type NavigationItem = {
  label: string;
  path: string;
  role: Role;
};

export type RouteDefinition = {
  path: string;
  componentName: string;
  authRequired: boolean;
  role: Role;
};

export const NAVIGATION = {
  public: [
    { label: 'Home', path: '/', role: 'public' },
    { label: 'Method', path: '/method', role: 'public' },
    { label: 'Briefs', path: '/briefs', role: 'public' },
  ],
  utility: [{ label: 'Sign in', path: '/signin', role: 'public' }],
  member: [{ label: 'Account', path: '/account', role: 'member' }],
  admin: [{ label: 'Editor', path: '/editor', role: 'admin' }],
} as const satisfies Record<NavigationGroup, readonly NavigationItem[]>;

export const ROUTES = [
  { path: '/', componentName: 'HomePage', authRequired: false, role: 'public' },
  {
    path: '/method',
    componentName: 'MethodPage',
    authRequired: false,
    role: 'public',
  },
  {
    path: '/briefs',
    componentName: 'BriefsIndexPage',
    authRequired: false,
    role: 'public',
  },
  {
    path: '/briefs/[slug]',
    componentName: 'BriefPage',
    authRequired: false,
    role: 'public',
  },
  {
    path: '/join',
    componentName: 'JoinPage',
    authRequired: false,
    role: 'public',
  },
  {
    path: '/signin',
    componentName: 'SignInPage',
    authRequired: false,
    role: 'public',
  },
  {
    path: '/account',
    componentName: 'AccountPage',
    authRequired: true,
    role: 'member',
  },
  {
    path: '/editor',
    componentName: 'EditorPage',
    authRequired: true,
    role: 'admin',
  },
  {
    path: '/editor/[id]',
    componentName: 'EditorEntryPage',
    authRequired: true,
    role: 'admin',
  },
] as const satisfies readonly RouteDefinition[];
