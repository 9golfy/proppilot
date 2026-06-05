import { env } from '@/config/env';
import { errorResponse, jsonResponse } from '@/lib/api/response';

const FACEBOOK_GRAPH_URL = 'https://graph.facebook.com/v25.0';
const DEFAULT_FACEBOOK_PAGE_ID = '100091331610374';

type FacebookGraphError = {
  message?: string;
  type?: string;
  code?: number;
  error_subcode?: number;
  fbtrace_id?: string;
};

type FacebookPageAccount = {
  id: string;
  name?: string;
  access_token?: string;
};

type FacebookAccountsResponse = {
  data?: FacebookPageAccount[];
  error?: FacebookGraphError;
};

type FacebookPostResponse = {
  id?: string;
  error?: FacebookGraphError;
};

type PublishFacebookPostRequest = {
  message?: string;
  pageId?: string;
};

function getFacebookErrorMessage(error?: FacebookGraphError) {
  return error?.message || 'Facebook post request failed.';
}

async function getPageAccessToken(pageId: string) {
  if (env.facebookPageAccessToken) {
    return env.facebookPageAccessToken;
  }

  if (!env.facebookAccessToken) {
    throw new Error('Missing FACEBOOK_PAGE_ACCESS_TOKEN or FACEBOOK_ACCESS_TOKEN.');
  }

  const accountsUrl = new URL(`${FACEBOOK_GRAPH_URL}/me/accounts`);
  accountsUrl.searchParams.set('fields', 'id,name,access_token');
  accountsUrl.searchParams.set('access_token', env.facebookAccessToken);

  const response = await fetch(accountsUrl, { cache: 'no-store' });
  const payload = (await response.json()) as FacebookAccountsResponse;

  if (!response.ok || payload.error) {
    throw new Error(getFacebookErrorMessage(payload.error));
  }

  const page = payload.data?.find((account) => account.id === pageId);
  if (!page?.access_token) {
    throw new Error(`Facebook Page access token was not found for page ${pageId}.`);
  }

  return page.access_token;
}

export async function POST(request: Request): Promise<Response> {
  let body: PublishFacebookPostRequest;

  try {
    body = (await request.json()) as PublishFacebookPostRequest;
  } catch {
    return errorResponse('Invalid JSON request body.', 400);
  }

  const message = body.message?.trim();
  const pageId = body.pageId?.trim() || env.facebookPageId || DEFAULT_FACEBOOK_PAGE_ID;

  if (!message) {
    return errorResponse('Missing post message.', 400);
  }

  try {
    const pageAccessToken = await getPageAccessToken(pageId);
    const postUrl = new URL(`${FACEBOOK_GRAPH_URL}/${pageId}/feed`);
    const formData = new URLSearchParams();
    formData.set('message', message);
    formData.set('access_token', pageAccessToken);

    const response = await fetch(postUrl, {
      method: 'POST',
      body: formData,
      cache: 'no-store',
    });
    const payload = (await response.json()) as FacebookPostResponse;

    if (!response.ok || payload.error || !payload.id) {
      return errorResponse(getFacebookErrorMessage(payload.error), response.status || 500);
    }

    return jsonResponse({
      success: true,
      pageId,
      post: {
        id: payload.id,
      },
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Facebook post request failed.', 500);
  }
}
