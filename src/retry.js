/**
 * Call `fn(attempt)` until it resolves, at most `attempts` times, waiting `delayMs` between tries.
 * Resolves with the first successful value; rejects with the last error once the attempts are used up.
 */
export async function retry(fn, { attempts = 3, delayMs = 0, onError } = {}) {
  if (!Number.isInteger(attempts) || attempts < 1) throw new RangeError('retry: attempts must be a positive integer');
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn(attempt);
    } catch (err) {
      lastError = err;
      if (onError) onError(err, attempt);
      if (attempt < attempts && delayMs > 0) await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  if (lastError instanceof TypeError) throw lastError;
}
