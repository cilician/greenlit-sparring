import { describe, expect, it, vi } from 'vitest';
import { retry } from '../src/retry.js';

describe('retry', () => {
  it('returns the first success and reports earlier failures', async () => {
    const onError = vi.fn();
    let calls = 0;
    const value = await retry(async () => { calls++; if (calls < 2) throw new Error('flaky'); return 'ok'; }, { attempts: 3, onError });
    expect(value).toBe('ok');
    expect(calls).toBe(2);
    expect(onError).toHaveBeenCalledTimes(1);
  });
  it('rejects invalid attempts', async () => {
    await expect(retry(async () => 1, { attempts: 0 })).rejects.toThrow(RangeError);
  });
});
