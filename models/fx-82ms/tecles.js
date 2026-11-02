/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/tecles.js — Les tecles i el teclat de la fx-82MS
   ───────────────────────────────────────────────────────────────────
   TECLES: id → {
     etiqueta: el que hi ha escrit a la tecla (HTML; buida a les quatre
               tecles rodones de dalt, que porten el nom imprès a sobre),
     nom:      com es diu, en català (lectors de pantalla i títols),
     tipus:    'num' | 'op' | 'fun' | 'nav' | 'menu' | 'exe' | 'shift' | 'esborra',
     capes:    els rètols de sobre la tecla, per capa: shift (groc), alpha
               (vermell), sd (dins dels claudàtors blaus: modes SD i REG),
     rotul:    el nom imprès a sobre (SHIFT, ALPHA, MODE, ON),
     prefix:   (SHIFT i ALPHA) la capa que activa per a la tecla següent
   }
   TECLAT: la geometria, en percentatge de l'AMPLADA del cos, mesurada
   sobre la foto de producte frontal (478 × 1000 px; el cos fa 472 px
   d'ample i 995 d'alt): cada tecla és {x, y, w, h} (centre i mida) i
   forma 'rodona' (SHIFT, ALPHA, MODE, ON) o 'rect' (la resta); la creu
   del cursor és una peça ovalada amb quatre tecles.

   Omple M.tecles: TECLES, TECLAT, html(id, opcions), existeix(id), htmlTeclat().
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

const sup = t => `<sup>${t}</sup>`;
const X = '<i>x</i>';
const fletxa = d => `<svg class="icona-tecla" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" fill="currentColor"/></svg>`;
const T = (etiqueta, nom, tipus, capes = {}, extra = {}) => Object.freeze(Object.assign({etiqueta, nom, tipus, capes: Object.freeze(capes)}, extra));

const TECLES = Object.freeze({
  // Les quatre tecles rodones de dalt
  shift: T('', 'SHIFT', 'shift', {}, {rotul: 'SHIFT', prefix: 'shift'}),
  alpha: T('', 'ALPHA', 'shift', {}, {rotul: 'ALPHA', prefix: 'alpha'}),
  mode:  T('', 'MODE (modes i configuració)', 'menu', {shift: 'CLR'}, {rotul: 'MODE'}),
  on:    T('', 'ON (encén)', 'menu', {}, {rotul: 'ON'}),
  // La creu del cursor
  up:    T(fletxa('M12 6 5 16h14z'), 'cursor amunt', 'nav'),
  down:  T(fletxa('M12 18 5 8h14z'), 'cursor avall', 'nav'),
  left:  T(fletxa('M6 12 16 5v14z'), 'cursor a l\'esquerra', 'nav'),
  right: T(fletxa('M18 12 8 5v14z'), 'cursor a la dreta', 'nav'),
  // Les tecles de funció (sis columnes)
  inv:   T(X + sup('-1'), 'x a la menys 1 (invers)', 'fun', {shift: X + '!'}),
  ncr:   T('nCr', 'nCr (nombre combinatori)', 'fun', {shift: 'nPr'}),
  pol:   T('Pol(', 'Pol( (coordenades polars)', 'fun', {shift: 'Rec(', alpha: ':'}),
  x3:    T(X + sup('3'), 'x al cub', 'fun', {shift: sup('3') + '√'}),
  abc:   T('a<span class="bc">b/c</span>', 'a b/c (fracció)', 'fun', {shift: 'd/c'}),
  arrel: T('√‾', 'arrel quadrada', 'fun'),
  x2:    T(X + sup('2'), 'x al quadrat', 'fun'),
  pot:   T('^', 'potència', 'fun', {shift: sup('x') + '√'}),
  log:   T('log', 'logaritme decimal', 'fun', {shift: '10' + sup(X)}),
  ln:    T('ln', 'logaritme neperià', 'fun', {shift: 'e' + sup(X), alpha: 'e'}),
  neg:   T('(−)', 'signe negatiu', 'fun', {alpha: 'A'}),
  graus: T('°′″', 'graus, minuts i segons', 'fun', {shift: '←', alpha: 'B'}),
  hyp:   T('hyp', 'hiperbòliques', 'fun', {alpha: 'C'}),
  sin:   T('sin', 'sinus', 'fun', {shift: 'sin' + sup('-1'), alpha: 'D'}),
  cos:   T('cos', 'cosinus', 'fun', {shift: 'cos' + sup('-1'), alpha: 'E'}),
  tan:   T('tan', 'tangent', 'fun', {shift: 'tan' + sup('-1'), alpha: 'F'}),
  rcl:   T('RCL', 'RCL (recupera una variable)', 'fun', {shift: 'STO'}),
  eng:   T('ENG', 'ENG (notació d\'enginyeria)', 'fun', {shift: '←'}),
  lpar:  T('(', 'obre parèntesi', 'fun'),
  rpar:  T(')', 'tanca parèntesi', 'fun', {alpha: 'X'}),
  coma:  T(',', 'coma', 'fun', {shift: ';', alpha: 'Y'}),
  mmes:  T('M+', 'M+ (suma a la memòria)', 'fun', {shift: 'M−', alpha: 'M', sd: 'DT'}),
  // Les tecles de baix (cinc columnes)
  7: T('7', '7', 'num'), 8: T('8', '8', 'num'), 9: T('9', '9', 'num'),
  del:   T('DEL', 'DEL (esborra)', 'esborra', {shift: 'INS'}),
  ac:    T('AC', 'AC (esborra-ho tot)', 'esborra', {shift: 'OFF'}),
  4: T('4', '4', 'num'), 5: T('5', '5', 'num'), 6: T('6', '6', 'num'),
  per:   T('×', 'per', 'op'),
  entre: T('÷', 'dividit per', 'op'),
  1: T('1', '1', 'num', {sd: 'S-SUM'}), 2: T('2', '2', 'num', {sd: 'S-VAR'}), 3: T('3', '3', 'num'),
  mes:   T('+', 'més', 'op'),
  menys: T('−', 'menys (resta)', 'op'),
  0: T('0', '0', 'num', {shift: 'Rnd'}),
  punt:  T('•', 'punt decimal', 'num', {shift: 'Ran#'}),
  exp:   T('×10' + sup(X), 'per 10 a la x (EXP a la fx-85MS i la fx-350MS)', 'num', {shift: 'π'}),
  ans:   T('Ans', 'Ans (l\'últim resultat)', 'num', {shift: 'DRG▸'}),
  igual: T('=', 'igual', 'exe', {shift: '%'}),
});

/* ── Geometria ──────────────────────────────────────────────────────
   Unitats: % de l'amplada del cos (472 px a la foto; origen a la
   cantonada de dalt a l'esquerra del cos, x = 3 px, y = 2 px). Com a la CW, sense la franja del
   logotip de dalt: totes les y d'aquí són les de la foto menys 28 (la pantalla queda a dalt). */
const CF = [14.8, 28.8, 43.2, 57.2, 71.4, 85.6];        // columnes de les tecles de funció (pas ≈ 14,2)
const FF = [70.7, 82.8, 94.9, 107.0];                  // files de les tecles de funció (pas ≈ 12,1)
const CB = [16.1, 33.1, 50.2, 67.4, 84.5];               // columnes de baix (pas ≈ 17,1)
const FB = [122.9, 137.7, 152.5, 166.7];                 // files de baix (pas ≈ 14,8)
const WF = 11.4, HF = 7.0, WB = 14.0, HB = 9.7, DR = 8.0;
const R = (x, y) => ({x, y, w: DR, h: DR, forma: 'rodona'});
const F = (c, f) => ({x: CF[c], y: FF[f], w: WF, h: HF, forma: 'rect'});
const B = (c, f) => ({x: CB[c], y: FB[f], w: WB, h: HB, forma: 'rect'});
const TECLAT = Object.freeze({
  alcada: 182.8,                                       // l'amplada és 100 (995 / 472 = 210,8, sense la franja del logotip: 28)
  marc: Object.freeze({x: 7.2, y: 6.1, w: 85.4, h: 28.6}),
  vidre: Object.freeze({x: 10.0, y: 8.4, w: 80.3, h: 24.2}),
  creu: Object.freeze({x: 37.7, y: 51.2, w: 25.0, h: 19.1}),   // la peça ovalada de la creu del cursor
  tecles: Object.freeze({
    shift: R(14.2, 54.2), alpha: R(27.5, 54.2), mode: R(72.5, 54.2), on: R(86.0, 54.2),
    up: {x: 49.6, y: 53.4, w: 6.4, h: 9.7, forma: 'rect'}, down: {x: 50.2, y: 67.6, w: 6.4, h: 9.7, forma: 'rect'},
    left: {x: 39.2, y: 60.6, w: 9.3, h: 7.8, forma: 'rect'}, right: {x: 59.7, y: 60.3, w: 9.3, h: 7.8, forma: 'rect'},
    inv: F(0, 0), ncr: F(1, 0), pol: F(4, 0), x3: F(5, 0),
    abc: F(0, 1), arrel: F(1, 1), x2: F(2, 1), pot: F(3, 1), log: F(4, 1), ln: F(5, 1),
    neg: F(0, 2), graus: F(1, 2), hyp: F(2, 2), sin: F(3, 2), cos: F(4, 2), tan: F(5, 2),
    rcl: F(0, 3), eng: F(1, 3), lpar: F(2, 3), rpar: F(3, 3), coma: F(4, 3), mmes: F(5, 3),
    7: B(0, 0), 8: B(1, 0), 9: B(2, 0), del: B(3, 0), ac: B(4, 0),
    4: B(0, 1), 5: B(1, 1), 6: B(2, 1), per: B(3, 1), entre: B(4, 1),
    1: B(0, 2), 2: B(1, 2), 3: B(2, 2), mes: B(3, 2), menys: B(4, 2),
    0: B(0, 3), punt: B(1, 3), exp: B(2, 3), ans: B(3, 3), igual: B(4, 3),
  }),
});

const existeix = id => Object.prototype.hasOwnProperty.call(TECLES, id);
const senseEtiquetes = s => String(s).replace(/<[^>]+>/g, '');
const NOM_CAPA = Object.freeze({shift: 'SHIFT', alpha: 'ALPHA'});

/**
 * HTML d'una tecla.
 *   opcions.petita:   per posar-la dins d'un text (les tecles rodones hi surten amb el seu nom);
 *   opcions.prefix:   es prem després de SHIFT ('shift') o d'ALPHA ('alpha'): es ressalta el rètol d'aquella capa;
 *   opcions.teclat:   és la del teclat sencer (porta tots els rètols);
 *   opcions.atributs: text que s'afegeix a l'element (data-…).
 */
function html(id, opcions = {}) {
  const t = TECLES[id];
  if (!t) return `<span class="tecla desconeguda">${String(id)}</span>`;
  const capa = opcions.prefix && t.capes[opcions.prefix] ? opcions.prefix : null;
  const classes = ['tecla', 'tecla-' + t.tipus, 't-' + id];
  if (opcions.petita) classes.push('petita');
  if (capa) classes.push('amb-' + capa);
  let rotols = '';
  if (opcions.teclat) {
    if (t.rotul) rotols += `<span class="rotul">${t.rotul}</span>`;
    for (const [c, text] of Object.entries(t.capes)) rotols += `<span class="capa capa-${c}">${text}</span>`;
  } else if (capa) {
    rotols = `<span class="capa capa-${capa}">${t.capes[capa]}</span>`;
  }
  const cara = t.etiqueta || (opcions.teclat ? '' : t.rotul);
  const nom = t.nom + (capa ? ` (amb ${NOM_CAPA[capa]}: ${senseEtiquetes(t.capes[capa])})` : '');
  return `<span class="${classes.join(' ')}" role="img" aria-label="${nom}" title="${nom}"${opcions.atributs ? ' ' + opcions.atributs : ''}>`
    + `${rotols}<span class="cara">${cara}</span></span>`;
}

/** El teclat sencer (sense la pantalla). Cada tecla porta data-tecla="<id>" (el cursor del reproductor la busca així). */
function htmlTeclat() {
  const {caixa, cel} = Models.dibuix;
  const T = TECLAT;
  let h = caixa('marc', T.marc) + caixa('creu', T.creu);
  for (const [id, q] of Object.entries(T.tecles)) {
    h += cel({x: q.x, y: q.y, w: q.w, h: q.h}, html(id, {teclat: true, atributs: `data-tecla="${id}" data-forma="${q.forma}"`}));
  }
  return h;
}

M.tecles = Object.freeze({TECLES, TECLAT, html, existeix, htmlTeclat});

})(Models.obre());
