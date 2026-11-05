/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-x2/fitxes/eso/pantalla.js — ESO · bloc «Fracció o decimal. Arrodonir. Notació científica»
   ───────────────────────────────────────────────────────────────────
   Les fitxes de la fx-82SP CW (el mateix fitxer, a models/fx-82sp-cw/), amb les
   tecles de la fx-82/85SP X II (les mateixes que la fx-570/991SP X II): la tecla = (id «exe»), el signe negatiu (−)
   («neg»), SHIFT ×10ˣ = π, SHIFT (−) = log, ln, SHIFT x■ = arrel d'índex n,
   S⇔D i els menús numerats (SHIFT MENU, OPTN).
   NOMÉS DADES. Normes d'ESO: ARCHITECTURE.md, «Writing fitxes». Exemples propis, sense font.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca} = M.guions;
const {D} = M.comu;

const LLUM = '3\\times 10^{8}\\times 86400', LLUM_ERROR = '3^{8}\\times 86400';

M.fitxes.push(

{
  id: 'eso-fraccio-decimal',
  inici: calc(D),
  passos: [
    {tecles: ['7', 'entre', '4'], pantalla: calc(D, '7\\div 4'),
      text: '[calc]Escriu 7 [[entre]] 4.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '7\\div 4', '\\frac{7}{4}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $\\frac{7}{4}$. Surt en fracció perquè la calculadora està configurada per donar resultats exactes; si estigués configurada per donar decimals, sortiria 1.75.[/calc] [mat]Una divisió és una fracció: $7\\div 4=\\frac{7}{4}$.[/mat]'},
    {tecles: ['sd'], pantalla: marca(calc(D, '7\\div 4', '1.75'), 'resultat'),
      text: '[calc]Per tenir-lo en decimal, prem [[sd]]: obtens 1.75.[/calc] [mat]La resposta correcta és $\\frac{7}{4}=1{,}75$.[/mat]'},
  ],
},
{
  id: 'eso-arrodonir',
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
  id: 'll4-1-exemple2',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, estima: $7^2=49$ i $8^2=64$. Com que 50 és una mica més que 49, $\\sqrt{50}$ és entre 7 i 8, una mica més que 7.[/mat]'},
    {tecles: ['arrel', '5', '0'], pantalla: calc(D, '\\sqrt{50}'),
      text: '[calc]Prem [[arrel]] i escriu a dins 50.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\sqrt{50}', '5\\sqrt{2}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $5\\sqrt{2}$. Surt així perquè la calculadora està configurada per donar resultats exactes; si estigués configurada per donar decimals, sortiria 7.071067812.[/calc] [mat]És el mateix nombre: $\\sqrt{50}=\\sqrt{25\\cdot 2}=5\\sqrt{2}$.[/mat]'},
    {tecles: ['sd'], pantalla: marca(calc(D, '\\sqrt{50}', '7.071067812'), 'resultat'),
      text: '[calc]Per tenir-lo en decimal, prem [[sd]]: obtens 7.071067812.[/calc] [mat]La resposta correcta és que $\\sqrt{50}$ és entre 7 i 8: val 7,07 aproximadament, com havíem estimat.[/mat]'},
  ],
},
{
  id: 'eso-notacio-cientifica',
  inici: calc(D),
  passos: [
    {tecles: ['3', 'exp', '8', 'right'], pantalla: calc(D, '3\\times 10^{8}'),
      text: '[mat]$3\\cdot 10^8$ és un nombre en notació científica.[/mat] [calc]Escriu 3 i prem [[exp]]: surt «×10» amb el lloc de l\'exponent. Escriu el 8 i surt de l\'exponent amb [[right]].[/calc]'},
    {tecles: ['per', '8', '6', '4', '0', '0'], pantalla: calc(D, LLUM),
      text: '[mat]En un dia, la llum recorre 86 400 vegades el que recorre en un segon.[/mat] [calc]Ara fes l\'operació [[per]] 86400.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, LLUM, '2.592\\times 10^{13}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $2.592\\times 10^{13}$. El nombre és massa llarg i la calculadora el dona en notació científica.[/calc] [mat]La resposta correcta és $2{,}592\\cdot 10^{13}$ metres, és a dir, 25 920 000 000 000 m.[/mat]'},
    {error: true, tecles: ['ac', '3', 'pot', '8', 'right', 'per', '8', '6', '4', '0', '0'], pantalla: calc(D, LLUM_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i, en lloc de [[exp]], fes servir la tecla de potència: 3 [[pot]] 8, [[right]] i [[per]] 86400.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, LLUM_ERROR, '566870400'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens 566870400.[/calc] [mat]No pot ser: la llum fa 300 milions de metres cada segon, i en un dia en faria només 567 milions. Has calculat $3^8=6.561$, no $3\\cdot 10^8$.[/mat]'},
  ],
},

);

})(Models.obre());
