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

/** CATALOG > Probabilidad (manual, p. 52-53; l'ordre és el de la secció del manual: VERIFICAR.md). */
const PROBABILIDAD = Object.freeze(['%', 'Factorial(!)', 'Permutación(P)', 'Combinación(C)', 'Número aleatorio', 'Entero aleatorio']);
const probabilidad = sel => menu(PROBABILIDAD, sel);

/** Verificar (manual, «Utilizar Verificar»): TOOLS, CATALOG > Verificar i els símbols de relació. */
/** Menú TOOLS de l'aplicació Calcular (manual, p. 25-26): Deshacer, Simplificar ► i Verificar ON.
    Amb Verificar activat, l'última fila passa a ser «Verificar OFF» (p. 64; que la resta de files no canviïn és deduït: VERIFICAR.md). */
const TOOLS = Object.freeze(['Deshacer', 'Simplificar', 'Verificar ON']);
const TOOLS_VERIFICAR = Object.freeze(['Deshacer', 'Simplificar', 'Verificar OFF']);
const filesTools = textos => textos.map(t => fila(t, t === 'Simplificar' ? {sub: true} : {}));
const tools = sel => menu(filesTools(TOOLS), sel);
const toolsVerificar = sel => menu(filesTools(TOOLS_VERIFICAR), sel);
const CATALOG_VERIFICAR = Object.freeze(['Verificar', 'Análisis func', 'Probabilidad', 'Cálculo numérico', 'Ang/Coord/Sexag', 'Hiperb/Trigon', 'Otros']);
const catalogVerificar = sel => menu(ambSubmenu(CATALOG_VERIFICAR), sel);
const VERIFICAR = Object.freeze(['=', '≠', '>', '<', '≥', '≤']);
const verificar = sel => menu(VERIFICAR, sel);

/* ── Variables (tecla VARIABLE; manual, p. 38-39) ───────────────── */
const VARIABLES = Object.freeze(['A', 'B', 'C', 'D', 'E', 'F', 'x', 'y', 'z']);
/** La llista de variables. valors: {x: '1.666666667', …} (les altres valen 0); sel: el nom triat. */
const variables = (valors = {}, sel = 'A') => Object.freeze({
  tipus: 'variables', valors: Object.freeze(VARIABLES.map(n => [n, valors[n] !== undefined ? valors[n] : '0'])), sel, marca: null,
});
/** El menú que surt en prémer OK sobre una variable (l'ordre: VERIFICAR.md). */
const menuVariable = (sel = 0) => menu(['Guardar', 'Recuperar', 'Editar'], sel);

/* ── FUNCTION (manual, p. 60-61) ─────────────────────────────────── */
/** La pantalla de definir f(x) (o g(x)): una línia «f(x)=…». entrada = TeX; el cursor, al final si no s'indica. */
const definicio = (nom = 'f', entrada = '', cursor = true) => Object.freeze({tipus: 'definicio', nom, entrada, cursor, marca: null});
/** El menú de la tecla FUNCTION. */
const menuFuncio = (sel = 0) => menu(['f(x)', 'g(x)', 'Definir f(x)', 'Definir g(x)'], sel);

/* ── Altres pantalles ───────────────────────────────────────────── */
const home = (sel = 0) => Object.freeze({tipus: 'home', sel, marca: null});
const missatge = (linies, opcions = [], sel = 0) => Object.freeze({tipus: 'missatge', linies, opcions, sel, marca: null});

arrel.G = Object.freeze({
  IND, ind, calc, marca, menu, radio, fila,
  CONFIG, config, CONFIG_CALCUL, configCalcul,
  ENTRADA_SORTIDA, entradaSortida, UNITAT_ANGULAR, unitatAngular,
  FORMAT_NUMERO, formatNumero, normal, REINICIAR, reiniciar,
  FORMAT_IRRACIONAL, format, CATALOG, catalog, ANG_COORD_SEXAG, angCoordSexag,
  PROBABILIDAD, probabilidad, TOOLS, tools, TOOLS_VERIFICAR, toolsVerificar, CATALOG_VERIFICAR, catalogVerificar, VERIFICAR, verificar,
  VARIABLES, variables, menuVariable, definicio, menuFuncio,
  home, missatge,
});

})(globalThis);
