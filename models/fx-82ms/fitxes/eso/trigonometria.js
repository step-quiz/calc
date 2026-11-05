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
  id: 'eso-posa-graus',
  inici: calc(R),
  passos: [
    {error: true, tecles: ['1', '2', 'tan', '3', '5'], pantalla: calc(R, ARBRE),
      text: '[calc]!!Error típic!!:\nSi calcules amb la R a dalt de la pantalla: $12$ [[tan]] $35$.[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(R, ARBRE, '5.685776645'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens $5.685776645$.[/calc] [mat]La calculadora ha seguit bé les instruccions, però ha entès $35$ radians, i no $35^\\circ$.[/mat]'},
    {tecles: ['mode'], pantalla: mode(1, R),
      text: '[calc]Ho arreglem. Prem [[mode]]: surten els modes de càlcul.[/calc]'},
    {tecles: ['mode'], pantalla: mode(2, R),
      text: '[calc]Torna a prémer [[mode]]: ara surt la unitat dels angles, {{Deg}} (graus), {{Rad}} (radians) i {{Gra}}.[/calc]'},
    {tecles: ['1'], pantalla: marca(calc(D), 'ang'),
      text: '[calc]Prem l\'[[1]], el número de {{Deg}}: tornes a la pantalla de càlcul, i ara a dalt hi ha una D.[/calc]'},
    {tecles: ['1', '2', 'tan', '3', '5'], pantalla: calc(D, ARBRE),
      text: '[calc]Torna a escriure $12$ [[tan]] $35$.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ARBRE, '8.402490459'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens $8.402490459$.[/calc] [mat]R) Ara sí: l\'arbre fa aproximadament $8{,}4$ m d\'altura.[/mat]'},
  ],
},
{
  id: 'll4-7-37',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: marca(calc(D), 'ang'),
      text: '[calc]Abans de res, mira la pantalla: hi ha d\'haver una D (graus), perquè els angles d\'aquest problema són en graus.\nSi hi ha una R, mira la fitxa anterior.[/calc]'},
    {tecles: ['1', '2', 'tan', '3', '5'], pantalla: calc(D, ARBRE),
      text: '[mat]Podem formar un triangle rectangle, on:\n• l\'ombra ($12$ m) és el catet contigu a l\'angle de $35^\\circ$;\n• l\'altura de l\'arbre és el catet oposat.\nOposat i contigu → tangent. L\'altura es calcula així:\n$h=12\\cdot\\tan 35^\\circ$[/mat] [calc]Escriu $12$, [[tan]] i $35$.\nNo cal el [[per]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ARBRE, '8.402490459'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $8.402490459$.[/calc] [mat]R) L\'arbre fa aproximadament $8{,}4$ m d\'altura.[/mat]'},
  ],
},
{
  id: 'll4-7-38',
  inici: calc(D),
  passos: [
    {tecles: ['5', 'sin', '6', '0'], pantalla: calc(D, ESCALA),
      text: '[mat]Podem formar un triangle rectangle, on:\n• la pròpia escala ($5$ m) és la hipotenusa;\n• l\'altura a la qual arriba és el catet oposat a l\'angle de $60^\\circ$.\nOposat i hipotenusa → sinus. L\'altura es calcula així:\n$h=5\\cdot\\sin 60^\\circ$[/mat] [calc]Amb la D a la pantalla, escriu $5$, [[sin]] i $60$.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ESCALA, '4.330127019'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $4.330127019$.[/calc] [mat]R) L\'escala arriba aproximadament a $4{,}33$ m d\'altura.[/mat]'},
  ],
},
{
  id: 'll4-7-39',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'cos', 'lpar', '1', 'punt', '5', 'entre', '5', 'rpar'], pantalla: calc(D, ANGLE),
      text: '[mat]Coneixem el catet contigu ($1{,}5$ m) i la hipotenusa ($5$ m): $\\cos\\alpha=\\frac{1{,}5}{5}$\nPer trobar l\'angle, cal la funció inversa:\n$\\alpha=\\cos^{-1}(1{,}5\\div 5)$[/mat] [calc]Prem [[shift]] [[cos]] (a sobre hi ha cos⁻¹) i escriu, entre parèntesis, $1.5$ [[entre]] $5$.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ANGLE, '72.54239688'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és $72.54239688$.\nÉs en graus, perquè a la pantalla hi ha D.[/calc] [mat]R) L\'escala forma un angle d\'aproximadament $72{,}5^\\circ$ amb el terra, una mica menys del recomanat.[/mat]'},
    {error: true, tecles: ['ac', 'cos', 'lpar', '1', 'punt', '5', 'entre', '5', 'rpar'], pantalla: calc(D, ANGLE_ERROR),
      text: '[calc]!!Error típic!!:\nSi oblides la tecla [[shift]]: [[cos]] [[lpar]] $1.5$ [[entre]] $5$ [[rpar]].[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, ANGLE_ERROR, '0.999986292'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens $0.999986292$.[/calc] [mat]La calculadora ha seguit les teves instruccions, però sense la funció inversa ha calculat un cosinus, no un angle. Un angle d\'$1^\\circ$ voldria dir que l\'escala està gairebé estirada a terra![/mat]'},
  ],
},

);

})(Models.obre());
