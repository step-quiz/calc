/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/eso/trigonometria.js — ESO · bloc «Trigonometria»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Normes d'ESO: ARCHITECTURE.md, «Writing fitxes». Exercicis del llibre de 4t
   d'ESO del departament (step-quiz/llibre, unitat 7 «Trigonometria:
   mesurar l'inabastable», activitat 4, exercicis 37, 38 i 39; les
   solucions són les del full del professorat). Id ll4-<unitat>-<exercici>.
   La calculadora, en graus (D).
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca, config, configCalcul, unitatAngular} = M.guions;
const {D, R} = M.comu;

const ARBRE = '12\\tan(35)';
const ESCALA = '5\\mathrm{sen}(60)';
const ANGLE = '\\mathrm{Arccos}(1.5\\div 5)', ANGLE_ERROR = '\\cos(1.5\\div 5)';

M.fitxes.push(

{
  id: 'eso-posa-graus',
  inici: calc(R),
  passos: [
    {error: true, tecles: ['1', '2', 'tan', '3', '5', 'rpar'], pantalla: calc(R, ARBRE),
      text: '[calc]!!Error típic!!:\nSi calcules amb la R a la barra: $12$ [[tan]] $35$ [[rpar]].[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(R, ARBRE, '5.685776645'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $5.685776645$.[/calc] [mat]La calculadora ha seguit bé les instruccions, però ha entès $35$ radians, i no $35^\\circ$.[/mat]'},
    {tecles: ['settings'], pantalla: config(0),
      text: '[calc]Ho arreglem. Prem [[settings]]: menú CONFIG.[/calc]'},
    {tecles: ['ok'], pantalla: configCalcul(0),
      text: '[calc]Entra a {{Config cálculo}} amb [[ok]].[/calc]'},
    {tecles: ['down'], pantalla: configCalcul(1),
      text: '[calc]Baixa a {{Unidad angular}} amb [[down]].[/calc]'},
    {tecles: ['ok'], pantalla: unitatAngular(1),
      text: '[calc]Prem [[ok]]. El ◉ és a {{Radián}}: per això hi ha la R.[/calc]'},
    {tecles: ['up'], pantalla: unitatAngular(1, 0),
      text: '[calc]Puja a {{Grado sexag (D)}} (graus) amb [[up]].[/calc]'},
    {tecles: ['ok'], pantalla: unitatAngular(0),
      text: '[calc]Prem [[ok]]: el ◉ passa a {{Grado sexag (D)}}.[/calc]'},
    {tecles: ['ac'], pantalla: marca(calc(D, '', '', {hist: true}), 'ang'),
      text: '[calc]Prem [[ac]] per tornar a calcular.\nA la barra ara hi ha D.[/calc]'},
    {tecles: ['1', '2', 'tan', '3', '5', 'rpar'], pantalla: calc(D, ARBRE, '', {hist: true}),
      text: '[calc]Torna a escriure $12$ [[tan]] $35$ [[rpar]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ARBRE, '8.402490459'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $8.402490459$.[/calc] [mat]R) Ara sí: l\'arbre fa aproximadament $8{,}4$ m d\'altura.[/mat]'},
  ],
},
{
  id: 'll4-7-37',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: marca(calc(D), 'ang'),
      text: '[calc]Abans de res, mira la barra: hi ha d\'haver una D (graus), perquè els angles d\'aquest problema són en graus.\nSi hi ha una R, mira la fitxa anterior.[/calc]'},
    {tecles: ['1', '2', 'tan', '3', '5', 'rpar'], pantalla: calc(D, ARBRE),
      text: '[mat]Podem formar un triangle rectangle, on:\n• l\'ombra ($12$ m) és el catet contigu a l\'angle de $35^\\circ$;\n• l\'altura de l\'arbre és el catet oposat.\nOposat i contigu → tangent. L\'altura es calcula així:\n$h=12\\cdot\\tan 35^\\circ$[/mat] [calc]Escriu $12$, [[tan]], $35$ i [[rpar]].\nNo cal el [[per]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ARBRE, '8.402490459'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $8.402490459$.[/calc] [mat]R) L\'arbre fa aproximadament $8{,}4$ m d\'altura.[/mat]'},
  ],
},
{
  id: 'll4-7-38',
  inici: calc(D),
  passos: [
    {tecles: ['5', 'sen', '6', '0', 'rpar'], pantalla: calc(D, ESCALA),
      text: '[mat]Podem formar un triangle rectangle, on:\n• la pròpia escala ($5$ m) és la hipotenusa;\n• l\'altura a la qual arriba és el catet oposat a l\'angle de $60^\\circ$.\nOposat i hipotenusa → sinus. L\'altura es calcula així:\n$h=5\\cdot\\sin 60^\\circ$[/mat] [calc]Amb la D a la barra, escriu $5$, [[sen]], $60$ i [[rpar]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ESCALA, '\\frac{5\\sqrt{3}}{2}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $\\frac{5\\sqrt{3}}{2}$.\nSi surt en forma d\'arrel és perquè la calculadora està configurada per donar resultats exactes.\nSi estigués configurada per donar decimals, sortiria $4.330127019$.[/calc] [mat]$\\frac{5\\sqrt{3}}{2}\\simeq 4{,}33$ m[/mat]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, ESCALA, '4.330127019'), 'resultat'),
      text: '[calc]Per obtenir l\'expressió decimal de l\'arrel, prem [[shift]] [[exe]] (≈).\nObtens $4.330127019$.[/calc] [mat]R) L\'escala arriba aproximadament a $4{,}33$ m d\'altura.[/mat]'},
  ],
},
{
  id: 'll4-7-39',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'cos', '1', 'punt', '5', 'entre', '5', 'rpar'], pantalla: calc(D, ANGLE),
      text: '[mat]Coneixem el catet contigu ($1{,}5$ m) i la hipotenusa ($5$ m): $\\cos\\alpha=\\frac{1{,}5}{5}$\nPer trobar l\'angle, cal la funció inversa:\n$\\alpha=\\cos^{-1}(1{,}5\\div 5)$[/mat] [calc]Prem [[shift]] [[cos]] (a sobre hi ha Arccos), escriu $1.5$ [[entre]] $5$ i tanca amb [[rpar]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ANGLE, '72.54239688'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $72.54239688$.\nÉs en graus, perquè a la barra hi ha D.[/calc] [mat]R) L\'escala forma un angle d\'aproximadament $72{,}5^\\circ$ amb el terra, una mica menys del recomanat.[/mat]'},
    {error: true, tecles: ['ac', 'cos', '1', 'punt', '5', 'entre', '5', 'rpar'], pantalla: calc(D, ANGLE_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi oblides la tecla [[shift]]: [[cos]] $1.5$ [[entre]] $5$ [[rpar]].[/calc]'},
    {error: true, tecles: ['shift', 'exe'], pantalla: marca(calc(D, ANGLE_ERROR, '0.9999862922'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]] (≈): obtens $0.9999862922$.[/calc] [mat]La calculadora ha seguit les teves instruccions, però sense la funció inversa ha calculat un cosinus, no un angle. Un angle d\'$1^\\circ$ voldria dir que l\'escala està gairebé estirada a terra![/mat]'},
  ],
},

);

})(Models.obre());
