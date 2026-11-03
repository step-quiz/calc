/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-x2/fitxes/simbols.js — Les fitxes del bloc «Interpretem els símbols a la pantalla»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. El format d'una fitxa és a fitxes/blocs.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {ind, calc, marca} = M.guions;
const {SEN45, ARREL2_2, D, R, FIX} = M.comu;
/** Una expressió que no cap a la línia d'entrada, i una que dona un resultat en notació científica. */
const LLARG = '5\\times 22+4\\times 32+3\\times 16+2\\times 8+1\\times 2';
const LLUM = '3\\times 10^{8}\\times 86400';

M.fitxes.push(

{
  id: 'indicadors',
  inici: calc(D, SEN45, ARREL2_2),
  passos: [
    {tecles: [], pantalla: marca(calc(D, SEN45, ARREL2_2), 'mat'),
      text: '[calc]Aquesta icona vol dir que escrius en format matemàtic: les fraccions i les arrels es veuen com al llibre. La calculadora està configurada per donar resultats exactes ({{E Mat/S Mat}}): per això el resultat surt $\\frac{\\sqrt{2}}{2}$ i no 0.7071067812.[/calc]'},
    {tecles: [], pantalla: marca(calc(D, SEN45, ARREL2_2), 'ang'),
      text: '[calc]La D amb fons fosc vol dir que els angles van en graus. És la que faràs servir quasi sempre.[/calc]'},
    {tecles: [], pantalla: marca(calc(D, SEN45, ARREL2_2), 'hist'),
      text: '[calc]El triangle ▲ vol dir que hi ha càlculs anteriors: amb [[up]] els tornes a veure.[/calc]'},
    {tecles: ['shift'], pantalla: marca(calc(ind(D, {shift: true}), SEN45, ARREL2_2), 'shift'),
      text: '[calc]Prem [[shift]]: a la barra surt una S. La tecla següent farà el que hi ha escrit a sobre seu (per exemple, [[shift]] [[exp]] escriu π). La S desapareix sola.[/calc]'},
    {tecles: [], pantalla: marca(calc(R), 'ang'),
      text: '[calc]Si en lloc de la D hi ha una R, els angles van en radians. Si hi ha una G, van en graus centesimals, una unitat que no faràs servir.[/calc]'},
    {tecles: [], pantalla: marca(calc(FIX, '1\\div 6', '0.17'), 'fix'),
      text: '[calc]FIX vol dir que tots els resultats surten arrodonits a un nombre fix de decimals: aquí, a 2, i per això $1\\div 6$ surt 0.17.[/calc]'},
    {tecles: [], pantalla: marca(calc(ind(D, {sci: true}), '1\\div 6', '1.67\\times 10^{-1}'), 'sci'),
      text: '[calc]SCI vol dir que tots els resultats surten en notació científica, amb un nombre fix de xifres: aquí, 3, i per això $1\\div 6$ surt $1.67\\times 10^{-1}$.[/calc]'},
    {tecles: [], pantalla: marca(calc(ind(D, {alpha: true})), 'alpha'),
      text: '[calc]Si prems [[alpha]], surt una A: la tecla següent farà el que hi ha escrit en rosa al seu costat (per exemple, una variable: A, B…). La A també desapareix sola.[/calc]'},
    {tecles: [], pantalla: marca(calc(D, LLARG, '', {hist: true}), 'entrada'),
      text: '[calc]Els triangles ◀ i ▶ a les vores de la línia volen dir que l\'expressió no hi cap: n\'hi ha més per aquest costat. Amb [[left]] i [[right]] t\'hi mous.[/calc]'},
    {tecles: [], pantalla: marca(calc(D, LLUM, '2.592\\times 10^{13}'), 'resultat'),
      text: '[calc]Un «×10» amb un nombre petit a dalt vol dir que el resultat és en notació científica: és massa llarg per a la pantalla.[/calc] [mat]$2.592\\times 10^{13}$ és $2{,}592\\cdot 10^{13}$.[/mat]'},
  ],
},

);

})(Models.obre());
