import { errorResponse, jsonResponse } from '@/lib/api/response';
import type { GenerateTextRequest } from '@/lib/ai';
import { aiService } from '@/server/services/ai.service';
import { validatePromptPayload } from '@/server/validators/ai.validator';

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as GenerateTextRequest;
    validatePromptPayload(body);
    const text = await aiService.generateText(body);
    return jsonResponse({ text });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'AI request failed', 500);
  }
}
