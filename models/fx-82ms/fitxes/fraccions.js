/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/fraccions.js — «Operar amb fraccions i potències» (fx-82MS)
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Els mateixos temes i ids que a la fx-82SP CW.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

const {calc, marca} = M.guions;
const {D} = M.comu;

M.fitxes.push(

{
  id: 'frac-plantilla', bloc: 'fraccions', titol: 'Escriu una fracció amb la tecla a b/c',
  enunciat: 'Calcula $\\frac{3}{4}+\\frac{5}{6}$ escrivint les fraccions amb la tecla [[abc]].',
  inici: calc(D),
  passos: [
    {tecles: ['3', 'abc', '4'], pantalla: calc(D, '3┘4'),
      text: 'Escriu el 3, prem [[abc]] i escriu el 4. A la pantalla, la fracció surt com a 3┘4: el ┘ fa de ratlla de fracció.'},
    {tecles: ['mes', '5', 'abc', '6'], pantalla: calc(D, '3┘4+5┘6'),
      text: 'Continua amb [[mes]] i la segona fracció: el 5, [[abc]] i el 6. Tot s\'escriu en una sola línia.'},
    {tecles: ['igual'], pantalla: marca(calc(D, '3┘4+5┘6', '1┘7┘12'), 'resultat'),
      text: 'Prem [[igual]]: surt 1┘7┘12. És un nombre mixt: 1 sencer i $\\frac{7}{12}$, és a dir, $1+\\frac{7}{12}=\\frac{19}{12}$. La calculadora dona les fraccions així perquè ve configurada en {{ab/c}}.'},
    {tecles: ['shift', 'abc'], pantalla: marca(calc(D, '3┘4+5┘6', '19┘12'), 'resultat'),
      text: 'Per veure la fracció impròpia, prem [[shift]] i [[abc]] (a sobre hi ha d/c): 19┘12, és a dir, $\\frac{19}{12}$. Si les tornes a prémer, torna a sortir el nombre mixt.'},
    {tecles: ['abc'], pantalla: marca(calc(D, '3┘4+5┘6', '1.583333333'), 'resultat'),
      text: 'Ara prem [[abc]] sola: canvia entre fracció i decimal. Surt 1.583333333.'},
  ],
  relacionades: ['frac-prioritat', 'pot-fraccio'],
},
{
  id: 'frac-prioritat', bloc: 'fraccions', titol: 'Fracció de sumes: on van els parèntesis',
  enunciat: 'Calcula $\\frac{2+3}{4-1}$. La tecla [[abc]] només fa fraccions de dos nombres: si hi ha sumes, calen parèntesis.',
  inici: calc(D),
  passos: [
    {error: true, tecles: ['2', 'mes', '3', 'entre', '4', 'menys', '1'], pantalla: calc(D, '2+3÷4-1'),
      text: '!!Error típic!!, com no s\'ha de fer: tot en una línia, $2+3\\div 4-1$.'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, '2+3÷4-1', '1.75'), 'resultat'),
      text: 'Prem [[igual]]: surt 1.75, i no $\\frac{5}{3}$. La calculadora divideix només el 3 entre 4: $2+\\frac{3}{4}-1$.'},
    {tecles: ['lpar', '2', 'mes', '3', 'rpar', 'entre', 'lpar', '4', 'menys', '1', 'rpar'], pantalla: calc(D, '(2+3)÷(4-1)'),
      text: 'Ara bé: el numerador entre parèntesis, [[entre]] i el denominador entre parèntesis, $(2+3)\\div(4-1)$.'},
    {tecles: ['igual'], pantalla: marca(calc(D, '(2+3)÷(4-1)', '1.666666667'), 'resultat'),
      text: 'Prem [[igual]]: 1.666666667. Surt en decimal perquè no hi has escrit cap fracció amb [[abc]].'},
    {tecles: ['abc'], pantalla: marca(calc(D, '(2+3)÷(4-1)', '1┘2┘3'), 'resultat'),
      text: 'Prem [[abc]]: la calculadora el passa a fracció, 1┘2┘3, és a dir, $1+\\frac{2}{3}=\\frac{5}{3}$. Amb [[shift]] [[abc]] veuries 5┘3.'},
  ],
  relacionades: ['frac-plantilla'],
},
{
  id: 'pot-negativa', bloc: 'fraccions', titol: 'Potències de negatius',
  enunciat: 'Calcula $(-2)^4$. A la fx-82MS, el signe negatiu té una tecla pròpia, [[neg]]. Si t\'oblides dels parèntesis, el resultat és un altre.',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', 'neg', '2', 'rpar'], pantalla: calc(D, '(-2)'),
      text: 'La base és $-2$: escriu-la entre parèntesis, amb [[lpar]], [[neg]] (el signe negatiu, no la resta [[menys]]), el 2 i [[rpar]].'},
    {tecles: ['pot', '4'], pantalla: calc(D, '(-2)^4'),
      text: 'Prem [[pot]] i escriu el 4. La potència surt amb el signe ^.'},
    {tecles: ['igual'], pantalla: marca(calc(D, '(-2)^4', '16'), 'resultat'),
      text: 'Prem [[igual]]: $(-2)^4=16$. La calculadora hi posa un punt al darrere, «16.», com a tots els enters.'},
    {error: true, tecles: ['ac', 'neg', '2', 'pot', '4'], pantalla: calc(D, '-2^4'),
      text: '!!Error típic!!: sense parèntesis. Esborra amb [[ac]] i escriu [[neg]], el 2, [[pot]] i el 4.'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, '-2^4', '-16'), 'resultat'),
      text: 'Prem [[igual]]: surt −16. La potència té més prioritat que el signe negatiu: és $-(2^4)$. Per elevar un negatiu, sempre amb parèntesis.'},
  ],
  relacionades: ['pot-fraccio'],
},
{
  id: 'pot-fraccio', bloc: 'fraccions', titol: 'Potència d\'una fracció',
  enunciat: 'Calcula $\\left(\\frac{2}{3}\\right)^{-2}$.',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', '2', 'entre', '3', 'rpar'], pantalla: calc(D, '(2÷3)'),
      text: 'Escriu la base entre parèntesis: $(2\\div 3)$. Els parèntesis diuen que l\'exponent afecta tota la fracció.'},
    {tecles: ['pot', 'neg', '2'], pantalla: calc(D, '(2÷3)^-2'),
      text: 'Prem [[pot]] i escriu l\'exponent $-2$: [[neg]] i el 2. Un exponent negatiu no necessita parèntesis.'},
    {tecles: ['igual'], pantalla: marca(calc(D, '(2÷3)^-2', '2.25'), 'resultat'),
      text: 'Prem [[igual]]: 2.25.'},
    {tecles: ['abc'], pantalla: marca(calc(D, '(2÷3)^-2', '2┘1┘4'), 'resultat'),
      text: 'Prem [[abc]] per passar-lo a fracció: 2┘1┘4, és a dir, $2+\\frac{1}{4}=\\frac{9}{4}$. Un exponent negatiu inverteix la fracció: $\\left(\\frac{3}{2}\\right)^2$.'},
    {error: true, tecles: ['ac', '2', 'entre', '3', 'pot', 'neg', '2'], pantalla: calc(D, '2÷3^-2'),
      text: '!!Error típic!!: sense parèntesis. Esborra amb [[ac]] i escriu $2\\div 3$, [[pot]] i $-2$.'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, '2÷3^-2', '18'), 'resultat'),
      text: 'Prem [[igual]]: surt 18, perquè l\'exponent només afecta el 3: $2\\div 3^{-2}=2\\cdot 9$. Els parèntesis són imprescindibles.'},
  ],
  relacionades: ['pot-negativa', 'frac-plantilla'],
},
{
  id: 'arrel-n', bloc: 'fraccions', titol: 'Arrels d\'índex n',
  enunciat: 'Calcula l\'arrel cúbica de $-27$, $\\sqrt[3]{-27}$, i l\'arrel quarta de 16, $\\sqrt[4]{16}$.',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'x3'], pantalla: calc(D, '³√'),
      text: 'Prem [[shift]] i [[x3]] (a sobre hi ha l\'arrel cúbica): s\'escriu ³√.'},
    {tecles: ['neg', '2', '7'], pantalla: calc(D, '³√-27'),
      text: 'Escriu $-27$: [[neg]], el 2 i el 7.'},
    {tecles: ['igual'], pantalla: marca(calc(D, '³√-27', '-3'), 'resultat'),
      text: 'Prem [[igual]]: $\\sqrt[3]{-27}=-3$, perquè $(-3)^3=-27$. Una arrel d\'índex senar d\'un negatiu sí que existeix.'},
    {tecles: ['4', 'shift', 'pot', '1', '6'], pantalla: calc(D, '4ˣ√16'),
      text: 'Amb un altre índex, primer s\'escriu l\'índex: el 4, [[shift]] [[pot]] (a sobre hi ha ˣ√) i el 16.'},
    {tecles: ['igual'], pantalla: marca(calc(D, '4ˣ√16', '2'), 'resultat'),
      text: 'Prem [[igual]]: $\\sqrt[4]{16}=2$.'},
  ],
  relacionades: ['pot-negativa'],
},

);

})(Models.obre('fx-82ms'));
