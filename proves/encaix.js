/* ═══════════════════════════════════════════════════════════════════
   proves/encaix.js — Cada pas de cada fitxa cap a la finestra? (Node + Playwright)
   ───────────────────────────────────────────────────────────────────
   Serveix el repositori amb un servidor estàtic propi (port lliure) i,
   per a cada mida de finestra, cada calculadora i cada fitxa, salta a
   cada pas (també el pas 0, l'enunciat) i comprova:
     · que la pàgina no fa scroll (vertical ni horitzontal);
     · que la calculadora sencera és dins de la finestra (dues columnes);
     · que el pas actual es veu sencer dins de la llista de passos;
     · que no hi ha errors de JavaScript.
   I, una sola vegada, el recordatori del botó ▶: amb el
   rellotge de Playwright, comprova que no surt abans de 8 s, que surt
   als 8 s, que es torna a comptar quan es passa de pas amb → i que a
   l'últim pas (▶ desactivat) no surt mai.
   No forma part de comprova.js perquè necessita un navegador. Els
   fitxers de proves/ no els carrega cap pàgina: no cal augmentar VERSIO.

   Ús (des de l'arrel del repositori; cal el paquet «playwright» i el seu Chromium):
     node proves/encaix.js                      totes les calculadores, 3 finestres
     MODEL=fx-82ms node proves/encaix.js        només una calculadora
     FITXES=ans,fix node proves/encaix.js       només aquestes fitxes
     VP='[[1366,657]]' node proves/encaix.js    només aquestes finestres
     (amb FITXES, VP o MODEL no es prova el recordatori del botó ▶; RECORDA=1 el prova igualment amb FITXES)
   Acaba amb codi 1 si algun pas no hi cap.
   ═══════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const {chromium} = require('playwright');

const ARREL = path.join(__dirname, '..');
const FINESTRES = process.env.VP ? JSON.parse(process.env.VP) : [
  [1366, 657, {}],                                                          // Chromebook 11,6" (la de referència del projecte)
  [1280, 559, {}],                                                          // Lenovo 14" FHD, Windows 150 %, amb barra de marcadors
  [1280, 632, {hasTouch: true, isMobile: true, deviceScaleFactor: 1.5}],    // tauleta Android 10" horitzontal
];
const TIPUS = {'.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png',
  '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.json': 'application/json'};

function serveix() {
  const servidor = http.createServer((req, res) => {
    const ruta = path.normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    const fitxer = path.join(ARREL, ruta === '/' ? 'index.html' : ruta);
    if (!fitxer.startsWith(ARREL) || !fs.existsSync(fitxer) || fs.statSync(fitxer).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, {'Content-Type': TIPUS[path.extname(fitxer)] || 'application/octet-stream'});
    fs.createReadStream(fitxer).pipe(res);
  });
  return new Promise(ok => servidor.listen(0, '127.0.0.1', () => ok(servidor)));
}

const MESURA = () => {
  const r = s => { const e = document.querySelector(s); return e ? e.getBoundingClientRect() : null; };
  const de = document.documentElement;
  const dosCol = getComputedStyle(document.querySelector('.contingut')).display === 'grid';
  const calc = r('.calculadora'), actual = r('.pas.actual'), passos = r('.passos');
  const dalt = dosCol && passos ? Math.max(0, passos.top - 1) : 0;
  const baix = Math.min(innerHeight, dosCol && passos ? passos.bottom + 1 : innerHeight) + 0.5;
  return {
    scrollV: de.scrollHeight - innerHeight,
    scrollH: de.scrollWidth - innerWidth,
    calcSurt: dosCol && calc ? calc.bottom - innerHeight : 0,
    actualAmagat: actual ? !(actual.top >= dalt && actual.bottom <= baix) : false,
  };
};

/** El recordatori del botó ▶: torna una llista de problemes (buida si tot va bé). */
async function provaRecorda(browser, BASE) {
  const mal = [];
  const page = await browser.newPage({viewport: {width: 1366, height: 657}});
  await page.clock.install();
  await page.goto(BASE + 'fitxa.html?id=cb4-26-q15', {waitUntil: 'load'});
  await page.waitForFunction(() => globalThis.fitxa && fitxa.total !== undefined);
  const te = () => page.evaluate(() => document.querySelector('.boto.principal').classList.contains('recorda'));
  const avanca = async ms => { await page.clock.runFor(ms); await page.evaluate(() => new Promise(ok => requestAnimationFrame(ok))); };
  await page.keyboard.press('ArrowRight');
  await avanca(7800);
  if (await te()) mal.push('recordatori del botó ▶: surt abans dels 8 s');
  await avanca(400);
  if (!(await te())) mal.push('recordatori del botó ▶: no surt als 8 s');
  await page.keyboard.press('ArrowRight');
  if (await te()) mal.push('recordatori del botó ▶: no s\'apaga en passar de pas');
  await avanca(7800);
  if (await te()) mal.push('recordatori del botó ▶: no es torna a comptar en passar de pas');
  await page.evaluate(() => fitxa.salta(fitxa.total - 1));
  await avanca(10000);
  if (await te()) mal.push('recordatori del botó ▶: surt a l\'últim pas');
  await page.close();
  return mal;
}

(async () => {
  const servidor = await serveix();
  const BASE = `http://127.0.0.1:${servidor.address().port}/`;
  const browser = await chromium.launch();
  const nomesFitxes = process.env.FITXES ? new Set(process.env.FITXES.split(',')) : null;
  let total = 0;
  const problemes = [];

  // Les calculadores i les seves fitxes, tal com les veu el navegador
  const pagina0 = await browser.newPage();
  await pagina0.goto(BASE + 'index.html', {waitUntil: 'load'});
  const models = (await pagina0.evaluate(async () => (await Models.descriptorsTots()).map(d => d.id)))
    .filter(id => !process.env.MODEL || id === process.env.MODEL);
  const fitxes = {};
  for (const id of models) {
    await pagina0.goto(BASE + 'index.html?model=' + id, {waitUntil: 'load'});
    fitxes[id] = (await pagina0.evaluate(async model => (await Models.carrega(model)).dades.FITXES.map(f => f.id), id))
      .filter(f => !nomesFitxes || nomesFitxes.has(f));
  }
  await pagina0.close();

  for (const [w, h, extra] of FINESTRES) {
    const context = await browser.newContext(Object.assign({viewport: {width: w, height: h}, reducedMotion: 'reduce'}, extra));
    for (const model of models) {
      for (const id of fitxes[model]) {
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
        await page.goto(`${BASE}fitxa.html?id=${id}&model=${model}`, {waitUntil: 'load'});
        await page.waitForFunction(() => globalThis.fitxa && fitxa.total !== undefined);
        await page.evaluate(() => document.fonts.ready);
        const n = await page.evaluate(() => fitxa.total);
        for (let i = -1; i < n; i++) {
          await page.evaluate(k => fitxa.salta(k), i);
          await page.evaluate(() => new Promise(ok => requestAnimationFrame(() => requestAnimationFrame(ok))));
          const m = await page.evaluate(MESURA);
          total++;
          const mal = [];
          if (m.scrollV > 1) mal.push(`scroll vertical de ${Math.round(m.scrollV)} px`);
          if (m.scrollH > 1) mal.push(`scroll horitzontal de ${Math.round(m.scrollH)} px`);
          if (m.calcSurt > 0.5) mal.push(`la calculadora surt ${Math.round(m.calcSurt)} px per baix`);
          if (m.actualAmagat) mal.push('el pas actual no es veu sencer');
          if (mal.length) problemes.push(`${w}×${h} · ${model} · ${id} · pas ${i + 1}: ${mal.join('; ')}`);
        }
        for (const e of new Set(errors)) problemes.push(`${w}×${h} · ${model} · ${id}: error de JavaScript: ${e}`);
        await page.close();
      }
    }
    await context.close();
  }
  const ambRecorda = !process.env.VP && !process.env.MODEL && (!nomesFitxes || process.env.RECORDA);
  if (ambRecorda) problemes.push(...await provaRecorda(browser, BASE));
  await browser.close();
  servidor.close();

  if (problemes.length) {
    console.log(problemes.slice(0, 60).join('\n'));
    console.log(`\n${problemes.length} problemes en ${total} passos.`);
    process.exit(1);
  }
  console.log(`Tot hi cap: ${total} passos${ambRecorda ? ', i el recordatori del botó ▶ funciona' : ''} (${models.join(', ')}; finestres ${FINESTRES.map(f => f[0] + '×' + f[1]).join(', ')}).`);
})().catch(e => { console.error(e); process.exit(1); });
