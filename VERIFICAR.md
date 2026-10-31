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
| 1 | Pantalla de confirmació de *Reiniciar > Config y datos* | fitxa `reinicia`, pas 4 | «Config y datos / ¿Reiniciar?» amb {Sí} {No} i Sí triat. El manual només diu «[Sí]». |
| 2 | Pantalla que surt en triar *Formato número > Normal* | fitxa `fix`, pas 5 (`G.normal`) | Una llista «Normal 1 / Normal 2», amb Normal 2 triada. |
| 3 | Ordre del CATALOG després d'*Ang/Coord/Sexag* | `G.CATALOG` | Hiperb/Trigon, Otros. |
| 4 | Ordre dins d'*Ang/Coord/Sexag* després de *Gradianes* | `G.ANG_COORD_SEXAG` | Rectang a polar, Polar a rectang, Grados Min Seg (les tres primeres, Grados, Radianes i Gradianes, surten a la guia ClassWiz). |
| 5 | Opcions del menú FORMAT quan el resultat és √2/2 | fitxa `exacte-decimal`, pas 3 | Estándar, Decimal, Notación ING, Sexagesimal (com a l'exemple de π/6 del manual). |
| 6 | En obrir una llista amb ◉ (Entrada/Salida, Unidad angular…), quina fila surt ressaltada | `G.entradaSortida`, `G.unitatAngular` | La que té el ◉. |
| 7 | Després de prémer OK en una llista amb ◉, si la pantalla s'hi queda o torna enrere | fitxes `mode-decimal`, `canvia-radians`, `fix` | S'hi queda; se surt amb AC. |
| 8 | Com s'escriu a la pantalla $\sin\frac{\pi}{6}$ amb la r de radians | fitxa `grau-puntual` | La r a dalt, darrere de la fracció (com a la guia ClassWiz, p. 49). |
| 9 | Les icones de les aplicacions a la pantalla HOME | `js/pantalla.js` (APPS) | Només orientatives; els noms sí que són els del manual. |
| 10 | Si es veu el triangle ▲ després d'AC | diverses fitxes | Es veu si hi ha historial; no es veu després de canviar Entrada/Salida ni de reiniciar (el manual diu que s'esborra). |
| 11 | La llista de variables (tecla VARIABLE): 5 files A/B, C/D, E/F, x/y, z, valors en decimal (Normal 1) | `G.variables`, fitxa `pau-alg-24j-q2` | Com a la p. 38 del manual. En obrir-la, triada la A; amb ↓ es baixa de fila i amb → es passa a la columna de la dreta. |
| 12 | El menú que surt en prémer OK sobre una variable | `G.menuVariable` | {Guardar, Recuperar, Editar}, amb Guardar el primer. El manual diu «[A=] > [Guardar]» i «OK … [Editar]», però no en dibuixa l'ordre. |
| 13 | Què es veu després de {Guardar}, i després d'AC | fitxa `pau-alg-24j-q2` | Torna a la llista amb el valor nou; AC la tanca i deixa la pantalla de càlcul en blanc. |

Els resultats numèrics (0.7071067812, 0.9998329795, −0.9880316241, 0.1666666667) s'han calculat
i arrodonit a 10 xifres significatives, com fa la calculadora en el format Normal 2.
