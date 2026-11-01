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
| 18 | Plantilles a mig escriure | fitxes `arrel-n`, `frac-prioritat` | Les caselles buides es dibuixen amb □ i, el cursor es dibuixa on és de debò (dins de la casella), també en acabar el pas (versió 23). |
| 19 | Decimals amb ≈ (SHIFT EXE): quantes xifres i si es veuen els zeros finals | fitxes `pau-ana-25i-q4a`, `pau-ana-25j-q1`, `pau-ana-25s-q4a`, `pau-pro-24s-q4`, `pau-pro-25j-q3` | 10 xifres significatives i sense zeros al final (Normal 2): 2.19740255, 0.5904, 0.01240694789, −200.9950249. |
| 20 | Fraccions que el text diu que sortirien amb EXE | fitxes `pau-pro-24s-q4` (pas 2), `pau-pro-25j-q3` | $1-0{,}8^4$ dona $\frac{369}{625}$ i $5\times(0{,}8^4-0{,}8^5)$ dona $\frac{256}{625}$ (com a la fila 13). |
| 21 | Menú FORMAT quan el resultat és $\sqrt{33}$ o $\frac{3\sqrt{2}}{2}$ | fitxa `pau-geo-26j2-q4b`, passos 3 i 7 | El mateix que la fila 5 ({{Estándar}}, {{Decimal}}, …), amb {{Decimal}} a la segona fila. |
| 22 | $3\,\mathrm{sen}(\frac{\pi}{4})$ en radians | fitxa `pau-ana-25s-q4a`, pas 3 | Surt $\frac{3\sqrt{2}}{2}$ (com $\mathrm{sen}(\pi\div 6)=\frac{1}{2}$ a `canvia-radians`). Per a $12\,\mathrm{sen}(\frac{\pi}{4})+12\cos(\frac{\pi}{4})-12$ no se sap com s'escriuria el resultat exacte ($-12+12\sqrt{2}$?): per això la fitxa fa servir ≈. |
| 23 | Resultat exacte d'una arrel cúbica amb $\pi$, i d'expressions amb Ans | fitxa `pau-ana-25i-q4a` | Es fa servir sempre ≈: no se sap si, amb EXE, l'arrel cúbica de $\frac{100}{3\pi}$ surt en decimal o d'una altra manera. |

La llista de variables (tecla VARIABLE, `G.variables`) i el menú que surt en prémer OK sobre una variable (`G.menuVariable`: Guardar, Recuperar, Editar) estan fets però cap fitxa no els fa servir ara: abans de fer-los servir, cal comprovar-ne l'ordre i l'aspecte.

Els resultats numèrics (0.7071067812, 0.9998329795, −0.9880316241, 0.1666666667, 0.5735764364, 13.94757436, 27.89514873, 1.771243749) s'han calculat
i arrodonit a 10 xifres significatives, com fa la calculadora en el format Normal 2.

**Contrastat amb el manual (31/10/2026) i ja no deduït:** el menú TOOLS de Calcular (Deshacer, Simplificar ►, Verificar ON; p. 25-26); «Verificar ON»/«Verificar OFF», l'indicador ✔, que s'hi torna a la pantalla anterior i que l'historial s'esborra (p. 63-64); «Verdadero»/«Falso» alineats a la dreta de la línia del resultat (p. 65); la plantilla del logaritme (tecla `log■□`, la base, `→`, el nombre; es dibuixa $\log_{2}(16)$ i el parèntesi de tancament ja hi és; p. 51); `nCr` i `nPr` es dibuixen «10C4» i «10P4» (p. 53); el menú FUNCTION (f(x), g(x), Definir f(x), Definir g(x)), «f(x)=» / «g(x)=» i que EXE torna a la pantalla anterior (p. 60-61); les quatre primeres files del CATALOG (p. 25).

**La calculadora en català (versió 27): comprovada amb 43 fotos de la calculadora (David, 1/11/2026).** Les etiquetes de
`G.CATALA` (`js/guions.js`) ja són les de la pantalla: CONFIG (Config Càlcul, Config Sistema, Reiniciar, Recursos online),
Config Càlcul (Entrada/Sortida, Unitat angular, Format nombre, Result fracció, Símbol decimal, Separar dígits) i les seves
opcions (Grau sexag (D), Radian, Grau centesimal; Fixar dec, Notac Cientí, Normal; Fracció mixta, Fracció impròpia; Punt, Coma),
Reiniciar (Config i Dades, Mem. variables, Iniciar tot), CATALOG (Anàlisi func, Probabilitat, Càlcul numèric, Ang/Coord/Sexag,
Hiperbòlica/Trig, Altres opcions), Probabilitat (%, Factorial(!), Permutació(P), Combinació(C), Número aleatori, Núm enter
aleator), Ang/Coord/Sexag (Graus, Radians, Gradians, Rectang a polar, Polar a rectang, Graus Min Seg), TOOLS (Desfer,
Simplificar ►, Verificar ON), FUNCTION i HOME (Calcular, Estadística, Taula, Math Box).

Les fotos també confirmen, sigui quin sigui l'idioma: l'ordre de les 6 files del CATALOG (fila 3 de la taula) i de les 6 de
Ang/Coord/Sexag (fila 4); que a **Format nombre** les tres files porten ► i que «Normal» mostra el tipus triat a la dreta («:2»;
el web encara no el dibuixa); que en català la pantalla també escriu **sen** (al CATALOG hi ha «Arcsen»); que **PreAns** és a
CATALOG > Altres opcions; i que la confirmació de Reiniciar és «Reiniciar OK?», el nom de l'opció i les files **Sí** i
**Cancelar** (fila 1 de la taula: no és «Sí / No»).

**Segona i tercera tanda de fotos (1/11/2026, versió 28).** Confirmades en català: el menú FORMAT amb √2/2 (Estàndard, Decimal,
Notació ENG, Sexagesimal), el CATALOG amb Verificar activat (Verificar a dalt de tot), «Fals» i, literalment, «**Vardader**» (amb
la errata de la calculadora). I tres canvis d'estructura, que no depenen de l'idioma i ja són al web:
1. Amb Verificar activat, el menú TOOLS té **dues files**, «Deshacer» (triada) i «Verificar OFF»: per desactivar-lo, [TOOLS] [↓] [OK].
   Corregeix el que es creia el 31/10/2026 (una sola fila).
2. En triar «Normal» a Format nombre surten «Norm1:1.23×10⁻³» i «Norm2:0.00123» (no «Normal 1 / Normal 2»), i el menú s'obre
   amb Norm1 triada encara que hi hagi Norm2: per triar Norm2, [↓] [OK] (fitxa *Tot em surt arrodonit*). Substitueix la fila 2.
3. Els símbols de CATALOG > Verificar surten en una graella de dues columnes (= ≠ / > < / ≥ ≤): ↓ ↑ canvien de fila i → ← de columna.
El menú d'una variable (OK a la llista de variables) només porta «Desar» quan hi ha un resultat per desar; si no, «Recuperar» i
«Editar». Cap fitxa no el fa servir. En castellà, les dues últimes files del CATALOG són «Hiperb/Trigon» i «Otros» (comprovat a la calculadora, David, 1/11/2026).

**Des de la versió 24,** l'indicador ✔ de Verificar es dibuixa a la dreta, al costat de ▲, com a la imatge del manual (p. 63).

**Contrastat a la calculadora real (David, 31/10/2026) i ja no deduït:**
1. ~~Amb Verificar activat, el menú TOOLS només té una fila~~ — **corregit l'1/11/2026**: té dues files, «Deshacer» i «Verificar OFF» (vegeu més amunt).
2. Amb Verificar activat, el CATALOG porta «Verificar» com a primera fila i, darrere, les files de sempre.
3. Els símbols de CATALOG > Verificar surten en aquest ordre: =, ≠, >, <, ≥, ≤.
4. CATALOG > Probabilidad: %, Factorial(!), Permutación(P), Combinación(C), Número aleatorio, Entero aleatorio (per arribar a Combinación(C), tres cops ↓).
5. $8\div 0{,}57$ en E Mat/S Mat dona la fracció $\frac{800}{57}$.
