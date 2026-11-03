/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/angles.js — «Treballar en mode 'graus' o 'radiants'» (fx-82MS)
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Els mateixos temes i ids que a la fx-82SP CW.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

const {calc, marca, mode, drg} = M.guions;
const {D, R} = M.comu;

M.fitxes.push(

{
  id: 'canvia-radians',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: marca(calc(D), 'ang'),
      text: '[calc]Ara la calculadora és en graus: a dalt hi ha una D.[/calc] [mat]Si l\'angle porta π, o és la x d\'una funció, ha de ser R.[/mat]'},
    {tecles: ['mode'], pantalla: mode(1, D),
      text: '[calc]Prem [[mode]]: surten els modes de càlcul, {{COMP}}, {{SD}} i {{REG}}, amb el número de cada un a sota. Per calcular, sempre {{COMP}}.[/calc]'},
    {tecles: ['mode'], pantalla: mode(2, D),
      text: '[calc]Torna a prémer [[mode]]: ara surt la unitat dels angles, {{Deg}} (graus), {{Rad}} (radians) i {{Gra}} (graus centesimals: no els facis servir).[/calc]'},
    {tecles: ['2'], pantalla: marca(calc(R), 'ang'),
      text: '[calc]Prem el [[2]], el número de {{Rad}}: tornes a la pantalla de càlcul, i ara a dalt hi ha una R.[/calc]'},
    {tecles: ['sin', 'lpar', 'shift', 'exp', 'entre', '6', 'rpar'], pantalla: calc(R, 'sin (π÷6)'),
      text: '[calc]Escriu $\\sin(\\pi\\div 6)$: [[sin]], [[lpar]], π ([[shift]] [[exp]]), [[entre]], el 6 i [[rpar]]. Sense el parèntesi, la calculadora faria $(\\sin\\pi)\\div 6$.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(R, 'sin (π÷6)', '0.5'), 'resultat'),
      text: '[calc]Prem [[igual]]: $\\sin\\frac{\\pi}{6}=0{,}5$. La fx-82MS sempre dona decimals: per veure $\\frac{1}{2}$, prem [[abc]].[/calc]'},
  ],
  relacionades: ['error-angles', 'graus-radians'],
},
{
  id: 'error-angles',
  enunciat: 'La Laia calcula $\\cos\\frac{\\pi}{3}$, que hauria de ser $\\frac{1}{2}$, i la calculadora li dona 0.999832979. Què ha passat?',
  inici: calc(D),
  passos: [
    {error: true, tecles: ['cos', 'lpar', 'shift', 'exp', 'entre', '3', 'rpar', 'igual'], pantalla: marca(calc(D, 'cos (π÷3)', '0.999832979'), 'resultat'),
      text: '[calc]!!Error típic!!: el que ha fet la Laia, $\\cos(\\pi\\div 3)$ i [[igual]]. Surt 0.999832979, i no 0.5.[/calc]'},
    {error: true, tecles: [], pantalla: marca(calc(D, 'cos (π÷3)', '0.999832979'), 'ang'),
      text: '[calc]Mira a dalt: D. La calculadora ha entès «π/3 graus», un angle d\'un grau escàs, i el seu cosinus és gairebé 1.[/calc]'},
    {tecles: ['mode', 'mode', '2'], pantalla: marca(calc(R), 'ang'),
      text: '[calc]Ho arreglem: [[mode]] dues vegades (fins a {{Deg}} {{Rad}} {{Gra}}) i el [[2]], {{Rad}}. Ara hi ha una R.[/calc]'},
    {tecles: ['cos', 'lpar', 'shift', 'exp', 'entre', '3', 'rpar', 'igual'], pantalla: marca(calc(R, 'cos (π÷3)', '0.5'), 'resultat'),
      text: '[calc]El mateix càlcul dona 0.5, és a dir, $\\frac{1}{2}$.[/calc]'},
    {error: true, tecles: ['ac', 'sin', '3', '0', 'igual'], pantalla: marca(calc(R, 'sin 30', '-0.988031624'), 'resultat'),
      text: '[calc]!!Error típic!!, el contrari: esborra amb [[ac]] i calcula $\\sin 30$ en radians: és el sinus de 30 radians, −0.988031624. Si el 30 són graus, la calculadora ha de ser en D.[/calc]'},
  ],
  relacionades: ['canvia-radians', 'graus-radians'],
},
{
  id: 'graus-radians',
  inici: calc(D),
  passos: [
    {tecles: ['6', '0', 'per'], pantalla: calc(D, '60×'),
      text: '[mat]Per canviar d\'unitats es multiplica per un factor de conversió que val 1: $\\frac{\\pi\\ \\mathrm{rad}}{180^\\circ}$, perquè $\\pi$ rad i $180^\\circ$ són el mateix angle.[/mat] [calc]Escriu 60 i [[per]].[/calc]'},
    {tecles: ['shift', 'exp', 'entre', '1', '8', '0'], pantalla: calc(D, '60×π÷180'),
      text: '[mat]$60^\\circ\\cdot\\frac{\\pi\\ \\mathrm{rad}}{180^\\circ}$: els graus que vols treure van al denominador i se simplifiquen amb els de dalt; només hi queden radiants.[/mat] [calc]Escriu π ([[shift]] [[exp]]), [[entre]] i 180.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '60×π÷180', '1.047197551'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 1.047197551.[/calc] [mat]És el decimal de $\\frac{\\pi}{3}$: $60^\\circ=\\frac{\\pi}{3}$ rad $\\approx 1{,}047$ rad.[/mat]'},
    {tecles: ['ac', '6', '0', 'per', '1', '8', '0', 'entre', 'shift', 'exp'], pantalla: calc(D, '60×180÷π'), error: true,
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu el factor capgirat: 60 [[per]] 180 [[entre]] π.[/calc] [mat]$60^\\circ\\cdot\\frac{180^\\circ}{\\pi\\ \\mathrm{rad}}$: els graus queden a dalt tots dos cops i no se simplifiquen. El que surt ja no són radiants.[/mat]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '60×180÷π', '3437.746771'), 'resultat'), error: true,
      text: '[calc]Prem [[igual]]: surt 3437.746771.[/calc] [mat]No pot ser: 1 rad són uns $57^\\circ$, així que $60^\\circ$ ha de ser una mica més d\'1 rad. El factor de conversió estava capgirat: no s\'han simplificat els graus.[/mat]'},
  ],
  araTu: {
    enunciat: 'Expressa en radiants un angle de $135^\\circ$.',
    resultat: '\\frac{3\\pi}{4}\\approx 2{,}35619449',
    error: 'Multiplicar per $\\frac{180}{\\pi}$ en lloc de $\\frac{\\pi}{180}$: surt 7734.930234, perquè els graus no se simplifiquen.',
    inici: calc(D),
    passos: [
      {tecles: ['1', '3', '5', 'per', 'shift', 'exp', 'entre', '1', '8', '0', 'igual'], pantalla: marca(calc(D, '135×π÷180', '2.35619449'), 'resultat'),
        text: '[calc]135 [[per]] π [[entre]] 180 i [[igual]]: 2.35619449, el decimal de $\\frac{3\\pi}{4}$.[/calc]'},
    ],
  },
  relacionades: ['canvia-radians', 'error-angles'],
},

);

})(Models.obre());
