/* ═══════════════════════════════════════════════════════════════════
   models/fx-570sp-x2/variant.js — El que la fx-570/991SP X II fa diferent de la fx-82SP CW
   ───────────────────────────────────────────────────────────────────
   La fx-570SP X II i la fx-991SP X II tenen un teclat propi (tecles.js),
   però la pantalla de càlcul, l'editor de fórmules i les fitxes són com
   els de la fx-82SP CW. Per això aquesta calculadora fa servir
   pantalla.js, guions.js i simulador.js de models/fx-82sp-cw/ (vegeu
   model.js), i aquí hi ha les diferències, que hi llegeixen (M.variant).
   Es carrega abans que ells.
     · Algunes tecles escriuen una altra cosa: (−) és una tecla pròpia;
       ln és una tecla; SHIFT (−) = log, SHIFT x² = x³, SHIFT ×10ˣ = π.
     · Els menús són NUMERATS: «1:Entrada/Salida»… i es trien prement el
       número, sense OK (no hi ha tecla OK). SHIFT MENU obre CONFIG.
   Font: «fx-570SP X II / fx-991SP X II Guía del usuario» (CASIO, en
   castellà i en català) i la foto de producte de la fx-570SP X II Iberia.
   El que no surt al manual és a VERIFICAR.md.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

/** CONFIG (SHIFT MENU), primera pàgina, i Unidad angular (manual, «Configuración de la calculadora»). */
const MENUS = Object.freeze({
  'x2-config': [['entrada-sortida', '1:Entrada/Salida'], ['unitat-angular', '2:Unidad angular'],
    ['format-numero', '3:Formato número'], ['simbol-enginyeria', '4:Símb ingeniería']],
  'x2-unitat': [['D', '1:Grado sexag (D)'], ['R', '2:Radián'], ['G', '3:Grado cent (G)']],
});

M.variant = Object.freeze({
  /** Tecles que escriuen alguna cosa i que la fx-82SP CW no té (s'afegeixen a les de la CW). */
  escriu: Object.freeze({neg: '-', ln: '\\ln('}),
  /** El que escriu cada tecla després de SHIFT (foto: les funcions grogues). */
  escriuShift: Object.freeze({exp: '\\pi ', neg: '\\log(', x2: '^{3}',
    sen: '\\mathrm{Arcsen}(', cos: '\\mathrm{Arccos}(', tan: '\\mathrm{Arctan}('}),
  /** SHIFT x■ = ■√□ (arrel n-èsima); SHIFT √■ (∛) no s'ha fet servir encara. */
  plantillesShift: Object.freeze({pot: 'arreln'}),
  menusNumerats: true,
  menus: MENUS,
  /** Les traduccions (manual en català; VERIFICAR.md: per comprovar a la calculadora en català). */
  catala: Object.freeze({
    '1:Entrada/Salida': '1:Entrada/Sortida', '2:Unidad angular': '2:Unitat angular', '3:Formato número': '3:Format nombre',
    '4:Símb ingeniería': '4:Símb enginyeria',
    '1:Grado sexag (D)': '1:Graus sexag (D)', '2:Radián': '2:Radian', '3:Grado cent (G)': '3:Grau centesimal',
  }),
  /** Les tecles que obren un menú des de la pantalla de càlcul: SHIFT MENU = CONFIG (la primera pàgina; n'hi ha més, ▼). */
  obreMenu(id, shift, G) {
    if (id === 'menu' && shift) return config(G);
    return undefined;
  },
  /** Què fa cada número en aquests menús: CONFIG 2 → Unidad angular; Unidad angular 1, 2, 3 → canvia la unitat i torna a calcular. */
  enTriar: (G, eines) => ({
    'x2-config': {'unitat-angular': () => G.deMenus('x2-unitat', 0)},
    'x2-unitat': {D: e => eines.canviaUnitat(e, 'D'), R: e => eines.canviaUnitat(e, 'R'), G: e => eines.canviaUnitat(e, 'G')},
  }),
});

/** La primera pàgina de CONFIG: té més pàgines (la barra de desplaçament de la dreta ho diu). */
function config(G) {
  return Object.freeze(Object.assign({}, G.deMenus('x2-config', 0), {desplacable: true}));
}

/** Les pantalles pròpies que fan servir les fitxes d'aquesta calculadora. */
M.x2 = Object.freeze({
  config: () => config(M.guions),
  unitat: () => M.guions.deMenus('x2-unitat', 0),
});

})(Models.obre());
