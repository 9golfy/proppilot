import { postJson } from '@/lib/api/api-client';

export interface GenerateTextResponse {
  text: string;
}

export function generateChatText(prompt: string): Promise<GenerateTextResponse> {
  return postJson<GenerateTextResponse, { prompt: string }>('/api/ai', { prompt });
}
