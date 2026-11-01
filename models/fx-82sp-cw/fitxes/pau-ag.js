/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/pau-ag.js — Les fitxes del bloc «Exercicis PAU. Àlgebra i Geometria»
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
  id: 'pau-alg-24j-q2', bloc: 'pau-ag', titol: 'Àlgebra · PAU 2024: comprova la solució d\'un sistema',
  enunciat: 'PAU juny 2024, qüestió 2 a). Per a $k=0$, el sistema és $$\\begin{cases}4x+2y-z=4\\\\ x-y=3\\\\ 3x+3y=1\\end{cases}$$ i has obtingut la solució $$x=\\frac{5}{3},\\qquad y=-\\frac{4}{3},\\qquad z=0.$$ Comprova-la amb la calculadora: substitueix-la a cada equació.',
  inici: calc(D),
  passos: [
    {tecles: ['4', 'per', 'frac', '5', 'down', '3', 'right', 'mes', '2', 'per', 'lpar', 'menys', 'frac', '4', 'down', '3', 'right', 'rpar', 'menys', '0'],
      pantalla: calc(D, '4\\times\\frac{5}{3}+2\\times(-\\frac{4}{3})-0'),
      text: 'Primera equació, $4x+2y-z$: escriu $4\\times\\frac{5}{3}+2\\times\\left(-\\frac{4}{3}\\right)-0$. Posa $y$ entre parèntesis; el signe negatiu és la tecla [[menys]] de sempre.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '4\\times\\frac{5}{3}+2\\times(-\\frac{4}{3})-0', '4'), 'resultat'),
      text: 'Prem [[exe]]: surt 4, que és el membre de la dreta. ✓'},
    {tecles: ['frac', '5', 'down', '3', 'right', 'menys', 'lpar', 'menys', 'frac', '4', 'down', '3', 'right', 'rpar'],
      pantalla: calc(D, '\\frac{5}{3}-(-\\frac{4}{3})', '', {hist: true}),
      text: 'Segona equació, $x-y$ (amb $k=0$, el terme $kz$ no hi és): escriu $\\frac{5}{3}-\\left(-\\frac{4}{3}\\right)$. No cal esborrar res: en començar a escriure, el càlcul anterior desapareix.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\frac{5}{3}-(-\\frac{4}{3})', '3'), 'resultat'),
      text: 'Prem [[exe]]: surt 3, el membre de la dreta. ✓'},
    {tecles: ['3', 'per', 'frac', '5', 'down', '3', 'right', 'mes', '3', 'per', 'lpar', 'menys', 'frac', '4', 'down', '3', 'right', 'rpar'],
      pantalla: calc(D, '3\\times\\frac{5}{3}+3\\times(-\\frac{4}{3})', '', {hist: true}),
      text: 'Tercera equació, $3x+3y$: escriu $3\\times\\frac{5}{3}+3\\times\\left(-\\frac{4}{3}\\right)$.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '3\\times\\frac{5}{3}+3\\times(-\\frac{4}{3})', '1'), 'resultat'),
      text: 'Prem [[exe]]: surt 1, el membre de la dreta. ✓ Es compleixen les tres equacions: la solució és correcta.'},
  ],
  /* «Ara tu» DESACTIVAT (v31, David): de moment no surt als exercicis PAU reals. Per tornar-lo a activar,
     treu aquest comentari (vegeu ARCHITECTURE.md, punt 14).
  araTu: {
    enunciat: 'Comprova si $x=\\frac{1}{2}$, $y=-\\frac{3}{2}$ és la solució del sistema $\\begin{cases}3x-y=3\\\\ x+y=-1\\end{cases}$',
    resultat: '\\text{Sí: surten }3\\text{ i }-1',
    error: 'Escriure $-y$ com a $-\\frac{3}{2}$, sense el parèntesi del signe de $y$: surt 0 i sembla que no és solució.',
    inici: calc(D),
    passos: [
      {tecles: ['3', 'per', 'frac', '1', 'down', '2', 'right', 'menys', 'lpar', 'menys', 'frac', '3', 'down', '2', 'right', 'rpar', 'exe'],
        pantalla: marca(calc(D, '3\\times\\frac{1}{2}-(-\\frac{3}{2})', '3'), 'resultat'),
        text: 'Primera equació: $3\\times\\frac{1}{2}-\\left(-\\frac{3}{2}\\right)$ i [[exe]]. Surt 3. ✓'},
      {tecles: ['frac', '1', 'down', '2', 'right', 'mes', 'lpar', 'menys', 'frac', '3', 'down', '2', 'right', 'rpar', 'exe'],
        pantalla: marca(calc(D, '\\frac{1}{2}+(-\\frac{3}{2})', '-1'), 'resultat'),
        text: 'Segona: $\\frac{1}{2}+\\left(-\\frac{3}{2}\\right)$ i [[exe]]. Surt −1. ✓ És la solució.'},
      {error: true, tecles: ['3', 'per', 'frac', '1', 'down', '2', 'right', 'menys', 'frac', '3', 'down', '2', 'exe'],
        pantalla: marca(calc(D, '3\\times\\frac{1}{2}-\\frac{3}{2}', '0'), 'resultat'),
        text: '!!Error típic!!: sense el parèntesi, $3\\times\\frac{1}{2}-\\frac{3}{2}$ dona 0, i no 3.'},
    ],
  },
  */
  relacionades: ['exacte-decimal', 'frac-plantilla', 'pau-alg-24s-q2'],
},
{
  id: 'pau-alg-24s-q2', bloc: 'pau-ag', titol: 'Àlgebra · PAU 2024: un menor orlat amb la regla de Sarrus',
  enunciat: 'PAU setembre 2024, qüestió 2 a). Per a $m=1$, el rang de la matriu $A$ és 2. Per saber el rang de la matriu ampliada $A\'$, calcula amb la regla de Sarrus el menor d\'ordre 3 de les columnes de $x$, de $y$ i dels termes independents: $$A\'=\\left(\\begin{array}{rrr|r}1&-3&1&-2\\\\1&1&2&3\\\\1&1&2&1\\end{array}\\right)\\qquad\\begin{vmatrix}1&-3&-2\\\\1&1&3\\\\1&1&1\\end{vmatrix}$$',
  inici: calc(D),
  passos: [
    {tecles: ['1', 'per', '1', 'per', '1', 'mes', 'lpar', 'menys', '3', 'rpar', 'per', '3', 'per', '1', 'mes', 'lpar', 'menys', '2', 'rpar', 'per', '1', 'per', '1'],
      pantalla: calc(D, '1\\times 1\\times 1+(-3)\\times 3\\times 1+(-2)\\times 1\\times 1'),
      text: 'El primer claudàtor de Sarrus són els tres productes amb signe +. Escriu $1\\times 1\\times 1+(-3)\\times 3\\times 1+(-2)\\times 1\\times 1$, cada factor tal com és a la matriu. Els negatius, entre parèntesis i amb la tecla [[menys]].'},
    {tecles: ['exe'], pantalla: marca(calc(D, '1\\times 1\\times 1+(-3)\\times 3\\times 1+(-2)\\times 1\\times 1', '-10'), 'resultat'),
      text: 'Prem [[exe]]: el primer claudàtor val −10.'},
    {tecles: ['ans', 'menys', 'lpar', 'lpar', 'menys', '2', 'rpar', 'per', '1', 'per', '1', 'mes', '1', 'per', '3', 'per', '1', 'mes', 'lpar', 'menys', '3', 'rpar', 'per', '1', 'per', '1', 'rpar'],
      pantalla: calc(D, '\\mathrm{Ans}-((-2)\\times 1\\times 1+1\\times 3\\times 1+(-3)\\times 1\\times 1)', '', {hist: true}),
      text: 'Ara resta-hi el segon claudàtor, el dels tres productes amb signe −: [[ans]] (el −10), [[menys]] i els tres productes entre parèntesis. Sense aquest parèntesi, el − només afectaria el primer producte.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\mathrm{Ans}-((-2)\\times 1\\times 1+1\\times 3\\times 1+(-3)\\times 1\\times 1)', '-8'), 'resultat'),
      text: 'Prem [[exe]]: el menor val $-8\\neq 0$. Per tant, el rang de la matriu $A\'$ és 3 i, com que el de la matriu $A$ és 2, per a $m=1$ el sistema és incompatible.'},
  ],
  /* «Ara tu» DESACTIVAT (v31, David): de moment no surt als exercicis PAU reals. Per tornar-lo a activar,
     treu aquest comentari (vegeu ARCHITECTURE.md, punt 14).
  araTu: {
    enunciat: 'Calcula amb la regla de Sarrus $\\begin{vmatrix}1&2&0\\\\-1&3&1\\\\2&0&1\\end{vmatrix}$.',
    resultat: '9',
    error: 'Escriure [[ans]] [[menys]] i els tres productes sense parèntesis: només es resta el primer, i surt 5.',
    inici: calc(D),
    passos: [
      {tecles: ['1', 'per', '3', 'per', '1', 'mes', '2', 'per', '1', 'per', '2', 'mes', '0', 'per', 'lpar', 'menys', '1', 'rpar', 'per', '0'],
        pantalla: calc(D, '1\\times 3\\times 1+2\\times 1\\times 2+0\\times(-1)\\times 0'),
        text: 'Els tres productes amb signe +: $1\\times 3\\times 1+2\\times 1\\times 2+0\\times(-1)\\times 0$.'},
      {tecles: ['exe'], pantalla: marca(calc(D, '1\\times 3\\times 1+2\\times 1\\times 2+0\\times(-1)\\times 0', '7'), 'resultat'),
        text: 'Prem [[exe]]: 7.'},
      {tecles: ['ans', 'menys', 'lpar', '0', 'per', '3', 'per', '2', 'mes', '1', 'per', '1', 'per', '0', 'mes', '2', 'per', 'lpar', 'menys', '1', 'rpar', 'per', '1', 'rpar', 'exe'],
        pantalla: marca(calc(D, '\\mathrm{Ans}-(0\\times 3\\times 2+1\\times 1\\times 0+2\\times(-1)\\times 1)', '9'), 'resultat'),
        text: '[[ans]], [[menys]] i, entre parèntesis, els tres productes amb signe −. Prem [[exe]]: el determinant val 9.'},
    ],
  },
  */
  relacionades: ['ans', 'pau-alg-24j-q2', 'pot-negativa'],
},
{
  id: 'pau-geo-25s-q4b', bloc: 'pau-ag', titol: 'Geometria · PAU 2025: distància d\'un punt a un pla',
  enunciat: 'PAU setembre 2025, exercici 4 B a). Considereu el pla $\\pi: 2x-y+z=5$ i el punt $P=(0,1,3)$. Comproveu que la distància de $P$ a $\\pi$ és $\\frac{\\sqrt{6}}{2}$. $$d(P,\\pi)=\\frac{|2\\cdot 0-1+3-5|}{\\sqrt{2^2+(-1)^2+1^2}}$$',
  inici: calc(D),
  passos: [
    {tecles: ['2', 'per', '0', 'menys', '1', 'mes', '3', 'menys', '5'], pantalla: calc(D, '2\\times 0-1+3-5'),
      text: 'Primer, el numerador: substitueix $P$ a $2x-y+z-5$. Escriu $2\\times 0-1+3-5$.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '2\\times 0-1+3-5', '-3'), 'resultat'),
      text: 'Prem [[exe]]: surt −3. El valor absolut el fas tu: $|-3|=3$.'},
    {tecles: ['frac', '3', 'down', 'arrel', '2', 'x2', 'mes', 'lpar', 'menys', '1', 'rpar', 'x2', 'mes', '1', 'x2'],
      pantalla: calc(D, '\\frac{3}{\\sqrt{2^{2}+(-1)^{2}+1^{2}}}', '', {hist: true}),
      text: 'Ara la distància: la fracció [[frac]] amb el 3 a dalt; [[down]] i, a baix, l\'arrel [[arrel]] de $2^2+(-1)^2+1^2$. El quadrat és [[x2]]. El −1, entre parèntesis: [[lpar]] [[menys]] 1 [[rpar]].'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\frac{3}{\\sqrt{2^{2}+(-1)^{2}+1^{2}}}', '\\frac{\\sqrt{6}}{2}'), 'resultat'),
      text: 'Prem [[exe]]: surt $\\frac{\\sqrt{6}}{2}$, el valor de l\'enunciat. ✓ En mode {{E Mat/S Mat}} la calculadora racionalitza sola; en mode decimal sortiria 1.224744871 i no ho podries comparar.'},
  ],
  /* «Ara tu» DESACTIVAT (v31, David): de moment no surt als exercicis PAU reals. Per tornar-lo a activar,
     treu aquest comentari (vegeu ARCHITECTURE.md, punt 14).
  araTu: {
    enunciat: 'Calcula la distància del punt $Q=(1,0,2)$ al pla $\\pi: 2x-y+z=5$.',
    resultat: '\\frac{\\sqrt{6}}{6}',
    error: 'Escriure $-1^2$ sense parèntesis dins de l\'arrel: la calculadora fa $2^2-1^2+1^2=4$ i surt $\\frac{1}{2}$.',
    inici: calc(D),
    passos: [
      {tecles: ['2', 'per', '1', 'menys', '0', 'mes', '2', 'menys', '5', 'exe'], pantalla: marca(calc(D, '2\\times 1-0+2-5', '-1'), 'resultat'),
        text: 'El numerador: $2\\times 1-0+2-5=-1$. El valor absolut el fas tu: 1.'},
      {tecles: ['frac', '1', 'down', 'arrel', '2', 'x2', 'mes', 'lpar', 'menys', '1', 'rpar', 'x2', 'mes', '1', 'x2', 'exe'],
        pantalla: marca(calc(D, '\\frac{1}{\\sqrt{2^{2}+(-1)^{2}+1^{2}}}', '\\frac{\\sqrt{6}}{6}'), 'resultat'),
        text: 'La fracció, amb l\'1 a dalt i l\'arrel de $2^2+(-1)^2+1^2$ a baix. Prem [[exe]]: $\\frac{\\sqrt{6}}{6}$.'},
      {error: true, tecles: ['frac', '1', 'down', 'arrel', '2', 'x2', 'menys', '1', 'x2', 'mes', '1', 'x2', 'exe'],
        pantalla: marca(calc(D, '\\frac{1}{\\sqrt{2^{2}-1^{2}+1^{2}}}', '\\frac{1}{2}'), 'resultat'),
        text: '!!Error típic!!: sense el parèntesi, $-1^2$ resta 1 en lloc de sumar-lo, i surt $\\frac{1}{2}$.'},
    ],
  },
  */
  relacionades: ['exacte-decimal', 'mode-decimal', 'pot-negativa', 'pau-geo-25s-q4b-c'],
},
{
  id: 'pau-geo-25s-q4b-c', bloc: 'pau-ag', titol: 'Geometria · PAU 2025: el punt simètric respecte d\'un pla',
  enunciat: 'PAU setembre 2025, exercici 4 B c). Considereu el pla $\\pi: 2x-y+z=5$ i el punt $P=(0,1,3)$. Trobeu un pla $\\pi_2$ paral·lel a $\\pi$, que no passi per $P$, a una distància $\\frac{\\sqrt{6}}{2}$ de $\\pi$. Passa pel simètric $P\'$ de $P$: la recta perpendicular a $\\pi$ per $P$, $(2\\lambda,\\,1-\\lambda,\\,3+\\lambda)$, talla el pla per a $\\lambda=\\frac{1}{2}$, al punt $M=\\left(1,\\frac{1}{2},\\frac{7}{2}\\right)$.',
  inici: calc(D),
  passos: [
    {tecles: ['2', 'per', '1', 'menys', 'frac', '1', 'down', '2', 'right', 'mes', 'frac', '7', 'down', '2'],
      pantalla: calc(D, '2\\times 1-\\frac{1}{2}+\\frac{7}{2}'),
      text: 'Primer, comprova que el punt $M$ és al pla: substitueix-lo a $2x-y+z$. Escriu $2\\times 1-\\frac{1}{2}+\\frac{7}{2}$, amb [[frac]] per a les fraccions i [[right]] per sortir-ne.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '2\\times 1-\\frac{1}{2}+\\frac{7}{2}', '5'), 'resultat'),
      text: 'Prem [[exe]]: surt 5, el terme independent del pla. ✓ El punt $M$ és el punt del pla $\\pi$ més proper a $P$.'},
    {tecles: ['2', 'per', 'frac', '7', 'down', '2', 'right', 'menys', '3', 'exe'], pantalla: marca(calc(D, '2\\times\\frac{7}{2}-3', '4'), 'resultat'),
      text: 'El punt $M$ és el punt mitjà de $P$ i $P\'$, així que $P\'=2M-P$. Les dues primeres coordenades són $2\\cdot 1-0=2$ i $2\\cdot\\frac{1}{2}-1=0$; la tercera, amb la calculadora: $2\\times\\frac{7}{2}-3=4$. Per tant, $P\'=(2,\\,0,\\,4)$.'},
    {tecles: ['2', 'per', '2', 'menys', '0', 'mes', '4', 'menys', '5', 'exe'], pantalla: marca(calc(D, '2\\times 2-0+4-5', '3'), 'resultat'),
      text: 'Comprova que el punt $P\'$ és a una distància $\\frac{\\sqrt{6}}{2}$ del pla $\\pi$. El numerador de la fórmula: substitueix $P\'$ a $2x-y+z-5$. Surt 3.'},
    {tecles: ['frac', '3', 'down', 'arrel', '2', 'x2', 'mes', 'lpar', 'menys', '1', 'rpar', 'x2', 'mes', '1', 'x2'],
      pantalla: calc(D, '\\frac{3}{\\sqrt{2^{2}+(-1)^{2}+1^{2}}}', '', {hist: true}),
      text: 'Ara la fracció: el 3 a dalt i, a baix, l\'arrel de $2^2+(-1)^2+1^2$, com a l\'apartat a).'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\frac{3}{\\sqrt{2^{2}+(-1)^{2}+1^{2}}}', '\\frac{\\sqrt{6}}{2}'), 'resultat'),
      text: 'Prem [[exe]]: $\\frac{\\sqrt{6}}{2}$. ✓ El punt $P\'$ és a la mateixa distància del pla que $P$, a l\'altra banda. El pla $\\pi_2$ és $2x-y+z=E$ amb $E=2\\cdot 2-0+4=8$: $\\pi_2: 2x-y+z=8$. (Surt exacte perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 1.224744871.)'},
  ],
  /* «Ara tu» DESACTIVAT (v31, David): de moment no surt als exercicis PAU reals. Per tornar-lo a activar,
     treu aquest comentari (vegeu ARCHITECTURE.md, punt 14).
  araTu: {
    enunciat: 'Troba el simètric $Q\'$ de $Q=(1,0,2)$ respecte del pla $\\pi: 2x-y+z=5$. La perpendicular per $Q$, $(1+2\\lambda,\\,-\\lambda,\\,2+\\lambda)$, talla el pla per a $\\lambda=\\frac{1}{6}$, al punt $M=\\left(\\frac{4}{3},-\\frac{1}{6},\\frac{13}{6}\\right)$.',
    resultat: 'Q\'=\\left(\\frac{5}{3},-\\frac{1}{3},\\frac{7}{3}\\right)',
    error: 'Donar $M$ com a simètric: $M$ és el punt mitjà de $Q$ i $Q\'$, i el simètric és $Q\'=2M-Q$.',
    inici: calc(D),
    passos: [
      {tecles: ['2', 'per', 'frac', '4', 'down', '3', 'right', 'menys', 'lpar', 'menys', 'frac', '1', 'down', '6', 'right', 'rpar', 'mes', 'frac', '1', '3', 'down', '6', 'exe'],
        pantalla: marca(calc(D, '2\\times\\frac{4}{3}-(-\\frac{1}{6})+\\frac{13}{6}', '5'), 'resultat'),
        text: 'Comprova que $M$ és al pla: $2\\times\\frac{4}{3}-\\left(-\\frac{1}{6}\\right)+\\frac{13}{6}=5$. ✓'},
      {tecles: ['2', 'per', 'frac', '4', 'down', '3', 'right', 'menys', '1', 'exe'], pantalla: marca(calc(D, '2\\times\\frac{4}{3}-1', '\\frac{5}{3}'), 'resultat'),
        text: 'Primera coordenada de $Q\'=2M-Q$: $2\\times\\frac{4}{3}-1=\\frac{5}{3}$. La segona, de cap: $2\\cdot\\left(-\\frac{1}{6}\\right)-0=-\\frac{1}{3}$.'},
      {tecles: ['2', 'per', 'frac', '1', '3', 'down', '6', 'right', 'menys', '2', 'exe'], pantalla: marca(calc(D, '2\\times\\frac{13}{6}-2', '\\frac{7}{3}'), 'resultat'),
        text: 'Tercera: $2\\times\\frac{13}{6}-2=\\frac{7}{3}$.'},
      {tecles: ['2', 'per', 'frac', '5', 'down', '3', 'right', 'menys', 'lpar', 'menys', 'frac', '1', 'down', '3', 'right', 'rpar', 'mes', 'frac', '7', 'down', '3', 'right', 'menys', '5', 'exe'],
        pantalla: marca(calc(D, '2\\times\\frac{5}{3}-(-\\frac{1}{3})+\\frac{7}{3}-5', '1'), 'resultat'),
        text: 'Comprova-ho: substitueix $Q\'$ a $2x-y+z-5$. Surt 1, i amb $Q$ sortia −1: la mateixa distància, a l\'altra banda del pla. ✓'},
    ],
  },
  */
  relacionades: ['pau-geo-25s-q4b', 'frac-plantilla', 'pot-negativa', 'mode-decimal'],
},
{
  id: 'pau-geo-26j2-q4b', bloc: 'pau-ag', titol: 'Geometria · PAU 2026: distàncies en centímetres',
  enunciat: 'PAU juny 2026 (sèrie 5), exercici 4 B. Un braç robòtic desplaça un sensor en línia recta des del punt $A=(1,2,3)$ fins al punt $B=(5,3,7)$, per damunt del pla $\\pi$, d\'equació general $x-y-5=0$ (l\'enunciat original dona el pla en forma paramètrica; l\'equació general l\'has obtinguda a mà; les unitats són centímetres). [a]4.1. Quina distància ha recorregut el sensor?[/a] [b]4.2. En acabar el moviment, a quina distància del pla es troba el sensor?[/b]',
  inici: calc(D),
  passos: [
    {apartat: 'a', tecles: ['arrel', '4', 'x2', 'mes', '1', 'x2', 'mes', '4', 'x2'], pantalla: calc(D, '\\sqrt{4^{2}+1^{2}+4^{2}}'),
      text: '4.1. El vector $\\vec{AB}=(4,1,4)$, i la distància és el seu mòdul. Escriu [[arrel]] i, a dins, $4^2+1^2+4^2$: el quadrat és [[x2]].'},
    {apartat: 'a', tecles: ['exe'], pantalla: marca(calc(D, '\\sqrt{4^{2}+1^{2}+4^{2}}', '\\sqrt{33}'), 'resultat'),
      text: 'Prem [[exe]]: $\\sqrt{33}$, el valor exacte, perquè la calculadora és en mode {{E Mat/S Mat}}. En mode {{E Mat/S Decimal}} sortiria directament 5.744562647.'},
    {apartat: 'a', tecles: ['format', 'down', 'ok'], pantalla: marca(calc(D, '\\sqrt{4^{2}+1^{2}+4^{2}}', '5.744562647'), 'resultat'),
      text: 'Com que és una longitud en centímetres, dona\'n també el decimal: [[format]], {{Decimal}} amb [[down]] i [[ok]]. El sensor ha recorregut $\\sqrt{33}\\approx 5{,}74$ cm.'},
    {apartat: 'b', tecles: ['5', 'menys', '3', 'menys', '5', 'exe'], pantalla: marca(calc(D, '5-3-5', '-3'), 'resultat'),
      text: '4.2. La distància del punt $B$ al pla. Primer, el numerador: substitueix $B$ a $x-y-5$, és a dir, $5-3-5$. Surt −3; el valor absolut el fas tu: 3.'},
    {apartat: 'b', tecles: ['frac', '3', 'down', 'arrel', '1', 'x2', 'mes', 'lpar', 'menys', '1', 'rpar', 'x2', 'mes', '0', 'x2'],
      pantalla: calc(D, '\\frac{3}{\\sqrt{1^{2}+(-1)^{2}+0^{2}}}', '', {hist: true}),
      text: 'Ara la fracció: [[frac]] amb el 3 a dalt i, a baix, l\'arrel de $1^2+(-1)^2+0^2$. El −1, entre parèntesis.'},
    {apartat: 'b', tecles: ['exe'], pantalla: marca(calc(D, '\\frac{3}{\\sqrt{1^{2}+(-1)^{2}+0^{2}}}', '\\frac{3\\sqrt{2}}{2}'), 'resultat'),
      text: 'Prem [[exe]]: $\\frac{3\\sqrt{2}}{2}$. La calculadora ja racionalitza.'},
    {apartat: 'b', tecles: ['format', 'down', 'ok'], pantalla: marca(calc(D, '\\frac{3}{\\sqrt{1^{2}+(-1)^{2}+0^{2}}}', '2.121320344'), 'resultat'),
      text: 'En decimal, amb [[format]] i {{Decimal}}: el sensor és a $\\frac{3\\sqrt{2}}{2}\\approx 2{,}12$ cm del pla.'},
  ],
  /* «Ara tu» DESACTIVAT (v31, David): de moment no surt als exercicis PAU reals. Per tornar-lo a activar,
     treu aquest comentari (vegeu ARCHITECTURE.md, punt 14).
  araTu: {
    enunciat: 'Després, el sensor va de $B=(5,3,7)$ a $C=(2,1,1)$. Quina distància recorre? A quina distància del pla $x-y-5=0$ queda?',
    resultat: '7\\text{ cm i }2\\sqrt{2}\\approx 2{,}83\\text{ cm}',
    error: 'Escriure les components negatives de $\\vec{BC}$ sense parèntesis: $-3^2$ és $-9$, i dins de l\'arrel surt un nombre negatiu.',
    inici: calc(D),
    passos: [
      {tecles: ['arrel', '3', 'x2', 'mes', '2', 'x2', 'mes', '6', 'x2', 'exe'], pantalla: marca(calc(D, '\\sqrt{3^{2}+2^{2}+6^{2}}', '7'), 'resultat'),
        text: '$\\vec{BC}=(-3,-2,-6)$. Com que cada component s\'eleva al quadrat, el signe no importa: $\\sqrt{3^2+2^2+6^2}=7$ cm.'},
      {tecles: ['2', 'menys', '1', 'menys', '5', 'exe'], pantalla: marca(calc(D, '2-1-5', '-4'), 'resultat'),
        text: 'Distància de $C$ al pla. El numerador: $2-1-5=-4$; en valor absolut, 4.'},
      {tecles: ['frac', '4', 'down', 'arrel', '1', 'x2', 'mes', 'lpar', 'menys', '1', 'rpar', 'x2', 'mes', '0', 'x2', 'exe'],
        pantalla: marca(calc(D, '\\frac{4}{\\sqrt{1^{2}+(-1)^{2}+0^{2}}}', '2\\sqrt{2}'), 'resultat'),
        text: 'La fracció i [[exe]]: $2\\sqrt{2}$.'},
      {tecles: ['format', 'down', 'ok'], pantalla: marca(calc(D, '\\frac{4}{\\sqrt{1^{2}+(-1)^{2}+0^{2}}}', '2.828427125'), 'resultat'),
        text: 'En decimal, amb [[format]] i {{Decimal}}: $\\approx 2{,}83$ cm.'},
    ],
  },
  */
  relacionades: ['exacte-decimal', 'pau-geo-25s-q4b', 'mode-decimal'],
},

);

})(Models.obre('fx-82sp-cw'));
