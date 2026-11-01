/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/eso/percentatges.js — ESO · bloc «Percentatges i proporcions»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Normes: HANDOFF-ESO.md §10 (model: eso/mitjanes.js).
   Activitat «Impressió de fotografies» de CB 4t d'ESO 2023 (preguntes
   23, 24 i 26). Zona d'error només on és pedagògicament rellevant:
   a la 23 (calcular el que s'estalvia en lloc del que es paga) i a la
   24 (desfer un descompte multiplicant per 1,25).
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca} = M.guions;
const {D} = M.comu;

const Q23 = '40\\times 0.3\\times 0.75', Q23_ERROR = '40\\times 0.3\\times 0.25';
const Q24_ERROR = '4.5\\times 1.25\\div 0.3';
const Q26 = '34\\times 42\\div 62';

M.fitxes.push(

{
  id: 'cb4-23-q23', bloc: 'eso-percentatges', titol: 'Un descompte del 25 %', font: 'CB 4ESO (2023), pregunta 23',
  enunciat: 'Una botiga imprimeix fotografies en color a 0,30 euros cadascuna.\n• L\'Anna hi imprimeix 40 fotografies en color.\n• La botiga li fa un descompte del 25 %.\nQuant li costarà imprimir-les?',
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
  id: 'cb4-23-q24', bloc: 'eso-percentatges', titol: 'Quantes fotos amb descompte?', font: 'CB 4ESO (2023), pregunta 24',
  enunciat: 'Un altre dia, l\'Anna torna a la mateixa botiga a imprimir fotografies en color.\n• Cada fotografia costa 0,30 euros.\n• Li fan el mateix descompte del 25 %.\n• Amb el descompte, ha pagat 4,50 euros.\nQuantes fotografies ha imprès?',
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
    {error: true, tecles: ['shift', 'exe'], pantalla: marca(calc(D, Q24_ERROR, '18.75'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]]: obtens 18.75.[/calc] [mat]No pot ser: no es poden imprimir 18,75 fotografies. Treure un 25 % i després afegir-ne un 25 % no torna al preu d\'abans.[/mat]'},
  ],
},
{
  id: 'cb4-23-q26', bloc: 'eso-percentatges', titol: 'Una foto més petita, sense deformar-la', font: 'CB 4ESO (2023), pregunta 26',
  enunciat: 'L\'Anna té una fotografia de 62 cm d\'amplada i 34 cm d\'alçada. La vol imprimir més petita, sense deformar-la:\n• la fotografia impresa ha de fer 42 cm d\'amplada;\n• s\'ha de mantenir la proporció entre els costats.\nQuina alçada tindrà, aproximadament?',
  inici: calc(D),
  passos: [
    {tecles: ['3', '4', 'per', '4', '2'], pantalla: calc(D, '34\\times 42'),
      text: '[mat]Si es manté la proporció, l\'alçada nova és $\\frac{34\\cdot 42}{62}$ (regla de tres).[/mat] [calc]Escriu 34 [[per]] 42.[/calc]'},
    {tecles: ['entre', '6', '2'], pantalla: calc(D, Q26),
      text: '[calc]Ara fes l\'operació [[entre]] 62.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, Q26, '\\frac{714}{31}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $\\frac{714}{31}$. Surt en fracció perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 23.03225806.[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, Q26, '23.03225806'), 'resultat'),
      text: '[calc]Per tenir-lo en decimal, prem [[shift]] i [[exe]] (≈): obtens 23.03225806.[/calc] [mat]La resposta correcta és que l\'alçada serà d\'uns 23 cm.[/mat]'},
  ],
},

);

})(Models.obre('fx-82sp-cw'));
