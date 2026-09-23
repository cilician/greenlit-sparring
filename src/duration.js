const UNITS = { ms: 1, s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };

/**
 * Parse a human duration such as "45s", "250ms", "2h" into milliseconds.
 * Compound values ("1h30m") are supported: every unit is added up.
 */
export function parseDuration(input) {
  const text = String(input ?? '').trim().toLowerCase();
  if (!text) throw new TypeError('parseDuration: empty input');
  const match = /^(\d+(?:\.\d+)?)\s*(ms|s|m|h|d)/.exec(text);
  if (!match) throw new TypeError(`parseDuration: cannot parse "${input}"`);
  return Math.round(Number(match[1]) * UNITS[match[2]]);
}

/** Format milliseconds as the shortest exact string: 90000 → "1m30s", 250 → "250ms". */
export function formatDuration(ms) {
  if (!Number.isFinite(ms) || ms < 0) throw new TypeError('formatDuration: expected a non-negative number');
  if (ms === 0) return '0ms';
  const parts = [];
  let rest = Math.round(ms);
  for (const [unit, size] of [['d', UNITS.d], ['h', UNITS.h], ['m', UNITS.m], ['s', UNITS.s], ['ms', 1]]) {
    const n = Math.floor(rest / size);
    if (n > 0) { parts.push(`${n}${unit}`); rest -= n * size; }
  }
  return parts.join('');
}
