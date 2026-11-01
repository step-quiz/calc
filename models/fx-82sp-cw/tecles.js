/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/tecles.js — Les tecles i el teclat de la fx-82SP CW
   ───────────────────────────────────────────────────────────────────
   TECLES: id → {
     etiqueta: el que hi ha escrit a la tecla (HTML: text o icona SVG),
     alt:      la funció amb SHIFT (escrita en blau a sobre de la tecla),
     rotul:    el nom imprès a sobre de la tecla (ON, HOME, CONFIG…),
     nom:      com es diu, en català (lectors de pantalla i títols),
     tipus:    'num' | 'op' | 'fun' | 'nav' | 'menu' | 'exe' | 'shift'
   }
   TECLAT: la geometria de la calculadora (posició i diàmetre de cada
   tecla, la pantalla, la creu del cursor), mesurada sobre imatges de
   la fx-82SP CW Iberia i calibrada amb les mides oficials.

   Omple M.tecles: TECLES, TECLAT, html(id, opcions), existeix(id), htmlTeclat().
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

/* Icones (SVG de 24×24, color del text): esquemàtiques. */
const svg = cos => `<svg class="icona-tecla" viewBox="0 0 24 24" aria-hidden="true">${cos}</svg>`;
const ICONA = Object.freeze({
  on: svg('<path d="M12 4v7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>'),
  home: svg('<path d="M4 11.5 12 5l8 6.5M6.5 10v8.5h11V10" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>'),
  settings: svg('<path d="M5 7.5h14M5 12h14M5 16.5h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M15 6v3M9 10.5v3M14 15v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
  back: svg('<path d="M9 7 5 11l4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 11H14a4.5 4.5 0 0 1 0 9h-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
  catalog: svg('<path d="M12 7.5c-2-1.6-4.6-2-7-1.5v11c2.4-.5 5 0 7 1.5 2-1.5 4.6-2 7-1.5V6c-2.4-.5-5-.1-7 1.5zM12 7.5v11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>'),
  tools: svg('<circle cx="6" cy="12" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="12" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/>'),
  shift: svg('<path d="M12 4.5 5 12h4v7h6v-7h4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'),
  variable: svg('<path d="M3 8h6M3 8l2-2M3 8l2 2M9 13H3M9 13l-2-2M9 13l-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="11" y="5" width="10" height="11" rx="1" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="16" y="14" font-size="9" font-style="italic" font-family="serif" text-anchor="middle" fill="currentColor">x</text>'),
  up: svg('<path d="m6 15 6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'),
  down: svg('<path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'),
  left: svg('<path d="m15 6-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'),
  right: svg('<path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'),
  pgup: svg('<path d="m6 12 6-6 6 6M6 18l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'),
  pgdn: svg('<path d="m6 6 6 6 6-6M6 12l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'),
  frac: svg('<rect x="8" y="3.5" width="8" height="6" rx="1" fill="currentColor" opacity=".85"/><path d="M5 12h14" stroke="currentColor" stroke-width="2"/><rect x="8" y="14.5" width="8" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.7"/>'),
  arrel: svg('<path d="M2.5 13h3l3 6 4-14h9" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><rect x="13.5" y="9" width="6" height="7" rx=".8" fill="currentColor" opacity=".85"/>'),
  x2: svg('<rect x="4" y="9" width="9" height="10" rx="1" fill="currentColor" opacity=".85"/><text x="15.5" y="10" font-size="9" font-weight="700" font-family="sans-serif" fill="currentColor">2</text>'),
  pot: svg('<rect x="4" y="9" width="9" height="10" rx="1" fill="currentColor" opacity=".85"/><rect x="15" y="3.5" width="5.5" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.4"/>'),
  del: svg('<path d="M9 6h11v12H9l-6-6z" fill="currentColor"/><path d="m12 9.5 5 5m0-5-5 5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>'),
});

const T = (etiqueta, nom, tipus, alt, rotul, extra = {}) => Object.freeze(Object.assign({etiqueta, nom, tipus, alt: alt || null, rotul: rotul || null}, extra));

const TECLES = Object.freeze({
  // Part de dalt
  on:       T(ICONA.on, 'ON (encén)', 'menu', null, 'ON'),
  home:     T(ICONA.home, 'HOME (pantalla d\'inici)', 'menu', null, 'HOME'),
  settings: T(ICONA.settings, 'CONFIG (menú de configuració)', 'menu', null, 'CONFIG'),
  back:     T(ICONA.back, 'tornar enrere', 'menu'),
  pgup:     T(ICONA.pgup, 'pàgina amunt', 'nav'),
  pgdn:     T(ICONA.pgdn, 'pàgina avall', 'nav'),
  up:       T(ICONA.up, 'cursor amunt', 'nav'),
  down:     T(ICONA.down, 'cursor avall', 'nav'),
  left:     T(ICONA.left, 'cursor a l\'esquerra', 'nav'),
  right:    T(ICONA.right, 'cursor a la dreta', 'nav'),
  ok:       T('OK', 'OK', 'nav'),
  shift:    T(ICONA.shift, 'SHIFT', 'shift', null, 'SHIFT', {prefix: 'shift'}),   // prefix: la tecla següent fa la funció de la capa «shift» (.alt)
  variable: T(ICONA.variable, 'VARIABLE', 'fun', null, 'VARIABLE'),
  funcio:   T('f(<i>x</i>)', 'FUNCTION (f(x) i g(x))', 'fun', null, 'FUNCTION'),
  catalog:  T(ICONA.catalog, 'CATALOG', 'fun', null, 'CATALOG'),
  tools:    T(ICONA.tools, 'TOOLS', 'fun', null, 'TOOLS'),
  x:        T('<i>x</i>', 'la variable x', 'fun', 'QR'),
  frac:     T(ICONA.frac, 'fracció', 'fun', '■<span class="mixta">□</span>'),
  arrel:    T(ICONA.arrel, 'arrel quadrada', 'fun', '<sup>■</sup>√□'),
  pot:      T(ICONA.pot, 'potència', 'fun', '■<sup>−1</sup>'),
  x2:       T(ICONA.x2, 'al quadrat', 'fun', 'log'),
  logab:    T('log<sub>■</sub>□', 'logaritme en base a', 'fun', 'ln'),
  ans:      T('Ans', 'Ans (últim resultat)', 'fun', 'Simp'),
  sen:      T('sen', 'sinus', 'fun', 'Arcsen'),
  cos:      T('cos', 'cosinus', 'fun', 'Arccos'),
  tan:      T('tan', 'tangent', 'fun', 'Arctan'),
  lpar:     T('(', 'obre parèntesi', 'fun', '='),
  rpar:     T(')', 'tanca parèntesi', 'fun', ','),
  // Part de baix
  7: T('7', 'set', 'num', 'π'),
  8: T('8', 'vuit', 'num', 'e'),
  9: T('9', 'nou', 'num'),
  del:      T(ICONA.del, 'esborra (⌫)', 'op', 'INS'),
  ac:       T('AC', 'AC (esborra-ho tot)', 'op', 'OFF'),
  4: T('4', 'quatre', 'num', 'A'),
  5: T('5', 'cinc', 'num', 'B'),
  6: T('6', 'sis', 'num', 'C'),
  per:      T('×', 'per', 'op'),
  entre:    T('÷', 'entre', 'op', '⌟'),
  1: T('1', 'u', 'num', 'D'),
  2: T('2', 'dos', 'num', 'E'),
  3: T('3', 'tres', 'num', 'F'),
  mes:      T('+', 'més', 'op', '°′″'),
  menys:    T('−', 'menys', 'op', '(−)'),
  0: T('0', 'zero', 'num', '<i>x</i>'),
  punt:     T('.', 'punt decimal', 'num', '<i>y</i>'),
  exp:      T('×10<sup>■</sup>', 'per deu elevat a', 'num', '<i>z</i>'),
  format:   T('FORMAT', 'FORMAT', 'op'),
  exe:      T('EXE', 'EXE (calcula)', 'exe', '≈'),
});

/**
 * La geometria de la calculadora, mesurada sobre una imatge frontal de la fx-82SP CW Iberia
 * (sense perspectiva) i calibrada amb les mides oficials de CASIO (162 × 77 mm). Totes les
 * mesures són en percentatge de l'AMPLADA del cos (unitat cqw a estil.css): així un cercle
 * és sempre un cercle. Es retalla la franja de dalt del logotip (24 unitats), sense text.
 *   tecles: id → [x del centre, y del centre, diàmetre]
 */
const C6 = [13.5, 28.2, 43.0, 57.7, 72.4, 87.2];      // columnes de dalt (pas 14,7)
const C5 = [14.1, 32.4, 50.3, 68.3, 86.4];            // columnes de baix (pas 18,0)
const F = {r1: 56.5, r2: 71.0, r3: 86.3, r4: 99.3, r5: 112.2, b1: 126.3, b2: 141.4, b3: 156.5, b4: 171.6};
const D = 9.6, DB = 12.2;                              // diàmetres: tecles de dalt i de baix
const TECLAT = Object.freeze({
  alcada: 186.4,                                       // l'amplada és 100
  marc: Object.freeze({x: 6.3, y: 5.3, w: 85.8, h: 40.3}),
  vidre: Object.freeze({x: 10.4, y: 7.4, w: 79.6, h: 31.5}),
  creu: Object.freeze([{x: 51.9, y: 52.3, w: 11.1, h: 37.4}, {x: 37.6, y: 65.1, w: 40.6, h: 10.7}]),
  pagina: Object.freeze({x: 82.5, y: 53.1, w: 9.4, h: 22.2}),   // pgup i pgdn, una peça alta
  tecles: Object.freeze({
    on: [C6[0], F.r1, 8.6], home: [C6[1], F.r1, D], up: [C6[3], 56.0, D],
    settings: [C6[0], F.r2, D], back: [C6[1], F.r2, D], left: [C6[2], 70.4, D], ok: [C6[3], 70.4, D], right: [C6[4], 70.4, D],
    shift: [C6[0], F.r3, D], variable: [C6[1], F.r3, D], funcio: [C6[2], F.r3, D], down: [C6[3], 84.3, D], catalog: [C6[4], F.r3, D], tools: [C6[5], F.r3, D],
    x: [C6[0], F.r4, D], frac: [C6[1], F.r4, D], arrel: [C6[2], F.r4, D], pot: [C6[3], F.r4, D], x2: [C6[4], F.r4, D], logab: [C6[5], F.r4, D],
    ans: [C6[0], F.r5, D], sen: [C6[1], F.r5, D], cos: [C6[2], F.r5, D], tan: [C6[3], F.r5, D], lpar: [C6[4], F.r5, D], rpar: [C6[5], F.r5, D],
    7: [C5[0], F.b1, DB], 8: [C5[1], F.b1, DB], 9: [C5[2], F.b1, DB], del: [C5[3], F.b1, DB], ac: [C5[4], F.b1, DB],
    4: [C5[0], F.b2, DB], 5: [C5[1], F.b2, DB], 6: [C5[2], F.b2, DB], per: [C5[3], F.b2, DB], entre: [C5[4], F.b2, DB],
    1: [C5[0], F.b3, DB], 2: [C5[1], F.b3, DB], 3: [C5[2], F.b3, DB], mes: [C5[3], F.b3, DB], menys: [C5[4], F.b3, DB],
    0: [C5[0], F.b4, DB], punt: [C5[1], F.b4, DB], exp: [C5[2], F.b4, DB], format: [C5[3], F.b4, DB], exe: [C5[4], F.b4, DB],
  }),
  /** Les tecles que van dins de la peça de pàgina (no tenen centre propi). */
  aLaPagina: Object.freeze(['pgup', 'pgdn']),
});

const existeix = id => Object.prototype.hasOwnProperty.call(TECLES, id);
const senseEtiquetes = s => String(s).replace(/<[^>]+>/g, '');

/**
 * HTML d'una tecla.
 *   opcions.petita:   per posar-la dins d'un text;
 *   opcions.prefix:   es prem després d'una tecla de prefix (el nucli hi posa el seu «prefix»; aquí només
 *                     n'hi ha un, 'shift'): es ressalta la funció blava;
 *   opcions.teclat:   és la del teclat sencer (porta la funció blava i el rètol);
 *   opcions.atributs: text que s'afegeix a l'element (data-…).
 */
function html(id, opcions = {}) {
  const t = TECLES[id];
  if (!t) return `<span class="tecla desconeguda">${String(id)}</span>`;
  const ambShift = opcions.prefix === 'shift';
  const classes = ['tecla', 'tecla-' + t.tipus, 't-' + id];
  if (opcions.petita) classes.push('petita');
  if (ambShift) classes.push('amb-shift');
  const mostraAlt = t.alt && !opcions.petita && (opcions.teclat || ambShift);
  const alt = mostraAlt ? `<span class="alt">${t.alt}</span>` : '';
  const rotul = (opcions.teclat && t.rotul) ? `<span class="rotul">${t.rotul}</span>` : '';
  const nom = t.nom + (ambShift && t.alt ? ` (amb SHIFT: ${senseEtiquetes(t.alt)})` : '');
  return `<span class="${classes.join(' ')}" role="img" aria-label="${nom}" title="${nom}"${opcions.atributs ? ' ' + opcions.atributs : ''}>`
    + `${rotul}${alt}<span class="cara">${t.etiqueta}</span></span>`;
}

/**
 * El teclat sencer (sense la pantalla) a partir de TECLAT: totes les mesures en cqw
 * (percentatge de l'amplada), de manera que les tecles són cercles perfectes.
 * Cada tecla porta data-tecla="<id>" (el cursor del reproductor la busca així).
 */
function htmlTeclat() {
  const T = TECLAT;
  const {caixa} = Models.dibuix;
  const tecla = id => html(id, {teclat: true, atributs: `data-tecla="${id}"`});
  let h = caixa('marc', T.marc);
  h += T.creu.map(q => caixa('creu', q)).join('');
  h += `<div class="pagina" style="left:${T.pagina.x}cqw;top:${T.pagina.y}cqw;width:${T.pagina.w}cqw;height:${T.pagina.h}cqw">`
    + T.aLaPagina.map(tecla).join('') + '</div>';
  for (const [id, [x, y, d]] of Object.entries(T.tecles)) {
    h += Models.dibuix.cel({x, y, w: d, h: d}, tecla(id));   // tecles rodones: amplada = alçada = diàmetre
  }
  return h;
}

M.tecles = Object.freeze({TECLES, TECLAT, html, existeix, htmlTeclat});

})(Models.obre('fx-82sp-cw'));
