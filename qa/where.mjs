import fs from 'node:fs'; import { PNG } from 'pngjs';
const d = new URL('./', import.meta.url).pathname;
for (const f of process.argv.slice(2)) {
  const a = PNG.sync.read(fs.readFileSync(`${d}baseline/${f}`)), b = PNG.sync.read(fs.readFileSync(`${d}current/${f}`));
  const rows = new Map();
  for (let y = 0; y < a.height; y++) for (let x = 0; x < a.width; x++) { const i = (y * a.width + x) * 4; if (a.data[i] !== b.data[i] || a.data[i+1] !== b.data[i+1] || a.data[i+2] !== b.data[i+2]) { const k = Math.floor(y / 50) * 50; const r = rows.get(k) || { n: 0, x0: 1e9, x1: 0, mx: 0 }; r.n++; r.x0 = Math.min(r.x0, x); r.x1 = Math.max(r.x1, x); r.mx = Math.max(r.mx, Math.abs(a.data[i]-b.data[i]), Math.abs(a.data[i+1]-b.data[i+1]), Math.abs(a.data[i+2]-b.data[i+2])); rows.set(k, r); } }
  console.log(f); for (const [k, r] of [...rows].sort((p, q) => p[0] - q[0])) console.log(`  y~${k}: ${r.n}px x ${r.x0}-${r.x1} maxΔ ${r.mx}`);
}
