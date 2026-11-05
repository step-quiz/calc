/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/eso/trigonometria.js — ESO · bloc «Trigonometria» (fx-82MS)
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Les mateixes fitxes que a la fx-82SP CW (vegeu-ne la
   capçalera). La fx-82MS dona els resultats en decimal.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca, mode} = M.guions;
const {D, R} = M.comu;

const ARBRE = '12tan 35';
const ESCALA = '5sin 60';
const ANGLE = 'cos⁻¹ (1.5÷5)', ANGLE_ERROR = 'cos (1.5÷5)';

M.fitxes.push(

{
  id: 'll4-7-37',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: marca(calc(D), 'ang'),
      text: '[calc]Abans de res, mira la part superior de la teva calculadora: hi ha d\'haver una **D** (graus), perquè els angles d\'aquest problema són en graus.\n\nEn tot cas, el que no pot haver-hi és una **R**, perquè significa que la calculadora treballa en radians, i en aquest problema no ens interessa, perquè tenim un angle expressat en graus: $35^\\circ$.[/calc]'},
    {tecles: ['1', '2', 'tan', '3', '5'], pantalla: calc(D, ARBRE),
      text: '[mat]Podem formar un triangle rectangle, on:\n• l\'ombra ($12$ m) és el catet contigu\n• l\'altura ($h$) de l\'arbre és el catet oposat\n$\\tan$ $35^\\circ = \\dfrac{h}{12}$\nAixò ens permet trobar l\'altura:\n$h=12\\cdot\\tan 35^\\circ$[/mat] [calc]Escriu $12$, [[tan]] i $35$ (no cal la tecla [[per]]).[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ARBRE, '8.402490459'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $8.402490459$.[/calc] [mat]R) L\'arbre fa aproximadament $8{,}4$ m d\'altura.[/mat]'},
  ],
},
{
  id: 'll4-7-38',
  inici: calc(D),
  passos: [
    {tecles: ['5', 'sin', '6', '0'], pantalla: calc(D, ESCALA),
      text: '[mat]Podem formar un triangle rectangle, on:\n• la pròpia escala ($5$ m) és la hipotenusa;\n• l\'altura a la qual arriba és el catet oposat.\n\nPodem trobar l\'altura així:\n$h=5\\cdot\\sin$ $60^\\circ$[/mat] [calc]Escriu $5$, [[sin]] i $60$.\nRecorda que has d\'estar en mode **D** (graus).[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ESCALA, '4.330127019'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $4.330127019$.[/calc] [mat]R) L\'escala arriba aproximadament a $4{,}33$ m d\'altura.[/mat]'},
  ],
},
{
  id: 'll4-7-39',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'cos', 'lpar', '1', 'punt', '5', 'entre', '5', 'rpar'], pantalla: calc(D, ANGLE),
      text: '[mat]Coneixem el catet contigu ($1{,}5$ m) i la hipotenusa ($5$ m):\n$\\cos\\alpha=\\dfrac{1{,}5}{5}$\nPer trobar l\'angle, cal la funció inversa:\n$\\alpha=\\cos^{-1}(1{,}5\\div 5)$[/mat] [calc]Prem [[shift]] [[cos]] (a sobre hi ha cos⁻¹) i escriu, entre parèntesis, $1.5$ [[entre]] $5$.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ANGLE, '72.54239688'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $72.54239688$.\nÉs en graus, perquè a la pantalla hi ha D.[/calc] [mat]R) L\'escala forma un angle de $72{,}5^\\circ$ amb el terra. Està a $2{,}5^\\circ$ de l\'angle recomanat.[/mat]'},
    {error: true, tecles: ['ac', 'cos', 'lpar', '1', 'punt', '5', 'entre', '5', 'rpar'], pantalla: calc(D, ANGLE_ERROR),
      text: '[calc]!!Error típic!!:\nL\'error consisteix a calcular el cosinus en lloc de l\'arcosinus. És a dir, que oblidem la tecla [[shift]] i directament demanem aquest càlcul:\n[[cos]] [[lpar]] $1.5$ [[entre]] $5$ [[rpar]].[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, ANGLE_ERROR, '0.999986292'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens $0.999986292$.[/calc] [mat]La calculadora ha calculat un cosinus, però el que havia de fer era trobar un angle.\n\nDe fet, no té cap sentit, perquè $0{,}999986^\\circ$ significa que l\'escala està gairebé estirada al terra![/mat]'},
  ],
},

);

})(Models.obre());
