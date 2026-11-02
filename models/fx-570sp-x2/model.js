/* ═══════════════════════════════════════════════════════════════════
   models/fx-570sp-x2/model.js — La CASIO fx-570SP X II i la fx-991SP X II
   ───────────────────────────────────────────────────────────────────
   Un teclat propi (tecles.js, amb la geometria de la foto) i la resta
   de la fx-82SP CW: la pantalla de càlcul, els constructors de pantalles
   (guions.js) i el simulador són els de models/fx-82sp-cw/, que omplen
   aquest model perquè no porten l'id escrit (Models.obre()). El que fa
   diferent (tecles que escriuen una altra cosa, menús numerats, SHIFT
   MENU = CONFIG) és a variant.js, que es carrega primer.
   Les fitxes: les tecles d'aquesta calculadora, a fitxes/.
   ═══════════════════════════════════════════════════════════════════ */
Models.descriu({
  id: 'fx-570sp-x2',
  nom: 'CASIO fx-570SP X II / fx-991SP X II',
  curt: 'fx-570/991SP X II',
  imatge: 'imatge.png',   // per a la finestra «Escollir calculadora» (la fa proves/imatges.js)
  idiomes: {es: 'Castellano', ca: 'Català'},
  fitxers: ['variant.js', 'tecles.js', '../fx-82sp-cw/pantalla.js', '../fx-82sp-cw/guions.js', '../fx-82sp-cw/simulador.js',
    '../fx-82sp-cw/fitxes/blocs.js', 'fitxes/exacte.js', 'fitxes/fraccions.js', 'fitxes/angles.js', 'fitxes/pau.js',
    'fitxes/pau-ag.js', 'fitxes/pau-ap.js', 'fitxes/examen.js', 'fitxes/eso/inici.js', 'fitxes/eso/pantalla.js', 'fitxes/eso/parentesis.js',
    'fitxes/eso/percentatges.js', 'fitxes/eso/mitjanes.js', 'fitxes/eso/geometria.js', 'fitxes/eso/trigonometria.js'],
  estils: ['../fx-82sp-cw/estil.css', 'estil.css'],
  proves: ['../fx-82sp-cw/proves.js'],
});
