/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/eso/inici.js — ESO · «Abans de començar» (fx-82MS)
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES (exercici: exercicis/eso/inici.js). A la fx-82MS, el que
   s'escriu substitueix el que hi ha al cursor (SHIFT DEL, INS, insereix),
   i DEL esborra el que hi ha al cursor (al final, l'última xifra).
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
    {tecles: ['2', '5', 'per', '4', '4'], pantalla: calc(D, '25×44'),
      text: '[calc]Això és el que has escrit: 25 [[per]] 44. El cursor és al final.[/calc]'},
    {tecles: ['del'], pantalla: calc(D, '25×4'),
      text: '[calc]Prem [[del]]: amb el cursor al final, esborra l\'última xifra, el 4 de més. ([[ac]] ho esborraria tot.)[/calc]'},
    {tecles: ['left', 'left', 'left'], pantalla: calc(D, '25×4', '', {cursor: 1}),
      text: '[calc]Ara el 5 ha de ser un 6. Prem [[left]] tres vegades, fins que el cursor és a sota del 5.[/calc]'},
    {tecles: ['6'], pantalla: calc(D, '26×4', '', {cursor: 2}),
      text: '[calc]Escriu el 6: a la fx-82MS, el que escrius substitueix la xifra del cursor. (Per afegir sense substituir, abans prem [[shift]] [[del]], INS.)[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '26×4', '104'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 104.[/calc] [mat]$26\\cdot 4=104$.[/mat]'},
  ],
},

);

})(Models.obre('fx-82ms'));
