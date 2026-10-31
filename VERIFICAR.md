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
| 14 | Plantilla de l'arrel d'índex n (SHIFT arrel): dues caselles, i en quina es comença | `js/simulador.js` (`arreln`), fitxa `arrel-n` | Cursor primer a l'índex (la casella petita); `→` passa al radicand. El manual (p. 34, exemple 5√32) ho indica amb la seqüència «5 ▶ 32», però no dibuixa les pantalles. |
| 15 | Fracció escrita dins del denominador en oblidar el `→` | fitxa `frac-plantilla`, passos 5-6 | $\frac{3}{4+\frac{5}{6}}$, resultat $\frac{18}{29}$ (calculat). |
| 16 | $-2^4$ sense parèntesis | fitxa `pot-negativa`, passos 4-5 | Resultat −16: la potència té més prioritat que el signe negatiu (seqüència de prioritat del manual, p. 113; comprovat a les guies CASIO de la sèrie CW). Es comença amb AC perquè, després d'un resultat, la tecla − podria continuar amb Ans. |
| 17 | Exponent dins del denominador en no tancar la fracció | fitxa `pot-fraccio`, passos 5-7 | $\frac{2}{3^{-2}}$, resultat 18 (calculat). |
| 18 | Plantilles a mig escriure | fitxes `arrel-n`, `frac-prioritat` | Les caselles buides es dibuixen amb □ i, en acabar cada pas, el cursor surt al final de la línia (a la calculadora és dins de la casella). Les pantalles de després de cada tecla sí que el porten al lloc. |
| 19 | Fila «Verificar OFF» del menú TOOLS | `G.TOOLS_VERIFICAR`, fitxa `verificar`, pas 8 | Amb Verificar activat, la tercera fila de TOOLS passa a dir «Verificar OFF» (el nom és al manual, p. 64) i les altres dues, «Deshacer» i «Simplificar ►», no canvien (això últim és deduït). |
| 20 | CATALOG amb Verificar activat | `G.CATALOG_VERIFICAR`, fitxa `verificar`, pas 4 | «Verificar» com a primera fila, seguida de les files de sempre. El manual només diu «CATALOG > [Verificar] > [=]» i no dibuixa el menú. |
| 21 | Símbols del submenú Verificar | `G.VERIFICAR` | =, ≠, >, <, ≥, ≤. El manual (p. 65) cita [=] i [<] i n'enumera els operadors, però no dibuixa el menú: l'ordre és deduït. |
| 22 | Ordre del submenú CATALOG > Probabilidad | `G.PROBABILIDAD`, fitxa `combinatoria` | %, Factorial(!), Permutación(P), Combinación(C), Número aleatorio, Entero aleatorio: l'ordre en què el manual explica cada funció (p. 52-53); el menú no es dibuixa. |
| 23 | $8\div 0{,}57$ en E Mat/S Mat | fitxa `ans`, pas 6 | Surt la fracció $\frac{800}{57}$ (com a la fila 13: decimals exactes donen fracció). El manual no ho mostra. |

**Contrastat amb el manual (31/10/2026) i ja no deduït:** el menú TOOLS de Calcular (Deshacer, Simplificar ►, Verificar ON; p. 25-26); «Verificar ON»/«Verificar OFF», l'indicador ✔, que s'hi torna a la pantalla anterior i que l'historial s'esborra (p. 63-64); «Verdadero»/«Falso» alineats a la dreta de la línia del resultat (p. 65); la plantilla del logaritme (tecla `log■□`, la base, `→`, el nombre; es dibuixa $\log_{2}(16)$ i el parèntesi de tancament ja hi és; p. 51); `nCr` i `nPr` es dibuixen «10C4» i «10P4» (p. 53); el menú FUNCTION (f(x), g(x), Definir f(x), Definir g(x)), «f(x)=» / «g(x)=» i que EXE torna a la pantalla anterior (p. 60-61); les quatre primeres files del CATALOG (p. 25).
