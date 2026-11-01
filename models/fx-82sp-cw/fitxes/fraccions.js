/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/fraccions.js — Les fitxes del bloc «Operar amb fraccions i potències»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. El format d'una fitxa és a fitxes/blocs.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {IND, ind, calc, marca, config, configCalcul, entradaSortida, unitatAngular,
  formatNumero, normal, reiniciar, format, catalog, angCoordSexag, home, missatge, definicio, menuFuncio,
  probabilidad, tools, catalogVerificar} = M.guions;
const {SEN45, ARREL2_2, D, R, FIX} = M.comu;

M.fitxes.push(

{
  id: 'frac-plantilla', bloc: 'fraccions', titol: 'Escriu una fracció amb la plantilla',
  enunciat: 'Calcula $\\frac{3}{4}+\\frac{5}{6}$ escrivint les fraccions amb la tecla de fracció.',
  inici: calc(D),
  passos: [
    {tecles: ['frac', '3', 'down', '4'], pantalla: calc(D, '\\frac{3}{4}'),
      text: 'Prem [[frac]]: surt la plantilla de fracció, amb el cursor al numerador. Escriu el 3, baixa al denominador amb [[down]] i escriu el 4.'},
    {tecles: ['right', 'mes'], pantalla: calc(D, '\\frac{3}{4}+'),
      text: 'Per sortir del denominador, prem [[right]]; ara ja pots escriure el [[mes]]. Sense el [[right]], el «+» s\'escriuria dins del 4.'},
    {tecles: ['frac', '5', 'down', '6'], pantalla: calc(D, '\\frac{3}{4}+\\frac{5}{6}'),
      text: 'La segona fracció, igual: [[frac]], el 5, [[down]] i el 6.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\frac{3}{4}+\\frac{5}{6}', '\\frac{19}{12}'), 'resultat'),
      text: 'Prem [[exe]]: $\\frac{3}{4}+\\frac{5}{6}=\\frac{19}{12}$. Surt exacte perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 1.583333333.'},
    {error: true, tecles: ['ac', 'frac', '3', 'down', '4', 'mes'], pantalla: calc(D, '\\frac{3}{4+}', '', {hist: true}),
      text: '!!Error típic!!: esborra amb [[ac]] i escriu $\\frac{3}{4}$; sense prémer [[right]], prem [[mes]]: el «+» queda dins del denominador.'},
    {error: true, tecles: ['frac', '5', 'down', '6', 'exe'], pantalla: marca(calc(D, '\\frac{3}{4+\\frac{5}{6}}', '\\frac{18}{29}'), 'resultat'),
      text: 'Acaba igual i prem [[exe]]: surt $\\frac{18}{29}$, perquè has calculat $\\frac{3}{4+\\frac{5}{6}}$. Després del denominador, sempre [[right]].'},
  ],
  araTu: {
    enunciat: 'Calcula $\\frac{2}{5}+\\frac{1}{3}$ amb la plantilla de fracció.',
    resultat: '\\frac{11}{15}',
    error: 'Prémer [[mes]] sense sortir del denominador amb [[right]]: surt $\\frac{3}{8}$, perquè has calculat $\\frac{2}{5+\\frac{1}{3}}$.',
    inici: calc(D),
    passos: [
      {tecles: ['frac', '2', 'down', '5', 'right', 'mes'], pantalla: calc(D, '\\frac{2}{5}+'),
        text: '[[frac]], el 2, [[down]], el 5 i, abans del [[mes]], [[right]] per sortir del denominador.'},
      {tecles: ['frac', '1', 'down', '3', 'exe'], pantalla: marca(calc(D, '\\frac{2}{5}+\\frac{1}{3}', '\\frac{11}{15}'), 'resultat'),
        text: 'La segona fracció i [[exe]]: $\\frac{11}{15}$.'},
      {error: true, tecles: ['ac', 'frac', '2', 'down', '5', 'mes', 'frac', '1', 'down', '3', 'exe'], pantalla: marca(calc(D, '\\frac{2}{5+\\frac{1}{3}}', '\\frac{3}{8}'), 'resultat'),
        text: '!!Error típic!!: esborra amb [[ac]] i torna-ho a escriure sense el [[right]]: el «+» queda dins del denominador i surt $\\frac{3}{8}$.'},
    ],
  },
  relacionades: ['frac-prioritat', 'pot-fraccio', 'mode-decimal'],
},
{
  id: 'frac-prioritat', bloc: 'fraccions', titol: 'Fracció de sumes: on van els parèntesis',
  enunciat: 'Calcula $\\frac{2+3}{4-1}$. Una manera d\'escriure-ho dona un resultat equivocat.',
  inici: calc(D),
  passos: [
    {error: true, tecles: ['2', 'mes', '3', 'entre', '4', 'menys', '1'], pantalla: calc(D, '2+3\\div 4-1'),
      text: '!!Error típic!!, com no s\'ha de fer: tot en una línia, $2+3\\div 4-1$.'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, '2+3\\div 4-1', '\\frac{7}{4}'), 'resultat'),
      text: 'Prem [[exe]]: surt $\\frac{7}{4}$, no $\\frac{5}{3}$. La calculadora divideix només el 3 entre 4: $2+\\frac{3}{4}-1$. (Surt en fracció perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 1.75.)'},
    {tecles: ['frac', '2', 'mes', '3'], pantalla: calc(D, '\\frac{2+3}{\\square}', '', {hist: true}),
      text: 'Ara bé: prem [[frac]] i escriu tot el numerador, $2+3$.'},
    {tecles: ['down', '4', 'menys', '1'], pantalla: calc(D, '\\frac{2+3}{4-1}', '', {hist: true}),
      text: 'Baixa amb [[down]] i escriu tot el denominador, $4-1$. La barra de la fracció ja fa de parèntesi.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\frac{2+3}{4-1}', '\\frac{5}{3}'), 'resultat'),
      text: 'Prem [[exe]]: $\\frac{5}{3}$. També aniria bé $(2+3)\\div(4-1)$ amb parèntesis, però la plantilla és més curta.'},
  ],
  araTu: {
    enunciat: 'Calcula $\\frac{7-1}{2+1}$ amb la plantilla de fracció.',
    resultat: '2',
    error: 'Escriure-ho tot en una línia, $7-1\\div 2+1$: surt $\\frac{15}{2}$, perquè la calculadora fa $7-\\frac{1}{2}+1$. No és el que es demana.',
    inici: calc(D),
    passos: [
      {tecles: ['frac', '7', 'menys', '1'], pantalla: calc(D, '\\frac{7-1}{\\square}'),
        text: 'Prem [[frac]] i escriu tot el numerador, $7-1$.'},
      {tecles: ['down', '2', 'mes', '1'], pantalla: calc(D, '\\frac{7-1}{2+1}'),
        text: 'Baixa amb [[down]] i escriu tot el denominador, $2+1$.'},
      {tecles: ['exe'], pantalla: marca(calc(D, '\\frac{7-1}{2+1}', '2'), 'resultat'),
        text: 'Prem [[exe]]: surt 2, el resultat correcte.'},
      {error: true, tecles: ['ac', '7', 'menys', '1', 'entre', '2', 'mes', '1', 'exe'], pantalla: marca(calc(D, '7-1\\div 2+1', '\\frac{15}{2}'), 'resultat'),
        text: '!!Error típic!!: tot en una línia, $7-1\\div 2+1$, surt $\\frac{15}{2}$. La calculadora només divideix l\'1 entre 2: no és el que es demana.'},
    ],
  },
  relacionades: ['frac-plantilla', 'mode-decimal'],
},
{
  id: 'pot-negativa', bloc: 'fraccions', titol: 'Potències de negatius',
  enunciat: 'Calcula $(-2)^4$. Si t\'oblides dels parèntesis, el resultat és un altre.',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', 'menys', '2', 'rpar'], pantalla: calc(D, '(-2)'),
      text: 'La base és $-2$: escriu-la entre parèntesis, amb [[lpar]], [[menys]], el 2 i [[rpar]].'},
    {tecles: ['pot', '4'], pantalla: calc(D, '(-2)^{4}'),
      text: 'Prem [[pot]]: l\'exponent surt en petit. Escriu el 4.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '(-2)^{4}', '16'), 'resultat'),
      text: 'Prem [[exe]]: $(-2)^4=16$.'},
    {error: true, tecles: ['ac', 'menys', '2', 'pot', '4'], pantalla: calc(D, '-2^{4}', '', {hist: true}),
      text: '!!Error típic!!: sense parèntesis. Esborra amb [[ac]] i escriu $-2^4$: [[menys]], el 2, [[pot]] i el 4.'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, '-2^{4}', '-16'), 'resultat'),
      text: 'Prem [[exe]]: surt −16. La potència té més prioritat que el signe: és $-(2^4)$. Per elevar un negatiu, sempre amb parèntesis.'},
  ],
  araTu: {
    enunciat: 'Calcula $(-3)^4$.',
    resultat: '81',
    error: 'Escriure $-3^4$ sense parèntesis: surt −81, perquè la calculadora fa $-(3^4)$.',
    inici: calc(D),
    passos: [
      {tecles: ['lpar', 'menys', '3', 'rpar', 'pot', '4'], pantalla: calc(D, '(-3)^{4}'),
        text: 'La base, entre parèntesis: [[lpar]], [[menys]], el 3 i [[rpar]]. Després, [[pot]] i el 4.'},
      {tecles: ['exe'], pantalla: marca(calc(D, '(-3)^{4}', '81'), 'resultat'),
        text: 'Prem [[exe]]: 81.'},
      {error: true, tecles: ['ac', 'menys', '3', 'pot', '4', 'exe'], pantalla: marca(calc(D, '-3^{4}', '-81'), 'resultat'),
        text: '!!Error típic!!: sense parèntesis, $-3^4$ dona −81.'},
    ],
  },
  relacionades: ['pot-fraccio', 'pau-geo-25s-q4b'],
},
{
  id: 'pot-fraccio', bloc: 'fraccions', titol: 'Potència d\'una fracció',
  enunciat: 'Calcula $\\left(\\frac{2}{3}\\right)^{-2}$.',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', 'frac', '2', 'down', '3'], pantalla: calc(D, '(\\frac{2}{3}'),
      text: 'Escriu la fracció entre parèntesis: [[lpar]], [[frac]], el 2, [[down]] i el 3.'},
    {tecles: ['right', 'rpar'], pantalla: calc(D, '(\\frac{2}{3})'),
      text: 'Surt de la fracció amb [[right]] i tanca amb [[rpar]]. Els parèntesis diuen que l\'exponent afecta tota la fracció.'},
    {tecles: ['pot', 'menys', '2'], pantalla: calc(D, '(\\frac{2}{3})^{-2}'),
      text: 'Prem [[pot]] i escriu l\'exponent $-2$: [[menys]] i el 2.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '(\\frac{2}{3})^{-2}', '\\frac{9}{4}'), 'resultat'),
      text: 'Prem [[exe]]: $\\left(\\frac{2}{3}\\right)^{-2}=\\frac{9}{4}$. Un exponent negatiu inverteix la fracció. Surt exacte perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 2.25.'},
    {error: true, tecles: ['ac', 'frac', '2', 'down', '3'], pantalla: calc(D, '\\frac{2}{3}', '', {hist: true}),
      text: '!!Error típic!!: sense parèntesis. Esborra amb [[ac]] i escriu [[frac]], el 2, [[down]] i el 3, i no surtis del denominador.'},
    {error: true, tecles: ['pot', 'menys', '2'], pantalla: calc(D, '\\frac{2}{3^{-2}}', '', {hist: true}),
      text: 'Si ara prems [[pot]], l\'exponent $-2$ s\'escriu dins del denominador: només afecta el 3.'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, '\\frac{2}{3^{-2}}', '18'), 'resultat'),
      text: 'Prem [[exe]]: surt 18, perquè $\\frac{2}{3^{-2}}=\\frac{2}{1/9}$. Els parèntesis són imprescindibles.'},
  ],
  araTu: {
    enunciat: 'Calcula $\\left(\\frac{3}{2}\\right)^{-3}$.',
    resultat: '\\frac{8}{27}',
    error: 'Escriure-ho sense parèntesis: l\'exponent queda dins del denominador i surt 24, perquè has calculat $\\frac{3}{2^{-3}}$.',
    inici: calc(D),
    passos: [
      {tecles: ['lpar', 'frac', '3', 'down', '2', 'right', 'rpar'], pantalla: calc(D, '(\\frac{3}{2})'),
        text: '[[lpar]], la fracció amb [[frac]], [[right]] per sortir-ne i [[rpar]].'},
      {tecles: ['pot', 'menys', '3', 'exe'], pantalla: marca(calc(D, '(\\frac{3}{2})^{-3}', '\\frac{8}{27}'), 'resultat'),
        text: '[[pot]], $-3$ i [[exe]]: $\\frac{8}{27}$. L\'exponent negatiu inverteix la fracció: $\\left(\\frac{2}{3}\\right)^3$.'},
      {error: true, tecles: ['ac', 'frac', '3', 'down', '2', 'pot', 'menys', '3', 'exe'], pantalla: marca(calc(D, '\\frac{3}{2^{-3}}', '24'), 'resultat'),
        text: '!!Error típic!!: esborra amb [[ac]] i escriu-ho sense parèntesis: l\'exponent només afecta el 2 i surt 24.'},
    ],
  },
  relacionades: ['pot-negativa', 'frac-plantilla', 'mode-decimal'],
},
{
  id: 'arrel-n', bloc: 'fraccions', titol: 'Arrels d\'índex n',
  enunciat: 'Calcula l\'arrel cúbica de $-27$, és a dir, $\\sqrt[3]{-27}$.',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'arrel'], pantalla: calc(D, '\\sqrt[\\square]{\\square}', '', {cursor: false}),
      text: 'Prem [[shift]] i [[arrel]] (a sobre de la tecla hi ha l\'arrel d\'índex n). Surt una arrel amb dos quadres: el petit és l\'índex i el gran, el radicand.'},
    {tecles: ['3', 'right'], pantalla: calc(D, '\\sqrt[3]{\\square}', '', {cursor: false}),
      text: 'Escriu l\'índex, el 3, i prem [[right]] per passar al radicand.'},
    {tecles: ['menys', '2', '7'], pantalla: calc(D, '\\sqrt[3]{-27}'),
      text: 'Escriu el radicand, $-27$: [[menys]], el 2 i el 7.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\sqrt[3]{-27}', '-3'), 'resultat'),
      text: 'Prem [[exe]]: $\\sqrt[3]{-27}=-3$, perquè $(-3)^3=-27$. Una arrel d\'índex senar d\'un negatiu sí que existeix.'},
    {tecles: ['shift', 'arrel', '4', 'right', '1', '6', 'exe'], pantalla: marca(calc(D, '\\sqrt[4]{16}', '2'), 'resultat'),
      text: 'Amb qualsevol altre índex, igual: [[shift]] [[arrel]], l\'índex, [[right]] i el radicand. Per exemple, $\\sqrt[4]{16}=2$.'},
  ],
  araTu: {
    enunciat: 'Calcula $\\sqrt[5]{-32}$.',
    resultat: '-2',
    error: 'Fer servir [[arrel]] sola en lloc de [[shift]] [[arrel]]: és l\'arrel quadrada, i d\'un nombre negatiu surt un missatge d\'error.',
    inici: calc(D),
    passos: [
      {tecles: ['shift', 'arrel', '5', 'right'], pantalla: calc(D, '\\sqrt[5]{\\square}', '', {cursor: false}),
        text: '[[shift]] [[arrel]], l\'índex 5 i [[right]] per passar al radicand.'},
      {tecles: ['menys', '3', '2', 'exe'], pantalla: marca(calc(D, '\\sqrt[5]{-32}', '-2'), 'resultat'),
        text: 'Escriu $-32$ i prem [[exe]]: −2, perquè $(-2)^5=-32$.'},
    ],
  },
  relacionades: ['pot-negativa'],
},

);

})(Models.obre('fx-82sp-cw'));
