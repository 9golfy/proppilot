import { assertNonEmptyString } from '@/lib/utils/validation';

export function validatePromptPayload(payload: unknown): asserts payload is { prompt: string } {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Request body must be an object');
  }

  assertNonEmptyString((payload as { prompt?: unknown }).prompt, 'prompt');
}
