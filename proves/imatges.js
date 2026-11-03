/* ═══════════════════════════════════════════════════════════════════
   proves/imatges.js — Torna a fer la imatge de cada calculadora
   ───────────────────────────────────────────────────────────────────
   La finestra «Escollir calculadora» (js/nucli/tria.js) mostra una
   imatge de cada calculadora: models/<id>/imatge.png (camp «imatge»
   del descriptor). Aquest script (Node + Playwright, no va al
   navegador) obre una fitxa de cada calculadora al pas 0, treu el
   ressaltat de les tecles i fotografia el dibuix de la calculadora,
   amb el fons transparent. Cal tornar-lo a passar quan canvia el
   dibuix d'una calculadora o se n'afegeix una.

   Ús, des de l'arrel del repositori:  node proves/imatges.js
   ═══════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs'), path = require('path'), http = require('http'), vm = require('vm');
const {chromium} = require('playwright');

const ARREL = path.join(__dirname, '..');
const TIPUS = {'.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.woff2': 'font/woff2', '.svg': 'image/svg+xml'};
/** La fitxa que es fotografia: una que tenen totes les calculadores (pas 0: pantalla de càlcul buida). */
const FITXA = 'cb4-26-q15';

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

/** Els ids i els descriptors del catàleg, llegits com ho fa el navegador. */
function cataleg() {
  const c = {console, URLSearchParams}; c.globalThis = c; vm.createContext(c);
  const x = f => vm.runInContext(fs.readFileSync(path.join(ARREL, f), 'utf8'), c, {filename: f});
  x('js/nucli/models.js'); x('models/cataleg.js');
  return c.Models.ids.map(id => { x(`models/${id}/model.js`); return c.Models.descriptor(id); });
}

(async () => {
  const srv = await serveix();
  const base = `http://127.0.0.1:${srv.address().port}/`;
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage({viewport: {width: 1366, height: 900}, deviceScaleFactor: 1});
  for (const d of cataleg()) {
    if (!d.imatge) { console.log(`${d.id}: el descriptor no té «imatge»`); continue; }
    await pagina.goto(`${base}fitxa.html?model=${d.id}&id=${FITXA}&pas=0`);
    await pagina.waitForSelector('.calculadora');
    await pagina.evaluate(() => document.fonts.ready);
    await pagina.waitForTimeout(400);
    // Sense el ressaltat del reproductor (tecles del pas, ordre, cursor) ni cap marca de la pantalla
    await pagina.evaluate(() => {
      // Al pas 0 la calculadora surt esvaïda (inactiva): per a la foto, sencera
      document.body.classList.add('en-marxa');
      for (const e of document.querySelectorAll('.calculadora *')) {
        e.classList.remove('del-pas', 'pendent', 'premuda', 'marcat');
        e.removeAttribute('data-ordre');
      }
      for (const e of document.querySelectorAll('.cursor-ma, .ma, .lcd-cursor, .cursor-tex')) e.style.visibility = 'hidden';
    });
    await pagina.waitForTimeout(500);   // la transició d'opacitat
    const desti = path.join(ARREL, 'models', d.id, d.imatge);
    await (await pagina.$('.calculadora')).screenshot({path: desti, omitBackground: true});
    console.log(`${d.id}: ${path.relative(ARREL, desti)} (${Math.round(fs.statSync(desti).size / 1024)} kB)`);
  }
  await navegador.close();
  srv.close();
})();
