export type AIProviderName = 'openai' | 'gemini' | 'claude';

export interface GenerateTextRequest {
  prompt: string;
  provider?: AIProviderName;
  model?: string;
}

export interface GenerateImageRequest {
  prompt: string;
  provider?: AIProviderName;
  model?: string;
}

export interface AIProvider {
  name: AIProviderName;
  generateText(prompt: string, options?: { model?: string }): Promise<string>;
  generateImage?(prompt: string, options?: { model?: string }): Promise<string>;
}

export interface AIProviderConfig {
  apiKey?: string;
  defaultModel?: string;
}
