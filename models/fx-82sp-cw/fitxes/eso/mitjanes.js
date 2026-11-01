/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/eso/mitjanes.js — ESO · bloc «Mitjanes»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. El format d'una fitxa és a fitxes/blocs.js.
   Preguntes reals de les proves de competències bàsiques de 4t d'ESO
   (repositori step-quiz/cb; la resposta és la de la clau oficial).
   Aquestes tres fitxes són el model de les fitxes d'ESO (David,
   1/11/2026; HANDOFF-ESO.md, «Com s'escriu una fitxa d'ESO»):
     · id cb<curs>-<any>-q<pregunta>; la font va a «font», no a l'enunciat;
     · cada frase d'un pas és [mat]…[/mat] (matemàtiques) o
       [calc]…[/calc] (què es fa amb la calculadora);
     · «Ara fes l'operació [[entre]] 4», «Prem [[exe]]: obtens el
       resultat, que és 198», «La resposta correcta és que…»; mai la
       lletra de l'opció ni els distractors (els errors, a la zona d'error);
     · un error comença sempre amb [[ac]], perquè no quedi a la vista el
       resultat bo;
     · sense «Ara tu» a l'ESO; la mitjana es tecleja a Calcular.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca} = M.guions;
const {D} = M.comu;

const HOTEL = '(168+154+210+260)\\div 4';
const HOTEL_ERROR = '168+154+210+260\\div 4';
const ESTRELLES = '\\frac{5\\times 22+4\\times 32+3\\times 16+2\\times 8+1\\times 2}{80}';
const MERCAT_NUM = '1\\times 25+2\\times 35+3\\times 25+4\\times 10';
const MERCAT = `\\frac{${MERCAT_NUM}}{25+35+25+10}`;
const MERCAT_ERROR = `(${MERCAT_NUM})\\div 25+35+25+10`;

M.fitxes.push(

{
  id: 'cb4-26-q15', bloc: 'eso-mitjanes', titol: 'L\'hotel: la mitjana de quatre setmanes', font: 'CB 4ESO (2026), pregunta 15',
  enunciat: 'Un hotel ha ocupat 168, 154, 210 i 260 places en 4 setmanes. Quina ha estat la mitjana de places ocupades?',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', '1', '6', '8', 'mes', '1', '5', '4', 'mes', '2', '1', '0', 'mes', '2', '6', '0', 'rpar'], pantalla: calc(D, '(168+154+210+260)'),
      text: '[mat]La mitjana és la suma dividida entre el nombre de setmanes.[/mat] [calc]Primer escriu la suma entre parèntesis: [[lpar]] 168 + 154 + 210 + 260 [[rpar]].[/calc]'},
    {tecles: ['entre', '4'], pantalla: calc(D, HOTEL),
      text: '[calc]Ara fes l\'operació [[entre]] 4.[/calc] [mat]Gràcies als parèntesis, es divideix tota la suma entre 4.[/mat]'},
    {tecles: ['exe'], pantalla: marca(calc(D, HOTEL, '198'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és 198.[/calc] [mat]La resposta correcta és que la mitjana és de 198 places ocupades.[/mat]'},
    {error: true, tecles: ['ac', '1', '6', '8', 'mes', '1', '5', '4', 'mes', '2', '1', '0', 'mes', '2', '6', '0', 'entre', '4'],
      pantalla: calc(D, HOTEL_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu-ho sense parèntesis, $168+154+210+260\\div 4$.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, HOTEL_ERROR, '597'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens 597.[/calc] [mat]No pot ser: són més places que les de qualsevol setmana. Sense parèntesis, la divisió es fa abans que les sumes, i només s\'ha dividit el 260 entre 4.[/mat]'},
  ],
},
{
  id: 'cb4-24-q8', bloc: 'eso-mitjanes', titol: 'Les estrelles: la mitjana d\'una taula', font: 'CB 4ESO (2024), pregunta 8',
  enunciat: 'Els 80 clients d\'una botiga han valorat la compra amb estrelles. Quina és la mitjana d\'estrelles?'
    + '$$\\begin{array}{l|ccccc}\\text{Estrelles} & 5 & 4 & 3 & 2 & 1\\\\ \\hline \\text{Clients} & 22 & 32 & 16 & 8 & 2\\end{array}$$',
  inici: calc(D),
  passos: [
    {tecles: ['frac', '5', 'per', '2', '2', 'mes', '4', 'per', '3', '2', 'mes', '3', 'per', '1', '6', 'mes', '2', 'per', '8', 'mes', '1', 'per', '2'],
      pantalla: calc(D, '\\frac{5\\times 22+4\\times 32+3\\times 16+2\\times 8+1\\times 2}{\\square}'),
      text: '[mat]Cada nombre d\'estrelles es multiplica pel nombre de clients que l\'han donat, i se sumen tots els productes.[/mat] [calc]Prem [[frac]] i escriu la suma al numerador.[/calc]'},
    {tecles: ['down', '8', '0'], pantalla: calc(D, ESTRELLES),
      text: '[mat]Hi ha 80 clients: la suma es divideix entre 80.[/mat] [calc]Baixa al denominador amb [[down]] i escriu 80. La barra de la fracció fa de parèntesi: es divideix tota la suma.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ESTRELLES, '\\frac{19}{5}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $\\frac{19}{5}$. Surt en fracció perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 3.8.[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, ESTRELLES, '3.8'), 'resultat'),
      text: '[calc]Per tenir-lo en decimal, prem [[shift]] i [[exe]] (a sobre d\'EXE hi ha ≈): obtens 3.8.[/calc] [mat]La resposta correcta és que la mitjana és de 3,8 estrelles.[/mat]'},
  ],
},
{
  id: 'cb4-25-q17', bloc: 'eso-mitjanes', titol: 'El mercat: la mitjana d\'un gràfic de barres', font: 'CB 4ESO (2025), pregunta 17',
  enunciat: 'Dels enquestats de més de 50 anys, 25 van al mercat 1 vegada per setmana; 35, 2 vegades; 25, 3 vegades, i 10, 4 vegades. De mitjana, quants dies hi van per setmana?',
  inici: calc(D),
  passos: [
    {tecles: ['frac', '1', 'per', '2', '5', 'mes', '2', 'per', '3', '5', 'mes', '3', 'per', '2', '5', 'mes', '4', 'per', '1', '0'],
      pantalla: calc(D, `\\frac{${MERCAT_NUM}}{\\square}`),
      text: '[mat]Cada nombre de vegades es multiplica pel nombre de persones, i se sumen tots els productes.[/mat] [calc]Prem [[frac]] i escriu la suma al numerador.[/calc]'},
    {tecles: ['down', '2', '5', 'mes', '3', '5', 'mes', '2', '5', 'mes', '1', '0'], pantalla: calc(D, MERCAT),
      text: '[mat]La suma es divideix entre el nombre de persones de més de 50 anys, $25+35+25+10$.[/mat] [calc]Baixa al denominador amb [[down]] i escriu aquesta suma.[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, MERCAT, '2.210526316'), 'resultat'),
      text: '[calc]Prem directament [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és 2.210526316. Amb [[exe]] obtindries $\\frac{42}{19}$.[/calc] [mat]Arrodonint a les centèsimes, la resposta correcta és que la mitjana és de 2,21 dies per setmana.[/mat]'},
    {error: true, tecles: ['ac', 'lpar', '1', 'per', '2', '5', 'mes', '2', 'per', '3', '5', 'mes', '3', 'per', '2', '5', 'mes', '4', 'per', '1', '0', 'rpar',
      'entre', '2', '5', 'mes', '3', '5', 'mes', '2', '5', 'mes', '1', '0'], pantalla: calc(D, MERCAT_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu-ho en una línia, sense la plantilla, amb parèntesis al numerador però no al denominador.[/calc]'},
    {error: true, tecles: ['shift', 'exe'], pantalla: marca(calc(D, MERCAT_ERROR, '78.4'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]]: obtens 78.4.[/calc] [mat]No pot ser: una setmana només té 7 dies.[/mat] [calc]Només s\'ha dividit entre el primer 25: en una línia, el denominador també va entre parèntesis.[/calc]'},
  ],
},

);

})(Models.obre('fx-82sp-cw'));
