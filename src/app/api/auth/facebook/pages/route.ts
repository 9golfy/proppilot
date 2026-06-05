import { errorResponse, jsonResponse } from '@/lib/api/response';

const FACEBOOK_PAGES_URL = 'https://graph.facebook.com/v23.0/me/accounts';

type FacebookGraphError = {
  message?: string;
  type?: string;
  code?: number;
  error_subcode?: number;
  fbtrace_id?: string;
};

type FacebookPagesResponse = {
  data?: unknown[];
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
  return url.searchParams.get('accessToken')?.trim() || null;
}

export async function GET(request: Request): Promise<Response> {
  const accessToken = getAccessToken(request);

  if (!accessToken) {
    return errorResponse('Missing Facebook access token. Provide Authorization: Bearer TOKEN or accessToken query parameter.', 400);
  }

  try {
    const pagesUrl = new URL(FACEBOOK_PAGES_URL);
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
