import type { AIProvider, AIProviderConfig } from '@/lib/ai/ai.types';

export class OpenAIProvider implements AIProvider {
  name = 'openai' as const;

  constructor(private readonly config: AIProviderConfig = {}) {}

  async generateText(prompt: string, options?: { model?: string }): Promise<string> {
    if (!this.config.apiKey) {
      return `[OpenAI mock] ${prompt}`;
    }

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options?.model || this.config.defaultModel || 'gpt-4.1-mini',
        input: prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed: ${response.status}`);
    }

    const data = (await response.json()) as { output_text?: string };
    return data.output_text || '';
  }

  async generateImage(prompt: string): Promise<string> {
    if (!this.config.apiKey) {
      return `[OpenAI image mock] ${prompt}`;
    }

    throw new Error('OpenAI image generation is not wired yet. Add implementation in OpenAIProvider.generateImage.');
  }
}
