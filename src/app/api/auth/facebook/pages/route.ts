import { errorResponse, jsonResponse } from '@/lib/api/response';
import { env } from '@/config/env';

const FACEBOOK_PAGES_URL = 'https://graph.facebook.com/v25.0/me/accounts';

type FacebookGraphError = {
  message?: string;
  type?: string;
  code?: number;
  error_subcode?: number;
  fbtrace_id?: string;
};

type FacebookPagesResponse = {
  data?: Array<{
    id: string;
    name: string;
    category?: string;
    tasks?: string[];
    access_token?: string;
  }>;
  paging?: unknown;
  error?: FacebookGraphError;
};

function getFacebookErrorMessage(error?: FacebookGraphError) {
  return error?.message || 'Facebook pages request failed.';
}

function getAccessToken(request: Request) {
  const authorization = request.headers.get('authorization');
  const bearerPrefix = 'Bearer ';

  if (authorization?.startsWith(bearerPrefix)) {
    return authorization.slice(bearerPrefix.length).trim();
  }

  const url = new URL(request.url);
  return url.searchParams.get('accessToken')?.trim() || env.facebookAccessToken || null;
}

export async function GET(request: Request): Promise<Response> {
  const accessToken = getAccessToken(request);

  if (!accessToken) {
    return errorResponse('Missing Facebook access token. Provide Authorization: Bearer TOKEN or accessToken query parameter.', 400);
  }

  try {
    const pagesUrl = new URL(FACEBOOK_PAGES_URL);
    pagesUrl.searchParams.set('fields', 'id,name,category,tasks');
    pagesUrl.searchParams.set('access_token', accessToken);

    const response = await fetch(pagesUrl, { cache: 'no-store' });
    const payload = (await response.json()) as FacebookPagesResponse;

    if (!response.ok || payload.error) {
      return errorResponse(getFacebookErrorMessage(payload.error), response.status || 500);
    }

    return jsonResponse(payload);
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Facebook pages request failed.', 500);
  }
}
