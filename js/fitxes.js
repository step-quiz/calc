/* ═══════════════════════════════════════════════════════════════════
   fitxes.js — Els blocs i les fitxes (NOMÉS DADES)
   ───────────────────────────────────────────────────────────────────
   BLOCS: els apartats de la portada, en ordre (només id, títol i color: la portada no porta descripcions).
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
                apartat  = (opcional) la lletra de l'apartat de l'enunciat que es resol: es
                           ressalta a l'enunciat, marcat amb [a]…[/a]
                parcials = (opcional) {índex de tecla: pantalla}, per a les pantalles
                           intermèdies que simulador.js no sap deduir
     relacionades  ids d'altres fitxes (opcional)

   Als textos: $$TeX$$ = fórmula en una línia pròpia; $TeX$ = fórmula; [[id]] = tecla; {{Text}} = opció d'un menú
   de la calculadora, escrita tal com hi surt.
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

const {IND, ind, calc, marca, config, configCalcul, entradaSortida, unitatAngular,
  formatNumero, normal, reiniciar, format, catalog, angCoordSexag, home, missatge, definicio, menuFuncio} = G;

/* Fórmules que surten a diverses fitxes (com les escriu la pantalla) */
const SEN45 = '\\mathrm{sen}(45)';
const ARREL2_2 = '\\frac{\\sqrt{2}}{2}';
const D = IND.D, R = IND.R;
const FIX = ind(D, {fix: true});

const BLOCS = Object.freeze([
  {id: 'exacte', titol: 'Treballar en mode \'exacte\' o \'decimal\'', color: '#1d4ed8'},
  {id: 'fraccions', titol: 'Operar amb fraccions i potències', color: '#b33c3c'},
  {id: 'angles', titol: 'Treballar en mode \'graus\' o \'radiants\'', color: '#0f766e'},
  {id: 'pau', titol: 'Funcions útils per a la PAU', color: '#7c5cbf'},
  {id: 'pau-ag', titol: 'Exercicis PAU. Àlgebra i Geometria', color: '#4338ca'},
  {id: 'pau-ap', titol: 'Exercicis PAU. Anàlisi i Probabilitat', color: '#9a5b16'},
]);

const FITXES = Object.freeze([

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
  relacionades: ['exacte-decimal'],
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
  relacionades: ['indicadors'],
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
  id: 'pau-alg-24j-q2', bloc: 'pau-ag', titol: 'Àlgebra · PAU 2024: comprova la solució d\'un sistema',
  enunciat: 'PAU juny 2024, qüestió 2 a). Per a $k=0$, el sistema és $$\\begin{cases}4x+2y-z=4\\\\ x-y=3\\\\ 3x+3y=1\\end{cases}$$ i has obtingut la solució $$x=\\frac{5}{3},\\qquad y=-\\frac{4}{3},\\qquad z=0.$$ Comprova-la amb la calculadora: substitueix-la a cada equació.',
  inici: calc(D),
  passos: [
    {tecles: ['4', 'per', 'frac', '5', 'down', '3', 'right', 'mes', '2', 'per', 'lpar', 'menys', 'frac', '4', 'down', '3', 'right', 'rpar', 'menys', '0'],
      pantalla: calc(D, '4\\times\\frac{5}{3}+2\\times(-\\frac{4}{3})-0'),
      text: '1a equació, $4x+2y-z$: escriu $4\\times\\frac{5}{3}+2\\times\\left(-\\frac{4}{3}\\right)-0$. Posa $y$ entre parèntesis; el signe negatiu és la tecla [[menys]] de sempre.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '4\\times\\frac{5}{3}+2\\times(-\\frac{4}{3})-0', '4'), 'resultat'),
      text: 'Prem [[exe]]: surt 4, que és el membre de la dreta. ✓'},
    {tecles: ['frac', '5', 'down', '3', 'right', 'menys', 'lpar', 'menys', 'frac', '4', 'down', '3', 'right', 'rpar'],
      pantalla: calc(D, '\\frac{5}{3}-(-\\frac{4}{3})', '', {hist: true}),
      text: '2a equació, $x-y$ (amb $k=0$, el terme $kz$ no hi és): escriu $\\frac{5}{3}-\\left(-\\frac{4}{3}\\right)$. No cal esborrar res: en començar a escriure, el càlcul anterior desapareix.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\frac{5}{3}-(-\\frac{4}{3})', '3'), 'resultat'),
      text: 'Prem [[exe]]: surt 3, el membre de la dreta. ✓'},
    {tecles: ['3', 'per', 'frac', '5', 'down', '3', 'right', 'mes', '3', 'per', 'lpar', 'menys', 'frac', '4', 'down', '3', 'right', 'rpar'],
      pantalla: calc(D, '3\\times\\frac{5}{3}+3\\times(-\\frac{4}{3})', '', {hist: true}),
      text: '3a equació, $3x+3y$: escriu $3\\times\\frac{5}{3}+3\\times\\left(-\\frac{4}{3}\\right)$.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '3\\times\\frac{5}{3}+3\\times(-\\frac{4}{3})', '1'), 'resultat'),
      text: 'Prem [[exe]]: surt 1, el membre de la dreta. ✓ Es compleixen les tres equacions: la solució és correcta.'},
  ],
  relacionades: ['exacte-decimal'],
},

{
  id: 'pau-geo-25s-q4b', bloc: 'pau-ag', titol: 'Geometria · PAU 2025: distància d\'un punt a un pla',
  enunciat: 'PAU setembre 2025, qüestió 4 B a). Considereu el pla $\\pi: 2x-y+z=5$ i el punt $P=(0,1,3)$. Comproveu que la distància de $P$ a $\\pi$ és $\\frac{\\sqrt{6}}{2}$. $$d(P,\\pi)=\\frac{|2\\cdot 0-1+3-5|}{\\sqrt{2^2+(-1)^2+1^2}}$$',
  inici: calc(D),
  passos: [
    {tecles: ['2', 'per', '0', 'menys', '1', 'mes', '3', 'menys', '5'], pantalla: calc(D, '2\\times 0-1+3-5'),
      text: 'Primer, el numerador: substitueix $P$ a $2x-y+z-5$. Escriu $2\\times 0-1+3-5$.'},
    {tecles: ['exe'], pantalla: marca(calc(D, '2\\times 0-1+3-5', '-3'), 'resultat'),
      text: 'Prem [[exe]]: surt −3. El valor absolut el fas tu: $|-3|=3$.'},
    {tecles: ['frac', '3', 'down', 'arrel', '2', 'x2', 'mes', 'lpar', 'menys', '1', 'rpar', 'x2', 'mes', '1', 'x2'],
      pantalla: calc(D, '\\frac{3}{\\sqrt{2^{2}+(-1)^{2}+1^{2}}}', '', {hist: true}),
      text: 'Ara la distància: la fracció [[frac]] amb el 3 a dalt; [[down]] i, a baix, l\'arrel [[arrel]] de $2^2+(-1)^2+1^2$. El quadrat és [[x2]]. El −1, entre parèntesis: [[lpar]] [[menys]] 1 [[rpar]].'},
    {tecles: ['exe'], pantalla: marca(calc(D, '\\frac{3}{\\sqrt{2^{2}+(-1)^{2}+1^{2}}}', '\\frac{\\sqrt{6}}{2}'), 'resultat'),
      text: 'Prem [[exe]]: surt $\\frac{\\sqrt{6}}{2}$, el valor de l\'enunciat. ✓ En mode {{E Mat/S Mat}} la calculadora racionalitza sola; en mode decimal sortiria 1.224744871 i no ho podries comparar.'},
  ],
  relacionades: ['exacte-decimal', 'mode-decimal'],
},
{
  id: 'pau-ana-24i-q1', bloc: 'pau-ap', titol: 'Anàlisi · PAU 2024: Bolzano amb la calculadora',
  enunciat: 'PAU juny 2024 (incidències), qüestió 1 a). Considereu $f(x)=-2+10(x-1)\\ln x$, per a $x>0$. Comproveu que $f$ té una arrel a l\'interval $[1;\\,1{,}5]$ i busqueu un interval d\'una dècima de longitud que també la contingui.',
  inici: calc(D),
  passos: [
    {tecles: ['funcio'], pantalla: menuFuncio(0),
      text: 'Hauràs de calcular $f$ en diversos punts: defineix-la un sol cop. Prem [[funcio]] (FUNCTION).'},
    {tecles: ['down', 'down', 'ok'], pantalla: definicio('f'),
      text: 'Baixa fins a {{Definir f(x)}} i prem [[ok]].'},
    {tecles: ['menys', '2', 'mes', '1', '0', 'lpar', 'x', 'menys', '1', 'rpar', 'shift', 'logab', 'x', 'rpar'],
      pantalla: definicio('f', '-2+10(x-1)\\ln(x)'),
      text: 'Escriu $-2+10(x-1)\\ln(x)$. La $x$ és la tecla [[x]], i ln és [[shift]] [[logab]].'},
    {tecles: ['exe'], pantalla: calc(D),
      text: 'Prem [[exe]]: $f$ queda desada i tornes a la pantalla de càlcul.'},
    {tecles: ['funcio', 'ok', '1', 'rpar'], pantalla: calc(D, 'f(1)'),
      text: 'Calcula $f(1)$: [[funcio]], {{f(x)}} amb [[ok]] (escriu «f(»), l\'1 i tanca el parèntesi.'},
    {tecles: ['exe'], pantalla: marca(calc(D, 'f(1)', '-2'), 'resultat'),
      text: 'Prem [[exe]]: $f(1)=-2<0$.'},
    {tecles: ['funcio', 'ok', '1', 'punt', '5', 'rpar'], pantalla: calc(D, 'f(1.5)', '', {hist: true}),
      text: 'Ara $f(1{,}5)$, igual.'},
    {tecles: ['exe'], pantalla: marca(calc(D, 'f(1.5)', '0.02732554054'), 'resultat'),
      text: '$f(1{,}5)\\approx 0{,}0273>0$. Com que $f$ és contínua a $[1;\\,1{,}5]$ i canvia de signe, pel teorema de Bolzano hi ha una arrel. ✓'},
    {tecles: ['funcio', 'ok', '1', 'punt', '4', 'rpar'], pantalla: calc(D, 'f(1.4)', '', {hist: true}),
      text: '$f(1{,}5)$ és molt a prop de 0: l\'arrel deu ser a prop d\'1,5. Prova $f(1{,}4)$.'},
    {tecles: ['exe'], pantalla: marca(calc(D, 'f(1.4)', '-0.6541110535'), 'resultat'),
      text: '$f(1{,}4)\\approx -0{,}654<0$: hi ha canvi de signe a $[1{,}4;\\,1{,}5]$, un interval d\'una dècima. ✓'},
  ],
  relacionades: ['exacte-decimal'],
},
{
  id: 'pau-pro-24i-q4', bloc: 'pau-ap', titol: 'Probabilitat · PAU 2024: probabilitat total, Bayes i binomial',
  enunciat: 'PAU juny 2024 (incidències), qüestió 4. La Rut tira un dau: si surt 1, 2, 3 o 4, resol el problema ella mateixa i l\'encerta el 75 % de les vegades; si surt 5 o 6, el copia d\'Internet i l\'encerta el 40 %. [a]a) Probabilitat que la solució sigui correcta.[/a] [b]b) Probabilitat que l\'hagi resolt ella si és correcta.[/b] [c]c) Probabilitat que, de 5 problemes, almenys 4 siguin correctes.[/c]',
  inici: calc(D),
  passos: [
    {apartat: 'a', tecles: ['frac', '4', 'down', '6', 'right', 'per', '0', 'punt', '7', '5', 'mes', 'frac', '2', 'down', '6', 'right', 'per', '0', 'punt', '4'],
      pantalla: calc(D, '\\frac{4}{6}\\times 0.75+\\frac{2}{6}\\times 0.4'),
      text: 'a) Probabilitat total: $P(C)=\\frac{4}{6}\\cdot 0{,}75+\\frac{2}{6}\\cdot 0{,}4$. Escriu-ho tal qual, amb fraccions i decimals.'},
    {apartat: 'a', tecles: ['exe'], pantalla: marca(calc(D, '\\frac{4}{6}\\times 0.75+\\frac{2}{6}\\times 0.4', '\\frac{19}{30}'), 'resultat'),
      text: 'Prem [[exe]]: $P(C)=\\frac{19}{30}$. La calculadora dona la fracció exacta, encara que hagis escrit decimals.'},
    {apartat: 'b', tecles: ['lpar', 'frac', '4', 'down', '6', 'right', 'per', '0', 'punt', '7', '5', 'rpar', 'entre', 'frac', '1', '9', 'down', '3', '0'],
      pantalla: calc(D, '(\\frac{4}{6}\\times 0.75)\\div\\frac{19}{30}', '', {hist: true}),
      text: 'b) Bayes: $P(R\\mid C)=\\dfrac{\\frac{4}{6}\\cdot 0{,}75}{P(C)}$. Escriu $\\left(\\frac{4}{6}\\times 0{,}75\\right)\\div\\frac{19}{30}$.'},
    {apartat: 'b', tecles: ['exe'], pantalla: marca(calc(D, '(\\frac{4}{6}\\times 0.75)\\div\\frac{19}{30}', '\\frac{15}{19}'), 'resultat'),
      text: 'Prem [[exe]]: $P(R\\mid C)=\\frac{15}{19}$.'},
    {apartat: 'c', tecles: ['5', 'per', 'lpar', 'frac', '1', '9', 'down', '3', '0', 'right', 'rpar', 'pot', '4', 'right', 'per', 'frac', '1', '1', 'down', '3', '0', 'right',
      'mes', 'lpar', 'frac', '1', '9', 'down', '3', '0', 'right', 'rpar', 'pot', '5'],
      pantalla: calc(D, '5\\times(\\frac{19}{30})^{4}\\times\\frac{11}{30}+(\\frac{19}{30})^{5}', '', {hist: true}),
      text: 'c) Binomial, amb $n=5$ i $p=\\frac{19}{30}$: $P(X\\ge 4)=5\\,p^4(1-p)+p^5$, perquè $\\binom{5}{4}=5$ i $1-p=\\frac{11}{30}$. La potència és [[pot]]; amb [[right]] surts de l\'exponent.'},
    {apartat: 'c', tecles: ['exe'], pantalla: marca(calc(D, '5\\times(\\frac{19}{30})^{4}\\times\\frac{11}{30}+(\\frac{19}{30})^{5}', '0.3968623045'), 'resultat'),
      text: 'Prem [[exe]]: $P(X\\ge 4)\\approx 0{,}3969$. La fracció exacta tindria massa xifres, i la calculadora la dona en decimal.'},
    {apartat: 'c', tecles: ['5', 'per', '0', 'punt', '6', '3', 'pot', '4', 'right', 'per', '0', 'punt', '3', '7', 'mes', '0', 'punt', '6', '3', 'pot', '5', 'exe'],
      pantalla: marca(calc(D, '5\\times 0.63^{4}\\times 0.37+0.63^{5}', '0.3906734328'), 'resultat'),
      text: 'Error que cal evitar: si arrodoneixes $p\\approx 0{,}63$, surt 0,3907 i no 0,3969: ja falla la segona xifra decimal. Treballa amb $\\frac{19}{30}$.'},
  ],
  relacionades: ['exacte-decimal'],
},
]);

arrel.Dades = Object.freeze({BLOCS, FITXES});

})(globalThis);
