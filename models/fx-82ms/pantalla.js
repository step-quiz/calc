/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/pantalla.js — La pantalla de la fx-82MS
   ───────────────────────────────────────────────────────────────────
   Dues línies, com a la calculadora: a dalt, una línia de matriu de
   punts (12 caràcters; l'expressió s'escriu en una línia i, si no hi
   cap, es desplaça) i, a sota, el número en 7 segments (10 xifres i
   l'exponent, petit, a la dreta). A sobre, la fila d'indicadors.

   M.pantalla.html(estat) → HTML. Estats (els fan les funcions de guions.js):
   · {tipus:'calc', ind, entrada, resultat, cursor, previ}
       entrada  = el text de la línia de dalt
       resultat = la línia de baix ('' = encara no s'ha calculat: hi surt
                  «previ», el resultat d'abans, que posa el simulador, o 0)
       cursor   = true (al final) o la posició (0 = davant del primer caràcter)
   · {tipus:'opcions', id, titols, ind}  (MODE, DRG▸): els noms a dalt i,
       a sota de cada un, el seu número
   · {tipus:'pregunta', text, ind}       ('Fix 0~9?'…)
   «marca» ressalta una part: un indicador ('ang', 'fix', 'sci', 'shift',
   'alpha', 'hist'), 'entrada', 'resultat' o una opció ('opcio-2').
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

/** Indicadors de la fila de dalt, en ordre, amb el centre (% de l'amplada de la pantalla). Vegeu VERIFICAR.md. */
const INDICADORS = Object.freeze(['shift', 'alpha', 'ang', 'fix', 'sci', 'hist']);
const POSICIO = Object.freeze({shift: 4, alpha: 9.5, ang: 64.6, fix: 72.5, sci: 78.6, hist: 95.5});
const COLUMNES = 12;                                    // caràcters de la línia de dalt

const escapa = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const marcat = (estat, nom) => (estat.marca === nom ? ' marcat' : '');

/* ── 7 segments ─────────────────────────────────────────────────────
   Una xifra és un SVG de 12 × 20 amb els segments a-g (inclinat amb CSS); el punt decimal va
   dins de la xifra que el precedeix, com a la calculadora. ┘ (fracció) són els segments c i d. */
const SEG = Object.freeze({
  a: '3,1 9,1 10,2 9,3 3,3 2,2', b: '10,2.4 11,3.4 11,9 10,10 9,9 9,3.4', c: '10,10 11,11 11,16.6 10,17.6 9,16.6 9,11',
  d: '3,17 9,17 10,18 9,19 3,19 2,18', e: '2,10 3,11 3,16.6 2,17.6 1,16.6 1,11', f: '2,2.4 3,3.4 3,9 2,10 1,9 1,3.4',
  g: '3,9 9,9 10,10 9,11 3,11 2,10',
});
const XIFRES = Object.freeze({0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgedc', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg', '-': 'g', '┘': 'cd', ' ': ''});
function xifra(c, punt) {
  const s = [...(XIFRES[c] || '')].map(k => `<polygon points="${SEG[k]}"/>`).join('');
  const p = punt ? '<rect x="11.6" y="17.4" width="1.8" height="1.8"/>' : '';
  return `<svg class="seg" viewBox="0 0 13.4 20" aria-hidden="true">${s}${p}</svg>`;
}
/** Un text de 7 segments: xifres, «-», «┘» i «.» (el punt s'enganxa a la xifra d'abans). */
function segments(text) {
  const cs = [...String(text)];
  let h = '';
  for (let i = 0; i < cs.length; i++) {
    if (cs[i] === '.') continue;
    h += xifra(cs[i], cs[i + 1] === '.');
  }
  return h;
}

/** Com es veu un resultat: la mantissa (amb el punt dels enters) i l'exponent (o ''). */
function partsResultat(r) {
  const [mant, exp] = String(r).split('E');
  const m = /^-?\d+$/.test(mant) ? mant + '.' : mant;   // «16.»: als enters, el punt al final
  return {m, e: exp === undefined ? '' : exp};
}

function barra(estat) {
  const ind = estat.ind || {};
  const texts = {shift: 'S', alpha: 'A', ang: ind.ang, fix: 'FIX', sci: 'SCI', hist: '▲'};
  return '<div class="ms-barra">' + INDICADORS.filter(k => ind[k]).map(k =>
    `<span class="ms-ind ms-ind-${k}${marcat(estat, k)}" style="left:${POSICIO[k]}%">${escapa(texts[k])}</span>`).join('') + '</div>';
}

/** La línia de dalt: com a molt 12 caràcters; si no hi cap, es veu el tros del cursor (o el començament) i una fletxa. */
function liniaDalt(estat) {
  const t = [...String(estat.entrada || '')];
  const pos = estat.cursor === true ? t.length : (Number.isInteger(estat.cursor) ? estat.cursor : null);
  let ini = 0;
  if (t.length > COLUMNES - (pos === t.length ? 1 : 0)) {
    ini = pos === null ? 0 : Math.max(0, Math.min(t.length - COLUMNES + 1, pos - COLUMNES + 1));
  }
  const fi = ini + COLUMNES;
  let h = '';
  for (let i = ini; i < Math.min(t.length, fi); i++) {
    h += i === pos ? `<span class="ms-cursor-sobre">${escapa(t[i])}</span>` : escapa(t[i]);
  }
  if (pos !== null && pos >= t.length && pos < fi) h += '<span class="ms-cursor">_</span>';
  const esquerra = ini > 0 ? '<span class="ms-fletxa ms-fletxa-esq">◂</span>' : '';
  const dreta = t.length > fi ? '<span class="ms-fletxa ms-fletxa-dre">▸</span>' : '';
  return `<div class="ms-linia${marcat(estat, 'entrada')}">${h}</div>${esquerra}${dreta}`;
}

function calc(estat) {
  const r = estat.resultat || estat.previ || '0';
  const {m, e} = partsResultat(r);
  const exp = e ? `<span class="ms-exp"><span class="ms-x10">×10</span>${segments(e)}</span>` : '';
  return barra(estat) + liniaDalt(estat)
    + `<div class="ms-numero${estat.resultat ? marcat(estat, 'resultat') : ''}">${segments(m)}</div>${exp}`;
}

function opcions(estat) {
  const n = estat.titols.length;
  return barra(estat) + `<div class="ms-opcions" style="--n:${n}">` + estat.titols.map((t, i) =>
    `<div class="ms-opcio${marcat(estat, 'opcio-' + (i + 1))}"><span class="ms-opcio-nom">${escapa(t)}</span>${segments(String(i + 1))}</div>`).join('') + '</div>';
}

function pregunta(estat) {
  return barra(estat) + `<div class="ms-linia">${escapa(estat.text)}</div>`;
}

const DIBUIXA = Object.freeze({calc, opcions, pregunta});

/** HTML de la pantalla (la fx-82MS no té idiomes: el segon paràmetre no hi fa res). */
function html(estat) {
  const f = DIBUIXA[estat && estat.tipus];
  return `<div class="ms-dins">${f ? f(estat) : ''}</div>`;
}

M.pantalla = Object.freeze({html, INDICADORS, COLUMNES, TIPUS: Object.keys(DIBUIXA), partsResultat});

})(Models.obre('fx-82ms'));
