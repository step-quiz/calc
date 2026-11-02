/* ═══════════════════════════════════════════════════════════════════
   models/fx-570sp-x2/fitxes/eso/geometria.js — ESO · bloc «Pitàgores, àrees i volums»
   ───────────────────────────────────────────────────────────────────
   Les fitxes de la fx-82SP CW (el mateix fitxer, a models/fx-82sp-cw/), amb les
   tecles de la fx-570/991SP X II: la tecla = (id «exe»), el signe negatiu (−)
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

);

})(Models.obre());
