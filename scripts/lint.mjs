// Minimal lint: no console.* in src/, no trailing whitespace, files end with a newline. Exit 1 on any finding.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const findings = [];
const walk = (dir) => { for (const name of readdirSync(dir)) { const p = join(dir, name); if (statSync(p).isDirectory()) walk(p); else if (/\.(m?js)$/.test(name)) check(p); } };
const check = (file) => {
  const text = readFileSync(file, 'utf8');
  if (file.startsWith('src/') && /console\.(log|error|warn)\(/.test(text)) findings.push(`${file}: console.* is not allowed in src/`);
  text.split('\n').forEach((line, i) => { if (/[ \t]+$/.test(line)) findings.push(`${file}:${i + 1}: trailing whitespace`); });
  if (text.length && !text.endsWith('\n')) findings.push(`${file}: missing final newline`);
};
for (const dir of ['src', 'test', 'scripts']) walk(dir);
if (findings.length) { console.error(findings.join('\n')); process.exit(1); }
console.log('lint: ok');
