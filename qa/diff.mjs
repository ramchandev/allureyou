// Usage: node qa/diff.mjs [currentDir=current] [baselineDir=baseline]
import fs from 'node:fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
const cur = process.argv[2] || 'current', basel = process.argv[3] || 'baseline';
const d = new URL('./', import.meta.url).pathname;
fs.mkdirSync(d + 'diff', { recursive: true });
let worst = 0, fail = 0;
for (const f of fs.readdirSync(d + basel).filter(f => f.endsWith('.png')).sort()) {
  if (!fs.existsSync(`${d}${cur}/${f}`)) { console.log('MISSING', f); fail++; continue; }
  const a = PNG.sync.read(fs.readFileSync(`${d}${basel}/${f}`)), b = PNG.sync.read(fs.readFileSync(`${d}${cur}/${f}`));
  if (a.width !== b.width || a.height !== b.height) { console.log('SIZE   ', f, `${a.width}x${a.height} vs ${b.width}x${b.height}`); fail++; continue; }
  const o = new PNG({ width: a.width, height: a.height });
  const n = pixelmatch(a.data, b.data, o.data, a.width, a.height, { threshold: 0.1 });
  const pct = n / (a.width * a.height) * 100; worst = Math.max(worst, pct);
  if (n) fs.writeFileSync(`${d}diff/${f}`, PNG.sync.write(o)); else fs.rmSync(`${d}diff/${f}`, { force: true });
  const ok = pct <= 0.1; if (!ok) fail++;
  console.log(ok ? (n ? 'ok~    ' : 'ok     ') : 'DIFF   ', f.padEnd(34), `${n} px  ${pct.toFixed(4)}%`);
}
console.log(fail ? `FAILED (${fail})` : 'ALL CLEAN', `worst ${worst.toFixed(4)}%`);
process.exit(fail ? 1 : 0);
