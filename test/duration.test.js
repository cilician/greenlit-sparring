import { describe, expect, it } from 'vitest';
import { formatDuration, parseDuration } from '../src/duration.js';

describe('parseDuration', () => {
  it('parses single units', () => {
    expect(parseDuration('250ms')).toBe(250);
    expect(parseDuration('45s')).toBe(45_000);
    expect(parseDuration('2h')).toBe(7_200_000);
    expect(parseDuration(' 1.5d ')).toBe(129_600_000);
  });
  it('rejects garbage', () => {
    expect(() => parseDuration('')).toThrow(TypeError);
    expect(() => parseDuration('soon')).toThrow(/cannot parse/);
  });
});

describe('formatDuration', () => {
  it('formats the shortest exact string', () => {
    expect(formatDuration(0)).toBe('0ms');
    expect(formatDuration(250)).toBe('250ms');
    expect(formatDuration(90_000)).toBe('1m30s');
    expect(formatDuration(3_600_000 + 1)).toBe('1h1ms');
  });
});
