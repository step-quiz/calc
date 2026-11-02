/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-x2/model.js — La CASIO fx-82SP X II (i fx-85SP X II, fx-350SP X II, i les SP X)
   ───────────────────────────────────────────────────────────────────
   Totes tenen el mateix manual, el mateix teclat i les mateixes
   aplicacions (Calcular, Estadística, Tabla, Verificar); només canvia
   l'alimentació. Un teclat propi (tecles.js: el de la fx-570/991SP X II
   amb ⌙ i Simp on aquella té CALC i ∫) i la pantalla, els constructors
   de pantalles i el simulador de la fx-82SP CW, amb les diferències a
   variant.js (es carrega primer). Les fitxes: les de la fx-570/991SP X II,
   i les de f(x) amb Tabla en lloc de CALC.
   ═══════════════════════════════════════════════════════════════════ */
Models.descriu({
  id: 'fx-82sp-x2',
  nom: 'CASIO fx-82SP X II / fx-85SP X II / fx-350SP X II',
  curt: 'fx-82/85SP X II',
  imatge: 'imatge.png',   // per a la finestra «Escollir calculadora» (la fa proves/imatges.js)
  idiomes: {es: 'Castellano', ca: 'Català'},
  fitxers: ['variant.js', 'tecles.js', '../fx-82sp-cw/pantalla.js', '../fx-82sp-cw/guions.js', '../fx-82sp-cw/simulador.js',
    '../fx-82sp-cw/fitxes/blocs.js', 'fitxes/exacte.js', 'fitxes/fraccions.js', 'fitxes/angles.js', 'fitxes/pau.js',
    'fitxes/pau-ag.js', 'fitxes/pau-ap.js', 'fitxes/examen.js', 'fitxes/eso/inici.js', 'fitxes/eso/pantalla.js', 'fitxes/eso/parentesis.js',
    'fitxes/eso/percentatges.js', 'fitxes/eso/mitjanes.js', 'fitxes/eso/geometria.js', 'fitxes/eso/trigonometria.js'],
  estils: ['../fx-82sp-cw/estil.css', 'estil.css'],
  proves: ['../fx-82sp-cw/proves.js'],
});
