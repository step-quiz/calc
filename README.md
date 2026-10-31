# La calculadora fx-82SP CW, pas a pas

Web estàtica per a l'alumnat de Matemàtiques de Batxillerat: fitxes curtes que ensenyen a fer servir
la calculadora **CASIO fx-82SP CW** (la que porten els alumnes) i a evitar-ne els errors típics.

Cada fitxa és una demostració pas a pas, com els DEMO de `step-quiz/pau`. A la pantalla hi ha:

- **a l'esquerra**, la frase del pas, el reproductor (▶, ← →, velocitat) i «Per recordar»;
- **al mig**, la calculadora sencera (pantalla i teclat). Abans de prémer res, les tecles del pas es
  numeren (1, 2, 3…) perquè l'alumne vegi on són i en quin ordre van. Després, el cursor les prem i
  la pantalla canvia;
- **a la dreta**, la llista de passos amb les seves tecles (es pot clicar per anar a un pas) i les
  altres fitxes.

Està pensada per a portàtils (Chromebook i Lenovo, de 1280×720 a 1920×1080, tàctils o no): la
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

Adreça d'una fitxa: `fitxa.html?id=<id>` (per exemple, `fitxa.html?id=exacte-decimal`).

## Fitxers

| Fitxer | Què hi ha |
|---|---|
| `index.html` | La portada: una targeta per bloc (la dibuixa `js/portada.js`). |
| `fitxa.html` | La pàgina de qualsevol fitxa (la construeix `js/motor.js`). |
| `css/estil.css` | Tot l'estil: paleta de `pau`, pantalla, teclat, disposició. |
| `js/tecles.js` | Les tecles (etiqueta, funció amb SHIFT, nom) i **la disposició del teclat**. |
| `js/pantalla.js` | Dibuixa la pantalla: càlcul amb indicadors, menús, HOME, missatges. |
| `js/guions.js` | Les pantalles que es repeteixen (menús CONFIG, FORMAT, CATALOG…), amb els textos del manual. |
| `js/fitxes.js` | **Només dades**: els blocs i les fitxes. Aquí és on s'afegeix o es canvia una fitxa. |
| `js/motor.js` | La pàgina de la fitxa i el reproductor pas a pas. |
| `proves/comprova.js` | Les proves de les dades. |
| `VERIFICAR.md` | Detalls de pantalla que el manual no mostra i que cal comprovar amb la calculadora. |
| `ARCHITECTURE.md` | Referència tècnica per a una IA (en anglès). |

## Com s'afegeix una fitxa

Al final de la llista `FITXES` de `js/fitxes.js` s'hi afegeix un objecte com els altres:
`id`, `bloc`, `titol`, `enunciat`, `inici` (la pantalla de partida), `passos` i `recorda`.
Cada pas té `tecles` (ids de `js/tecles.js`), `pantalla` (feta amb les funcions de `js/guions.js`)
i `text`. Als textos: `$…$` és una fórmula, `[[format]]` dibuixa una tecla i `{{Decimal}}` és una opció
d'un menú de la calculadora. La fitxa surt sola a la portada.

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
