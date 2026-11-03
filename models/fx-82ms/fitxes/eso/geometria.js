/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/eso/geometria.js — ESO · bloc «Pitàgores, àrees i volums»
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

const ESCALA = '√(3²+5²)', ESCALA_ERROR = '√3²+5²';
const GOT = 'π×3²×15';
const PARASOL = 'π×0.75²';

M.fitxes.push(

{
  id: 'cb4-26-q7',
  tancament: '[calc]Recorda: a la fx-82MS, el que va dins de l\'arrel cal escriure-ho entre parèntesis.[/calc] [mat]$\\sqrt{3^2+5^2}\\approx 5{,}83$ m.[/mat]',
  inici: calc(D),
  passos: [
    {tecles: ['arrel', 'lpar', '3', 'x2', 'mes', '5', 'x2', 'rpar'], pantalla: calc(D, ESCALA),
      text: '[mat]El tram és la hipotenusa d\'un triangle rectangle amb catets de 3 m i 5 m. Pel teorema de Pitàgores, mesura $\\sqrt{3^2+5^2}$.[/mat] [calc]Prem [[arrel]] i escriu, entre parèntesis, 3 [[x2]] + 5 [[x2]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ESCALA, '5.830951895'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 5.830951895.[/calc] [mat]La resposta correcta és que cada tram mesura uns 5,83 m.[/mat]'},
    {error: true, tecles: ['ac', 'arrel', '3', 'x2', 'mes', '5', 'x2'], pantalla: calc(D, ESCALA_ERROR),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu l\'arrel sense parèntesis.[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, ESCALA_ERROR, '28'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 28.[/calc] [mat]No pot ser: el tram no pot ser més llarg que 3 + 5 = 8 m. Sense parèntesis, l\'arrel només afecta el $3^2$: s\'ha calculat $3+25$.[/mat]'},
  ],
},
{
  id: 'cb4-22-q8',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'exp', 'per', '3', 'x2', 'per', '1', '5'], pantalla: calc(D, GOT),
      text: '[mat]El volum és $\\pi\\cdot 3^2\\cdot 15$.[/mat] [calc]Escriu π ([[shift]] [[exp]]), [[per]] 3 [[x2]] [[per]] 15.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, GOT, '424.1150082'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 424.1150082.[/calc] [mat]Amb $\\pi=3{,}14$ surt 423,9: arrodonits, tots dos donen 424. La resposta correcta és que el volum és d\'uns 424 cm³.[/mat]'},
  ],
},
{
  id: 'cb4-25-q27',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'exp', 'per', '0', 'punt', '7', '5', 'x2'], pantalla: calc(D, PARASOL),
      text: '[mat]L\'àrea és $\\pi\\cdot 0{,}75^2$.[/mat] [calc]Escriu π ([[shift]] [[exp]]), [[per]] 0.75 [[x2]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, PARASOL, '1.767145868'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 1.767145868.[/calc] [mat]Amb $\\pi=3{,}14$ surt 1,766; arrodonits a les centèsimes, tots dos donen 1,77. La resposta correcta és que el para-sol té uns 1,77 m² de tela.[/mat]'},
  ],
},

);

})(Models.obre());
