export interface AIImageRequest {
  prompt: string;
  provider?: 'openai' | 'gemini';
}

export interface AIImageResult {
  imageUrl: string;
}
