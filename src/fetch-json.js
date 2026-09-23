/**
 * GET a JSON document. Rejects on a non-2xx status. `timeoutMs` (default 10 000) bounds the whole request:
 * a stalled server must not hold the caller forever.
 */
export async function fetchJson(url, { timeoutMs = 10_000, headers = {}, fetchImpl = globalThis.fetch } = {}) {
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) throw new RangeError('fetchJson: timeoutMs must be a positive number');

  const controller = new AbortController();
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new Error(`fetchJson: timed out after ${timeoutMs} ms for ${url}`));
    }, timeoutMs);
  });

  try {
    const res = await Promise.race([
      fetchImpl(url, { signal: controller.signal, headers: { accept: 'application/json', ...headers } }),
      timeout,
    ]);
    if (!res.ok) throw new Error(`fetchJson: ${res.status} ${res.statusText || ''} for ${url}`.trim());
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}
