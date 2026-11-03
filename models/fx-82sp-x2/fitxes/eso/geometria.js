/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-x2/fitxes/eso/geometria.js — ESO · bloc «Pitàgores, àrees i volums»
   ───────────────────────────────────────────────────────────────────
   Les fitxes de la fx-82SP CW (el mateix fitxer, a models/fx-82sp-cw/), amb les
   tecles de la fx-82/85SP X II (les mateixes que la fx-570/991SP X II): la tecla = (id «exe»), el signe negatiu (−)
   («neg»), SHIFT ×10ˣ = π, SHIFT (−) = log, ln, SHIFT x■ = arrel d'índex n,
   S⇔D i els menús numerats (SHIFT MENU, OPTN).
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
      text: '[mat]El tram és la hipotenusa d\'un triangle rectangle amb catets de 3 m i 5 m. Pel teorema de Pitàgores, mesura $\\sqrt{3^2+5^2}$.[/mat] [calc]Prem [[arrel]] i escriu a dins 3 [[x2]] + 5 [[x2]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ESCALA, '\\sqrt{34}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $\\sqrt{34}$. Surt exacte perquè la calculadora està configurada per donar resultats exactes; si estigués configurada per donar decimals, sortiria 5.830951895.[/calc]'},
    {tecles: ['sd'], pantalla: marca(calc(D, ESCALA, '5.830951895'), 'resultat'),
      text: '[calc]Per tenir-lo en decimal, prem [[sd]]: obtens 5.830951895.[/calc] [mat]La resposta correcta és que cada tram mesura uns 5,83 m.[/mat]'},
  ],
},
{
  id: 'll4a-4-34',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, estima: l\'escala és la hipotenusa, el costat més llarg. L\'altura ha de ser menys de 5 m.[/mat]'},
    {tecles: ['arrel', '5', 'x2', 'menys', '4', 'x2'], pantalla: calc(D, PARET),
      text: '[mat]L\'escala (5 m) és la hipotenusa; el terra (4 m) i l\'altura són els catets. Per Pitàgores, l\'altura és $\\sqrt{5^2-4^2}$.[/mat] [calc]Prem [[arrel]] i escriu a dins 5 [[x2]] − 4 [[x2]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, PARET, '3'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és 3.[/calc] [mat]La resposta correcta és que l\'escala arriba a 3 m d\'altura.[/mat]'},
    {error: true, tecles: ['ac', 'arrel', '5', 'x2', 'mes', '4', 'x2'], pantalla: calc(D, PARET_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i suma els quadrats en lloc de restar-los: [[arrel]] 5 [[x2]] + 4 [[x2]].[/calc]'},
    {error: true, tecles: ['shift', 'exe'], pantalla: marca(calc(D, PARET_ERROR, '6.403124237'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]] (≈): obtens 6.403124237.[/calc] ' + FRASE_ERROR + ' [mat]No pot ser: una escala de 5 m no pot arribar a 6,4 m d\'altura.[/mat]'},
  ],
},
{
  id: 'cb4-22-q8',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'exp', 'per', '3', 'x2', 'per', '1', '5'], pantalla: calc(D, GOT),
      text: '[mat]El volum és $\\pi\\cdot 3^2\\cdot 15$.[/mat] [calc]Escriu π ([[shift]] [[exp]]), [[per]] 3 [[x2]] [[per]] 15.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, GOT, '135\\pi'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $135\\pi$. Surt exacte perquè la calculadora està configurada per donar resultats exactes; si estigués configurada per donar decimals, sortiria 424.1150082.[/calc]'},
    {tecles: ['sd'], pantalla: marca(calc(D, GOT, '424.1150082'), 'resultat'),
      text: '[calc]Per tenir-lo en decimal, prem [[sd]]: obtens 424.1150082.[/calc] [mat]Amb $\\pi=3{,}14$ surt 423,9: arrodonits, tots dos donen 424. La resposta correcta és que el volum és d\'uns 424 cm³.[/mat]'},
  ],
},
{
  id: 'cb4-25-q27',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'exp', 'per', '0', 'punt', '7', '5', 'x2'], pantalla: calc(D, PARASOL),
      text: '[mat]L\'àrea és $\\pi\\cdot 0{,}75^2$.[/mat] [calc]Escriu π ([[shift]] [[exp]]), [[per]] 0.75 [[x2]].[/calc]'},
    {tecles: ['exe', 'sd'], pantalla: marca(calc(D, PARASOL, '1.767145868'), 'resultat'),
      parcials: {0: marca(calc(D, PARASOL, '\\frac{9}{16}\\pi'), 'resultat')},
      text: '[calc]Prem [[exe]]: obtens $\\frac{9}{16}\\pi$, amb π, en forma exacta. Amb [[sd]], el decimal: 1.767145868.[/calc] [mat]Amb $\\pi=3{,}14$ surt 1,766; arrodonits a les centèsimes, tots dos donen 1,77. La resposta correcta és que el para-sol té uns 1,77 m² de tela.[/mat]'},
  ],
},

{
  id: 'll4a-4-8',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, estima: el pal és més alt que la seva ombra, i la torre també ho ha de ser. Ha de fer més de 12 m.[/mat]'},
    {tecles: ['1', '2', 'entre', '1', 'punt', '5'], pantalla: calc(D, '12\\div 1.5'),
      text: '[mat]El pal i la torre, amb les seves ombres, formen triangles semblants. La raó de semblança és l\'ombra de la torre entre la del pal.[/mat] [calc]Escriu 12 [[entre]] 1.5.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '12\\div 1.5', '8'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens 8.[/calc] [mat]L\'ombra de la torre és 8 vegades la del pal; la torre també és 8 vegades més alta.[/mat]'},
    {tecles: ['per', '2'], pantalla: calc(D, '\\mathrm{Ans}\\times 2', '', {hist: true}),
      text: '[calc]Fes l\'operació [[per]] 2: la calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\mathrm{Ans}\\times 2', '16'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és 16.[/calc] [mat]La resposta correcta és que la torre fa 16 m: més de 12 m, com havíem estimat.[/mat]'},
    {error: true, tecles: ['ac', '1', 'punt', '5', 'per', '1', '2', 'entre', '2'], pantalla: calc(D, TORRE, '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i inverteix la raó (ombra entre altura): 1.5 [[per]] 12 [[entre]] 2.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, TORRE, '9'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens 9.[/calc] ' + FRASE_ERROR + ' [mat]No pot ser: la torre sortiria més baixa que la seva ombra, i el pal és més alt que la seva.[/mat]'},
  ],
},
);

})(Models.obre());
