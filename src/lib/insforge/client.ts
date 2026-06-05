import { createClient, type InsForgeClient } from '@insforge/sdk';

let browserClient: InsForgeClient | null = null;

export function getInsForgeBrowserClient(): InsForgeClient {
  const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_INSFORGE_BASE_URL is not configured.');
  }

  if (!browserClient) {
    browserClient = createClient({ baseUrl, anonKey });
  }

  return browserClient;
}

export function getRedirectUrl(path: string): string {
  if (typeof window === 'undefined') return path;
  return `${window.location.origin}${path}`;
}