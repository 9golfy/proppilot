import type { AIProvider, AIProviderConfig } from '@/lib/ai/ai.types';

export class ClaudeProvider implements AIProvider {
  name = 'claude' as const;

  constructor(private readonly config: AIProviderConfig = {}) {}

  async generateText(prompt: string): Promise<string> {
    if (!this.config.apiKey) {
      return `[Claude mock] ${prompt}`;
    }

    throw new Error('Claude text generation is ready for adapter wiring. Add SDK/API call here.');
  }
}
