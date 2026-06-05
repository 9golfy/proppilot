import { jsonResponse } from '@/lib/api/response';
import { aiService } from '@/server/services/ai.service';

export async function GET(): Promise<Response> {
  return jsonResponse({ providers: aiService.listProviders() });
}
