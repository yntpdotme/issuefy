/**
 * An array of routes that are accessible to the public.
 * These routes do ont require authentication.
 * @type {string[]}
 */
export const publicRoutes: string[] = ['/', '/dashboard', '/issues'];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /settings.
 * @type {string[]}
 */
export const authRoutes: string[] = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/dashboard';

/**
 * Check if a route is public
 * @param route - The route to check
 * @returns boolean indicating if the route is public
 */
export function isPublicRoute(route: string): boolean {
  if (publicRoutes.includes(route)) return true;

  // Handle dynamic /issues/[id] route
  if (route.startsWith('/issues/') && route.split('/').length === 3) {
    return true;
  }

  return false;
}
