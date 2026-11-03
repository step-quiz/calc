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
      text: '[mat]Sense descompte, 40 fotografies costen $40\\cdot 0{,}30$ euros.[/mat] [calc]Escriu 40 [[per]] 0.3.[/calc]'},
    {tecles: ['per', '0', 'punt', '7', '5'], pantalla: calc(D, Q23),
      text: '[mat]Amb un descompte del 25 %, es paga el 75 % del preu: es multiplica per 0,75.[/mat] [calc]Ara fes l\'operació [[per]] 0.75.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, Q23, '9'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és 9.[/calc] [mat]La resposta correcta és que li costarà 9 euros.[/mat]'},
    {error: true, tecles: ['ac', '4', '0', 'per', '0', 'punt', '3', 'per', '0', 'punt', '2', '5'], pantalla: calc(D, Q23_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i multiplica per 0.25 en lloc de 0.75.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, Q23_ERROR, '3'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens 3.[/calc] [mat]Això és el que s\'estalvia (el 25 %), no el que paga. El que paga és $12-3=9$ euros.[/mat]'},
  ],
},
{
  id: 'cb4-23-q24',
  inici: calc(D),
  passos: [
    {tecles: ['4', 'punt', '5', 'entre', '0', 'punt', '7', '5'], pantalla: calc(D, '4.5\\div 0.75'),
      text: '[mat]4,50 euros és el 75 % del preu sense descompte. Per trobar el preu sense descompte, es divideix entre 0,75.[/mat] [calc]Escriu 4.5 [[entre]] 0.75.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '4.5\\div 0.75', '6'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens 6.[/calc] [mat]Sense descompte, les fotografies costaven 6 euros.[/mat]'},
    {tecles: ['entre', '0', 'punt', '3'], pantalla: calc(D, '\\mathrm{Ans}\\div 0.3', '', {hist: true}),
      text: '[mat]Cada fotografia costa 0,30 euros: el nombre de fotografies és 6 dividit entre 0,30.[/mat] [calc]Fes l\'operació [[entre]] 0.3: la calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\mathrm{Ans}\\div 0.3', '20'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és 20.[/calc] [mat]La resposta correcta és que ha imprès 20 fotografies.[/mat]'},
    {error: true, tecles: ['ac', '4', 'punt', '5', 'per', '1', 'punt', '2', '5', 'entre', '0', 'punt', '3'], pantalla: calc(D, Q24_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i, en lloc de dividir entre 0.75, multiplica per 1.25.[/calc]'},
    {error: true, tecles: ['exe', 'sd'], pantalla: marca(calc(D, Q24_ERROR, '18.75'), 'resultat'),
      parcials: {0: marca(calc(D, Q24_ERROR, '\\frac{75}{4}'), 'resultat')},
      text: '[calc]Prem [[exe]] i [[sd]]: obtens 18.75.[/calc] [mat]No pot ser: no es poden imprimir 18,75 fotografies. Treure un 25 % i després afegir-ne un 25 % no torna al preu d\'abans.[/mat]'},
  ],
},

{
  id: 'll4-2-25',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, estima: sense l\'IVA, el sopar ha de costar una mica menys de 110 euros.[/mat]'},
    {tecles: ['1', '1', '0', 'entre', '1', 'punt', '1'], pantalla: calc(D, '110\\div 1.1'),
      text: '[mat]Posar l\'IVA del 10 % és multiplicar per 1,10. Per desfer-ho, es divideix entre 1,10.[/mat] [calc]Escriu 110 [[entre]] 1.1.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '110\\div 1.1', '100'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és 100.[/calc] [mat]La resposta correcta és que, sense IVA, el sopar costa 100 euros.[/mat]'},
    {error: true, tecles: ['ac', '1', '1', '0', 'per', '0', 'punt', '9'], pantalla: calc(D, '110\\times 0.9', '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i treu el 10 % de 110 multiplicant per 0.9: 110 [[per]] 0.9.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, '110\\times 0.9', '99'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens 99.[/calc] ' + FRASE_ERROR + ' [mat]No pot ser: si a 99 euros hi afegeixes el 10 % d\'IVA, surten 108,90 euros, no 110.[/mat]'},
  ],
},
{
  id: 'll4a-2-17',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, estima: el 10 % extra es fa sobre un preu més petit que 200 euros i treu menys de 20 euros. El preu final ha de ser més de 100 euros.[/mat]'},
    {tecles: ['2', '0', '0', 'per', '0', 'punt', '6', 'per', '0', 'punt', '9'], pantalla: calc(D, '200\\times 0.6\\times 0.9'),
      text: '[mat]Amb un 40 % de descompte es paga el 60 %: per 0,6. Amb el 10 % extra, es paga el 90 % del que queda: per 0,9.[/mat] [calc]Escriu 200 [[per]] 0.6 [[per]] 0.9.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '200\\times 0.6\\times 0.9', '108'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és 108.[/calc] [mat]La resposta correcta és que l\'abric costa 108 euros. El descompte és de 92 euros, el 46 %, i no el 50 %.[/mat]'},
    {error: true, tecles: ['ac', '2', '0', '0', 'per', '0', 'punt', '5'], pantalla: calc(D, '200\\times 0.5', '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i suma els descomptes, 40 % + 10 % = 50 %: 200 [[per]] 0.5.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, '200\\times 0.5', '100'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens 100.[/calc] ' + FRASE_ERROR + ' [mat]No pot ser: el 10 % extra es fa sobre 120 euros, no sobre 200. Els percentatges encadenats no se sumen.[/mat]'},
  ],
},
{
  id: 'll4-2-16',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa: la pujada del 50 % es fa sobre 300 euros, però la baixada del 50 % es fa sobre un preu més gran. No es compensen.[/mat]'},
    {tecles: ['3', '0', '0', 'per', '1', 'punt', '5', 'per', '0', 'punt', '5'], pantalla: calc(D, '300\\times 1.5\\times 0.5'),
      text: '[mat]Pujar un 50 % és multiplicar per 1,5; baixar un 50 %, per 0,5.[/mat] [calc]Escriu 300 [[per]] 1.5 [[per]] 0.5.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '300\\times 1.5\\times 0.5', '225'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és 225.[/calc] [mat]La resposta correcta és que el preu final és de 225 euros: no torna a 300. La pujada i la baixada no es cancel·len.[/mat]'},
  ],
},
);

})(Models.obre());
