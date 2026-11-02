/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-x2/variant.js — El que la fx-82/85/350SP X II fa diferent de la fx-82SP CW
   ───────────────────────────────────────────────────────────────────
   La fx-82SP X II, la fx-85SP X II i la fx-350SP X II (i les SP X, sense
   «II») són la mateixa calculadora: el manual és el mateix i només canvia
   l'alimentació. És la germana petita de la fx-570/991SP X II (el mateix
   cos i les mateixes tecles, sense CALC, SOLVE, ∫ ni d/dx) i, com ella,
   fa servir pantalla.js, guions.js i simulador.js de models/fx-82sp-cw/.
   Aquí hi ha les diferències (M.variant), com a models/fx-570sp-x2/:
     · les tecles que escriuen una altra cosa: (−), ln, SHIFT (−) = log,
       SHIFT ×10ˣ = π, SHIFT ÷ = nCr; ALPHA ×10ˣ = e, ALPHA Ans = PreAns;
     · els menús NUMERATS, que es trien prement el número; SHIFT MENU
       obre CONFIG (manual, p. 4 i 6); OPTN, la unitat d'un sol angle
       (OPTN 2, p. 16) o, a Verificar, els signes;
     · MENU: quatre aplicacions (p. 5): 1 Calcular, 2 Estadística, 3 Tabla
       i 4 Verificar;
     · Tabla (p. 21): f(x)= i g(x)= (un tipus de pantalla de la fx-82SP CW,
       «definicio»), el rang (Inic., Final, Paso: tipus propi «x2-rang») i
       la taula de valors (tipus propi «x2-taula»).
   Font: «fx-82SP X II / fx-85SP X II / fx-350SP X II Guía del usuario»
   (CASIO, RJA537073-001V01) i la foto de producte de la fx-82SP X II
   Iberia. El que el manual no dibuixa és a VERIFICAR.md.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

/** Els menús numerats (id → [[clau, text], …]); el número forma part del text, com a la pantalla. */
const MENUS = Object.freeze({
  /** CONFIG (SHIFT MENU), primera pàgina (manual, p. 4: n'hi ha més, ▼). */
  'x2-config': [['entrada-sortida', '1:Entrada/Salida'], ['unitat-angular', '2:Unidad angular'],
    ['format-numero', '3:Formato número'], ['result-fraccio', '4:Result fracción']],
  'x2-es': [['mat-mat', '1:E Mat/S Mat'], ['mat-decimal', '2:E Mat/S Decimal'], ['linia-linia', '3:E Línea/S Línea'], ['linia-decimal', '4:E Línea/S Decim']],
  'x2-unitat': [['D', '1:Grado sexag (D)'], ['R', '2:Radián'], ['G', '3:Grado cent (G)']],
  'x2-format': [['fix', '1:Fijar decimales'], ['sci', '2:Not científica'], ['normal', '3:Normal']],
  'x2-normal': [['normal1', '1:Normal 1'], ['normal2', '2:Normal 2']],
  /** OPTN a Calcular. */
  'x2-optn': [['hiperbolica', '1:F. Hiperbólicas'], ['unitat-angular', '2:Unidad angular']],
  /** OPTN > Unidad angular: la unitat d'un sol angle. */
  'x2-unitats': [['graus', '1:°'], ['radians', '2:r'], ['gradians', '3:g']],
  /** OPTN a Verificar: els signes, en dues columnes. */
  'x2-verif': [['igual', '1:='], ['diferent', '2:≠'], ['major', '3:>'], ['menor', '4:<'], ['major-igual', '5:≥'], ['menor-igual', '6:≤']],
});
/** Les traduccions (manual en català; els textos que no hi surten, deduïts dels de la fx-82SP CW: VERIFICAR.md). */
const CATALA = Object.freeze({
  '1:Entrada/Salida': '1:Entrada/Sortida', '2:Unidad angular': '2:Unitat angular', '3:Formato número': '3:Format nombre',
  '4:Result fracción': '4:Result fracció',
  '1:E Mat/S Mat': '1:E Mat/S Mat', '2:E Mat/S Decimal': '2:E Mat/S Decimal', '3:E Línea/S Línea': '3:E Línia/S Línia', '4:E Línea/S Decim': '4:E Línia/S Decim',
  '1:Grado sexag (D)': '1:Graus sexag (D)', '2:Radián': '2:Radian', '3:Grado cent (G)': '3:Grau centesimal',
  '1:Fijar decimales': '1:Fixar decimals', '2:Not científica': '2:Not científica', '3:Normal': '3:Normal', '1:Normal 1': '1:Normal 1', '2:Normal 2': '2:Normal 2',
  '1:F. Hiperbólicas': '1:F Hiperbòliques',
  'Rango tabla': 'Rang taula', 'Inic.': 'Inici', 'Final': 'Fi', 'Paso': 'Pas',   // manual en català, p. 21
  '1:°': '1:°', '2:r': '2:r', '3:g': '3:g',
  '1:=': '1:=', '2:≠': '2:≠', '3:>': '3:>', '4:<': '4:<', '5:≥': '5:≥', '6:≤': '6:≤',
  'Verdadero': 'Verdader', 'Falso': 'Fals',   // a la calculadora en català de la fx-82SP CW hi ha «Vardader»; aquí, el manual diu «Verdader»
  'Calcular': 'Calcular', 'Estadística': 'Estadística', 'Tabla': 'Taula', 'Verificar': 'Verificar',
});

/** Les aplicacions de MENU (manual, p. 5). La icona és només orientativa. */
const APPS = Object.freeze([
  {n: '1', t: 'Calcular', i: '×÷<br>+−'}, {n: '2', t: 'Estadística', i: '▁▃▆'}, {n: '3', t: 'Tabla', i: '▤▤'}, {n: '4', t: 'Verificar', i: '⚖'},
]);
/** Els valors per defecte del rang de la taula (manual, p. 21): Inic. 1, Final 5, Paso 1. */
const RANG = Object.freeze(['1', '5', '1']);
const XIFRA = Object.freeze({0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', punt: '.', neg: '-'});
/** El text curt d'una cel·la de la taula: com a molt 6 xifres significatives (el valor sencer surt a baix: VERIFICAR.md). */
function curt(v) {
  const n = Number(v);
  if (!/^-?[\d.]+$/.test(String(v)) || !isFinite(n)) return String(v);
  return String(Number(n.toPrecision(6)));
}

/** CONFIG: la primera pàgina; té més pàgines (la barra de desplaçament de la dreta ho diu). */
const config = G => Object.freeze(Object.assign({}, G.deMenus('x2-config', 0), {desplacable: true}));
/** Els signes de Verificar: una graella de dues columnes. */
const signes = G => Object.freeze(Object.assign({}, G.deMenus('x2-verif', 0), {columnes: 2}));
/** MENU: la pantalla de les aplicacions (pàgina de la que està triada). */
const apps = (sel = 0) => Object.freeze({tipus: 'x2-apps', sel, marca: null});
/** Mode Verificar: a la fx-82SP CW era l'indicador ✔ (verif); aquí és l'aplicació Verificar (la barra no el dibuixa: estil.css). */
const enVerificar = estat => Boolean(estat.ind && estat.ind.verif);

M.variant = Object.freeze({
  /** Tecles que escriuen alguna cosa i que la fx-82SP CW no té (s'afegeixen a les de la CW). */
  escriu: Object.freeze({neg: '-', ln: '\\ln(', inv: '^{-1}'}),
  /** El que escriu cada tecla després de SHIFT (foto: les funcions grogues). */
  escriuShift: Object.freeze({exp: '\\pi ', neg: '\\log(', x2: '^{3}', entre: '\\mathrm{C}', per: '\\mathrm{P}', inv: '!',
    sen: '\\mathrm{Arcsen}(', cos: '\\mathrm{Arccos}(', tan: '\\mathrm{Arctan}('}),
  /** El que escriu cada tecla després d'ALPHA (foto: les funcions roses). */
  escriuAlpha: Object.freeze({exp: 'e', ans: '\\mathrm{PreAns}', neg: 'A', grau: 'B', inv: 'C', sen: 'D', cos: 'E', tan: 'F'}),
  /** SHIFT x■ = ■√□ (arrel d'índex n: primer l'índex, → i el radicand). */
  plantillesShift: Object.freeze({pot: 'arreln'}),
  menusNumerats: true,
  menus: MENUS,
  catala: CATALA,
  /** Les tecles que obren un menú des de la pantalla de càlcul. */
  obreMenu(id, shift, G, estat) {
    if (id === 'menu') return shift ? config(G) : apps(enVerificar(estat) ? 3 : 0);
    if (id === 'optn' && !shift) return enVerificar(estat) ? signes(G) : G.deMenus('x2-optn', 0);
    return undefined;
  },
  /** Què fa cada número en aquests menús (en triar, la calculadora tanca el menú i torna a calcular). */
  enTriar: (G, E) => ({
    'x2-config': {'entrada-sortida': () => G.deMenus('x2-es', 0), 'unitat-angular': () => G.deMenus('x2-unitat', 0),
      'format-numero': () => G.deMenus('x2-format', 0)},
    'x2-es': {'mat-mat': e => E.canvia(e, {mat: true}, {hist: false}), 'mat-decimal': e => E.canvia(e, {mat: true}, {hist: false})},
    'x2-unitat': {D: e => E.canviaUnitat(e, 'D'), R: e => E.canviaUnitat(e, 'R'), G: e => E.canviaUnitat(e, 'G')},
    'x2-format': {normal: () => G.deMenus('x2-normal', 0)},
    'x2-normal': {normal1: e => E.canvia(e, {fix: undefined, sci: undefined}), normal2: e => E.canvia(e, {fix: undefined, sci: undefined})},
    'x2-optn': {'unitat-angular': () => G.deMenus('x2-unitats', 0)},
    'x2-unitats': {graus: e => E.escriuDelMenu(e, '^{\\circ}'), radians: e => E.escriuDelMenu(e, '^{\\mathrm{r}}')},
    'x2-verif': {igual: e => E.escriuDelMenu(e, '='), diferent: e => E.escriuDelMenu(e, '\\neq '), major: e => E.escriuDelMenu(e, '>'),
      menor: e => E.escriuDelMenu(e, '<'), 'major-igual': e => E.escriuDelMenu(e, '\\geq '), 'menor-igual': e => E.escriuDelMenu(e, '\\leq ')},
  }),
  /**
   * Les tecles que aquesta calculadora fa a la seva manera (abans que el simulador de la fx-82SP CW):
   *   · a MENU: 1 = Calcular, 3 = Tabla (f(x)=), 4 = Verificar (en canviar d'aplicació, l'historial s'esborra);
   *   · a Tabla: = a f(x) passa a g(x); = a g(x), al rang; al rang, les xifres escriuen el valor de la fila triada i
   *     = el desa i baixa (a l'última, la taula: la dona la fitxa); a la taula, ↑ ↓ ← → mouen la cel·la triada i AC
   *     torna a f(x).
   */
  tecla(id, {shift, alpha}, estat, E) {
    const p = estat.pantalla, G = M.guions;
    if (p.tipus === 'x2-apps') {
      if (id === '1') return E.canvia(estat, {verif: undefined}, {hist: false});
      if (id === '4') return E.canvia(estat, {verif: true}, {hist: false});
      if (id === '3') {
        estat.taula = estat.taula || {f: '', g: '', rang: RANG.slice()};
        estat.ed = E.editorBuit();
        return G.definicio('f', E.tex(estat.ed, true));
      }
      return null;
    }
    if (p.tipus === 'definicio' && id === 'exe' && !shift) {
      const text = estat.ed ? E.tex(estat.ed, false) : (p.entrada || '');
      estat.taula = estat.taula || {f: '', g: '', rang: RANG.slice()};
      estat.taula[p.nom] = text;
      if (p.nom === 'f') {
        estat.ed = estat.taula.g ? null : E.editorBuit();
        return G.definicio('g', estat.taula.g || (estat.ed ? E.tex(estat.ed, true) : ''), !estat.taula.g);
      }
      estat.ed = null;
      return rang(estat.taula.rang, 0, null);
    }
    if (p.tipus === 'definicio' && !estat.ed) return null;   // una funció ja escrita (tornant de la taula): no se sap on és el cursor
    if (p.tipus === 'x2-rang') {
      const t = estat.taula;
      if (XIFRA[id] !== undefined && !shift && !alpha) return rang(t.rang, p.sel, (p.escrivint || '') + XIFRA[id]);
      if (id === 'del') return rang(t.rang, p.sel, (p.escrivint || '').slice(0, -1));
      if (id === 'exe') {
        if (p.escrivint) t.rang[p.sel] = p.escrivint;
        return p.sel < 2 ? rang(t.rang, p.sel + 1, null) : null;   // l'última: la taula (la dona la fitxa)
      }
      if (id === 'down' || id === 'up') return rang(t.rang, Math.max(0, Math.min(2, p.sel + (id === 'down' ? 1 : -1))), null);
      return null;
    }
    if (p.tipus === 'x2-taula') {
      const n = p.files.length, c = p.files[0].length;
      const mou = {down: [1, 0], up: [-1, 0], right: [0, 1], left: [0, -1]}[id];
      if (mou) return Object.freeze(Object.assign({}, p, {fila: Math.max(0, Math.min(n - 1, p.fila + mou[0])), col: Math.max(0, Math.min(c - 1, p.col + mou[1])), marca: null}));
      if (id === 'ac') { estat.ed = null; return G.definicio('f', (estat.taula && estat.taula.f) || '', false); }
      return null;
    }
    return undefined;
  },
  /** Els tipus de pantalla propis: les aplicacions de MENU, el rang i la taula de Tabla. */
  pantalles: ({escapa, tr, texLcd}) => ({
    'x2-apps': estat => {
      const sel = estat.sel || 0;
      const cel = (a, k) => `<div class="x2-app${k === sel ? ' sel' : ''}"><span class="i">${a.i}</span><span class="n">${a.n}</span></div>`;
      return `<div class="x2-apps x2-apps-4">${APPS.map(cel).join('')}</div>`
        + `<div class="x2-app-nom">${escapa(APPS[sel].n + ':' + tr(APPS[sel].t))}</div>`;
    },
    'x2-rang': estat => {
      const noms = ['Inic.', 'Final', 'Paso'];
      const fila = (k) => {
        const v = k === estat.sel && estat.escrivint !== null && estat.escrivint !== undefined ? estat.escrivint : estat.valors[k];
        return `<div class="x2-rang-fila${k === estat.sel ? ' sel' : ''}"><span>${escapa(tr(noms[k]))}:</span><span>${escapa(v)}</span></div>`;
      };
      return `<div class="x2-rang"><div class="x2-rang-titol">${escapa(tr('Rango tabla'))}</div>${[0, 1, 2].map(fila).join('')}</div>`;
    },
    'x2-taula': estat => {
      const files = estat.files, n = files.length, VIS = 4;
      const de = Math.max(0, Math.min(estat.fila - VIS + 1 > 0 ? estat.fila - VIS + 1 : 0, n - VIS));
      const cap = `<tr><th></th>${estat.cols.map(c => `<th>${texLcd(c)}</th>`).join('')}</tr>`;
      const cos = files.slice(de, de + VIS).map((f, j) => {
        const i = de + j;
        return `<tr><td class="n">${i + 1}</td>${f.map((v, k) => `<td class="${i === estat.fila && k === estat.col ? 'sel' : ''}">${escapa(curt(v))}</td>`).join('')}</tr>`;
      }).join('');
      const valor = files[estat.fila][estat.col];
      return `<table class="x2-taula">${cap}${cos}</table><div class="x2-taula-valor${estat.marca === 'valor' ? ' marcat' : ''}">${escapa(valor)}</div>`;
    },
  }),
});

/** El rang de la taula: valors [Inic., Final, Paso], la fila triada i el que s'hi està escrivint (null: res). */
function rang(valors, sel, escrivint) {
  return Object.freeze({tipus: 'x2-rang', valors: Object.freeze(valors.slice()), sel, escrivint, marca: null});
}

/** Les pantalles pròpies que fan servir les fitxes d'aquesta calculadora (M.guions ja s'ha carregat quan es criden). */
M.x2 = Object.freeze({
  config: () => config(M.guions),
  menu: id => M.guions.deMenus(id, 0),
  signes: () => signes(M.guions),
  apps,
  /** Tabla: el rang (valors [Inic., Final, Paso], fila triada, el que s'hi escriu) i la taula. */
  rang: (valors, sel = 0, escrivint = null) => rang(valors, sel, escrivint),
  /** files: [[x, f(x), g(x)], …] en text (el valor sencer; la cel·la el mostra curt); fila i col: la cel·la triada. */
  taula: (files, fila = 0, col = 0, ambG = true) => Object.freeze({tipus: 'x2-taula', cols: ambG ? ['x', 'f(x)', 'g(x)'] : ['x', 'f(x)'],
    files: Object.freeze(files.map(f => Object.freeze(f.slice()))), fila, col, marca: null}),
});

})(Models.obre());
