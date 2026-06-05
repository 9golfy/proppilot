import { env } from '@/config/env';
import { errorResponse, jsonResponse } from '@/lib/api/response';

const FACEBOOK_GRAPH_URL = 'https://graph.facebook.com/v25.0';
const DEFAULT_FACEBOOK_PAGE_ID = '100091331610374';
const DEFAULT_PUBLIC_APP_URL = 'https://proppilot-jet.vercel.app';

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
  post_id?: string;
  error?: FacebookGraphError;
};

type PublishFacebookPostRequest = {
  message?: string;
  pageId?: string;
  imageUrl?: string;
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

function getAbsoluteImageUrl(imageUrl: string | undefined, request: Request) {
  if (!imageUrl) return null;

  if (imageUrl.startsWith('blob:') || imageUrl.startsWith('data:')) {
    throw new Error('Facebook cannot publish local browser images. Please use a public image URL or upload the image to storage first.');
  }

  const requestOrigin = new URL(request.url).origin;
  const configuredOrigin = env.appUrl || requestOrigin;
  const publicOrigin = configuredOrigin.includes('localhost') || configuredOrigin.includes('127.0.0.1') ? DEFAULT_PUBLIC_APP_URL : configuredOrigin;

  let absoluteUrl: URL;

  try {
    absoluteUrl = new URL(imageUrl);
  } catch {
    absoluteUrl = new URL(imageUrl, publicOrigin);
  }

  if (!['http:', 'https:'].includes(absoluteUrl.protocol)) {
    throw new Error('Facebook image URL must use http or https.');
  }

  if (absoluteUrl.hostname === 'localhost' || absoluteUrl.hostname === '127.0.0.1') {
    if (imageUrl.startsWith('/')) {
      return new URL(imageUrl, DEFAULT_PUBLIC_APP_URL).toString();
    }

    throw new Error('Facebook image URL must be publicly accessible, not localhost.');
  }

  return absoluteUrl.toString();
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
  const imageUrl = getAbsoluteImageUrl(body.imageUrl?.trim(), request);

  if (!message) {
    return errorResponse('Missing post message.', 400);
  }

  try {
    const pageAccessToken = await getPageAccessToken(pageId);
    const postUrl = new URL(`${FACEBOOK_GRAPH_URL}/${pageId}/${imageUrl ? 'photos' : 'feed'}`);
    const formData = new URLSearchParams();
    formData.set(imageUrl ? 'caption' : 'message', message);
    if (imageUrl) {
      formData.set('url', imageUrl);
    }
    formData.set('access_token', pageAccessToken);

    const response = await fetch(postUrl, {
      method: 'POST',
      body: formData,
      cache: 'no-store',
    });
    const payload = (await response.json()) as FacebookPostResponse;

    const postId = payload.post_id || payload.id;

    if (!response.ok || payload.error || !postId) {
      return errorResponse(getFacebookErrorMessage(payload.error), response.status || 500);
    }

    return jsonResponse({
      success: true,
      pageId,
      post: {
        id: postId,
        imageUrl,
      },
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Facebook post request failed.', 500);
  }
}
