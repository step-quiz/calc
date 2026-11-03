/* ═══════════════════════════════════════════════════════════════════
   models/fx-570sp-cw/model.js — La CASIO fx-570SP CW i la fx-991SP CW
   ───────────────────────────────────────────────────────────────────
   Una calculadora «germana» de la fx-82SP CW: el mateix teclat, la
   mateixa pantalla i les mateixes fitxes. Carrega primer variant.js (el
   que és diferent) i després els fitxers de models/fx-82sp-cw/, que
   omplen aquest model perquè no porten l'id escrit (Models.obre()).
   Els estils: els de la fx-82SP CW i, a sobre, estil.css (el cos blanc).
   ═══════════════════════════════════════════════════════════════════ */
Models.descriu({
  id: 'fx-570sp-cw',
  nom: 'CASIO fx-570SP CW / fx-991SP CW',
  curt: 'fx-570/991SP CW',
  imatge: 'imatge.png',   // per a la finestra «Escollir calculadora» (la fa proves/imatges.js)
  idiomes: {es: 'Castellano', ca: 'Català'},
  fitxers: ['variant.js', '../fx-82sp-cw/tecles.js', '../fx-82sp-cw/pantalla.js', '../fx-82sp-cw/guions.js', '../fx-82sp-cw/simulador.js', '../fx-82sp-cw/fitxes/blocs.js', '../fx-82sp-cw/fitxes/exacte.js', '../fx-82sp-cw/fitxes/fraccions.js', '../fx-82sp-cw/fitxes/angles.js', '../fx-82sp-cw/fitxes/pau.js', '../fx-82sp-cw/fitxes/pau-ag.js', '../fx-82sp-cw/fitxes/pau-ap.js', '../fx-82sp-cw/fitxes/examen.js', '../fx-82sp-cw/fitxes/simbols.js', '../fx-82sp-cw/fitxes/eso/inici.js', '../fx-82sp-cw/fitxes/eso/pantalla.js', '../fx-82sp-cw/fitxes/eso/parentesis.js', '../fx-82sp-cw/fitxes/eso/percentatges.js', '../fx-82sp-cw/fitxes/eso/mitjanes.js', '../fx-82sp-cw/fitxes/eso/geometria.js', '../fx-82sp-cw/fitxes/eso/trigonometria.js'],
  estils: ['../fx-82sp-cw/estil.css', 'estil.css'],
  proves: ['../fx-82sp-cw/proves.js'],
});
