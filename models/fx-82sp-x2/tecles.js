/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-x2/tecles.js — Les tecles i el teclat de la fx-82/85/350SP X II
   ───────────────────────────────────────────────────────────────────
   TECLES: id → {
     etiqueta: el que hi ha escrit a la tecla (HTML);
     nom:      com es diu, en català (lectors de pantalla i títols);
     tipus:    'num' | 'op' | 'fun' | 'nav' | 'menu' | 'exe' | 'shift' | 'alpha' | 'esborra';
     alt:      la funció amb SHIFT (en groc, a dalt a l'esquerra);
     alfa:     la funció amb ALPHA (en rosa, a dalt a la dreta);
     rotul:    el nom imprès a sobre (SHIFT, ALPHA, MENU, ON)
   }
   Les tecles que fan el mateix que a la fx-82SP CW porten el mateix id
   (frac, arrel, x2, pot, logab, sen, cos, tan, lpar, rpar, ans, exp,
   del, ac, xifres i operacions): així el simulador de la CW serveix per
   a aquesta calculadora. La tecla = és «exe».

   TECLAT: la de la fx-570/991SP X II (models/fx-570sp-x2/tecles.js),
   mesurada sobre la seva foto frontal de producte (626 × 1333 px; el
   cos fa 614 px d'ample): la fx-82SP X II té el mateix cos i les tecles
   als mateixos llocs (foto de producte de la fx-82SP X II Iberia). On la
   X II té CALC i ∫, aquesta té ⌙ (divisió amb residu) i Simp.
   Totes les mesures, en percentatge de l'amplada del cos (cqw). Es
   retalla la franja de dalt del logotip (150 px de la foto).
     tecles: id → [x del centre, y del centre, amplada, alçada]
   Omple M.tecles: TECLES, TECLAT, html(id, opcions), existeix(id), htmlTeclat().
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

const svg = cos => `<svg class="icona-tecla" viewBox="0 0 24 24" aria-hidden="true">${cos}</svg>`;
const ICONA = Object.freeze({
  up: svg('<path d="m6 15 6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'),
  down: svg('<path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'),
  left: svg('<path d="m15 6-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'),
  right: svg('<path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'),
  frac: svg('<rect x="8" y="3.5" width="8" height="6" rx="1" fill="currentColor" opacity=".85"/><path d="M5 12h14" stroke="currentColor" stroke-width="2"/><rect x="8" y="14.5" width="8" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.7"/>'),
});

const T = (etiqueta, nom, tipus, capes = {}, extra = {}) => Object.freeze(Object.assign(
  {etiqueta, nom, tipus, alt: capes.shift || null, alfa: capes.alpha || null, rotul: capes.rotul || null}, extra));

const TECLES = Object.freeze({
  shift:  T('', 'SHIFT', 'shift', {rotul: 'SHIFT'}, {prefix: 'shift'}),
  alpha:  T('', 'ALPHA', 'alpha', {rotul: 'ALPHA'}, {prefix: 'alpha'}),
  menu:   T('', 'MENU (menú principal; amb SHIFT, CONFIG)', 'menu', {rotul: 'MENU', shift: 'CONFIG'}),
  on:     T('', 'ON (encén)', 'menu', {rotul: 'ON'}),
  up:     T(ICONA.up, 'cursor amunt', 'nav'),
  down:   T(ICONA.down, 'cursor avall', 'nav'),
  left:   T(ICONA.left, 'cursor a l\'esquerra', 'nav'),
  right:  T(ICONA.right, 'cursor a la dreta', 'nav'),
  optn:   T('OPTN', 'OPTN (opcions)', 'fun'),
  resta:  T('⌙', 'divisió amb residu (⌙)', 'fun', {alpha: ':'}),
  simp:   T('Simp', 'Simp (simplifica una fracció)', 'fun', {shift: 'Abs'}),
  x:      T('<i>x</i>', 'la variable x', 'fun'),
  frac:   T(ICONA.frac, 'plantilla de fracció', 'fun', {shift: '▪<sup>▫</sup>⁄<sub>▫</sub>'}),
  arrel:  T('√▪', 'arrel quadrada', 'fun', {shift: '∛▪', alpha: '▔'}),
  x2:     T('<i>x</i>²', 'al quadrat', 'fun', {shift: '<i>x</i>³'}),
  pot:    T('<i>x</i><sup>▪</sup>', 'potència', 'fun', {shift: '<sup>▪</sup>√▫'}),
  logab:  T('log<sub>▪</sub>▫', 'logaritme en base a', 'fun', {shift: '10<sup>▪</sup>'}),
  ln:     T('ln', 'logaritme neperià', 'fun', {shift: '<i>e</i><sup>▪</sup>'}),
  neg:    T('(−)', 'signe negatiu (−)', 'fun', {shift: 'log', alpha: 'A'}),
  grau:   T('° ′ ″', 'graus, minuts i segons', 'fun', {shift: 'FACT', alpha: 'B'}),
  inv:    T('<i>x</i><sup>−1</sup>', 'invers', 'fun', {shift: '<i>x</i>!', alpha: 'C'}),
  sen:    T('sen', 'sinus', 'fun', {shift: 'Arcsen', alpha: 'D'}),
  cos:    T('cos', 'cosinus', 'fun', {shift: 'Arccos', alpha: 'E'}),
  tan:    T('tan', 'tangent', 'fun', {shift: 'Arctan', alpha: 'F'}),
  sto:    T('STO', 'STO (desa en una variable)', 'fun', {shift: 'RECALL'}),
  eng:    T('ENG', 'ENG (notació d\'enginyeria)', 'fun', {shift: '←'}),
  lpar:   T('(', 'obre parèntesi', 'fun'),
  rpar:   T(')', 'tanca parèntesi', 'fun', {shift: ',', alpha: '<i>x</i>'}),
  sd:     T('S⇔D', 'S⇔D (canvia entre fracció i decimal)', 'fun', {shift: 'a<sup>b</sup>⁄<sub>c</sub>⇔<sup>d</sup>⁄<sub>c</sub>', alpha: '<i>y</i>'}),
  mmes:   T('M+', 'M+ (suma a la memòria)', 'fun', {shift: 'M−', alpha: 'M'}),
  7: T('7', 'set', 'num'),
  8: T('8', 'vuit', 'num'),
  9: T('9', 'nou', 'num', {shift: 'RESET'}),
  del: T('DEL', 'esborra (DEL)', 'esborra', {shift: 'INS', alpha: 'UNDO'}),
  ac:  T('AC', 'AC (esborra-ho tot)', 'esborra', {shift: 'OFF'}),
  4: T('4', 'quatre', 'num'),
  5: T('5', 'cinc', 'num'),
  6: T('6', 'sis', 'num'),
  per:   T('×', 'per', 'op', {shift: 'nPr', alpha: 'MCD'}),
  entre: T('÷', 'entre', 'op', {shift: 'nCr', alpha: 'MCM'}),
  1: T('1', 'u', 'num'),
  2: T('2', 'dos', 'num'),
  3: T('3', 'tres', 'num'),
  mes:   T('+', 'més', 'op', {shift: 'Pol'}),
  menys: T('−', 'menys (resta)', 'op', {shift: 'Rec'}),
  0:    T('0', 'zero', 'num', {shift: 'Rnd'}),
  punt: T('•', 'punt decimal', 'num', {shift: 'Ran#', alpha: 'RanInt'}),
  exp:  T('×10<sup><i>x</i></sup>', '×10 elevat a x', 'op', {shift: 'π', alpha: '<i>e</i>'}),
  ans:  T('Ans', 'Ans (últim resultat)', 'op', {shift: '%', alpha: 'PreAns'}),
  exe:  T('=', 'igual (=)', 'exe', {shift: '≈'}),
});

/** Les mesures de la foto (px) passades a cqw: s = 100 / 614, origen al cos (x = 6 px) i a la franja retallada (y = 150 px). */
const s = 100 / 614;
const X = px => +((px - 6) * s).toFixed(2), Y = py => +((py - 150) * s).toFixed(2), L = px => +(px * s).toFixed(2);
const C6 = [84, 175, 267.5, 359, 451.5, 543.5].map(X);              // columnes de les tecles de funció
const F = [632.5, 707.5, 783, 858].map(Y);                          // files de les tecles de funció
const C5 = [92, 202, 312.5, 423.5, 534].map(X);                     // columnes de les tecles de baix
const B = [946.5, 1038, 1128.5, 1220].map(Y);                       // files de les tecles de baix
const FW = L(75), FH = L(42), BW = L(92.5), BH = L(62.5), R = L(47);  // mides: funció, baix, rodones de dalt
const fun = (c, f) => [C6[c], F[f], FW, FH];
const baix = (c, f) => [C5[c], B[f], BW, BH];

const TECLAT = Object.freeze({
  alcada: +((1331 - 150) * s).toFixed(2),
  marc: Object.freeze({x: X(41), y: Y(180), w: L(545), h: L(255)}),
  vidre: Object.freeze({x: X(64), y: Y(205), w: L(500), h: L(199)}),
  creu: Object.freeze({x: X(212), y: Y(495), w: L(203), h: L(132)}),   // la peça del cursor, al voltant de les quatre fletxes
  tecles: Object.freeze({
    shift: [X(81.5), Y(528.5), R, R], alpha: [X(164), Y(528.5), R, R], menu: [X(462.5), Y(528.5), R, R], on: [X(545), Y(528.5), R, R],
    up: [X(313.5), Y(523), L(80), L(38)], down: [X(313.5), Y(599), L(80), L(38)],
    left: [X(237), Y(561), L(46), L(66)], right: [X(390), Y(561), L(46), L(66)],
    optn: fun(0, 0), resta: fun(1, 0), simp: fun(4, 0), x: fun(5, 0),
    frac: fun(0, 1), arrel: fun(1, 1), x2: fun(2, 1), pot: fun(3, 1), logab: fun(4, 1), ln: fun(5, 1),
    neg: fun(0, 2), grau: fun(1, 2), inv: fun(2, 2), sen: fun(3, 2), cos: fun(4, 2), tan: fun(5, 2),
    sto: fun(0, 3), eng: fun(1, 3), lpar: fun(2, 3), rpar: fun(3, 3), sd: fun(4, 3), mmes: fun(5, 3),
    7: baix(0, 0), 8: baix(1, 0), 9: baix(2, 0), del: baix(3, 0), ac: baix(4, 0),
    4: baix(0, 1), 5: baix(1, 1), 6: baix(2, 1), per: baix(3, 1), entre: baix(4, 1),
    1: baix(0, 2), 2: baix(1, 2), 3: baix(2, 2), mes: baix(3, 2), menys: baix(4, 2),
    0: baix(0, 3), punt: baix(1, 3), exp: baix(2, 3), ans: baix(3, 3), exe: baix(4, 3),
  }),
  /** Les tecles rodones (les quatre de dalt). */
  rodones: Object.freeze(['shift', 'alpha', 'menu', 'on']),
});

const existeix = id => Object.prototype.hasOwnProperty.call(TECLES, id);
const senseEtiquetes = t => String(t).replace(/<[^>]+>/g, '');

/**
 * HTML d'una tecla.
 *   opcions.petita:   per posar-la dins d'un text;
 *   opcions.prefix:   es prem després de SHIFT ('shift') o d'ALPHA ('alpha'): es ressalta aquella funció;
 *   opcions.teclat:   és la del teclat sencer (porta les funcions de SHIFT i d'ALPHA i el rètol);
 *   opcions.atributs: text que s'afegeix a l'element (data-…).
 */
function html(id, opcions = {}) {
  const t = TECLES[id];
  if (!t) return `<span class="tecla desconeguda">${String(id)}</span>`;
  const capa = opcions.prefix === 'shift' ? 'alt' : opcions.prefix === 'alpha' ? 'alfa' : null;
  const classes = ['tecla', 'tecla-' + t.tipus, 't-' + id];
  if (opcions.petita) classes.push('petita');
  if (capa && t[capa]) classes.push(capa === 'alt' ? 'amb-shift' : 'amb-alpha');
  const mostra = c => t[c] && !opcions.petita && (opcions.teclat || capa === c);
  const alt = mostra('alt') ? `<span class="alt">${t.alt}</span>` : '';
  const alfa = mostra('alfa') ? `<span class="alfa">${t.alfa}</span>` : '';
  const rotul = (opcions.teclat && t.rotul) ? `<span class="rotul">${t.rotul}</span>` : '';
  const amb = capa && t[capa] ? ` (amb ${capa === 'alt' ? 'SHIFT' : 'ALPHA'}: ${senseEtiquetes(t[capa])})` : '';
  const cara = t.etiqueta || (opcions.teclat ? '' : t.rotul || t.nom);
  return `<span class="${classes.join(' ')}" role="img" aria-label="${t.nom + amb}" title="${t.nom + amb}"${opcions.atributs ? ' ' + opcions.atributs : ''}`
    + `${TECLAT.rodones.includes(id) ? ' data-forma="rodona"' : ''}>${rotul}${alt}${alfa}<span class="cara">${cara}</span></span>`;
}

/** El teclat sencer (sense la pantalla): totes les mesures en cqw. Cada tecla porta data-tecla="<id>". */
function htmlTeclat() {
  const T = TECLAT;
  const {caixa, cel} = Models.dibuix;
  let h = caixa('marc', T.marc) + caixa('creu x2-creu', T.creu);
  for (const [id, [x, y, w, alt]] of Object.entries(T.tecles)) {
    h += cel({x, y, w, h: alt}, html(id, {teclat: true, atributs: `data-tecla="${id}"`}));
  }
  return h;
}

M.tecles = Object.freeze({TECLES, TECLAT, html, existeix, htmlTeclat});

})(Models.obre());
