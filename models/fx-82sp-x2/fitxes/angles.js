/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-x2/fitxes/angles.js — Les fitxes del bloc «Treballar en mode 'graus' o 'radiants'»
   ───────────────────────────────────────────────────────────────────
   Les fitxes de la fx-82SP CW (el mateix fitxer, a models/fx-82sp-cw/), amb les
   tecles de la fx-82/85SP X II (les mateixes que la fx-570/991SP X II): la tecla = (id «exe»), el signe negatiu (−)
   («neg»), SHIFT ×10ˣ = π, SHIFT (−) = log, ln, SHIFT x■ = arrel d'índex n,
   S⇔D i els menús numerats (SHIFT MENU, OPTN).
   NOMÉS DADES. El format d'una fitxa és a models/fx-82sp-cw/fitxes/blocs.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {IND, ind, calc, marca, config, configCalcul, entradaSortida, unitatAngular,
  formatNumero, normal, reiniciar, format, catalog, angCoordSexag, home, missatge, definicio, menuFuncio,
  probabilidad, tools, catalogVerificar} = M.guions;
const X2 = M.x2;
const {SEN45, ARREL2_2, D, R, FIX} = M.comu;

/** Convertir de graus a radiants: el factor de conversió ben posat i capgirat. */
const FACTOR = '60\\times\\frac{\\pi}{180}';
const CAPGIRAT = '60\\times\\frac{180}{\\pi}';

M.fitxes.push(

{
  id: 'canvia-radians',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: marca(calc(D), 'ang'),
      text: '[calc]Ara la calculadora és en graus: a la barra hi ha D.[/calc] [mat]Si l\'angle porta π, o és la x d\'una funció, ha de ser R.[/mat]'},
    {tecles: ['shift', 'menu'], pantalla: X2.config(),
      text: '[calc]Prem [[shift]] i [[menu]] (a sobre hi ha CONFIG): el menú de configuració. Les opcions es trien prement el seu número.[/calc]'},
    {tecles: ['2'], pantalla: X2.menu('x2-unitat'),
      text: '[calc]Prem 2: {{2:Unidad angular}}. {{1:Grado sexag (D)}} són els graus sexagesimals.[/calc]'},
    {tecles: ['2'], pantalla: marca(calc(R), 'ang'),
      text: '[calc]Prem 2: {{2:Radián}}. La calculadora torna a la pantalla de càlcul, i a la barra ara hi ha R.[/calc]'},
    {tecles: ['sen', 'shift', 'exp', 'entre', '6', 'rpar'], pantalla: calc(R, '\\mathrm{sen}(\\pi\\div 6)'),
      text: '[calc]Escriu $\\mathrm{sen}(\\pi\\div 6)$. La π és [[shift]] [[exp]]. A la calculadora, el sinus (sin) es diu sen.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(R, '\\mathrm{sen}(\\pi\\div 6)', '\\frac{1}{2}'), 'resultat'),
      text: '[calc]Prem [[exe]]: $\\sin\\frac{\\pi}{6}=\\frac{1}{2}$. Surt exacte perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 0.5.[/calc]'},
  ],
  araTu: {
    enunciat: 'Ara que la calculadora és en radians (R), calcula $\\cos\\frac{\\pi}{4}$.',
    resultat: '\\frac{\\sqrt{2}}{2}',
    error: 'Calcular-ho amb la calculadora en graus (D): surt 0.9999060498, el cosinus de π/4 graus.',
    inici: calc(R),
    passos: [
      {tecles: ['cos', 'shift', 'exp', 'entre', '4', 'rpar'], pantalla: calc(R, '\\cos(\\pi\\div 4)'),
        text: '[calc]Amb R a la barra, escriu $\\cos(\\pi\\div 4)$. La π és [[shift]] [[exp]].[/calc]'},
      {tecles: ['exe'], pantalla: marca(calc(R, '\\cos(\\pi\\div 4)', '\\frac{\\sqrt{2}}{2}'), 'resultat'),
        text: '[calc]Prem [[exe]]: $\\frac{\\sqrt{2}}{2}$.[/calc]'},
    ],
  },
  relacionades: ['error-angles', 'graus-radians', 'mode-decimal'],
},
{
  id: 'error-angles',
  inici: calc(D),
  passos: [
    {error: true, tecles: ['cos', 'shift', 'exp', 'entre', '3', 'rpar', 'exe'], pantalla: marca(calc(D, '\\cos(\\pi\\div 3)', '0.9998329795'), 'resultat'),
      text: '[calc]!!Error típic!!: el que ha fet la Laia, $\\cos(\\pi\\div 3)$ i [[exe]]. Surt 0.9998329795, i no $\\frac{1}{2}$.[/calc]'},
    {error: true, tecles: [], pantalla: marca(calc(D, '\\cos(\\pi\\div 3)', '0.9998329795'), 'ang'),
      text: '[calc]Mira la barra: D. La calculadora ha entès «π/3 graus», un angle d\'un grau escàs, i el seu cosinus és gairebé 1.[/calc]'},
    {tecles: ['shift', 'menu', '2'], pantalla: X2.menu('x2-unitat'),
      text: '[calc]Ho arreglem: [[shift]] [[menu]] (CONFIG) i 2 ({{2:Unidad angular}}).[/calc]'},
    {tecles: ['2'], pantalla: marca(calc(R, '', '', {hist: true}), 'ang'),
      text: '[calc]Prem 2 ({{2:Radián}}): tornes a la pantalla de càlcul, i ara hi ha R.[/calc]'},
    {tecles: ['cos', 'shift', 'exp', 'entre', '3', 'rpar', 'exe'], pantalla: marca(calc(R, '\\cos(\\pi\\div 3)', '\\frac{1}{2}'), 'resultat'),
      text: '[calc]El mateix càlcul dona $\\frac{1}{2}$. Surt exacte perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 0.5.[/calc]'},
    {error: true, tecles: ['ac', 'sen', '3', '0', 'rpar', 'exe'], pantalla: marca(calc(R, '\\mathrm{sen}(30)', '-0.9880316241'), 'resultat'),
      text: '[calc]!!Error típic!!, el contrari: esborra amb [[ac]] i calcula $\\mathrm{sen}(30)$ en radians: és el sinus de 30 radians, −0.9880316241. Si el 30 són graus, la calculadora ha de ser en D.[/calc]'},
  ],
  araTu: {
    enunciat: 'Amb la calculadora en radians (R a la barra), calcula $\\cos\\frac{2\\pi}{3}$.',
    resultat: '-\\frac{1}{2}',
    error: 'Calcular-ho amb la calculadora en graus (D): surt 0.9993319736, el cosinus d\'un angle de poc més de 2 graus.',
    inici: calc(R),
    passos: [
      {tecles: ['cos', 'frac', '2', 'shift', 'exp', 'down', '3', 'right', 'rpar'], pantalla: calc(R, '\\cos(\\frac{2\\pi}{3})'),
        text: '[calc]Amb R a la barra: [[cos]], la fracció amb [[frac]] (2π és el 2 i [[shift]] [[exp]]), [[down]], el 3, [[right]] per sortir-ne i [[rpar]].[/calc]'},
      {tecles: ['exe'], pantalla: marca(calc(R, '\\cos(\\frac{2\\pi}{3})', '-\\frac{1}{2}'), 'resultat'),
        text: '[calc]Prem [[exe]]: $-\\frac{1}{2}$, el resultat correcte.[/calc]'},
    ],
  },
  relacionades: ['canvia-radians', 'graus-radians', 'mode-decimal'],
},
{
  id: 'graus-radians',
  inici: calc(D),
  passos: [
    {tecles: ['6', '0', 'per'], pantalla: calc(D, '60\\times'),
      text: '[mat]Per canviar d\'unitats es multiplica per un factor de conversió que val 1: $\\frac{\\pi\\ \\mathrm{rad}}{180^\\circ}$, perquè $\\pi$ rad i $180^\\circ$ són el mateix angle.[/mat] [calc]Escriu 60 i [[per]].[/calc]'},
    {tecles: ['frac', 'shift', 'exp', 'down', '1', '8', '0'], pantalla: calc(D, FACTOR),
      text: '[mat]$60^\\circ\\cdot\\frac{\\pi\\ \\mathrm{rad}}{180^\\circ}$: els graus que vols treure van al denominador i se simplifiquen amb els de dalt; només hi queden radiants.[/mat] [calc]Prem [[frac]], escriu π ([[shift]] [[exp]]) al numerador i, amb [[down]], 180 al denominador.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, FACTOR, '\\frac{\\pi}{3}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $\\frac{\\pi}{3}$. Surt exacte perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 1.047197551.[/calc] [mat]$60^\\circ=\\frac{\\pi}{3}$ rad.[/mat]'},
    {tecles: ['ac', '6', '0', 'per', 'frac', '1', '8', '0', 'down', 'shift', 'exp'], pantalla: calc(D, CAPGIRAT, '', {hist: true}), error: true,
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu el factor capgirat, $\\frac{180}{\\pi}$.[/calc] [mat]$60^\\circ\\cdot\\frac{180^\\circ}{\\pi\\ \\mathrm{rad}}$: els graus queden a dalt tots dos cops i no se simplifiquen. El que surt ja no són radiants.[/mat]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, CAPGIRAT, '3437.746771'), 'resultat'), error: true,
      text: '[calc]Prem [[shift]] [[exe]] (≈): surt 3437.746771.[/calc] [mat]No pot ser: 1 rad són uns $57^\\circ$, així que $60^\\circ$ ha de ser una mica més d\'1 rad. El factor de conversió estava capgirat: no s\'han simplificat els graus.[/mat]'},
  ],
  araTu: {
    enunciat: 'Expressa en radiants un angle de $135^\\circ$.',
    resultat: '\\frac{3\\pi}{4}',
    error: 'Multiplicar per $\\frac{180}{\\pi}$ en lloc de $\\frac{\\pi}{180}$: surt 7734.930234, perquè els graus no se simplifiquen.',
    inici: calc(D),
    passos: [
      {tecles: ['1', '3', '5', 'per', 'frac', 'shift', 'exp', 'down', '1', '8', '0'], pantalla: calc(D, '135\\times\\frac{\\pi}{180}'),
        text: '[calc]135 [[per]] i la fracció $\\frac{\\pi}{180}$ amb [[frac]]: π a dalt i 180 a baix.[/calc]'},
      {tecles: ['exe'], pantalla: marca(calc(D, '135\\times\\frac{\\pi}{180}', '\\frac{3\\pi}{4}'), 'resultat'),
        text: '[calc][[exe]]: $\\frac{3\\pi}{4}$.[/calc] [mat]$135^\\circ=\\frac{3\\pi}{4}$ rad.[/mat]'},
    ],
  },
  relacionades: ['canvia-radians', 'error-angles', 'mode-decimal'],
},

);

})(Models.obre());
