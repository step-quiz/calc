/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/guions.js — Peces per escriure les fitxes
   ───────────────────────────────────────────────────────────────────
   Funcions que fan els estats de pantalla més habituals (vegeu el
   format a pantalla.js), amb els textos dels menús tal com surten al
   manual en castellà de la fx-82SP CW. Així fitxes.js només té dades
   i, si un menú s'ha de corregir, es corregeix en un sol lloc.

   Els textos que el manual no mostra i s'han deduït són a VERIFICAR.md.
   Omple M.guions (a les fitxes i al simulador, «G»).
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
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

/* ── Menús ────────────────────────────────────────────────────────
   Cada menú té un id i cada fila una clau, independents de l'idioma: el simulador hi navega per
   l'id i la clau, mai pels textos ni per la posició. Els textos són els de la calculadora en
   castellà, tal com surten al manual (per a la calculadora en català, fase 3, n'hi haurà una
   altra columna). MENUS: id → [[clau, text, opcions de la fila], …]. */
const MENUS = Object.freeze({
  /** Menú CONFIG (tecla ≡). Manual, p. 19-20. */
  config: [['calcul', 'Config cálculo', {sub: true}], ['sistema', 'Config sistema', {sub: true}], ['reiniciar', 'Reiniciar', {sub: true}], ['recursos', 'Recursos online', {sub: true}]],
  /** Config cálculo. Manual, p. 20-23. */
  'config-calcul': [['entrada-sortida', 'Entrada/Salida', {sub: true}], ['unitat-angular', 'Unidad angular', {sub: true}], ['format-numero', 'Formato número', {sub: true}],
    ['result-fraccio', 'Result fracción', {sub: true}], ['simbol-decimal', 'Símbolo decimal', {sub: true}], ['separar-digits', 'Separar dígitos', {sub: true}]],
  /** Config cálculo > Entrada/Salida. Manual, p. 21. */
  'entrada-sortida': [['mat-mat', 'E Mat/S Mat'], ['mat-decimal', 'E Mat/S Decimal'], ['linia-linia', 'E Línea/S Línea'], ['linia-decimal', 'E Línea/S Decim']],
  /** Config cálculo > Unidad angular. Manual, p. 22. */
  'unitat-angular': [['D', 'Grado sexag (D)'], ['R', 'Radián'], ['G', 'Grado cent (G)']],
  /** Config cálculo > Formato número. Manual, p. 22-23. */
  'format-numero': [['fix', 'Fijar decim', {sub: true}], ['sci', 'Not cient', {sub: true}], ['normal', 'Normal', {sub: true}]],   // ► a les tres files (foto de la calculadora, 1/11/2026)
  /** La pantalla que surt en triar «Normal» (el manual no la dibuixa: VERIFICAR.md). */
  /** En triar Normal: un exemple de cada tipus, i s'obre amb Norm1 triada encara que hi hagi Norm2 (foto, 1/11/2026). */
  normal: [['normal1', 'Norm1:1.23×10⁻³'], ['normal2', 'Norm2:0.00123']],
  /** Reiniciar. Manual, p. 24-25. */
  reiniciar: [['config-dades', 'Config y datos', {sub: true}], ['variables', 'Mem. variables', {sub: true}], ['tot', 'Iniciar todo', {sub: true}]],
  /** Menú FORMAT amb un resultat irracional (manual, p. 41-43). */
  format: [['estandard', 'Estándar'], ['decimal', 'Decimal'], ['enginyeria', 'Notación ING'], ['sexagesimal', 'Sexagesimal']],
  /** CATALOG de l'aplicació Calcular (manual, p. 25; l'ordre de les 6 files, comprovat a la calculadora en català, 1/11/2026;
      el text castellà de les dues últimes, «Hiperb/Trigon» i «Otros», comprovat a la calculadora pel David). */
  catalog: [['analisi', 'Análisis func', {sub: true}], ['probabilidad', 'Probabilidad', {sub: true}], ['numeric', 'Cálculo numérico', {sub: true}],
    ['ang-coord-sexag', 'Ang/Coord/Sexag', {sub: true}], ['hiperb-trigon', 'Hiperb/Trigon', {sub: true}], ['altres', 'Otros', {sub: true}]],
  /** Amb Verificar activat, el CATALOG porta «Verificar» a dalt de tot (comprovat a la calculadora). */
  'catalog-verificar': [['verificar', 'Verificar', {sub: true}], ['analisi', 'Análisis func', {sub: true}], ['probabilidad', 'Probabilidad', {sub: true}],
    ['numeric', 'Cálculo numérico', {sub: true}], ['ang-coord-sexag', 'Ang/Coord/Sexag', {sub: true}], ['hiperb-trigon', 'Hiperb/Trigon', {sub: true}], ['altres', 'Otros', {sub: true}]],
  /** CATALOG > Ang/Coord/Sexag (manual, p. 55-57; l'ordre de les tres últimes: VERIFICAR.md). */
  'ang-coord-sexag': [['graus', 'Grados'], ['radians', 'Radianes'], ['gradians', 'Gradianes'], ['rect-polar', 'Rectang a polar'], ['polar-rect', 'Polar a rectang'], ['gms', 'Grados Min Seg']],
  /** CATALOG > Probabilidad (manual, p. 52-53; ordre comprovat a la calculadora). */
  probabilidad: [['percent', '%'], ['factorial', 'Factorial(!)'], ['permutacio', 'Permutación(P)'], ['combinacio', 'Combinación(C)'], ['aleatori', 'Número aleatorio'], ['enter-aleatori', 'Entero aleatorio']],
  /** Menú TOOLS de l'aplicació Calcular (manual, p. 25-26). Amb Verificar activat, dues files: Deshacer i Verificar OFF,
      amb Deshacer triada (foto de la calculadora, 1/11/2026; abans es creia que només n'hi havia una). */
  tools: [['desfer', 'Deshacer'], ['simplificar', 'Simplificar', {sub: true}], ['verificar-on', 'Verificar ON']],
  'tools-verificar': [['desfer', 'Deshacer'], ['verificar-off', 'Verificar OFF']],
  /** CATALOG > Verificar: els símbols de relació (ordre comprovat a la calculadora). */
  verificar: [['igual', '='], ['diferent', '≠'], ['major', '>'], ['menor', '<'], ['major-igual', '≥'], ['menor-igual', '≤']],
  /** El menú que surt en prémer OK sobre una variable (l'ordre: VERIFICAR.md). */
  'menu-variable': [['guardar', 'Guardar'], ['recuperar', 'Recuperar'], ['editar', 'Editar']],
  /** El menú de la tecla FUNCTION (manual, p. 60). */
  funcio: [['f', 'f(x)'], ['g', 'g(x)'], ['definir-f', 'Definir f(x)'], ['definir-g', 'Definir g(x)']],
});

/**
 * Fase 3 (v25; v27): la calculadora en català. Text en castellà (el de MENUS i el de les fitxes, {{…}}) → text en català.
 * Comprovat amb 43 fotos de la calculadora en català (David, 1/11/2026): CONFIG i els seus submenús, CATALOG i els seus
 * submenús, TOOLS, FUNCTION i HOME. Encara sense foto: el menú FORMAT, el TOOLS i el CATALOG amb Verificar activat,
 * els símbols de Verificar, «Verdadero/Falso», el menú d'una variable i la pantalla «Normal 1 / Normal 2» (VERIFICAR.md).
 */
const CATALA = Object.freeze({
  'Config cálculo': 'Config Càlcul', 'Config sistema': 'Config Sistema', 'Reiniciar': 'Reiniciar', 'Recursos online': 'Recursos online',
  'Entrada/Salida': 'Entrada/Sortida', 'Unidad angular': 'Unitat angular', 'Formato número': 'Format nombre',
  'Result fracción': 'Result fracció', 'Símbolo decimal': 'Símbol decimal', 'Separar dígitos': 'Separar dígits',
  'E Mat/S Mat': 'E Mat/S Mat', 'E Mat/S Decimal': 'E Mat/S Decimal', 'E Línea/S Línea': 'E Línia/S Línia', 'E Línea/S Decim': 'E Línia/S Decim',
  'Grado sexag (D)': 'Grau sexag (D)', 'Radián': 'Radian', 'Grado cent (G)': 'Grau centesimal',
  'Fijar decim': 'Fixar dec', 'Not cient': 'Notac Cientí', 'Normal': 'Normal', 'Normal 1': 'Normal 1', 'Normal 2': 'Normal 2',
  'Config y datos': 'Config i Dades', 'Mem. variables': 'Mem. variables', 'Iniciar todo': 'Iniciar tot',
  'Estándar': 'Estàndard', 'Decimal': 'Decimal', 'Notación ING': 'Notació ENG', 'Sexagesimal': 'Sexagesimal',
  'Análisis func': 'Anàlisi func', 'Probabilidad': 'Probabilitat', 'Cálculo numérico': 'Càlcul numèric',
  'Ang/Coord/Sexag': 'Ang/Coord/Sexag', 'Hiperb/Trigon': 'Hiperbòlica/Trig', 'Otros': 'Altres opcions', 'Verificar': 'Verificar',
  'Grados': 'Graus', 'Radianes': 'Radians', 'Gradianes': 'Gradians', 'Rectang a polar': 'Rectang a polar', 'Polar a rectang': 'Polar a rectang', 'Grados Min Seg': 'Graus Min Seg',
  '%': '%', 'Factorial(!)': 'Factorial(!)', 'Permutación(P)': 'Permutació(P)', 'Combinación(C)': 'Combinació(C)',
  'Número aleatorio': 'Número aleatori', 'Entero aleatorio': 'Núm enter aleator',
  'Deshacer': 'Desfer', 'Simplificar': 'Simplificar', 'Verificar ON': 'Verificar ON', 'Verificar OFF': 'Verificar OFF',
  '=': '=', '≠': '≠', '>': '>', '<': '<', '≥': '≥', '≤': '≤',
  'Guardar': 'Desar', 'Recuperar': 'Recuperar', 'Editar': 'Editar',
  'f(x)': 'f(x)', 'g(x)': 'g(x)', 'Definir f(x)': 'Definir f(x)', 'Definir g(x)': 'Definir g(x)',
  'Verdadero': 'Vardader', 'Falso': 'Fals',   // «Vardader», amb la errata de la calculadora (foto, 1/11/2026)
  'Norm1:1.23×10⁻³': 'Norm1:1.23×10⁻³', 'Norm2:0.00123': 'Norm2:0.00123', 'Idioma': 'Idioma',
  'Calcular': 'Calcular', 'Estadística': 'Estadística', 'Tabla': 'Taula', 'Math Box': 'Math Box',
});
/** Un text de la calculadora en l'idioma triat ('es' per defecte: el de MENUS i de les fitxes). Els idiomes de la calculadora són a model.js. */
const textCalc = (t, idioma) => (idioma === 'ca' && Object.prototype.hasOwnProperty.call(CATALA, t) ? CATALA[t] : t);

const fila = (t, opcions = {}) => Object.freeze(Object.assign({t}, opcions));
/** Un menú: files = [{t, clau, sub, radio}] o textos; opcions.id = l'id del menú (MENUS). */
function menu(files, sel = 0, opcions = {}) {
  return Object.freeze({tipus: 'menu', id: opcions.id || null, files: Object.freeze(files.map(f => (typeof f === 'string' ? fila(f) : f))), sel, marca: opcions.marca || null});
}
/** Un menú de MENUS per l'id. radio = posició del ◉ (només en les llistes d'opcions). */
function deMenus(id, sel = 0, radio = null) {
  const files = MENUS[id].map(([clau, t, op], i) => fila(t, Object.assign({clau}, op || {}, radio === null ? {} : {radio: i === radio ? 'on' : 'off'})));
  return menu(files, sel, {id});
}
/** Els textos d'un menú, en ordre (per a les proves i per buscar una fila). */
const textos = id => MENUS[id].map(f => f[1]);
/** La posició d'una fila per la clau (-1 si no hi és). */
const posicio = (id, clau) => MENUS[id].findIndex(f => f[0] === clau);

const config = sel => deMenus('config', sel);
const configCalcul = sel => deMenus('config-calcul', sel);
const entradaSortida = (marcat, sel = marcat) => deMenus('entrada-sortida', sel, marcat);
const unitatAngular = (marcat, sel = marcat) => deMenus('unitat-angular', sel, marcat);
const formatNumero = (marcat, sel = marcat) => deMenus('format-numero', sel, marcat);
const normal = sel => deMenus('normal', sel);
const reiniciar = sel => deMenus('reiniciar', sel);
const format = sel => deMenus('format', sel);
const catalog = sel => deMenus('catalog', sel);
const catalogVerificar = sel => deMenus('catalog-verificar', sel);
const angCoordSexag = sel => deMenus('ang-coord-sexag', sel);
const probabilidad = sel => deMenus('probabilidad', sel);
const tools = sel => deMenus('tools', sel);
const toolsVerificar = sel => deMenus('tools-verificar', sel);
/** Els símbols de Verificar: una graella de dues columnes (= ≠ / > < / ≥ ≤; foto de la calculadora, 1/11/2026). */
const verificar = sel => Object.freeze(Object.assign({}, deMenus('verificar', sel), {columnes: 2}));
const menuVariable = (sel = 0) => deMenus('menu-variable', sel);
const menuFuncio = (sel = 0) => deMenus('funcio', sel);

/* ── Variables (tecla VARIABLE; manual, p. 38-39) ───────────────── */
const VARIABLES = Object.freeze(['A', 'B', 'C', 'D', 'E', 'F', 'x', 'y', 'z']);
/** La llista de variables. valors: {x: '1.666666667', …} (les altres valen 0); sel: el nom triat. */
const variables = (valors = {}, sel = 'A') => Object.freeze({
  tipus: 'variables', valors: Object.freeze(VARIABLES.map(n => [n, valors[n] !== undefined ? valors[n] : '0'])), sel, marca: null,
});
/* ── FUNCTION (manual, p. 60-61) ─────────────────────────────────── */
/** La pantalla de definir f(x) (o g(x)): una línia «f(x)=…». entrada = TeX; el cursor, al final si no s'indica. */
const definicio = (nom = 'f', entrada = '', cursor = true) => Object.freeze({tipus: 'definicio', nom, entrada, cursor, marca: null});

/* ── Altres pantalles ───────────────────────────────────────────── */
const home = (sel = 0) => Object.freeze({tipus: 'home', sel, marca: null});
const missatge = (linies, opcions = [], sel = 0) => Object.freeze({tipus: 'missatge', linies, opcions, sel, marca: null});

M.guions = Object.freeze({
  IND, ind, calc, marca, menu, fila, MENUS, deMenus, textos, posicio, CATALA, textCalc,
  config, configCalcul, entradaSortida, unitatAngular, formatNumero, normal, reiniciar, format,
  catalog, catalogVerificar, angCoordSexag, probabilidad, tools, toolsVerificar, verificar, menuVariable, menuFuncio,
  VARIABLES, variables, definicio, home, missatge,
});

})(Models.obre('fx-82sp-cw'));
