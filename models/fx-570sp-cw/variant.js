/* ═══════════════════════════════════════════════════════════════════
   models/fx-570sp-cw/variant.js — El que la fx-570/991SP CW té diferent de la fx-82SP CW
   ───────────────────────────────────────────────────────────────────
   La fx-570SP CW i la fx-991SP CW tenen el mateix teclat i la mateixa
   pantalla que la fx-82SP CW: aquesta calculadora fa servir els fitxers
   de models/fx-82sp-cw/ (vegeu model.js) i aquí només hi ha les
   diferències, que llegeixen tecles.js i guions.js (M.variant). Es
   carrega abans que ells.
   Font: «fx-570SP CW / fx-991SP CW Guía del usuario» (CASIO) i la foto
   de producte de la fx-570SP CW Iberia. El que no surt al manual és a
   VERIFICAR.md.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

M.variant = Object.freeze({
  /** Les funcions amb SHIFT que canvien (foto): PreAns sobre Ans (la fx-82SP CW hi té Simp) i i (imaginària) sobre el 9. */
  alt: Object.freeze({ans: 'PreAns', 9: '<i>i</i>'}),
  menus: Object.freeze({
    /** Config cálculo (manual, p. 23-27): dues files més que a la fx-82SP CW, Símb ingeniería i Result complejo. */
    'config-calcul': [['entrada-sortida', 'Entrada/Salida', {sub: true}], ['unitat-angular', 'Unidad angular', {sub: true}],
      ['format-numero', 'Formato número', {sub: true}], ['simbol-enginyeria', 'Símb ingeniería', {sub: true}],
      ['result-fraccio', 'Result fracción', {sub: true}], ['result-complex', 'Result complejo', {sub: true}],
      ['simbol-decimal', 'Símbolo decimal', {sub: true}], ['separar-digits', 'Separar dígitos', {sub: true}]],
  }),
  /** Les traduccions de les files noves (VERIFICAR.md: no comprovades a la calculadora). */
  catala: Object.freeze({'Símb ingeniería': 'Símb enginyeria', 'Result complejo': 'Result complex'}),
});

})(Models.obre());
