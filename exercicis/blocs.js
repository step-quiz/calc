/* ═══════════════════════════════════════════════════════════════════
   exercicis/blocs.js — Els blocs i el format d'un exercici
   ───────────────────────────────────────────────────────────────────
   Un exercici és la part d'una fitxa que no depèn de la calculadora.
   Hi ha un fitxer per bloc (exercicis/<bloc>.js; els d'ESO, a
   exercicis/eso/), en l'ordre de models/cataleg.js. Cada calculadora
   hi afegeix les tecles i les pantalles (models/<id>/fitxes/, amb el
   mateix id) i pot substituir qualsevol camp (p. ex. un enunciat que
   parla d'una tecla pròpia). Una calculadora només mostra els
   exercicis que té a les seves fitxes.

   Models.defineixBlocs([…]): els apartats de la portada, en ordre.
     id       nom del bloc
     titol    el títol (una calculadora el pot canviar: M.blocs[id])
     color    el color del bloc (contrast ≥ 5:1 sobre blanc; cap no
              s'acosta al vermell de la zona d'error)
     etapes   ['batx'], ['eso'] o ['eso', 'batx'] (models/cataleg.js)
     petit    true: a la portada, una bombolla petita a part dels blocs,
              que només diu el títol del bloc (i porta a la seva fitxa)

   Models.afegeixExercicis({…}, …): els exercicis d'un bloc.
     id         nom a l'adreça: fitxa.html?id=<id> ([a-z0-9-])
     bloc       id del bloc
     titol      títol curt (portada i capçalera)
     font       (opcional) d'on surt un exercici real, en text pla:
                «CB 4ESO (2026), pregunta 15». Surt en una bombolla en
                clicar la icona de davant de l'enunciat
     figura     (opcional) {src: 'img/…', alt}: miniatura a la dreta de
                l'enunciat, que s'amplia en clicar-la
     enunciat   el que es veu al pas 0
     tancament  (obligatori si l'últim pas és un error) el text del pas
                que s'afegeix al final: la manera correcta i la resposta
     provaTu    (opcional) {enunciat, solucio}: un exercici semblant per
                fer amb la calculadora, amb la solució amagada; surt en
                acabar l'últim pas
     grup       (opcional) el tema dins del bloc («Àlgebra», «Geometria»…):
                a la portada, una ratlla separa dues fitxes seguides de
                grups diferents

   Als textos: $TeX$ = fórmula; $$TeX$$ = fórmula en una línia pròpia;
   [[id]] = una tecla; {{Text}} = una opció d'un menú de la calculadora;
   !!Error típic!! = avís d'error (només en passos amb error: true);
   [mat]…[/mat] = frase de matemàtiques; [calc]…[/calc] = indicació de
   calculadora; [nota]…[/nota] = nota de l'enunciat, en línia pròpia;
   [a]…[/a] = apartat de l'enunciat; \n = salt de línia.
   ═══════════════════════════════════════════════════════════════════ */
Models.defineixBlocs([
  // Batxillerat: blaus i daurats
  {id: 'exacte', titol: 'Treballar en mode \'exacte\' o \'decimal\'', color: '#0c1736', etapes: ['batx']},
  {id: 'fraccions', titol: 'Operar amb fraccions i potències', color: '#0d235e', etapes: ['batx']},
  {id: 'angles', titol: 'Treballar en mode \'graus\' o \'radiants\'', color: '#033d63', etapes: ['batx']},
  {id: 'pau', titol: 'Funcions útils per a la PAU', color: '#876d0d', etapes: ['batx']},
  {id: 'pau-ag', titol: 'Exercicis PAU. Àlgebra i Geometria', color: '#853300', etapes: ['batx']},
  {id: 'pau-ap', titol: 'Exercicis PAU. Anàlisi i Probabilitat', color: '#945600', etapes: ['batx']},
  // Les bombolles petites, a totes dues etapes (en aquest ordre, una al costat de l'altra)
  {id: 'simbols', titol: 'Interpretar els indicadors de pantalla', color: '#3d4f1f', etapes: ['batx', 'eso'], petit: true},
  {id: 'examen', titol: 'Configurar-ho tot abans d\'un examen', color: '#3d4f1f', etapes: ['batx', 'eso'], petit: true},
  {id: 'eso-inici', titol: 'Correcció d\'errors d\'escriptura', color: '#3d4f1f', etapes: ['batx', 'eso'], petit: true},
  // ESO: verds i morats
  {id: 'eso-pantalla', titol: 'Fracció o decimal. Arrodonir. Notació científica', color: '#0b4a40', etapes: ['eso']},
  {id: 'eso-parentesis', titol: 'Ús dels parèntesis', color: '#0d5c4f', etapes: ['eso']},
  {id: 'eso-percentatges', titol: 'Percentatges i proporcions', color: '#14532d', etapes: ['eso']},
  {id: 'eso-mitjanes', titol: 'Mitjanes', color: '#3b2a6b', etapes: ['eso']},
  {id: 'eso-geometria', titol: 'Pitàgores, àrees i volums', color: '#4f2a73', etapes: ['eso']},
  {id: 'eso-trigonometria', titol: 'Trigonometria', color: '#602f6a', etapes: ['eso']},
]);
