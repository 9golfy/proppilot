import { errorResponse, jsonResponse } from '@/lib/api/response';

type ChatRole = 'system' | 'user' | 'assistant';

interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface OpenRouterChatResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
}

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'google/gemma-4-31b-it:free';
const FALLBACK_MODEL = 'openrouter/free';

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== 'object') return false;

  const message = value as Partial<ChatMessage>;
  return (
    (message.role === 'system' || message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string' &&
    message.content.trim().length > 0
  );
}

export async function POST(request: Request): Promise<Response> {
  try {
    const apiKey = process.env.OPEN_ROUTER_KEY || process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return errorResponse('Missing OPEN_ROUTER_KEY in .env.local', 500);
    }

    const body = (await request.json()) as {
      messages?: unknown;
      model?: unknown;
    };

    const messages = Array.isArray(body.messages) ? body.messages.filter(isChatMessage) : [];

    if (messages.length === 0) {
      return errorResponse('Please send at least one chat message.', 400);
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const model = typeof body.model === 'string' && body.model.trim() ? body.model : DEFAULT_MODEL;

    const callOpenRouter = async (selectedModel: string) => {
      const response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': origin,
          'X-Title': 'PropPilot Local Chatbot',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages,
        }),
      });

      const data = (await response.json()) as OpenRouterChatResponse;
      return { response, data };
    };

    let usedModel = model;
    let fallbackReason = '';
    let { response: openRouterResponse, data } = await callOpenRouter(model);

    if (!openRouterResponse.ok && model !== FALLBACK_MODEL) {
      fallbackReason = data.error?.message || 'Primary model failed.';
      usedModel = FALLBACK_MODEL;
      const fallbackResult = await callOpenRouter(FALLBACK_MODEL);
      openRouterResponse = fallbackResult.response;
      data = fallbackResult.data;
    }

    if (!openRouterResponse.ok) {
      return errorResponse(data.error?.message || 'OpenRouter request failed.', openRouterResponse.status);
    }

    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      return errorResponse('OpenRouter returned an empty response.', 502);
    }

    return jsonResponse({
      text,
      model: usedModel,
      fallbackReason: fallbackReason || undefined,
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Chat request failed.', 500);
  }
}
