import type { AIImageRequest, AIImageResult } from '@/features/ai-image/types';
import { postJson } from '@/lib/api/api-client';

export function generateImage(request: AIImageRequest): Promise<AIImageResult> {
  return postJson<AIImageResult, AIImageRequest>('/api/ai/image', request);
}
