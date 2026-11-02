/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-x2/fitxes/eso/inici.js — ESO · «Abans de començar»
   ───────────────────────────────────────────────────────────────────
   Les fitxes de la fx-82SP CW (el mateix fitxer, a models/fx-82sp-cw/), amb les
   tecles de la fx-82/85SP X II (les mateixes que la fx-570/991SP X II): la tecla = (id «exe»), el signe negatiu (−)
   («neg»), SHIFT ×10ˣ = π, SHIFT (−) = log, ln, SHIFT x■ = arrel d'índex n,
   S⇔D i els menús numerats (SHIFT MENU, OPTN).
   NOMÉS DADES (format: fitxes/blocs.js; exercici: exercicis/eso/inici.js).
   La fx-82SP CW escriu sempre inserint: DEL esborra el que hi ha just
   abans del cursor.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca} = M.guions;
const {D} = M.comu;

M.fitxes.push(

{
  id: 'eso-corregeix',
  inici: calc(D),
  passos: [
    {tecles: ['2', '5', 'per', '4', '4'], pantalla: calc(D, '25\\times 44'),
      text: '[calc]Això és el que has escrit: 25 [[per]] 44. El cursor és al final.[/calc]'},
    {tecles: ['del'], pantalla: calc(D, '25\\times 4'),
      text: '[calc]Prem [[del]]: esborra el que hi ha just abans del cursor, el 4 de més. ([[ac]] ho esborraria tot.)[/calc]'},
    {tecles: ['left', 'left'], pantalla: calc(D, '25\\times 4'),
      text: '[calc]Ara el 5 ha de ser un 6. Prem [[left]] dues vegades: el cursor es mou fins just després del 5.[/calc]'},
    {tecles: ['del', '6'], pantalla: calc(D, '26\\times 4'),
      text: '[calc]Prem [[del]] per esborrar el 5 i escriu el 6: s\'afegeix on és el cursor.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '26\\times 4', '104'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens 104.[/calc] [mat]$26\\cdot 4=104$.[/mat]'},
  ],
},

);

})(Models.obre());
