/* ═══════════════════════════════════════════════════════════════════
   tecles.js — Les tecles i el teclat de la fx-82SP CW
   ───────────────────────────────────────────────────────────────────
   TECLES: id → {
     etiqueta: el que hi ha escrit a la tecla (HTML: text o icona SVG),
     alt:      la funció amb SHIFT (escrita en blau a sobre de la tecla),
     rotul:    el nom imprès a sobre de la tecla (ON, HOME, CONFIG…),
     nom:      com es diu, en català (lectors de pantalla i títols),
     tipus:    'num' | 'op' | 'fun' | 'nav' | 'menu' | 'exe' | 'shift'
   }
   TECLAT: la disposició de les tecles, comprovada amb una foto d'una
   fx-82SP CW Iberia (31/10/2026): una part de dalt de 6 columnes
   (5 files) i una part de baix de 5 columnes (4 files).

   Exporta «Tecles»: TECLES, TECLAT, html(id, opcions), existeix(id).
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
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

const T = (etiqueta, nom, tipus, alt, rotul) => Object.freeze({etiqueta, nom, tipus, alt: alt || null, rotul: rotul || null});

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
  shift:    T(ICONA.shift, 'SHIFT', 'shift', null, 'SHIFT'),
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
 * La disposició del teclat. null = forat. A la part de dalt, pgup i pgdn
 * fan una sola peça alta a la columna 6 (files 1 i 2), com a la calculadora,
 * i les fletxes i OK fan una creu al mig.
 */
const TECLAT = Object.freeze({
  dalt: Object.freeze([
    ['on', 'home', null, 'up', null, 'pgup'],
    ['settings', 'back', 'left', 'ok', 'right', 'pgdn'],
    ['shift', 'variable', 'funcio', 'down', 'catalog', 'tools'],
    ['x', 'frac', 'arrel', 'pot', 'x2', 'logab'],
    ['ans', 'sen', 'cos', 'tan', 'lpar', 'rpar'],
  ]),
  baix: Object.freeze([
    ['7', '8', '9', 'del', 'ac'],
    ['4', '5', '6', 'per', 'entre'],
    ['1', '2', '3', 'mes', 'menys'],
    ['0', 'punt', 'exp', 'format', 'exe'],
  ]),
});

const existeix = id => Object.prototype.hasOwnProperty.call(TECLES, id);
const senseEtiquetes = s => String(s).replace(/<[^>]+>/g, '');

/**
 * HTML d'una tecla.
 *   opcions.petita:   per posar-la dins d'un text;
 *   opcions.ambShift: es prem després de SHIFT (es ressalta la funció blava);
 *   opcions.teclat:   és la del teclat sencer (porta la funció blava i el rètol);
 *   opcions.atributs: text que s'afegeix a l'element (data-…).
 */
function html(id, opcions = {}) {
  const t = TECLES[id];
  if (!t) return `<span class="tecla desconeguda">${String(id)}</span>`;
  const classes = ['tecla', 'tecla-' + t.tipus, 't-' + id];
  if (opcions.petita) classes.push('petita');
  if (opcions.ambShift) classes.push('amb-shift');
  const mostraAlt = t.alt && !opcions.petita && (opcions.teclat || opcions.ambShift);
  const alt = mostraAlt ? `<span class="alt">${t.alt}</span>` : '';
  const rotul = (opcions.teclat && t.rotul) ? `<span class="rotul">${t.rotul}</span>` : '';
  const nom = t.nom + (opcions.ambShift && t.alt ? ` (amb SHIFT: ${senseEtiquetes(t.alt)})` : '');
  return `<span class="${classes.join(' ')}" role="img" aria-label="${nom}" title="${nom}"${opcions.atributs ? ' ' + opcions.atributs : ''}>`
    + `${rotul}${alt}<span class="cara">${t.etiqueta}</span></span>`;
}

arrel.Tecles = Object.freeze({TECLES, TECLAT, html, existeix});

})(globalThis);
