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
(«red velvet», `#9e1b32`). Es marquen amb `error: true` al pas (`js/fitxes.js`).
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
| Funcions útils per a la PAU | Defineix f(x) i g(x) i calcula'n valors · Reutilitza l'últim resultat (Ans) · Logaritme en qualsevol base · Nombres combinatoris · Comprova una igualtat |
| Exercicis PAU. Àlgebra i Geometria | Àlgebra: comprova la solució d'un sistema (alg-24j-q2) · un menor orlat amb la regla de Sarrus (alg-24s-q2) · Geometria: distància d'un punt a un pla (geo-25s-q4b a) · el punt simètric respecte d'un pla (geo-25s-q4b c) · distàncies en centímetres (geo-26j2-q4b) |
| Exercicis PAU. Anàlisi i Probabilitat | Anàlisi: Bolzano amb f(x) definida (ana-24i-q1) · una arrel cúbica en una optimització (ana-25i-q4a) · intueix els límits amb f(x) (ana-25j-q1) · un vitrall en radians (ana-25s-q4a) · Probabilitat: probabilitat total, Bayes i binomial (pro-24i-q4) · binomial, probabilitat total i Bayes (pro-24s-q4) · probabilitat total i un màxim (pro-25j-q3) |

Exercicis PAU (31/10/2026): 12 fitxes, 3 per categoria (2 d'àlgebra i 4 d'anàlisi, per decisió del David: la
fitxa de límits ocupa el lloc de la tercera d'àlgebra).

La portada només mostra els blocs i els títols de les fitxes: sense introducció, sense descripcions
dels blocs ni nombre de passos (David, 31/10/2026).

Adreça d'una fitxa: `fitxa.html?id=<id>` (per exemple, `fitxa.html?id=exacte-decimal`).

## Fitxers

| Fitxer | Què hi ha |
|---|---|
| `index.html` | La portada: una targeta per bloc, amb el títol i les fitxes (la dibuixa `js/portada.js`). |
| `fitxa.html` | La pàgina de qualsevol fitxa (la construeix `js/motor.js`). |
| `css/estil.css` | Tot l'estil: paleta de `pau`, pantalla, teclat, disposició. |
| `js/tecles.js` | Les tecles (etiqueta, funció amb SHIFT, nom) i **la geometria de la calculadora** (on és cada tecla i quin diàmetre fa). |
| `js/pantalla.js` | Dibuixa la pantalla: càlcul amb indicadors, menús, HOME, missatges. |
| `js/guions.js` | Les pantalles que es repeteixen (menús CONFIG, FORMAT, CATALOG…), amb els textos del manual. |
| `js/fitxes.js` | **Només dades**: els blocs i les fitxes. Aquí és on s'afegeix o es canvia una fitxa. |
| `js/simulador.js` | Calcula la pantalla després de cada tecla (escriure, fraccions, arrels quadrades i d'índex n, logaritmes en base a, potències, menús, FUNCTION, CATALOG > Probabilidad, TOOLS > Verificar, SHIFT, AC). |
| `js/motor.js` | La pàgina de la fitxa i el reproductor pas a pas. |
| `proves/comprova.js` | Les proves de les dades. |
| `VERIFICAR.md` | Detalls de pantalla que el manual no mostra i que cal comprovar amb la calculadora. |
| `ARCHITECTURE.md` | Referència tècnica per a una IA (en anglès). |

## Com s'afegeix una fitxa

Al final de la llista `FITXES` de `js/fitxes.js` s'hi afegeix un objecte com els altres:
`id`, `bloc`, `titol`, `enunciat`, `inici` (la pantalla de partida) i `passos`.
Cada pas té `tecles` (ids de `js/tecles.js`), `pantalla` (feta amb les funcions de `js/guions.js`)
i `text`. Als textos: `$…$` és una fórmula (`$$…$$`, en una línia pròpia), `[[format]]` dibuixa una tecla i `{{Decimal}}` és una opció
d'un menú de la calculadora. Si l'enunciat té apartats, es marquen amb `[a]…[/a]`, `[b]…[/b]`… i
cada pas pot dir `apartat: 'a'`: mentre es fa aquest pas, l'apartat es ressalta en verd a l'enunciat.
La fitxa surt sola a la portada.

Només cal escriure la pantalla del **final** de cada pas: les del mig (després de cada tecla) les calcula
`js/simulador.js`. Si en algun cas no les sap deduir (per exemple, després d'un OK en un menú que no
coneix), les proves ho diuen i cal donar-les al pas amb `parcials: {<número de la tecla, des de 0>: pantalla}`.
Les proves també comproven que el que s'escriu tecla a tecla coincideix amb la pantalla final del pas.

## Versió

Quan es canvia algun fitxer `.js` o `.css`, cal augmentar `VERSIO` a `js/motor.js` i tots els `?v=`
d'`index.html` i `fitxa.html` (la prova comprova que coincideixen). Així els navegadors no fan servir
fitxers vells. El número es veu al peu de la pàgina. `_headers` demana a Cloudflare Pages que el
navegador pregunti sempre si hi ha una versió nova.

## Proves

Des de l'arrel del repositori:

```
node proves/comprova.js
```

Ha d'acabar amb «Tot correcte». Per comprovar també que KaTeX dibuixa totes les fórmules, cal tenir
KaTeX a mà (per exemple, `npm install katex@0.16.9` en una carpeta qualsevol) i indicar-ne la ruta:

```
KATEX=<carpeta>/node_modules/katex/dist node proves/comprova.js
```

## Publicació

Web estàtica, sense compilació: GitHub → Cloudflare Pages a cada commit de `main` (sense ordre de
compilació i amb el directori de sortida `/`). Els ZIP es pugen a `_uploads/` i el workflow
`unzip-upload.yml` els descomprimeix a l'arrel. Dependència externa: KaTeX 0.16.9 (cdnjs) i les
lletres de Google Fonts.

Web no oficial, sense relació amb el fabricant de la calculadora.
