/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/model.js — La CASIO fx-82SP CW
   ───────────────────────────────────────────────────────────────────
   El descriptor del model (vegeu js/nucli/models.js):
     fitxers  es carreguen en aquest ordre (guions.js abans del simulador
              i de les fitxes, que el fan servir; fitxes/blocs.js abans
              de les fitxes de cada bloc);
     estils   els fulls d'estil de la calculadora (després de css/estil.css);
     proves   mòduls de Node per a proves/comprova.js (no van al navegador).
   ═══════════════════════════════════════════════════════════════════ */
Models.descriu({
  id: 'fx-82sp-cw',
  nom: 'CASIO fx-82SP CW',
  curt: 'fx-82SP CW',
  imatge: 'imatge.png',   // per a la finestra «Escollir calculadora» (la fa proves/imatges.js)
  // Els menús de la calculadora es poden posar en castellà o en català: l'alumne tria el de la seva
  idiomes: {es: 'Castellano', ca: 'Català'},
  fitxers: [
    'tecles.js', 'pantalla.js', 'guions.js', 'simulador.js',
    'fitxes/blocs.js', 'fitxes/exacte.js', 'fitxes/fraccions.js', 'fitxes/angles.js', 'fitxes/pau.js',
    'fitxes/pau-ag.js', 'fitxes/pau-ap.js', 'fitxes/examen.js',
    'fitxes/eso/inici.js', 'fitxes/eso/pantalla.js', 'fitxes/eso/parentesis.js', 'fitxes/eso/percentatges.js', 'fitxes/eso/mitjanes.js', 'fitxes/eso/geometria.js', 'fitxes/eso/trigonometria.js',
  ],
  estils: ['estil.css'],
  proves: ['proves.js'],
});
