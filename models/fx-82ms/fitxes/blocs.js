/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/blocs.js — Els blocs de la fx-82MS
   ───────────────────────────────────────────────────────────────────
   Els mateixos blocs (i les mateixes fitxes, amb el mateix id) que la
   fx-82SP CW, quan el tema hi és (David, 1/11/2026: «keep it simple»).
   El format d'una fitxa és el de models/fx-82sp-cw/fitxes/blocs.js; les
   pantalles es fan amb guions.js d'aquest model. Fase 4 (v34): blocs de
   fraccions i d'angles. Fase 5 (v35): la resta. No hi ha les fitxes que
   necessiten f(x) o Verificar, que la fx-82MS no té (definir-fx, barrow,
   verificar, pau-ana-25j-q1). Cada bloc diu a quines etapes surt (etapes,
   v36): els d'ara, totes de Batxillerat.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

const {IND, ind} = M.guions;

/** Per a les fitxes de cada bloc (fitxes/<bloc>.js). */
M.comu = Object.freeze({D: IND.D, R: IND.R, FIX: ind(IND.D, {fix: 2}), ind});

M.blocs = Object.freeze([
  // La fx-82MS no té mode exacte: aquest bloc parlarà de llegir la pantalla, de fraccions i decimals i d'arrodonir
  {id: 'exacte', titol: 'Llegir la pantalla i arrodonir', color: '#0c1736', etapes: ['batx']},
  {id: 'fraccions', titol: 'Operar amb fraccions i potències', color: '#0d235e', etapes: ['batx']},
  {id: 'angles', titol: 'Treballar en mode \'graus\' o \'radiants\'', color: '#033d63', etapes: ['batx']},
  {id: 'pau', titol: 'Funcions útils per a la PAU', color: '#876d0d', etapes: ['batx']},
  {id: 'pau-ag', titol: 'Exercicis PAU. Àlgebra i Geometria', color: '#853300', etapes: ['batx']},
  {id: 'pau-ap', titol: 'Exercicis PAU. Anàlisi i Probabilitat', color: '#945600', etapes: ['batx']},
  {id: 'examen', titol: 'Abans de l\'examen', color: '#3d4f1f', etapes: ['batx'], petit: true},
]);

})(Models.obre('fx-82ms'));
