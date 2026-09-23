import { describe, expect, it } from 'vitest';
import { paginate } from '../src/paginate.js';

const items = Array.from({ length: 20 }, (_, i) => i + 1);

describe('paginate', () => {
  it('returns the requested page', () => {
    expect(paginate(items, 2, 10)).toEqual({ items: items.slice(10, 20), page: 2, pages: 2, perPage: 10, total: 20 });
  });
  it('clamps out-of-range pages', () => {
    expect(paginate(items, 0, 10).page).toBe(1);
    expect(paginate(items, 9, 10).page).toBe(2);
  });
  it('rejects bad input', () => {
    expect(() => paginate('nope')).toThrow(TypeError);
    expect(() => paginate(items, 1, 0)).toThrow(RangeError);
  });
});
