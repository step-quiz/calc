/* ═══════════════════════════════════════════════════════════════════
   motor.js — La pàgina d'una fitxa i el seu reproductor pas a pas
   ───────────────────────────────────────────────────────────────────
   Segueix el model dels procediments de PAU (step-quiz/pau,
   procediments/motor.js): una fitxa és una llista d'estats; el motor
   en dibuixa un i anima el pas al següent.

   Dues columnes (David, 31/10/2026):
     · a l'esquerra, tot el que es llegeix: l'enunciat, el reproductor i
       la llista de passos. El pas actual es desplega i mostra la seva
       frase; a sota, les altres fitxes del bloc, plegades;
     · a la dreta, només la calculadora (pantalla i teclat sencer).
   Animació d'un pas: les tecles del pas s'emmarquen al teclat (amb el
   número d'ordre si n'hi ha de 2 a 6), el cursor les prem una a una i la
   pantalla canvia després de CADA tecla, com a la calculadora: les
   pantalles intermèdies les calcula simulador.js.

   Pas 0 (idx = -1): la pantalla de partida (fitxa.inici).
   Depèn de KaTeX, Tecles, Pantalla, G, Dades i Simulador. Exporta «Motor».
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

/* ── 1. CONFIGURACIÓ ───────────────────────────────────────────────── */

/** Durades de l'animació de les tecles, en mil·lisegons, a velocitat «ràpida». */
const TEMPS = Object.freeze({
  cursor: 430,         // el cursor va fins a una tecla
  clic: 150,           // la tecla està premuda
  entreTecles: 170,    // pausa entre dues tecles del mateix pas (la pantalla ja ha canviat)
  pantalla: 220,       // la pantalla del final del pas apareix
});
/** Velocitats de les tecles (factor de les durades): «normal» és un 65 % més lenta que «ràpida» (David, 31/10/2026: 1,5 i després un 10 % més)
    i «lenta» un 15 % més lenta que «normal» (1,65 × 1,15 ≈ 1,9). Per defecte, «normal». */
const VELOCITATS = Object.freeze([['lenta', 1.9], ['normal', 1.65], ['ràpida', 1]]);
const PER_DEFECTE = 1.65;
const CORBA = 'cubic-bezier(.45,.05,.25,1)';

/**
 * Versió de la web. Quan es canvia qualsevol .js o .css, s'ha d'augmentar aquí I als «?v=» de
 * index.html i fitxa.html (la prova ho comprova): així cap navegador no fa servir fitxers vells.
 */
const VERSIO = '20';

const PEU = '© 2026 <strong>David Arso Civil</strong>. Ús educatiu lliure. Prohibida la comercialització '
  + 'i la modificació (<a rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>). '
  + 'Web no oficial, sense relació amb el fabricant de la calculadora. <span class="versio">Versió ' + VERSIO + '</span>';


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

/** Text d'una fitxa → HTML: $$TeX$$ = fórmula en una línia pròpia, $TeX$ = fórmula, [[id]] = tecla petita, {{Opció}} = text d'un menú,
    !!Error típic!! = l'avís d'un pas d'error (fons groc durant 1 s quan el pas es fa actual). */
function textSimple(t) {
  return String(t || '').split(/(\$\$[^$]+\$\$|\$[^$]+\$|\[\[[^\]]+\]\]|\{\{[^}]+\}\}|!![^!]+!!)/).map(tros => {
    if (/^\$\$[^$]+\$\$$/.test(tros)) return katex.renderToString(tros.slice(2, -2), {throwOnError: false, displayMode: true});
    if (/^\$[^$]+\$$/.test(tros)) return formula(tros.slice(1, -1));
    if (/^\[\[[^\]]+\]\]$/.test(tros)) return Tecles.html(tros.slice(2, -2), {petita: true});
    if (/^\{\{[^}]+\}\}$/.test(tros)) return `<span class="opcio-menu">${escapa(tros.slice(2, -2))}</span>`;
    if (/^!![^!]+!!$/.test(tros)) return `<span class="avis-error">${escapa(tros.slice(2, -2))}</span>`;
    return escapa(tros).replace(/\n/g, '<br>');
  }).join('');
}
/**
 * Text amb apartats: [a]…[/a] es converteix en un <span class="apartat" data-apartat="a">, que es
 * ressalta quan el pas actual resol aquest apartat (pas.apartat). No confon les tecles [[x]].
 */
function text(t) {
  return String(t || '').split(/((?<!\[)\[[a-z]\](?!\])[\s\S]*?\[\/[a-z]\])/).map(tros => {
    const m = /^\[([a-z])\]([\s\S]*)\[\/\1\]$/.exec(tros);
    return m ? `<span class="apartat" data-apartat="${m[1]}">${textSimple(m[2])}</span>` : textSimple(tros);
  }).join('');
}
/** Text pla (per al lector de pantalla). */
const textPla = t => String(t || '').replace(/(?<!\[)\[\/?[a-z]\](?!\])/g, '').replace(/\$([^$]+)\$/g, '$1').replace(/\[\[([^\]]+)\]\]/g, (_, id) =>
  (Tecles.TECLES[id] ? Tecles.TECLES[id].nom : id)).replace(/\{\{([^}]+)\}\}/g, '«$1»').replace(/!!([^!]+)!!/g, '$1');

/** Anima un element i espera que acabi. Si l'animació es cancel·la (el pas s'interromp), també acaba, sense error. */
function anima(el, fotogrames, opcions) {
  return el.animate(fotogrames, Object.assign({fill: 'forwards', easing: CORBA}, opcions)).finished.catch(() => {});
}

function rectangle(el, origen) {
  const o = origen.getBoundingClientRect(), r = el.getBoundingClientRect();
  return {x: r.left - o.left, y: r.top - o.top, w: r.width, h: r.height,
    cx: r.left - o.left + r.width / 2, cy: r.top - o.top + r.height / 2};
}

function parametre(nom) {
  try { return new URLSearchParams(location.search).get(nom); } catch (e) { return null; }
}


/* ── 3. LA CALCULADORA ─────────────────────────────────────────────── */

/**
 * La calculadora sencera a partir de Tecles.TECLAT: totes les mesures en cqw
 * (percentatge de l'amplada), de manera que les tecles són cercles perfectes.
 * Cada tecla porta data-tecla="<id>" (el cursor la busca així).
 */
function htmlCalculadora() {
  const T = Tecles.TECLAT;
  const caixa = (classe, q) => `<div class="${classe}" style="left:${q.x}cqw;top:${q.y}cqw;width:${q.w}cqw;height:${q.h}cqw"></div>`;
  const tecla = id => Tecles.html(id, {teclat: true, atributs: `data-tecla="${id}"`});
  let html = caixa('marc', T.marc);
  html += T.creu.map(q => caixa('creu', q)).join('');
  html += `<div class="pagina" style="left:${T.pagina.x}cqw;top:${T.pagina.y}cqw;width:${T.pagina.w}cqw;height:${T.pagina.h}cqw">`
    + T.aLaPagina.map(tecla).join('') + '</div>';
  for (const [id, [x, y, d]] of Object.entries(T.tecles)) {
    html += `<div class="cel" style="left:${x}cqw;top:${y}cqw;--d:${d}cqw">${tecla(id)}</div>`;
  }
  return html;
}


/* ── 4. ESTRUCTURA DE LA PÀGINA ────────────────────────────────────── */

const ICONES = Object.freeze({
  anterior: 'M15.5 5 8.5 12l7 7z',
  seguent: 'M8.5 5l7 7-7 7z',
});
const icona = d => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
const CURSOR = '<svg viewBox="0 0 22 30" aria-hidden="true"><path d="M2 2 L2 24 L7.6 18.8 L11.4 27.4 L15 25.8 L11.3 17.4 L18.6 17.4 Z" '
  + 'fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg>';

function construeixPagina(fitxa, bloc, germanes, contenidor) {
  const boto = (classe, nom, d) => element('button', {class: 'boto ' + classe, type: 'button', title: nom, 'aria-label': nom, html: icona(d)});
  const T = Tecles.TECLAT;
  const r = {
    lcd: element('div', {class: 'lcd-pantalla', role: 'img', 'aria-label': 'Pantalla de la calculadora'}),
    passos: element('ol', {class: 'passos', 'aria-label': 'Passos'}),
    reproductor: element('div', {class: 'reproductor'}),
    anunci: element('p', {class: 'nomes-lectors', 'aria-live': 'polite'}),
    efectes: element('div', {class: 'efectes', 'aria-hidden': 'true'}),
    cursor: element('div', {class: 'cursor', 'aria-hidden': 'true', html: CURSOR}),
    anterior: boto('', 'Pas anterior', ICONES.anterior),
    seguent: boto('principal', 'Pas següent', ICONES.seguent),
    velocitat: element('select', {id: 'velocitat'}),
    enunciat: element('p', {class: 'enunciat', html: text(fitxa.enunciat)}),
  };
  for (const [nom, factor] of VELOCITATS) r.velocitat.append(element('option', {value: String(factor), text: nom}));
  r.velocitat.value = String(PER_DEFECTE);
  r.reproductor.append(
    element('div', {class: 'botons'}, [r.anterior, r.seguent]),
    element('label', {class: 'velocitat', for: 'velocitat', text: 'Velocitat '}, [r.velocitat]),
  );

  r.calculadora = element('div', {class: 'calculadora', style: `aspect-ratio:100/${T.alcada}`, html: htmlCalculadora()});
  r.calculadora.append(element('div', {class: 'lcd', style: `left:${T.vidre.x}cqw;top:${T.vidre.y}cqw;width:${T.vidre.w}cqw;height:${T.vidre.h}cqw`}, [r.lcd]));
  r.teclat = r.calculadora;
  r.escenari = element('div', {class: 'escenari'}, [r.calculadora, r.efectes, r.cursor]);

  const enllac = f => element('a', {class: 'pastilla' + (f.id === fitxa.id ? ' actual' : ''), href: 'fitxa.html?id=' + encodeURIComponent(f.id),
    'aria-current': f.id === fitxa.id ? 'page' : null, text: f.titol});
  // Les relacionades d'un altre bloc (les del mateix bloc ja hi són)
  const relacionades = (fitxa.relacionades || []).map(id => Dades.FITXES.find(f => f.id === id)).filter(f => f && f.bloc !== fitxa.bloc);
  const altres = element('details', {class: 'altres'}, [
    element('summary', {text: 'Fitxes de «' + bloc.titol + '»'}),
    element('div', {class: 'pastilles'}, germanes.map(enllac)),
    relacionades.length ? element('p', {class: 'titol-altres', text: 'Et pot interessar'}) : null,
    relacionades.length ? element('div', {class: 'pastilles'}, relacionades.map(enllac)) : null,
  ]);

  contenidor.replaceChildren(
    element('header', {class: 'capcalera'}, [element('a', {class: 'torna', href: 'index.html#' + bloc.id, text: '← Calculadora'})]),
    element('main', {class: 'contingut'}, [
      element('div', {class: 'columna'}, [
        element('h1', {class: 'nomes-lectors', text: fitxa.titol}),
        r.enunciat,
        r.reproductor,
        r.passos,
        r.anunci,
        altres,
      ]),
      r.escenari,
    ]),
    element('footer', {class: 'peu', html: PEU}),
  );
  return r;
}


/* ── 5. LA LLISTA DE PASSOS I LES MARQUES DEL TECLAT ──────────────── */

/**
 * Un element per pas (i un d'inicial, el pas 0): el número i les tecles; el
 * pas actual es desplega i mostra la frase. Clicar-hi hi porta.
 */
function omplPassos(r, passos, enClicar) {
  const zero = element('li', {class: 'pas zero'}, [element('div', {class: 'frase', html:
    'Prem ' + icona(ICONES.seguent).replace('<svg', '<svg class="icona-inline"') + ' o la fletxa ↓ del teclat per començar.'})]);
  const files = passos.map((pas, i) => {
    const tecles = pas.tecles.length
      ? pas.tecles.map((id, j) => Tecles.html(id, {ambShift: j > 0 && pas.tecles[j - 1] === 'shift'})).join('')
      : '<span class="nomes-mira">mira la pantalla</span>';
    const boto = element('button', {class: 'cap', type: 'button', title: `Ves al pas ${i + 1}`},
      [element('span', {class: 'num', text: String(i + 1)}), element('span', {class: 'tecles', html: tecles})]);
    boto.addEventListener('click', () => enClicar(i));
    return element('li', {class: 'pas'}, [boto, element('div', {class: 'frase', html: text(pas.text)})]);
  });
  r.passos.replaceChildren(zero, ...files);
  return {zero, files};
}

function marcaPassos(llista, pas) {
  llista.zero.classList.toggle('actual', pas < 0);
  llista.files.forEach((li, i) => {
    li.classList.toggle('fet', i < pas);
    li.classList.toggle('actual', i === pas);
    li.querySelector('.cap').setAttribute('aria-current', i === pas ? 'step' : 'false');
  });
  const actual = pas < 0 ? llista.zero : llista.files[pas];
  // Que el pas actual es vegi sencer dins de la llista (només es desplaça la llista, no la pàgina)
  const caixa = actual.parentElement, a = actual.offsetTop - caixa.offsetTop, b = a + actual.offsetHeight;
  if (a < caixa.scrollTop) caixa.scrollTop = a - 6;
  else if (b > caixa.scrollTop + caixa.clientHeight) caixa.scrollTop = b - caixa.clientHeight + 6;
}

/** Fins a quantes tecles per pas es numeren: en una seqüència més llarga els números fan soroll (David, 31/10/2026). */
const MAX_ORDRE = 6;

/**
 * Al teclat, emmarca les tecles del pas; si n'hi ha de 2 a MAX_ORDRE, hi posa
 * l'ordre en què es premen (una tecla que es prem dues vegades porta «2·3»). pas < 0: cap.
 */
function marcaTeclat(r, passos, pas) {
  r.teclat.querySelectorAll('.del-pas').forEach(t => { t.classList.remove('del-pas', 'pendent'); t.removeAttribute('data-ordre'); });
  if (pas < 0) return;
  const tecles = passos[pas].tecles;
  const ordre = new Map();
  tecles.forEach((id, j) => ordre.set(id, (ordre.get(id) || []).concat(j + 1)));
  for (const [id, ns] of ordre) {
    const t = r.teclat.querySelector(`[data-tecla="${id}"]`);
    if (!t) continue;
    t.classList.add('del-pas');
    if (tecles.length > 1 && tecles.length <= MAX_ORDRE) t.setAttribute('data-ordre', ns.join('·'));
  }
}


/* ── 6. CURSOR ─────────────────────────────────────────────────────── */

function creaCursor(r, temps) {
  let x = null, y = null;
  const transforma = (escala = 1) => `translate(${x}px, ${y}px) scale(${escala})`;
  const el = r.cursor;
  return {
    async va(nx, ny) {
      if (x === null) {                       // apareix per sota de la calculadora, a la dreta
        x = r.calculadora.offsetLeft + r.calculadora.offsetWidth - 20;
        y = r.calculadora.offsetTop + r.calculadora.offsetHeight + 10;
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


/* ── 7. REPRODUCTOR ────────────────────────────────────────────────── */

function creaReproductor(r, fitxa, temps) {
  const passos = fitxa.passos;
  const darrer = passos.length - 1;
  const cursor = creaCursor(r, temps);
  const parcials = Simulador.pantalles(fitxa).pantalles;   // parcials[i][j]: la pantalla després de la tecla j del pas i
  let idx = -1;                 // -1 = pas 0 (abans de començar)
  let ocupat = false;           // hi ha un pas animant-se
  let torn = 0;                 // canvia quan s'interromp l'animació

  function mostraPantalla(estat, canvi = false) {
    r.lcd.innerHTML = Pantalla.html(estat);
    if (canvi) r.lcd.animate([{opacity: 0.35}, {opacity: 1}], {duration: temps(TEMPS.pantalla), easing: 'ease-out'});
  }

  const llista = omplPassos(r, passos, i => salta(i));

  function pinta() {
    marcaPassos(llista, idx);
    // L'apartat de l'enunciat que es resol en aquest pas, ressaltat (David, 31/10/2026)
    const apartat = idx >= 0 ? passos[idx].apartat : null;
    r.enunciat.querySelectorAll('.apartat').forEach(e => e.classList.toggle('actiu', e.dataset.apartat === apartat));
    // Zona d'error (David, 31/10/2026): si el pas ensenya un ús erroni, totes les vores es tornen de color vellut vermell
    const error = idx >= 0 && Boolean(passos[idx].error);
    document.body.classList.toggle('zona-error', error);
    r.anunci.textContent = idx < 0 ? textPla(fitxa.enunciat)
      : `Pas ${idx + 1} de ${passos.length}.${error ? ' Atenció: aquest pas ensenya un ús erroni.' : ''} ${textPla(passos[idx].text)}`;
    r.anterior.disabled = idx < 0;
    r.seguent.disabled = idx === darrer && !ocupat;
  }

  /** Va al pas i (-1 = pas 0), sense animació. Si hi ha un pas animant-se, l'interromp. */
  function salta(i) {
    torn++;
    ocupat = false;
    idx = Math.max(-1, Math.min(darrer, i));
    mostraPantalla(idx < 0 ? fitxa.inici : passos[idx].pantalla);
    marcaTeclat(r, passos, idx);
    r.teclat.classList.remove('shift-actiu');
    r.calculadora.querySelectorAll('.premuda').forEach(t => t.classList.remove('premuda'));
    cursor.amaga();
    pinta();
  }

  /**
   * Anima el pas següent: el cursor prem les tecles del teclat, una a una, i
   * la pantalla canvia després de cada tecla. Si ja hi ha un pas animant-se,
   * l'acaba a l'instant (la pulsació següent passarà al pas que ve).
   */
  async function seguent() {
    if (ocupat) { salta(idx); return; }
    if (idx >= darrer) return;
    ocupat = true;
    const meu = ++torn;
    const viu = () => meu === torn;
    idx++;
    pinta();
    const pas = passos[idx];
    marcaTeclat(r, passos, idx);
    // Les tecles que encara s'han de prémer, amb el fons suau (David, 31/10/2026)
    for (const id of pas.tecles) r.teclat.querySelector(`[data-tecla="${id}"]`).classList.add('pendent');
    if (!pas.tecles.length) cursor.amaga();
    for (let j = 0; j < pas.tecles.length; j++) {
      const id = pas.tecles[j];
      const t = r.teclat.querySelector(`[data-tecla="${id}"]`);
      const q = rectangle(t, r.escenari);
      await cursor.va(q.cx - 2, q.cy - 2);
      if (!viu()) return;
      cursor.prem(true);
      t.classList.add('premuda');
      cursor.ona(q.cx, q.cy);
      await espera(temps(TEMPS.clic));
      if (!viu()) return;
      cursor.prem(false);
      t.classList.remove('premuda');
      if (!pas.tecles.slice(j + 1).includes(id)) t.classList.remove('pendent');   // ja no s'ha de tornar a prémer
      // Després de SHIFT, les funcions blaves es ressalten fins a la tecla següent
      r.teclat.classList.toggle('shift-actiu', id === 'shift');
      const darrera = j === pas.tecles.length - 1;
      mostraPantalla(darrera ? pas.pantalla : parcials[idx][j], darrera);
      if (!darrera) {
        await espera(temps(TEMPS.entreTecles));
        if (!viu()) return;
      }
    }
    if (!pas.tecles.length) mostraPantalla(pas.pantalla, true);
    ocupat = false;
    if (idx === darrer) cursor.amaga();
    pinta();
  }

  r.seguent.addEventListener('click', () => seguent());
  r.anterior.addEventListener('click', () => salta(idx - 1));

  salta(-1);
  return {salta, seguent,
    anterior: () => salta(idx - 1),
    get pas() { return idx; }, get total() { return passos.length; }, get ocupat() { return ocupat; }};
}


/* ── 8. L'AVÍS DEL TECLAT ──────────────────────────────────────────── */

/** Després de tants clics als botons ◀ ▶ (sense haver fet servir mai les fletxes del teclat), surt l'avís. */
const AVIS_CLICS = 5;
/** L'avís desapareix sol als 10 segons (si no l'han tancat abans amb la creueta). */
const AVIS_DURADA = 10000;
const AVIS_TEXT = 'Recorda: pots fer servir les fletxes ↑, ↓ del teclat per fer tots els passos';

/**
 * Una bombolla taronja (un 20 % més gran que la primera versió, parpelleja i es sacseja 0,8 s en sortir) sota els botons del reproductor. Surt una sola vegada per càrrega de la pàgina,
 * quan l'usuari ha clicat AVIS_CLICS vegades els botons ◀ ▶ amb el ratolí i encara no ha
 * premut cap fletxa del teclat. Només compta el ratolí: amb un mòbil o una tauleta (tocs amb el dit) o amb
 * una pulsació del teclat (Tab + Intro) no compta, perquè avisar d'un teclat que potser no hi és no té sentit.
 * Si surt i l'usuari prem una fletxa, es tanca.
 */
function creaAvis(r) {
  let clics = 0, teclat = false, mostrat = false, rellotge = null, aparell = '';
  const tanca = element('button', {class: 'avis-tanca', type: 'button', 'aria-label': 'Tanca l\'avís', title: 'Tanca', text: '×'});
  const bombolla = element('div', {class: 'avis-teclat', role: 'status'}, [element('span', {text: AVIS_TEXT}), tanca]);
  r.reproductor.append(bombolla);

  function amaga() {
    clearTimeout(rellotge);
    bombolla.classList.remove('visible');
  }
  function mostra() {
    mostrat = true;
    bombolla.classList.add('visible');
    rellotge = setTimeout(amaga, AVIS_DURADA);
  }
  tanca.addEventListener('click', amaga);

  return {
    /** Què ha premut el botó (pointerdown precedeix el clic): 'mouse', 'touch' o 'pen'. */
    pulsacio(e) { aparell = e.pointerType; },
    /** Un clic a un botó del reproductor: només es compta si és de ratolí (detail 0 = l'ha activat el teclat). */
    clic(e) {
      const delRatoli = aparell === 'mouse' && e.detail > 0;
      aparell = '';
      if (!delRatoli || teclat || mostrat) return;
      if (++clics >= AVIS_CLICS) mostra();
    },
    /** S'ha fet servir una fletxa del teclat: l'avís ja no fa falta. */
    teclat() {
      teclat = true;
      amaga();
    },
  };
}


/* ── 9. INICI ──────────────────────────────────────────────────────── */

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
  let factor = PER_DEFECTE;                    // «normal», per defecte
  const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const temps = ms => Math.max(40, ms * factor * (reduit ? 0.35 : 1));
  r.velocitat.addEventListener('change', () => { factor = parseFloat(r.velocitat.value) || PER_DEFECTE; });

  const reproductor = creaReproductor(r, fitxa, temps);
  const avis = creaAvis(r);
  for (const b of [r.anterior, r.seguent]) {
    b.addEventListener('pointerdown', e => avis.pulsacio(e));
    b.addEventListener('click', e => avis.clic(e));
  }

  /* Teclat: ↓ o → = pas següent; ↑ o ← = pas anterior (no hi ha reproducció automàtica: David, 31/10/2026). */
  document.addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.defaultPrevented) return;
    const t = e.target instanceof Element ? e.target : document.body;
    if (t.closest('input, select, textarea')) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      avis.teclat();
      reproductor.seguent();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      avis.teclat();
      reproductor.anterior();
    }
  });
  return reproductor;
}

arrel.Motor = Object.freeze({inicia, text, VERSIO});

})(globalThis);
