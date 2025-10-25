export const RAW_FORBIDDEN = ['캄보디아', '프놈펜', '불법체류', '텔레그램', 'telegram'];

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const norm = (s: string) => (s || '').normalize('NFKC').toLowerCase();
const squash = (s: string) => norm(s).replace(/[\s\u00A0\u2000-\u200B\W_]+/g, '');

const FORBIDDEN_REGEX = (() => {
  const variants = RAW_FORBIDDEN.flatMap(w => {
    const n = norm(w);
    const s = squash(w);
    return Array.from(new Set([n, s]));
  });
  return new RegExp(`(${variants.map(esc).join('|')})`, 'i');
})();

export const hasForbiddenWords = (...fields: string[]) => {
  const joined = fields.filter(Boolean).join(' ');
  const collapsed = squash(joined);
  return FORBIDDEN_REGEX.test(collapsed);
};

export const normalizeTags = (input: string[] | string): string[] => {
  const arr = Array.isArray(input) ? input : input.split(',').map(s => s.trim());
  const uniq = Array.from(new Set(arr.filter(Boolean)));
  return uniq.slice(0, 5).map(t => t.slice(0, 24));
};
