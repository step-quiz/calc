/* ═══════════════════════════════════════════════════════════════════
   models/fx-570sp-x2/fitxes/eso/percentatges.js — ESO · bloc «Percentatges»
   ───────────────────────────────────────────────────────────────────
   Les fitxes de la fx-82SP CW (el mateix fitxer, a models/fx-82sp-cw/), amb les
   tecles de la fx-570/991SP X II: la tecla = (id «exe»), el signe negatiu (−)
   («neg»), SHIFT ×10ˣ = π, SHIFT (−) = log, ln, SHIFT x■ = arrel d'índex n,
   S⇔D i els menús numerats (SHIFT MENU, OPTN).
   NOMÉS DADES. Normes d'ESO: ARCHITECTURE.md, «Writing fitxes».
   Activitat «Impressió de fotografies» de CB 4t d'ESO 2023 (preguntes
   23 i 24; la 26 és al bloc «Proporcionalitat»). Les tres del llibre (IVA,
   descomptes encadenats, +50 % −50 %), iguals que a la fx-82SP CW. Zona d'error només on és pedagògicament rellevant:
   a la 23 (calcular el que s'estalvia en lloc del que es paga) i a la
   24 (desfer un descompte multiplicant per 1,25).
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca} = M.guions;
const {D} = M.comu;

const FRASE_ERROR = '[mat]La calculadora ha seguit bé les instruccions. El problema és que s\'han plantejat malament els càlculs.[/mat]';

const Q23 = '40\\times 0.3\\times 0.75', Q23_ERROR = '40\\times 0.3\\times 0.25';
const Q24_ERROR = '4.5\\times 1.25\\div 0.3';

M.fitxes.push(

{
  id: 'cb4-23-q23',
  inici: calc(D),
  passos: [
    {tecles: ['4', '0', 'per', '0', 'punt', '3'], pantalla: calc(D, '40\\times 0.3'),
      text: '[mat]Sense descompte, $40$ fotografies costen $40\\cdot 0{,}30$ €.[/mat] [calc]Escriu $40$ [[per]] $0.3$.[/calc]'},
    {tecles: ['per', '0', 'punt', '7', '5'], pantalla: calc(D, Q23),
      text: '[mat]Amb un descompte del $25$ %, es paga el $75$ % del preu.\nPagar el $75$ % és multiplicar per $0{,}75$.[/mat] [calc]Ara fes l\'operació [[per]] $0.75$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, Q23, '9'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $9$.[/calc] [mat]R) A l\'Anna li costarà $9$ € imprimir les $40$ fotografies.[/mat]'},
    {error: true, tecles: ['ac', '4', '0', 'per', '0', 'punt', '3', 'per', '0', 'punt', '2', '5'], pantalla: calc(D, Q23_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi multipliques pel descompte en lloc de pel que es paga: $40$ [[per]] $0.3$ [[per]] $0.25$.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, Q23_ERROR, '3'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $3$.[/calc] ' + FRASE_ERROR + ' [mat]No té sentit: $3$ € és el que s\'estalvia l\'Anna, no el que paga.[/mat]'},
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
    {error: true, tecles: ['exe', 'sd'], pantalla: marca(calc(D, Q24_ERROR, '18.75'), 'resultat'),
      parcials: {0: marca(calc(D, Q24_ERROR, '\\frac{75}{4}'), 'resultat')},
      text: '[calc]Prem [[exe]] i després [[sd]] per passar-lo a decimal: obtens $18.75$.[/calc] ' + FRASE_ERROR + ' [mat]No pot ser: no es poden imprimir $18{,}75$ fotografies![/mat]'},
  ],
},

{
  id: 'll4-2-25',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• sense l\'IVA, el sopar costa més o menys de $110$ €?\n• el $10$ % d\'IVA es calcula sobre el preu amb IVA o sobre el preu sense IVA?[/mat]'},
    {tecles: ['1', '1', '0', 'entre', '1', 'punt', '1'], pantalla: calc(D, '110\\div 1.1'),
      text: '[mat]Afegir l\'IVA del $10$ % és multiplicar per $1{,}10$.\nPer treure\'l, es fa l\'operació contrària: dividir entre $1{,}10$.[/mat] [calc]Escriu $110$ [[entre]] $1.1$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '110\\div 1.1', '100'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $100$.[/calc] [mat]R) Sense IVA, el sopar costa $100$ €.[/mat]'},
    {error: true, tecles: ['ac', '1', '1', '0', 'per', '0', 'punt', '9'], pantalla: calc(D, '110\\times 0.9', '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi treus el $10$ % de $110$ €, multiplicant per $0.9$: $110$ [[per]] $0.9$.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, '110\\times 0.9', '99'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $99$.[/calc] ' + FRASE_ERROR + ' [mat]No encaixa amb l\'enunciat: si a $99$ € hi afegeixes el $10$ % d\'IVA, surten $108{,}90$ €, no $110$ €.[/mat]'},
  ],
},
{
  id: 'll4a-2-17',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• el $10$ % extra es calcula sobre $200$ € o sobre un preu més petit?\n• el preu final serà més de $100$ € o menys?[/mat]'},
    {tecles: ['2', '0', '0', 'per', '0', 'punt', '6', 'per', '0', 'punt', '9'], pantalla: calc(D, '200\\times 0.6\\times 0.9'),
      text: '[mat]Amb un $40$ % de descompte es paga el $60$ %: es multiplica per $0{,}6$.\nAmb el $10$ % extra es paga el $90$ % del que queda: es multiplica per $0{,}9$.[/mat] [calc]Escriu $200$ [[per]] $0.6$ [[per]] $0.9$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '200\\times 0.6\\times 0.9', '108'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $108$.[/calc] [mat]R) L\'abric costa $108$ €.\nEl descompte és de $200-108=92$ €, que és el $46$ % de $200$ €, i no el $50$ %.[/mat]'},
    {error: true, tecles: ['ac', '2', '0', '0', 'per', '0', 'punt', '5'], pantalla: calc(D, '200\\times 0.5', '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi sumes els descomptes, $40$ % $+\\ 10$ % $=50$ %: $200$ [[per]] $0.5$.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, '200\\times 0.5', '100'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $100$.[/calc] ' + FRASE_ERROR + ' [mat]No té sentit: el $10$ % extra es fa sobre $120$ €, no sobre $200$ €. Els descomptes encadenats no se sumen![/mat]'},
  ],
},
{
  id: 'll4-2-16',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• la pujada del $50$ % es calcula sobre $300$ €. I la baixada del $50$ %, sobre quin preu es calcula?[/mat]'},
    {tecles: ['3', '0', '0', 'per', '1', 'punt', '5', 'per', '0', 'punt', '5'], pantalla: calc(D, '300\\times 1.5\\times 0.5'),
      text: '[mat]Pujar un $50$ % és multiplicar per $1{,}5$.\nBaixar un $50$ % és multiplicar per $0{,}5$.[/mat] [calc]Escriu $300$ [[per]] $1.5$ [[per]] $0.5$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '300\\times 1.5\\times 0.5', '225'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $225$.[/calc] [mat]R) Al febrer, la consola costa $225$ €: no torna a costar $300$ €.\nLa pujada i la baixada no es compensen, perquè la baixada es calcula sobre un preu més gran.[/mat]'},
  ],
},
);

})(Models.obre());
