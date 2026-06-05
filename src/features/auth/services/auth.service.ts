import { getInsForgeBrowserClient, getRedirectUrl } from '@/lib/insforge/client';
import type { AuthFormValues, AuthSession, OAuthProvider } from '@/features/auth/types';

interface InsForgeErrorLike {
  message?: string;
  error?: string;
  nextActions?: string;
}

function errorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === 'object') {
    const value = error as InsForgeErrorLike;
    return value.nextActions || value.message || value.error || fallback;
  }
  return fallback;
}

export function getStoredSession(): AuthSession | null {
  return null;
}

export async function signInWithPassword(values: Pick<AuthFormValues, 'email' | 'password'>) {
  const client = getInsForgeBrowserClient();
  const { data, error } = await client.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) throw new Error(errorMessage(error, 'Unable to sign in.'));
  return data;
}

export async function signUpWithPassword(values: AuthFormValues) {
  const client = getInsForgeBrowserClient();
  const { data, error } = await client.auth.signUp({
    email: values.email,
    password: values.password,
    name: values.name,
    redirectTo: getRedirectUrl('/sign-in'),
  });

  if (error) throw new Error(errorMessage(error, 'Unable to create your account.'));
  return data;
}

export async function signInWithOAuthProvider(provider: OAuthProvider) {
  const client = getInsForgeBrowserClient();
  const providerKey = provider === 'twitter' ? 'twitter' : 'google';
  const { data, error } = await client.auth.signInWithOAuth({
    provider: providerKey,
    redirectTo: getRedirectUrl('/dashboard'),
    skipBrowserRedirect: true,
  });

  if (error) throw new Error(errorMessage(error, `${providerKey} sign in is not available yet.`));
  if (!data?.url) throw new Error(`${providerKey} sign in is not available yet.`);

  window.location.href = data.url;
}