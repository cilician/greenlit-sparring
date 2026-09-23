/**
 * Slice `items` into pages. Pages are 1-based; an out-of-range page clamps to the nearest valid page.
 * Returns the page's items with the page number, the number of pages, the page size and the total count.
 */
export function paginate(items, page = 1, perPage = 10) {
  if (!Array.isArray(items)) throw new TypeError('paginate: items must be an array');
  if (!Number.isInteger(perPage) || perPage < 1) throw new RangeError('paginate: perPage must be a positive integer');
  const total = items.length;
  const pages = Math.max(1, Math.floor(total / perPage));
  const current = Math.min(Math.max(1, Number(page) || 1), pages);
  const start = (current - 1) * perPage;
  return { items: items.slice(start, start + perPage), page: current, pages, perPage, total };
}
