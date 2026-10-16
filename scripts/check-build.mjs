import assert from 'node:assert/strict';
import {readFile,access,readdir} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {PRODUCTS} from '../src/data/products.js';
const root = resolve(import.meta.dirname, '../dist');
const html = await readFile(join(root,'index.html'),'utf8');
assert.match(html, /<html lang="es">/);
assert.equal((html.match(/class="pcard"/g)||[]).length, PRODUCTS.length, 'All products must be rendered in the built HTML');
assert.match(html, /type="module" src="\/_astro\//, 'Client interactions must be bundled');
assert.doesNotMatch(html, /localhost|127\.0\.0\.1|cdnjs\.cloudflare|fonts\.googleapis|cdn\.jsdelivr|creditos\.html|wa\.me/);
for (const p of PRODUCTS) for(const image of [p.img,...p.gallery.map(g=>g.src)]) await access(join(root,image));
for (const file of await readdir(join(root,'docs'))) {
  const data = await readFile(join(root,'docs',file));
  assert.equal(data.subarray(0,5).toString(), '%PDF-', `${file} must be a PDF`);
}
for(const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)(?:[?#][^"]*)?"/g)) await access(join(root,decodeURIComponent(match[1])));
console.log(`Build verified: ${PRODUCTS.length} products, local assets, bundled JavaScript and all PDF files.`);
