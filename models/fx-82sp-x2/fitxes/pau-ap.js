/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-x2/fitxes/pau-ap.js — Les fitxes del bloc «Exercicis PAU. Anàlisi i Probabilitat»
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
const {SEN45, ARREL2_2, D, R, FIX} = M.comu;
const X2 = M.x2;
/** Tabla: les funcions (s'escriuen un sol cop) i les taules que en surten (calcul.js comprova cada valor). */
const F_BOLZANO = '-2+10(x-1)\\ln(x)';
const F_LIMITS = '\\frac{x^{2}-2x}{x-1}';
const TAULA_BOLZANO = [['1', '-2'], ['1.1', '-1.90468982'], ['1.2', '-1.635356886'], ['1.3', '-1.212907207'], ['1.4', '-0.6541110535'], ['1.5', '0.02732554054']];
const TAULA_PROP = [['0.98', '49.98'], ['0.99', '99.99'], ['1', 'ERROR'], ['1.01', '-99.99'], ['1.02', '-49.98']];
const TAULA_LLUNY = [['-200', '-200.9950249'], ['-100', '-100.990099'], ['0', '0'], ['100', '98.98989899'], ['200', '198.9949749']];

M.fitxes.push(

{
  id: 'pau-ana-24i-q1',
  inici: calc(D),
  passos: [
    {tecles: ['menu', '3'], pantalla: definicio('f'),
      text: '[calc]Hauràs de calcular $f$ en diversos punts: fes-ne una taula. [[menu]] i 3 ({{Tabla}}): la calculadora demana $f(x)$.[/calc]'},
    {tecles: ['neg', '2', 'mes', '1', '0', 'lpar', 'x', 'menys', '1', 'rpar', 'ln', 'x', 'rpar'], pantalla: definicio('f', F_BOLZANO),
      text: '[calc]Escriu $-2+10(x-1)\\ln(x)$. El signe del principi és [[neg]], la $x$ és la tecla [[x]] i ln és la tecla [[ln]].[/calc]'},
    {tecles: ['exe', 'exe'], pantalla: X2.rang(['1', '5', '1']),
      text: '[calc]Prem [[exe]]: demana $g(x)$. No en cal cap: torna a prémer [[exe]] i surt el rang.[/calc]'},
    {tecles: ['1', 'exe', '1', 'punt', '5', 'exe', '0', 'punt', '1', 'exe'], pantalla: X2.taula(TAULA_BOLZANO, 0, 0, false),
      parcials: {9: X2.rang(['1', '1.5', '0.1'], 2, '0.1')},
      text: '[mat]L\'interval és $[1;\\,1{,}5]$, i les dècimes són els punts que t\'interessen.[/mat] [calc]{{Inic.}} 1, {{Final}} 1.5 i {{Paso}} 0.1, cada un amb [[exe]]: surt la taula.[/calc]'},
    {tecles: ['right'], pantalla: X2.taula(TAULA_BOLZANO, 0, 1, false),
      text: '[calc]Passa a la columna de $f$ amb [[right]].[/calc] [mat]$f(1)=-2<0$.[/mat]'},
    {tecles: ['down', 'down', 'down', 'down', 'down'], pantalla: X2.taula(TAULA_BOLZANO, 5, 1, false),
      text: '[calc]Baixa fins a l\'última fila, $x=1{,}5$: a baix hi ha el valor sencer.[/calc] [mat]$f(1{,}5)\\approx 0{,}0273>0$. Com que $f$ és contínua a $[1;\\,1{,}5]$ i canvia de signe, pel teorema de Bolzano hi ha una arrel. ✓[/mat]'},
    {tecles: ['up'], pantalla: X2.taula(TAULA_BOLZANO, 4, 1, false),
      text: '[mat]Una fila amunt, $f(1{,}4)\\approx -0{,}654<0$: hi ha canvi de signe a $[1{,}4;\\,1{,}5]$, un interval d\'una dècima. ✓[/mat]'},
  ],
  relacionades: ['exacte-decimal', 'definir-fx', 'pau-ana-25j-q1'],
},
{
  id: 'pau-ana-25i-q4a',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'pot', '3', 'right', 'frac', '1', '0', '0', 'down', '3', 'shift', 'exp'], pantalla: calc(D, '\\sqrt[3]{\\frac{100}{3\\pi}}'),
      text: '[mat]El radi és $r=\\sqrt[3]{\\frac{100}{3\\pi}}$.[/mat] [calc]Prem [[shift]] [[pot]] (arrel d\'índex n), escriu l\'índex 3 i, amb [[right]], passa al radicand: la fracció $\\frac{100}{3\\pi}$ amb [[frac]] (π és [[shift]] [[exp]]).[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, '\\sqrt[3]{\\frac{100}{3\\pi}}', '2.19740255'), 'resultat'),
      text: '[calc]És una longitud: demana el decimal amb [[shift]] [[exe]] (≈). El radi és $r\\approx 2{,}20$ cm, i la calculadora el desa a [[ans]] amb tots els decimals.[/calc]'},
    {tecles: ['frac', '1', '0', '0', 'down', 'shift', 'exp', 'ans', 'x2'], pantalla: calc(D, '\\frac{100}{\\pi\\mathrm{Ans}^{2}}', '', {hist: true}),
      text: '[calc]L\'altura, $h=\\frac{100}{\\pi r^2}$, sense copiar el radi: [[frac]], el 100, [[down]], π, [[ans]] i [[x2]].[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, '\\frac{100}{\\pi\\mathrm{Ans}^{2}}', '6.592207651'), 'resultat'),
      text: '[calc]Amb [[shift]] [[exe]]: l\'altura és $h\\approx 6{,}59$ cm.[/calc]'},
    {tecles: ['3', 'shift', 'exp', 'per', '2', 'punt', '1', '9', '7', '4', 'x2', 'mes', 'frac', '2', '0', '0', 'down', '2', 'punt', '1', '9', '7', '4', 'shift', 'exe'],
      pantalla: marca(calc(D, '3\\pi\\times 2.1974^{2}+\\frac{200}{2.1974}', '136.5248256'), 'resultat'),
      text: '[calc]Ara [[ans]] ja és l\'altura: per a $S(r)$, escriu el radi amb quatre decimals, 2.1974. Amb [[shift]] [[exe]], la superfície mínima és $S\\approx 136{,}52\\,\\text{cm}^2$.[/calc]'},
  ],
  /* «Ara tu» DESACTIVAT: de moment no surt als exercicis PAU reals. Per tornar-lo a activar,
     treu aquest comentari (ARCHITECTURE.md, «Disabled “Ara tu”»).
  araTu: {
    enunciat: 'Una llauna cilíndrica de $500\\,\\text{cm}^3$ té l\'altura $h=\\frac{500}{\\pi r^2}$. Amb la derivada has obtingut $r^3=\\frac{250}{\\pi}$. Calcula el radi i l\'altura.',
    resultat: 'r\\approx 4{,}30\\text{ cm},\\ h\\approx 8{,}60\\text{ cm}',
    error: 'Calcular l\'altura amb el radi arrodonit, 4,3: surt 8.607622666 i no 8.602540138.',
    inici: calc(D),
    passos: [
      {tecles: ['shift', 'pot', '3', 'right', 'frac', '2', '5', '0', 'down', 'shift', 'exp'], pantalla: calc(D, '\\sqrt[3]{\\frac{250}{\\pi}}'),
        text: '[[shift]] [[pot]], el 3, [[right]] i la fracció $\\frac{250}{\\pi}$.'},
      {tecles: ['shift', 'exe'], pantalla: marca(calc(D, '\\sqrt[3]{\\frac{250}{\\pi}}', '4.301270069'), 'resultat'),
        text: '[[shift]] [[exe]]: $r\\approx 4{,}30$ cm, desat a [[ans]].'},
      {tecles: ['frac', '5', '0', '0', 'down', 'shift', 'exp', 'ans', 'x2', 'shift', 'exe'], pantalla: marca(calc(D, '\\frac{500}{\\pi\\mathrm{Ans}^{2}}', '8.602540138'), 'resultat'),
        text: '$\\frac{500}{\\pi\\,\\mathrm{Ans}^2}$ i [[shift]] [[exe]]: $h\\approx 8{,}60$ cm.'},
    ],
  },
  */
  relacionades: ['arrel-n', 'ans', 'exacte-decimal'],
},
{
  id: 'pau-ana-25j-q1',
  titol: '(2025). Intueix els límits amb Tabla',
  inici: calc(D),
  passos: [
    {tecles: ['menu', '3'], pantalla: definicio('f'),
      text: '[calc]Fes una taula de $f$: [[menu]] i 3 ({{Tabla}}).[/calc]'},
    {tecles: ['frac', 'x', 'x2', 'menys', '2', 'x', 'down', 'x', 'menys', '1'], pantalla: definicio('f', F_LIMITS),
      text: '[calc]Escriu $f$ amb la $x$ (tecla [[x]]): la fracció amb [[frac]], a dalt $x^2-2x$, [[down]] i, a baix, $x-1$.[/calc]'},
    {tecles: ['exe', 'exe'], pantalla: X2.rang(['1', '5', '1']),
      text: '[calc]Prem [[exe]] dues vegades: $g(x)$ no cal. Surt el rang.[/calc]'},
    {tecles: ['0', 'punt', '9', '8', 'exe', '1', 'punt', '0', '2', 'exe', '0', 'punt', '0', '1', 'exe'], pantalla: X2.taula(TAULA_PROP, 0, 0, false),
      parcials: {14: X2.rang(['0.98', '1.02', '0.01'], 2, '0.01')},
      text: '[mat]Primer, valors de $x$ molt a prop d\'1, per l\'esquerra i per la dreta.[/mat] [calc]{{Inic.}} 0.98, {{Final}} 1.02 i {{Paso}} 0.01, cada un amb [[exe]].[/calc]'},
    {tecles: ['right', 'down'], pantalla: X2.taula(TAULA_PROP, 1, 1, false),
      text: '[mat]Per l\'esquerra: $f(0{,}98)=49{,}98$ i $f(0{,}99)=99{,}99$. Com més a prop d\'1, més gran: $\\lim\\limits_{x\\to 1^-}f(x)=+\\infty$.[/mat]'},
    {tecles: ['down'], pantalla: X2.taula(TAULA_PROP, 2, 1, false),
      text: '[mat]A $x=1$ hi ha ERROR: el denominador val 0, i 1 no és del domini.[/mat]'},
    {tecles: ['down'], pantalla: X2.taula(TAULA_PROP, 3, 1, false),
      text: '[mat]Per la dreta: $f(1{,}01)=-99{,}99$, i $\\lim\\limits_{x\\to 1^+}f(x)=-\\infty$. Els dos límits laterals són infinits: la recta $x=1$ és una asímptota vertical.[/mat]'},
    {tecles: ['ac'], pantalla: definicio('f', F_LIMITS, false),
      text: '[calc]Ara valors de $x$ molt grans. Prem [[ac]]: tornes a $f(x)$, que ja hi és.[/calc]'},
    {tecles: ['exe', 'exe'], pantalla: X2.rang(['0.98', '1.02', '0.01']),
      text: '[calc][[exe]] dues vegades: el rang, amb els valors d\'abans.[/calc]'},
    {tecles: ['neg', '2', '0', '0', 'exe', '2', '0', '0', 'exe', '1', '0', '0', 'exe'], pantalla: X2.taula(TAULA_LLUNY, 0, 0, false),
      parcials: {12: X2.rang(['-200', '200', '100'], 2, '100')},
      text: '[calc]{{Inic.}} $-200$, {{Final}} 200 i {{Paso}} 100, cada un amb [[exe]].[/calc]'},
    {tecles: ['right', 'down', 'down', 'down', 'down'], pantalla: X2.taula(TAULA_LLUNY, 4, 1, false),
      text: '[mat]$f(100)\\approx 98{,}99$ i $f(200)\\approx 198{,}99$: $\\lim\\limits_{x\\to+\\infty}f(x)=+\\infty$, i no hi ha asímptota horitzontal. A més, quan $x$ augmenta 100, $f(x)$ també augmenta gairebé 100: pot haver-hi una asímptota obliqua de pendent 1.[/mat]'},
    {tecles: ['up', 'up', 'up', 'up'], pantalla: X2.taula(TAULA_LLUNY, 0, 1, false),
      text: '[mat]I $f(-200)\\approx -200{,}995$: $\\lim\\limits_{x\\to-\\infty}f(x)=-\\infty$. Ara ja pots calcular el pendent $m$ i l\'ordenada a l\'origen $n$ de l\'asímptota obliqua: surt $y=x-1$. Fixa\'t que $f(200)\\approx 200-1$.[/mat]'},
  ],
  relacionades: ['definir-fx', 'pau-ana-24i-q1', 'exacte-decimal'],
},
{
  id: 'pau-ana-25s-q4a',
  inici: calc(D),
  passos: [
    {apartat: 'a', tecles: ['shift', 'menu', '2', '2'], pantalla: marca(calc(R), 'ang'),
      text: '[calc]El sinus i el cosinus són d\'una $x$ en metres, no d\'un angle en graus: posa la calculadora en radians: [[shift]] [[menu]] (CONFIG), 2 ({{2:Unidad angular}}) i 2 ({{2:Radián}}). A la barra, R.[/calc]'},
    {apartat: 'a', tecles: ['3', 'sen', 'frac', 'shift', 'exp', 'down', '4', 'right', 'rpar'], pantalla: calc(R, '3\\mathrm{sen}(\\frac{\\pi}{4})'),
      text: '[mat]a) La segona coordenada del punt $C$ és $3\\sin\\frac{\\pi}{4}$.[/mat] [calc]Escriu el 3, [[sen]] i la fracció $\\frac{\\pi}{4}$ amb [[frac]] (π és [[shift]] [[exp]]); surt de la fracció amb [[right]] i tanca amb [[rpar]].[/calc]'},
    {apartat: 'a', tecles: ['exe'], pantalla: marca(calc(R, '3\\mathrm{sen}(\\frac{\\pi}{4})', '\\frac{3\\sqrt{2}}{2}'), 'resultat'),
      text: '[calc]Prem [[exe]]: $C=\\left(\\pi,\\frac{3\\sqrt{2}}{2}\\right)$.[/calc] [mat]I $B=(0,3)$, perquè $3\\cos 0=3$.[/mat] [calc]Surt exacte perquè la calculadora és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 2.121320344.[/calc]'},
    {apartat: 'b', tecles: ['1', '2', 'sen', 'frac', 'shift', 'exp', 'down', '4', 'right', 'rpar', 'mes', '1', '2', 'cos', 'frac', 'shift', 'exp', 'down', '4', 'right', 'rpar', 'menys', '1', '2'],
      pantalla: calc(R, '12\\mathrm{sen}(\\frac{\\pi}{4})+12\\cos(\\frac{\\pi}{4})-12', '', {hist: true}),
      text: '[mat]b) Regla de Barrow: $F(\\pi)-F(0)$. Com que $\\sin 0=0$ i $\\cos 0=1$, $F(0)=12$.[/mat] [calc]Escriu $12\\sin\\frac{\\pi}{4}+12\\cos\\frac{\\pi}{4}-12$.[/calc]'},
    {apartat: 'b', tecles: ['exe', 'sd'], pantalla: marca(calc(R, '12\\mathrm{sen}(\\frac{\\pi}{4})+12\\cos(\\frac{\\pi}{4})-12', '4.970562748'), 'resultat'),
      parcials: {0: marca(calc(R, '12\\mathrm{sen}(\\frac{\\pi}{4})+12\\cos(\\frac{\\pi}{4})-12', '12\\sqrt{2}-12'), 'resultat')},
      text: '[calc]Prem [[exe]]: surt exacte, $12\\sqrt{2}-12$. Per al preu cal un decimal: prem [[sd]].[/calc] [mat]L\'àrea és $12(\\sqrt{2}-1)\\approx 4{,}97\\,\\text{m}^2$.[/mat]'},
    {apartat: 'b', tecles: ['per', '7', '5', '0', 'exe', 'sd'], pantalla: marca(calc(R, '\\mathrm{Ans}\\times 750', '3727.922061'), 'resultat'),
      parcials: {4: marca(calc(R, '\\mathrm{Ans}\\times 750', '9000\\sqrt{2}-9000'), 'resultat')},
      text: '[calc]Ara [[per]] 750: després d\'un resultat, el càlcul comença amb Ans, sense arrodonir. Amb [[exe]] i [[sd]], el preu del vitrall és de $3\\,727{,}92$ €.[/calc]'},
  ],
  /* «Ara tu» DESACTIVAT: de moment no surt als exercicis PAU reals. Per tornar-lo a activar,
     treu aquest comentari (ARCHITECTURE.md, «Disabled “Ara tu”»).
  araTu: {
    enunciat: 'Si el vitrall fos entre $y=2\\sin\\frac{x}{4}$ i $y=2\\cos\\frac{x}{4}$, l\'àrea seria $\\left[8\\sin\\frac{x}{4}+8\\cos\\frac{x}{4}\\right]_0^{\\pi}$. Calcula-la i el preu, a 750 € el m².',
    resultat: '8(\\sqrt{2}-1)\\approx 3{,}31\\text{ m}^2;\\ 2\\,485{,}28\\text{ euros}',
    error: 'Calcular-ho amb la calculadora en graus (D): l\'àrea surt 0.1089072353 m².',
    inici: calc(R),
    passos: [
      {tecles: ['8', 'sen', 'frac', 'shift', 'exp', 'down', '4', 'right', 'rpar', 'mes', '8', 'cos', 'frac', 'shift', 'exp', 'down', '4', 'right', 'rpar', 'menys', '8'],
        pantalla: calc(R, '8\\mathrm{sen}(\\frac{\\pi}{4})+8\\cos(\\frac{\\pi}{4})-8'),
        text: 'Amb R a la barra: $F(\\pi)-F(0)$, amb $F(0)=8$. Escriu $8\\sin\\frac{\\pi}{4}+8\\cos\\frac{\\pi}{4}-8$.'},
      {tecles: ['shift', 'exe'], pantalla: marca(calc(R, '8\\mathrm{sen}(\\frac{\\pi}{4})+8\\cos(\\frac{\\pi}{4})-8', '3.313708499'), 'resultat'),
        text: '[[shift]] [[exe]]: l\'àrea és $\\approx 3{,}31\\,\\text{m}^2$.'},
      {tecles: ['per', '7', '5', '0', 'shift', 'exe'], pantalla: marca(calc(R, '\\mathrm{Ans}\\times 750', '2485.281374'), 'resultat'),
        text: '[[per]] 750 i [[shift]] [[exe]]: el preu és de $2\\,485{,}28$ €.'},
    ],
  },
  */
  relacionades: ['canvia-radians', 'exacte-decimal', 'ans', 'barrow', 'mode-decimal'],
},
{
  id: 'pau-pro-24i-q4',
  inici: calc(D),
  passos: [
    {apartat: 'a', tecles: ['frac', '4', 'down', '6', 'right', 'per', '0', 'punt', '7', '5', 'mes', 'frac', '2', 'down', '6', 'right', 'per', '0', 'punt', '4'],
      pantalla: calc(D, '\\frac{4}{6}\\times 0.75+\\frac{2}{6}\\times 0.4'),
      text: '[mat]a) Probabilitat total: $P(C)=\\frac{4}{6}\\cdot 0{,}75+\\frac{2}{6}\\cdot 0{,}4$.[/mat] [calc]Escriu-ho tal qual, amb fraccions i decimals.[/calc]'},
    {apartat: 'a', tecles: ['exe'], pantalla: marca(calc(D, '\\frac{4}{6}\\times 0.75+\\frac{2}{6}\\times 0.4', '\\frac{19}{30}'), 'resultat'),
      text: '[calc]Prem [[exe]]: $P(C)=\\frac{19}{30}$. La calculadora dona la fracció exacta, encara que hagis escrit decimals, perquè és en mode {{E Mat/S Mat}}; en mode {{E Mat/S Decimal}} sortiria 0.6333333333.[/calc]'},
    {apartat: 'b', tecles: ['lpar', 'frac', '4', 'down', '6', 'right', 'per', '0', 'punt', '7', '5', 'rpar', 'entre', 'frac', '1', '9', 'down', '3', '0'],
      pantalla: calc(D, '(\\frac{4}{6}\\times 0.75)\\div\\frac{19}{30}', '', {hist: true}),
      text: '[mat]b) Bayes: $P(R\\mid C)=\\dfrac{\\frac{4}{6}\\cdot 0{,}75}{P(C)}$.[/mat] [calc]Escriu $\\left(\\frac{4}{6}\\times 0.75\\right)\\div\\frac{19}{30}$.[/calc]'},
    {apartat: 'b', tecles: ['exe'], pantalla: marca(calc(D, '(\\frac{4}{6}\\times 0.75)\\div\\frac{19}{30}', '\\frac{15}{19}'), 'resultat'),
      text: '[calc]Prem [[exe]]: $P(R\\mid C)=\\frac{15}{19}$.[/calc]'},
    {apartat: 'c', tecles: ['5', 'per', 'lpar', 'frac', '1', '9', 'down', '3', '0', 'right', 'rpar', 'pot', '4', 'right', 'per', 'frac', '1', '1', 'down', '3', '0', 'right',
      'mes', 'lpar', 'frac', '1', '9', 'down', '3', '0', 'right', 'rpar', 'pot', '5'],
      pantalla: calc(D, '5\\times(\\frac{19}{30})^{4}\\times\\frac{11}{30}+(\\frac{19}{30})^{5}', '', {hist: true}),
      text: '[mat]c) Binomial, amb $n=5$ i $p=\\frac{19}{30}$: $P(X\\ge 4)=5\\,p^4(1-p)+p^5$, perquè $\\binom{5}{4}=5$ i $1-p=\\frac{11}{30}$.[/mat] [calc]La potència és [[pot]]; amb [[right]] surts de l\'exponent.[/calc]'},
    {apartat: 'c', tecles: ['exe'], pantalla: marca(calc(D, '5\\times(\\frac{19}{30})^{4}\\times\\frac{11}{30}+(\\frac{19}{30})^{5}', '0.3968623045'), 'resultat'),
      text: '[calc]Prem [[exe]]: $P(X\\ge 4)\\approx 0{,}3969$. La fracció exacta tindria massa xifres, i la calculadora la dona en decimal.[/calc]'},
    {error: true, apartat: 'c', tecles: ['ac', '5', 'per', '0', 'punt', '6', '3', 'pot', '4', 'right', 'per', '0', 'punt', '3', '7', 'mes', '0', 'punt', '6', '3', 'pot', '5', 'exe'],
      pantalla: marca(calc(D, '5\\times 0.63^{4}\\times 0.37+0.63^{5}', '0.3906734328'), 'resultat'),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i, si arrodoneixes $p\\approx 0{,}63$, surt 0.3906734328 i no 0.3968623045: ja falla la segona xifra decimal. Treballa amb $\\frac{19}{30}$.[/calc]'},
  ],
  /* «Ara tu» DESACTIVAT: de moment no surt als exercicis PAU reals. Per tornar-lo a activar,
     treu aquest comentari (ARCHITECTURE.md, «Disabled “Ara tu”»).
  araTu: {
    enunciat: 'Si la Rut encertés el 60 % dels problemes que copia (i no el 40 %), quina seria la probabilitat que la solució sigui correcta? I la que l\'hagi resolt ella, si és correcta?',
    resultat: '\\frac{7}{10}\\text{ i }\\frac{5}{7}',
    error: 'Per Bayes, dividir $0{,}75$ entre $\\frac{7}{10}$ sense multiplicar per $\\frac{4}{6}$: surt $\\frac{15}{14}$, més gran que 1, i una probabilitat no pot passar d\'1.',
    inici: calc(D),
    passos: [
      {tecles: ['frac', '4', 'down', '6', 'right', 'per', '0', 'punt', '7', '5', 'mes', 'frac', '2', 'down', '6', 'right', 'per', '0', 'punt', '6', 'exe'],
        pantalla: marca(calc(D, '\\frac{4}{6}\\times 0.75+\\frac{2}{6}\\times 0.6', '\\frac{7}{10}'), 'resultat'),
        text: 'Probabilitat total: $\\frac{4}{6}\\times 0.75+\\frac{2}{6}\\times 0.6$ i [[exe]]: $\\frac{7}{10}$.'},
      {tecles: ['lpar', 'frac', '4', 'down', '6', 'right', 'per', '0', 'punt', '7', '5', 'rpar', 'entre', 'ans', 'exe'],
        pantalla: marca(calc(D, '(\\frac{4}{6}\\times 0.75)\\div\\mathrm{Ans}', '\\frac{5}{7}'), 'resultat'),
        text: 'Bayes: $\\left(\\frac{4}{6}\\times 0.75\\right)\\div$ [[ans]] i [[exe]]: $\\frac{5}{7}$.'},
    ],
  },
  */
  relacionades: ['exacte-decimal', 'frac-plantilla', 'pot-fraccio', 'combinatoria', 'pau-pro-24s-q4', 'mode-decimal'],
},
{
  id: 'pau-pro-24s-q4',
  inici: calc(D),
  passos: [
    {apartat: 'a', tecles: ['1', 'menys', '0', 'punt', '8', 'pot', '4'], pantalla: calc(D, '1-0.8^{4}'),
      text: '[mat]a) El nombre de persones amb arrítmia segueix una binomial $B(4;\\,0{,}2)$. «Almenys una» és l\'esdeveniment contrari de «cap»: $1-0{,}8^4$.[/mat] [calc]L\'exponent és [[pot]].[/calc]'},
    {apartat: 'a', tecles: ['exe', 'sd'], pantalla: marca(calc(D, '1-0.8^{4}', '0.5904'), 'resultat'),
      parcials: {0: marca(calc(D, '1-0.8^{4}', '\\frac{369}{625}'), 'resultat')},
      text: '[calc]Prem [[exe]]: surt la fracció $\\frac{369}{625}$, perquè la calculadora és en mode {{E Mat/S Mat}} i has escrit decimals exactes. Amb [[sd]], en decimal: 0.5904.[/calc]'},
    {apartat: 'b', tecles: ['0', 'punt', '9', '5', 'per', '0', 'punt', '2', 'mes', '0', 'punt', '0', '0', '5', 'per', '0', 'punt', '8'],
      pantalla: calc(D, '0.95\\times 0.2+0.005\\times 0.8', '', {hist: true}),
      text: '[mat]b) Probabilitat total. Hi ha dues maneres de donar positiu: amb arrítmia ($0{,}2$ i $0{,}95$) o sense ($0{,}8$ i $0{,}005$).[/mat] [calc]Escriu $0.95\\times 0.2+0.005\\times 0.8$.[/calc]'},
    {apartat: 'b', tecles: ['exe', 'sd'], pantalla: marca(calc(D, '0.95\\times 0.2+0.005\\times 0.8', '0.194'), 'resultat'),
      parcials: {0: marca(calc(D, '0.95\\times 0.2+0.005\\times 0.8', '\\frac{97}{500}'), 'resultat')},
      text: '[calc]Amb [[exe]] ($\\frac{97}{500}$) i [[sd]]: la probabilitat d\'un diagnòstic positiu és 0,194.[/calc]'},
    {apartat: 'c', tecles: ['0', 'punt', '2', 'per', 'lpar', '1', 'menys', '0', 'punt', '9', '5', 'rpar', 'entre', 'lpar', '1', 'menys', 'ans', 'rpar'],
      pantalla: calc(D, '0.2\\times(1-0.95)\\div(1-\\mathrm{Ans})', '', {hist: true}),
      text: '[mat]c) Bayes: tenir arrítmia i donar negatiu, $0{,}2\\cdot(1-0{,}95)$, dividit per la probabilitat d\'un negatiu, $1-0{,}194$.[/mat] [calc]El 0.194 és a [[ans]]: no cal copiar-lo. El denominador, entre parèntesis.[/calc]'},
    {apartat: 'c', tecles: ['shift', 'exe'], pantalla: marca(calc(D, '0.2\\times(1-0.95)\\div(1-\\mathrm{Ans})', '0.01240694789'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]]: $\\approx 0{,}0124$.[/calc] [mat]Només l\'1,24 % de les persones que donen negatiu pateixen arrítmia.[/mat]'},
  ],
  /* «Ara tu» DESACTIVAT: de moment no surt als exercicis PAU reals. Per tornar-lo a activar,
     treu aquest comentari (ARCHITECTURE.md, «Disabled “Ara tu”»).
  araTu: {
    enunciat: 'Amb les dades de l\'apartat b), calcula la probabilitat que una persona amb un diagnòstic positiu pateixi arrítmia.',
    resultat: '\\frac{95}{97}\\approx 0{,}979',
    error: 'Dividir entre $0{,}2$, la probabilitat de patir arrítmia: per Bayes, el denominador és la probabilitat de donar positiu, $0{,}194$.',
    inici: calc(D),
    passos: [
      {tecles: ['0', 'punt', '9', '5', 'per', '0', 'punt', '2', 'entre', '0', 'punt', '1', '9', '4'], pantalla: calc(D, '0.95\\times 0.2\\div 0.194'),
        text: 'Bayes: $\\frac{0{,}95\\cdot 0{,}2}{0{,}194}$. Escriu 0.95 [[per]] 0.2 [[entre]] 0.194.'},
      {tecles: ['shift', 'exe'], pantalla: marca(calc(D, '0.95\\times 0.2\\div 0.194', '0.9793814433'), 'resultat'),
        text: 'Amb [[shift]] [[exe]]: 0.9793814433 (amb [[exe]] sortiria $\\frac{95}{97}$). La probabilitat és $\\approx 0{,}979$.'},
    ],
  },
  */
  relacionades: ['pau-pro-24i-q4', 'ans', 'exacte-decimal', 'mode-decimal'],
},
{
  id: 'pau-pro-25j-q3',
  inici: calc(D),
  passos: [
    {apartat: 'a', tecles: ['0', 'punt', '0', '5', 'per', '0', 'punt', '6', 'mes', '0', 'punt', '0', '3', 'per', '0', 'punt', '4'],
      pantalla: calc(D, '0.05\\times 0.6+0.03\\times 0.4'),
      text: '[mat]a) De les peces de ferro, en són defectuoses el 5 % (100 − 95).[/mat] [calc]Probabilitat total; escriu $0.05\\times 0.6+0.03\\times 0.4$.[/calc]'},
    {apartat: 'a', tecles: ['exe', 'sd'], pantalla: marca(calc(D, '0.05\\times 0.6+0.03\\times 0.4', '0.042'), 'resultat'),
      parcials: {0: marca(calc(D, '0.05\\times 0.6+0.03\\times 0.4', '\\frac{21}{500}'), 'resultat')},
      text: '[calc]Prem [[exe]] ($\\frac{21}{500}$) i [[sd]]: 0.042, és a dir, un 4,2 % de les peces són defectuoses.[/calc]'},
    {apartat: 'c', tecles: ['5', 'per', 'lpar', '0', 'punt', '8', 'pot', '4', 'right', 'menys', '0', 'punt', '8', 'pot', '5', 'right', 'rpar'],
      pantalla: calc(D, '5\\times(0.8^{4}-0.8^{5})', '', {hist: true}),
      text: '[mat]c) El valor màxim és $f\\left(\\frac{4}{5}\\right)$.[/mat] [calc]Com que $\\frac{4}{5}=0{,}8$, escriu $5\\times(0.8^4-0.8^5)$. Després de cada exponent, surt-ne amb [[right]].[/calc]'},
    {apartat: 'c', tecles: ['exe'], pantalla: marca(calc(D, '5\\times(0.8^{4}-0.8^{5})', '\\frac{256}{625}'), 'resultat'),
      text: '[calc]Prem [[exe]]: $\\frac{256}{625}$, el valor exacte del màxim, perquè la calculadora és en mode {{E Mat/S Mat}}. En mode {{E Mat/S Decimal}} sortiria 0.4096, és a dir, $\\approx 0{,}41$.[/calc]'},
  ],
  /* «Ara tu» DESACTIVAT: de moment no surt als exercicis PAU reals. Per tornar-lo a activar,
     treu aquest comentari (ARCHITECTURE.md, «Disabled “Ara tu”»).
  araTu: {
    enunciat: 'Si el 90 % de les peces de ferro no tinguessin cap defecte (i el 3 % de les d\'acer fossin defectuoses), quina seria la probabilitat que una peça sigui defectuosa?',
    resultat: '0{,}072',
    error: 'Fer servir el 0,9 de les peces sense defecte en lloc del 0,1 de les defectuoses: surt 0.552.',
    inici: calc(D),
    passos: [
      {tecles: ['0', 'punt', '1', 'per', '0', 'punt', '6', 'mes', '0', 'punt', '0', '3', 'per', '0', 'punt', '4'], pantalla: calc(D, '0.1\\times 0.6+0.03\\times 0.4'),
        text: 'De les de ferro, en són defectuoses el 10 %: escriu $0.1\\times 0.6+0.03\\times 0.4$.'},
      {tecles: ['shift', 'exe'], pantalla: marca(calc(D, '0.1\\times 0.6+0.03\\times 0.4', '0.072'), 'resultat'),
        text: '[[shift]] [[exe]]: 0.072, un 7,2 %.'},
      {error: true, tecles: ['0', 'punt', '9', 'per', '0', 'punt', '6', 'mes', '0', 'punt', '0', '3', 'per', '0', 'punt', '4', 'shift', 'exe'],
        pantalla: marca(calc(D, '0.9\\times 0.6+0.03\\times 0.4', '0.552'), 'resultat'),
        text: '!!Error típic!!: amb el 0.9 de les peces sense defecte, surt 0.552.'},
    ],
  },
  */
  relacionades: ['pau-pro-24i-q4', 'exacte-decimal', 'pot-negativa', 'mode-decimal'],
},

);

})(Models.obre());
