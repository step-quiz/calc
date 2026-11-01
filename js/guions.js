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
  'format-numero': [['fix', 'Fijar decim'], ['sci', 'Not cient'], ['normal', 'Normal']],
  /** La pantalla que surt en triar «Normal» (el manual no la dibuixa: VERIFICAR.md). */
  normal: [['normal1', 'Normal 1'], ['normal2', 'Normal 2']],
  /** Reiniciar. Manual, p. 24-25. */
  reiniciar: [['config-dades', 'Config y datos', {sub: true}], ['variables', 'Mem. variables', {sub: true}], ['tot', 'Iniciar todo', {sub: true}]],
  /** Menú FORMAT amb un resultat irracional (manual, p. 41-43). */
  format: [['estandard', 'Estándar'], ['decimal', 'Decimal'], ['enginyeria', 'Notación ING'], ['sexagesimal', 'Sexagesimal']],
  /** CATALOG de l'aplicació Calcular (manual, p. 25; les dues últimes files: VERIFICAR.md). */
  catalog: [['analisi', 'Análisis func', {sub: true}], ['probabilidad', 'Probabilidad', {sub: true}], ['numeric', 'Cálculo numérico', {sub: true}],
    ['ang-coord-sexag', 'Ang/Coord/Sexag', {sub: true}], ['hiperb-trigon', 'Hiperb/Trigon', {sub: true}], ['altres', 'Otros', {sub: true}]],
  /** Amb Verificar activat, el CATALOG porta «Verificar» a dalt de tot (comprovat a la calculadora). */
  'catalog-verificar': [['verificar', 'Verificar', {sub: true}], ['analisi', 'Análisis func', {sub: true}], ['probabilidad', 'Probabilidad', {sub: true}],
    ['numeric', 'Cálculo numérico', {sub: true}], ['ang-coord-sexag', 'Ang/Coord/Sexag', {sub: true}], ['hiperb-trigon', 'Hiperb/Trigon', {sub: true}], ['altres', 'Otros', {sub: true}]],
  /** CATALOG > Ang/Coord/Sexag (manual, p. 55-57; l'ordre de les tres últimes: VERIFICAR.md). */
  'ang-coord-sexag': [['graus', 'Grados'], ['radians', 'Radianes'], ['gradians', 'Gradianes'], ['rect-polar', 'Rectang a polar'], ['polar-rect', 'Polar a rectang'], ['gms', 'Grados Min Seg']],
  /** CATALOG > Probabilidad (manual, p. 52-53; ordre comprovat a la calculadora). */
  probabilidad: [['percent', '%'], ['factorial', 'Factorial(!)'], ['permutacio', 'Permutación(P)'], ['combinacio', 'Combinación(C)'], ['aleatori', 'Número aleatorio'], ['enter-aleatori', 'Entero aleatorio']],
  /** Menú TOOLS de l'aplicació Calcular (manual, p. 25-26). Amb Verificar activat, una sola fila (comprovat a la calculadora). */
  tools: [['desfer', 'Deshacer'], ['simplificar', 'Simplificar', {sub: true}], ['verificar-on', 'Verificar ON']],
  'tools-verificar': [['verificar-off', 'Verificar OFF']],
  /** CATALOG > Verificar: els símbols de relació (ordre comprovat a la calculadora). */
  verificar: [['igual', '='], ['diferent', '≠'], ['major', '>'], ['menor', '<'], ['major-igual', '≥'], ['menor-igual', '≤']],
  /** El menú que surt en prémer OK sobre una variable (l'ordre: VERIFICAR.md). */
  'menu-variable': [['guardar', 'Guardar'], ['recuperar', 'Recuperar'], ['editar', 'Editar']],
  /** El menú de la tecla FUNCTION (manual, p. 60). */
  funcio: [['f', 'f(x)'], ['g', 'g(x)'], ['definir-f', 'Definir f(x)'], ['definir-g', 'Definir g(x)']],
});

/**
 * Fase 3 (v25): la calculadora en català. Text en castellà (el de MENUS i el de les fitxes, {{…}}) →
 * text en català. NO VERIFICAT: traducció provisional (David, 1/11/2026), feta amb el manual català
 * de la fx-570/991SP X II on hi coincideix (Entrada/Sortida, Unitat angular, Format nombre…); s'ha
 * de confirmar amb la calculadora (VERIFICAR.md). Els textos que no hi són es queden igual.
 */
const CATALA = Object.freeze({
  'Config cálculo': 'Config càlcul', 'Config sistema': 'Config sistema', 'Reiniciar': 'Reiniciar', 'Recursos online': 'Recursos en línia',
  'Entrada/Salida': 'Entrada/Sortida', 'Unidad angular': 'Unitat angular', 'Formato número': 'Format nombre',
  'Result fracción': 'Result fracció', 'Símbolo decimal': 'Símbol decimal', 'Separar dígitos': 'Separar dígits',
  'E Mat/S Mat': 'E Mat/S Mat', 'E Mat/S Decimal': 'E Mat/S Decimal', 'E Línea/S Línea': 'E Línia/S Línia', 'E Línea/S Decim': 'E Línia/S Decim',
  'Grado sexag (D)': 'Graus sexag (D)', 'Radián': 'Radian', 'Grado cent (G)': 'Grau cent (G)',
  'Fijar decim': 'Fixar decim', 'Not cient': 'Not cient', 'Normal': 'Normal', 'Normal 1': 'Normal 1', 'Normal 2': 'Normal 2',
  'Config y datos': 'Config i dades', 'Mem. variables': 'Mem. variables', 'Iniciar todo': 'Iniciar tot',
  'Estándar': 'Estàndard', 'Decimal': 'Decimal', 'Notación ING': 'Notació ENG', 'Sexagesimal': 'Sexagesimal',
  'Análisis func': 'Anàlisi func', 'Probabilidad': 'Probabilitat', 'Cálculo numérico': 'Càlcul numèric',
  'Ang/Coord/Sexag': 'Ang/Coord/Sexag', 'Hiperb/Trigon': 'Hiperb/Trigon', 'Otros': 'Altres', 'Verificar': 'Verificar',
  'Grados': 'Graus', 'Radianes': 'Radians', 'Gradianes': 'Gradians', 'Rectang a polar': 'Rectang a polar', 'Polar a rectang': 'Polar a rectang', 'Grados Min Seg': 'Graus Min Seg',
  '%': '%', 'Factorial(!)': 'Factorial(!)', 'Permutación(P)': 'Permutació(P)', 'Combinación(C)': 'Combinació(C)',
  'Número aleatorio': 'Nombre aleatori', 'Entero aleatorio': 'Enter aleatori',
  'Deshacer': 'Desfer', 'Simplificar': 'Simplificar', 'Verificar ON': 'Verificar ON', 'Verificar OFF': 'Verificar OFF',
  '=': '=', '≠': '≠', '>': '>', '<': '<', '≥': '≥', '≤': '≤',
  'Guardar': 'Desar', 'Recuperar': 'Recuperar', 'Editar': 'Editar',
  'f(x)': 'f(x)', 'g(x)': 'g(x)', 'Definir f(x)': 'Definir f(x)', 'Definir g(x)': 'Definir g(x)',
  'Verdadero': 'Vertader', 'Falso': 'Fals', 'Idioma': 'Idioma',
  'Calcular': 'Calcular', 'Estadística': 'Estadística', 'Tabla': 'Taula', 'Math Box': 'Math Box',
});
const IDIOMES = Object.freeze({es: 'Castellano', ca: 'Català'});
/** Un text de la calculadora en l'idioma triat ('es' per defecte: el de MENUS i de les fitxes). */
const textCalc = (t, idioma) => (idioma === 'ca' && Object.prototype.hasOwnProperty.call(CATALA, t) ? CATALA[t] : t);

/** L'idioma que l'alumne ha triat per a la seva calculadora (es ho guarda el navegador; 'es' si no n'hi ha cap). */
const CLAU_IDIOMA = 'calc-idioma';
function llegeixIdioma() {
  try { return (typeof localStorage !== 'undefined' && localStorage.getItem(CLAU_IDIOMA) === 'ca') ? 'ca' : 'es'; } catch (e) { return 'es'; }
}
function desaIdioma(v) {
  try { localStorage.setItem(CLAU_IDIOMA, v === 'ca' ? 'ca' : 'es'); } catch (e) { /* navegador sense memòria: es queda per a aquesta pàgina */ }
}

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
const verificar = sel => deMenus('verificar', sel);
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

arrel.G = Object.freeze({
  IND, ind, calc, marca, menu, fila, MENUS, deMenus, textos, posicio, CATALA, IDIOMES, textCalc, llegeixIdioma, desaIdioma,
  config, configCalcul, entradaSortida, unitatAngular, formatNumero, normal, reiniciar, format,
  catalog, catalogVerificar, angCoordSexag, probabilidad, tools, toolsVerificar, verificar, menuVariable, menuFuncio,
  VARIABLES, variables, definicio, home, missatge,
});

})(globalThis);
