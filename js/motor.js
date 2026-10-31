/* ═══════════════════════════════════════════════════════════════════
   motor.js — La pàgina d'una fitxa i el seu reproductor pas a pas
   ───────────────────────────────────────────────────────────────────
   Segueix el model dels procediments de PAU (step-quiz/pau,
   procediments/motor.js): una fitxa és una llista d'estats; el motor
   en dibuixa un i anima el pas al següent. Aquí, l'animació és el
   cursor que prem les tecles del pas, una darrere l'altra, i després
   la pantalla de la calculadora canvia.

   Pas 0: la pantalla de partida (fitxa.inici) i l'enunciat a la bombolla.
   Pas i (1…n): les tecles del pas i ja premudes i la pantalla del pas i.

   Depèn de KaTeX, Tecles, Pantalla, G i Dades. Exporta «Motor»:
     Motor.inicia([id]) → controlador (per provar-lo des de la consola)
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

/* ── 1. CONFIGURACIÓ ───────────────────────────────────────────────── */

/** Durades en mil·lisegons, a velocitat normal. */
const TEMPS = Object.freeze({
  cursor: 430,         // el cursor va fins a una tecla
  clic: 150,           // la tecla està premuda
  entreTecles: 170,    // pausa entre dues tecles del mateix pas
  abansPantalla: 140,  // després de l'última tecla, abans que canviï la pantalla
  esperaInici: 450,    // abans del primer pas, en reproduir
  llegir: 1000,        // pausa entre passos en reproduir…
  perParaula: 110,     // …més aquest temps per paraula del text
});
const CORBA = 'cubic-bezier(.45,.05,.25,1)';

const PEU = '© 2026 <strong>David Arso Civil</strong>. Ús educatiu lliure. Prohibida la comercialització '
  + 'i la modificació (<a rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>). '
  + 'Web no oficial, sense relació amb el fabricant de la calculadora.';


/* ── 2. UTILITATS ──────────────────────────────────────────────────── */

function element(etiqueta, atributs = {}, fills = []) {
  const e = document.createElement(etiqueta);
  for (const [k, v] of Object.entries(atributs)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === 'class') e.className = v;
    else if (k === 'text') e.textContent = v;
    else if (k === 'html') e.innerHTML = v;
    else e.setAttribute(k, v === true ? '' : v);
  }
  e.append(...[].concat(fills).filter(Boolean));
  return e;
}

const espera = ms => new Promise(resol => setTimeout(resol, ms));
const escapa = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const formula = t => katex.renderToString(t, {throwOnError: false});

/**
 * Text d'una fitxa → HTML: $TeX$ = fórmula, [[id]] = tecla petita,
 * {{Opció}} = text d'un menú de la calculadora.
 */
function text(t) {
  return String(t || '').split(/(\$[^$]+\$|\[\[[^\]]+\]\]|\{\{[^}]+\}\})/).map(tros => {
    if (/^\$[^$]+\$$/.test(tros)) return formula(tros.slice(1, -1));
    if (/^\[\[[^\]]+\]\]$/.test(tros)) return Tecles.html(tros.slice(2, -2), {petita: true});
    if (/^\{\{[^}]+\}\}$/.test(tros)) return `<span class="opcio-menu">${escapa(tros.slice(2, -2))}</span>`;
    return escapa(tros).replace(/\n/g, '<br>');
  }).join('');
}
/** Nombre de paraules d'un text (per saber quanta estona cal per llegir-lo). */
const paraules = t => String(t || '').replace(/\$[^$]*\$/g, ' x ').split(/\s+/).filter(Boolean).length;

function anima(el, fotogrames, opcions) {
  return el.animate(fotogrames, Object.assign({fill: 'forwards', easing: CORBA}, opcions)).finished;
}

function rectangle(el, origen) {
  const o = origen.getBoundingClientRect(), r = el.getBoundingClientRect();
  return {x: r.left - o.left, y: r.top - o.top, w: r.width, h: r.height,
    cx: r.left - o.left + r.width / 2, cy: r.top - o.top + r.height / 2};
}

/** Paràmetres de l'adreça (només fem servir ?id=…). */
function parametre(nom) {
  try { return new URLSearchParams(location.search).get(nom); } catch (e) { return null; }
}


/* ── 3. ESTRUCTURA DE LA PÀGINA ────────────────────────────────────── */

const ICONES = Object.freeze({
  reinicia: 'M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z',
  anterior: 'M15.5 5 8.5 12l7 7z',
  reprodueix: 'M8 5v14l11-7z',
  atura: 'M7 5h4v14H7zM13 5h4v14h-4z',
  seguent: 'M8.5 5l7 7-7 7z',
});
const icona = d => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
const CURSOR = '<svg viewBox="0 0 22 30" aria-hidden="true"><path d="M2 2 L2 24 L7.6 18.8 L11.4 27.4 L15 25.8 L11.3 17.4 L18.6 17.4 Z" '
  + 'fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg>';

function construeixPagina(fitxa, bloc, germanes, contenidor) {
  const boto = (classe, nom, d) => element('button', {class: 'boto ' + classe, type: 'button', title: nom, 'aria-label': nom, html: icona(d)});
  const r = {
    enunciat: element('p', {class: 'enunciat', html: text(fitxa.enunciat)}),
    lcd: element('div', {class: 'lcd-pantalla', role: 'img', 'aria-label': 'Pantalla de la calculadora'}),
    tira: element('div', {class: 'tira', role: 'group', 'aria-label': 'Tecles que es premen, pas a pas'}),
    efectes: element('div', {class: 'efectes', 'aria-hidden': 'true'}),
    cursor: element('div', {class: 'cursor', 'aria-hidden': 'true', html: CURSOR}),
    reinicia: boto('', 'Torna a començar', ICONES.reinicia),
    anterior: boto('', 'Pas anterior', ICONES.anterior),
    reprodueix: boto('principal', 'Reprodueix', ICONES.reprodueix),
    seguent: boto('', 'Pas següent', ICONES.seguent),
    punts: element('div', {class: 'punts', role: 'group', 'aria-label': 'Passos'}),
    velocitat: element('select', {id: 'velocitat'}),
    numPas: element('span', {class: 'num-pas'}),
    textPas: element('span', {class: 'text-pas'}),
  };
  for (const [valor, nom] of [['0.6', 'lenta'], ['1', 'normal'], ['1.6', 'ràpida']]) {
    r.velocitat.append(element('option', {value: valor, text: nom, selected: valor === '1'}));
  }
  r.explicacio = element('p', {class: 'explicacio', 'aria-live': 'polite'}, [r.numPas, r.textPas]);
  r.teclat = element('div', {class: 'teclat', html: htmlTeclat()});
  r.calculadora = element('div', {class: 'calculadora'}, [
    element('div', {class: 'marc-lcd'}, [element('div', {class: 'lcd'}, [r.lcd])]),
    r.teclat,
  ]);
  r.escenari = element('div', {class: 'escenari'}, [r.calculadora, r.efectes, r.cursor]);
  r.controls = element('div', {class: 'controls'}, [
    element('div', {class: 'reproductor'}, [
      element('div', {class: 'botons'}, [r.reinicia, r.anterior, r.reprodueix, r.seguent]),
      element('label', {class: 'velocitat', for: 'velocitat', text: 'Velocitat '}, [r.velocitat]),
      r.punts,
    ]),
    r.explicacio,
  ]);

  // Les relacionades d'un altre bloc (les del mateix bloc ja surten a la llista del bloc)
  const relacionades = (fitxa.relacionades || []).map(id => Dades.FITXES.find(f => f.id === id))
    .filter(f => f && f.bloc !== fitxa.bloc);
  const enllac = f => element('a', {class: 'pastilla' + (f.id === fitxa.id ? ' actual' : ''), href: 'fitxa.html?id=' + encodeURIComponent(f.id),
    'aria-current': f.id === fitxa.id ? 'page' : null, text: f.titol});

  const altres = element('nav', {class: 'altres', 'aria-label': 'Altres fitxes'}, [
    germanes.length > 1 ? element('div', {}, [
      element('p', {class: 'titol-altres', text: 'Fitxes de «' + bloc.titol + '»'}),
      element('div', {class: 'pastilles'}, germanes.map(enllac))]) : null,
    relacionades.length ? element('div', {}, [
      element('p', {class: 'titol-altres', text: 'Et pot interessar'}),
      element('div', {class: 'pastilles'}, relacionades.map(enllac))]) : null,
  ]);

  contenidor.replaceChildren(
    element('header', {class: 'capcalera'}, [
      element('a', {class: 'torna', href: 'index.html#' + bloc.id, text: '← Calculadora'}),
      element('div', {}, [
        element('p', {class: 'nom-bloc', text: bloc.titol}),
        element('h1', {text: fitxa.titol}),
      ]),
    ]),
    element('main', {class: 'contingut'}, [
      r.escenari,
      element('div', {class: 'costat'}, [
        element('p', {class: 'titol-tira', text: 'Les tecles, pas a pas'}),
        r.tira,
        altres,
      ]),
      element('div', {class: 'lateral'}, [
        r.enunciat,
        r.controls,
        element('details', {class: 'targeta recorda', open: true}, [
          element('summary', {}, [element('h2', {text: 'Per recordar'})]),
          element('p', {html: text(fitxa.recorda)}),
        ]),
      ]),
    ]),
    element('footer', {class: 'peu', html: PEU}),
  );
  return r;
}


/* ── 4. EL TECLAT I LA LLISTA DE PASSOS ───────────────────────────── */

/**
 * El teclat sencer (Tecles.TECLAT): una graella de 6 columnes a dalt i de 5 a
 * baix. Les tecles de pàgina (pgup, pgdn) fan una sola peça alta; les fletxes i
 * OK, una creu. Cada tecla porta data-tecla="<id>" (el cursor la busca així).
 */
function htmlTeclat() {
  const cel = (id, fila, col, extra = '') => `<div class="cel${extra}" style="grid-row:${fila};grid-column:${col}">`
    + Tecles.html(id, {teclat: true, atributs: `data-tecla="${id}"`}) + '</div>';
  let dalt = '';
  Tecles.TECLAT.dalt.forEach((fila, f) => fila.forEach((id, c) => {
    if (!id || id === 'pgdn') return;
    if (id === 'pgup') {
      dalt += `<div class="cel pagina" style="grid-row:1 / span 2;grid-column:${c + 1}">`
        + Tecles.html('pgup', {teclat: true, atributs: 'data-tecla="pgup"'})
        + Tecles.html('pgdn', {teclat: true, atributs: 'data-tecla="pgdn"'}) + '</div>';
    } else {
      dalt += cel(id, f + 1, c + 1, ['up', 'down', 'left', 'right', 'ok'].includes(id) ? ' de-creu' : '');
    }
  }));
  let baix = '';
  Tecles.TECLAT.baix.forEach((fila, f) => fila.forEach((id, c) => { baix += cel(id, f + 1, c + 1); }));
  return `<div class="teclat-dalt">${dalt}</div><div class="teclat-baix">${baix}</div>`;
}

/** La llista de passos (columna de la dreta): un botó per pas, amb les seves tecles. */
function omplTira(r, passos, enClicar) {
  const files = passos.map((pas, i) => {
    const html = pas.tecles.length
      ? pas.tecles.map((id, j) => Tecles.html(id, {ambShift: j > 0 && pas.tecles[j - 1] === 'shift', atributs: `data-n="${j}"`})).join('')
      : '<span class="nomes-mira">mira la pantalla</span>';
    const nom = pas.tecles.length ? pas.tecles.map(id => Tecles.TECLES[id].nom).join(', ') : 'mira la pantalla';
    const g = element('button', {class: 'grup', type: 'button', title: `Ves al pas ${i + 1}`, 'aria-label': `Pas ${i + 1}: ${nom}`},
      [element('span', {class: 'num', text: String(i + 1)}), element('span', {class: 'tecles', html})]);
    g.addEventListener('click', () => enClicar(i));
    return g;
  });
  r.tira.replaceChildren(...files);
  return files;
}

/** Marca els passos: els d'abans de «pas», fets; el de «pas», actual. */
function marcaTira(files, pas) {
  files.forEach((g, i) => {
    g.classList.toggle('fet', i < pas);
    g.classList.toggle('actual', i === pas);
  });
}

/**
 * Al teclat, ressalta les tecles del pas i hi posa l'ordre en què es premen
 * (una tecla que es prem dues vegades porta «2·3»). pas < 0: cap.
 */
function marcaTeclat(r, passos, pas) {
  r.teclat.querySelectorAll('.del-pas').forEach(t => { t.classList.remove('del-pas'); t.removeAttribute('data-ordre'); });
  if (pas < 0) return;
  const ordre = new Map();
  passos[pas].tecles.forEach((id, j) => ordre.set(id, (ordre.get(id) || []).concat(j + 1)));
  for (const [id, ns] of ordre) {
    const t = r.teclat.querySelector(`[data-tecla="${id}"]`);
    if (!t) continue;
    t.classList.add('del-pas');
    t.setAttribute('data-ordre', ns.join('·'));
  }
}


/* ── 5. CURSOR ─────────────────────────────────────────────────────── */

function creaCursor(r, temps) {
  let x = null, y = null;
  const transforma = (escala = 1) => `translate(${x}px, ${y}px) scale(${escala})`;
  const el = r.cursor;
  return {
    async va(nx, ny) {
      if (x === null) {                       // apareix per sota de la cantonada inferior dreta
        x = r.escenari.clientWidth - 30;
        y = r.escenari.clientHeight + 10;
        el.style.transform = transforma();
        el.classList.add('visible');
      }
      const sortida = transforma();
      x = nx; y = ny;
      await anima(el, [{transform: sortida}, {transform: transforma()}], {duration: temps(TEMPS.cursor)});
      el.style.transform = transforma();
      el.getAnimations().forEach(a => a.cancel());
    },
    prem(premut) {
      const [de, a] = premut ? [1, 0.84] : [0.84, 1];
      el.animate([{transform: transforma(de)}, {transform: transforma(a)}], {duration: temps(90), fill: 'forwards'});
    },
    ona(px, py) {
      const o = element('div', {class: 'ona'});
      o.style.left = px + 'px';
      o.style.top = py + 'px';
      r.efectes.append(o);
      o.animate([{transform: 'scale(.3)', opacity: 0.9}, {transform: 'scale(1.6)', opacity: 0}],
        {duration: temps(420), easing: 'ease-out'}).finished.then(() => o.remove());
    },
    amaga() {
      x = y = null;
      el.classList.remove('visible');
      el.getAnimations().forEach(a => a.cancel());
    },
  };
}


/* ── 6. REPRODUCTOR ────────────────────────────────────────────────── */

function creaReproductor(r, fitxa, temps) {
  const passos = fitxa.passos;
  const darrer = passos.length - 1;
  const cursor = creaCursor(r, temps);
  let idx = -1;                 // -1 = pas 0 (abans de començar)
  let ocupat = false, reproduint = false, torn = 0;
  let pantallaActual = null;

  function mostraPantalla(estat, canvi = false) {
    pantallaActual = estat;
    r.lcd.innerHTML = Pantalla.html(estat);
    if (canvi) r.lcd.animate([{opacity: 0.35}, {opacity: 1}], {duration: temps(220), easing: 'ease-out'});
  }

  const grups = omplTira(r, passos, i => salta(i));
  r.punts.replaceChildren(...passos.map((_, i) => {
    const p = element('button', {class: 'punt', type: 'button', 'aria-label': `Pas ${i + 1}`});
    p.addEventListener('click', () => salta(i));
    return p;
  }));

  function pinta() {
    const inici = idx < 0;
    r.numPas.textContent = inici ? `Pas 0 de ${passos.length}` : `Pas ${idx + 1} de ${passos.length}`;
    r.textPas.innerHTML = inici ? text(fitxa.enunciat) : text(passos[idx].text);
    r.explicacio.classList.toggle('inici', inici);
    r.enunciat.classList.toggle('en-espera', inici);
    [...r.punts.children].forEach((p, i) => {
      p.className = 'punt' + (i === idx ? ' actual' : i < idx ? ' fet' : '');
      p.setAttribute('aria-current', i === idx ? 'step' : 'false');
    });
    r.anterior.disabled = inici;
    r.seguent.disabled = idx === darrer;
  }

  function marcaReproduccio(estat) {
    reproduint = estat;
    const nom = estat ? 'Atura' : 'Reprodueix';
    r.reprodueix.innerHTML = icona(estat ? ICONES.atura : ICONES.reprodueix);
    r.reprodueix.title = nom;
    r.reprodueix.setAttribute('aria-label', nom);
  }

  /** Va al pas i (-1 = pas 0), sense animació. */
  function salta(i) {
    if (ocupat) return;
    torn++;
    marcaReproduccio(false);
    idx = Math.max(-1, Math.min(darrer, i));
    mostraPantalla(idx < 0 ? fitxa.inici : passos[idx].pantalla);
    marcaTira(grups, idx);
    marcaTeclat(r, passos, idx);
    r.teclat.classList.remove('shift-actiu');
    cursor.amaga();
    pinta();
  }

  /** Anima el pas següent: el cursor prem les tecles i canvia la pantalla. */
  async function seguent() {
    if (ocupat || idx >= darrer) return;
    ocupat = true;
    try {
      idx++;
      pinta();
      const pas = passos[idx];
      marcaTira(grups, idx);                  // els passos anteriors, fets; aquest, actual
      marcaTeclat(r, passos, idx);            // al teclat, les tecles del pas amb el seu ordre
      if (pas.tecles.length) {
        const petites = [...grups[idx].querySelectorAll('.tecla')];
        for (let j = 0; j < pas.tecles.length; j++) {
          const id = pas.tecles[j];
          const t = r.teclat.querySelector(`[data-tecla="${id}"]`);
          const q = rectangle(t, r.escenari);
          await cursor.va(q.cx - 2, q.cy - 2);
          cursor.prem(true);
          t.classList.add('premuda');
          if (petites[j]) petites[j].classList.add('premuda');
          cursor.ona(q.cx, q.cy);
          await espera(temps(TEMPS.clic));
          cursor.prem(false);
          t.classList.remove('premuda');
          if (petites[j]) petites[j].classList.remove('premuda');
          // SHIFT: surt la S a la pantalla i les funcions blaves del teclat es ressalten fins a la tecla següent
          r.teclat.classList.toggle('shift-actiu', id === 'shift');
          if (id === 'shift') mostraPantalla(Pantalla.ambIndicador(pantallaActual, 'shift'));
          if (j < pas.tecles.length - 1) await espera(temps(TEMPS.entreTecles));
        }
        await espera(temps(TEMPS.abansPantalla));
      } else {
        cursor.amaga();
      }
      mostraPantalla(pas.pantalla, true);
    } finally {
      ocupat = false;
    }
    if (idx === darrer) cursor.amaga();
  }

  async function reprodueix() {
    if (reproduint) { marcaReproduccio(false); return; }
    if (ocupat) return;
    if (idx >= darrer) salta(-1);
    marcaReproduccio(true);
    const meu = ++torn;
    await espera(temps(TEMPS.esperaInici));
    while (reproduint && meu === torn && idx < darrer) {
      await seguent();
      if (!reproduint || meu !== torn) break;
      await espera(temps(TEMPS.llegir + paraules(passos[idx].text) * TEMPS.perParaula));
    }
    if (meu === torn) marcaReproduccio(false);
  }

  const atura = () => { if (reproduint) marcaReproduccio(false); };

  r.reprodueix.addEventListener('click', reprodueix);
  r.seguent.addEventListener('click', () => { atura(); seguent(); });
  r.anterior.addEventListener('click', () => salta(idx - 1));
  r.reinicia.addEventListener('click', () => salta(-1));

  salta(-1);
  return {salta, seguent, reprodueix, atura,
    anterior: () => salta(idx - 1),
    get pas() { return idx; }, get total() { return passos.length; }, get ocupat() { return ocupat; }};
}


/* ── 7. INICI ──────────────────────────────────────────────────────── */

function inicia(id = parametre('id'), contenidor = document.getElementById('fitxa')) {
  if (typeof katex === 'undefined') {
    contenidor.replaceChildren(element('p', {class: 'error-carrega',
      text: 'No s\'ha pogut carregar KaTeX, la biblioteca que dibuixa les fórmules. Comprova la connexió i torna a carregar la pàgina.'}));
    return null;
  }
  const fitxa = Dades.FITXES.find(f => f.id === id) || null;
  if (!fitxa) {
    contenidor.replaceChildren(element('p', {class: 'error-carrega', html:
      `No hi ha cap fitxa «${escapa(id || '')}». <a href="index.html">Torna a la portada</a>.`}));
    return null;
  }
  const bloc = Dades.BLOCS.find(b => b.id === fitxa.bloc);
  const germanes = Dades.FITXES.filter(f => f.bloc === fitxa.bloc);
  document.title = fitxa.titol + ' — Calculadora fx-82SP CW';
  document.body.style.setProperty('--cat', bloc.color);

  const r = construeixPagina(fitxa, bloc, germanes, contenidor);
  let velocitat = 1;
  const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const temps = ms => Math.max(40, (ms / velocitat) * (reduit ? 0.35 : 1));
  r.velocitat.addEventListener('change', () => { velocitat = parseFloat(r.velocitat.value) || 1; });

  const reproductor = creaReproductor(r, fitxa, temps);

  /* Teclat: espai = reprodueix o atura; fletxes ← → = pas anterior o següent. */
  document.addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.defaultPrevented) return;
    const t = e.target instanceof Element ? e.target : document.body;
    if (t.closest('input, select, textarea')) return;
    if (e.key === ' ') {
      if (t.closest('button, a, summary')) return;
      e.preventDefault();
      reproductor.reprodueix();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      reproductor.atura();
      reproductor.seguent();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      reproductor.anterior();
    }
  });
  return reproductor;
}

arrel.Motor = Object.freeze({inicia, text});

})(globalThis);
