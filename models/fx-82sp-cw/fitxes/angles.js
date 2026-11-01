/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/angles.js — Les fitxes del bloc «Treballar en mode 'graus' o 'radiants'»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. El format d'una fitxa és a fitxes/blocs.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {IND, ind, calc, marca, config, configCalcul, entradaSortida, unitatAngular,
  formatNumero, normal, reiniciar, format, catalog, angCoordSexag, home, missatge, definicio, menuFuncio,
  probabilidad, tools, catalogVerificar} = M.guions;
const {SEN45, ARREL2_2, D, R, FIX} = M.comu;

M.fitxes.push(

{
  id: 'canvia-radians', bloc: 'angles', titol: 'Posa la calculadora en radians',
  enunciat: 'En un exercici d\'anàlisi amb trigonometria cal treballar en radians. Calcula $\\sin\\frac{\\pi}{6}$.',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: marca(calc(D), 'ang'),
      text: 'Ara la calculadora és en graus: a la barra hi ha D. Si l\'angle porta π, o és la x d\'una funció, ha de ser R.'},
    {tecles: ['settings'], pantalla: config(0),
      text: 'Prem [[settings]]: menú CONFIG.'},
    {tecles: ['ok'], pantalla: configCalcul(0),
      text: 'Entra a {{Config cálculo}} amb [[ok]].'},
    {tecles: ['down'], pantalla: configCalcul(1),
      text: 'Baixa a {{Unidad angular}} amb [[down]].'},
    {tecles: ['ok'], pantalla: unitatAngular(0),
      text: 'Prem [[ok]]. El ◉ és a {{Grado sexag (D)}}: graus sexagesimals.'},
    {tecles: ['down'], pantalla: unitatAngular(0, 1),
      text: 'Baixa a {{Radián}}.'},
    {tecles: ['ok'], pantalla: unitatAngular(1),
      text: 'Prem [[ok]]: el ◉ passa a {{Radián}}.'},
    {tecles: ['ac'], pantalla: marca(calc(R), 'ang'),
      text: 'Prem [[ac]] per tornar a calcular. A la barra ara hi ha R.'},
    {tecles: ['sen', 'shift', '7', 'entre', '6', 'rpar'], pantalla: calc(R, '\\mathrm{sen}(\\pi\\div 6)'),
      text: 'Escriu $\\mathrm{sen}(\\pi\\div 6)$. La π és [[shift]] [[7]]. A la calculadora, el sinus (sin) es diu sen.'},
    {tecles: ['exe'], pantalla: marca(calc(R, '\\mathrm{sen}(\\pi\\div 6)', '\\frac{1}{2}'), 'resultat'),
      text: 'Prem [[exe]]: $\\sin\\frac{\\pi}{6}=\\frac{1}{2}$. Surt exacte perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 0.5.'},
  ],
  araTu: {
    enunciat: 'Ara que la calculadora és en radians (R), calcula $\\cos\\frac{\\pi}{4}$.',
    resultat: '\\frac{\\sqrt{2}}{2}',
    error: 'Calcular-ho amb la calculadora en graus (D): surt 0.9999060498, el cosinus de π/4 graus.',
    inici: calc(R),
    passos: [
      {tecles: ['cos', 'shift', '7', 'entre', '4', 'rpar'], pantalla: calc(R, '\\cos(\\pi\\div 4)'),
        text: 'Amb R a la barra, escriu $\\cos(\\pi\\div 4)$. La π és [[shift]] [[7]].'},
      {tecles: ['exe'], pantalla: marca(calc(R, '\\cos(\\pi\\div 4)', '\\frac{\\sqrt{2}}{2}'), 'resultat'),
        text: 'Prem [[exe]]: $\\frac{\\sqrt{2}}{2}$.'},
    ],
  },
  relacionades: ['error-angles', 'grau-puntual', 'mode-decimal'],
},
{
  id: 'error-angles', bloc: 'angles', titol: 'Troba l\'error: el mode equivocat',
  enunciat: 'La Laia calcula $\\cos\\frac{\\pi}{3}$, que hauria de ser $\\frac{1}{2}$, i la calculadora li dona 0.9998329795. Què ha passat?',
  inici: calc(D),
  passos: [
    {error: true, tecles: ['cos', 'shift', '7', 'entre', '3', 'rpar', 'exe'], pantalla: marca(calc(D, '\\cos(\\pi\\div 3)', '0.9998329795'), 'resultat'),
      text: '!!Error típic!!: el que ha fet la Laia, $\\cos(\\pi\\div 3)$ i [[exe]]. Surt 0.9998329795, i no $\\frac{1}{2}$.'},
    {error: true, tecles: [], pantalla: marca(calc(D, '\\cos(\\pi\\div 3)', '0.9998329795'), 'ang'),
      text: 'Mira la barra: D. La calculadora ha entès «π/3 graus», un angle d\'un grau escàs, i el seu cosinus és gairebé 1.'},
    {tecles: ['settings', 'ok', 'down', 'ok'], pantalla: unitatAngular(0),
      text: 'Ho arreglem: [[settings]], [[ok]] ({{Config cálculo}}), [[down]] ({{Unidad angular}}) i [[ok]].'},
    {tecles: ['down', 'ok'], pantalla: unitatAngular(1),
      text: 'Tria {{Radián}}: [[down]] i [[ok]].'},
    {tecles: ['ac'], pantalla: marca(calc(R, '', '', {hist: true}), 'ang'),
      text: 'Prem [[ac]]. Ara hi ha R.'},
    {tecles: ['cos', 'shift', '7', 'entre', '3', 'rpar', 'exe'], pantalla: marca(calc(R, '\\cos(\\pi\\div 3)', '\\frac{1}{2}'), 'resultat'),
      text: 'El mateix càlcul dona $\\frac{1}{2}$. Surt exacte perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 0.5.'},
    {error: true, tecles: ['sen', '3', '0', 'rpar', 'exe'], pantalla: marca(calc(R, '\\mathrm{sen}(30)', '-0.9880316241'), 'resultat'),
      text: '!!Error típic!!, el contrari: en radians, $\\mathrm{sen}(30)$ és el sinus de 30 radians, −0.9880316241. Si el 30 són graus, la calculadora ha de ser en D.'},
  ],
  araTu: {
    enunciat: 'Amb la calculadora en radians (R a la barra), calcula $\\cos\\frac{2\\pi}{3}$.',
    resultat: '-\\frac{1}{2}',
    error: 'Calcular-ho amb la calculadora en graus (D): surt 0.9993319736, el cosinus d\'un angle de poc més de 2 graus.',
    inici: calc(R),
    passos: [
      {tecles: ['cos', 'frac', '2', 'shift', '7', 'down', '3', 'right', 'rpar'], pantalla: calc(R, '\\cos(\\frac{2\\pi}{3})'),
        text: 'Amb R a la barra: [[cos]], la fracció amb [[frac]] (2π és el 2 i [[shift]] [[7]]), [[down]], el 3, [[right]] per sortir-ne i [[rpar]].'},
      {tecles: ['exe'], pantalla: marca(calc(R, '\\cos(\\frac{2\\pi}{3})', '-\\frac{1}{2}'), 'resultat'),
        text: 'Prem [[exe]]: $-\\frac{1}{2}$, el resultat correcte.'},
    ],
  },
  relacionades: ['canvia-radians', 'grau-puntual', 'mode-decimal'],
},
{
  id: 'grau-puntual', bloc: 'angles', titol: 'Un sol angle en radians, sense canviar el mode',
  enunciat: 'La calculadora és en graus (D) i només necessites un càlcul en radians: $\\sin\\frac{\\pi}{6}$.',
  inici: calc(D),
  passos: [
    {tecles: ['sen', 'frac', 'shift', '7', 'down', '6', 'right'], pantalla: calc(D, '\\mathrm{sen}(\\frac{\\pi}{6}'),
      text: 'Escriu [[sen]] i la fracció $\\frac{\\pi}{6}$ amb la tecla [[frac]]: π, [[down]], 6 i [[right]] per sortir de la fracció.'},
    {tecles: ['catalog'], pantalla: catalog(0),
      text: 'Prem [[catalog]]: és el menú amb totes les funcions, agrupades.'},
    {tecles: ['down', 'down', 'down'], pantalla: catalog(3),
      text: 'Baixa fins a {{Ang/Coord/Sexag}} (angles, coordenades i graus sexagesimals).'},
    {tecles: ['ok'], pantalla: angCoordSexag(0),
      text: 'Prem [[ok]]. Hi ha els símbols de les unitats: {{Grados}} (°), {{Radianes}} (r) i {{Gradianes}} (g).'},
    {tecles: ['down', 'ok'], pantalla: calc(D, '\\mathrm{sen}({\\frac{\\pi}{6}}^{\\mathrm{r}}'),
      text: 'Tria {{Radianes}}: la r s\'escriu darrere la fracció i vol dir «aquest angle és en radians».'},
    {tecles: ['rpar', 'exe'], pantalla: marca(calc(D, '\\mathrm{sen}({\\frac{\\pi}{6}}^{\\mathrm{r}})', '\\frac{1}{2}'), 'resultat'),
      parcials: {0: calc(D, '\\mathrm{sen}({\\frac{\\pi}{6}}^{\\mathrm{r}})')},   // la r ve d'un menú: el simulador no sap on és
      text: 'Tanca el parèntesi i prem [[exe]]: $\\frac{1}{2}$, encara que la calculadora continua en D. Surt exacte perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 0.5.'},
  ],
  araTu: {
    enunciat: 'Amb la calculadora en graus (D), calcula $\\cos\\frac{\\pi}{3}$ sense canviar el mode.',
    resultat: '\\frac{1}{2}',
    error: 'Oblidar la r: surt 0.9998329795, el cosinus de π/3 graus.',
    inici: calc(D),
    passos: [
      {tecles: ['cos', 'frac', 'shift', '7', 'down', '3', 'right'], pantalla: calc(D, '\\cos(\\frac{\\pi}{3}'),
        text: '[[cos]] i la fracció $\\frac{\\pi}{3}$ amb [[frac]]; surt-ne amb [[right]].'},
      {tecles: ['catalog', 'down', 'down', 'down', 'ok'], pantalla: angCoordSexag(0),
        text: '[[catalog]], baixa fins a {{Ang/Coord/Sexag}} i [[ok]].'},
      {tecles: ['down', 'ok'], pantalla: calc(D, '\\cos({\\frac{\\pi}{3}}^{\\mathrm{r}}'),
        text: 'Tria {{Radianes}}: s\'escriu la r.'},
      {tecles: ['rpar', 'exe'], pantalla: marca(calc(D, '\\cos({\\frac{\\pi}{3}}^{\\mathrm{r}})', '\\frac{1}{2}'), 'resultat'),
        parcials: {0: calc(D, '\\cos({\\frac{\\pi}{3}}^{\\mathrm{r}})')},   // la r ve d'un menú: el simulador no sap on és
        text: '[[rpar]] i [[exe]]: $\\frac{1}{2}$, amb la calculadora encara en D.'},
    ],
  },
  relacionades: ['canvia-radians', 'error-angles', 'mode-decimal'],
},

);

})(Models.obre('fx-82sp-cw'));
