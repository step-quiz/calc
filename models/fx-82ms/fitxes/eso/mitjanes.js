/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/eso/mitjanes.js — ESO · bloc «Mitjanes» (fx-82MS)
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Les mateixes fitxes (el mateix id i el mateix enunciat)
   que a la fx-82SP CW. La fx-82MS no té plantilla de fracció: la suma
   del numerador (i la del denominador) van entre parèntesis, i el
   resultat ja surt en decimal. Sense el mode SD (David, 1/11/2026).
   Els valors de la pantalla, calculats amb models/fx-82ms/calcul.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca} = M.guions;
const {D} = M.comu;

const HOTEL = '(168+154+210+260)÷4';
const HOTEL_ERROR = '168+154+210+260÷4';
const ESTRELLES_NUM = '(5×22+4×32+3×16+2×8+1×2)';
const MERCAT_NUM = '(1×25+2×35+3×25+4×10)';
const MERCAT = MERCAT_NUM + '÷(25+35+25+10)';
const MERCAT_ERROR = MERCAT_NUM + '÷25+35+25+10';

M.fitxes.push(

{
  id: 'cb4-26-q15', bloc: 'eso-mitjanes', titol: 'L\'hotel: la mitjana de quatre setmanes',
  enunciat: 'Competències bàsiques de 4t d\'ESO, 2026, pregunta 15. Un hotel ha ocupat 168, 154, 210 i 260 places en 4 setmanes. Quina ha estat la mitjana de places ocupades?',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', '1', '6', '8', 'mes', '1', '5', '4', 'mes', '2', '1', '0', 'mes', '2', '6', '0', 'rpar'], pantalla: calc(D, '(168+154+210+260)'),
      text: 'La mitjana és la suma dividida entre el nombre de setmanes. Primer, la suma entre parèntesis: [[lpar]] 168 + 154 + 210 + 260 [[rpar]].'},
    {tecles: ['entre', '4'], pantalla: calc(D, HOTEL),
      text: 'Ara [[entre]] 4. Gràcies als parèntesis, es divideix tota la suma.'},
    {tecles: ['igual'], pantalla: marca(calc(D, HOTEL, '198'), 'resultat'),
      text: 'Prem [[igual]]: 198 places. És l\'opció c. (L\'opció d, 792, és la suma: no s\'ha dividit entre 4.)'},
    {error: true, tecles: ['1', '6', '8', 'mes', '1', '5', '4', 'mes', '2', '1', '0', 'mes', '2', '6', '0', 'entre', '4'],
      pantalla: calc(D, HOTEL_ERROR),
      text: '!!Error típic!!: escriure-ho sense parèntesis, $168+154+210+260\\div 4$.'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, HOTEL_ERROR, '597'), 'resultat'),
      text: 'Prem [[igual]]: 597, més places que cap de les setmanes! La calculadora fa la divisió abans que les sumes: només ha dividit el 260 entre 4.'},
  ],
},
{
  id: 'cb4-24-q8', bloc: 'eso-mitjanes', titol: 'Les estrelles: la mitjana d\'una taula',
  enunciat: 'Competències bàsiques de 4t d\'ESO, 2024, pregunta 8. Els 80 clients d\'una botiga han valorat la compra amb estrelles. Quina és la mitjana d\'estrelles?'
    + '$$\\begin{array}{l|ccccc}\\text{Estrelles} & 5 & 4 & 3 & 2 & 1\\\\ \\hline \\text{Clients} & 22 & 32 & 16 & 8 & 2\\end{array}$$',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', '5', 'per', '2', '2', 'mes', '4', 'per', '3', '2', 'mes', '3', 'per', '1', '6', 'mes', '2', 'per', '8', 'mes', '1', 'per', '2', 'rpar'],
      pantalla: calc(D, ESTRELLES_NUM),
      text: 'Cada valor de la taula, multiplicat pel nombre de clients, i tot sumat. La fx-82MS no té plantilla de fracció: la suma va entre parèntesis, $(5\\times 22+4\\times 32+3\\times 16+2\\times 8+1\\times 2)$.'},
    {tecles: ['entre', '8', '0'], pantalla: calc(D, ESTRELLES_NUM + '÷80'),
      text: 'Ara [[entre]] 80, el nombre de clients. Gràcies als parèntesis, es divideix tota la suma.'},
    {tecles: ['igual'], pantalla: marca(calc(D, ESTRELLES_NUM + '÷80', '3.8'), 'resultat'),
      text: 'Prem [[igual]]: 3.8 estrelles. És l\'opció c. (La b, 3, és la mitjana de 5, 4, 3, 2 i 1 sense comptar els clients.)'},
  ],
},
{
  id: 'cb4-25-q17', bloc: 'eso-mitjanes', titol: 'El mercat: la mitjana d\'un gràfic de barres',
  enunciat: 'Competències bàsiques de 4t d\'ESO, 2025, pregunta 17. Dels enquestats de més de 50 anys, 25 van al mercat 1 vegada per setmana; 35, 2 vegades; 25, 3 vegades, i 10, 4 vegades. De mitjana, quants dies hi van per setmana?',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', '1', 'per', '2', '5', 'mes', '2', 'per', '3', '5', 'mes', '3', 'per', '2', '5', 'mes', '4', 'per', '1', '0', 'rpar'],
      pantalla: calc(D, MERCAT_NUM),
      text: 'Com amb una taula: cada nombre de vegades pel nombre de persones, i tot sumat, entre parèntesis.'},
    {tecles: ['entre', 'lpar', '2', '5', 'mes', '3', '5', 'mes', '2', '5', 'mes', '1', '0', 'rpar'], pantalla: calc(D, MERCAT),
      text: 'Ara [[entre]] i el nombre de persones, també entre parèntesis: $(25+35+25+10)$. No 4 (les barres) ni 250 (tots els enquestats).'},
    {tecles: ['igual'], pantalla: marca(calc(D, MERCAT, '2.210526316'), 'resultat'),
      text: 'Prem [[igual]]: 2.210526316. Arrodonit a les centèsimes, 2,21 dies: l\'opció c.'},
    {error: true, tecles: ['lpar', '1', 'per', '2', '5', 'mes', '2', 'per', '3', '5', 'mes', '3', 'per', '2', '5', 'mes', '4', 'per', '1', '0', 'rpar',
      'entre', '2', '5', 'mes', '3', '5', 'mes', '2', '5', 'mes', '1', '0'], pantalla: calc(D, MERCAT_ERROR),
      text: '!!Error típic!!: amb parèntesis al numerador però no al denominador.'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, MERCAT_ERROR, '78.4'), 'resultat'),
      text: 'Surt 78.4 dies per setmana: impossible! Només s\'ha dividit entre el primer 25. El denominador també va entre parèntesis.'},
  ],
},

);

})(Models.obre('fx-82ms'));
