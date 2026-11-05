/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/eso/percentatges.js — ESO · bloc «Percentatges»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Normes d'ESO: ARCHITECTURE.md, «Writing fitxes».
   Activitat «Impressió de fotografies» de CB 4t d'ESO 2023 (preguntes
   23 i 24; la 26 és al bloc «Proporcionalitat»). Zona d'error només on
   és pedagògicament rellevant: a la 23 (calcular el que s'estalvia en
   lloc del que es paga) i a la 24 (desfer un descompte multiplicant per
   1,25). Del llibre: treure l'IVA (4t ESO, u. 2, ex. 25), descomptes
   encadenats (4t ESO A, u. 2, ex. 17) i +50 % −50 % (4t ESO, u. 2,
   ex. 16, sense zona d'error). Les noves comencen amb un pas sense
   tecles per estimar (David).
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca} = M.guions;
const {D} = M.comu;
const ANS = '\\mathrm{Ans}';

const FRASE_ERROR = '[mat]La calculadora ha seguit bé les instruccions. El problema és que s\'han plantejat malament els càlculs.[/mat]';

const Q23 = '40\\times 0.3\\times 0.75', Q23_ERROR = '40\\times 0.3\\times 0.25';
const Q24_ERROR = '4.5\\times 1.25\\div 0.3';

M.fitxes.push(

{
  id: 'cb4-23-q23',
  inici: calc(D),
  passos: [
    {tecles: ['4', '0', 'per', '0', 'punt', '3'], pantalla: calc(D, '40\\times 0.3'),
      text: '[mat]Sense descompte, $40$ fotografies costen això:\n$40\\cdot 0{,}30$ €.[/mat] [calc]Escriu $40$ [[per]] $0.3$.[/calc]'},
    {tecles: ['per', '0', 'punt', '7', '5'], pantalla: calc(D, Q23),
      text: '[mat]Amb un descompte del $25$ %, es paga el $75$ % del preu.\nPagar el $75$ % és multiplicar per $0{,}75$.[/mat] [calc]Ara fes l\'operació [[per]] $0.75$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, Q23, '9'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $9$.[/calc] [mat]R) A l\'Anna li costarà $9$ € imprimir les $40$ fotografies.[/mat]'},
    {error: true, tecles: ['ac', '4', '0', 'per', '0', 'punt', '3', 'per', '0', 'punt', '2', '5'], pantalla: calc(D, Q23_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi multipliques pel descompte en lloc de pel que es paga: $40$ [[per]] $0.3$ [[per]] $0.25$.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, Q23_ERROR, '3'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $3$.[/calc] ' + FRASE_ERROR + ' [mat]No té sentit: $3$ € és el que s\'estalvia l\'Anna, i no és el preu final que cal pagar.[/mat]'},
  ],
},
{
  id: 'cb4-23-q24',
  inici: calc(D),
  passos: [
    {tecles: ['4', 'punt', '5', 'entre', '0', 'punt', '7', '5'], pantalla: calc(D, '4.5\\div 0.75'),
      text: '[mat]Amb el descompte, l\'Anna paga el $75$ % del preu: $4{,}50$ € és el $75$ % del preu sense descompte.\nPer trobar el preu sense descompte, es divideix entre $0{,}75$.[/mat] [calc]Escriu $4.5$ [[entre]] $0.75$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '4.5\\div 0.75', '6'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $6$.[/calc] [mat]Sense descompte, les fotografies costarien $6$ €.[/mat]'},
    {tecles: ['entre', '0', 'punt', '3'], pantalla: calc(D, '\\mathrm{Ans}\\div 0.3', '', {hist: true}),
      text: '[mat]Cada fotografia costa $0{,}30$ €: hi ha tantes fotografies com vegades hi cap $0{,}30$ € en $6$ €.[/mat] [calc]Fes l\'operació [[entre]] $0.3$.\nLa calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\mathrm{Ans}\\div 0.3', '20'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $20$.[/calc] [mat]R) L\'Anna ha imprès $20$ fotografies.[/mat]'},
    {error: true, tecles: ['ac', '4', 'punt', '5', 'per', '1', 'punt', '2', '5', 'entre', '0', 'punt', '3'], pantalla: calc(D, Q24_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi desfàs el descompte afegint un $25$ %, és a dir, multiplicant per $1.25$: $4.5$ [[per]] $1.25$ [[entre]] $0.3$.[/calc]'},
    {error: true, tecles: ['shift', 'exe'], pantalla: marca(calc(D, Q24_ERROR, '18.75'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]] (≈): obtens $18.75$.[/calc] ' + FRASE_ERROR + ' [mat]No té cap sentit imprimir $18{,}75$ fotografies, i això ens fa sospitar que no hem plantejat bé les operacions.[/mat]'},
  ],
},

{
  id: 'll4-2-25',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• el $21$ % d\'IVA es calcula sobre el preu amb IVA o sobre el preu sense IVA?\n• creus que l\'IVA que ha cobrat és el $21$ % de $18.150$ €?[/mat]'},
    {tecles: ['1', '8', '1', '5', '0', 'entre', '1', 'punt', '2', '1'], pantalla: calc(D, '18150\\div 1.21'),
      text: '[mat]Afegir l\'IVA del $21$ % és multiplicar per $1{,}21$.\nPer treure\'l, es fa l\'operació contrària:\n$18.150\\div 1{,}21$[/mat] [calc]Escriu $18150$ [[entre]] $1.21$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '18150\\div 1.21', '15000'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $15000$.[/calc] [mat]Sense IVA, en Jordi ha facturat $15.000$ €.[/mat]'},
    {tecles: ['1', '8', '1', '5', '0', 'menys', 'ans'], pantalla: calc(D, '18150-' + ANS, '', {hist: true}),
      text: '[mat]L\'IVA és la diferència entre el que ha cobrat i el que ha facturat:\n$18.150-15.000$ €[/mat] [calc]Escriu $18150$ [[menys]] [[ans]].\n[[ans]] és el resultat d\'abans.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '18150-' + ANS, '3150'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $3150$.[/calc] [mat]R) En Jordi ha facturat $15.000$ € i haurà de pagar $3.150$ € d\'IVA a Hisenda.[/mat]'},
    {error: true, tecles: ['ac', '1', '8', '1', '5', '0', 'per', '0', 'punt', '2', '1'], pantalla: calc(D, '18150\\times 0.21', '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi calcules el $21$ % dels $18.150$ € cobrats: $18150$ [[per]] $0.21$.[/calc]'},
    {error: true, tecles: ['shift', 'exe'], pantalla: marca(calc(D, '18150\\times 0.21', '3811.5'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]] (≈): obtens $3811.5$.[/calc] ' + FRASE_ERROR + ' [mat]No encaixa: el $21$ % es calcula sobre el preu sense IVA, i no sobre els $18.150$ € que ja porten l\'IVA inclòs![/mat]'},
  ],
},
{
  id: 'll4a-2-17',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• el $10$ % extra es calcula sobre $200$ € o sobre un preu més petit?[/mat]'},
    {tecles: ['2', '0', '0', 'per', '0', 'punt', '6', 'per', '0', 'punt', '9'], pantalla: calc(D, '200\\times 0.6\\times 0.9'),
      text: '[mat]Amb un $40$ % de descompte es paga el $60$ %: es multiplica per $0{,}6$.\nAmb el $10$ % extra es paga el $90$ % del que queda: es multiplica per $0{,}9$.[/mat] [calc]Escriu $200$ [[per]] $0.6$ [[per]] $0.9$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '200\\times 0.6\\times 0.9', '108'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $108$.[/calc] [mat]R) L\'abric costa $108$ €.\nEl descompte que li han fet és:\n$200-108=92$ €\nPer tant, no li fan un $50$ % de descompte, perquè no li han rebaixat $100$ €.[/mat]'},
    {error: true, tecles: ['ac', '2', '0', '0', 'per', '0', 'punt', '5'], pantalla: calc(D, '200\\times 0.5', '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi sumes els descomptes, $40$ % $+\\ 10$ % $=50$ %: $200$ [[per]] $0.5$.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, '200\\times 0.5', '100'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $100$.[/calc] ' + FRASE_ERROR + ' [mat]No té sentit: el $10$ % extra és sobre $120$ €, no sobre $200$ €. Els descomptes encadenats no se sumen![/mat]'},
  ],
},
{
  id: 'll4-2-16',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• la baixada del $15$ % es calcula sobre $300$ €. I la pujada del $15$ %, sobre quin preu es calcula?[/mat]'},
    {tecles: ['3', '0', '0', 'per', '0', 'punt', '8', '5', 'per', '1', 'punt', '1', '5'], pantalla: calc(D, '300\\times 0.85\\times 1.15'),
      text: '[mat]Baixar un $15$ % és pagar el $85$ %: es multiplica per $0{,}85$.\nPujar un $15$ % és pagar el $115$ %: es multiplica per $1{,}15$.\nEl preu actual és aquest:\n$300\\cdot 0{,}85\\cdot 1{,}15$ €[/mat] [calc]Escriu $300$ [[per]] $0.85$ [[per]] $1.15$.[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, '300\\times 0.85\\times 1.15', '293.25'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és $293.25$.[/calc] [mat]R) Ara el televisor costa $293{,}25$ €, i no $300$ €.\nLa baixada i la pujada no es compensen: la pujada del $15$ % es calcula sobre un preu més petit, $255$ €.[/mat]'},
  ],
},
);

})(Models.obre());
