/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/simbols.js — Les fitxes del bloc «Interpretem els símbols a la pantalla»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. El format d'una fitxa és a fitxes/blocs.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca, ind} = M.guions;
const {D, R, FIX} = M.comu;
/** Una expressió que no cap a la línia de dalt (12 caràcters), i una que dona un resultat en notació científica. */
const LLARG = '5×22+4×32+3×16+2×8+1×2';
const LLUM = '3×10^8×86400';

M.fitxes.push(

{
  id: 'indicadors',
  enunciat: 'A la pantalla, a més dels nombres, hi surten símbols: a la fila de dalt, a la línia de l\'expressió i a la del resultat. Què vol dir cada un?',
  inici: calc(D, 'sin 45', '0.707106781'),
  passos: [
    {tecles: [], pantalla: marca(calc(D, 'sin 45', '0.707106781'), 'ang'),
      text: '[calc]La D amb fons fosc vol dir que els angles van en graus. És la que faràs servir quasi sempre.[/calc]'},
    {tecles: ['ac', 'shift'], pantalla: marca(calc(ind(D, {shift: true})), 'shift'),
      text: '[calc]Esborra amb [[ac]] i prem [[shift]]: a dalt surt una S. La tecla següent farà el que hi ha escrit en groc a sobre seu (per exemple, [[shift]] [[exp]] escriu π). La S desapareix sola.[/calc]'},
    {tecles: [], pantalla: marca(calc(ind(D, {alpha: true})), 'alpha'),
      text: '[calc]Si prems [[alpha]], surt una A: la tecla següent farà el que hi ha escrit en vermell a sobre seu (per exemple, una variable: A, B…). La A també desapareix sola.[/calc]'},
    {tecles: [], pantalla: marca(calc(R), 'ang'),
      text: '[calc]Si en lloc de la D hi ha una R, els angles van en radians. Si hi ha una G, van en graus centesimals, una unitat que no faràs servir.[/calc]'},
    {tecles: [], pantalla: marca(calc(FIX, '1÷6', '0.17'), 'fix'),
      text: '[calc]FIX vol dir que tots els resultats surten arrodonits a un nombre fix de decimals: aquí, a 2, i per això $1\\div 6$ surt 0.17.[/calc]'},
    {tecles: [], pantalla: marca(calc(ind(D, {sci: 3}), '1÷6', '1.67E-01'), 'sci'),
      text: '[calc]SCI vol dir que tots els resultats surten en notació científica, amb un nombre fix de xifres: aquí, 3, i per això $1\\div 6$ surt 1.67 amb un −01 petit a la dreta, és a dir, $1{,}67\\cdot 10^{-1}$.[/calc]'},
    {tecles: [], pantalla: marca(calc(D, '1┘4+1┘2', '3┘4'), 'resultat'),
      text: '[calc]El signe ┘ separa el numerador del denominador d\'una fracció: 3┘4 és $\\frac{3}{4}$.[/calc]'},
    {tecles: [], pantalla: marca(calc(D, LLUM, '2.592E13'), 'resultat'),
      text: '[calc]Un nombre petit a la dreta del resultat vol dir que és en notació científica: és massa llarg per a la pantalla.[/calc] [mat]2.592 amb un 13 petit és $2{,}592\\cdot 10^{13}$.[/mat]'},
    {tecles: [], pantalla: marca(calc(D, LLARG), 'entrada'),
      text: '[calc]Una fletxa a la vora de la línia de dalt vol dir que l\'expressió no hi cap: n\'hi ha més per aquest costat.[/calc]'},
  ],
},

);

})(Models.obre());
