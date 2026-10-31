/* ═══════════════════════════════════════════════════════════════════
   fitxes.js — Els blocs i les fitxes (NOMÉS DADES)
   ───────────────────────────────────────────────────────────────────
   BLOCS: els apartats de la portada, en ordre.
   FITXES: cada fitxa és un guió pas a pas:
     id         nom a l'adreça: fitxa.html?id=<id>
     bloc       clau de BLOCS
     titol      títol curt (portada i capçalera)
     enunciat   què farem (es veu al pas 0)
     inici      la pantalla del pas 0 (com està la calculadora abans de començar)
     passos     [{tecles, pantalla, text}]
                tecles   = ids de tecles.js, en ordre ('shift' afecta la tecla següent);
                           [] si el pas només explica la pantalla
                pantalla = com queda la pantalla després de prémer-les (guions.js)
                text     = la frase del pas
                parcials = (opcional) {índex de tecla: pantalla}, per a les pantalles
                           intermèdies que simulador.js no sap deduir
     relacionades  ids d'altres fitxes (opcional)

   Als textos: $$TeX$$ = fórmula en una línia pròpia; $TeX$ = fórmula; [[id]] = tecla; {{Text}} = opció d'un menú
   de la calculadora, escrita tal com hi surt.
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

const {IND, ind, calc, marca, config, configCalcul, entradaSortida, unitatAngular,
  formatNumero, normal, reiniciar, format, catalog, angCoordSexag, home, missatge} = G;

/* Fórmules que surten a diverses fitxes (com les escriu la pantalla) */
const SEN45 = '\\mathrm{sen}(45)';
const ARREL2_2 = '\\frac{\\sqrt{2}}{2}';
const D = IND.D, R = IND.R;
const FIX = ind(D, {fix: true});

const BLOCS = Object.freeze([
  {id: 'examen', titol: 'Abans de l\'examen', color: '#9a5b16',
    descripcio: 'Deixa la calculadora a punt i comprova-la en deu segons.'},
  {id: 'exacte', titol: 'Exacte o decimal', color: '#1d4ed8',
    descripcio: 'El mode «E Mat/S Mat», la tecla FORMAT, la drecera ≈ i què fer si tot surt decimal o arrodonit.'},
  {id: 'fraccions', titol: 'Fraccions', color: '#b33c3c',
    descripcio: 'Escriure fraccions, fraccions mixtes, prioritats i signes.'},
  {id: 'angles', titol: 'Graus o radians', color: '#0f766e',
    descripcio: 'Saber en quina unitat és la calculadora, canviar-la i fer un sol càlcul en l\'altra unitat.'},
  {id: 'pau', titol: 'Funcions útils per a la PAU', color: '#7c5cbf',
    descripcio: 'Taula de valors, f(x), Verificar, variables, Ans, combinacions… per comprovar el que fas a mà.'},
  {id: 'exercicis', titol: 'Exercicis PAU amb la calculadora', color: '#4338ca',
    descripcio: 'Exercicis reals de la PAU (2023-2026): on t\'ajuda la calculadora i quins errors cal evitar.'},
]);

const FITXES = Object.freeze([

/* ── ABANS DE L'EXAMEN ──────────────────────────────────────────── */
{
  id: 'reinicia', bloc: 'examen', titol: 'Reinicia la calculadora',
  enunciat: 'Algú ha tocat la configuració (aquí: radians i FIX). Abans d\'un examen, torna-la a l\'estat de fàbrica.',
  inici: calc(ind(R, {fix: true})),
  passos: [
    {tecles: ['settings'], pantalla: config(0),
      text: 'Prem [[settings]]: s\'obre el menú CONFIG.'},
    {tecles: ['down', 'down'], pantalla: config(2),
      text: 'Baixa fins a {{Reiniciar}} amb [[down]].'},
    {tecles: ['ok'], pantalla: reiniciar(0),
      text: 'Prem [[ok]]. La primera opció, {{Config y datos}}, torna tots els ajustos a com venien de fàbrica, però deixa l\'idioma i el contrast.'},
    {tecles: ['ok'], pantalla: missatge(['Config y datos', '¿Reiniciar?'], ['Sí', 'No'], 0),
      text: 'Prem [[ok]] i la calculadora et demana que ho confirmis.'},
    {tecles: ['ok'], pantalla: home(0),
      text: 'Tria {{Sí}} amb [[ok]]. Torna a la pantalla HOME, amb {{Calcular}} triada.'},
    {tecles: ['ok'], pantalla: marca(calc(D), 'ang'),
      text: 'Prem [[ok]] per obrir {{Calcular}}. A dalt hi ha √ (mode matemàtic) i D (graus), i ja no hi ha FIX: la calculadora està a punt.'},
  ],
  relacionades: ['prova-rapida', 'canvia-radians'],
},
{
  id: 'prova-rapida', bloc: 'examen', titol: 'Comprova-la en deu segons',
  enunciat: 'Dos càlculs que diuen si la calculadora està ben configurada abans de començar l\'examen.',
  inici: calc(D),
  passos: [
    {tecles: ['1', 'entre', '2'], pantalla: calc(D, '1\\div 2'),
      text: 'Primera prova: escriu $1\\div 2$.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '1\\div 2', '\\frac{1}{2}'), 'resultat'),
      text: 'Prem [[exe]]. Ha de sortir $\\frac{1}{2}$. Si surt 0.5, els resultats sortiran decimals: mira la fitxa «Em surt 0.5 en lloc d\'1/2».'},
    {tecles: ['sen', '3', '0', 'rpar'], pantalla: calc(D, '\\mathrm{sen}(30)', '', {hist: true}),
      text: 'Segona prova: escriu $\\mathrm{sen}(30)$ amb [[sen]], el 30 i [[rpar]].'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\mathrm{sen}(30)', '\\frac{1}{2}'), 'resultat'),
      text: 'Prem [[exe]]. En graus ha de sortir $\\frac{1}{2}$. Si surt −0.9880316241, la calculadora és en radians (R).'},
    {tecles: [], pantalla: marca(calc(D, '\\mathrm{sen}(30)', '\\frac{1}{2}'), 'ang'),
      text: 'Per acabar, mira la barra de dalt: hi ha d\'haver √ i D, i res més. Si hi veus FIX o SCI, els decimals sortiran arrodonits.'},
  ],
  relacionades: ['mode-decimal', 'error-angles', 'fix'],
},

/* ── EXACTE O DECIMAL ───────────────────────────────────────────── */
{
  id: 'indicadors', bloc: 'exacte', titol: 'Llegeix la barra de dalt',
  enunciat: 'Abans de calcular, mira la barra d\'indicadors de dalt de la pantalla: diu com està configurada la calculadora.',
  inici: calc(D, SEN45, ARREL2_2),
  passos: [
    {tecles: [], pantalla: marca(calc(D, SEN45, ARREL2_2), 'mat'),
      text: 'Aquesta icona vol dir que escrius en format matemàtic, com al llibre: les fraccions i les arrels es veuen tal com les escrius.'},
    {tecles: [], pantalla: marca(calc(D, SEN45, ARREL2_2), 'ang'),
      text: 'La lletra amb fons fosc és la unitat dels angles: D = graus, R = radians, G = graus centesimals (aquests, no els facis servir mai).'},
    {tecles: [], pantalla: marca(calc(D, SEN45, ARREL2_2), 'hist'),
      text: 'El triangle ▲ vol dir que hi ha càlculs anteriors: amb [[up]] els tornes a veure.'},
    {tecles: [], pantalla: marca(calc(FIX, '1\\div 6', '0.17', {}), 'fix'),
      text: 'Si hi veus FIX, la calculadora arrodoneix tots els decimals (aquí, a 2 decimals). SCI és semblant: fixa les xifres significatives. Si no ho has triat tu, treu-ho.'},
    {tecles: ['shift'], pantalla: marca(calc(ind(D, {shift: true}), '', '', {hist: true}), 'shift'),
      text: 'Si prems [[shift]], surt una S: la tecla següent farà el que hi ha escrit a sobre seu (per exemple, [[shift]] [[7]] escriu π). La S desapareix sola.'},
  ],
  relacionades: ['fix', 'mode-decimal'],
},
{
  id: 'exacte-decimal', bloc: 'exacte', titol: 'Valor exacte i valor decimal',
  enunciat: 'Calcula $\\mathrm{sen}\\,45^\\circ$ en forma exacta i en forma decimal.',
  inici: calc(D),
  passos: [
    {tecles: ['sen', '4', '5', 'rpar'], pantalla: calc(D, SEN45),
      text: 'Escriu $\\mathrm{sen}(45)$: [[sen]], el 45 i [[rpar]]. La calculadora és en graus (D).'},
    {tecles: ['exe'], pantalla: marca(calc(D, SEN45, ARREL2_2), 'resultat'),
      text: 'Prem [[exe]]. Com que la calculadora és en mode {{E Mat/S Mat}}, el resultat és el valor exacte, $\\frac{\\sqrt{2}}{2}$. A la PAU, aquesta és la resposta.'},
    {tecles: ['format'], pantalla: format(0),
      text: 'La tecla [[format]] obre un menú per canviar com es mostra el resultat. La primera opció, {{Estándar}}, és la forma exacta.'},
    {tecles: ['down'], pantalla: format(1),
      text: 'Baixa fins a {{Decimal}} amb [[down]].'},
    {tecles: ['ok'], pantalla: marca(calc(D, SEN45, '0.7071067812'), 'resultat'),
      text: 'Prem [[ok]]. És el mateix nombre, però ara en decimal: $0{,}7071067812$.'},
    {tecles: ['format', 'ok'], pantalla: marca(calc(D, SEN45, ARREL2_2), 'resultat'),
      text: 'Per tornar a la forma exacta: [[format]] i [[ok]], perquè {{Estándar}} ja està triada.'},
    {tecles: ['ac', 'sen', '4', '5', 'rpar'], pantalla: calc(D, SEN45, '', {hist: true}),
      text: 'Ara una drecera. Esborra amb [[ac]] i torna a escriure $\\mathrm{sen}(45)$.'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, SEN45, '0.7071067812'), 'resultat'),
      text: 'En lloc de [[exe]], prem [[shift]] i després [[exe]] (a sobre d\'EXE hi ha ≈): surt el resultat en decimal directament.'},
  ],
  relacionades: ['mode-decimal', 'indicadors'],
},
{
  id: 'mode-decimal', bloc: 'exacte', titol: 'Em surt 0.5 en lloc d\'1/2',
  enunciat: 'Calcules $1\\div 2$ i la calculadora dona $0{,}5$, mai fraccions ni arrels. Arregla-ho.',
  inici: calc(D),
  passos: [
    {tecles: ['1', 'entre', '2', 'exe'], pantalla: marca(calc(D, '1\\div 2', '0.5'), 'resultat'),
      text: 'Calcules $1\\div 2$ i surt 0.5. La icona √ hi és, però no ajuda: surt tant en {{E Mat/S Mat}} com en {{E Mat/S Decimal}}.'},
    {tecles: ['settings'], pantalla: config(0),
      text: 'Prem [[settings]]: s\'obre el menú CONFIG, amb {{Config cálculo}} triat.'},
    {tecles: ['ok'], pantalla: configCalcul(0),
      text: 'Prem [[ok]]. La primera opció és {{Entrada/Salida}}.'},
    {tecles: ['ok'], pantalla: entradaSortida(1),
      text: 'Prem [[ok]]. Aquí hi ha el problema: el ◉ és a {{E Mat/S Decimal}}. Vol dir «entrada matemàtica, sortida (salida) sempre decimal».'},
    {tecles: ['up'], pantalla: entradaSortida(1, 0),
      text: 'Puja a {{E Mat/S Mat}} amb [[up]]: entrada i sortida matemàtiques (fraccions, arrels, π).'},
    {tecles: ['ok'], pantalla: entradaSortida(0),
      text: 'Prem [[ok]]: el ◉ passa a {{E Mat/S Mat}}.'},
    {tecles: ['ac'], pantalla: calc(D),
      text: 'Prem [[ac]] per tornar a la pantalla de càlcul. En canviar aquest ajust, l\'historial s\'esborra (ja no hi ha ▲).'},
    {tecles: ['1', 'entre', '2', 'exe'], pantalla: marca(calc(D, '1\\div 2', '\\frac{1}{2}'), 'resultat'),
      text: 'Torna a calcular $1\\div 2$: ara surt $\\frac{1}{2}$.'},
  ],
  relacionades: ['exacte-decimal', 'reinicia'],
},
{
  id: 'fix', bloc: 'exacte', titol: 'Tot em surt arrodonit (FIX)',
  enunciat: 'Vols el decimal d\'$\\frac{1}{6}$ i surt $0{,}17$. A la barra hi ha FIX: algú hi va fixar 2 decimals.',
  inici: calc(FIX),
  passos: [
    {tecles: ['1', 'entre', '6', 'shift', 'exe'], pantalla: marca(calc(FIX, '1\\div 6', '0.17'), 'fix'),
      text: 'Amb [[shift]] [[exe]] demanes el decimal i surt 0.17: és arrodonit a 2 decimals per culpa de FIX. Si calcules amb arrodoniments, s\'acumulen errors.'},
    {tecles: ['settings', 'ok'], pantalla: configCalcul(0),
      text: 'Obre [[settings]] i entra a {{Config cálculo}} amb [[ok]].'},
    {tecles: ['down', 'down'], pantalla: configCalcul(2),
      text: 'Baixa fins a {{Formato número}}.'},
    {tecles: ['ok'], pantalla: formatNumero(0),
      text: 'Prem [[ok]]. El ◉ és a {{Fijar decim}}: decimals fixos.'},
    {tecles: ['down', 'down', 'ok'], pantalla: normal(1),
      text: 'Baixa fins a {{Normal}} i prem [[ok]]. Ara tries entre {{Normal 1}} i {{Normal 2}}: la de fàbrica és {{Normal 2}}.'},
    {tecles: ['ok'], pantalla: formatNumero(2),
      text: 'Amb {{Normal 2}} triada, prem [[ok]]: el ◉ passa a {{Normal}}.'},
    {tecles: ['ac'], pantalla: calc(D, '', '', {hist: true}),
      text: 'Prem [[ac]]. A la barra ja no hi ha FIX.'},
    {tecles: ['1', 'entre', '6', 'shift', 'exe'], pantalla: marca(calc(D, '1\\div 6', '0.1666666667'), 'resultat'),
      text: 'Torna a demanar el decimal: $0{,}1666666667$. Arrodoneix tu al final, només quan escriguis la resposta.'},
  ],
  relacionades: ['indicadors', 'reinicia'],
},

/* ── GRAUS O RADIANS ────────────────────────────────────────────── */
{
  id: 'canvia-radians', bloc: 'angles', titol: 'Posa la calculadora en radians',
  enunciat: 'En un exercici d\'anàlisi amb trigonometria cal treballar en radians. Calcula $\\mathrm{sen}\\,\\frac{\\pi}{6}$.',
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
      text: 'Escriu $\\mathrm{sen}(\\pi\\div 6)$. La π és [[shift]] [[7]].'},
    {tecles: ['exe'], pantalla: marca(calc(R, '\\mathrm{sen}(\\pi\\div 6)', '\\frac{1}{2}'), 'resultat'),
      text: 'Prem [[exe]]: $\\mathrm{sen}\\,\\frac{\\pi}{6}=\\frac{1}{2}$.'},
  ],
  relacionades: ['error-angles', 'grau-puntual'],
},
{
  id: 'error-angles', bloc: 'angles', titol: 'Troba l\'error: el mode equivocat',
  enunciat: 'La Laia calcula $\\cos\\frac{\\pi}{3}$, que hauria de ser $\\frac{1}{2}$, i la calculadora li dona $0{,}9998329795$. Què ha passat?',
  inici: calc(D),
  passos: [
    {tecles: ['cos', 'shift', '7', 'entre', '3', 'rpar', 'exe'], pantalla: marca(calc(D, '\\cos(\\pi\\div 3)', '0.9998329795'), 'resultat'),
      text: 'Fem el que ha fet la Laia: $\\cos(\\pi\\div 3)$ i [[exe]]. Surt 0.9998329795, i no $\\frac{1}{2}$.'},
    {tecles: [], pantalla: marca(calc(D, '\\cos(\\pi\\div 3)', '0.9998329795'), 'ang'),
      text: 'Mira la barra: D. La calculadora ha entès «π/3 graus», un angle d\'un grau escàs, i el seu cosinus és gairebé 1.'},
    {tecles: ['settings', 'ok', 'down', 'ok'], pantalla: unitatAngular(0),
      text: 'Ho arreglem: [[settings]], [[ok]] ({{Config cálculo}}), [[down]] ({{Unidad angular}}) i [[ok]].'},
    {tecles: ['down', 'ok'], pantalla: unitatAngular(1),
      text: 'Tria {{Radián}}: [[down]] i [[ok]].'},
    {tecles: ['ac'], pantalla: marca(calc(R, '', '', {hist: true}), 'ang'),
      text: 'Prem [[ac]]. Ara hi ha R.'},
    {tecles: ['cos', 'shift', '7', 'entre', '3', 'rpar', 'exe'], pantalla: marca(calc(R, '\\cos(\\pi\\div 3)', '\\frac{1}{2}'), 'resultat'),
      text: 'El mateix càlcul dona $\\frac{1}{2}$.'},
    {tecles: ['sen', '3', '0', 'rpar', 'exe'], pantalla: marca(calc(R, '\\mathrm{sen}(30)', '-0.9880316241'), 'resultat'),
      text: 'Ara l\'error contrari: en radians, $\\mathrm{sen}(30)$ és el sinus de 30 radians, −0.9880316241. Si el 30 són graus, la calculadora ha de ser en D.'},
  ],
  relacionades: ['canvia-radians', 'grau-puntual'],
},
{
  id: 'grau-puntual', bloc: 'angles', titol: 'Un sol angle en radians, sense canviar el mode',
  enunciat: 'La calculadora és en graus (D) i només necessites un càlcul en radians: $\\mathrm{sen}\\,\\frac{\\pi}{6}$.',
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
      text: 'Tanca el parèntesi i prem [[exe]]: $\\frac{1}{2}$, encara que la calculadora continua en D.'},
  ],
  relacionades: ['canvia-radians', 'error-angles'],
},


/* ── EXERCICIS PAU ──────────────────────────────────────────────── */
{
  id: 'pau-alg-24j-q2', bloc: 'exercicis', titol: 'Àlgebra · PAU 2024: comprova la solució d\'un sistema',
  enunciat: 'PAU juny 2024, qüestió 2 a). Per a $k=0$, el sistema és $$\\begin{cases}4x+2y-z=4\\\\ x-y=3\\\\ 3x+3y=1\\end{cases}$$ i has obtingut la solució $$x=\\frac{5}{3},\\qquad y=-\\frac{4}{3},\\qquad z=0.$$ Comprova-la amb la calculadora: substitueix-la a cada equació.',
  inici: calc(D),
  passos: [
    {tecles: ['4', 'per', 'frac', '5', 'down', '3', 'right', 'mes', '2', 'per', 'lpar', 'shift', 'menys', 'frac', '4', 'down', '3', 'right', 'rpar', 'menys', '0'],
      pantalla: calc(D, '4\\times\\frac{5}{3}+2\\times(-\\frac{4}{3})-0'),
      text: '1a equació, $4x+2y-z$: escriu $4\\times\\frac{5}{3}+2\\times\\left(-\\frac{4}{3}\\right)-0$. El signe negatiu de $y$ és (−): [[shift]] [[menys]]. Posa $y$ entre parèntesis.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '4\\times\\frac{5}{3}+2\\times(-\\frac{4}{3})-0', '4'), 'resultat'),
      text: 'Prem [[exe]]: surt 4, que és el membre de la dreta. ✓'},
    {tecles: ['frac', '5', 'down', '3', 'right', 'menys', 'lpar', 'shift', 'menys', 'frac', '4', 'down', '3', 'right', 'rpar'],
      pantalla: calc(D, '\\frac{5}{3}-(-\\frac{4}{3})', '', {hist: true}),
      text: '2a equació, $x-y$ (amb $k=0$, el terme $kz$ no hi és): escriu $\\frac{5}{3}-\\left(-\\frac{4}{3}\\right)$. No cal esborrar res: en començar a escriure, el càlcul anterior desapareix.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\frac{5}{3}-(-\\frac{4}{3})', '3'), 'resultat'),
      text: 'Prem [[exe]]: surt 3, el membre de la dreta. ✓'},
    {tecles: ['3', 'per', 'frac', '5', 'down', '3', 'right', 'mes', '3', 'per', 'lpar', 'shift', 'menys', 'frac', '4', 'down', '3', 'right', 'rpar'],
      pantalla: calc(D, '3\\times\\frac{5}{3}+3\\times(-\\frac{4}{3})', '', {hist: true}),
      text: '3a equació, $3x+3y$: escriu $3\\times\\frac{5}{3}+3\\times\\left(-\\frac{4}{3}\\right)$.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '3\\times\\frac{5}{3}+3\\times(-\\frac{4}{3})', '1'), 'resultat'),
      text: 'Prem [[exe]]: surt 1, el membre de la dreta. ✓ Es compleixen les tres equacions: la solució és correcta.'},
  ],
  relacionades: ['exacte-decimal'],
},

]);

arrel.Dades = Object.freeze({BLOCS, FITXES});

})(globalThis);
