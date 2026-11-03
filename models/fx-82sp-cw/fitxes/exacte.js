/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/exacte.js — Les fitxes del bloc «Treballar en mode 'exacte' o 'decimal'»
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
  id: 'exacte-decimal',
  inici: calc(D),
  passos: [
    {tecles: ['sen', '4', '5', 'rpar'], pantalla: calc(D, SEN45),
      text: '[calc]Escriu $\\mathrm{sen}(45)$: [[sen]], el 45 i [[rpar]]. A la tecla de la calculadora, el sinus es diu sen; als enunciats en català, sin. La calculadora és en graus (D).[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, SEN45, ARREL2_2), 'resultat'),
      text: '[calc]Prem [[exe]]. Com que la calculadora és en mode {{E Mat/S Mat}}, el resultat és el valor exacte, $\\frac{\\sqrt{2}}{2}$.[/calc] [mat]A la PAU, aquesta és la resposta.[/mat]'},
    {tecles: ['format'], pantalla: format(0),
      text: '[calc]La tecla [[format]] obre un menú per canviar com es mostra el resultat. La primera opció, {{Estándar}}, és la forma exacta.[/calc]'},
    {tecles: ['down'], pantalla: format(1),
      text: '[calc]Baixa fins a {{Decimal}} amb [[down]].[/calc]'},
    {tecles: ['ok'], pantalla: marca(calc(D, SEN45, '0.7071067812'), 'resultat'),
      text: '[calc]Prem [[ok]]. És el mateix nombre, però ara en decimal: 0.7071067812.[/calc]'},
    {tecles: ['format', 'ok'], pantalla: marca(calc(D, SEN45, ARREL2_2), 'resultat'),
      text: '[calc]Per tornar a la forma exacta: [[format]] i [[ok]], perquè {{Estándar}} ja està triada.[/calc]'},
    {tecles: ['ac', 'sen', '4', '5', 'rpar'], pantalla: calc(D, SEN45, '', {hist: true}),
      text: '[calc]Ara una drecera. Esborra amb [[ac]] i torna a escriure $\\mathrm{sen}(45)$.[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, SEN45, '0.7071067812'), 'resultat'),
      text: '[calc]En lloc de [[exe]], prem [[shift]] i després [[exe]] (a sobre d\'EXE hi ha ≈): surt el resultat en decimal directament.[/calc]'},
  ],
  araTu: {
    enunciat: 'Calcula $\\cos 30^\\circ$ en forma exacta i en forma decimal.',
    resultat: '\\frac{\\sqrt{3}}{2}\\approx 0{,}8660254038',
    error: 'Donar només el decimal arrodonit, 0,87, quan es demana el valor exacte: la resposta és $\\frac{\\sqrt{3}}{2}$.',
    inici: calc(D),
    passos: [
      {tecles: ['cos', '3', '0', 'rpar', 'exe'], pantalla: marca(calc(D, '\\cos(30)', '\\frac{\\sqrt{3}}{2}'), 'resultat'),
        text: '[calc]Escriu $\\cos(30)$ amb la calculadora en graus (D) i prem [[exe]]: $\\frac{\\sqrt{3}}{2}$, el valor exacte.[/calc]'},
      {tecles: ['format', 'down', 'ok'], pantalla: marca(calc(D, '\\cos(30)', '0.8660254038'), 'resultat'),
        text: '[calc]El decimal: [[format]], {{Decimal}} amb [[down]] i [[ok]]. Surt 0.8660254038.[/calc]'},
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
    {tecles: ['settings'], pantalla: config(0),
      text: '[calc]Prem [[settings]]: s\'obre el menú CONFIG, amb {{Config cálculo}} triat.[/calc]'},
    {tecles: ['ok'], pantalla: configCalcul(0),
      text: '[calc]Prem [[ok]]. La primera opció és {{Entrada/Salida}}.[/calc]'},
    {tecles: ['ok'], pantalla: entradaSortida(1),
      text: '[calc]Prem [[ok]]. Aquí hi ha el problema: el ◉ és a {{E Mat/S Decimal}}. Vol dir «entrada matemàtica, sortida sempre decimal».[/calc]'},
    {tecles: ['up'], pantalla: entradaSortida(1, 0),
      text: '[calc]Puja a {{E Mat/S Mat}} amb [[up]]: entrada i sortida matemàtiques (fraccions, arrels, π).[/calc]'},
    {tecles: ['ok'], pantalla: entradaSortida(0),
      text: '[calc]Prem [[ok]]: el ◉ passa a {{E Mat/S Mat}}.[/calc]'},
    {tecles: ['ac'], pantalla: calc(D),
      text: '[calc]Prem [[ac]] per tornar a la pantalla de càlcul. En canviar aquest ajust, l\'historial s\'esborra (ja no hi ha ▲).[/calc]'},
    {tecles: ['1', 'entre', '2', 'exe'], pantalla: marca(calc(D, '1\\div 2', '\\frac{1}{2}'), 'resultat'),
      text: '[calc]Torna a calcular $1\\div 2$: ara surt $\\frac{1}{2}$.[/calc]'},
  ],
  araTu: {
    enunciat: 'La calculadora és en mode {{E Mat/S Decimal}} i $\\sqrt{8}$ dona 2.828427125. Posa-la en mode {{E Mat/S Mat}} i torna-ho a calcular.',
    resultat: '2\\sqrt{2}',
    error: 'Quedar-se amb 2.828427125: a la PAU es demana el valor exacte, $2\\sqrt{2}$.',
    inici: calc(D),
    passos: [
      {tecles: ['settings', 'ok', 'ok'], pantalla: entradaSortida(1),
        text: '[calc][[settings]], [[ok]] ({{Config cálculo}}) i [[ok]] ({{Entrada/Salida}}): el ◉ és a {{E Mat/S Decimal}}.[/calc]'},
      {tecles: ['up', 'ok'], pantalla: entradaSortida(0),
        text: '[calc]Puja a {{E Mat/S Mat}} amb [[up]] i prem [[ok]].[/calc]'},
      {tecles: ['ac'], pantalla: calc(D),
        text: '[calc]Prem [[ac]] per tornar a la pantalla de càlcul.[/calc]'},
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
    {tecles: ['settings', 'ok'], pantalla: configCalcul(0),
      text: '[calc]Obre [[settings]] i entra a {{Config cálculo}} amb [[ok]].[/calc]'},
    {tecles: ['down', 'down'], pantalla: configCalcul(2),
      text: '[calc]Baixa fins a {{Formato número}}.[/calc]'},
    {tecles: ['ok'], pantalla: formatNumero(0),
      text: '[calc]Prem [[ok]]. El ◉ és a {{Fijar decim}}: decimals fixos.[/calc]'},
    {tecles: ['down', 'down', 'ok'], pantalla: normal(0),
      text: '[calc]Baixa fins a {{Normal}} i prem [[ok]]. Surten els dos tipus, Norm1 i Norm2, amb un exemple de cada un. La de fàbrica és Norm2.[/calc]'},
    {tecles: ['down', 'ok'], pantalla: formatNumero(2),
      text: '[calc]El menú s\'obre a Norm1: baixa a Norm2 amb [[down]] i prem [[ok]]. El ◉ passa a {{Normal}}.[/calc]'},
    {tecles: ['ac'], pantalla: calc(D, '', '', {hist: true}),
      text: '[calc]Prem [[ac]]. A la barra ja no hi ha FIX.[/calc]'},
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
      {tecles: ['settings', 'ok', 'down', 'down', 'ok'], pantalla: formatNumero(0),
        text: '[calc][[settings]], [[ok]] ({{Config cálculo}}), baixa a {{Formato número}} i [[ok]].[/calc]'},
      {tecles: ['down', 'down', 'ok', 'down', 'ok'], pantalla: formatNumero(2),
        text: '[calc]Baixa a {{Normal}}, [[ok]], tria Norm2 amb [[down]] i [[ok]].[/calc]'},
      {tecles: ['ac'], pantalla: calc(D, '', '', {hist: true}),
        text: '[calc]Prem [[ac]]: ja no hi ha FIX.[/calc]'},
      {tecles: ['2', 'entre', '3', 'shift', 'exe'], pantalla: marca(calc(D, '2\\div 3', '0.6666666667'), 'resultat'),
        text: '[calc]Torna a demanar el decimal: 0.6666666667.[/calc]'},
    ],
  },
  relacionades: ['indicadors'],
},

);

})(Models.obre());
