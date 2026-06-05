import { errorResponse, jsonResponse } from '@/lib/api/response';
import { env } from '@/config/env';

const FACEBOOK_GRAPH_URL = 'https://graph.facebook.com/v23.0';

type FacebookTokenResponse = {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: FacebookGraphError;
};

type FacebookGraphError = {
  message?: string;
  type?: string;
  code?: number;
  error_subcode?: number;
  fbtrace_id?: string;
};

type FacebookUser = {
  id: string;
  name: string;
};

type FacebookUserResponse = Partial<FacebookUser> & {
  error?: FacebookGraphError;
};

function getFacebookErrorMessage(error?: FacebookGraphError) {
  return error?.message || 'Facebook request failed.';
}

async function exchangeCodeForAccessToken(code: string) {
  if (!env.facebookAppId || !env.facebookAppSecret || !env.facebookRedirectUri) {
    throw new Error('Facebook OAuth is not configured. Please set FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, and FACEBOOK_REDIRECT_URI.');
  }

  const tokenUrl = new URL(`${FACEBOOK_GRAPH_URL}/oauth/access_token`);
  tokenUrl.searchParams.set('client_id', env.facebookAppId);
  tokenUrl.searchParams.set('client_secret', env.facebookAppSecret);
  tokenUrl.searchParams.set('redirect_uri', env.facebookRedirectUri);
  tokenUrl.searchParams.set('code', code);

  const response = await fetch(tokenUrl, { cache: 'no-store' });
  const payload = (await response.json()) as FacebookTokenResponse;

  if (!response.ok || payload.error || !payload.access_token) {
    throw new Error(getFacebookErrorMessage(payload.error));
  }

  return payload;
}

async function fetchFacebookUser(accessToken: string): Promise<FacebookUser> {
  const userUrl = new URL(`${FACEBOOK_GRAPH_URL}/me`);
  userUrl.searchParams.set('fields', 'id,name');
  userUrl.searchParams.set('access_token', accessToken);

  const response = await fetch(userUrl, { cache: 'no-store' });
  const payload = (await response.json()) as FacebookUserResponse;

  if (!response.ok || payload.error || !payload.id || !payload.name) {
    throw new Error(getFacebookErrorMessage(payload.error));
  }

  return {
    id: payload.id,
    name: payload.name,
  };
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');
  const code = url.searchParams.get('code');

  if (error) {
    return errorResponse(errorDescription || error, 400);
  }

  if (!code) {
    return errorResponse('Missing Facebook authorization code.', 400);
  }

  try {
    const token = await exchangeCodeForAccessToken(code);
    const accessToken = token.access_token!;
    const user = await fetchFacebookUser(accessToken);

    return jsonResponse({
      success: true,
      user,
      accessToken,
    });
  } catch (requestError) {
    return errorResponse(requestError instanceof Error ? requestError.message : 'Facebook OAuth callback failed.', 500);
  }
}
