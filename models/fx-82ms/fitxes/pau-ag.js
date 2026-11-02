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
  id: 'pau-alg-24j-q2',
  inici: calc(D),
  passos: [
    {tecles: ['4', 'per', '5', 'abc', '3', 'mes', '2', 'per', 'lpar', 'neg', '4', 'abc', '3', 'rpar', 'menys', '0'], pantalla: calc(D, '4×5┘3+2×(-4┘3)-0'),
      text: '[calc]Primera equació, $4x+2y-z$: escriu $4\\times\\frac{5}{3}+2\\times\\left(-\\frac{4}{3}\\right)-0$. Les fraccions, amb [[abc]]; $y$, entre parèntesis i amb el signe negatiu [[neg]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '4×5┘3+2×(-4┘3)-0', '4'), 'resultat'),
      text: '[calc]Prem [[igual]]: surt 4, que és el membre de la dreta. ✓[/calc]'},
    {tecles: ['5', 'abc', '3', 'menys', 'lpar', 'neg', '4', 'abc', '3', 'rpar'], pantalla: calc(D, '5┘3-(-4┘3)'),
      text: '[calc]Segona equació, $x-y$ (amb $k=0$, el terme $kz$ no hi és): escriu $\\frac{5}{3}-\\left(-\\frac{4}{3}\\right)$. En començar a escriure, el càlcul anterior desapareix.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '5┘3-(-4┘3)', '3'), 'resultat'),
      text: '[calc]Prem [[igual]]: surt 3, el membre de la dreta. ✓[/calc]'},
    {tecles: ['3', 'per', '5', 'abc', '3', 'mes', '3', 'per', 'lpar', 'neg', '4', 'abc', '3', 'rpar'], pantalla: calc(D, '3×5┘3+3×(-4┘3)'),
      text: '[calc]Tercera equació, $3x+3y$: escriu $3\\times\\frac{5}{3}+3\\times\\left(-\\frac{4}{3}\\right)$.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '3×5┘3+3×(-4┘3)', '1'), 'resultat'),
      text: '[calc]Prem [[igual]]: surt 1, el membre de la dreta. ✓ Es compleixen les tres equacions: la solució és correcta.[/calc]'},
  ],
  relacionades: ['pau-alg-24s-q2', 'frac-plantilla'],
},
{
  id: 'pau-alg-24s-q2',
  inici: calc(D),
  passos: [
    {tecles: ['1', 'per', '1', 'per', '1', 'mes', 'lpar', 'neg', '3', 'rpar', 'per', '3', 'per', '1', 'mes', 'lpar', 'neg', '2', 'rpar', 'per', '1', 'per', '1'],
      pantalla: calc(D, '1×1×1+(-3)×3×1+(-2)×1×1'),
      text: '[mat]El primer claudàtor de Sarrus són els tres productes amb signe +.[/mat] [calc]Escriu $1\\times 1\\times 1+(-3)\\times 3\\times 1+(-2)\\times 1\\times 1$, cada factor tal com és a la matriu. Els negatius, entre parèntesis i amb la tecla [[neg]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '1×1×1+(-3)×3×1+(-2)×1×1', '-10'), 'resultat'),
      text: '[calc]Prem [[igual]]: el primer claudàtor val −10.[/calc]'},
    {tecles: ['ans', 'menys', 'lpar', 'lpar', 'neg', '2', 'rpar', 'per', '1', 'per', '1', 'mes', '1', 'per', '3', 'per', '1', 'mes', 'lpar', 'neg', '3', 'rpar', 'per', '1', 'per', '1', 'rpar'],
      pantalla: calc(D, 'Ans-((-2)×1×1+1×3×1+(-3)×1×1)'),
      text: '[calc]Ara resta-hi el segon claudàtor, el dels tres productes amb signe −: [[ans]] (el −10), [[menys]] i els tres productes entre parèntesis.[/calc] [mat]Sense aquest parèntesi, el − només afectaria el primer producte.[/mat]'},
    {tecles: ['igual'], pantalla: marca(calc(D, 'Ans-((-2)×1×1+1×3×1+(-3)×1×1)', '-8'), 'resultat'),
      text: '[calc]Prem [[igual]]: el menor val $-8\\neq 0$.[/calc] [mat]Per tant, el rang de la matriu $A\'$ és 3 i, com que el de la matriu $A$ és 2, per a $m=1$ el sistema és incompatible.[/mat]'},
  ],
  relacionades: ['ans', 'pau-alg-24j-q2', 'pot-negativa'],
},
{
  id: 'pau-geo-25s-q4b',
  inici: calc(D),
  passos: [
    {tecles: ['2', 'per', '0', 'menys', '1', 'mes', '3', 'menys', '5'], pantalla: calc(D, '2×0-1+3-5'),
      text: '[mat]Primer, el numerador: substitueix $P$ a $2x-y+z-5$.[/mat] [calc]Escriu $2\\times 0-1+3-5$.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '2×0-1+3-5', '-3'), 'resultat'),
      text: '[calc]Prem [[igual]]: surt −3.[/calc] [mat]El valor absolut el fas tu: $|-3|=3$.[/mat]'},
    {tecles: ['3', 'entre', 'arrel', 'lpar', '2', 'x2', 'mes', 'lpar', 'neg', '1', 'rpar', 'x2', 'mes', '1', 'x2', 'rpar'],
      pantalla: calc(D, '3÷√(2²+(-1)²+1²)'),
      text: '[calc]Ara la distància: 3, [[entre]] i l\'arrel [[arrel]] de $2^2+(-1)^2+1^2$, tot entre parèntesis (l\'arrel només afecta el que té just darrere). El quadrat és [[x2]]; el −1, entre parèntesis i amb [[neg]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '3÷√(2²+(-1)²+1²)', '1.224744871'), 'resultat'),
      text: '[calc]Prem [[igual]]: 1.224744871. La fx-82MS no dona l\'arrel exacta: el valor de l\'enunciat, $\\frac{\\sqrt{6}}{2}$, s\'ha de comprovar.[/calc]'},
    {tecles: ['arrel', '6', 'entre', '2', 'igual'], pantalla: marca(calc(D, '√6÷2', '1.224744871'), 'resultat'),
      text: '[calc]Calcula $\\sqrt{6}\\div 2$: [[arrel]], el 6, [[entre]], el 2 i [[igual]]. Surt el mateix nombre, 1.224744871: la distància és $\\frac{\\sqrt{6}}{2}$. ✓[/calc]'},
  ],
  relacionades: ['pot-negativa', 'pau-geo-25s-q4b-c'],
},
{
  id: 'pau-geo-25s-q4b-c',
  inici: calc(D),
  passos: [
    {tecles: ['2', 'per', '1', 'menys', '1', 'abc', '2', 'mes', '7', 'abc', '2'], pantalla: calc(D, '2×1-1┘2+7┘2'),
      text: '[mat]Primer, comprova que el punt $M$ és al pla: substitueix-lo a $2x-y+z$.[/mat] [calc]Escriu $2\\times 1-\\frac{1}{2}+\\frac{7}{2}$, amb [[abc]] per a les fraccions.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '2×1-1┘2+7┘2', '5'), 'resultat'),
      text: '[calc]Prem [[igual]]: surt 5, el terme independent del pla. ✓ El punt $M$ és el punt del pla $\\pi$ més proper a $P$.[/calc]'},
    {tecles: ['2', 'per', '7', 'abc', '2', 'menys', '3', 'igual'], pantalla: marca(calc(D, '2×7┘2-3', '4'), 'resultat'),
      text: '[mat]El punt $M$ és el punt mitjà de $P$ i $P\'$, així que $P\'=2M-P$.[/mat] [calc]Les dues primeres coordenades són $2\\cdot 1-0=2$ i $2\\cdot\\frac{1}{2}-1=0$; la tercera, amb la calculadora: $2\\times\\frac{7}{2}-3=4$.[/calc] [mat]Per tant, $P\'=(2,\\,0,\\,4)$.[/mat]'},
    {tecles: ['2', 'per', '2', 'menys', '0', 'mes', '4', 'menys', '5', 'igual'], pantalla: marca(calc(D, '2×2-0+4-5', '3'), 'resultat'),
      text: '[mat]Comprova que el punt $P\'$ és a una distància $\\frac{\\sqrt{6}}{2}$ del pla $\\pi$. El numerador de la fórmula: substitueix $P\'$ a $2x-y+z-5$.[/mat] [calc]Surt 3.[/calc]'},
    {tecles: ['3', 'entre', 'arrel', 'lpar', '2', 'x2', 'mes', 'lpar', 'neg', '1', 'rpar', 'x2', 'mes', '1', 'x2', 'rpar'],
      pantalla: calc(D, '3÷√(2²+(-1)²+1²)'),
      text: '[calc]Ara la distància: 3 [[entre]] l\'arrel de $2^2+(-1)^2+1^2$, entre parèntesis, com a l\'apartat a).[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '3÷√(2²+(-1)²+1²)', '1.224744871'), 'resultat'),
      text: '[calc]Prem [[igual]]: 1.224744871, el decimal de $\\frac{\\sqrt{6}}{2}$ (apartat a). ✓ El punt $P\'$ és a la mateixa distància del pla que $P$, a l\'altra banda.[/calc] [mat]El pla $\\pi_2$ és $2x-y+z=E$ amb $E=2\\cdot 2-0+4=8$: $\\pi_2: 2x-y+z=8$.[/mat]'},
  ],
  relacionades: ['pau-geo-25s-q4b', 'frac-plantilla', 'pot-negativa'],
},
{
  id: 'pau-geo-26j2-q4b',
  inici: calc(D),
  passos: [
    {apartat: 'a', tecles: ['arrel', 'lpar', '4', 'x2', 'mes', '1', 'x2', 'mes', '4', 'x2', 'rpar'], pantalla: calc(D, '√(4²+1²+4²)'),
      text: '[mat]4.1. El vector $\\vec{AB}=(4,1,4)$, i la distància és el seu mòdul.[/mat] [calc]Escriu [[arrel]] i, entre parèntesis, $4^2+1^2+4^2$: el quadrat és [[x2]].[/calc]'},
    {apartat: 'a', tecles: ['igual'], pantalla: marca(calc(D, '√(4²+1²+4²)', '5.744562647'), 'resultat'),
      text: '[calc]Prem [[igual]]: 5.744562647, és a dir, $\\sqrt{33}\\approx 5{,}74$ cm. La fx-82MS dona directament el decimal.[/calc]'},
    {apartat: 'b', tecles: ['5', 'menys', '3', 'menys', '5', 'igual'], pantalla: marca(calc(D, '5-3-5', '-3'), 'resultat'),
      text: '[mat]4.2. La distància del punt $B$ al pla. Primer, el numerador: substitueix $B$ a $x-y-5$, és a dir, $5-3-5$.[/mat] [calc]Surt −3; el valor absolut el fas tu: 3.[/calc]'},
    {apartat: 'b', tecles: ['3', 'entre', 'arrel', 'lpar', '1', 'x2', 'mes', 'lpar', 'neg', '1', 'rpar', 'x2', 'mes', '0', 'x2', 'rpar'],
      pantalla: calc(D, '3÷√(1²+(-1)²+0²)'),
      text: '[calc]Ara la fracció: 3 [[entre]] l\'arrel de $1^2+(-1)^2+0^2$, tot entre parèntesis. El −1, també entre parèntesis i amb [[neg]].[/calc]'},
    {apartat: 'b', tecles: ['igual'], pantalla: marca(calc(D, '3÷√(1²+(-1)²+0²)', '2.121320344'), 'resultat'),
      text: '[calc]Prem [[igual]]: el sensor és a $\\frac{3\\sqrt{2}}{2}\\approx 2{,}12$ cm del pla.[/calc]'},
  ],
  relacionades: ['pau-geo-25s-q4b'],
},

);

})(Models.obre('fx-82ms'));
