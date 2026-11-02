/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-x2/fitxes/pau.js — Les fitxes del bloc «Funcions útils per a la PAU»
   ───────────────────────────────────────────────────────────────────
   Les fitxes de la fx-82SP CW (el mateix fitxer, a models/fx-82sp-cw/), amb les
   tecles de la fx-82/85SP X II (les mateixes que la fx-570/991SP X II): la tecla = (id «exe»), el signe negatiu (−)
   («neg»), SHIFT ×10ˣ = π, SHIFT (−) = log, ln, SHIFT x■ = arrel d'índex n,
   S⇔D i els menús numerats (SHIFT MENU, OPTN).
   NOMÉS DADES. El format d'una fitxa és a models/fx-82sp-cw/fitxes/blocs.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {IND, ind, calc, marca, config, configCalcul, entradaSortida, unitatAngular,
  formatNumero, normal, reiniciar, format, catalog, angCoordSexag, home, missatge, definicio, menuFuncio,
  probabilidad, tools, catalogVerificar} = M.guions;
const {SEN45, ARREL2_2, D, R, FIX} = M.comu;
const X2 = M.x2;
/** Tabla: les funcions i la taula de definir-fx; Barrow: F(6), F(5) i F(2) escrits amb el nombre; Verificar (l'aplicació: la barra porta verif). */
const F_DEF = 'x^{3}-3x+2', G_DEF = '3x^{2}-3';
const VERIF = ind(D, {verif: true});
const TAULA_DEF = [['-1', '4', '0'], ['0', '2', '-3'], ['1', '0', '0'], ['2', '4', '9']];
const FX = n => `-\\frac{${n}^{4}}{4}+\\frac{7\\times ${n}^{3}}{3}-3\\times ${n}^{2}+5\\times ${n}`;
const F6 = FX(6), F5 = FX(5), F2 = FX(2);

M.fitxes.push(

{
  id: 'definir-fx',
  titol: 'Calcula valors d\'una funció amb Tabla',
  inici: calc(D),
  passos: [
    {tecles: ['menu'], pantalla: X2.apps(0),
      text: '[calc]Escriuràs $f$ i $g$ un sol cop, a l\'aplicació {{Tabla}}. Prem [[menu]]: surten les aplicacions; {{Tabla}} és la 3.[/calc]'},
    {tecles: ['3'], pantalla: definicio('f'),
      text: '[calc]Prem 3: la calculadora demana $f(x)$.[/calc]'},
    {tecles: ['x', 'pot', '3', 'right', 'menys', '3', 'x', 'mes', '2'], pantalla: definicio('f', F_DEF),
      text: '[calc]Escriu $x^3-3x+2$. La $x$ és la tecla [[x]]; l\'exponent és [[pot]] i, amb [[right]], en surts.[/calc]'},
    {tecles: ['exe'], pantalla: definicio('g'),
      text: '[calc]Prem [[exe]]: ara demana $g(x)$.[/calc]'},
    {tecles: ['3', 'x', 'x2', 'menys', '3'], pantalla: definicio('g', G_DEF),
      text: '[calc]Escriu $g=f\'=3x^2-3$. L\'exponent 2 té tecla pròpia: [[x2]].[/calc]'},
    {tecles: ['exe'], pantalla: X2.rang(['1', '5', '1']),
      text: '[calc]Prem [[exe]]: surt el rang de la taula, des de quina $x$ ({{Inic.}}) fins a quina ({{Final}}) i de quant en quant ({{Paso}}).[/calc]'},
    {tecles: ['neg', '1', 'exe', '2', 'exe'], pantalla: X2.rang(['-1', '2', '1'], 2),
      text: '[mat]Vols $x=-1$, $0$, $1$ i $2$.[/mat] [calc]{{Inic.}}: $-1$ ([[neg]] i l\'1) i [[exe]]. {{Final}}: 2 i [[exe]]. El pas, 1, ja hi és.[/calc]'},
    {tecles: ['exe'], pantalla: X2.taula(TAULA_DEF),
      text: '[calc]Prem [[exe]]: la taula. Cada fila és una $x$, amb el seu $f(x)$ i el seu $g(x)$.[/calc]'},
    {tecles: ['right'], pantalla: X2.taula(TAULA_DEF, 0, 1),
      text: '[calc]Amb [[right]] vas a la columna de $f$: a baix surt el valor de la cel·la triada.[/calc] [mat]$f(-1)=4$: el punt és $(-1,\\,4)$.[/mat]'},
    {tecles: ['down', 'down'], pantalla: X2.taula(TAULA_DEF, 2, 1),
      text: '[mat]Dues files més avall, $f(1)=0$: el punt és $(1,\\,0)$.[/mat]'},
    {tecles: ['up', 'right'], pantalla: X2.taula(TAULA_DEF, 1, 2),
      text: '[mat]Per saber quin és el mínim, mira el signe de $g$ entre els dos punts: $g(0)=-3<0$, així que $f$ decreix de $x=-1$ a $x=1$. El màxim és $S(-1,\\,4)$ i el mínim és $R(1,\\,0)$. R és a l\'eix $OX$ perquè $x=1$ és arrel doble de $f=(x-1)^2(x+2)$.[/mat]'},
    {tecles: ['down', 'down'], pantalla: X2.taula(TAULA_DEF, 3, 2),
      text: '[mat]La taula també dona la recta tangent a $x=2$: el punt, $f(2)=4$ (a l\'esquerra), i el pendent, $g(2)=9$. La tangent és $y-4=9(x-2)$, és a dir, $y=9x-14$.[/mat]'},
  ],
  araTu: {
    enunciat: 'Troba la recta tangent a la gràfica de $f(x)=x^3-3x+2$ a $x=-2$. Recorda que $f\'(x)=3x^2-3$.',
    resultat: 'y=9x+18',
    error: 'Fer servir $f(-2)$ com a pendent: $f(-2)$ és l\'ordenada del punt, i el pendent és $f\'(-2)$.',
    inici: calc(D),
    passos: [
      {tecles: ['menu', '3', 'x', 'pot', '3', 'right', 'menys', '3', 'x', 'mes', '2', 'exe'], pantalla: definicio('g'),
        text: '[calc][[menu]], 3 ({{Tabla}}), $f(x)=x^3-3x+2$ i [[exe]].[/calc]'},
      {tecles: ['3', 'x', 'x2', 'menys', '3', 'exe'], pantalla: X2.rang(['1', '5', '1']),
        text: '[calc]$g(x)=3x^2-3$ i [[exe]].[/calc]'},
      {tecles: ['neg', '2', 'exe', 'neg', '1', 'exe', 'exe'], pantalla: X2.taula([['-2', '0', '9'], ['-1', '4', '0']], 0, 1),
        parcials: {6: X2.rang(['-2', '-1', '1'], 2)},
        text: '[calc]{{Inic.}} $-2$, {{Final}} $-1$ i [[exe]] tres vegades. A la primera fila, $f(-2)=0$ i $g(-2)=9$.[/calc] [mat]La tangent és $y=9(x+2)$, és a dir, $y=9x+18$.[/mat]'},
    ],
  },
  relacionades: ['pau-ana-24i-q1', 'ans', 'barrow'],
},
{
  id: 'barrow',
  titol: 'Regla de Barrow: substitueix a la primitiva',
  inici: calc(D),
  passos: [
    {tecles: ['neg', 'frac', '6', 'pot', '4', 'right', 'down', '4', 'right', 'mes', 'frac', '7', 'per', '6', 'pot', '3', 'right', 'down', '3', 'right'],
      pantalla: calc(D, '-\\frac{6^{4}}{4}+\\frac{7\\times 6^{3}}{3}'),
      text: '[mat]Regla de Barrow: $F(6)-F(1)$. Primer, $F(6)$: a la primitiva, cada $x$ és un 6.[/mat] [calc]$-\\frac{6^4}{4}$: [[neg]], [[frac]], el 6, [[pot]] 4, [[right]] per sortir de l\'exponent, [[down]], 4 i [[right]]. Després, igual, $+\\frac{7\\times 6^3}{3}$.[/calc]'},
    {tecles: ['menys', '3', 'per', '6', 'x2', 'mes', '5', 'per', '6'], pantalla: calc(D, F6),
      text: '[calc]I la resta, $-3\\times 6^2+5\\times 6$. El quadrat és [[x2]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, F6, '102'), 'resultat'),
      text: '[calc]Prem [[exe]]: $F(6)=102$.[/calc]'},
    {tecles: ['ans', 'menys', 'lpar', 'neg', 'frac', '1', 'down', '4', 'right', 'mes', 'frac', '7', 'down', '3', 'right', 'menys', '3', 'mes', '5', 'rpar'],
      pantalla: calc(D, '\\mathrm{Ans}-(-\\frac{1}{4}+\\frac{7}{3}-3+5)', '', {hist: true}),
      text: '[mat]Ara $F(1)$: amb $x=1$, totes les potències valen 1, i $F(1)=-\\frac{1}{4}+\\frac{7}{3}-3+5$.[/mat] [calc]Escriu [[ans]] (és $F(6)$), [[menys]] i $F(1)$ entre parèntesis.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\mathrm{Ans}-(-\\frac{1}{4}+\\frac{7}{3}-3+5)', '\\frac{1175}{12}'), 'resultat'),
      text: '[calc]Prem [[exe]]: $\\int_1^6 f(x)\\,dx=\\frac{1175}{12}$, exacte perquè la calculadora és en mode {{E Mat/S Mat}} (en mode {{E Mat/S Decimal}} sortiria 97.91666667). Sense fer les fraccions a mà.[/calc]'},
    {tecles: ['ans', 'menys', 'frac', '2', '5', 'down', '2', 'exe'], pantalla: marca(calc(D, '\\mathrm{Ans}-\\frac{25}{2}', '\\frac{1025}{12}'), 'resultat'),
      text: '[calc]Resta-hi el triangle: [[ans]], [[menys]] i $\\frac{25}{2}$.[/calc] [mat]La superfície és $\\frac{1025}{12}\\approx 85{,}42\\,\\text{u}^2$, com a la pauta.[/mat]'},
  ],
  araTu: {
    enunciat: 'Amb la mateixa primitiva, $F(x)=-\\frac{x^4}{4}+\\frac{7x^3}{3}-3x^2+5x$, calcula $\\int_2^5 f(x)\\,dx=F(5)-F(2)$.',
    resultat: '\\frac{291}{4}=72{,}75',
    error: 'Posar els límits a l\'inrevés, $F(2)-F(5)$: surt $-\\frac{291}{4}$.',
    inici: calc(D),
    passos: [
      {tecles: ['neg', 'frac', '5', 'pot', '4', 'right', 'down', '4', 'right', 'mes', 'frac', '7', 'per', '5', 'pot', '3', 'right', 'down', '3', 'right', 'menys', '3', 'per', '5', 'x2', 'mes', '5', 'per', '5', 'exe'],
        pantalla: marca(calc(D, F5, '\\frac{1025}{12}'), 'resultat'),
        text: '[calc]$F(5)$: la primitiva amb un 5 a cada $x$, i [[exe]].[/calc] [mat]Primer el límit de dalt.[/mat]'},
      {tecles: ['ans', 'menys', 'lpar', 'neg', 'frac', '2', 'pot', '4', 'right', 'down', '4', 'right', 'mes', 'frac', '7', 'per', '2', 'pot', '3', 'right', 'down', '3', 'right', 'menys', '3', 'per', '2', 'x2', 'mes', '5', 'per', '2', 'rpar', 'exe'],
        pantalla: marca(calc(D, '\\mathrm{Ans}-(' + F2 + ')', '\\frac{291}{4}'), 'resultat'),
        text: '[calc][[ans]], [[menys]] i $F(2)$ entre parèntesis: $\\frac{291}{4}=72{,}75$.[/calc]'},
    ],
  },
  relacionades: ['definir-fx', 'ans', 'pau-ana-25s-q4a', 'mode-decimal'],
},
{
  id: 'ans',
  inici: calc(D),
  passos: [
    {tecles: ['sen', '3', '5', 'rpar'], pantalla: calc(D, '\\mathrm{sen}(35)'),
      text: '[calc]Primer, $\\sin 35^\\circ$: [[sen]], el 35 i [[rpar]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\mathrm{sen}(35)', '0.5735764364'), 'resultat'),
      text: '[calc]Prem [[exe]]. La calculadora desa el resultat a [[ans]] sense arrodonir-lo: la pantalla només en mostra els deu primers dígits.[/calc]'},
    {tecles: ['8', 'entre', 'ans'], pantalla: calc(D, '8\\div\\mathrm{Ans}', '', {hist: true}),
      text: '[mat]Ara vols $8\\div\\sin 35^\\circ$.[/mat] [calc]No escriguis el decimal: escriu 8, [[entre]] i la tecla [[ans]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '8\\div\\mathrm{Ans}', '13.94757436'), 'resultat'),
      text: '[calc]Prem [[exe]]: 13.94757436. Cap decimal copiat, cap error d\'arrodoniment.[/calc]'},
    {tecles: ['per', '2', 'exe'], pantalla: marca(calc(D, '\\mathrm{Ans}\\times 2', '27.89514873'), 'resultat'),
      text: '[calc]Si ara en vols el doble, no cal [[ans]]: després d\'un resultat, una operació com [[per]] ja comença amb Ans.[/calc]'},
    {error: true, tecles: ['ac', '8', 'entre', '0', 'punt', '5', '7', 'exe'], pantalla: marca(calc(D, '8\\div 0.57', '\\frac{800}{57}'), 'resultat'),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i copia només 0.57 en lloc de $\\sin 35^\\circ$. Surt $\\frac{800}{57}\\approx 14{,}04$ i no 13,95: ja falla el primer decimal. (Surt en fracció perquè la calculadora és en mode {{E Mat/S Mat}}.)[/calc]'},
  ],
  araTu: {
    enunciat: 'Calcula $\\dfrac{10}{\\cos 40^\\circ}$ amb la calculadora en graus, sense copiar cap decimal intermedi.',
    resultat: '13{,}05407289',
    error: 'Copiar només 0.77 en lloc de $\\cos 40^\\circ$: surt $\\frac{1000}{77}\\approx 12{,}99$, i ja falla el primer decimal.',
    inici: calc(D),
    passos: [
      {tecles: ['cos', '4', '0', 'rpar', 'exe'], pantalla: marca(calc(D, '\\cos(40)', '0.7660444431'), 'resultat'),
        text: '[calc]$\\cos(40)$ i [[exe]]: el resultat queda desat a [[ans]].[/calc]'},
      {tecles: ['1', '0', 'entre', 'ans', 'exe'], pantalla: marca(calc(D, '10\\div\\mathrm{Ans}', '13.05407289'), 'resultat'),
        text: '[calc]10, [[entre]], [[ans]] i [[exe]]: 13.05407289.[/calc]'},
      {error: true, tecles: ['ac', '1', '0', 'entre', '0', 'punt', '7', '7', 'exe'], pantalla: marca(calc(D, '10\\div 0.77', '\\frac{1000}{77}'), 'resultat'),
        text: '[calc]!!Error típic!!: esborra amb [[ac]] i, amb 0.77 copiat, surt $\\frac{1000}{77}\\approx 12{,}99$.[/calc]'},
    ],
  },
  relacionades: ['logaritmes', 'exacte-decimal', 'mode-decimal'],
},
{
  id: 'logaritmes',
  inici: calc(D),
  passos: [
    {tecles: ['logab'], pantalla: calc(D, '\\log_{\\square}(\\square)', '', {cursor: false}),
      text: '[calc]Prem [[logab]]: surt un logaritme amb dos quadres. El petit és la base i el gran, el nombre.[/calc]'},
    {tecles: ['3', 'right'], pantalla: calc(D, '\\log_{3}(\\square)', '', {cursor: false}),
      text: '[calc]Escriu la base, el 3, i prem [[right]] per passar al nombre.[/calc]'},
    {tecles: ['7'], pantalla: calc(D, '\\log_{3}(7)'),
      text: '[calc]Escriu el 7. El parèntesi ja hi és: no cal tancar-lo.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\log_{3}(7)', '1.771243749'), 'resultat'),
      text: '[calc]Prem [[exe]]: $x=\\log_3 7\\approx 1{,}7712$.[/calc]'},
    {tecles: ['3', 'pot', 'ans'], pantalla: calc(D, '3^{\\mathrm{Ans}}', '', {hist: true}),
      text: '[mat]Comprova-ho: $3^x$ ha de valer 7.[/mat] [calc]Escriu 3, [[pot]] i, a l\'exponent, [[ans]] (el resultat d\'abans, sense copiar-lo).[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '3^{\\mathrm{Ans}}', '7'), 'resultat'),
      text: '[calc]Prem [[exe]]: surt 7. ✓[/calc]'},
    {tecles: ['shift', 'neg', '1', '0', '0', '0', 'rpar'], pantalla: calc(D, '\\log(1000)', '', {hist: true}),
      text: '[calc]Per a base 10 i per a base $e$ hi ha tecles pròpies: log és [[shift]] [[neg]] i ln és [[ln]]. Prova $\\log 1000$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\log(1000)', '3'), 'resultat'),
      text: '[calc]Prem [[exe]]: $\\log 1000=3$.[/calc]'},
  ],
  araTu: {
    enunciat: 'Resol l\'equació $2^x=10$: calcula $x=\\log_2 10$ i comprova el resultat.',
    resultat: 'x=\\log_2 10\\approx 3{,}3219',
    error: 'Escriure la base i el nombre a l\'inrevés, $\\log_{10}2$: surt 0.3010299957.',
    inici: calc(D),
    passos: [
      {tecles: ['logab', '2', 'right', '1', '0'], pantalla: calc(D, '\\log_{2}(10)'),
        text: '[calc][[logab]], la base 2, [[right]] i el 10.[/calc]'},
      {tecles: ['exe'], pantalla: marca(calc(D, '\\log_{2}(10)', '3.321928095'), 'resultat'),
        text: '[calc]Prem [[exe]]: $x\\approx 3{,}3219$.[/calc]'},
      {tecles: ['2', 'pot', 'ans', 'exe'], pantalla: marca(calc(D, '2^{\\mathrm{Ans}}', '10'), 'resultat'),
        text: '[calc]Comprova-ho: 2, [[pot]], [[ans]] i [[exe]]. Surt 10. ✓[/calc]'},
    ],
  },
  relacionades: ['ans', 'definir-fx'],
},
{
  id: 'combinatoria',
  inici: calc(D),
  passos: [
    {tecles: ['6', 'shift', 'entre'], pantalla: calc(D, '6\\mathrm{C}'),
      text: '[calc]Escriu el 6 i prem [[shift]] [[entre]]: a sobre de ÷ hi ha nCr, el nombre combinatori. S\'escriu una C darrere del 6.[/calc]'},
    {tecles: ['4'], pantalla: calc(D, '6\\mathrm{C}4'),
      text: '[calc]Escriu el 4: «6C4» és $\\binom{6}{4}$.[/calc]'},
    {tecles: ['per', 'lpar', 'frac', '1', 'down', '2'], pantalla: calc(D, '6\\mathrm{C}4\\times (\\frac{1}{2}'),
      text: '[calc]Continua amb la probabilitat: [[per]], un parèntesi i la fracció $\\frac{1}{2}$ amb [[frac]].[/calc]'},
    {tecles: ['right', 'rpar', 'pot', '6'], pantalla: calc(D, '6\\mathrm{C}4\\times (\\frac{1}{2})^{6}'),
      text: '[calc]Surt de la fracció amb [[right]], tanca amb [[rpar]] i escriu l\'exponent amb [[pot]] i el 6.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '6\\mathrm{C}4\\times (\\frac{1}{2})^{6}', '\\frac{15}{64}'), 'resultat'),
      text: '[calc]Prem [[exe]]: $P(X=4)=\\frac{15}{64}$, perquè $\\binom{6}{4}=15$. Surt exacte perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 0.234375. A sobre de × hi ha nPr (permutacions) i, a sobre de [[inv]], el factorial, $x!$.[/calc]'},
  ],
  araTu: {
    enunciat: 'Amb $n=8$ i $p=\\frac{1}{2}$, calcula $P(X=3)=\\binom{8}{3}\\left(\\frac{1}{2}\\right)^{8}$.',
    resultat: '\\frac{7}{32}',
    error: 'Fer servir nPr ([[shift]] [[per]]) en lloc de nCr: $8\\mathrm{P}3=336$ compta l\'ordre, i $\\binom{8}{3}=56$.',
    inici: calc(D),
    passos: [
      {tecles: ['8', 'shift', 'entre', '3'], pantalla: calc(D, '8\\mathrm{C}3'),
        text: '[calc]El 8, [[shift]] [[entre]] (nCr) i el 3.[/calc]'},
      {tecles: ['per', 'lpar', 'frac', '1', 'down', '2', 'right', 'rpar', 'pot', '8', 'exe'], pantalla: marca(calc(D, '8\\mathrm{C}3\\times (\\frac{1}{2})^{8}', '\\frac{7}{32}'), 'resultat'),
        text: '[calc][[per]], $\\left(\\frac{1}{2}\\right)^8$ i [[exe]]: $\\frac{7}{32}$, perquè $\\binom{8}{3}=56$.[/calc]'},
    ],
  },
  relacionades: ['pau-pro-24i-q4', 'pot-fraccio', 'mode-decimal'],
},
{
  id: 'verificar',
  inici: calc(D),
  passos: [
    {tecles: ['menu'], pantalla: X2.apps(0),
      text: '[calc]Prem [[menu]]: surten les aplicacions de la calculadora. {{Verificar}} és la 4.[/calc]'},
    {tecles: ['4'], pantalla: calc(VERIF),
      text: '[calc]Prem 4: entres a {{Verificar}}. Compte: en canviar d\'aplicació, l\'historial s\'esborra.[/calc]'},
    {tecles: ['frac', '1', 'down', 'arrel', '2'], pantalla: calc(VERIF, '\\frac{1}{\\sqrt{2}}'),
      text: '[calc]Escriu el primer membre: [[frac]], el 1, [[down]], [[arrel]] i el 2.[/calc]'},
    {tecles: ['right', 'right', 'optn'], pantalla: X2.signes(),
      text: '[calc]Surt de l\'arrel i de la fracció amb dos [[right]] i prem [[optn]]: hi ha els signes =, ≠, >, <, ≥ i ≤.[/calc]'},
    {tecles: ['1'], pantalla: calc(VERIF, '\\frac{1}{\\sqrt{2}}='),
      text: '[calc]Prem 1: el signe {{1:=}}.[/calc]'},
    {tecles: ['frac', 'arrel', '2', 'right', 'down', '2'], pantalla: calc(VERIF, '\\frac{1}{\\sqrt{2}}=\\frac{\\sqrt{2}}{2}'),
      text: '[calc]Escriu el segon membre: [[frac]], [[arrel]], el 2, [[right]] per sortir de l\'arrel, [[down]] i el 2.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(VERIF, '\\frac{1}{\\sqrt{2}}=\\frac{\\sqrt{2}}{2}', '\\text{Verdadero}'), 'resultat'),
      text: '[calc]Prem [[exe]]: {{Verdadero}}. Si no fos cert, diria {{Falso}}. Compte: ara [[ans]] val 1 (o 0 si és fals), i si verifiques una solució arrodonida pot sortir {{Falso}} encara que sigui bona.[/calc]'},
    {tecles: ['menu', '1'], pantalla: calc(D),
      text: '[calc]Quan acabis, torna a {{Calcular}}: [[menu]] i 1.[/calc]'},
  ],
  araTu: {
    enunciat: 'Comprova amb {{Verificar}} que $\\sqrt{12}=2\\sqrt{3}$.',
    resultat: '\\text{és cert: }\\sqrt{12}=2\\sqrt{3}',
    error: 'Quedar-se a {{Verificar}}: per calcular amb normalitat, torna a {{Calcular}} amb [[menu]] i 1.',
    inici: calc(D),
    passos: [
      {tecles: ['menu', '4'], pantalla: calc(VERIF),
        text: '[calc][[menu]] i 4: {{Verificar}}.[/calc]'},
      {tecles: ['arrel', '1', '2', 'right', 'optn'], pantalla: X2.signes(),
        text: '[calc]$\\sqrt{12}$, [[right]] per sortir de l\'arrel i [[optn]].[/calc]'},
      {tecles: ['1'], pantalla: calc(VERIF, '\\sqrt{12}='),
        text: '[calc]El signe {{1:=}}: prem 1.[/calc]'},
      {tecles: ['2', 'arrel', '3', 'exe'], pantalla: marca(calc(VERIF, '\\sqrt{12}=2\\sqrt{3}', '\\text{Verdadero}'), 'resultat'),
        text: '[calc]$2\\sqrt{3}$ i [[exe]]: {{Verdadero}}.[/calc]'},
      {tecles: ['menu', '1'], pantalla: calc(D),
        text: '[calc]Torna a {{Calcular}}: [[menu]] i 1.[/calc]'},
    ],
  },
  relacionades: ['exacte-decimal', 'definir-fx'],
},

);

})(Models.obre());
