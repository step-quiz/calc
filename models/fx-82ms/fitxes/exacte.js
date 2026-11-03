/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/exacte.js — «Llegir la pantalla i arrodonir» (fx-82MS)
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Els mateixos temes i ids que el bloc «exacte» de la CW.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

const {calc, marca, mode, pregunta, ind} = M.guions;
const {D, FIX} = M.comu;

M.fitxes.push(

{
  id: 'exacte-decimal',
  enunciat: 'Calcula $\\sin 45^\\circ$. La fx-82MS sempre dona el valor decimal: el valor exacte, $\\frac{\\sqrt{2}}{2}$, l\'has de conèixer tu.',
  inici: calc(D),
  passos: [
    {tecles: ['sin', '4', '5'], pantalla: calc(D, 'sin 45'),
      text: '[calc]Escriu $\\sin 45$: [[sin]], el 4 i el 5. No cal parèntesi: la calculadora fa el sinus del nombre que ve darrere. La calculadora és en graus (D).[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, 'sin 45', '0.707106781'), 'resultat'),
      text: '[calc]Prem [[igual]]: 0.707106781. La fx-82MS no dona arrels ni π en forma exacta: sempre en decimal.[/calc]'},
    {tecles: ['arrel', '2', 'entre', '2', 'igual'], pantalla: marca(calc(D, '√2÷2', '0.707106781'), 'resultat'),
      text: '[calc]Comprova que és $\\frac{\\sqrt{2}}{2}$: [[arrel]], el 2, [[entre]], el 2 i [[igual]]. Surt el mateix nombre. La [[arrel]] només afecta el nombre que té darrere: $\\sqrt{2}\\div 2$.[/calc]'},
    {tecles: ['1', 'abc', '4', 'mes', '1', 'abc', '2', 'igual'], pantalla: marca(calc(D, '1┘4+1┘2', '3┘4'), 'resultat'),
      text: '[calc]Amb fraccions sí que hi ha valor exacte. $\\frac{1}{4}+\\frac{1}{2}$, amb la tecla [[abc]], dona 3┘4, és a dir, $\\frac{3}{4}$.[/calc]'},
    {tecles: ['abc'], pantalla: marca(calc(D, '1┘4+1┘2', '0.75'), 'resultat'),
      text: '[calc]La tecla [[abc]] canvia entre fracció i decimal: 0.75.[/calc]'},
    {tecles: ['abc'], pantalla: marca(calc(D, '1┘4+1┘2', '3┘4'), 'resultat'),
      text: '[calc]Un altre cop [[abc]], i torna la fracció.[/calc]'},
  ],
  relacionades: ['mode-decimal', 'indicadors', 'frac-plantilla'],
},
{
  id: 'mode-decimal',
  enunciat: 'Calcules $1\\div 2$ i la calculadora dona 0.5. A la fx-82MS, si vols veure-ho en forma de fracció, fes servir la tecla [[abc]].',
  inici: calc(D),
  passos: [
    {tecles: ['1', 'entre', '2', 'igual'], pantalla: marca(calc(D, '1÷2', '0.5'), 'resultat'),
      text: '[calc]Calcules $1\\div 2$ i surt 0.5: amb [[entre]], el resultat surt en decimal.[/calc]'},
    {tecles: ['abc'], pantalla: marca(calc(D, '1÷2', '1┘2'), 'resultat'),
      text: '[calc]Prem [[abc]]: la calculadora passa el resultat a fracció, 1┘2.[/calc]'},
    {tecles: ['1', 'abc', '2', 'igual'], pantalla: marca(calc(D, '1┘2', '1┘2'), 'resultat'),
      text: '[calc]Si escrius la fracció amb [[abc]] des del principi, el resultat ja surt en fracció: l\'1, [[abc]], el 2 i [[igual]].[/calc]'},
    {tecles: ['mes', '0', 'punt', '2', '5', 'igual'], pantalla: marca(calc(D, 'Ans+0.25', '0.75'), 'resultat'),
      text: '[calc]Compte: si hi barreges un decimal, el resultat surt en decimal. Prem [[mes]] (continua amb Ans) i 0.25: surt 0.75. Si el vols en fracció, [[abc]].[/calc]'},
  ],
  relacionades: ['exacte-decimal', 'frac-plantilla'],
},
{
  id: 'fix',
  enunciat: 'Tens la fracció d\'$\\frac{1}{6}$ i, quan la passes a decimal, et surt 0.17.\nEl motiu és que tens activat el "FIX" a la barra de dalt, i algú va fixar 2 decimals.',
  inici: calc(FIX),
  passos: [
    {tecles: ['1', 'entre', '6', 'igual'], pantalla: marca(calc(FIX, '1÷6', '0.17'), 'fix'),
      text: '[calc]Calcules $1\\div 6$ i surt 0.17: és arrodonit a 2 decimals per culpa de FIX.[/calc] [mat]Si calcules amb arrodoniments, s\'acumulen errors.[/mat]'},
    {tecles: ['mode', 'mode', 'mode'], pantalla: mode(3, FIX),
      text: '[calc]Prem [[mode]] tres vegades: surt el format dels números, {{Fix}} (decimals fixos), {{Sci}} (xifres significatives) i {{Norm}} (normal).[/calc]'},
    {tecles: ['3'], pantalla: pregunta('Norm 1~2?', FIX),
      text: '[calc]Prem el [[3]], {{Norm}}. La calculadora pregunta quin dels dos normals vols: {{Norm 1~2?}}[/calc]'},
    {tecles: ['1'], pantalla: calc(D),
      text: '[calc]Prem l\'[[1]]: Norm 1, el de fàbrica. Tornes a la pantalla de càlcul, i FIX ja no hi és.[/calc]'},
    {tecles: ['1', 'entre', '6', 'igual'], pantalla: marca(calc(D, '1÷6', '0.166666667'), 'resultat'),
      text: '[calc]Torna-ho a calcular: 0.166666667.[/calc] [mat]Arrodoneix tu al final, només quan escriguis la resposta.[/mat]'},
    {tecles: ['1', 'entre', '2', '0', '0', 'igual'], pantalla: marca(calc(D, '1÷200', '5E-03'), 'resultat'),
      text: '[calc]Amb Norm 1, els resultats més petits que 0,01 surten amb una potència de 10: $1\\div 200$ surt 5 i, a la dreta, −03, és a dir, $5\\cdot 10^{-3}=0{,}005$. Si els vols en decimal, tria Norm 2: [[mode]] tres vegades, el [[3]] i el [[2]].[/calc]'},
  ],
  relacionades: ['indicadors'],
},

);

})(Models.obre());
