# Historial de versions

Què ha canviat a cada versió del web, de la més nova a la més antiga. El funcionament actual és a
`README.md` i `ARCHITECTURE.md`; aquí només hi ha la història. El número de versió és `VERSIO` a
`js/nucli/models.js` i surt al peu de les pàgines.

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
