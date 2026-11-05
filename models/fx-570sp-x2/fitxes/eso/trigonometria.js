/* ═══════════════════════════════════════════════════════════════════
   models/fx-570sp-x2/fitxes/eso/trigonometria.js — ESO · bloc «Trigonometria»
   ───────────────────────────────────────────────────────────────────
   Les fitxes de la fx-82SP CW (el mateix fitxer, a models/fx-82sp-cw/), amb les
   tecles de la fx-570/991SP X II: la tecla = (id «exe»), el signe negatiu (−)
   («neg»), SHIFT ×10ˣ = π, SHIFT (−) = log, ln, SHIFT x■ = arrel d'índex n,
   S⇔D i els menús numerats (SHIFT MENU, OPTN).
   NOMÉS DADES. Normes d'ESO: ARCHITECTURE.md, «Writing fitxes». Exercicis del llibre de 4t
   d'ESO del departament (step-quiz/llibre, unitat 7 «Trigonometria:
   mesurar l'inabastable», activitat 4, exercicis 37, 38 i 39; les
   solucions són les del full del professorat). Id ll4-<unitat>-<exercici>.
   La calculadora, en graus (D).
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca, config, configCalcul, unitatAngular} = M.guions;
const X2 = M.x2;
const {D, R} = M.comu;

const ARBRE = '12\\tan(35)';
const ESCALA = '5\\mathrm{sen}(60)';
const ANGLE = '\\mathrm{Arccos}(1.5\\div 5)', ANGLE_ERROR = '\\cos(1.5\\div 5)';

M.fitxes.push(

{
  id: 'll4-7-37',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: marca(calc(D), 'ang'),
      text: '[calc]Abans de res, mira la part superior de la teva calculadora: hi ha d\'haver una **D** (graus), perquè els angles d\'aquest problema són en graus.\n\nEn tot cas, el que no pot haver-hi és una **R**, perquè significa que la calculadora treballa en radians, i en aquest problema no ens interessa, perquè tenim un angle expressat en graus: $35^\\circ$.[/calc]'},
    {tecles: ['1', '2', 'tan', '3', '5', 'rpar'], pantalla: calc(D, ARBRE),
      text: '[mat]Podem formar un triangle rectangle, on:\n• l\'ombra ($12$ m) és el catet contigu\n• l\'altura ($h$) de l\'arbre és el catet oposat\n$\\tan$ $35^\\circ = \\dfrac{h}{12}$\nAixò ens permet trobar l\'altura:\n$h=12\\cdot\\tan 35^\\circ$[/mat] [calc]Escriu $12$, [[tan]], $35$ i [[rpar]] (no cal la tecla [[per]]).[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ARBRE, '8.402490459'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $8.402490459$.[/calc] [mat]R) L\'arbre fa aproximadament $8{,}4$ m d\'altura.[/mat]'},
  ],
},
{
  id: 'll4-7-38',
  inici: calc(D),
  passos: [
    {tecles: ['5', 'sen', '6', '0', 'rpar'], pantalla: calc(D, ESCALA),
      text: '[mat]Podem formar un triangle rectangle, on:\n• la pròpia escala ($5$ m) és la hipotenusa;\n• l\'altura a la qual arriba és el catet oposat.\n\nPodem trobar l\'altura així:\n$h=5\\cdot\\sin$ $60^\\circ$[/mat] [calc]Escriu $5$, [[sen]], $60$ i [[rpar]].\nRecorda que has d\'estar en mode **D** (graus).[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ESCALA, '\\frac{5\\sqrt{3}}{2}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $\\frac{5\\sqrt{3}}{2}$.\nSi surt en forma d\'arrel és perquè la calculadora està configurada per donar resultats exactes.\nSi estigués configurada per donar decimals, sortiria $4.330127019$.[/calc] [mat]$\\frac{5\\sqrt{3}}{2}\\simeq 4{,}33$ m[/mat]'},
    {tecles: ['sd'], pantalla: marca(calc(D, ESCALA, '4.330127019'), 'resultat'),
      text: '[calc]Per obtenir l\'expressió decimal de l\'arrel, prem [[sd]].\nObtens $4.330127019$.[/calc] [mat]R) L\'escala arriba aproximadament a $4{,}33$ m d\'altura.[/mat]'},
  ],
},
{
  id: 'll4-7-39',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'cos', '1', 'punt', '5', 'entre', '5', 'rpar'], pantalla: calc(D, ANGLE),
      text: '[mat]Coneixem el catet contigu ($1{,}5$ m) i la hipotenusa ($5$ m):\n$\\cos\\alpha=\\dfrac{1{,}5}{5}$\nPer trobar l\'angle, cal la funció inversa:\n$\\alpha=\\cos^{-1}(1{,}5\\div 5)$[/mat] [calc]Prem [[shift]] [[cos]] (a sobre hi ha Arccos), escriu $1.5$ [[entre]] $5$ i tanca amb [[rpar]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ANGLE, '72.54239688'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $72.54239688$.\nÉs en graus, perquè a la barra hi ha D.[/calc] [mat]R) L\'escala forma un angle de $72{,}5^\\circ$ amb el terra. Està a $2{,}5^\\circ$ de l\'angle recomanat.[/mat]'},
    {error: true, tecles: ['ac', 'cos', '1', 'punt', '5', 'entre', '5', 'rpar'], pantalla: calc(D, ANGLE_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!:\nL\'error consisteix a calcular el cosinus en lloc de l\'arcosinus. És a dir, que oblidem la tecla [[shift]] i directament demanem aquest càlcul:\n[[cos]] $1.5$ [[entre]] $5$ [[rpar]].[/calc]'},
    {error: true, tecles: ['shift', 'exe'], pantalla: marca(calc(D, ANGLE_ERROR, '0.9999862922'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]] (≈): obtens $0.9999862922$.[/calc] [mat]La calculadora ha calculat un cosinus, però el que havia de fer era trobar un angle.\n\nDe fet, no té cap sentit, perquè $0{,}999986^\\circ$ significa que l\'escala està gairebé estirada al terra![/mat]'},
  ],
},

);

})(Models.obre());
