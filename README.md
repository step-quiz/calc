# La calculadora fx-82SP CW, pas a pas

Web estàtica per a l'alumnat de Matemàtiques de Batxillerat: fitxes curtes que ensenyen a fer servir
la calculadora **CASIO fx-82SP CW** (la que porten els alumnes) i a evitar-ne els errors típics.

Cada fitxa és una demostració pas a pas, com els DEMO de `step-quiz/pau`, en dues columnes:

- **a l'esquerra**, tot el que es llegeix: l'enunciat, els botons ◀ ▶ (pas anterior i següent), la velocitat i la llista de
  passos. Cada pas mostra les seves tecles; el pas actual només mostra la frase que l'explica (les tecles ja es
  veuen ressaltades a la calculadora). A
  sota, les altres fitxes del bloc, en un desplegable plegat;
- **a la dreta**, només la calculadora: la pantalla i el teclat sencer, amb la geometria real (vegeu
  `VERIFICAR.md`). En cada pas, les tecles que s'han de prémer s'emmarquen (amb el número d'ordre si
  n'hi ha de 2 a 6), el cursor les prem al seu lloc i la pantalla canvia després de cada tecla, com a
  la calculadora.

Es fa anar pas a pas, amb els botons ◀ ▶ o amb el teclat de l'ordinador: ↓ o → (pas següent) i
↑ o ← (pas anterior). No hi ha reproducció automàtica. Hi ha tres velocitats per a les tecles:
«lenta», «normal» (per defecte) i «ràpida»; «normal» triga 1,65 vegades més que «ràpida», i «lenta» un 15 % més que «normal».
Els passos que ensenyen un ús erroni de la calculadora (per exemple, $-2^4$ sense parèntesis o una fracció
de sumes escrita en una línia) són una **zona d'error**: mentre són el pas actual, totes les vores de la pàgina
(enunciat, botons, pas actual, tecles dels passos, marcs de la calculadora…) es tornen de color vellut vermell
(«red velvet», `#9e1b32`), i el fons de la pàgina (cos, capçalera i peu) passa a ser un 80 % del seu color i un 20 %
de vellut vermell. Es marquen amb `error: true` al pas (`models/fx-82sp-cw/fitxes/`). El primer pas de cada error comença
amb «Error típic», escrit `!!Error típic!!`: quan el pas es fa actual, té el fons groc pur durant 1 segon.
Si l'usuari clica 5 vegades amb el ratolí els botons ◀ ▶ (els tocs amb el dit no compten: un mòbil o una tauleta pot no tenir teclat) sense haver fet servir mai les fletxes del teclat, surt una bombolla
(vora taronja pura, un 20 % més gran que la primera versió, que parpelleja i es sacseja durant 0,8 s en sortir) que li ho recorda; es tanca amb la creueta i, si no, desapareix als 10 segons (surt una sola vegada per càrrega de la pàgina).

A l'ordinador, l'amplada es reparteix així: 15 % de marge, 40 % per a les explicacions, 30 % per a la
calculadora i 15 % de marge.

Està pensada per a portàtils (Chromebook i Lenovo, de 1280×640 a 1920×1080, tàctils o no): la
calculadora s'ajusta a l'alçada de la finestra i tot hi cap sense desplaçar la pàgina. Al mòbil es
veu en una columna.

## Les fitxes (octubre de 2026)

| Bloc | Fitxes |
|---|---|
| Treballar en mode 'exacte' o 'decimal' | Llegeix la barra de dalt · Valor exacte i valor decimal · Em surt 0.5 en lloc d'1/2 · Tot em surt arrodonit (FIX) |
| Operar amb fraccions i potències | Escriu una fracció amb la plantilla · Fracció de sumes: on van els parèntesis · Potències de negatius · Potència d'una fracció · Arrels d'índex n |
| Treballar en mode 'graus' o 'radiants' | Posa la calculadora en radians · Troba l'error: el mode equivocat · Un sol angle en radians, sense canviar el mode |
| Funcions útils per a la PAU | Defineix f(x) i g(x) i calcula'n valors (també la recta tangent) · Regla de Barrow amb f(x) · Reutilitza l'últim resultat (Ans) · Logaritme en qualsevol base · Nombres combinatoris · Comprova una igualtat |
| Exercicis PAU. Àlgebra i Geometria | Àlgebra: comprova la solució d'un sistema (alg-24j-q2) · un menor orlat amb la regla de Sarrus (alg-24s-q2) · Geometria: distància d'un punt a un pla (geo-25s-q4b a) · el punt simètric respecte d'un pla (geo-25s-q4b c) · distàncies en centímetres (geo-26j2-q4b) |
| Abans de l'examen (bombolla petita, a part dels blocs) | Comprova la calculadora en 30 segons |
| Exercicis PAU. Anàlisi i Probabilitat | Anàlisi: Bolzano amb f(x) definida (ana-24i-q1) · una arrel cúbica en una optimització (ana-25i-q4a) · intueix els límits amb f(x) (ana-25j-q1) · un vitrall en radians (ana-25s-q4a) · Probabilitat: probabilitat total, Bayes i binomial (pro-24i-q4) · binomial, probabilitat total i Bayes (pro-24s-q4) · probabilitat total i un màxim (pro-25j-q3) |

Exercicis PAU (31/10/2026): 12 fitxes, 3 per categoria (2 d'àlgebra i 4 d'anàlisi, per decisió del David: la
fitxa de límits ocupa el lloc de la tercera d'àlgebra).

La portada només mostra els blocs i els títols de les fitxes: sense introducció, sense descripcions
dels blocs ni nombre de passos (David, 31/10/2026).

Adreça d'una fitxa: `fitxa.html?id=<id>` (per exemple, `fitxa.html?id=exacte-decimal`). Amb `&pas=N` s'obre directament el pas N
(`fitxa.html?id=verificar&pas=7`), i l'adreça es posa al dia a cada pas: es pot copiar per enllaçar o projectar un pas concret.

Avisos a la capçalera de la fitxa (només quan cal): en una tauleta en vertical, que la giri (en horitzontal hi cap tot; al mòbil
no s'hi dedica esforç); en un navegador massa antic per dibuixar la calculadora (sense unitats `cqw`, Chrome < 105), que l'actualitzi.

Notació: als textos, «sin» (com als enunciats PAU); «sen» només és el nom de la tecla i el que surt a la pantalla. Els nombres
que mostra o que es teclegen a la calculadora porten punt (0.7); els dels enunciats i de les respostes escrites, coma (0,7).

El mode de càlcul: totes les fitxes suposen la calculadora en mode {{E Mat/S Mat}}. Per això, a cada fitxa, el
primer resultat exacte (una fracció, una arrel o π) diu que surt així per aquest mode i què sortiria en mode
{{E Mat/S Decimal}} (la prova ho exigeix).

## La calculadora en català o en castellà (versió 25)

A dalt de la portada i de cada fitxa, «Calculadora en: Castellano / Català»: l'alumne tria l'idioma de la seva calculadora un
cop i el navegador el recorda. Els menús de la pantalla, les opcions `{{…}}` dels textos i «Vertader/Fals» de Verificar surten
en aquell idioma. La traducció al català és a `models/fx-82sp-cw/guions.js` (`CATALA`), comprovada amb fotos de la calculadora (versió 27);
les poques pantalles que encara no s'han fotografiat són a `VERIFICAR.md`. La prova comprova que tots els textos de menú i tots els `{{…}}` hi tenen traducció.

## «Ara tu» (versió 25; a totes les fitxes des de la versió 30; als exercicis PAU, desactivat des de la versió 31)

Cada fitxa porta `araTu: {enunciat, resultat, error, inici, passos}`: en acabar l'últim pas surt un exercici semblant, amb
altres nombres. «Mostra la solució» ensenya el **resultat correcte** i, en vermell, l'**error típic** (el que no s'ha de fer).
«Comprova-ho pas a pas» posa la pàgina en mode «Ara tu»: fons verd oliva clar, i la calculadora fa els passos de l'«Ara tu»
amb uns botons ◀ ▶ propis (i les fletxes del teclat). «Torna a l'exercici», o tocar el reproductor principal, en surt. Els
passos de l'«Ara tu» s'escriuen i es comproven igual que els d'una fitxa (també poden portar `error: true`). L'«Ara tu» comença
amb la calculadora tal com l'ha deixada la fitxa: les f(x) i g(x) que s'hi han definit encara hi són (per exemple, a *Regla de
Barrow amb f(x)* es calcula una altra integral amb la mateixa primitiva).

**Exercicis PAU (blocs «Exercicis PAU. Àlgebra i Geometria» i «Exercicis PAU. Anàlisi i Probabilitat»):** de moment
l'«Ara tu» no hi surt (decisió de David, versió 31). Els 12 «Ara tu» ja fets no s'han esborrat: són a `models/fx-82sp-cw/fitxes/pau-ag.js` i `pau-ap.js`,
dins d'un comentari `/* «Ara tu» DESACTIVAT … */` just abans de `relacionades` de cada fitxa. Per tornar a activar-ne un,
treu les dues línies d'encapçalament del comentari i el `*/` final, puja la versió i passa les proves.

## Dues calculadores (versió 34)

El web té fitxes per a dues calculadores: la **fx-82SP CW** (la de per defecte) i la **fx-82MS (2a edició)**.
L'alumne tria la seva a dalt de la portada o de qualsevol fitxa («La teva calculadora»), i el navegador la
recorda. Les fitxes del mateix tema porten el mateix id a les dues calculadores, i en canviar de calculadora
l'alumne es queda a la mateixa fitxa; si l'altra calculadora no la té, la pàgina ho diu i enllaça la portada.
L'adreça d'una fitxa de la fx-82MS porta `&model=fx-82ms` (`fitxa.html?model=fx-82ms&id=pot-negativa`): es
pot copiar i enviar. La fx-82MS té 27 fitxes (versió 35), les mateixes que la CW menys les que necessiten f(x) o
Verificar, que no té: *Defineix f(x) i g(x)*, *Regla de Barrow amb f(x)*, *Comprova una igualtat* i *Intueix els
límits amb f(x)*. Sense f(x), una funció es calcula en un altre punt amb la repetició: [◀] torna a l'expressió i
només es canvia el nombre (fitxa de Bolzano). Les pantalles que no surten al manual i s'han deduït són a `VERIFICAR.md`.

## Fitxers

El web té un **nucli** comú i una carpeta per a cada **calculadora** («model»). El nucli no coneix cap
tecla ni cap menú: tot el que sap d'una calculadora ho demana al model (versió 32). Ara només hi ha la
fx-82SP CW; la fx-82MS 2a edició hi anirà com una carpeta més.

| Fitxer | Què hi ha |
|---|---|
| `index.html` | La portada: una targeta per bloc, amb el títol i les fitxes (la dibuixa `js/nucli/portada.js`). |
| `fitxa.html` | La pàgina de qualsevol fitxa (la construeix `js/nucli/motor.js`). Adreça: `fitxa.html?id=<fitxa>`; amb `&model=<calculadora>`, una altra calculadora. |
| `css/estil.css` | L'estil del nucli: paleta de `pau`, disposició, reproductor, passos, portada, i com es col·loca qualsevol calculadora (versió 33). |
| `js/nucli/models.js` | El registre i el carregador de les calculadores, i la **versió** del web (`VERSIO`). |
| `js/nucli/preferencies.js` | El que el navegador recorda: la calculadora de l'alumne i l'idioma dels seus menús. |
| `js/nucli/text.js` | Els textos de les fitxes en HTML: fórmules, tecles, opcions de menú, «Error típic», apartats. |
| `js/nucli/motor.js` | La pàgina de la fitxa i el reproductor pas a pas (també l'«Ara tu»). |
| `js/nucli/portada.js` | La portada. |
| `models/cataleg.js` | Quines calculadores hi ha: fx-82SP CW (la de per defecte) i fx-82MS. |
| `models/fx-82sp-cw/model.js` | La fx-82SP CW: nom, idiomes i quins fitxers i fulls d'estil té, en ordre. |
| `models/fx-82sp-cw/estil.css` | Com es veu la fx-82SP CW: el cos, les tecles rodones i els rètols, la pantalla per dins i les tecles petites dels textos. |
| `models/fx-82sp-cw/tecles.js` | Les tecles (etiqueta, funció amb SHIFT, nom) i **la geometria de la calculadora** (on és cada tecla i quin diàmetre fa). |
| `models/fx-82sp-cw/pantalla.js` | Dibuixa la pantalla: càlcul amb indicadors, menús, HOME, missatges. |
| `models/fx-82sp-cw/guions.js` | Les pantalles que es repeteixen (menús CONFIG, FORMAT, CATALOG…), amb els textos del manual, i la traducció al català. |
| `models/fx-82sp-cw/simulador.js` | Calcula la pantalla després de cada tecla (escriure, fraccions, arrels quadrades i d'índex n, logaritmes en base a, potències, menús, FUNCTION, CATALOG > Probabilidad, TOOLS > Verificar, SHIFT, AC). |
| `models/fx-82sp-cw/fitxes/` | **Només dades**: `blocs.js` (els blocs i el format d'una fitxa) i un fitxer per bloc amb les seves fitxes. Aquí és on s'afegeix o es canvia una fitxa. |
| `models/fx-82sp-cw/proves.js`, `calcul.js` | Les proves pròpies de la CW (pantalles, català, teclat, regla «E Mat/S Mat») i el càlcul dels resultats. |
| `models/fx-82ms/` | La fx-82MS, amb els mateixos fitxers: teclat mesurat sobre una foto, pantalla de dues línies (7 segments a baix), menús MODE i DRG▸, simulador d'escriptura en una línia, fitxes, estil i proves (també la del signe negatiu: [[neg]], no [[menys]]). |
| `proves/comprova.js` | Les proves: el nucli, el web i cada calculadora del catàleg. |
| `VERIFICAR.md` | Detalls de pantalla que el manual no mostra i que cal comprovar amb la calculadora. |
| `ARCHITECTURE.md` | Referència tècnica per a una IA (en anglès), amb el contracte d'una calculadora. |

## Com s'afegeix una fitxa

Al fitxer del seu bloc, `models/<calculadora>/fitxes/<bloc>.js` (per exemple, `models/fx-82sp-cw/fitxes/pau.js`), dins de `M.fitxes.push(…)`, s'hi afegeix un objecte com els altres:
`id`, `bloc`, `titol`, `enunciat`, `inici` (la pantalla de partida) i `passos` (el format complet és a `fitxes/blocs.js`).
Cada pas té `tecles` (ids de `tecles.js`), `pantalla` (feta amb les funcions de `guions.js`)
i `text`. Als textos: `$…$` és una fórmula (`$$…$$`, en una línia pròpia), `[[format]]` dibuixa una tecla i `{{Decimal}}` és una opció
d'un menú de la calculadora. Si l'enunciat té apartats, es marquen amb `[a]…[/a]`, `[b]…[/b]`… i
cada pas pot dir `apartat: 'a'`: mentre es fa aquest pas, l'apartat es ressalta en verd a l'enunciat.
La fitxa surt sola a la portada. Un bloc nou va a `fitxes/blocs.js`, amb el seu fitxer a `model.js` (`fitxers`).

Només cal escriure la pantalla del **final** de cada pas: les del mig (després de cada tecla) les calcula
`simulador.js`. Si en algun cas no les sap deduir (per exemple, després d'un OK en un menú que no
coneix), les proves ho diuen i cal donar-les al pas amb `parcials: {<número de la tecla, des de 0>: pantalla}`.
Les proves també comproven que el que s'escriu tecla a tecla coincideix amb la pantalla final del pas.

## Versió

Quan es canvia algun fitxer `.js` o `.css`, cal augmentar `VERSIO` a `js/nucli/models.js` i tots els `?v=`
d'`index.html` i `fitxa.html` (la prova comprova que coincideixen). Els fitxers de les calculadores es
carreguen amb aquest mateix `?v=`. Així els navegadors no fan servir fitxers vells. El número es veu al peu
de la pàgina. `_headers` demana a Cloudflare Pages que el navegador pregunti sempre si hi ha una versió nova.

## Proves

Des de l'arrel del repositori:

```
node proves/comprova.js
```

Ha d'acabar amb «Tot correcte». Comprova el nucli, el web i cada calculadora del catàleg, i torna a calcular tots
els resultats de les pantalles (`models/fx-82sp-cw/calcul.js`). Per comprovar també que KaTeX dibuixa totes les fórmules, cal tenir
KaTeX a mà (per exemple, `npm install katex@0.16.9` en una carpeta qualsevol) i indicar-ne la ruta:

```
KATEX=<carpeta>/node_modules/katex/dist node proves/comprova.js
```

## Publicació

Web estàtica, sense compilació: GitHub → Cloudflare Pages a cada commit de `main` (sense ordre de
compilació i amb el directori de sortida `/`). Els ZIP es pugen a `_uploads/` i el workflow
`unzip-upload.yml` els descomprimeix a l'arrel. Cap dependència externa (versió 24): KaTeX 0.16.9 i les lletres
(Libre Baskerville i Source Code Pro, llicència SIL OFL) són a `vendor/`, servides des del mateix web: funciona encara que
el filtre del centre bloquegi cdnjs o Google Fonts, i no s'envia l'adreça IP de l'alumnat a cap altre servei.

Web no oficial, sense relació amb el fabricant de la calculadora.
