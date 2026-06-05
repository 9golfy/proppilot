import { useState } from 'react';
import type { AIImageRequest } from '@/features/ai-image/types';
import { generateImage } from '@/features/ai-image/services/ai-image.service';

export function useAIImage() {
  const [isLoading, setIsLoading] = useState(false);

  const createImage = async (request: AIImageRequest) => {
    setIsLoading(true);
    try {
      return await generateImage(request);
    } finally {
      setIsLoading(false);
    }
  };

  return { createImage, isLoading };
}
