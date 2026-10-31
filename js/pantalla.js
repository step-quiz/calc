/* ═══════════════════════════════════════════════════════════════════
   pantalla.js — La pantalla (LCD) de la calculadora
   ───────────────────────────────────────────────────────────────────
   Pantalla.html(estat) → HTML de la pantalla. Un estat és un objecte
   pla (el fan les funcions de guions.js):

   · Pantalla de càlcul
       {tipus:'calc', ind, entrada, resultat, cursor, linia}
       ind      = indicadors de la barra de dalt (vegeu INDICADORS)
       entrada  = TeX de l'expressió escrita ('' = res)
       resultat = TeX del resultat ('' = encara no s'ha calculat)
       cursor   = true: hi ha el cursor de text al final de l'entrada
       linia    = true: mode «E Línea»; entrada i resultat són text pla
   · Menú (una llista de 4 files visibles, amb barra si n'hi ha més)
       {tipus:'menu', files:[{t, sub, radio}], sel}
       sub = true: la fila porta ► (té un submenú)
       radio = 'on' | 'off' (◉ / ○), si és una llista d'opcions
   · Pantalla HOME (les quatre aplicacions)
       {tipus:'home', sel}
   · Missatge (text centrat i, opcionalment, opcions a triar)
       {tipus:'missatge', linies:[…], opcions:[…], sel}
   · Llista de variables (tecla VARIABLE; manual, p. 38): 5 files,
       A/B, C/D, E/F, x/y i z, amb els valors en decimal
       {tipus:'variables', valors:[[nom, valor], …], sel}

   Tots poden portar «marca»: el nom d'una part que es ressalta
   (un indicador: 'mat', 'ang', 'fix', 'sci', 'shift', 'hist';
   'entrada', 'resultat'; o una fila de menú: 'fila-2').
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

/** Indicadors de la barra de dalt, en l'ordre en què surten. */
const INDICADORS = Object.freeze(['shift', 'mat', 'ang', 'fix', 'sci', 'simp', 'verif']);

const OPCIONS_KATEX = Object.freeze({throwOnError: false, strict: 'ignore'});
const escapa = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const tex = t => (typeof katex !== 'undefined') ? katex.renderToString(t, OPCIONS_KATEX) : escapa(t);
const marca = (estat, nom) => (estat.marca === nom ? ' marcat' : '');

/* La icona de «E Mat»: una arrel amb un quadre (entrada com al llibre). */
const ICONA_MAT = '<svg class="ind-mat" viewBox="0 0 22 12" aria-hidden="true">'
  + '<path d="M1 7h2l2 4 3-10h5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>'
  + '<rect x="9.2" y="3.4" width="4.4" height="5.4" fill="none" stroke="currentColor" stroke-width="1.1"/>'
  + '<path d="m15.5 10 5-5.5 1.2 1.1-5 5.5-1.8.6z" fill="currentColor"/></svg>';

/** La barra d'indicadors. */
function barra(estat) {
  const ind = estat.ind || {};
  const peces = [];
  if (ind.shift) peces.push(`<span class="ind ind-inv${marca(estat, 'shift')}" data-marca="shift" title="SHIFT premuda">S</span>`);
  if (ind.mat) peces.push(`<span class="ind${marca(estat, 'mat')}" data-marca="mat" title="Entrada matemàtica (E Mat)">${ICONA_MAT}</span>`);
  if (ind.ang) peces.push(`<span class="ind ind-inv${marca(estat, 'ang')}" data-marca="ang" title="Unitat dels angles">${escapa(ind.ang)}</span>`);
  if (ind.fix) peces.push(`<span class="ind ind-text${marca(estat, 'fix')}" data-marca="fix" title="Decimals fixos">FIX</span>`);
  if (ind.sci) peces.push(`<span class="ind ind-text${marca(estat, 'sci')}" data-marca="sci" title="Xifres significatives fixes">SCI</span>`);
  if (ind.simp) peces.push(`<span class="ind${marca(estat, 'simp')}" data-marca="simp" title="Simplificar: Manual">⇩</span>`);
  if (ind.verif) peces.push(`<span class="ind${marca(estat, 'verif')}" data-marca="verif" title="Verificar ON">✔</span>`);
  const hist = ind.hist ? `<span class="ind ind-hist${marca(estat, 'hist')}" data-marca="hist" title="Hi ha càlculs a l'historial">▲</span>` : '';
  return `<div class="lcd-barra"><span class="lcd-ind">${peces.join('')}</span>${hist}</div>`;
}

function calc(estat) {
  const cursor = estat.cursor ? '<span class="lcd-cursor" aria-hidden="true"></span>' : '';
  const escriu = t => (estat.linia ? `<span class="lcd-linia">${escapa(t)}</span>` : tex(t));
  const entrada = estat.entrada ? escriu(estat.entrada) : '';
  const resultat = estat.resultat ? escriu(estat.resultat) : '';
  return barra(estat)
    + `<div class="lcd-entrada${marca(estat, 'entrada')}" data-marca="entrada">${entrada}${cursor}</div>`
    + `<div class="lcd-resultat${marca(estat, 'resultat')}" data-marca="resultat">${resultat}</div>`;
}

/** Les files visibles d'un menú: 4, i la seleccionada sempre a la vista. */
function finestra(n, sel, visibles = 4) {
  if (n <= visibles) return [0, n];
  const inici = Math.max(0, Math.min(sel - visibles + 1, n - visibles));
  return [inici, inici + visibles];
}

function menu(estat) {
  const files = estat.files || [];
  const sel = estat.sel || 0;
  const [de, fins] = finestra(files.length, sel);
  const html = files.slice(de, fins).map((f, j) => {
    const i = de + j;
    const radio = f.radio ? `<span class="radio">${f.radio === 'on' ? '◉' : '○'}</span>` : '';
    const sub = f.sub ? '<span class="sub">►</span>' : '';
    return `<div class="lcd-fila${i === sel ? ' sel' : ''}${marca(estat, 'fila-' + i)}" data-marca="fila-${i}">${radio}<span class="t">${escapa(f.t)}</span>${sub}</div>`;
  }).join('');
  let barraLateral = '';
  if (files.length > 4) {
    const alt = 100 * 4 / files.length, top = 100 * de / files.length;
    barraLateral = `<div class="lcd-scroll"><span style="top:${top.toFixed(1)}%;height:${alt.toFixed(1)}%"></span></div>`;
  }
  return `<div class="lcd-menu">${html}</div>${barraLateral}`;
}

/** Les aplicacions de la pantalla HOME (el dibuix de la icona és només orientatiu). */
const APPS = Object.freeze([
  {t: 'Calcular', i: '×÷<br>+−'},
  {t: 'Estadística', i: '▁▃▆'},
  {t: 'Tabla', i: '▦▦'},
  {t: 'Math Box', i: '⚀◎'},
]);
function home(estat) {
  const sel = estat.sel || 0;
  return '<div class="lcd-home">' + APPS.map((a, i) =>
    `<div class="app${i === sel ? ' sel' : ''}"><span class="i">${a.i}</span><span class="t">${a.t}</span></div>`).join('') + '</div>';
}

function missatge(estat) {
  const linies = (estat.linies || []).map(l => `<div>${escapa(l)}</div>`).join('');
  const opcions = (estat.opcions || []).map((o, i) =>
    `<span class="opcio${i === (estat.sel || 0) ? ' sel' : ''}">${escapa(o)}</span>`).join('');
  return `<div class="lcd-missatge">${linies}${opcions ? `<div class="opcions">${opcions}</div>` : ''}</div>`;
}

/** La llista de variables: dues columnes; x, y, z en cursiva, com a la pantalla. */
function variables(estat) {
  const nom = n => (/^[xyz]$/.test(n) ? `<i>${n}</i>` : n);
  const cel = ([n, v]) => `<span class="var${n === estat.sel ? ' sel' : ''}${marca(estat, 'var-' + n)}" data-marca="var-${n}">${nom(n)}=${escapa(v)}</span>`;
  const v = estat.valors || [];
  let html = '';
  for (let i = 0; i < v.length; i += 2) html += `<div class="fila-var">${cel(v[i])}${v[i + 1] ? cel(v[i + 1]) : ''}</div>`;
  return `<div class="lcd-variables">${html}</div>`;
}

const DIBUIXA = Object.freeze({calc, menu, home, missatge, variables});

/** HTML del contingut de la pantalla per a un estat. */
function html(estat) {
  const f = estat && DIBUIXA[estat.tipus];
  if (!f) return '<div class="lcd-missatge"><div>?</div></div>';
  return `<div class="lcd-dins lcd-${estat.tipus}">${f(estat)}</div>`;
}

/** Afegeix un indicador a l'estat (p. ex. la S de ⇧), sense tocar l'original. */
function ambIndicador(estat, nom, valor = true) {
  if (!estat || estat.tipus !== 'calc') return estat;
  return Object.assign({}, estat, {ind: Object.assign({}, estat.ind, {[nom]: valor}), marca: null});
}

arrel.Pantalla = Object.freeze({html, ambIndicador, finestra, INDICADORS, TIPUS: Object.keys(DIBUIXA)});

})(globalThis);
