/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/eso/geometria.js — ESO · bloc «Pitàgores, àrees i volums»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Normes d'ESO: ARCHITECTURE.md, «Writing fitxes». Preguntes reals de CB 4t
   d'ESO: 2026 q7 (Pitàgores), 2022 q8 (volum d'un cilindre) i 2025 q27
   (àrea d'un cercle). Els enunciats oficials diuen π = 3,14: les fitxes
   fan servir la tecla π i diuen que, arrodonit, surt el mateix.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca} = M.guions;
const {D} = M.comu;
const FRASE_ERROR = '[mat]La calculadora ha seguit bé les instruccions. El problema és que s\'han plantejat malament els càlculs.[/mat]';

const PARET = '\\sqrt{5^{2}-4^{2}}', PARET_ERROR = '\\sqrt{5^{2}+4^{2}}';
const TORRE = '1.5\\times 12\\div 2';

const ESCALA = '\\sqrt{3^{2}+5^{2}}';
const GOT = '\\pi\\times 3^{2}\\times 15';
const PARASOL = '\\pi\\times 0.75^{2}';

M.fitxes.push(

{
  id: 'cb4-26-q7',
  inici: calc(D),
  passos: [
    {tecles: ['arrel', '3', 'x2', 'mes', '5', 'x2'], pantalla: calc(D, ESCALA),
      text: '[mat]El tram és la hipotenusa d\'un triangle rectangle amb catets de $3$ m i $5$ m.\nPel teorema de Pitàgores, el tram mesura això:\n$\\sqrt{3^2+5^2}$[/mat] [calc]Prem [[arrel]] i escriu a dins $3$ [[x2]] [[mes]] $5$ [[x2]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ESCALA, '\\sqrt{34}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $\\sqrt{34}$.\nSi surt en forma d\'arrel és perquè la calculadora està configurada per donar resultats exactes.\nSi estigués configurada per donar decimals, sortiria $5.830951895$.[/calc] [mat]$\\sqrt{34}\\simeq 5{,}83$ m[/mat]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, ESCALA, '5.830951895'), 'resultat'),
      text: '[calc]Per tenir-lo en decimal, prem [[shift]] [[exe]] (≈): obtens $5.830951895$.[/calc] [mat]R) Cada tram d\'escala mesura aproximadament $5{,}83$ m.[/mat]'},
  ],
},
{
  id: 'll4a-4-34',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• quin és el costat més llarg del triangle: l\'escala, la paret o el terra?\n• l\'escala pot arribar a més de $5$ m d\'altura?[/mat]'},
    {tecles: ['arrel', '5', 'x2', 'menys', '4', 'x2'], pantalla: calc(D, PARET),
      text: '[mat]L\'escala ($5$ m) és la hipotenusa. El terra ($4$ m) i l\'altura són els catets.\nPel teorema de Pitàgores, l\'altura és això:\n$\\sqrt{5^2-4^2}$[/mat] [calc]Prem [[arrel]] i escriu a dins $5$ [[x2]] [[menys]] $4$ [[x2]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, PARET, '3'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $3$.[/calc] [mat]R) L\'escala arriba a $3$ m d\'altura de la paret.[/mat]'},
    {error: true, tecles: ['ac', 'arrel', '5', 'x2', 'mes', '4', 'x2'], pantalla: calc(D, PARET_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi sumes els quadrats en lloc de restar-los: [[arrel]] $5$ [[x2]] [[mes]] $4$ [[x2]].[/calc]'},
    {error: true, tecles: ['shift', 'exe'], pantalla: marca(calc(D, PARET_ERROR, '6.403124237'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]] (≈): obtens $6.403124237$.[/calc] ' + FRASE_ERROR + ' [mat]No té cap sentit: una escala de $5$ m no pot arribar a $6{,}4$ m d\'altura![/mat]'},
  ],
},
{
  id: 'cb4-22-q8',
  inici: calc(D),
  passos: [
    {tecles: ['shift', '7', 'per', '3', 'x2', 'per', '1', '5'], pantalla: calc(D, GOT),
      text: '[mat]El volum del got és això:\n$\\pi\\cdot 3^2\\cdot 15$[/mat] [calc]Escriu π ([[shift]] [[7]]), [[per]] $3$ [[x2]] [[per]] $15$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, GOT, '135\\pi'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $135\\pi$.\nSi surt amb π és perquè la calculadora està configurada per donar resultats exactes.\nSi estigués configurada per donar decimals, sortiria $424.1150082$.[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, GOT, '424.1150082'), 'resultat'),
      text: '[calc]Per tenir-lo en decimal, prem [[shift]] [[exe]] (≈): obtens $424.1150082$.[/calc] [mat]Amb $\\pi=3{,}14$ surt $423{,}9$: arrodonits, tots dos donen $424$.\nR) El volum del got és aproximadament de $424$ cm³.[/mat]'},
  ],
},
{
  id: 'cb4-25-q27',
  inici: calc(D),
  passos: [
    {tecles: ['shift', '7', 'per', '0', 'punt', '7', '5', 'x2'], pantalla: calc(D, PARASOL),
      text: '[mat]L\'àrea del cercle és això:\n$\\pi\\cdot 0{,}75^2$[/mat] [calc]Escriu π ([[shift]] [[7]]), [[per]] $0.75$ [[x2]].[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, PARASOL, '1.767145868'), 'resultat'),
      text: '[calc]Prem directament [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és $1.767145868$.[/calc] [mat]Amb $\\pi=3{,}14$ surt $1{,}766$: arrodonits a les centèsimes, tots dos donen $1{,}77$.\nR) El para-sol té aproximadament $1{,}77$ m² de tela.[/mat]'},
  ],
},

{
  id: 'll4a-4-8',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• el pal és més alt o més baix que la seva ombra?\n• aleshores, el campanar farà més o menys de $12$ m?[/mat]'},
    {tecles: ['1', '2', 'entre', '1', 'punt', '5'], pantalla: calc(D, '12\\div 1.5'),
      text: '[mat]El pal i el campanar, amb les seves ombres, formen triangles semblants.\nLa raó de semblança és l\'ombra del campanar entre l\'ombra del pal:\n$12\\div 1{,}5$[/mat] [calc]Escriu $12$ [[entre]] $1.5$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '12\\div 1.5', '8'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $8$.[/calc] [mat]L\'ombra del campanar és $8$ vegades la del pal. Per tant, el campanar també és $8$ vegades més alt que el pal.[/mat]'},
    {tecles: ['per', '2'], pantalla: calc(D, '\\mathrm{Ans}\\times 2', '', {hist: true}),
      text: '[calc]Fes l\'operació [[per]] $2$.\nLa calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\mathrm{Ans}\\times 2', '16'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $16$.[/calc] [mat]R) El campanar fa $16$ m d\'altura.[/mat]'},
    {error: true, tecles: ['ac', '1', 'punt', '5', 'per', '1', '2', 'entre', '2'], pantalla: calc(D, TORRE, '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi inverteixes la raó i fas ombra entre altura: $1.5$ [[per]] $12$ [[entre]] $2$.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, TORRE, '9'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $9$.[/calc] ' + FRASE_ERROR + ' [mat]No té sentit: el campanar seria més baix que la seva ombra, i en canvi el pal és més alt que la seva![/mat]'},
  ],
},
);

})(Models.obre());
