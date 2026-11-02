# La calculadora, pas a pas

Web estàtica per a l'alumnat de Matemàtiques d'ESO i de Batxillerat: fitxes curtes que ensenyen a fer servir la
calculadora CASIO **fx-82SP CW** o **fx-82MS** (2a edició) i a evitar-ne els errors típics.

Cada fitxa és un exercici resolt pas a pas. A l'esquerra, l'enunciat, els botons ◀ ↻ ▶ i la llista de passos; a la
dreta, la calculadora dibuixada amb les mides reals. A cada pas, un cursor prem les tecles i la pantalla canvia després
de cada tecla, com a la calculadora.

Web no oficial, sense relació amb el fabricant de la calculadora.

## Com es fa servir

- A la portada, l'alumne tria l'**etapa** (ESO o Batxillerat), la **seva calculadora** i, a la fx-82SP CW, l'**idioma**
  dels menús (castellà o català). El navegador ho recorda.
- A la fitxa: ▶ o ↓ / → passen al pas següent (animat); ◀ o ↑ / ← tornen enrere; ↻ o la tecla R tornen a fer el pas
  actual. La velocitat es pot posar «lenta», «normal» o «ràpida»; les xifres sempre van 3 vegades més de pressa.
- Els passos que ensenyen un error típic tenyeixen la pàgina de vermell («zona d'error»). Si la fitxa acaba amb un
  error, l'últim pas torna a la manera correcta.
- En acabar: a Batxillerat, «Ara tu» (un exercici semblant, que es pot fer pas a pas amb la calculadora); a l'ESO,
  «Prova-ho tu» (un exercici semblant per fer amb la calculadora pròpia, amb la solució amagada).
- Enllaços útils:
  - portada d'ESO: `index.html?etapa=eso`;
  - una fitxa: `fitxa.html?id=cb4-26-q15`; amb la fx-82MS, `&model=fx-82ms`; un pas concret, `&pas=3`.

Està pensada per a portàtils i tauletes en horitzontal: tot hi cap sense desplaçar la pàgina. Al mòbil es veu en una
columna.

## Com està organitzat

| Carpeta o fitxer | Què hi ha |
|---|---|
| `index.html`, `fitxa.html` | Les dues pàgines. Les construeix el JavaScript. |
| `exercicis/` | **Els exercicis**: títol, enunciat, font, figura, tancament i «Prova-ho tu». Són iguals per a totes les calculadores. `exercicis/blocs.js` té els blocs de la portada i explica el format. |
| `models/fx-82sp-cw/`, `models/fx-82ms/` | **Cada calculadora**: el dibuix (tecles i mides), la pantalla, el simulador i, a `fitxes/`, les tecles i les pantalles de cada exercici. |
| `models/cataleg.js` | Quines calculadores, quines etapes i quins fitxers d'exercicis hi ha. |
| `js/nucli/` | El motor comú: la portada, la pàgina de la fitxa, el reproductor pas a pas. No coneix cap calculadora. |
| `css/estil.css` | L'estil comú. L'aspecte de cada calculadora és a `models/<calculadora>/estil.css`. |
| `img/eso/` | Les figures dels enunciats. |
| `proves/` | Les proves (no es publiquen a cap pàgina). |
| `vendor/` | KaTeX i les lletres: el web no demana res a cap altre servidor. |

## Com s'afegeix una fitxa

1. **L'exercici**, a `exercicis/<bloc>.js` (o `exercicis/eso/<bloc>.js`): un objecte nou dins de
   `Models.afegeixExercicis(…)`, amb `id`, `bloc`, `titol`, `enunciat` i, si cal, `font`, `figura`, `tancament` i
   `provaTu`. El format és a `exercicis/blocs.js`.
2. **Les tecles**, a `models/fx-82sp-cw/fitxes/<bloc>.js` i a `models/fx-82ms/fitxes/<bloc>.js`: un objecte dins de
   `M.fitxes.push(…)` amb el mateix `id`, la pantalla de partida (`inici`) i els `passos`. Cada pas diu quines tecles es
   premen, com queda la pantalla al final del pas i la frase. Les pantalles del mig les calcula el simulador.
   El format és a `models/fx-82sp-cw/fitxes/blocs.js`.
3. Les proves (més avall). Diuen si falta alguna cosa: una tecla de més, un resultat mal calculat, una frase sense
   `[mat]` o `[calc]`, un error final sense `tancament`…
4. La fitxa surt sola a la portada, dins del seu bloc.

Un bloc nou: una línia a `exercicis/blocs.js` i el seu fitxer a `models/cataleg.js` (exercicis) i al `model.js` de cada
calculadora (tecles). Les normes per escriure les fitxes (sobretot les d'ESO) són a `ARCHITECTURE.md`, apartat 9.

## Proves

Des de l'arrel del repositori:

```
node proves/comprova.js
```

Ha d'acabar amb «Tot correcte». Per comprovar també que es dibuixen totes les fórmules, cal KaTeX
(`npm install katex@0.16.9` en una carpeta qualsevol) i dir on és:

```
KATEX=<carpeta>/node_modules/katex/dist node proves/comprova.js
```

Per comprovar que cada pas de cada fitxa cap a la finestra sense desplaçar la pàgina (cal Playwright):

```
node proves/encaix.js
```

Ha d'acabar amb «Tot hi cap».

## Publicació

- GitHub → Cloudflare Pages a cada commit de `main`, sense compilació (directori de sortida `/`).
- Els canvis arriben en un ZIP que es puja a `_uploads/` (GitHub → `_uploads/` → *Add file* → *Upload files*); el
  workflow `unzip-upload.yml` el descomprimeix a l'arrel i en fa commit.
- **Versió:** quan es canvia un fitxer `.js` o `.css`, cal augmentar `VERSIO` a `js/nucli/models.js`, tots els `?v=`
  d'`index.html` i `fitxa.html` i el peu d'`index.html` (la prova ho comprova). Així cap navegador no fa servir fitxers
  vells. El número es veu al peu de les pàgines.
- Cap missatge de commit no pot portar `[skip ci]`, `[ci skip]` ni `[cf-pages-skip]`: Cloudflare no el publicaria.

## Documentació

| Fitxer | Per a qui | Què explica |
|---|---|---|
| `README.md` | persones | Aquest fitxer. |
| `CHANGELOG.md` | persones | Què ha canviat a cada versió. |
| `VERIFICAR.md` | el professor | Pantalles que cal comprovar amb la calculadora real, i les que ja s'han confirmat. |
| `ARCHITECTURE.md` | una IA o un programador | La referència tècnica (en anglès): estructura, formats, normes per escriure fitxes, proves, pendents. |
| `CLAUDE.md` | una IA | Les normes de la casa. |
| `LLICENCIA.md` | tothom | Contingut CC BY-NC-ND 4.0; codi MIT. |
