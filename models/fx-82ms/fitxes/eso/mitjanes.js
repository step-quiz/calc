/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/eso/mitjanes.js — ESO · bloc «Mitjanes» (fx-82MS)
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Les mateixes fitxes (el mateix id, l'enunciat i la font)
   que a la fx-82SP CW, amb les mateixes normes (vegeu la capçalera de
   models/fx-82sp-cw/fitxes/eso/mitjanes.js). La fx-82MS no té plantilla
   de fracció: la suma del numerador (i la del denominador) van entre
   parèntesis, i el resultat ja surt en decimal. Sense el mode SD.
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
  id: 'cb4-26-q15',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', '1', '6', '8', 'mes', '1', '5', '4', 'mes', '2', '1', '0', 'mes', '2', '6', '0', 'rpar'], pantalla: calc(D, '(168+154+210+260)'),
      text: '[mat]La mitjana és la suma dividida entre el nombre de setmanes.[/mat] [calc]Primer escriu la suma entre parèntesis: [[lpar]] 168 + 154 + 210 + 260 [[rpar]].[/calc]'},
    {tecles: ['entre', '4'], pantalla: calc(D, HOTEL),
      text: '[calc]Ara fes l\'operació [[entre]] 4.[/calc] [mat]Gràcies als parèntesis, es divideix tota la suma entre 4.[/mat]'},
    {tecles: ['igual'], pantalla: marca(calc(D, HOTEL, '198'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 198.[/calc] [mat]La resposta correcta és que la mitjana és de 198 places ocupades.[/mat]'},
    {error: true, tecles: ['ac', '1', '6', '8', 'mes', '1', '5', '4', 'mes', '2', '1', '0', 'mes', '2', '6', '0', 'entre', '4'],
      pantalla: calc(D, HOTEL_ERROR),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu-ho sense parèntesis, $168+154+210+260\\div 4$.[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, HOTEL_ERROR, '597'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 597.[/calc] [mat]No pot ser: són més places que les de qualsevol setmana. Sense parèntesis, la divisió es fa abans que les sumes, i només s\'ha dividit el 260 entre 4.[/mat]'},
  ],
},
{
  id: 'cb4-24-q8',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', '5', 'per', '2', '2', 'mes', '4', 'per', '3', '2', 'mes', '3', 'per', '1', '6', 'mes', '2', 'per', '8', 'mes', '1', 'per', '2', 'rpar'],
      pantalla: calc(D, ESTRELLES_NUM),
      text: '[mat]Cada nombre d\'estrelles es multiplica pel nombre de clients que l\'han donat, i se sumen tots els productes.[/mat] [calc]La fx-82MS no té plantilla de fracció: escriu la suma entre parèntesis.[/calc]'},
    {tecles: ['entre', '8', '0'], pantalla: calc(D, ESTRELLES_NUM + '÷80'),
      text: '[mat]Hi ha 80 clients: la suma es divideix entre 80.[/mat] [calc]Ara fes l\'operació [[entre]] 80.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ESTRELLES_NUM + '÷80', '3.8'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 3.8.[/calc] [mat]La resposta correcta és que la mitjana és de 3,8 estrelles.[/mat]'},
  ],
},
{
  id: 'cb4-25-q17',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', '1', 'per', '2', '5', 'mes', '2', 'per', '3', '5', 'mes', '3', 'per', '2', '5', 'mes', '4', 'per', '1', '0', 'rpar'],
      pantalla: calc(D, MERCAT_NUM),
      text: '[mat]Cada nombre de vegades es multiplica pel nombre de persones, i se sumen tots els productes.[/mat] [calc]Escriu la suma entre parèntesis.[/calc]'},
    {tecles: ['entre', 'lpar', '2', '5', 'mes', '3', '5', 'mes', '2', '5', 'mes', '1', '0', 'rpar'], pantalla: calc(D, MERCAT),
      text: '[mat]La suma es divideix entre el nombre de persones de més de 50 anys, $25+35+25+10$.[/mat] [calc]Ara fes l\'operació [[entre]] i escriu aquesta suma, també entre parèntesis.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, MERCAT, '2.210526316'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 2.210526316.[/calc] [mat]Arrodonint a les centèsimes, la resposta correcta és que la mitjana és de 2,21 dies per setmana.[/mat]'},
    {error: true, tecles: ['ac', 'lpar', '1', 'per', '2', '5', 'mes', '2', 'per', '3', '5', 'mes', '3', 'per', '2', '5', 'mes', '4', 'per', '1', '0', 'rpar',
      'entre', '2', '5', 'mes', '3', '5', 'mes', '2', '5', 'mes', '1', '0'], pantalla: calc(D, MERCAT_ERROR),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu-ho amb parèntesis al numerador però no al denominador.[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, MERCAT_ERROR, '78.4'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 78.4. Només s\'ha dividit entre el primer 25.[/calc] [mat]No pot ser: una setmana només té 7 dies.[/mat]'},
  ],
},

);

})(Models.obre('fx-82ms'));
