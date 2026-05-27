// tools/obfuscate.mjs — obfusque les <script> inline (sans src) d'un fichier HTML.
// Les <script src="..."> (librairies externes) ne sont PAS touchés.
// Usage: NODE_PATH=/tmp/obftest/node_modules node tools/obfuscate.mjs <in.html> <out.html>
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const Obf = require('javascript-obfuscator');

const CFG = {
  compact: true,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,            // garde les noms globaux (onclick="fn()") intacts
  stringArray: true,
  stringArrayThreshold: 1,
  stringArrayEncoding: ['base64'],
  stringArrayWrappersCount: 1,
  splitStrings: false,
  controlFlowFlattening: false,    // fragile + lent → off
  deadCodeInjection: false,        // bloat → off
  debugProtection: false,
  selfDefending: false,
  transformObjectKeys: false,      // ne pas casser les clés (config Firebase, etc.)
  numbersToExpressions: false,
  unicodeEscapeSequence: false,
  simplify: true
};

const [,, inFile, outFile] = process.argv;
const input = fs.readFileSync(inFile, 'utf8');

if (/\.js$/i.test(inFile)) {
  // Fichier JavaScript autonome (ex: js/util.js) → on obfusque tout le contenu.
  const obf = Obf.obfuscate(input, CFG).getObfuscatedCode();
  fs.writeFileSync(outFile, obf, 'utf8');
  console.log(`  ${inFile} → ${outFile} : fichier .js obfusqué`);
} else {
  // Fichier HTML → on obfusque uniquement les <script> inline (sans src).
  let n = 0, total = 0, skipped = 0;
  const MAX = 400000; // au-delà = librairie minifiée embarquée (pdf.js, etc.) → on ne touche pas
  const html = input.replace(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi, (m, attrs, code) => {
    if (attrs && /\bsrc\s*=/.test(attrs)) return m;       // librairie externe → inchangé
    if (!code.trim()) return m;                            // vide → inchangé
    total++;
    if (code.length > MAX) { skipped++; return m; }        // gros blob minifié → inchangé
    const obf = Obf.obfuscate(code, CFG).getObfuscatedCode();
    n++;
    return `<script${attrs || ''}>${obf}</script>`;
  });
  fs.writeFileSync(outFile, html, 'utf8');
  console.log(`  ${inFile} → ${outFile} : ${n}/${total} script(s) obfusqué(s)${skipped?` · ${skipped} gros blob(s) ignoré(s)`:''}`);
}
