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
      text: '[mat]El tram és la hipotenusa d\'un triangle rectangle amb catets de $3$ m i $5$ m.\nApliquem el teorema de Pitàgores per trobar quant mesura la hipotenusa:\n$\\sqrt{3^2+5^2}$[/mat] [calc]Prem [[arrel]] i escriu, entre parèntesis, $3$ [[x2]] [[mes]] $5$ [[x2]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ESCALA, '5.830951895'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $5.830951895$.[/calc] [mat]R) Cada tram d\'escala mesura aproximadament $5{,}83$ m.[/mat]'},
    {error: true, tecles: ['ac', 'arrel', '3', 'x2', 'mes', '5', 'x2'], pantalla: calc(D, ESCALA_ERROR),
      text: '[calc]!!Error típic!!:\nSi escrius l\'arrel sense parèntesis: [[arrel]] $3$ [[x2]] [[mes]] $5$ [[x2]].[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, ESCALA_ERROR, '28'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens $28$.[/calc] [mat]La calculadora ha seguit bé les instruccions, però sense parèntesis l\'arrel només afecta el $3^2$.[/mat] [mat]No té sentit: el tram no pot ser més llarg que $3+5=8$ m![/mat]'},
  ],
},
{
  id: 'll4a-4-34',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• quin és el costat més llarg del triangle: l\'escala, la paret o el terra?\n• l\'escala pot arribar a més de $5$ m d\'altura?[/mat]'},
    {tecles: ['arrel', 'lpar', '5', 'x2', 'menys', '4', 'x2', 'rpar'], pantalla: calc(D, PARET),
      text: '[mat]Podem formar un triangle rectangle, on:\n• el tros de terra ($4$ m) és un catet;\n• l\'altura a la qual arriba l\'escala és l\'altre catet;\n• la pròpia escala és la hipotenusa.\nPel teorema de Pitàgores, l\'altura de l\'escala val:\n$\\sqrt{5^2-4^2}$[/mat] [calc]Prem [[arrel]] i escriu, entre parèntesis, $5$ [[x2]] [[menys]] $4$ [[x2]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, PARET, '3'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $3$.[/calc] [mat]R) L\'escala arriba a $3$ m d\'altura de la paret.[/mat]'},
    {error: true, tecles: ['ac', 'arrel', 'lpar', '5', 'x2', 'mes', '4', 'x2', 'rpar'], pantalla: calc(D, PARET_ERROR),
      text: '[calc]!!Error típic!!:\nSi sumes els quadrats en lloc de restar-los: [[arrel]] [[lpar]] $5$ [[x2]] [[mes]] $4$ [[x2]] [[rpar]].[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, PARET_ERROR, '6.403124237'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens $6.403124237$.[/calc] [mat]La calculadora ha seguit les teves instruccions, però no té cap sentit, perquè una escala de $5$ m inclinada no pot arribar a $6{,}4$ m d\'altura. L\'altura màxima seria precisament $5$ m, posant-la vertical.[/mat]'},
  ],
},
{
  id: 'cb4-22-q8',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'exp', 'per', '3', 'x2', 'per', '1', '5'], pantalla: calc(D, GOT),
      text: '[mat]El volum del got es calcula així, a partir del seu radi i de la seva altura:\n$V=\\pi\\cdot 3^2\\cdot 15$[/mat] [calc]Escriu π ([[shift]] [[exp]]), [[per]] $3$ [[x2]] [[per]] $15$.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, GOT, '424.1150082'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $424.1150082$.[/calc] [mat]R) El volum del got és aproximadament de $424$ cm³.[/mat]'},
  ],
},
{
  id: 'cb4-25-q27',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'exp', 'per', '0', 'punt', '7', '5', 'x2'], pantalla: calc(D, PARASOL),
      text: '[mat]L\'àrea del cercle es calcula així:\n$A=\\pi\\cdot 0{,}75^2$[/mat] [calc]Escriu π ([[shift]] [[exp]]), [[per]] $0.75$ [[x2]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, PARASOL, '1.767145868'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $1.767145868$.[/calc] [mat]R) Calen aproximadament $1{,}77$ m² de tela.[/mat]'},
  ],
},

{
  id: 'll4a-4-8',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• el pal mesura més que la seva pròpia ombra, o menys?\n• aleshores, el campanar tindrà una altura superior o inferior a $12$ m?[/mat]'},
    {tecles: ['1', '2', 'entre', '1', 'punt', '5'], pantalla: calc(D, '12÷1.5'),
      text: '[mat]El pal i el campanar, amb les seves ombres, formen triangles semblants.\nLa raó de semblança és aquesta:\n$12\\div 1{,}5$[/mat] [calc]Escriu $12$ [[entre]] $1.5$.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '12÷1.5', '8'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens $8$.[/calc] [mat]Això vol dir que l\'ombra del campanar és $8$ vegades la del pal. Per tant, l\'altura del campanar també serà $8$ vegades la del pal.\nCom que el pal mesura $2$ m, farem el següent:[/mat]'},
    {tecles: ['per', '2'], pantalla: calc(D, 'Ans×2'),
      text: '[calc]Fes l\'operació [[per]] $2$.\nLa calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, 'Ans×2', '16'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $16$.[/calc] [mat]R) La Júlia ho ha sabut perquè l\'altura del campanar és $8$ vegades la del pal: $2\\cdot 8=16$ m.[/mat]'},
    {error: true, tecles: ['ac', '1', 'punt', '5', 'per', '1', '2', 'entre', '2'], pantalla: calc(D, TORRE),
      text: '[calc]!!Error típic!!:\nSi inverteixes la raó i fas ombra entre altura: $1.5$ [[per]] $12$ [[entre]] $2$.[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, TORRE, '9'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens $9$.[/calc] ' + FRASE_ERROR + ' [mat]No té sentit: el campanar ($9$ m) seria més baix que la seva ombra ($12$ m), i el pal no![/mat]'},
  ],
},
);

})(Models.obre());
