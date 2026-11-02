/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/blocs.js — Peces comunes de les fitxes de la fx-82MS
   ───────────────────────────────────────────────────────────────────
   Els blocs i els exercicis són a exercicis/; el format d'una fitxa, a
   models/fx-82sp-cw/fitxes/blocs.js. La fx-82MS té els mateixos temes,
   amb els mateixos ids, menys els que necessiten f(x) o Verificar, que
   no té (definir-fx, barrow, verificar, pau-ana-25j-q1).
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

const {IND, ind} = M.guions;

/** Indicadors que fan servir les fitxes de diversos blocs. */
M.comu = Object.freeze({D: IND.D, R: IND.R, FIX: ind(IND.D, {fix: 2}), ind});

/** La fx-82MS no té mode exacte: aquest bloc parla de llegir la pantalla, de fraccions i decimals i d'arrodonir. */
M.blocs = Object.freeze({exacte: {titol: 'Llegir la pantalla i arrodonir'}});

})(Models.obre('fx-82ms'));
