import { env } from '@/config/env';
import type { AIProvider, AIProviderName } from '@/lib/ai/ai.types';
import { ClaudeProvider, GeminiProvider, OpenAIProvider } from '@/lib/ai/providers';

const providers: Record<AIProviderName, AIProvider> = {
  openai: new OpenAIProvider({ apiKey: env.openaiApiKey }),
  gemini: new GeminiProvider({ apiKey: env.geminiApiKey }),
  claude: new ClaudeProvider({ apiKey: env.claudeApiKey }),
};

export function getAIProvider(name: AIProviderName = env.defaultAIProvider): AIProvider {
  return providers[name] || providers.openai;
}

export function listAIProviders(): AIProviderName[] {
  return Object.keys(providers) as AIProviderName[];
}
