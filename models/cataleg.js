/* ═══════════════════════════════════════════════════════════════════
   models/cataleg.js — Les calculadores i les etapes del web, en ordre
   ───────────────────────────────────────────────────────────────────
   Cada id de calculadora és una carpeta models/<id>/ amb el seu model.js.
   La primera és la de per defecte (David, 1/11/2026: la fx-82SP CW). Per
   afegir-ne una: la carpeta i una línia aquí.

   Les etapes (v36, David, 1/11/2026: un sol web amb Batxillerat i ESO).
   La primera és la de per defecte. Cada bloc de cada calculadora diu a
   quines etapes surt (fitxes/blocs.js, bloc.etapes). Camps:
     nom         el del selector «Etapa» de la portada
     lema        la línia petita de sobre el títol de la portada
     titol       la segona part del <title> de la portada
     descripcio  la <meta name="description"> de la portada
   ═══════════════════════════════════════════════════════════════════ */
Models.cataleg([
  'fx-82sp-cw',
  'fx-82ms',
]);

Models.etapes([
  {id: 'batx', nom: 'Batxillerat', lema: 'Matemàtiques · Batxillerat · PAU', titol: 'Matemàtiques de Batxillerat',
    descripcio: 'Fitxes pas a pas per aprendre a fer servir les calculadores fx-82SP CW i fx-82MS a Matemàtiques de Batxillerat i a la PAU.'},
  {id: 'eso', nom: 'ESO', lema: 'Matemàtiques · ESO · Competència matemàtica', titol: 'Matemàtiques d\'ESO',
    descripcio: 'Fitxes pas a pas per aprendre a fer servir les calculadores fx-82SP CW i fx-82MS a Matemàtiques d\'ESO i a les proves de competències bàsiques.'},
]);
