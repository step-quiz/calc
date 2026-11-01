/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/eso/parentesis.js — ESO · bloc «Ús dels parèntesis»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Normes: HANDOFF-ESO.md §10 (model: eso/mitjanes.js).
   Dues preguntes reals de competències bàsiques (cb2-26-q4, cb4-24-q7)
   i un exemple propi (el quadrat d'un negatiu). Cada fitxa ensenya, a
   la zona d'error, què surt sense els parèntesis.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca} = M.guions;
const {D} = M.comu;

const BOSSES = '(5-4)\\div 5\\times 100', BOSSES_ERROR = '5-4\\div 5\\times 100';
const VAL = '0.6\\times(8+2)\\div 80\\times 100', VAL_ERROR = '0.6\\times 8+2\\div 80\\times 100';

M.fitxes.push(

{
  id: 'cb2-26-q4', bloc: 'eso-parentesis', titol: 'Les patates rebaixades: el percentatge de descompte', font: 'CB 2ESO (2026), pregunta 4',
  enunciat: 'La Mia ha comprat dues bosses de patates fregides que estaven rebaixades.\n• Abans de la rebaixa, les dues bosses costaven 5 euros en total.\n• Amb la rebaixa, només ha pagat 4 euros per les dues.\nQuin percentatge de descompte s\'ha aplicat?',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', '5', 'menys', '4', 'rpar'], pantalla: calc(D, '(5-4)'),
      text: '[mat]El descompte és el que t\'han rebaixat, 5 − 4 = 1 euro, dividit entre el preu d\'abans, 5 euros, i multiplicat per 100.[/mat] [calc]Primer escriu la resta entre parèntesis: [[lpar]] 5 − 4 [[rpar]].[/calc]'},
    {tecles: ['entre', '5', 'per', '1', '0', '0'], pantalla: calc(D, BOSSES),
      text: '[calc]Ara fes l\'operació [[entre]] 5 [[per]] 100.[/calc] [mat]Gràcies als parèntesis, es divideix tota la resta entre 5.[/mat]'},
    {tecles: ['exe'], pantalla: marca(calc(D, BOSSES, '20'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és 20.[/calc] [mat]La resposta correcta és que s\'ha aplicat un descompte del 20 %.[/mat]'},
    {error: true, tecles: ['ac', '5', 'menys', '4', 'entre', '5', 'per', '1', '0', '0'], pantalla: calc(D, BOSSES_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu-ho sense parèntesis, $5-4\\div 5\\times 100$.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, BOSSES_ERROR, '-75'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens −75.[/calc] [mat]No pot ser: un descompte no és negatiu. Sense parèntesis, la divisió i la multiplicació es fan abans que la resta: s\'ha calculat $5-80$.[/mat]'},
  ],
},
{
  id: 'eso-quadrat-negatiu', bloc: 'eso-parentesis', titol: 'El quadrat d\'un nombre negatiu',
  enunciat: 'Calcula el quadrat de −3, és a dir, $(-3)^2$.',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', 'menys', '3', 'rpar'], pantalla: calc(D, '(-3)'),
      text: '[mat]El quadrat de −3 és $(-3)\\cdot(-3)=9$: el signe també s\'eleva al quadrat.[/mat] [calc]Escriu el −3 entre parèntesis: [[lpar]] [[menys]] 3 [[rpar]].[/calc]'},
    {tecles: ['x2'], pantalla: calc(D, '(-3)^{2}'),
      text: '[calc]Prem [[x2]] per elevar-lo al quadrat.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '(-3)^{2}', '9'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és 9.[/calc] [mat]La resposta correcta és $(-3)^2=9$.[/mat]'},
    {error: true, tecles: ['ac', 'menys', '3', 'x2'], pantalla: calc(D, '-3^{2}', '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu-ho sense parèntesis: [[menys]] 3 [[x2]].[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, '-3^{2}', '-9'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens −9.[/calc] [mat]No és el quadrat de −3: sense parèntesis, el quadrat només afecta el 3, i el signe es posa després: $-3^2=-(3^2)=-9$.[/mat]'},
  ],
},
{
  id: 'cb4-24-q7', bloc: 'eso-parentesis', titol: 'Les valoracions d\'1 o 2 estrelles', font: 'CB 4ESO (2024), pregunta 7',
  enunciat: 'En Víctor ven roba per internet i ha rebut 80 valoracions de clients, d\'1 a 5 estrelles. Entre elles:\n• 8 clients li han donat 2 estrelles\n• 2 clients li han donat 1 estrella.\nEl 60 % de les valoracions d\'1 o 2 estrelles diuen que la talla era equivocada. Quin percentatge representen aquestes valoracions sobre les 80?',
  inici: calc(D),
  passos: [
    {tecles: ['0', 'punt', '6', 'per', 'lpar', '8', 'mes', '2', 'rpar'], pantalla: calc(D, '0.6\\times(8+2)'),
      text: '[mat]Les valoracions d\'1 o 2 estrelles són 8 + 2. El 60 % d\'aquestes és $0{,}6\\cdot(8+2)$.[/mat] [calc]Escriu 0.6 [[per]] i la suma entre parèntesis: [[lpar]] 8 + 2 [[rpar]].[/calc]'},
    {tecles: ['entre', '8', '0', 'per', '1', '0', '0'], pantalla: calc(D, VAL),
      text: '[mat]Per saber quin percentatge representen de les 80 valoracions, es divideix entre 80 i es multiplica per 100.[/mat] [calc]Ara fes l\'operació [[entre]] 80 [[per]] 100.[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, VAL, '7.5'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és 7.5. Amb [[exe]] obtindries $\\frac{15}{2}$.[/calc] [mat]La resposta correcta és que representen el 7,5 % de les valoracions.[/mat]'},
    {error: true, tecles: ['ac', '0', 'punt', '6', 'per', '8', 'mes', '2', 'entre', '8', '0', 'per', '1', '0', '0'], pantalla: calc(D, VAL_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu-ho sense parèntesis, $0.6\\times 8+2\\div 80\\times 100$.[/calc]'},
    {error: true, tecles: ['shift', 'exe'], pantalla: marca(calc(D, VAL_ERROR, '7.3'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]]: obtens 7.3.[/calc] [mat]És a prop de 7,5, però és incorrecte: sense parèntesis s\'ha calculat $0{,}6\\cdot 8+\\frac{2}{80}\\cdot 100$.[/mat]'},
  ],
},

);

})(Models.obre('fx-82sp-cw'));
