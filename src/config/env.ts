export const env = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  claudeApiKey: process.env.CLAUDE_API_KEY,
  defaultAIProvider: (process.env.DEFAULT_AI_PROVIDER || 'openai') as 'openai' | 'gemini' | 'claude',
};
