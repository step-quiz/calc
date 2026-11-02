/* ═══════════════════════════════════════════════════════════════════
   proves/ux.js — Les palanques del laboratori d'UX (?ux=…) funcionen
   ───────────────────────────────────────────────────────────────────
   Per a cada palanca (nucli/ux.js), i per a uns quants conjunts de
   palanques, obre una fitxa a 1366×657 (un portàtil, amb la barra del
   navegador), anima tres passos i l'últim, i comprova que:
     · no hi ha cap error de JavaScript;
     · la pàgina no es desplaça (llevat d'E3, una columna, que sí);
     · amb D2, ▶ porta a la pantalla de l'«Ara tu» (i, sense D2, l'«Ara tu»
       surt sol a l'últim pas).
   Fa quatre proves alhora.
   Amb CAPTURES=<carpeta>, hi desa una captura de cada palanca a
   mig fer (per mirar-les). Node + Playwright; no va al navegador.

   Ús, des de l'arrel del repositori:  node proves/ux.js
   ═══════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs'), path = require('path'), http = require('http');
const {chromium} = require('playwright');

const ARREL = path.join(__dirname, '..');
const TIPUS = {'.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.woff2': 'font/woff2', '.svg': 'image/svg+xml'};
/** Fitxes amb «Ara tu» (canvia-radians), amb passos d'error (error-angles) i amb «Prova-ho tu», en dos teclats. */
const FITXES = [['fx-82sp-cw', 'canvia-radians'], ['fx-82sp-cw', 'error-angles'], ['fx-570sp-x2', 'eso-fraccio-decimal']];
const PALANQUES = ['a1', 'a2', 'a3', 'a4', 'b1', 'b2', 'b3', 'b4', 'c1', 'c2', 'c3', 'c4', 'd1', 'd2', 'e2', 'e3'];
const CONJUNTS = ['a1,a2,a3,a4,b1,b2,b3,c2,c3,c4,d1,d2', 'a1,b1,b2,b3,c2,c4,e2,d1', 'b4,c1,c2,e2,d2', 'a1,c4,e2,d2'];
const CAPTURES = process.env.CAPTURES || '';

function serveix() {
  const s = http.createServer((req, res) => {
    const r = path.normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
    const f = path.join(ARREL, r === '/' ? 'index.html' : r);
    if (!f.startsWith(ARREL) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, {'Content-Type': TIPUS[path.extname(f)] || 'application/octet-stream'});
    fs.createReadStream(f).pipe(res);
  });
  return new Promise(ok => s.listen(0, '127.0.0.1', () => ok(s)));
}

/** Una prova: obre la fitxa amb les palanques, anima 3 passos i l'últim, i torna la llista de problemes. */
async function prova(navegador, base, model, id, ux) {
  const on = `${model} ${id} ?ux=${ux}`;
  const mal = [];
  const amb = p => ux.split(',').includes(p);
  const pagina = await navegador.newPage({viewport: {width: 1366, height: 657}});
  pagina.on('pageerror', e => mal.push(`${on}: ${e.message}`));
  await pagina.goto(`${base}fitxa.html?model=${model}&id=${id}&ux=${ux}`);
  await pagina.waitForSelector('.calculadora');
  await pagina.selectOption('#velocitat', {index: 2});           // la més ràpida, perquè la prova no s'allargui
  const total = await pagina.evaluate(() => fitxa.total);
  const desborda = [];
  const mira = async etiqueta => {
    if (amb('e3')) return;
    const d = await pagina.evaluate(() => [document.documentElement.scrollHeight - innerHeight, document.documentElement.scrollWidth - innerWidth]);
    if (d[0] > 0 || d[1] > 0) desborda.push(`${etiqueta}: ${d.join('×')} px`);
  };
  const anima = async (etiqueta, captura) => {
    await pagina.keyboard.press('ArrowDown');
    await pagina.waitForTimeout(250);
    await mira(etiqueta);
    if (captura) { await pagina.waitForTimeout(500); await pagina.screenshot({path: captura}); }
    await pagina.waitForFunction(() => !fitxa.ocupat, null, {timeout: 30000});
    await mira(etiqueta + ' (acabat)');
  };
  for (let i = 0; i < Math.min(3, total - 1); i++) {
    const captura = CAPTURES && i === 1 && id === FITXES[0][1] && model === FITXES[0][0] ? path.join(CAPTURES, `ux-${ux.replace(/,/g, '-')}.png`) : null;
    await anima(`pas ${i + 1}`, captura);
  }
  await pagina.evaluate(() => fitxa.salta(fitxa.total - 2));
  await anima('últim pas');
  if (desborda.length) mal.push(`${on}: la pàgina es desplaça (${desborda.slice(0, 3).join('; ')})`);
  if (!(await pagina.evaluate(() => fitxa.pas === fitxa.total - 1))) mal.push(`${on}: no arriba a l'últim pas`);
  const ambFinal = await pagina.evaluate(() => document.querySelectorAll('.ara-tu').length > 0);
  const visible = () => pagina.evaluate(() => [...document.querySelectorAll('.ara-tu')].some(e => !e.hidden));
  if (ambFinal && amb('d2')) {
    const abans = await visible();
    await pagina.keyboard.press('ArrowDown');
    await pagina.waitForTimeout(150);
    const despres = await pagina.evaluate(() => document.documentElement.classList.contains('ux-final')) && await visible();
    if (abans || !despres) mal.push(`${on}: amb D2, l'«Ara tu» ha de sortir en prémer ▶ a l'últim pas (abans: ${abans}, després: ${despres})`);
  } else if (ambFinal && !(await visible())) mal.push(`${on}: sense D2, l'«Ara tu» ha de sortir sol a l'últim pas`);
  await pagina.close();
  return mal;
}

(async () => {
  const srv = await serveix();
  const base = `http://127.0.0.1:${srv.address().port}/`;
  const navegador = await chromium.launch();
  if (CAPTURES) fs.mkdirSync(CAPTURES, {recursive: true});
  // Cada palanca sola, a la primera fitxa; els conjunts, a totes
  const feines = PALANQUES.map(p => [...FITXES[0], p]).concat(FITXES.flatMap(([m, id]) => CONJUNTS.map(c => [m, id, c])));
  const errors = [];
  let seguent = 0;
  const treballador = async () => {
    while (seguent < feines.length) {
      const [m, id, ux] = feines[seguent++];
      const mal = await prova(navegador, base, m, id, ux);
      for (const e of mal) console.error(e);
      errors.push(...mal);
    }
  };
  await Promise.all(Array.from({length: 4}, treballador));
  await navegador.close();
  srv.close();
  if (errors.length) {
    console.error(`\n${errors.length} error(s) en ${feines.length} proves de palanques.`);
    process.exit(1);
  }
  console.log(`Palanques correctes: ${feines.length} proves (${PALANQUES.length} palanques soles i ${CONJUNTS.length} conjunts a ${FITXES.length} fitxes).`);
})();
