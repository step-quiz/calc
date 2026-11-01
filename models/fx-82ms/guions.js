/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/guions.js — Peces per escriure les fitxes de la fx-82MS
   ───────────────────────────────────────────────────────────────────
   Funcions que fan els estats de pantalla (el format és a pantalla.js).
   Els textos són els de la calculadora (abreviatures en anglès, també a
   la versió espanyola): COMP, SD, REG; Deg, Rad, Gra; Fix, Sci, Norm…

   Com s'escriu l'entrada (text pla, tal com surt a la línia de dalt):
     sin 30   cos (π÷3)   3┘4+5┘6   (-2)^4   √2   ³√-27   4ˣ√16   Ans×2
   · el signe negatiu i la resta s'escriuen igual, «-» (a la pantalla
     no es distingeixen; les tecles sí: [[neg]] i [[menys]]);
   · sin, cos, tan, log i ln porten un espai darrere, com a la pantalla;
   · ┘ és la marca de fracció (tecla a b/c): 3┘4 = 3/4, 1┘7┘12 = 1 7/12.
   Com s'escriu el resultat (la línia de baix, 7 segments):
     '0.5', '-16', '1┘7┘12', '5E-03' (= 5 × 10⁻³, amb l'exponent a part).
   Un enter surt amb el punt al darrere («16.»): el posa la pantalla.

   Omple M.guions (a les fitxes i al simulador, «G»).
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

/* ── Indicadors ─────────────────────────────────────────────────────
   Configuració inicial (MODE … CLR Mode): COMP, Deg, Norm 1, ab/c. */
const IND = Object.freeze({
  D: Object.freeze({ang: 'D'}),
  R: Object.freeze({ang: 'R'}),
});
/** Indicadors a partir d'uns de base: G.ind(G.IND.D, {fix: 2}). fix/sci = el nombre de decimals o de xifres. */
const ind = (base, extra = {}) => Object.freeze(Object.assign({}, base, extra));

/* ── Pantalla de càlcul ─────────────────────────────────────────────
   G.calc(ind, entrada, resultat, opcions)
     entrada  = el text de la línia de dalt ('' = res)
     resultat = la línia de baix, si ja s'ha calculat ('' = encara no)
     opcions.hist  = true: hi ha càlculs anteriors (▲)
     opcions.cursor = true / false (per defecte: hi ha cursor si s'està escrivint) */
function calc(indicadors, entrada = '', resultat = '', opcions = {}) {
  const i = opcions.hist ? Object.assign({}, indicadors, {hist: true}) : indicadors;
  return Object.freeze({
    tipus: 'calc', ind: Object.freeze(Object.assign({}, i)), entrada, resultat,
    cursor: opcions.cursor !== undefined ? opcions.cursor : Boolean(entrada) && !resultat,
    previ: opcions.previ || '', marca: null,
  });
}
/** Un estat igual, però amb una part ressaltada: G.marca(estat, 'ang'), 'resultat', 'opcio-2'… */
const marca = (estat, nom) => Object.freeze(Object.assign({}, estat, {marca: nom}));

/* ── Pantalles d'opcions (MODE, DRG▸): els noms a dalt i el número de cada un a baix ── */
const OPCIONS = Object.freeze({
  'mode-1': ['COMP', 'SD', 'REG'],
  'mode-2': ['Deg', 'Rad', 'Gra'],
  'mode-3': ['Fix', 'Sci', 'Norm'],
  'mode-4': ['Disp'],
  disp: ['ab/c', 'd/c'],
  drg: ['D', 'R', 'G'],
});
const opcions = (id, indicadors = {}) => Object.freeze({tipus: 'opcions', id, titols: Object.freeze(OPCIONS[id].slice()), ind: Object.freeze(Object.assign({}, indicadors)), marca: null});
/** La n-èsima pantalla de MODE (1 = COMP SD REG, 2 = Deg Rad Gra, 3 = Fix Sci Norm, 4 = Disp). */
const mode = (n, indicadors) => opcions('mode-' + n, indicadors);
const drg = indicadors => opcions('drg', indicadors);
/** Una pregunta d'una línia: 'Fix 0~9?', 'Sci 0~9?', 'Norm 1~2?'. */
const pregunta = (text, indicadors = {}) => Object.freeze({tipus: 'pregunta', text, ind: Object.freeze(Object.assign({}, indicadors)), marca: null});

/** La fx-82MS no té idiomes: els textos de la calculadora surten tal qual. */
const textCalc = t => t;

M.guions = Object.freeze({IND, ind, calc, marca, OPCIONS, opcions, mode, drg, pregunta, textCalc});

})(Models.obre('fx-82ms'));
