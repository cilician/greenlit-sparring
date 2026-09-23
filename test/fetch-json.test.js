import { describe, expect, it } from 'vitest';
import { fetchJson } from '../src/fetch-json.js';

const ok = (body) => async () => ({ ok: true, status: 200, json: async () => body });

describe('fetchJson', () => {
  it('returns the parsed body', async () => {
    await expect(fetchJson('https://example.test/x', { fetchImpl: ok({ a: 1 }) })).resolves.toEqual({ a: 1 });
  });
  it('rejects a non-2xx answer with the status', async () => {
    const notFound = async () => ({ ok: false, status: 404, statusText: 'Not Found', json: async () => ({}) });
    await expect(fetchJson('https://example.test/x', { fetchImpl: notFound })).rejects.toThrow(/404/);
  });
  it('rejects a non-positive timeout', async () => {
    await expect(fetchJson('https://example.test/x', { timeoutMs: 0 })).rejects.toThrow(RangeError);
  });
});
