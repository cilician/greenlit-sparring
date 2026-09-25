import { describe, expect, it } from 'vitest';
import { paginate } from '../src/paginate.js';

const items = Array.from({ length: 20 }, (_, i) => i + 1);

describe('paginate', () => {
  it('returns the requested page', () => {
    expect(paginate(items, 2, 10)).toEqual({ items: items.slice(10, 20), page: 2, pages: 2, perPage: 10, total: 20 });
  });
  it('exposes a partial final page', () => {
    const twentyFiveItems = Array.from({ length: 25 }, (_, i) => i + 1);

    expect(paginate(twentyFiveItems, 3, 10)).toEqual({ items: twentyFiveItems.slice(20, 30), page: 3, pages: 3, perPage: 10, total: 25 });
    expect(paginate([], 1, 10).pages).toBe(1);
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
