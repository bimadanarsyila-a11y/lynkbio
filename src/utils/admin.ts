import { AuthUser } from '../types';

// Admin email configuration
export const ADMIN_EMAILS: string[] = [
  'bimadanarsyila@gmail.com',
];

/**
 * Checks if the currently authenticated user is an administrator.
 * Public regular users will not see admin-only user directories or user stats.
 */
export const isAdminUser = (user: AuthUser | null | undefined): boolean => {
  if (!user || !user.email) return false;
  return ADMIN_EMAILS.some(adminEmail => adminEmail.toLowerCase() === user.email?.toLowerCase().trim());
};
