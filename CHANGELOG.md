# Historial de versions

Què ha canviat a cada versió del web, de la més nova a la més antiga. El funcionament actual és a
`README.md` i `ARCHITECTURE.md`; aquí només hi ha la història. El número de versió és `VERSIO` a
`js/nucli/models.js` i surt al peu de les pàgines.

## Versió 90 (3/11/2026)

- Quatre fitxes noves al bloc «Exercicis PAU. Anàlisi i Probabilitat», grup Anàlisi, triades per David a l'artifact
  de propostes:
  - «(2023). Bolzano amb la e» (PAU setembre 2023, qüestió 4 a): la e i l'exponent amb la plantilla; zona d'error si
    se surt de l'exponent abans de la x.
  - «(2026). Dues baranes: π, ≈ i Ans» (PAU juny 2026, exercici 4 A).
  - «(2026). Màxim i mínim absoluts en un interval» (PAU juny 2026, sèrie 5, exercici 3.3); zona d'error amb log en
    lloc de ln.
  - «(2026). Creixement i extrems amb f(x) i g(x)» (PAU setembre 2026, exercici 1.1): la funció a f(x) i la derivada
    a g(x); a la fx-82/85SP X II, una sola taula amb f i g. No surt a la fx-82MS (massa llarga sense f(x) ni g(x)).
- Norma nova (David): quan una fitxa fa servir f(x) i g(x), la funció sempre és f(x) i la derivada, g(x).
- Portada: un bloc amb més de 8 fitxes ja no fa la targeta més alta que la dels altres blocs; la llista es desplaça per
  dins de la targeta, amb una ombra a baix que diu que n'hi ha més. Ara passa al bloc T6 de Batxillerat.
- Simulador CW: ALPHA també funciona mentre s'escriu una funció (la e de les X II a la Taula). A la fx-82/85SP X II,
  MENU funciona des de la taula.

## Versió 89 (3/11/2026)

- Documentació repassada sencera (HANDOUT, ARCHITECTURE, CLAUDE, README, VERIFICAR): l'estat actual del web en una
  pantalla, com treballar amb David, com lliurar i comprovar la publicació, i l'editor d'enunciats.
- Un enunciat que ocupa una sola línia ja no es pot plegar: no hi surt la icona (el seu lloc es queda buit, perquè
  l'enunciat no es mogui) i clicar-lo no fa res.

## Versió 88 (3/11/2026)

- La vora del botó per plegar l'enunciat, en passar-hi el ratolí, ja no queda retallada: la columna s'eixampla 6 px més.
- Abans de començar la fitxa (calculadora inactiva), el cursor de text de la pantalla no surt ni parpelleja.

## Versió 87 (3/11/2026)

- A l'esquerra de l'enunciat, centrada, una icona per plegar-lo (fletxes cap a una ratlla) o desplegar-lo (fletxes cap
  a fora). En passar-hi el ratolí, vora negra gruixuda i fons gris clar. A les pantalles estretes no surt: l'enunciat
  es plega clicant-lo.

## Versió 86 (3/11/2026)

- L'enunciat ja no es plega sol en començar: sempre es veu sencer, perquè no es perdi la part que ressalta cada pas.
  L'alumne el plega clicant-lo (amb la cortina de 0,9 s) i el desplega igual.
- A l'ordinador, un enunciat molt llarg ocupa com a molt el 34 % de la finestra i es desplaça per dins; la part que
  ressalta el pas es posa a la vista sola.
- «El punt simètric respecte d'un pla»: l'últim pas, massa llarg, es divideix en dos (el pla $\pi_2$ va a un pas nou).

## Versió 85 (3/11/2026)

- Botons ◀ ↻ ▶: en passar-hi el ratolí, la vora es fa més gruixuda i el fons es torna gris clar.
- A «Prem ▶ o la fletxa ↓ del teclat per començar», el ▶ surt dins d'un cercle, com el botó.

## Versió 84 (3/11/2026)

- L'enunciat es plega amb una animació de 0,9 s, com una cortina que puja, i la part de baix s'esvaeix a poc a poc.
  En clicar-lo, es desplega també animat.

## Versió 83 (3/11/2026)

- En obrir una fitxa, abans de començar, només es veu l'enunciat: la llista de passos no hi és i la calculadora surt
  esvaïda (al 30 %), perquè es vegi que encara és inactiva. En prémer ▶, apareixen els passos i la calculadora sencera.

## Versió 82 (3/11/2026)

- Textos revisats per David amb l'editor d'enunciats: 41 fitxes (enunciats, títols, tancaments i «Prova-ho tu»; també
  els textos propis de la fx-82MS i de les X II).
- «Nombres combinatoris» amb l'enunciat nou, $p=\frac{1}{3}$: els passos calculen ara
  $\binom{6}{4}\left(\frac{1}{3}\right)^4\left(\frac{2}{3}\right)^2=\frac{20}{243}$ a totes les calculadores.

## Versió 81 (3/11/2026)

- Les fletxes que conviden a passar al pas següent surten primer dins de dos cercles grocs. Aquesta fase ben visible
  s'escurça a cada visita: 4 s la primera, 3,5, 2,5, 1,5, 0,5 i, a partir de la sisena visita, ja no hi és (només les
  fletxes discretes).
- Les visites es compten de nou: una per sessió del navegador, tant si s'entra per la portada com per una fitxa
  (recarregar la pàgina o canviar de fitxa no en suma). El botó «↓ Envia-les a baix» també compta així.

## Versió 80 (3/11/2026)

- Les dues fletxes que conviden a passar al pas següent surten ben visibles (més grans i del tot opaques) durant 4 s;
  després es queden suaus, com fins ara.
- Portada: en passar el ratolí per una fitxa de les targetes T1…T6, un fons suau del color del bloc (abans, el color
  sencer) i una vora negra gruixuda.
- Eina nova (no es publica a la web): `proves/editor/`, per a l'artifact «Editor d'enunciats».

## Versió 79 (3/11/2026)

- Portada: la ratlla que separa els temes del T5 i del T6, negra i amb un 30 % més d'espai.
- «Arrels d'índex n» es diu ara «Arrels quadrades, cúbiques, ...».
- T3 de Batxillerat: la fitxa «Un sol angle en radians, sense canviar el mode» se substitueix per **«Convertir de graus
  a radiants»**: $60^\circ$ es multiplica pel factor de conversió $\frac{\pi}{180}$ i surt $\frac{\pi}{3}$. Després,
  l'error típic de capgirar el factor ($\frac{180}{\pi}$): els graus no se simplifiquen i surt 3437.746771, que no pot
  ser. «Ara tu»: $135^\circ$.

## Versió 78 (3/11/2026)

- Portada, les bombolles: d'una sola línia, només amb el títol, i amb noms nous, en aquest ordre: «Interpretar els
  indicadors de pantalla», «Configurar-ho tot abans d'un examen» i «Correcció d'errors d'escriptura».
- El botó «↓ Envia-les a baix» (o «↑ Torna-les a dalt») va a l'esquerra de les bombolles i té relleu, com «← Fitxes»
  però més suau.
- Les targetes T1…T6, més estretes: tan amples com el títol de bloc més llarg en una sola línia. La portada queda
  centrada.
- Títols dels exercicis PAU sense «PAU» al davant: «(2024). Comprova la solució d'un sistema» (el bloc ja diu PAU).
- T5 i T6 de Batxillerat: una ratlla separa els exercicis d'Àlgebra dels de Geometria, i els d'Anàlisi dels de
  Probabilitat (camp nou `grup` dels exercicis).

## Versió 77 (3/11/2026)

- Portada: a partir de la 10a visita en un navegador, al final de la fila de bombolles surt un botó discret, «↓ Envia-les
  a baix». Si l'alumne el prem, les bombolles passen a sota de les targetes (el navegador ho recorda) i unes fletxes ↓
  conviden a baixar-hi: al marge esquerre en les pantalles amples, al racó de baix a l'esquerra en les altres. Les
  fletxes s'amaguen quan les bombolles ja es veuen, i en clicar-les la pàgina hi baixa. A baix, «↑ Torna-les a dalt».

## Versió 76 (3/11/2026)

- Portada: les tres bombolles («Abans de començar», «Abans de l'examen», «Interpretem els símbols a la pantalla») surten
  a dalt, en una fila abans de les targetes T1, T2…: es veuen sense desplaçar la pàgina.

## Versió 75 (3/11/2026)

- Bombolla nova, a ESO i a Batxillerat: **«Interpretem els símbols a la pantalla»**, amb la fitxa «Què vol dir cada
  símbol de la pantalla?». En 9 o 10 passos explica tot el que surt a la pantalla a part dels nombres: la icona de
  format matemàtic, D, R i G, ▲, la S de SHIFT (i la A d'ALPHA a les X II i a la MS), FIX, SCI, el ✔ de Verificar (CW),
  les fletxes quan l'expressió no hi cap, la notació científica i, a la MS, la fracció amb ┘. Acaba amb un «Prova-ho tu».
- La fitxa «Llegeix la barra de dalt» del T1 de Batxillerat s'hi ha traslladat (ampliada): el T1 comença ara per «Valor
  exacte i valor decimal». Els enllaços antics (`fitxa.html?id=indicadors`) continuen funcionant.
- Les proves recalculen també els resultats amb SCI.

## Versió 74 (3/11/2026)

- Les velocitats «normal» (la de per defecte) i «lenta», un 15 % més lentes: totes les durades de l'animació de les
  tecles, × 1,15 (factors 1,90 i 3,46). La «ràpida» no canvia, ni tampoc els temps d'atenció abans de cada pas.

## Versió 73 (2/11/2026)

- Arreglat: amb Brave (o amb un bloquejador de publicitat) sortia la caixa «La pàgina no s'ha pogut carregar bé» encara
  que la pàgina funcionava. El fitxer que fallava era el comptador de visites que Cloudflare afegeix a la pàgina
  (`static.cloudflareinsights.com/beacon.min.js`), que Brave bloqueja. `js/vigia.js` ja només avisa dels fitxers i dels
  errors del mateix web.

## Versió 72 (2/11/2026)

- Arreglat: a la primera visita, si l'alumne triava la calculadora que ja es mostrava (la fx-82SP CW), la finestra es
  tancava sense desar la tria i el web li continuava demanant que n'escollís una. Ara es desa i la pàgina es torna a
  carregar amb «Canviar de calculadora» i el nom de la calculadora al títol.

## Versió 71 (2/11/2026)

- Al ⚙ de la fitxa, «Color del cursor»: l'alumne tria entre 16 colors (cap negre) el del cursor que prem les tecles. El
  navegador el recorda. La vora del cursor es torna blanca amb els colors foscos, perquè es vegi sempre.
- El menú del ⚙ és més ample i trepitja clarament la calculadora (abans s'acabava just on començava).
- Primera visita (cap calculadora triada en aquest navegador): el títol de la portada diu «La teva calculadora, pas a
  pas» (es mostra la fx-82SP CW, però el títol no la nomena) i el botó «Escollir calculadora», després del ressaltat
  d'1,5 s, es queda groc pur fins que l'alumne en tria una.

## Versió 70 (2/11/2026)

- La llista de passos acaba amb un pas més, «Prova-ho tu» (o «Ara tu»), numerat com els altres: l'alumne veu què ve
  després. Des de l'últim pas, ▶ o la fletxa ↓ l'obren; també clicant-lo.
- Quan un pas s'ha acabat, al cap d'1,2 s surten dues fletxes discretes a sota del pas, que apunten cap al següent i es
  mouen una mica: conviden a avançar sense pressa.
- «Escollir calculadora», en un ordre nou: fx-82SP CW, fx-570/991SP CW, fx-570/991SP X II (primera fila) i
  fx-82/85SP X II, fx-82/85/350MS (segona fila).

## Versió 69 (2/11/2026)

- Abans de les tecles de cada pas, un moment més de calma: quan les tecles que no són del pas ja s'han apagat, la
  calculadora es queda quieta 0,8 s perquè la mirada s'hi fixi, i després el cursor comença a prémer.
- «← Fitxes»: el relleu de sota, molt més gruixut (s'enfonsa del tot en prémer-lo).
- Capçalera de la fitxa: entre «T6 · Trigonometria» i «2. L'altura d'un arbre: la tangent» ja no hi ha el signe ›,
  només l'espai de dos espais en blanc.
- Documentació posada al dia (HANDOUT, ARCHITECTURE, VERIFICAR).

## Versió 68 (2/11/2026)

- «Amplia la figura» ja funciona amb les figures dibuixades (SVG, p. ex. T6 · Trigonometria, l'escala): abans la finestra
  sortia buida i petita.
- Capçalera de la fitxa: «← Fitxes» és un botó amb relleu (s'enfonsa en prémer-lo); «T6 · Trigonometria › 3. L'escala
  recolzada: el sinus» és text pla, centrat, de la mateixa mida, sense caixeta.

## Versió 67 (2/11/2026)

La tria del laboratori d'UX (combinació «final-1»), que ara és el comportament de sempre:
- L'enunciat es plega a una línia un cop començada la fitxa; en clicar-lo, es desplega (A2).
- La capçalera: «Escollir calculadora» i l'idioma, dins d'un ⚙ gran a la dreta, que es ressalta 1,5 s si l'alumne
  encara no ha triat calculadora (A3). «T4 · <bloc>» i «2. <fitxa>», sense negreta, en lletra negra sobre una caixeta
  blanca, com «← Fitxes».
- Les tecles que no són del pas, apagades al 40 % (B1).
- [mat] i [calc] sense fons de color: una icona petita (llapis / calculadora) i una ratlla entre l'una i l'altra (C3).
- L'«Ara tu» / «Prova-ho tu» no surt sol en acabar: s'hi va amb ▶ des de l'últim pas, en una pantalla a part (D2).

## Versió 66 (2/11/2026)

- Els botons ◀ ↻ ▶ fan la mateixa mida, i ▶ ja no té fons de color ni parpelleja quan l'alumne no avança.
- A la fitxa ja no hi ha «Fitxes de «…»» (ni «Et pot interessar»): per canviar de fitxa, «← Fitxes».
- El peu de la fitxa surt sencer en obrir-la i, al cap de 5 s, només hi queda «© 2026 David Arso Civil». A la portada,
  el peu sencer queda sempre a la vista, enganxat a baix de la finestra.
- Palanques per al laboratori d'UX (`js/nucli/ux.js`): amb `?ux=a1,b3,…` a l'adreça, la fitxa prova variants de la
  interfície (16 palanques: menys zones, tecles apagades, sense cursor, lupa, temps de lectura, la frase sota la
  calculadora, una altra disposició…). Sense `?ux=`, no canvia res. Els enllaços conserven `?ux=`.
- Durant el temps entre passos, les tecles del pas anterior ja no queden marcades.
- `proves/ux.js` prova cada palanca; `proves/encaix.js` prova els peus en lloc del recordatori de ▶.

## Versió 65 (2/11/2026)

- Arreglat: en començar a animar un pas, sortia una barra de desplaçament vertical. La causa era el cursor, que apareix
  just a sota de la calculadora (i la vora d'atenció, una ombra per fora). Ara la zona de la calculadora retalla el que
  en surt (`overflow: clip`), i la vora groga es dibuixa per dins de la calculadora, sense canviar-ne la mida ni l'ombra.
- `proves/encaix.js` comprova que la pàgina no fa scroll mentre s'anima un pas.

## Versió 64 (2/11/2026)

- Abans d'animar un pas, la mirada té temps d'anar a la calculadora: 0,3 s sense res marcat i, després, la vora de la
  calculadora en groc, que s'esvaeix en 0,6 s. Aquests temps no depenen de la velocitat.
- La velocitat «lenta», un 20 % més lenta encara.
- La capçalera de la fitxa diu on som, com a la portada: «T1 · <bloc>» i «1. <fitxa>», en lloc del nom de la
  calculadora (que continua a la portada).
- El botó diu «Escollir calculadora» i s'il·lumina 1,5 s mentre l'alumne no n'hagi triat cap en aquest navegador; després
  diu «Canviar de calculadora». Les targetes de la portada (T1…T6) i les bombolles, de fons gairebé blanc.
- Figures als enunciats: el tram d'escala (cb4-26-q7) i la foto (cb4-23-q26), retallades de les preguntes, i tres
  dibuixos nous per a trigonometria (l'arbre, també a «posa-la en graus», i les dues escales).
- «Regla de Barrow»: «Ara tu» desactivat, com als exercicis PAU.
- fx-570/991SP X II i fx-82/85SP X II: el decimal d'un resultat exacte s'obté amb = i S⇔D en 11 passos més (SHIFT =
  només queda quan el decimal és periòdic, a la fitxa de FIX i al pas que ensenya la drecera ≈). Textos dels menús de la
  fx-82/85SP X II segons el manual en català (Rang taula, Inici, Fi, Pas; Verdader; Fixar decimals…) i colors segons
  les fotos (tecles de baix negres).

## Versió 63 (2/11/2026)

- La fx-85MS i la fx-350MS fan servir la fx-82MS: el mateix manual i el mateix teclat (fotos de producte). Al selector,
  «fx-82/85/350MS». Només canvien els colors, la placa solar de la fx-85MS i la tecla EXP, que a la fx-82MS (2a edició)
  es diu ×10ˣ.
- El nom llarg de les dues X II diu que també serveixen per a les SP X, sense «II».

## Versió 62 (2/11/2026) — la fx-82/85SP X II

- Cinquena calculadora: la **fx-82SP X II** (i la fx-85SP X II, la fx-350SP X II i les SP X sense «II»: el mateix
  manual i el mateix teclat), «fx-82/85SP X II» al selector. És la germana petita de la fx-570/991SP X II: el mateix
  cos i les mateixes tecles, però sense CALC, SOLVE, ∫ ni d/dx (hi ha ⌙ i Simp), totes les tecles fosques i DEL i AC
  grogues. MENU té quatre aplicacions: Calcular, Estadística, Tabla i Verificar.
- Totes les fitxes. Les de la fx-570/991SP X II, i les de f(x) amb **Tabla**: «Calcula valors d'una funció amb Tabla»
  (f i g en una sola taula: extrems i tangent), «Bolzano» (taula d'1 a 1,5 de 0,1 en 0,1) i «Intueix els límits amb
  Tabla» (prop d'1 i lluny). Barrow, substituint a la primitiva: «Regla de Barrow: substitueix a la primitiva».
- Pantalles noves: el rang de la taula (Inic., Final, Paso) i la taula (4 files, la cel·la triada en negatiu i el seu
  valor a baix). Les proves recalculen cada valor de la taula.

## Versió 61 (2/11/2026) — la capçalera

- En passar el ratolí pel nom de la calculadora del títol («La calculadora fx-…, pas a pas»), surt una foto petita
  de la calculadora (a la portada i a la fitxa).
- La capçalera, d'un gris més suau. Els botons van just després del títol, en aquest ordre: «Escollir calculadora»,
  «Etapa» i «Calculadora en».
- Portada: marges laterals més petits, títols dels blocs una mica més petits i columnes d'almenys 400 px, perquè
  «Fracció o decimal. Arrodonir. Notació científica» hi càpiga en una línia.

## Versió 60 (2/11/2026)

- Les dues bombolles petites, «Abans de començar» i «Abans de l'examen», surten a totes dues etapes, una al costat de
  l'altra (abans, cada una només en una etapa).

## Versió 59 (2/11/2026)

- «Escollir calculadora»: només el nom curt, sense el nom llarg ni l'etiqueta «La teva» (la calculadora d'ara té la
  vora verda); el títol, un 20 % més petit; les imatges de les calculadores, tan altes com permet la casella.
- Fraccions sense nombres mixtos. A la fx-82MS, un resultat decimal passa a fracció amb SHIFT a b/c (d/c): 1.75 → 7┘4,
  i no 1┘3┘4 (fitxes «Em surt una fracció: vull el decimal», «Fracció de sumes: on van els parèntesis» i «Potència d'una fracció»).
- fx-570/991SP X II: quan ja hi ha una fracció (o un resultat exacte) a la pantalla, el decimal s'obté amb S⇔D i no
  amb SHIFT = (5 fitxes d'ESO). SHIFT = continua servint per obtenir el decimal directament.

## Versió 58 (2/11/2026) — «Escollir calculadora»

- La calculadora ja no es tria amb un desplegable: el botó **«Escollir calculadora»** (a la portada i a la fitxa) obre
  una finestra amb totes les calculadores en una graella de 3 columnes (2 o 1 al mòbil), cada una amb la seva imatge i
  el nom. La casella es ressalta en passar-hi el ratolí; en clicar-la, s'obre la mateixa pàgina amb aquella
  calculadora. La que es fa servir porta «La teva». Esc, la creu o un clic fora la tanquen.
- La calculadora triada surt al títol de la capçalera, també a la fitxa («La calculadora fx-…, pas a pas»); el botó
  de tornar es diu «← Fitxes».
- Les imatges són fotos del dibuix de cada calculadora (`models/<id>/imatge.png`), fetes amb `proves/imatges.js`.

## Versió 57 (2/11/2026) — la fx-570/991SP X II, completa

- La **fx-570/991SP X II** té totes les fitxes de la fx-82SP CW, amb les seves tecles: = en lloc d'EXE, la tecla (−)
  per als negatius, SHIFT ×10ˣ per a π, la tecla ln, SHIFT (−) per a log, SHIFT x■ per a l'arrel d'índex n i S⇔D en
  lloc de FORMAT. Les que fan servir menús, amb els menús numerats de la X II: SHIFT MENU (CONFIG: entrada/sortida,
  unitat dels angles, format del nombre), OPTN (la r d'un sol angle en radians) i SHIFT ÷ (nCr).
- Les fitxes de f(x), amb **CALC**: s'escriu l'expressió amb la x un sol cop i CALC la calcula per a cada valor
  («Calcula valors d'una funció amb CALC», «Regla de Barrow amb CALC», on F(6) − F(1) es fa amb PreAns − Ans, i
  «Intueix els límits amb CALC»). «Comprova una igualtat» fa servir l'aplicació **Verificar** (MENU i la C).
- La X II té la tecla ALPHA (la A a la barra) i una pantalla nova, la de les aplicacions de MENU.
- La velocitat «lenta» és un 20 % més lenta (també les xifres).
- Les proves recalculen també els resultats de CALC i de PreAns.

## Versió 56 (2/11/2026) — la fx-570/991SP X II, primera fase

- Quarta calculadora: la **fx-570SP X II** (i la fx-991SP X II), «fx-570/991SP X II» al selector. Té un teclat propi
  (`models/fx-570sp-x2/tecles.js`), dibuixat amb les mides de la foto de producte: tecles rectangulars, les quatre de dalt
  rodones, les funcions de SHIFT en groc i les d'ALPHA en rosa. La pantalla, l'editor de fórmules i el simulador són els
  de la fx-82SP CW; el que fa diferent és a `variant.js`: la tecla (−), la tecla ln, SHIFT (−) = log, SHIFT ×10ˣ = π,
  la tecla = i els **menús numerats** (SHIFT MENU obre CONFIG, i les opcions es trien prement el número).
- De moment, 4 fitxes de mostra per revisar (ESO): l'hotel, les estrelles (amb S⇔D), el quadrat d'un negatiu (amb (−))
  i posar la calculadora en graus (amb SHIFT MENU i els menús numerats). Els altres blocs diuen «Properament».
- La prova del teclat accepta tecles rectangulars; `VERIFICAR.md` té un apartat nou per a la X II.

## Versió 55 (2/11/2026)

- Portada: l'interior dels blocs, un 10 % més blanc que el fons de la pàgina; les fitxes, sense la vora gruixuda de
  l'esquerra.
- Títols dels exercicis PAU més curts: «PAU (2024). Comprova la solució d'un sistema» en lloc de «Àlgebra · PAU 2024:
  comprova…».

## Versió 54 (2/11/2026)

- Tercera calculadora: la **fx-570SP CW** (i la fx-991SP CW, que té el mateix teclat), «fx-570/991SP CW» al selector.
  És una calculadora «germana» de la fx-82SP CW: fa servir el seu dibuix, la seva pantalla, el seu simulador i totes
  les seves fitxes, i només hi canvia el que és diferent (`models/fx-570sp-cw/variant.js`): el cos blanc, PreAns sobre
  Ans, *i* sobre el 9 i el menú Config cálculo, que té dues files més (Símb ingeniería i Result complejo).
- Els fitxers d'una calculadora ja no porten l'id escrit (`Models.obre()`): així una altra calculadora els pot
  reaprofitar.
- La solució del «Prova-ho tu» de la fitxa de graus ja no parla d'una calculadora concreta.

## Versió 53 (2/11/2026)

- `js/vigia.js` (el primer script de cada pàgina, en JavaScript antic): si un fitxer no es carrega, hi ha un error de
  JavaScript o al cap de 10 s la pàgina no s'ha dibuixat, surt una caixa amb el missatge, el fitxer i el navegador, en
  lloc d'una pantalla en blanc. La portada i la fitxa avisen quan han acabat (`Vigia.llesta()`).

## Versió 52 (2/11/2026)

- Les xifres i el punt s'animen 3 vegades més de pressa que la resta de tecles (a la v50, 1,4 vegades).
- Arreglat: el resum d'una línia dels passos podia eixamplar la columna de l'esquerra (scroll horitzontal): dins de
  l'«Ara tu» (la graella no el retallava) i en algunes fitxes de la fx-82MS (el MathML ocult de KaTeX en sortia).
- `proves/encaix.js` també comprova que la columna de l'esquerra no faci scroll horitzontal, també en mode «Ara tu».

## Versió 51 (2/11/2026) — aspecte

- Colors: blanc trencat (amb un punt de gris i de marró) en lloc del blanc pur, i capçalera gris fosc.
- Portada: sense la línia «Matemàtiques · Batxillerat · PAU» (camp `lema` de les etapes, eliminat); els blocs es
  numeren T1, T2… (un 20 % més grans) i les fitxes 1, 2… (sense el 0 de davant).
- El peu, un 10 % més gran.
- Confirmat a la calculadora: DEL a la fx-82SP CW (`VERIFICAR.md`, fila 29).

## Versió 50 (2/11/2026) — revisió del projecte

- **Exercicis comuns.** La part d'una fitxa que no depèn de la calculadora (títol, enunciat, font,
  figura, tancament, «Prova-ho tu») és ara a `exercicis/`, una sola vegada. Cada calculadora hi posa
  només les tecles i les pantalles, i pot substituir un camp si cal (p. ex. un enunciat de la fx-82MS
  que parla de la tecla a b/c). Els blocs també són a `exercicis/blocs.js`.
- **Reproductor.** `js/nucli/motor.js` s'ha dividit: el reproductor pas a pas és a
  `js/nucli/reproductor.js` i les eines del DOM, a `js/nucli/dom.js`.
  - Les xifres i el punt s'animen 1,4 vegades més de pressa que la resta de tecles.
  - La llista de passos ja no mostra les tecles petites: cada pas que no és l'actual mostra el número
    i el començament de la frase.
  - Botó ↻ (i tecla R): torna a animar el pas actual.
  - Amb la figura ampliada, les fletxes del teclat ja no fan avançar la fitxa per darrere.
- **Tancament.** Si una fitxa acaba amb un error, l'últim pas ja no diu «Activitat finalitzada»: torna
  a la pantalla del resultat bo i recorda la manera correcta (camp `tancament`, obligatori).
- **ESO.**
  - «Prova-ho tu» a totes les fitxes dels blocs d'ESO: un exercici semblant i la solució amagada.
  - Les frases d'ESO ja no parlen del mode «E Mat/S Mat»: «la calculadora està configurada per donar
    resultats exactes».
  - Fitxa nova «La calculadora en radians: posa-la en graus» (Trigonometria), amb l'error de calcular
    en radians.
  - Bombolla nova «Abans de començar» amb la fitxa «M'he equivocat en escriure: corregeix-ho» (DEL i
    el cursor). El simulador de la fx-82SP CW ja sap fer DEL.
- **Mòbil.** La capçalera ja no desborda: els selectors passen a la línia següent.
- **Petits arreglos.** El peu estàtic d'`index.html` diu la versió bona (la prova ho comprova); la
  descripció de `fitxa.html` parla d'ESO i de Batxillerat; a la portada, una bombolla petita amb
  diverses fitxes ja no repeteix l'`id`; s'han tret `pantalla.buida` (ja no calia) i els ZIP antics de
  l'arrel.
- **Codi i documentació.** Comentaris sense història (ni versions ni dates ni noms). Documentació
  nova: `README.md` (per a persones), `ARCHITECTURE.md` (referència tècnica per a una IA), aquest
  `CHANGELOG.md`. `HANDOFF-ESO.md` i `BLOCS-PENDENTS.md` s'han integrat a `ARCHITECTURE.md`.
- **Confirmat a la calculadora:** la tecla de fracció just després d'un resultat comença un càlcul
  nou (`VERIFICAR.md`, fila 28).

## Versió 49 (1/11/2026)

- fx-82SP CW: SHIFT sen/cos/tan escriuen «Arcsen(», «Arccos(», «Arctan(», com a la calculadora.
- Figura de l'enunciat al para-sol (`cb4-25-q27`). `proves/encaix.js` comprova el recordatori del botó ▶.

## Versió 48

- La icona de la font i la miniatura de la figura reaccionen al ratolí.
- Si en 8 s no s'avança, el botó ▶ parpelleja i es sacseja per recordar que es pot avançar.
- `[nota]…[/nota]`: una fórmula donada a l'enunciat, en línia pròpia i en cursiva.

## Versió 47

- Bloc d'ESO «Trigonometria», amb exercicis del llibre de 4t del departament (unitat 7).
- Figures a l'hotel i a les estrelles.

## Versió 46

- fx-82SP CW: la tecla ×10■ al simulador; els resultats en notació científica es dibuixen com a la
  calculadora («×10» i l'exponent petits).
- Figures a l'enunciat (`figura`): miniatura que s'amplia en clicar-la.

## Versió 45

- Bloc d'ESO «Pitàgores, àrees i volums».

## Versió 44

- Bloc d'ESO «Fracció o decimal. Arrodonir. Notació científica» (exemples propis).

## Versió 43

- Bloc d'ESO «Percentatges i proporcions» (CB 4t 2023, «Impressió de fotografies»).

## Versió 42

- Si l'última fitxa acaba amb un error, s'hi afegia un pas «Activitat finalitzada» (substituït a la v50).

## Versió 41

- Bloc d'ESO «Ús dels parèntesis».

## Versions 39 i 40

- Velocitats «lenta», «normal» i «ràpida» (factors 2,09, 1,65 i 0,83).
- La font de les fitxes PAU reals va a la icona, no a l'enunciat.
- Totes les frases dels passos, també de Batxillerat, són `[mat]` o `[calc]`.
- Enunciats d'ESO escrits per a un alumne de 13 anys: situació, dades una per línia, pregunta.

## Versió 38

- La font d'un exercici real, en una bombolla (camp `font`).
- Frases `[mat]` (matemàtiques) i `[calc]` (calculadora), amb lletra i fons diferents.
- Un error comença sempre amb AC.
- fx-82SP CW: fletxes ◀ ▶ quan l'entrada no cap a la pantalla.

## Versió 37

- Els sis blocs d'ESO i el primer, «Mitjanes» (proves de competències bàsiques).
- fx-82SP CW: una entrada més llarga que la pantalla es desplaça; una entrada amb fracció baixa una mica.

## Versió 36

- Dues etapes al mateix web, Batxillerat i ESO (`bloc.etapes`, `?etapa=eso`, selector «Etapa»).

## Versió 35

- Fitxes de la fx-82MS: les mateixes que la CW menys les que necessiten f(x) o Verificar.

## Versió 34

- Segona calculadora, la fx-82MS (2a edició), i el selector «La teva calculadora».

## Versió 33

- La calculadora dibuixada és genèrica: el que és propi de cada calculadora va a `models/<id>/estil.css`.

## Versió 32

- El web es divideix en un nucli (`js/nucli/`) i una carpeta per calculadora (`models/<id>/`).

## Versió 31

- L'«Ara tu» es desactiva als 12 exercicis PAU reals (es conserva dins d'un comentari).

## Versió 30

- Totes les fitxes porten «Ara tu».

## Versió 29

- Fitxa «Regla de Barrow amb f(x)» i la recta tangent a «Defineix f(x) i g(x)».

## Versions 27 i 28

- Les etiquetes en català de la calculadora, comprovades amb fotos.

## Versió 26

- «Ara tu» refet: solució, error típic i «Comprova-ho pas a pas» amb la calculadora.

## Versió 25

- La calculadora en castellà o en català («Calculadora en»). Prova pilot de l'«Ara tu» i del bloc
  «Abans de l'examen».

## Versió 24

- KaTeX i les lletres, al mateix web (`vendor/`): cap petició a fora. `?pas=N` a l'adreça.
- Els menús de la CW són dades (`G.MENUS`) i el simulador hi navega per l'id i la clau.

## Versió 23

- Set errors de la interfície arreglats; `proves/resultats.js` recalcula tots els resultats.

## Versió 22

- Colors dels blocs.

## Versió 21

- El primer resultat exacte de cada fitxa diu que surt així pel mode E Mat/S Mat.

## Versions 19 i 20

- La zona d'error: les vores i el fons de la pàgina es tornen vermells; «Error típic» en groc.

## Versió 18

- Vuit exercicis PAU més (12 en total).

## Versió 17

- Bloc «Funcions útils per a la PAU».

## Versió 13

- Bloc «Operar amb fraccions i potències».

## Versions 1 a 12 (31/10/2026)

- La base: el reproductor pas a pas, la calculadora dibuixada amb la geometria real, el simulador de
  pantalles i les primeres fitxes. El detall és a l'historial de git.
