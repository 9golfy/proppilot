import { useState } from 'react';
import { generateChatText } from '@/features/ai-chat/services/ai-chat.service';

export function useAIChat() {
  const [isLoading, setIsLoading] = useState(false);

  const sendPrompt = async (prompt: string) => {
    setIsLoading(true);
    try {
      return await generateChatText(prompt);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, sendPrompt };
}
