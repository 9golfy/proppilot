export const env = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  claudeApiKey: process.env.CLAUDE_API_KEY,
  defaultAIProvider: (process.env.DEFAULT_AI_PROVIDER || 'openai') as 'openai' | 'gemini' | 'claude',
  facebookAppId: process.env.FACEBOOK_APP_ID,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
  facebookRedirectUri: process.env.FACEBOOK_REDIRECT_URI,
  facebookAccessToken: process.env.FACEBOOK_ACCESS_TOKEN,
  facebookPageAccessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
  facebookPageId: process.env.FACEBOOK_PAGE_ID,
};
