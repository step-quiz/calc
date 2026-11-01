/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/eso/trigonometria.js — ESO · bloc «Trigonometria»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Normes: HANDOFF-ESO.md §10. Exercicis del llibre de 4t
   d'ESO del departament (step-quiz/llibre, unitat 7 «Trigonometria:
   mesurar l'inabastable», activitat 4, exercicis 37, 38 i 39; les
   solucions són les del full del professorat). Id ll4-<unitat>-<exercici>.
   La calculadora, en graus (D).
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca} = M.guions;
const {D} = M.comu;

const ARBRE = '12\\tan(35)';
const ESCALA = '5\\mathrm{sen}(60)';
const ANGLE = '\\mathrm{Arccos}(1.5\\div 5)', ANGLE_ERROR = '\\cos(1.5\\div 5)';

M.fitxes.push(

{
  id: 'll4-7-37', bloc: 'eso-trigonometria', titol: 'L\'altura d\'un arbre: la tangent', font: 'Llibre 4t ESO, unitat 7, exercici 37',
  enunciat: 'Un arbre fa una ombra a terra quan els raigs del sol arriben inclinats:\n• l\'ombra fa 12 m;\n• els raigs del sol formen 35° amb el terra.\nQuant fa d\'alt l\'arbre?',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: marca(calc(D), 'ang'),
      text: '[calc]Abans de res, mira la barra: hi ha d\'haver una D (graus), perquè els angles d\'aquest problema són en graus.[/calc]'},
    {tecles: ['1', '2', 'tan', '3', '5', 'rpar'], pantalla: calc(D, ARBRE),
      text: '[mat]L\'altura és el catet oposat a l\'angle de 35°, i l\'ombra, el contigu: oposat i contigu → tangent. Altura $=12\\cdot\\tan 35^\\circ$.[/mat] [calc]Escriu 12, [[tan]], 35 i [[rpar]]. No cal el [[per]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ARBRE, '8.402490459'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és 8.402490459.[/calc] [mat]La resposta correcta és que l\'arbre fa uns 8,4 m d\'alt.[/mat]'},
  ],
},
{
  id: 'll4-7-38', bloc: 'eso-trigonometria', titol: 'L\'escala recolzada: el sinus', font: 'Llibre 4t ESO, unitat 7, exercici 38',
  enunciat: 'Una escala està recolzada a la paret:\n• l\'escala fa 5 m de llarg;\n• forma un angle de 60° amb el terra.\nA quina altura arriba a la paret?',
  inici: calc(D),
  passos: [
    {tecles: ['5', 'sen', '6', '0', 'rpar'], pantalla: calc(D, ESCALA),
      text: '[mat]L\'escala és la hipotenusa i l\'altura, el catet oposat a l\'angle de 60°: oposat i hipotenusa → sinus. Altura $=5\\cdot\\sin 60^\\circ$.[/mat] [calc]Amb la D a la barra, escriu 5, [[sen]], 60 i [[rpar]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ESCALA, '\\frac{5\\sqrt{3}}{2}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $\\frac{5\\sqrt{3}}{2}$. Surt exacte perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 4.330127019.[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, ESCALA, '4.330127019'), 'resultat'),
      text: '[calc]Per tenir-lo en decimal, prem [[shift]] i [[exe]] (≈): obtens 4.330127019.[/calc] [mat]La resposta correcta és que l\'escala arriba a uns 4,33 m d\'altura.[/mat]'},
  ],
},
{
  id: 'll4-7-39', bloc: 'eso-trigonometria', titol: 'L\'angle d\'una escala: la tecla inversa', font: 'Llibre 4t ESO, unitat 7, exercici 39',
  enunciat: 'Una escala està recolzada a la paret:\n• l\'escala fa 5 m de llarg;\n• la base és a 1,5 m de la paret.\nQuin angle forma l\'escala amb el terra?',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'cos', '1', 'punt', '5', 'entre', '5', 'rpar'], pantalla: calc(D, ANGLE),
      text: '[mat]Coneixem el contigu (1,5) i la hipotenusa (5): $\\cos\\alpha=\\frac{1{,}5}{5}$. Per trobar l\'angle, $\\alpha=\\cos^{-1}(1{,}5\\div 5)$.[/mat] [calc]Prem [[shift]] [[cos]] (a sobre hi ha Arccos), escriu 1.5 [[entre]] 5 i tanca amb [[rpar]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ANGLE, '72.54239688'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és 72.54239688 (en graus, perquè a la barra hi ha D).[/calc] [mat]La resposta correcta és que l\'escala forma uns 72,5° amb el terra.[/mat]'},
    {error: true, tecles: ['ac', 'cos', '1', 'punt', '5', 'entre', '5', 'rpar'], pantalla: calc(D, ANGLE_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu-ho sense [[shift]]: [[cos]], 1.5 [[entre]] 5 i [[rpar]].[/calc]'},
    {error: true, tecles: ['shift', 'exe'], pantalla: marca(calc(D, ANGLE_ERROR, '0.9999862922'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]]: obtens 0.9999862922.[/calc] [mat]No és un angle: és el cosinus d\'un angle de 0,3°. Per trobar un angle a partir d\'una raó, cal la tecla inversa, [[shift]] [[cos]].[/mat]'},
  ],
},

);

})(Models.obre('fx-82sp-cw'));
