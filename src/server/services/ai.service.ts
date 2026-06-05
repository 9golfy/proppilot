import type { GenerateImageRequest, GenerateTextRequest } from '@/lib/ai';
import { getAIProvider, listAIProviders } from '@/lib/ai';
import { assertNonEmptyString } from '@/lib/utils/validation';

export class AIService {
  async generateText(request: GenerateTextRequest): Promise<string> {
    assertNonEmptyString(request.prompt, 'prompt');
    const provider = getAIProvider(request.provider);
    return provider.generateText(request.prompt, { model: request.model });
  }

  async generateImage(request: GenerateImageRequest): Promise<string> {
    assertNonEmptyString(request.prompt, 'prompt');
    const provider = getAIProvider(request.provider);

    if (!provider.generateImage) {
      throw new Error(`${provider.name} does not support image generation`);
    }

    return provider.generateImage(request.prompt, { model: request.model });
  }

  listProviders() {
    return listAIProviders();
  }
}

export const aiService = new AIService();
