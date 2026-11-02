# Historial de versions

Què ha canviat a cada versió del web, de la més nova a la més antiga. El funcionament actual és a
`README.md` i `ARCHITECTURE.md`; aquí només hi ha la història. El número de versió és `VERSIO` a
`js/nucli/models.js` i surt al peu de les pàgines.

## Versió 50 (2/11/2026) — revisió del projecte

- **Exercicis comuns.** La part d'una fitxa que no depèn de la calculadora (títol, enunciat, font,
  figura, tancament, «Prova-ho tu») és ara a `exercicis/`, una sola vegada. Cada calculadora hi posa
  només les tecles i les pantalles, i pot substituir un camp si cal (p. ex. un enunciat de la fx-82MS
  que parla de la tecla a b/c). Els blocs també són a `exercicis/blocs.js`.
- **Reproductor.** `js/nucli/motor.js` s'ha dividit: el reproductor pas a pas és a
  `js/nucli/reproductor.js` i les eines del DOM, a `js/nucli/dom.js`.
  - Les xifres i el punt s'animen un 40 % més de pressa que la velocitat triada; la resta de tecles, igual.
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
