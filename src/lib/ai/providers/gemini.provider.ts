import type { AIProvider, AIProviderConfig } from '@/lib/ai/ai.types';

export class GeminiProvider implements AIProvider {
  name = 'gemini' as const;

  constructor(private readonly config: AIProviderConfig = {}) {}

  async generateText(prompt: string): Promise<string> {
    if (!this.config.apiKey) {
      return `[Gemini mock] ${prompt}`;
    }

    throw new Error('Gemini text generation is ready for adapter wiring. Add SDK/API call here.');
  }

  async generateImage(prompt: string): Promise<string> {
    if (!this.config.apiKey) {
      return `[Gemini image mock] ${prompt}`;
    }

    throw new Error('Gemini image generation is ready for adapter wiring. Add SDK/API call here.');
  }
}
