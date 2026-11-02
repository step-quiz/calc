/* ═══════════════════════════════════════════════════════════════════
   models/fx-570sp-x2/fitxes/eso/parentesis.js — ESO · bloc «Ús dels parèntesis»
   ───────────────────────────────────────────────────────────────────
   Les fitxes de la fx-82SP CW (el mateix fitxer, a models/fx-82sp-cw/), amb les
   tecles de la fx-570/991SP X II: la tecla = (id «exe»), el signe negatiu (−)
   («neg»), SHIFT ×10ˣ = π, SHIFT (−) = log, ln, SHIFT x■ = arrel d'índex n,
   S⇔D i els menús numerats (SHIFT MENU, OPTN).
   NOMÉS DADES. Normes d'ESO: ARCHITECTURE.md, «Writing fitxes».
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
  id: 'cb2-26-q4',
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
  id: 'eso-quadrat-negatiu',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', 'neg', '3', 'rpar'], pantalla: calc(D, '(-3)'),
      text: '[mat]El quadrat de −3 és $(-3)\\cdot(-3)=9$: el signe també s\'eleva al quadrat.[/mat] [calc]Escriu el −3 entre parèntesis: [[lpar]] [[neg]] 3 [[rpar]]. El signe negatiu és la tecla [[neg]], no la de restar.[/calc]'},
    {tecles: ['x2'], pantalla: calc(D, '(-3)^{2}'),
      text: '[calc]Prem [[x2]] per elevar-lo al quadrat.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '(-3)^{2}', '9'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és 9.[/calc] [mat]La resposta correcta és $(-3)^2=9$.[/mat]'},
    {error: true, tecles: ['ac', 'neg', '3', 'x2'], pantalla: calc(D, '-3^{2}', '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu-ho sense parèntesis: [[neg]] 3 [[x2]].[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, '-3^{2}', '-9'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens −9.[/calc] [mat]No és el quadrat de −3: sense parèntesis, el quadrat només afecta el 3, i el signe es posa després: $-3^2=-(3^2)=-9$.[/mat]'},
  ],
},
{
  id: 'cb4-24-q7',
  inici: calc(D),
  passos: [
    {tecles: ['0', 'punt', '6', 'per', 'lpar', '8', 'mes', '2', 'rpar'], pantalla: calc(D, '0.6\\times(8+2)'),
      text: '[mat]Les valoracions d\'1 o 2 estrelles són 8 + 2. El 60 % d\'aquestes és $0{,}6\\cdot(8+2)$.[/mat] [calc]Escriu 0.6 [[per]] i la suma entre parèntesis: [[lpar]] 8 + 2 [[rpar]].[/calc]'},
    {tecles: ['entre', '8', '0', 'per', '1', '0', '0'], pantalla: calc(D, VAL),
      text: '[mat]Per saber quin percentatge representen de les 80 valoracions, es divideix entre 80 i es multiplica per 100.[/mat] [calc]Ara fes l\'operació [[entre]] 80 [[per]] 100.[/calc]'},
    {tecles: ['exe', 'sd'], pantalla: marca(calc(D, VAL, '7.5'), 'resultat'),
      parcials: {0: marca(calc(D, VAL, '\\frac{15}{2}'), 'resultat')},
      text: '[calc]Prem [[exe]]: obtens $\\frac{15}{2}$, en fracció perquè la calculadora està configurada per donar resultats exactes. Prem [[sd]]: en decimal, 7.5.[/calc] [mat]La resposta correcta és que representen el 7,5 % de les valoracions.[/mat]'},
    {error: true, tecles: ['ac', '0', 'punt', '6', 'per', '8', 'mes', '2', 'entre', '8', '0', 'per', '1', '0', '0'], pantalla: calc(D, VAL_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu-ho sense parèntesis, $0.6\\times 8+2\\div 80\\times 100$.[/calc]'},
    {error: true, tecles: ['exe', 'sd'], pantalla: marca(calc(D, VAL_ERROR, '7.3'), 'resultat'),
      parcials: {0: marca(calc(D, VAL_ERROR, '\\frac{73}{10}'), 'resultat')},
      text: '[calc]Prem [[exe]] i [[sd]]: obtens 7.3.[/calc] [mat]És a prop de 7,5, però és incorrecte: sense parèntesis s\'ha calculat $0{,}6\\cdot 8+\\frac{2}{80}\\cdot 100$.[/mat]'},
  ],
},

);

})(Models.obre());
