/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/eso/geometria.js — ESO · bloc «Pitàgores, àrees i volums»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Normes d'ESO: ARCHITECTURE.md, «Writing fitxes». Preguntes reals de CB 4t
   d'ESO: 2026 q7 (Pitàgores), 2022 q8 (volum d'un cilindre) i 2025 q27
   (àrea d'un cercle). Els enunciats oficials diuen π = 3,14: les fitxes
   fan servir la tecla π i diuen que, arrodonit, surt el mateix.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca} = M.guions;
const {D} = M.comu;
const FRASE_ERROR = '[mat]La calculadora ha seguit bé les instruccions. El problema és que s\'han plantejat malament els càlculs.[/mat]';
const PARET = '√(5²-4²)', PARET_ERROR = '√(5²+4²)';
const TORRE = '1.5×12÷2';

const ESCALA = '√(3²+5²)', ESCALA_ERROR = '√3²+5²';
const GOT = 'π×3²×15';
const PARASOL = 'π×0.75²';

M.fitxes.push(

{
  id: 'cb4-26-q7',
  tancament: '[mat]Recorda:\n• A la fx-82MS, el que va dins de l\'arrel s\'ha d\'escriure entre parèntesis\n\n$\\sqrt{3^2+5^2}\\simeq 5{,}83$ m[/mat]',
  inici: calc(D),
  passos: [
    {tecles: ['arrel', 'lpar', '3', 'x2', 'mes', '5', 'x2', 'rpar'], pantalla: calc(D, ESCALA),
      text: '[mat]El tram és la hipotenusa d\'un triangle rectangle amb catets de $3$ m i $5$ m.\nPel teorema de Pitàgores, el tram mesura això:\n$\\sqrt{3^2+5^2}$[/mat] [calc]Prem [[arrel]] i escriu, entre parèntesis, $3$ [[x2]] [[mes]] $5$ [[x2]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ESCALA, '5.830951895'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $5.830951895$.[/calc] [mat]R) Cada tram d\'escala mesura aproximadament $5{,}83$ m.[/mat]'},
    {error: true, tecles: ['ac', 'arrel', '3', 'x2', 'mes', '5', 'x2'], pantalla: calc(D, ESCALA_ERROR),
      text: '[calc]!!Error típic!!:\nSi escrius l\'arrel sense parèntesis: [[arrel]] $3$ [[x2]] [[mes]] $5$ [[x2]].[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, ESCALA_ERROR, '28'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens $28$.[/calc] ' + FRASE_ERROR + ' [mat]No té sentit: el tram no pot ser més llarg que $3+5=8$ m!\nSense parèntesis, l\'arrel només afecta el $3^2$.[/mat]'},
  ],
},
{
  id: 'll4a-4-34',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• quin és el costat més llarg del triangle: l\'escala, la paret o el terra?\n• l\'escala pot arribar a més de $5$ m d\'altura?[/mat]'},
    {tecles: ['arrel', 'lpar', '5', 'x2', 'menys', '4', 'x2', 'rpar'], pantalla: calc(D, PARET),
      text: '[mat]L\'escala ($5$ m) és la hipotenusa. El terra ($4$ m) i l\'altura són els catets.\nPel teorema de Pitàgores, l\'altura és això:\n$\\sqrt{5^2-4^2}$[/mat] [calc]Prem [[arrel]] i escriu, entre parèntesis, $5$ [[x2]] [[menys]] $4$ [[x2]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, PARET, '3'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $3$.[/calc] [mat]R) L\'escala arriba a $3$ m d\'altura de la paret.[/mat]'},
    {error: true, tecles: ['ac', 'arrel', 'lpar', '5', 'x2', 'mes', '4', 'x2', 'rpar'], pantalla: calc(D, PARET_ERROR),
      text: '[calc]!!Error típic!!:\nSi sumes els quadrats en lloc de restar-los: [[arrel]] [[lpar]] $5$ [[x2]] [[mes]] $4$ [[x2]] [[rpar]].[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, PARET_ERROR, '6.403124237'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens $6.403124237$.[/calc] ' + FRASE_ERROR + ' [mat]No té cap sentit: una escala de $5$ m no pot arribar a $6{,}4$ m d\'altura![/mat]'},
  ],
},
{
  id: 'cb4-22-q8',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'exp', 'per', '3', 'x2', 'per', '1', '5'], pantalla: calc(D, GOT),
      text: '[mat]El volum del got és això:\n$\\pi\\cdot 3^2\\cdot 15$[/mat] [calc]Escriu π ([[shift]] [[exp]]), [[per]] $3$ [[x2]] [[per]] $15$.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, GOT, '424.1150082'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $424.1150082$.[/calc] [mat]Amb $\\pi=3{,}14$ surt $423{,}9$: arrodonits, tots dos donen $424$.\nR) El volum del got és aproximadament de $424$ cm³.[/mat]'},
  ],
},
{
  id: 'cb4-25-q27',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'exp', 'per', '0', 'punt', '7', '5', 'x2'], pantalla: calc(D, PARASOL),
      text: '[mat]L\'àrea del cercle és això:\n$\\pi\\cdot 0{,}75^2$[/mat] [calc]Escriu π ([[shift]] [[exp]]), [[per]] $0.75$ [[x2]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, PARASOL, '1.767145868'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $1.767145868$.[/calc] [mat]Amb $\\pi=3{,}14$ surt $1{,}766$: arrodonits a les centèsimes, tots dos donen $1{,}77$.\nR) El para-sol té aproximadament $1{,}77$ m² de tela.[/mat]'},
  ],
},

{
  id: 'll4a-4-8',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• el pal és més alt o més baix que la seva ombra?\n• aleshores, el campanar farà més o menys de $12$ m?[/mat]'},
    {tecles: ['1', '2', 'entre', '1', 'punt', '5'], pantalla: calc(D, '12÷1.5'),
      text: '[mat]El pal i el campanar, amb les seves ombres, formen triangles semblants.\nLa raó de semblança és l\'ombra del campanar entre l\'ombra del pal:\n$12\\div 1{,}5$[/mat] [calc]Escriu $12$ [[entre]] $1.5$.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '12÷1.5', '8'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens $8$.[/calc] [mat]L\'ombra del campanar és $8$ vegades la del pal. Per tant, el campanar també és $8$ vegades més alt que el pal.[/mat]'},
    {tecles: ['per', '2'], pantalla: calc(D, 'Ans×2'),
      text: '[calc]Fes l\'operació [[per]] $2$.\nLa calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, 'Ans×2', '16'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $16$.[/calc] [mat]R) El campanar fa $16$ m d\'altura.[/mat]'},
    {error: true, tecles: ['ac', '1', 'punt', '5', 'per', '1', '2', 'entre', '2'], pantalla: calc(D, TORRE),
      text: '[calc]!!Error típic!!:\nSi inverteixes la raó i fas ombra entre altura: $1.5$ [[per]] $12$ [[entre]] $2$.[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, TORRE, '9'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens $9$.[/calc] ' + FRASE_ERROR + ' [mat]No té sentit: el campanar seria més baix que la seva ombra, i en canvi el pal és més alt que la seva![/mat]'},
  ],
},
);

})(Models.obre());
