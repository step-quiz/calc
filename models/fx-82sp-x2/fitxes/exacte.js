/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-x2/fitxes/exacte.js — Les fitxes del bloc «Treballar en mode 'exacte' o 'decimal'»
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

M.fitxes.push(

{
  id: 'indicadors',
  inici: calc(D, SEN45, ARREL2_2),
  passos: [
    {tecles: [], pantalla: marca(calc(D, SEN45, ARREL2_2), 'mat'),
      text: '[calc]Aquesta icona vol dir que escrius en format matemàtic, com al llibre: les fraccions i les arrels es veuen tal com les escrius. Aquí el resultat surt exacte perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 0.7071067812.[/calc]'},
    {tecles: [], pantalla: marca(calc(D, SEN45, ARREL2_2), 'ang'),
      text: '[calc]La lletra amb fons fosc és la unitat dels angles: D = graus, R = radians, G = graus centesimals (aquests, no els facis servir mai).[/calc]'},
    {tecles: [], pantalla: marca(calc(D, SEN45, ARREL2_2), 'hist'),
      text: '[calc]El triangle ▲ vol dir que hi ha càlculs anteriors: amb [[up]] els tornes a veure.[/calc]'},
    {tecles: [], pantalla: marca(calc(FIX, '1\\div 6', '0.17', {}), 'fix'),
      text: '[calc]Si hi veus FIX, la calculadora arrodoneix tots els decimals (aquí, a 2 decimals). SCI és semblant: fixa les xifres significatives. Si no ho has triat tu, treu-ho.[/calc]'},
    {tecles: ['shift'], pantalla: marca(calc(ind(D, {shift: true}), '', '', {hist: true}), 'shift'),
      text: '[calc]Si prems [[shift]], surt una S: la tecla següent farà el que hi ha escrit a sobre seu (per exemple, [[shift]] [[exp]] escriu π). La S desapareix sola.[/calc]'},
  ],
  araTu: {
    enunciat: 'Calcula $2\\pi$ i dona\'n el decimal. Mira la barra mentre escrius la π.',
    resultat: '2\\pi\\approx 6{,}283185307',
    error: 'Escriure 3.14 en lloc de π: $2\\cdot 3{,}14=6{,}28$, i ja falla el tercer decimal.',
    inici: calc(D),
    passos: [
      {tecles: ['2', 'shift'], pantalla: marca(calc(ind(D, {shift: true}), '2'), 'shift'),
        text: '[calc]Escriu el 2 i prem [[shift]]: a la barra surt la S.[/calc]'},
      {tecles: ['exp'], pantalla: calc(D, '2\\pi'),
        text: '[calc]Prem [[exp]]: s\'escriu π (el que hi ha a sobre de la tecla) i la S desapareix.[/calc]'},
      {tecles: ['exe', 'sd'], pantalla: marca(calc(D, '2\\pi', '6.283185307'), 'resultat'),
        parcials: {0: marca(calc(D, '2\\pi', '2\\pi'), 'resultat')},
        text: '[calc][[exe]] dona $2\\pi$; amb [[sd]], el decimal: 6.283185307.[/calc]'},
    ],
  },
  relacionades: ['fix', 'mode-decimal'],
},
{
  id: 'exacte-decimal',
  inici: calc(D),
  passos: [
    {tecles: ['sen', '4', '5', 'rpar'], pantalla: calc(D, SEN45),
      text: '[calc]Escriu $\\mathrm{sen}(45)$: [[sen]], el 45 i [[rpar]]. A la tecla de la calculadora, el sinus es diu sen; als enunciats en català, sin. La calculadora és en graus (D).[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, SEN45, ARREL2_2), 'resultat'),
      text: '[calc]Prem [[exe]]. Com que la calculadora és en mode {{E Mat/S Mat}}, el resultat és el valor exacte, $\\frac{\\sqrt{2}}{2}$.[/calc] [mat]A la PAU, aquesta és la resposta.[/mat]'},
    {tecles: ['sd'], pantalla: marca(calc(D, SEN45, '0.7071067812'), 'resultat'),
      text: '[calc]La tecla [[sd]] canvia com es mostra el resultat: ara surt en decimal, 0.7071067812. És el mateix nombre.[/calc]'},
    {tecles: ['sd'], pantalla: marca(calc(D, SEN45, ARREL2_2), 'resultat'),
      text: '[calc]Si tornes a prémer [[sd]], torna la forma exacta.[/calc]'},
    {tecles: ['ac', 'sen', '4', '5', 'rpar'], pantalla: calc(D, SEN45, '', {hist: true}),
      text: '[calc]Ara una drecera. Esborra amb [[ac]] i torna a escriure $\\mathrm{sen}(45)$.[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, SEN45, '0.7071067812'), 'resultat'),
      text: '[calc]En lloc de [[exe]], prem [[shift]] i després [[exe]] (a sobre de = hi ha ≈): surt el resultat en decimal directament.[/calc]'},
  ],
  araTu: {
    enunciat: 'Calcula $\\cos 30^\\circ$ en forma exacta i en forma decimal.',
    resultat: '\\frac{\\sqrt{3}}{2}\\approx 0{,}8660254038',
    error: 'Donar només el decimal arrodonit, 0,87, quan es demana el valor exacte: la resposta és $\\frac{\\sqrt{3}}{2}$.',
    inici: calc(D),
    passos: [
      {tecles: ['cos', '3', '0', 'rpar', 'exe'], pantalla: marca(calc(D, '\\cos(30)', '\\frac{\\sqrt{3}}{2}'), 'resultat'),
        text: '[calc]Escriu $\\cos(30)$ amb la calculadora en graus (D) i prem [[exe]]: $\\frac{\\sqrt{3}}{2}$, el valor exacte.[/calc]'},
      {tecles: ['sd'], pantalla: marca(calc(D, '\\cos(30)', '0.8660254038'), 'resultat'),
        text: '[calc]El decimal: [[sd]]. Surt 0.8660254038.[/calc]'},
    ],
  },
  relacionades: ['mode-decimal', 'indicadors'],
},
{
  id: 'mode-decimal',
  inici: calc(D),
  passos: [
    {tecles: ['1', 'entre', '2', 'exe'], pantalla: marca(calc(D, '1\\div 2', '0.5'), 'resultat'),
      text: '[calc]Calcules $1\\div 2$ i surt 0.5. La icona √ hi és, però no ajuda: surt tant en {{E Mat/S Mat}} com en {{E Mat/S Decimal}}.[/calc]'},
    {tecles: ['shift', 'menu'], pantalla: X2.config(),
      text: '[calc]Prem [[shift]] i [[menu]] (a sobre hi ha CONFIG): s\'obre el menú de configuració. Les opcions es trien prement el seu número.[/calc]'},
    {tecles: ['1'], pantalla: X2.menu('x2-es'),
      text: '[calc]Prem 1: {{1:Entrada/Salida}}. Si surt 0.5, la calculadora és en {{2:E Mat/S Decimal}}: «entrada matemàtica, sortida sempre decimal».[/calc]'},
    {tecles: ['1'], pantalla: calc(D),
      text: '[calc]Prem 1: {{1:E Mat/S Mat}}, entrada i sortida matemàtiques (fraccions, arrels, π). La calculadora torna a la pantalla de càlcul. En canviar aquest ajust, l\'historial s\'esborra (ja no hi ha ▲).[/calc]'},
    {tecles: ['1', 'entre', '2', 'exe'], pantalla: marca(calc(D, '1\\div 2', '\\frac{1}{2}'), 'resultat'),
      text: '[calc]Torna a calcular $1\\div 2$: ara surt $\\frac{1}{2}$.[/calc]'},
  ],
  araTu: {
    enunciat: 'La calculadora és en mode {{E Mat/S Decimal}} i $\\sqrt{8}$ dona 2.828427125. Posa-la en mode {{E Mat/S Mat}} i torna-ho a calcular.',
    resultat: '2\\sqrt{2}',
    error: 'Quedar-se amb 2.828427125: a la PAU es demana el valor exacte, $2\\sqrt{2}$.',
    inici: calc(D),
    passos: [
      {tecles: ['shift', 'menu', '1'], pantalla: X2.menu('x2-es'),
        text: '[calc][[shift]] [[menu]] (CONFIG) i 1 ({{1:Entrada/Salida}}).[/calc]'},
      {tecles: ['1'], pantalla: calc(D),
        text: '[calc]Prem 1 ({{1:E Mat/S Mat}}): tornes a la pantalla de càlcul.[/calc]'},
      {tecles: ['arrel', '8', 'exe'], pantalla: marca(calc(D, '\\sqrt{8}', '2\\sqrt{2}'), 'resultat'),
        text: '[calc][[arrel]], el 8 i [[exe]]: ara surt $2\\sqrt{2}$.[/calc]'},
    ],
  },
  relacionades: ['exacte-decimal'],
},
{
  id: 'fix',
  inici: calc(FIX),
  passos: [
    {tecles: ['1', 'entre', '6', 'shift', 'exe'], pantalla: marca(calc(FIX, '1\\div 6', '0.17'), 'fix'),
      text: '[calc]Amb [[shift]] [[exe]] demanes el decimal i surt 0.17: és arrodonit a 2 decimals per culpa de FIX.[/calc] [mat]Si calcules amb arrodoniments, s\'acumulen errors.[/mat]'},
    {tecles: ['shift', 'menu'], pantalla: X2.config(),
      text: '[calc]Obre el menú de configuració: [[shift]] [[menu]] (CONFIG).[/calc]'},
    {tecles: ['3'], pantalla: X2.menu('x2-format'),
      text: '[calc]Prem 3: {{3:Formato número}}. FIX ve de {{1:Fijar decimales}}: decimals fixos.[/calc]'},
    {tecles: ['3'], pantalla: X2.menu('x2-normal'),
      text: '[calc]Prem 3: {{3:Normal}}. Hi ha dos tipus, {{1:Normal 1}} i {{2:Normal 2}}. La de fàbrica és Normal 2.[/calc]'},
    {tecles: ['2'], pantalla: calc(D, '', '', {hist: true}),
      text: '[calc]Prem 2: la calculadora torna a la pantalla de càlcul, i a la barra ja no hi ha FIX.[/calc]'},
    {tecles: ['1', 'entre', '6', 'shift', 'exe'], pantalla: marca(calc(D, '1\\div 6', '0.1666666667'), 'resultat'),
      text: '[calc]Torna a demanar el decimal: 0.1666666667.[/calc] [mat]Arrodoneix tu al final, només quan escriguis la resposta.[/mat]'},
  ],
  araTu: {
    enunciat: 'A la barra hi ha FIX. Treu-lo i calcula el decimal de $\\frac{2}{3}$ amb tots els decimals.',
    resultat: '0{,}6666666667',
    error: 'Copiar el 0.67 de FIX i continuar calculant amb aquest valor: els errors d\'arrodoniment s\'acumulen.',
    inici: calc(FIX),
    passos: [
      {tecles: ['2', 'entre', '3', 'shift', 'exe'], pantalla: marca(calc(FIX, '2\\div 3', '0.67'), 'fix'),
        text: '[calc]Amb FIX, $2\\div 3$ i [[shift]] [[exe]] donen 0.67.[/calc]'},
      {tecles: ['shift', 'menu', '3', '3'], pantalla: X2.menu('x2-normal'),
        text: '[calc][[shift]] [[menu]] (CONFIG), 3 ({{3:Formato número}}) i 3 ({{3:Normal}}).[/calc]'},
      {tecles: ['2'], pantalla: calc(D, '', '', {hist: true}),
        text: '[calc]Prem 2 ({{2:Normal 2}}): ja no hi ha FIX.[/calc]'},
      {tecles: ['2', 'entre', '3', 'shift', 'exe'], pantalla: marca(calc(D, '2\\div 3', '0.6666666667'), 'resultat'),
        text: '[calc]Torna a demanar el decimal: 0.6666666667.[/calc]'},
    ],
  },
  relacionades: ['indicadors'],
},

);

})(Models.obre());
