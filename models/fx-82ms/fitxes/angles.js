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
  id: 'canvia-radians', bloc: 'angles', titol: 'Posa la calculadora en radians',
  enunciat: 'En un exercici d\'anàlisi amb trigonometria cal treballar en radians. Calcula $\\sin\\frac{\\pi}{6}$.',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: marca(calc(D), 'ang'),
      text: 'Ara la calculadora és en graus: a dalt hi ha una D. Si l\'angle porta π, o és la x d\'una funció, ha de ser R.'},
    {tecles: ['mode'], pantalla: mode(1, D),
      text: 'Prem [[mode]]: surten els modes de càlcul, {{COMP}}, {{SD}} i {{REG}}, amb el número de cada un a sota. Per calcular, sempre {{COMP}}.'},
    {tecles: ['mode'], pantalla: mode(2, D),
      text: 'Torna a prémer [[mode]]: ara surt la unitat dels angles, {{Deg}} (graus), {{Rad}} (radians) i {{Gra}} (graus centesimals: no els facis servir).'},
    {tecles: ['2'], pantalla: marca(calc(R), 'ang'),
      text: 'Prem el [[2]], el número de {{Rad}}: tornes a la pantalla de càlcul, i ara a dalt hi ha una R.'},
    {tecles: ['sin', 'lpar', 'shift', 'exp', 'entre', '6', 'rpar'], pantalla: calc(R, 'sin (π÷6)'),
      text: 'Escriu $\\sin(\\pi\\div 6)$: [[sin]], [[lpar]], π ([[shift]] [[exp]]), [[entre]], el 6 i [[rpar]]. Sense el parèntesi, la calculadora faria $(\\sin\\pi)\\div 6$.'},
    {tecles: ['igual'], pantalla: marca(calc(R, 'sin (π÷6)', '0.5'), 'resultat'),
      text: 'Prem [[igual]]: $\\sin\\frac{\\pi}{6}=0{,}5$. La fx-82MS sempre dona decimals: per veure $\\frac{1}{2}$, prem [[abc]].'},
  ],
  relacionades: ['error-angles', 'grau-puntual'],
},
{
  id: 'error-angles', bloc: 'angles', titol: 'Troba l\'error: el mode equivocat',
  enunciat: 'La Laia calcula $\\cos\\frac{\\pi}{3}$, que hauria de ser $\\frac{1}{2}$, i la calculadora li dona 0.999832979. Què ha passat?',
  inici: calc(D),
  passos: [
    {error: true, tecles: ['cos', 'lpar', 'shift', 'exp', 'entre', '3', 'rpar', 'igual'], pantalla: marca(calc(D, 'cos (π÷3)', '0.999832979'), 'resultat'),
      text: '!!Error típic!!: el que ha fet la Laia, $\\cos(\\pi\\div 3)$ i [[igual]]. Surt 0.999832979, i no 0.5.'},
    {error: true, tecles: [], pantalla: marca(calc(D, 'cos (π÷3)', '0.999832979'), 'ang'),
      text: 'Mira a dalt: D. La calculadora ha entès «π/3 graus», un angle d\'un grau escàs, i el seu cosinus és gairebé 1.'},
    {tecles: ['mode', 'mode', '2'], pantalla: marca(calc(R), 'ang'),
      text: 'Ho arreglem: [[mode]] dues vegades (fins a {{Deg}} {{Rad}} {{Gra}}) i el [[2]], {{Rad}}. Ara hi ha una R.'},
    {tecles: ['cos', 'lpar', 'shift', 'exp', 'entre', '3', 'rpar', 'igual'], pantalla: marca(calc(R, 'cos (π÷3)', '0.5'), 'resultat'),
      text: 'El mateix càlcul dona 0.5, és a dir, $\\frac{1}{2}$.'},
    {error: true, tecles: ['sin', '3', '0', 'igual'], pantalla: marca(calc(R, 'sin 30', '-0.988031624'), 'resultat'),
      text: '!!Error típic!!, el contrari: en radians, $\\sin 30$ és el sinus de 30 radians, −0.988031624. Si el 30 són graus, la calculadora ha de ser en D.'},
  ],
  relacionades: ['canvia-radians', 'grau-puntual'],
},
{
  id: 'grau-puntual', bloc: 'angles', titol: 'Un sol angle en radians, sense canviar el mode',
  enunciat: 'La calculadora és en graus (D) i només necessites un càlcul en radians: $\\sin\\frac{\\pi}{6}$.',
  inici: calc(D),
  passos: [
    {tecles: ['sin', 'lpar', 'shift', 'exp', 'entre', '6', 'rpar'], pantalla: calc(D, 'sin (π÷6)'),
      text: 'Escriu $\\sin(\\pi\\div 6)$, amb el parèntesi tancat: [[sin]], [[lpar]], π ([[shift]] [[exp]]), [[entre]], el 6 i [[rpar]].'},
    {tecles: ['shift', 'ans'], pantalla: drg(D),
      text: 'Prem [[shift]] i [[ans]] (a sobre hi ha DRG▸): surten les tres unitats, {{D}} (graus), {{R}} (radians) i {{G}} (graus centesimals), cadascuna amb el seu número.'},
    {tecles: ['2'], pantalla: calc(D, 'sin (π÷6)r'),
      text: 'Prem el [[2]], {{R}}: s\'escriu una r darrere del parèntesi, que vol dir «aquest angle és en radians».'},
    {tecles: ['igual'], pantalla: marca(calc(D, 'sin (π÷6)r', '0.5'), 'resultat'),
      text: 'Prem [[igual]]: 0.5, encara que la calculadora continua en D.'},
  ],
  relacionades: ['canvia-radians', 'error-angles'],
},

);

})(Models.obre('fx-82ms'));
