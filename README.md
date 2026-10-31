# La calculadora fx-82SP CW, pas a pas

Web estàtica per a l'alumnat de Matemàtiques de Batxillerat: fitxes curtes que ensenyen a fer servir
la calculadora **CASIO fx-82SP CW** (la que porten els alumnes) i a evitar-ne els errors típics.

Cada fitxa és una demostració pas a pas, com els DEMO de `step-quiz/pau`, en dues columnes:

- **a l'esquerra**, tot el que es llegeix: l'enunciat, els botons ◀ ▶ (pas anterior i següent), la velocitat i la llista de
  passos. Cada pas mostra les seves tecles; el pas actual es desplega amb la frase que l'explica. A
  sota, les altres fitxes del bloc, en un desplegable plegat;
- **a la dreta**, només la calculadora: la pantalla i el teclat sencer, amb la geometria real (vegeu
  `VERIFICAR.md`). En cada pas, les tecles que s'han de prémer s'emmarquen (amb el número d'ordre si
  n'hi ha de 2 a 6), el cursor les prem al seu lloc i la pantalla canvia després de cada tecla, com a
  la calculadora.

Es fa anar pas a pas, amb els botons ◀ ▶ o amb el teclat de l'ordinador: ↓ o → (pas següent) i
↑ o ← (pas anterior). No hi ha reproducció automàtica. Hi ha dues velocitats per a les tecles:
«normal» (per defecte) i «ràpida»; «normal» triga 1,65 vegades més.

Està pensada per a portàtils (Chromebook i Lenovo, de 1280×640 a 1920×1080, tàctils o no): la
calculadora s'ajusta a l'alçada de la finestra i tot hi cap sense desplaçar la pàgina. Al mòbil es
veu en una columna.

## Les fitxes (octubre de 2026)

| Bloc | Fitxes |
|---|---|
| Abans de l'examen | Reinicia la calculadora · Comprova-la en deu segons |
| Exacte o decimal | Llegeix la barra de dalt · Valor exacte i valor decimal · Em surt 0.5 en lloc d'1/2 · Tot em surt arrodonit (FIX) |
| Fraccions | *(properament)* |
| Graus o radians | Posa la calculadora en radians · Troba l'error: el mode equivocat · Un sol angle en radians, sense canviar el mode |
| Funcions útils per a la PAU | *(properament)* |
| Exercicis PAU amb la calculadora | Àlgebra · PAU 2024: resol i comprova un sistema (alg-24j-q2) |

Adreça d'una fitxa: `fitxa.html?id=<id>` (per exemple, `fitxa.html?id=exacte-decimal`).

## Fitxers

| Fitxer | Què hi ha |
|---|---|
| `index.html` | La portada: una targeta per bloc (la dibuixa `js/portada.js`). |
| `fitxa.html` | La pàgina de qualsevol fitxa (la construeix `js/motor.js`). |
| `css/estil.css` | Tot l'estil: paleta de `pau`, pantalla, teclat, disposició. |
| `js/tecles.js` | Les tecles (etiqueta, funció amb SHIFT, nom) i **la geometria de la calculadora** (on és cada tecla i quin diàmetre fa). |
| `js/pantalla.js` | Dibuixa la pantalla: càlcul amb indicadors, menús, HOME, missatges. |
| `js/guions.js` | Les pantalles que es repeteixen (menús CONFIG, FORMAT, CATALOG…), amb els textos del manual. |
| `js/fitxes.js` | **Només dades**: els blocs i les fitxes. Aquí és on s'afegeix o es canvia una fitxa. |
| `js/simulador.js` | Calcula la pantalla després de cada tecla (escriure, fraccions, menús, variables, SHIFT, AC). |
| `js/motor.js` | La pàgina de la fitxa i el reproductor pas a pas. |
| `proves/comprova.js` | Les proves de les dades. |
| `VERIFICAR.md` | Detalls de pantalla que el manual no mostra i que cal comprovar amb la calculadora. |
| `ARCHITECTURE.md` | Referència tècnica per a una IA (en anglès). |

## Com s'afegeix una fitxa

Al final de la llista `FITXES` de `js/fitxes.js` s'hi afegeix un objecte com els altres:
`id`, `bloc`, `titol`, `enunciat`, `inici` (la pantalla de partida) i `passos`.
Cada pas té `tecles` (ids de `js/tecles.js`), `pantalla` (feta amb les funcions de `js/guions.js`)
i `text`. Als textos: `$…$` és una fórmula (`$$…$$`, en una línia pròpia), `[[format]]` dibuixa una tecla i `{{Decimal}}` és una opció
d'un menú de la calculadora. La fitxa surt sola a la portada.

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
