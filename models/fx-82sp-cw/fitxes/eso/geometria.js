/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/eso/geometria.js — ESO · bloc «Pitàgores, àrees i volums»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Normes: HANDOFF-ESO.md §10. Preguntes reals de CB 4t
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
  id: 'cb4-26-q7', bloc: 'eso-geometria', titol: 'El tram d\'escala: Pitàgores', font: 'CB 4ESO (2026), pregunta 7',
  enunciat: 'Una escala uneix dues plantes d\'un edifici. Cada tram d\'escala:\n• puja una altura de 3 m;\n• avança una llargada de 5 m.\nQuant mesura cada tram d\'escala?',
  inici: calc(D),
  passos: [
    {tecles: ['arrel', '3', 'x2', 'mes', '5', 'x2'], pantalla: calc(D, ESCALA),
      text: '[mat]El tram és la hipotenusa d\'un triangle rectangle amb catets de 3 m i 5 m. Pel teorema de Pitàgores, mesura $\\sqrt{3^2+5^2}$.[/mat] [calc]Prem [[arrel]] i escriu a dins 3 [[x2]] + 5 [[x2]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ESCALA, '\\sqrt{34}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $\\sqrt{34}$. Surt exacte perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 5.830951895.[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, ESCALA, '5.830951895'), 'resultat'),
      text: '[calc]Per tenir-lo en decimal, prem [[shift]] i [[exe]] (≈): obtens 5.830951895.[/calc] [mat]La resposta correcta és que cada tram mesura uns 5,83 m.[/mat]'},
  ],
},
{
  id: 'cb4-22-q8', bloc: 'eso-geometria', titol: 'El volum d\'un got cilíndric', font: 'CB 4ESO (2022), pregunta 8',
  figura: {src: 'img/eso/cb4eso2022e2.png', alt: 'Dibuix del got de vidre (radi 3 cm, alçada 15 cm) i de l\'envàs de iogurt'},
  enunciat: 'Un got de vidre té forma de cilindre:\n• radi de la base: 3 cm;\n• alçada: 15 cm.\nQuin és el volum del got, aproximadament?[nota](Volum d\'un cilindre $=\\pi\\cdot r^2\\cdot h$, amb $\\pi=3{,}14$.)[/nota]',
  inici: calc(D),
  passos: [
    {tecles: ['shift', '7', 'per', '3', 'x2', 'per', '1', '5'], pantalla: calc(D, GOT),
      text: '[mat]El volum és $\\pi\\cdot 3^2\\cdot 15$.[/mat] [calc]Escriu π ([[shift]] [[7]]), [[per]] 3 [[x2]] [[per]] 15.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, GOT, '135\\pi'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $135\\pi$. Surt exacte perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 424.1150082.[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, GOT, '424.1150082'), 'resultat'),
      text: '[calc]Per tenir-lo en decimal, prem [[shift]] i [[exe]] (≈): obtens 424.1150082.[/calc] [mat]Amb $\\pi=3{,}14$ surt 423,9: arrodonits, tots dos donen 424. La resposta correcta és que el volum és d\'uns 424 cm³.[/mat]'},
  ],
},
{
  id: 'cb4-25-q27', bloc: 'eso-geometria', titol: 'La tela d\'un para-sol: l\'àrea d\'un cercle', font: 'CB 4ESO (2025), pregunta 27',
  enunciat: 'Per saber quanta tela té un para-sol, se n\'aproxima la superfície per la d\'un cercle:\n• radi del cercle: 0,75 m.\nQuina superfície de tela té el para-sol?[nota](Àrea del cercle $=\\pi\\cdot r^2$, amb $\\pi=3{,}14$.)[/nota]',
  inici: calc(D),
  passos: [
    {tecles: ['shift', '7', 'per', '0', 'punt', '7', '5', 'x2'], pantalla: calc(D, PARASOL),
      text: '[mat]L\'àrea és $\\pi\\cdot 0{,}75^2$.[/mat] [calc]Escriu π ([[shift]] [[7]]), [[per]] 0.75 [[x2]].[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, PARASOL, '1.767145868'), 'resultat'),
      text: '[calc]Prem directament [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és 1.767145868. Amb [[exe]] l\'obtindries amb π, en forma exacta.[/calc] [mat]Amb $\\pi=3{,}14$ surt 1,766; arrodonits a les centèsimes, tots dos donen 1,77. La resposta correcta és que el para-sol té uns 1,77 m² de tela.[/mat]'},
  ],
},

);

})(Models.obre('fx-82sp-cw'));
