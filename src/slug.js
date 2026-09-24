/**
 * Turn free text into a URL slug: lower-case ASCII letters and digits, words separated by a single dash,
 * no dash at either end. Accented letters lose their accents ("Crème" → "creme").
 */
export function slugify(input) {
  return String(input ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
