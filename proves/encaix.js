/* ═══════════════════════════════════════════════════════════════════
   proves/encaix.js — Cada pas de cada fitxa cap a la finestra? (Node + Playwright)
   ───────────────────────────────────────────────────────────────────
   Serveix el repositori amb un servidor estàtic propi (port lliure) i,
   per a cada mida de finestra, cada calculadora i cada fitxa, salta a
   cada pas (també el pas 0, l'enunciat) i comprova:
     · que la pàgina no fa scroll (vertical ni horitzontal);
     · que la calculadora sencera és dins de la finestra (dues columnes);
     · que el pas actual es veu sencer dins de la llista de passos;
     · que la columna de l'esquerra no fa scroll horitzontal (també en
       mode «Ara tu», amb la solució oberta i cada pas del seu reproductor);
     · que no hi ha errors de JavaScript.
   I, una sola vegada, els peus i l'animació: amb el rellotge de
   Playwright, que el peu de la fitxa surt sencer i, als 5 s, només hi
   queda l'autor; que el peu de la portada es veu sencer a baix de la
   finestra; i que mentre s'anima un pas la pàgina no fa scroll.
   No forma part de comprova.js perquè necessita un navegador. Els
   fitxers de proves/ no els carrega cap pàgina: no cal augmentar VERSIO.

   Ús (des de l'arrel del repositori; cal el paquet «playwright» i el seu Chromium):
     node proves/encaix.js                      totes les calculadores, 3 finestres
     MODEL=fx-82ms node proves/encaix.js        només una calculadora
     FITXES=ans,fix node proves/encaix.js       només aquestes fitxes
     VP='[[1366,657]]' node proves/encaix.js    només aquestes finestres
     (amb FITXES, VP o MODEL no es proven els peus; UNCOP=1 els prova igualment amb FITXES)
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
    columnaH: (c => (c ? c.scrollWidth - c.clientWidth : 0))(document.querySelector('.columna')),
    calcSurt: dosCol && calc ? calc.bottom - innerHeight : 0,
    actualAmagat: actual ? !(actual.top >= dalt && actual.bottom <= baix) : false,
  };
};

/** Els peus (el de la fitxa s'escurça als 5 s; el de la portada sempre es veu) i l'animació sense scroll. */
async function provaUnCop(browser, BASE) {
  const mal = [];
  const page = await browser.newPage({viewport: {width: 1366, height: 657}});
  await page.clock.install();
  await page.goto(BASE + 'fitxa.html?id=cb4-26-q15', {waitUntil: 'load'});
  await page.waitForFunction(() => globalThis.fitxa && fitxa.total !== undefined);
  const peu = () => page.evaluate(() => {
    const p = document.querySelector('.peu'), resta = p && p.querySelector('.peu-resta');
    return {autor: p ? p.querySelector('.peu-autor').textContent : '', resta: Boolean(resta && resta.getBoundingClientRect().width > 0 && getComputedStyle(resta).opacity === '1')};
  });
  let ara = await peu();
  if (!ara.resta) mal.push('peu de la fitxa: en obrir-la, ha de sortir sencer');
  await page.clock.runFor(4800);
  if (!(await peu()).resta) mal.push('peu de la fitxa: s\'escurça abans dels 5 s');
  await page.clock.runFor(1000);
  ara = await peu();
  if (ara.resta || ara.autor !== '© 2026 David Arso Civil') mal.push(`peu de la fitxa: als 5 s només hi ha de quedar «© 2026 David Arso Civil» (hi ha «${ara.autor}», resta visible: ${ara.resta})`);
  await page.close();
  // La portada: el peu sencer, a baix de la finestra, també amb la pàgina a mig desplaçar
  const p1 = await browser.newPage({viewport: {width: 1280, height: 559}});
  await p1.goto(BASE + 'index.html', {waitUntil: 'load'});
  await p1.waitForSelector('.bloc');
  await p1.evaluate(() => scrollTo(0, 200));
  const q = await p1.evaluate(() => { const r = document.querySelector('.peu').getBoundingClientRect(); return {baix: r.bottom, dalt: r.top, h: innerHeight, text: document.querySelector('.peu').textContent}; });
  if (Math.abs(q.baix - q.h) > 1 || !/Versió \d+/.test(q.text) || !/CC BY-NC-ND/.test(q.text)) mal.push(`peu de la portada: ha de ser sencer i enganxat a baix de la finestra (de ${q.dalt} a ${q.baix}, finestra ${q.h})`);
  await p1.close();
  // Mentre s'anima un pas (la vora groga d'atenció i el cursor, que surt de sota la calculadora), la pàgina no creix
  const p2 = await browser.newPage({viewport: {width: 1280, height: 559}});
  await p2.goto(BASE + 'fitxa.html?id=cb4-26-q15', {waitUntil: 'load'});
  await p2.waitForFunction(() => globalThis.fitxa && fitxa.total !== undefined);
  await p2.keyboard.press('ArrowRight');
  for (let t = 0; t < 40; t++) {
    await p2.waitForTimeout(50);
    if (await p2.evaluate(() => document.documentElement.scrollHeight > innerHeight || document.documentElement.scrollWidth > innerWidth)) {
      mal.push('mentre s\'anima un pas, la pàgina fa scroll (vora d\'atenció o cursor)');
      break;
    }
  }
  await p2.close();
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
          if (m.columnaH > 1) mal.push(`la columna de l'esquerra fa scroll horitzontal (${Math.round(m.columnaH)} px)`);
          if (m.calcSurt > 0.5) mal.push(`la calculadora surt ${Math.round(m.calcSurt)} px per baix`);
          if (m.actualAmagat) mal.push('el pas actual no es veu sencer');
          if (mal.length) problemes.push(`${w}×${h} · ${model} · ${id} · pas ${i + 1}: ${mal.join('; ')}`);
        }
        // El mode «Ara tu»: la solució oberta i cada pas del seu reproductor, sense scroll horitzontal a la columna
        if (await page.evaluate(() => Boolean(document.querySelector('.ara-tu-comprova')))) {
          await page.evaluate(() => fitxa.salta(fitxa.total - 1));
          await page.evaluate(() => fitxa.seguent());        // l'«Ara tu» és en una pantalla a part: s'hi va amb ▶
          await page.click('.ara-tu:not(.prova-tu) > .ara-tu-boto');
          await page.click('.ara-tu-comprova');
          const k = await page.evaluate(() => document.querySelectorAll('.passos-ara-tu .pas:not(.zero)').length);
          for (let i = 0; i <= k; i++) {
            if (i) await page.keyboard.press('ArrowDown');
            await page.evaluate(() => new Promise(ok => setTimeout(ok, 30)));
            const m = await page.evaluate(MESURA);
            total++;
            if (m.columnaH > 1 || m.scrollH > 1) problemes.push(`${w}×${h} · ${model} · ${id} · «Ara tu» pas ${i}: scroll horitzontal (${Math.round(Math.max(m.columnaH, m.scrollH))} px)`);
          }
        }
        for (const e of new Set(errors)) problemes.push(`${w}×${h} · ${model} · ${id}: error de JavaScript: ${e}`);
        await page.close();
      }
    }
    await context.close();
  }
  const ambUnCop = !process.env.VP && !process.env.MODEL && (!nomesFitxes || process.env.UNCOP);
  if (ambUnCop) problemes.push(...await provaUnCop(browser, BASE));
  await browser.close();
  servidor.close();

  if (problemes.length) {
    console.log(problemes.slice(0, 60).join('\n'));
    console.log(`\n${problemes.length} problemes en ${total} passos.`);
    process.exit(1);
  }
  console.log(`Tot hi cap: ${total} passos${ambUnCop ? ', i els peus i l\'animació van bé' : ''} (${models.join(', ')}; finestres ${FINESTRES.map(f => f[0] + '×' + f[1]).join(', ')}).`);
})().catch(e => { console.error(e); process.exit(1); });
