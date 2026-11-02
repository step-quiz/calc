/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/eso/pantalla.js — ESO · bloc «Fracció o decimal. Arrodonir. Notació científica»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Normes d'ESO: ARCHITECTURE.md, «Writing fitxes». Exemples propis, sense font.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca} = M.guions;
const {D} = M.comu;

const LLUM = '3×10^8×86400';

M.fitxes.push(

{
  id: 'eso-fraccio-decimal',
  inici: calc(D),
  passos: [
    {tecles: ['7', 'entre', '4'], pantalla: calc(D, '7÷4'),
      text: '[calc]Escriu 7 [[entre]] 4.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '7÷4', '1.75'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat en decimal, que és 1.75. Amb [[entre]], la fx-82MS sempre dona decimals.[/calc]'},
    {tecles: ['shift', 'abc'], pantalla: marca(calc(D, '7÷4', '7┘4'), 'resultat'),
      text: '[calc]Prem [[shift]] i [[abc]] (a sobre hi ha d/c): el resultat passa a fracció, 7┘4, és a dir, $\\frac{7}{4}$.[/calc] [mat]La resposta correcta és $\\frac{7}{4}=1{,}75$.[/mat]'},
  ],
},
{
  id: 'eso-arrodonir',
  inici: calc(D),
  passos: [
    {tecles: ['2', 'entre', '3'], pantalla: calc(D, '2÷3'),
      text: '[calc]Escriu 2 [[entre]] 3.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '2÷3', '0.666666667'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 0.666666667. La pantalla només en mostra deu xifres i ja ha arrodonit l\'última (el 7).[/calc]'},
    {tecles: [], pantalla: marca(calc(D, '2÷3', '0.666666667'), 'resultat'),
      text: '[mat]Per arrodonir a les centèsimes, mira la tercera xifra decimal: és un 6, més gran o igual que 5, i per això la segona puja d\'un: 0,67.[/mat] [mat]La resposta correcta és $2\\div 3\\approx 0{,}67$.[/mat]'},
  ],
},
{
  id: 'eso-notacio-cientifica',
  inici: calc(D),
  passos: [
    {tecles: ['3', 'per', '1', '0', 'pot', '8'], pantalla: calc(D, '3×10^8'),
      text: '[calc]Escriu 3 [[per]] 10, prem [[pot]] i escriu l\'exponent 8.[/calc]'},
    {tecles: ['per', '8', '6', '4', '0', '0'], pantalla: calc(D, LLUM),
      text: '[mat]En un dia, la llum recorre 86 400 vegades el que recorre en un segon.[/mat] [calc]Ara fes l\'operació [[per]] 86400.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, LLUM, '2.592E13'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 2.592 i, a la dreta, un 13 petit: vol dir $2{,}592\\cdot 10^{13}$. El nombre és massa llarg i la calculadora el dona en notació científica.[/calc] [mat]La resposta correcta és $2{,}592\\cdot 10^{13}$ metres, és a dir, 25 920 000 000 000 m.[/mat]'},
  ],
},

);

})(Models.obre());
