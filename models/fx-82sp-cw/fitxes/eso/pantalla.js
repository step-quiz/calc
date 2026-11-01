/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/eso/pantalla.js — ESO · bloc «Fracció o decimal. Arrodonir. Notació científica»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Normes: HANDOFF-ESO.md §10. Exemples propis (David,
   1/11/2026: «poden ser tots exemples teus»), sense font.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca} = M.guions;
const {D} = M.comu;

const LLUM = '3\\times 10^{8}\\times 86400';

M.fitxes.push(

{
  id: 'eso-fraccio-decimal', bloc: 'eso-pantalla', titol: 'Em surt una fracció: vull el decimal',
  enunciat: 'Calcula $7\\div 4$ i dona el resultat en forma de fracció i en forma decimal.',
  inici: calc(D),
  passos: [
    {tecles: ['7', 'entre', '4'], pantalla: calc(D, '7\\div 4'),
      text: '[calc]Escriu 7 [[entre]] 4.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '7\\div 4', '\\frac{7}{4}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $\\frac{7}{4}$. Surt en fracció perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 1.75.[/calc] [mat]Una divisió és una fracció: $7\\div 4=\\frac{7}{4}$.[/mat]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, '7\\div 4', '1.75'), 'resultat'),
      text: '[calc]Per tenir-lo en decimal, prem [[shift]] i [[exe]] (a sobre d\'EXE hi ha ≈): obtens 1.75.[/calc] [mat]La resposta correcta és $\\frac{7}{4}=1{,}75$.[/mat]'},
  ],
},
{
  id: 'eso-arrodonir', bloc: 'eso-pantalla', titol: 'Arrodonir el que surt a la pantalla',
  enunciat: 'Calcula $2\\div 3$ i arrodoneix el resultat a les centèsimes.',
  inici: calc(D),
  passos: [
    {tecles: ['2', 'entre', '3'], pantalla: calc(D, '2\\div 3'),
      text: '[calc]Escriu 2 [[entre]] 3.[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, '2\\div 3', '0.6666666667'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és 0.6666666667. La calculadora ja ha arrodonit l\'última xifra (el 7).[/calc]'},
    {tecles: [], pantalla: marca(calc(D, '2\\div 3', '0.6666666667'), 'resultat'),
      text: '[mat]Per arrodonir a les centèsimes, mira la tercera xifra decimal: és un 6, més gran o igual que 5, i per això la segona puja d\'un: 0,67.[/mat] [mat]La resposta correcta és $2\\div 3\\approx 0{,}67$.[/mat]'},
  ],
},
{
  id: 'eso-notacio-cientifica', bloc: 'eso-pantalla', titol: 'Nombres molt grans: notació científica',
  enunciat: 'La llum recorre $3\\cdot 10^8$ metres cada segon.\n• Un dia té 86 400 segons.\nQuants metres recorre la llum en un dia?',
  inici: calc(D),
  passos: [
    {tecles: ['3', 'per', '1', '0', 'pot', '8', 'right'], pantalla: calc(D, '3\\times 10^{8}'),
      text: '[calc]Escriu 3 [[per]] 10, prem [[pot]] i escriu l\'exponent 8. Surt de l\'exponent amb [[right]].[/calc]'},
    {tecles: ['per', '8', '6', '4', '0', '0'], pantalla: calc(D, LLUM),
      text: '[mat]En un dia, la llum recorre 86 400 vegades el que recorre en un segon.[/mat] [calc]Ara fes l\'operació [[per]] 86400.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, LLUM, '2.592\\times 10^{13}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $2.592\\times 10^{13}$. El nombre és massa llarg i la calculadora el dona en notació científica.[/calc] [mat]La resposta correcta és $2{,}592\\cdot 10^{13}$ metres, és a dir, 25 920 000 000 000 m.[/mat]'},
  ],
},

);

})(Models.obre('fx-82sp-cw'));
