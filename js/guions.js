/* ═══════════════════════════════════════════════════════════════════
   guions.js — Peces per escriure les fitxes
   ───────────────────────────────────────────────────────────────────
   Funcions que fan els estats de pantalla més habituals (vegeu el
   format a pantalla.js), amb els textos dels menús tal com surten al
   manual en castellà de la fx-82SP CW. Així fitxes.js només té dades
   i, si un menú s'ha de corregir, es corregeix en un sol lloc.

   Els textos que el manual no mostra i s'han deduït són a VERIFICAR.md.
   Exporta «G».
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

/* ── Indicadors ─────────────────────────────────────────────────────
   Configuració per defecte després de reiniciar: E Mat/S Mat (icona √)
   i graus (D). */
const IND = Object.freeze({
  D: Object.freeze({mat: true, ang: 'D'}),
  R: Object.freeze({mat: true, ang: 'R'}),
});
/** Indicadors a partir d'uns de base: G.ind(G.IND.D, {fix: true}). */
const ind = (base, extra = {}) => Object.freeze(Object.assign({}, base, extra));

/* ── Pantalla de càlcul ─────────────────────────────────────────────
   G.calc(ind, entrada, resultat, opcions)
     sense resultat, hi ha el cursor al final de l'entrada (opcions.cursor ho canvia);
     amb resultat, la barra mostra ▲ (hi ha historial), si opcions.hist no diu el contrari. */
function calc(indicadors, entrada = '', resultat = '', opcions = {}) {
  const hist = opcions.hist !== undefined ? opcions.hist : Boolean(resultat);
  return Object.freeze({
    tipus: 'calc',
    ind: ind(indicadors, hist ? {hist: true} : {}),
    entrada, resultat,
    cursor: opcions.cursor !== undefined ? opcions.cursor : !resultat,
    linia: Boolean(opcions.linia),
    marca: opcions.marca || null,
  });
}

/** Un estat igual, però amb una part ressaltada: G.marca(estat, 'ang'). */
const marca = (estat, nom) => Object.freeze(Object.assign({}, estat, {marca: nom}));

/* ── Menús ──────────────────────────────────────────────────────── */
const fila = (t, opcions = {}) => Object.freeze(Object.assign({t}, opcions));
function menu(files, sel = 0, opcions = {}) {
  return Object.freeze({tipus: 'menu', files: Object.freeze(files.map(f => (typeof f === 'string' ? fila(f) : f))), sel, marca: opcions.marca || null});
}
/** Llista amb botons de ràdio: el ◉ és a la posició «marcat». */
const radio = (textos, marcat, sel) => menu(textos.map((t, i) => fila(t, {radio: i === marcat ? 'on' : 'off'})), sel);
const ambSubmenu = textos => textos.map(t => fila(t, {sub: true}));

/** Menú CONFIG (tecla ≡). Manual, p. 19-20. */
const CONFIG = Object.freeze(['Config cálculo', 'Config sistema', 'Reiniciar', 'Recursos online']);
const config = sel => menu(ambSubmenu(CONFIG), sel);

/** Config cálculo. Manual, p. 20-23. */
const CONFIG_CALCUL = Object.freeze(['Entrada/Salida', 'Unidad angular', 'Formato número', 'Result fracción', 'Símbolo decimal', 'Separar dígitos']);
const configCalcul = sel => menu(ambSubmenu(CONFIG_CALCUL), sel);

/** Config cálculo > Entrada/Salida. Manual, p. 21. */
const ENTRADA_SORTIDA = Object.freeze(['E Mat/S Mat', 'E Mat/S Decimal', 'E Línea/S Línea', 'E Línea/S Decim']);
const entradaSortida = (marcat, sel = marcat) => radio(ENTRADA_SORTIDA, marcat, sel);

/** Config cálculo > Unidad angular. Manual, p. 22. */
const UNITAT_ANGULAR = Object.freeze(['Grado sexag (D)', 'Radián', 'Grado cent (G)']);
const unitatAngular = (marcat, sel = marcat) => radio(UNITAT_ANGULAR, marcat, sel);

/** Config cálculo > Formato número. Manual, p. 22-23. */
const FORMAT_NUMERO = Object.freeze(['Fijar decim', 'Not cient', 'Normal']);
const formatNumero = (marcat, sel = marcat) => radio(FORMAT_NUMERO, marcat, sel);
/** La pantalla que surt en triar «Normal» (el manual no la dibuixa: VERIFICAR.md). */
const normal = sel => menu(['Normal 1', 'Normal 2'], sel);

/** Reiniciar. Manual, p. 24-25. */
const REINICIAR = Object.freeze(['Config y datos', 'Mem. variables', 'Iniciar todo']);
const reiniciar = sel => menu(ambSubmenu(REINICIAR), sel);

/** Menú FORMAT. Les opcions depenen del resultat (manual, p. 41-43). */
const FORMAT_IRRACIONAL = Object.freeze(['Estándar', 'Decimal', 'Notación ING', 'Sexagesimal']);
const format = (sel, opcions = FORMAT_IRRACIONAL) => menu(opcions, sel);

/** CATALOG de l'aplicació Calcular (manual, p. 25; les dues últimes files: VERIFICAR.md). */
const CATALOG = Object.freeze(['Análisis func', 'Probabilidad', 'Cálculo numérico', 'Ang/Coord/Sexag', 'Hiperb/Trigon', 'Otros']);
const catalog = sel => menu(ambSubmenu(CATALOG), sel);
/** CATALOG > Ang/Coord/Sexag (manual, p. 55-57; l'ordre de les tres últimes: VERIFICAR.md). */
const ANG_COORD_SEXAG = Object.freeze(['Grados', 'Radianes', 'Gradianes', 'Rectang a polar', 'Polar a rectang', 'Grados Min Seg']);
const angCoordSexag = sel => menu(ANG_COORD_SEXAG, sel);

/* ── Altres pantalles ───────────────────────────────────────────── */
const home = (sel = 0) => Object.freeze({tipus: 'home', sel, marca: null});
const missatge = (linies, opcions = [], sel = 0) => Object.freeze({tipus: 'missatge', linies, opcions, sel, marca: null});

arrel.G = Object.freeze({
  IND, ind, calc, marca, menu, radio, fila,
  CONFIG, config, CONFIG_CALCUL, configCalcul,
  ENTRADA_SORTIDA, entradaSortida, UNITAT_ANGULAR, unitatAngular,
  FORMAT_NUMERO, formatNumero, normal, REINICIAR, reiniciar,
  FORMAT_IRRACIONAL, format, CATALOG, catalog, ANG_COORD_SEXAG, angCoordSexag,
  home, missatge,
});

})(globalThis);
