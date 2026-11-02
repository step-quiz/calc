/* ═══════════════════════════════════════════════════════════════════
   models/cataleg.js — Les calculadores, les etapes i els exercicis
   ───────────────────────────────────────────────────────────────────
   Models.cataleg: cada id és una carpeta models/<id>/ amb el seu
   model.js. La primera calculadora és la de per defecte. Per afegir-ne
   una: la carpeta i una línia aquí.

   Models.etapes: la primera és la de per defecte. Camps:
     nom         el del selector «Etapa» de la portada
     titol       la segona part del <title> de la portada
     descripcio  la <meta name="description"> de la portada

   Models.exercicis: els fitxers de exercicis/, en l'ordre en què es
   carreguen (blocs.js, el primer). Un bloc nou: el seu fitxer aquí.
   ═══════════════════════════════════════════════════════════════════ */
Models.cataleg([
  'fx-82sp-cw',
  'fx-570sp-cw',
  'fx-570sp-x2',
  'fx-82ms',
]);

Models.etapes([
  {id: 'batx', nom: 'Batxillerat', titol: 'Matemàtiques de Batxillerat',
    descripcio: 'Fitxes pas a pas per aprendre a fer servir les calculadores fx-82SP CW, fx-570/991SP CW, fx-570/991SP X II i fx-82MS a Matemàtiques de Batxillerat i a la PAU.'},
  {id: 'eso', nom: 'ESO', titol: 'Matemàtiques d\'ESO',
    descripcio: 'Fitxes pas a pas per aprendre a fer servir les calculadores fx-82SP CW, fx-570/991SP CW, fx-570/991SP X II i fx-82MS a Matemàtiques d\'ESO i a les proves de competències bàsiques.'},
]);

Models.exercicis([
  'blocs.js',
  'exacte.js', 'fraccions.js', 'angles.js', 'pau.js', 'pau-ag.js', 'pau-ap.js', 'examen.js',
  'eso/inici.js', 'eso/pantalla.js', 'eso/parentesis.js', 'eso/percentatges.js', 'eso/mitjanes.js', 'eso/geometria.js', 'eso/trigonometria.js',
]);
