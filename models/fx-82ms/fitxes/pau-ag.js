/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/pau-ag.js — «Exercicis PAU. Àlgebra i Geometria» (fx-82MS)
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Els mateixos exercicis, enunciats i ids que a la CW.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

const {calc, marca} = M.guions;
const {D} = M.comu;

M.fitxes.push(

{
  id: 'pau-alg-24j-q2', bloc: 'pau-ag', titol: 'Àlgebra · PAU 2024: comprova la solució d\'un sistema',
  font: 'PAU juny 2024, qüestió 2 a)',
  enunciat: 'Per a $k=0$, el sistema és $$\\begin{cases}4x+2y-z=4\\\\ x-y=3\\\\ 3x+3y=1\\end{cases}$$ i has obtingut la solució $$x=\\frac{5}{3},\\qquad y=-\\frac{4}{3},\\qquad z=0.$$ Comprova-la amb la calculadora: substitueix-la a cada equació.',
  inici: calc(D),
  passos: [
    {tecles: ['4', 'per', '5', 'abc', '3', 'mes', '2', 'per', 'lpar', 'neg', '4', 'abc', '3', 'rpar', 'menys', '0'], pantalla: calc(D, '4×5┘3+2×(-4┘3)-0'),
      text: 'Primera equació, $4x+2y-z$: escriu $4\\times\\frac{5}{3}+2\\times\\left(-\\frac{4}{3}\\right)-0$. Les fraccions, amb [[abc]]; $y$, entre parèntesis i amb el signe negatiu [[neg]].'},
    {tecles: ['igual'], pantalla: marca(calc(D, '4×5┘3+2×(-4┘3)-0', '4'), 'resultat'),
      text: 'Prem [[igual]]: surt 4, que és el membre de la dreta. ✓'},
    {tecles: ['5', 'abc', '3', 'menys', 'lpar', 'neg', '4', 'abc', '3', 'rpar'], pantalla: calc(D, '5┘3-(-4┘3)'),
      text: 'Segona equació, $x-y$ (amb $k=0$, el terme $kz$ no hi és): escriu $\\frac{5}{3}-\\left(-\\frac{4}{3}\\right)$. En començar a escriure, el càlcul anterior desapareix.'},
    {tecles: ['igual'], pantalla: marca(calc(D, '5┘3-(-4┘3)', '3'), 'resultat'),
      text: 'Prem [[igual]]: surt 3, el membre de la dreta. ✓'},
    {tecles: ['3', 'per', '5', 'abc', '3', 'mes', '3', 'per', 'lpar', 'neg', '4', 'abc', '3', 'rpar'], pantalla: calc(D, '3×5┘3+3×(-4┘3)'),
      text: 'Tercera equació, $3x+3y$: escriu $3\\times\\frac{5}{3}+3\\times\\left(-\\frac{4}{3}\\right)$.'},
    {tecles: ['igual'], pantalla: marca(calc(D, '3×5┘3+3×(-4┘3)', '1'), 'resultat'),
      text: 'Prem [[igual]]: surt 1, el membre de la dreta. ✓ Es compleixen les tres equacions: la solució és correcta.'},
  ],
  relacionades: ['pau-alg-24s-q2', 'frac-plantilla'],
},
{
  id: 'pau-alg-24s-q2', bloc: 'pau-ag', titol: 'Àlgebra · PAU 2024: un menor orlat amb la regla de Sarrus',
  font: 'PAU setembre 2024, qüestió 2 a)',
  enunciat: 'Per a $m=1$, el rang de la matriu $A$ és 2. Per saber el rang de la matriu ampliada $A\'$, calcula amb la regla de Sarrus el menor d\'ordre 3 de les columnes de $x$, de $y$ i dels termes independents: $$A\'=\\left(\\begin{array}{rrr|r}1&-3&1&-2\\\\1&1&2&3\\\\1&1&2&1\\end{array}\\right)\\qquad\\begin{vmatrix}1&-3&-2\\\\1&1&3\\\\1&1&1\\end{vmatrix}$$',
  inici: calc(D),
  passos: [
    {tecles: ['1', 'per', '1', 'per', '1', 'mes', 'lpar', 'neg', '3', 'rpar', 'per', '3', 'per', '1', 'mes', 'lpar', 'neg', '2', 'rpar', 'per', '1', 'per', '1'],
      pantalla: calc(D, '1×1×1+(-3)×3×1+(-2)×1×1'),
      text: 'El primer claudàtor de Sarrus són els tres productes amb signe +. Escriu $1\\times 1\\times 1+(-3)\\times 3\\times 1+(-2)\\times 1\\times 1$, cada factor tal com és a la matriu. Els negatius, entre parèntesis i amb la tecla [[neg]].'},
    {tecles: ['igual'], pantalla: marca(calc(D, '1×1×1+(-3)×3×1+(-2)×1×1', '-10'), 'resultat'),
      text: 'Prem [[igual]]: el primer claudàtor val −10.'},
    {tecles: ['ans', 'menys', 'lpar', 'lpar', 'neg', '2', 'rpar', 'per', '1', 'per', '1', 'mes', '1', 'per', '3', 'per', '1', 'mes', 'lpar', 'neg', '3', 'rpar', 'per', '1', 'per', '1', 'rpar'],
      pantalla: calc(D, 'Ans-((-2)×1×1+1×3×1+(-3)×1×1)'),
      text: 'Ara resta-hi el segon claudàtor, el dels tres productes amb signe −: [[ans]] (el −10), [[menys]] i els tres productes entre parèntesis. Sense aquest parèntesi, el − només afectaria el primer producte.'},
    {tecles: ['igual'], pantalla: marca(calc(D, 'Ans-((-2)×1×1+1×3×1+(-3)×1×1)', '-8'), 'resultat'),
      text: 'Prem [[igual]]: el menor val $-8\\neq 0$. Per tant, el rang de la matriu $A\'$ és 3 i, com que el de la matriu $A$ és 2, per a $m=1$ el sistema és incompatible.'},
  ],
  relacionades: ['ans', 'pau-alg-24j-q2', 'pot-negativa'],
},
{
  id: 'pau-geo-25s-q4b', bloc: 'pau-ag', titol: 'Geometria · PAU 2025: distància d\'un punt a un pla',
  font: 'PAU setembre 2025, exercici 4 B a)',
  enunciat: 'Considereu el pla $\\pi: 2x-y+z=5$ i el punt $P=(0,1,3)$. Comproveu que la distància de $P$ a $\\pi$ és $\\frac{\\sqrt{6}}{2}$. $$d(P,\\pi)=\\frac{|2\\cdot 0-1+3-5|}{\\sqrt{2^2+(-1)^2+1^2}}$$',
  inici: calc(D),
  passos: [
    {tecles: ['2', 'per', '0', 'menys', '1', 'mes', '3', 'menys', '5'], pantalla: calc(D, '2×0-1+3-5'),
      text: 'Primer, el numerador: substitueix $P$ a $2x-y+z-5$. Escriu $2\\times 0-1+3-5$.'},
    {tecles: ['igual'], pantalla: marca(calc(D, '2×0-1+3-5', '-3'), 'resultat'),
      text: 'Prem [[igual]]: surt −3. El valor absolut el fas tu: $|-3|=3$.'},
    {tecles: ['3', 'entre', 'arrel', 'lpar', '2', 'x2', 'mes', 'lpar', 'neg', '1', 'rpar', 'x2', 'mes', '1', 'x2', 'rpar'],
      pantalla: calc(D, '3÷√(2²+(-1)²+1²)'),
      text: 'Ara la distància: 3, [[entre]] i l\'arrel [[arrel]] de $2^2+(-1)^2+1^2$, tot entre parèntesis (l\'arrel només afecta el que té just darrere). El quadrat és [[x2]]; el −1, entre parèntesis i amb [[neg]].'},
    {tecles: ['igual'], pantalla: marca(calc(D, '3÷√(2²+(-1)²+1²)', '1.224744871'), 'resultat'),
      text: 'Prem [[igual]]: 1.224744871. La fx-82MS no dona l\'arrel exacta: el valor de l\'enunciat, $\\frac{\\sqrt{6}}{2}$, s\'ha de comprovar.'},
    {tecles: ['arrel', '6', 'entre', '2', 'igual'], pantalla: marca(calc(D, '√6÷2', '1.224744871'), 'resultat'),
      text: 'Calcula $\\sqrt{6}\\div 2$: [[arrel]], el 6, [[entre]], el 2 i [[igual]]. Surt el mateix nombre, 1.224744871: la distància és $\\frac{\\sqrt{6}}{2}$. ✓'},
  ],
  relacionades: ['pot-negativa', 'pau-geo-25s-q4b-c'],
},
{
  id: 'pau-geo-25s-q4b-c', bloc: 'pau-ag', titol: 'Geometria · PAU 2025: el punt simètric respecte d\'un pla',
  font: 'PAU setembre 2025, exercici 4 B c)',
  enunciat: 'Considereu el pla $\\pi: 2x-y+z=5$ i el punt $P=(0,1,3)$. Trobeu un pla $\\pi_2$ paral·lel a $\\pi$, que no passi per $P$, a una distància $\\frac{\\sqrt{6}}{2}$ de $\\pi$. Passa pel simètric $P\'$ de $P$: la recta perpendicular a $\\pi$ per $P$, $(2\\lambda,\\,1-\\lambda,\\,3+\\lambda)$, talla el pla per a $\\lambda=\\frac{1}{2}$, al punt $M=\\left(1,\\frac{1}{2},\\frac{7}{2}\\right)$.',
  inici: calc(D),
  passos: [
    {tecles: ['2', 'per', '1', 'menys', '1', 'abc', '2', 'mes', '7', 'abc', '2'], pantalla: calc(D, '2×1-1┘2+7┘2'),
      text: 'Primer, comprova que el punt $M$ és al pla: substitueix-lo a $2x-y+z$. Escriu $2\\times 1-\\frac{1}{2}+\\frac{7}{2}$, amb [[abc]] per a les fraccions.'},
    {tecles: ['igual'], pantalla: marca(calc(D, '2×1-1┘2+7┘2', '5'), 'resultat'),
      text: 'Prem [[igual]]: surt 5, el terme independent del pla. ✓ El punt $M$ és el punt del pla $\\pi$ més proper a $P$.'},
    {tecles: ['2', 'per', '7', 'abc', '2', 'menys', '3', 'igual'], pantalla: marca(calc(D, '2×7┘2-3', '4'), 'resultat'),
      text: 'El punt $M$ és el punt mitjà de $P$ i $P\'$, així que $P\'=2M-P$. Les dues primeres coordenades són $2\\cdot 1-0=2$ i $2\\cdot\\frac{1}{2}-1=0$; la tercera, amb la calculadora: $2\\times\\frac{7}{2}-3=4$. Per tant, $P\'=(2,\\,0,\\,4)$.'},
    {tecles: ['2', 'per', '2', 'menys', '0', 'mes', '4', 'menys', '5', 'igual'], pantalla: marca(calc(D, '2×2-0+4-5', '3'), 'resultat'),
      text: 'Comprova que el punt $P\'$ és a una distància $\\frac{\\sqrt{6}}{2}$ del pla $\\pi$. El numerador de la fórmula: substitueix $P\'$ a $2x-y+z-5$. Surt 3.'},
    {tecles: ['3', 'entre', 'arrel', 'lpar', '2', 'x2', 'mes', 'lpar', 'neg', '1', 'rpar', 'x2', 'mes', '1', 'x2', 'rpar'],
      pantalla: calc(D, '3÷√(2²+(-1)²+1²)'),
      text: 'Ara la distància: 3 [[entre]] l\'arrel de $2^2+(-1)^2+1^2$, entre parèntesis, com a l\'apartat a).'},
    {tecles: ['igual'], pantalla: marca(calc(D, '3÷√(2²+(-1)²+1²)', '1.224744871'), 'resultat'),
      text: 'Prem [[igual]]: 1.224744871, el decimal de $\\frac{\\sqrt{6}}{2}$ (apartat a). ✓ El punt $P\'$ és a la mateixa distància del pla que $P$, a l\'altra banda. El pla $\\pi_2$ és $2x-y+z=E$ amb $E=2\\cdot 2-0+4=8$: $\\pi_2: 2x-y+z=8$.'},
  ],
  relacionades: ['pau-geo-25s-q4b', 'frac-plantilla', 'pot-negativa'],
},
{
  id: 'pau-geo-26j2-q4b', bloc: 'pau-ag', titol: 'Geometria · PAU 2026: distàncies en centímetres',
  font: 'PAU juny 2026 (sèrie 5), exercici 4 B',
  enunciat: 'Un braç robòtic desplaça un sensor en línia recta des del punt $A=(1,2,3)$ fins al punt $B=(5,3,7)$, per damunt del pla $\\pi$, d\'equació general $x-y-5=0$ (l\'enunciat original dona el pla en forma paramètrica; l\'equació general l\'has obtinguda a mà; les unitats són centímetres). [a]4.1. Quina distància ha recorregut el sensor?[/a] [b]4.2. En acabar el moviment, a quina distància del pla es troba el sensor?[/b]',
  inici: calc(D),
  passos: [
    {apartat: 'a', tecles: ['arrel', 'lpar', '4', 'x2', 'mes', '1', 'x2', 'mes', '4', 'x2', 'rpar'], pantalla: calc(D, '√(4²+1²+4²)'),
      text: '4.1. El vector $\\vec{AB}=(4,1,4)$, i la distància és el seu mòdul. Escriu [[arrel]] i, entre parèntesis, $4^2+1^2+4^2$: el quadrat és [[x2]].'},
    {apartat: 'a', tecles: ['igual'], pantalla: marca(calc(D, '√(4²+1²+4²)', '5.744562647'), 'resultat'),
      text: 'Prem [[igual]]: 5.744562647, és a dir, $\\sqrt{33}\\approx 5{,}74$ cm. La fx-82MS dona directament el decimal.'},
    {apartat: 'b', tecles: ['5', 'menys', '3', 'menys', '5', 'igual'], pantalla: marca(calc(D, '5-3-5', '-3'), 'resultat'),
      text: '4.2. La distància del punt $B$ al pla. Primer, el numerador: substitueix $B$ a $x-y-5$, és a dir, $5-3-5$. Surt −3; el valor absolut el fas tu: 3.'},
    {apartat: 'b', tecles: ['3', 'entre', 'arrel', 'lpar', '1', 'x2', 'mes', 'lpar', 'neg', '1', 'rpar', 'x2', 'mes', '0', 'x2', 'rpar'],
      pantalla: calc(D, '3÷√(1²+(-1)²+0²)'),
      text: 'Ara la fracció: 3 [[entre]] l\'arrel de $1^2+(-1)^2+0^2$, tot entre parèntesis. El −1, també entre parèntesis i amb [[neg]].'},
    {apartat: 'b', tecles: ['igual'], pantalla: marca(calc(D, '3÷√(1²+(-1)²+0²)', '2.121320344'), 'resultat'),
      text: 'Prem [[igual]]: el sensor és a $\\frac{3\\sqrt{2}}{2}\\approx 2{,}12$ cm del pla.'},
  ],
  relacionades: ['pau-geo-25s-q4b'],
},

);

})(Models.obre('fx-82ms'));
