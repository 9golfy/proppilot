import { NextResponse } from 'next/server';
import { env } from '@/config/env';
import { errorResponse } from '@/lib/api/response';

const FACEBOOK_SCOPE = 'email,public_profile,pages_show_list,pages_read_engagement,pages_manage_posts';
const FACEBOOK_OAUTH_URL = 'https://www.facebook.com/v23.0/dialog/oauth';

export async function GET(): Promise<Response> {
  if (!env.facebookAppId || !env.facebookRedirectUri) {
    return errorResponse('Facebook OAuth is not configured. Please set FACEBOOK_APP_ID and FACEBOOK_REDIRECT_URI.', 500);
  }

  const url = new URL(FACEBOOK_OAUTH_URL);
  url.searchParams.set('client_id', env.facebookAppId);
  url.searchParams.set('redirect_uri', env.facebookRedirectUri);
  url.searchParams.set('scope', FACEBOOK_SCOPE);
  url.searchParams.set('response_type', 'code');

  return NextResponse.redirect(url);
}
