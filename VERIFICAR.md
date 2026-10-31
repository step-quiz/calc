# Què cal comprovar amb la calculadora

Les fitxes reprodueixen les pantalles de la fx-82SP CW a partir del manual en castellà
(*Guía del usuario fx-82SP CW / fx-85SP CW*) i de la guia ClassWiz de CASIO.

**La calculadora dibuixada.** La posició i el diàmetre de cada tecla, la pantalla, la creu del
cursor i la peça de les tecles de pàgina es van mesurar (31/10/2026) sobre una imatge frontal de la
fx-82SP CW Iberia, contrastada amb una foto d'una calculadora real i calibrada amb les mides
oficials de CASIO (162 × 77 mm). Totes les tecles són cercles: 9,6 % de l'amplada les de dalt,
12,2 % les de baix. Es retalla la franja de dalt del logotip, sense text.

Hi ha detalls que el manual **no dibuixa** i que s'han deduït. Si a la calculadora (o a l'emulador
de CASIO) es veuen diferents, el que s'ha de corregir és la fitxa: la majoria són a `js/guions.js`.

| # | Què | On és | Què s'ha posat |
|---|---|---|---|
| 1 | Pantalla de confirmació de *Reiniciar > Config y datos* | `G.reiniciar` (ara no la fa servir cap fitxa: la fitxa `reinicia` es va treure) | «Config y datos / ¿Reiniciar?» amb {Sí} {No} i Sí triat. El manual només diu «[Sí]». |
| 2 | Pantalla que surt en triar *Formato número > Normal* | fitxa `fix`, pas 5 (`G.normal`) | Una llista «Normal 1 / Normal 2», amb Normal 2 triada. |
| 3 | Ordre del CATALOG després d'*Ang/Coord/Sexag* | `G.CATALOG` | Hiperb/Trigon, Otros. |
| 4 | Ordre dins d'*Ang/Coord/Sexag* després de *Gradianes* | `G.ANG_COORD_SEXAG` | Rectang a polar, Polar a rectang, Grados Min Seg (les tres primeres, Grados, Radianes i Gradianes, surten a la guia ClassWiz). |
| 5 | Opcions del menú FORMAT quan el resultat és √2/2 | fitxa `exacte-decimal`, pas 3 | Estándar, Decimal, Notación ING, Sexagesimal (com a l'exemple de π/6 del manual). |
| 6 | En obrir una llista amb ◉ (Entrada/Salida, Unidad angular…), quina fila surt ressaltada | `G.entradaSortida`, `G.unitatAngular` | La que té el ◉. |
| 7 | Després de prémer OK en una llista amb ◉, si la pantalla s'hi queda o torna enrere | fitxes `mode-decimal`, `canvia-radians`, `fix` | S'hi queda; se surt amb AC. |
| 8 | Com s'escriu a la pantalla $\sin\frac{\pi}{6}$ amb la r de radians | fitxa `grau-puntual` | La r a dalt, darrere de la fracció (com a la guia ClassWiz, p. 49). |
| 9 | Les icones de les aplicacions a la pantalla HOME | `js/pantalla.js` (APPS) | Només orientatives; els noms sí que són els del manual. |
| 10 | Si es veu el triangle ▲ després d'AC | diverses fitxes | Es veu si hi ha historial; no es veu després de canviar Entrada/Salida ni de reiniciar (el manual diu que s'esborra). |
| 11 | FUNCTION > {Definir f(x)}: la pantalla d'escriure f(x) | `G.definicio`, fitxa `pau-ana-24i-q1` | Una línia «f(x)=…» dins d'un requadre, com a la p. 60 del manual; sense barra d'indicadors. Després d'EXE, torna a la pantalla d'abans (el manual ho diu). |
| 12 | Menú de FUNCTION | `G.menuFuncio` | f(x), g(x), Definir f(x), Definir g(x), amb f(x) triada (p. 60). En triar f(x) s'escriu «f(». |
| 13 | Si $\frac{4}{6}\times 0.75+\frac{2}{6}\times 0.4$ dona la fracció 19/30 en mode E Mat/S Mat | fitxa `pau-pro-24i-q4` | Fracció 19/30 (decimals exactes barrejats amb fraccions). |

La llista de variables (tecla VARIABLE, `G.variables`) i el menú que surt en prémer OK sobre una variable (`G.menuVariable`: Guardar, Recuperar, Editar) estan fets però cap fitxa no els fa servir ara: abans de fer-los servir, cal comprovar-ne l'ordre i l'aspecte.

Els resultats numèrics (0.7071067812, 0.9998329795, −0.9880316241, 0.1666666667) s'han calculat
i arrodonit a 10 xifres significatives, com fa la calculadora en el format Normal 2.
