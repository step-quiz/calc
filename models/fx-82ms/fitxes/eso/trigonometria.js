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
      text: '[calc]!!Error típic!!: amb la R a dalt de la pantalla, escriu 12, [[tan]] i 35, com a l\'exercici de l\'arbre.[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(R, ARBRE, '5.685776645'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 5.685776645.[/calc] [mat]No és l\'altura de l\'arbre: la calculadora ha entès 35 radians, no 35°.[/mat]'},
    {tecles: ['mode'], pantalla: mode(1, R),
      text: '[calc]Ho arreglem. Prem [[mode]]: surten els modes de càlcul.[/calc]'},
    {tecles: ['mode'], pantalla: mode(2, R),
      text: '[calc]Torna a prémer [[mode]]: ara surt la unitat dels angles, {{Deg}} (graus), {{Rad}} (radians) i {{Gra}}.[/calc]'},
    {tecles: ['1'], pantalla: marca(calc(D), 'ang'),
      text: '[calc]Prem l\'[[1]], el número de {{Deg}}: tornes a la pantalla de càlcul, i ara a dalt hi ha una D.[/calc]'},
    {tecles: ['1', '2', 'tan', '3', '5'], pantalla: calc(D, ARBRE),
      text: '[calc]Torna a escriure 12, [[tan]] i 35.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ARBRE, '8.402490459'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 8.402490459.[/calc] [mat]Ara sí: l\'arbre fa uns 8,4 m d\'alt.[/mat]'},
  ],
},
{
  id: 'll4-7-37',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: marca(calc(D), 'ang'),
      text: '[calc]Abans de res, mira la pantalla: hi ha d\'haver una D (graus), perquè els angles d\'aquest problema són en graus. Si hi ha una R, mira la fitxa anterior.[/calc]'},
    {tecles: ['1', '2', 'tan', '3', '5'], pantalla: calc(D, ARBRE),
      text: '[mat]L\'altura és el catet oposat a l\'angle de 35°, i l\'ombra, el contigu: oposat i contigu → tangent. Altura $=12\\cdot\\tan 35^\\circ$.[/mat] [calc]Escriu 12, [[tan]] i 35. No cal el [[per]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ARBRE, '8.402490459'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 8.402490459.[/calc] [mat]La resposta correcta és que l\'arbre fa uns 8,4 m d\'alt.[/mat]'},
  ],
},
{
  id: 'll4-7-38',
  inici: calc(D),
  passos: [
    {tecles: ['5', 'sin', '6', '0'], pantalla: calc(D, ESCALA),
      text: '[mat]L\'escala és la hipotenusa i l\'altura, el catet oposat a l\'angle de 60°: oposat i hipotenusa → sinus. Altura $=5\\cdot\\sin 60^\\circ$.[/mat] [calc]Amb la D a la pantalla, escriu 5, [[sin]] i 60.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ESCALA, '4.330127019'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 4.330127019.[/calc] [mat]La resposta correcta és que l\'escala arriba a uns 4,33 m d\'altura.[/mat]'},
  ],
},
{
  id: 'll4-7-39',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'cos', 'lpar', '1', 'punt', '5', 'entre', '5', 'rpar'], pantalla: calc(D, ANGLE),
      text: '[mat]Coneixem el contigu (1,5) i la hipotenusa (5): $\\cos\\alpha=\\frac{1{,}5}{5}$. Per trobar l\'angle, $\\alpha=\\cos^{-1}(1{,}5\\div 5)$.[/mat] [calc]Prem [[shift]] [[cos]] (a sobre hi ha cos⁻¹) i escriu, entre parèntesis, 1.5 [[entre]] 5.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ANGLE, '72.54239688'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 72.54239688 (en graus, perquè a la pantalla hi ha D).[/calc] [mat]La resposta correcta és que l\'escala forma uns 72,5° amb el terra.[/mat]'},
    {error: true, tecles: ['ac', 'cos', 'lpar', '1', 'punt', '5', 'entre', '5', 'rpar'], pantalla: calc(D, ANGLE_ERROR),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu-ho sense [[shift]]: [[cos]] i, entre parèntesis, 1.5 [[entre]] 5.[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, ANGLE_ERROR, '0.999986292'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 0.999986292.[/calc] [mat]No és un angle: és el cosinus d\'un angle de 0,3°. Per trobar un angle a partir d\'una raó, cal la tecla inversa, [[shift]] [[cos]].[/mat]'},
  ],
},

);

})(Models.obre());
