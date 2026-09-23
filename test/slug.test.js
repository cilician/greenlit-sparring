import { describe, expect, it } from 'vitest';
import { slugify } from '../src/slug.js';

describe('slugify', () => {
  it('lower-cases and joins words with a dash', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
  it('strips accents', () => {
    expect(slugify('Crème Brûlée')).toBe('creme-brulee');
  });
  it('handles empty input', () => {
    expect(slugify('')).toBe('');
    expect(slugify(null)).toBe('');
  });
});
