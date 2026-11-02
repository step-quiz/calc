/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/model.js — La CASIO fx-82MS (2a edició, S-V.P.A.M.)
   ───────────────────────────────────────────────────────────────────
   El descriptor del model (vegeu js/nucli/models.js). La calculadora
   no té idiomes: els menús (MODE) són abreviatures en anglès.
   Font: «fx-82MS … (2.ª edición / S-V.P.A.M.) Guía del usuario» (CASIO,
   2018) i les fotos de producte; el que és deduït és a VERIFICAR.md.
   ═══════════════════════════════════════════════════════════════════ */
Models.descriu({
  id: 'fx-82ms',
  nom: 'CASIO fx-82MS (2a edició)',
  curt: 'fx-82MS',
  imatge: 'imatge.png',   // per a la finestra «Escollir calculadora» (la fa proves/imatges.js)
  idiomes: null,
  fitxers: [
    'tecles.js', 'pantalla.js', 'guions.js', 'simulador.js',
    'fitxes/blocs.js', 'fitxes/exacte.js', 'fitxes/fraccions.js', 'fitxes/angles.js', 'fitxes/pau.js',
    'fitxes/pau-ag.js', 'fitxes/pau-ap.js', 'fitxes/examen.js',
    'fitxes/eso/inici.js', 'fitxes/eso/pantalla.js', 'fitxes/eso/parentesis.js', 'fitxes/eso/percentatges.js', 'fitxes/eso/mitjanes.js', 'fitxes/eso/geometria.js', 'fitxes/eso/trigonometria.js',
  ],
  estils: ['estil.css'],
  proves: ['proves.js'],
});
