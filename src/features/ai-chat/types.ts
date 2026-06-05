export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIChatRequest {
  messages: AIChatMessage[];
  provider?: 'openai' | 'gemini' | 'claude';
}
