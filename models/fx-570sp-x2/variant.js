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
       ln és una tecla; SHIFT (−) = log, SHIFT x² = x³, SHIFT ×10ˣ = π,
       SHIFT ÷ = nCr; ALPHA ×10ˣ = e, ALPHA Ans = PreAns.
     · Els menús són NUMERATS («1:Entrada/Salida»…) i es trien prement el
       número, sense OK (no hi ha tecla OK). SHIFT MENU obre CONFIG; OPTN,
       les unitats d'un angle (o, a Verificar, els signes = ≠ > <…).
     · MENU obre les aplicacions (un tipus de pantalla propi, «x2-apps»):
       1 = Calcular; la C (tecla x⁻¹) = Verificar.
     · CALC: l'expressió escrita amb x es calcula per a cada valor de x
       («x=», el valor i =).
   Font: «fx-570SP X II / fx-991SP X II Guía del usuario» (CASIO, en
   castellà i en català) i la foto de producte de la fx-570SP X II Iberia.
   Els textos dels menús que el manual no dona, i el que no s'ha pogut
   comprovar, són a VERIFICAR.md.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

/** Els menús numerats (id → [[clau, text], …]); el número forma part del text, com a la pantalla. */
const MENUS = Object.freeze({
  /** CONFIG (SHIFT MENU), primera pàgina (n'hi ha cinc: ▼). */
  'x2-config': [['entrada-sortida', '1:Entrada/Salida'], ['unitat-angular', '2:Unidad angular'],
    ['format-numero', '3:Formato número'], ['simbol-enginyeria', '4:Símb ingeniería']],
  'x2-es': [['mat-mat', '1:E Mat/S Mat'], ['mat-decimal', '2:E Mat/S Decimal'], ['linia-linia', '3:E Línea/S Línea'], ['linia-decimal', '4:E Línea/S Decim']],
  'x2-unitat': [['D', '1:Grado sexag (D)'], ['R', '2:Radián'], ['G', '3:Grado cent (G)']],
  'x2-format': [['fix', '1:Fijar decim'], ['sci', '2:Not cient'], ['normal', '3:Normal']],
  'x2-normal': [['normal1', '1:Normal 1'], ['normal2', '2:Normal 2']],
  /** OPTN a Calcular. */
  'x2-optn': [['hiperbolica', '1:Func hiperbólica'], ['unitat-angular', '2:Unidad angular'], ['enginyeria', '3:Símb ingeniería']],
  /** OPTN > Unidad angular: la unitat d'un sol angle. */
  'x2-unitats': [['graus', '1:°'], ['radians', '2:r'], ['gradians', '3:g']],
  /** OPTN a Verificar: els signes, en dues columnes. */
  'x2-verif': [['igual', '1:='], ['diferent', '2:≠'], ['major', '3:>'], ['menor', '4:<'], ['major-igual', '5:≥'], ['menor-igual', '6:≤']],
});
/** Les traduccions (manual en català; els textos que no hi surten, deduïts dels de la fx-82SP CW: VERIFICAR.md). */
const CATALA = Object.freeze({
  '1:Entrada/Salida': '1:Entrada/Sortida', '2:Unidad angular': '2:Unitat angular', '3:Formato número': '3:Format nombre',
  '4:Símb ingeniería': '4:Símb enginyeria',
  '1:E Mat/S Mat': '1:E Mat/S Mat', '2:E Mat/S Decimal': '2:E Mat/S Decimal', '3:E Línea/S Línea': '3:E Línia/S Línia', '4:E Línea/S Decim': '4:E Línia/S Decim',
  '1:Grado sexag (D)': '1:Graus sexag (D)', '2:Radián': '2:Radian', '3:Grado cent (G)': '3:Grau centesimal',
  '1:Fijar decim': '1:Fixar dec', '2:Not cient': '2:Notac Cientí', '3:Normal': '3:Normal', '1:Normal 1': '1:Normal 1', '2:Normal 2': '2:Normal 2',
  '1:Func hiperbólica': '1:Func hiperbòlica', '3:Símb ingeniería': '3:Símb enginyeria',
  '1:°': '1:°', '2:r': '2:r', '3:g': '3:g',
  '1:=': '1:=', '2:≠': '2:≠', '3:>': '3:>', '4:<': '4:<', '5:≥': '5:≥', '6:≤': '6:≤',
  'Calcular': 'Calcular', 'Complejos': 'Complexos', 'Base-N': 'Base-N', 'Matriz': 'Matriu', 'Vector': 'Vector',
  'Estadística': 'Estadística', 'Distribución': 'Distribució', 'Hoja de cálculo': 'Full de càlcul',
  'Tabla': 'Taula', 'Ecuación/Func': 'Equació/Func', 'Inecuación': 'Inequació', 'Verificar': 'Verificar',
});

/** Les aplicacions de MENU, en ordre (1…9, A, B, C); a cada pàgina n'hi ha 8. La icona és només orientativa. */
const APPS = Object.freeze([
  {n: '1', t: 'Calcular', i: '×÷<br>+−'}, {n: '2', t: 'Complejos', i: '<i>i</i>∠'}, {n: '3', t: 'Base-N', i: '2 8<br>10 16'},
  {n: '4', t: 'Matriz', i: '[▦]'}, {n: '5', t: 'Vector', i: '↗'}, {n: '6', t: 'Estadística', i: '▁▃▆'},
  {n: '7', t: 'Distribución', i: '⌒'}, {n: '8', t: 'Hoja de cálculo', i: '▦'},
  {n: '9', t: 'Tabla', i: '▤'}, {n: 'A', t: 'Ecuación/Func', i: '<i>x</i>='}, {n: 'B', t: 'Inecuación', i: '<i>x</i>&gt;'},
  {n: 'C', t: 'Verificar', i: '✓'},
]);

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
    if (id === 'menu') return shift ? config(G) : apps(enVerificar(estat) ? 11 : 0);
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
   * Les tecles que aquesta calculadora fa a la seva manera:
   *   · a MENU: 1 = Calcular; x⁻¹ (la C) = Verificar (en canviar d'aplicació, l'historial s'esborra);
   *   · CALC: escriu «x=» i espera el valor de x (a baix, el valor d'ara); = calcula l'expressió amb aquest valor
   *     (la pantalla del resultat la dona la fitxa).
   */
  tecla(id, {shift, alpha}, estat, E) {
    const p = estat.pantalla;
    if (p.tipus === 'x2-apps') {
      if (id === '1') return E.canvia(estat, {verif: undefined}, {hist: false});
      if (id === 'inv') return E.canvia(estat, {verif: true}, {hist: false});
      return null;
    }
    if (p.tipus !== 'calc') return undefined;
    if (id === 'calcula' && !shift && !alpha) {
      estat.demana = true;
      estat.ed = E.editorBuit();
      E.insereix(estat.ed, {t: 'tex', v: 'x='});
      estat.resultat = false;
      return Object.freeze(Object.assign({}, E.pantallaCalc(estat), {resultat: estat.valorX || '0'}));
    }
    if (estat.demana) {
      if (id === 'exe') {
        estat.demana = false;
        estat.valorX = E.tex(estat.ed, false).replace(/^x=/, '');
        estat.ed = null;
        return null;                                    // el resultat el dona la fitxa
      }
      if (id === 'ac') estat.demana = false;
      else estat.resultat = false;                      // s'escriu el valor nou: el d'abans desapareix
    }
    return undefined;
  },
  /** El tipus de pantalla propi: les aplicacions de MENU (8 per pàgina, la triada en negatiu, el nom a baix). */
  pantalles: ({escapa, tr}) => ({
    'x2-apps': estat => {
      const sel = estat.sel || 0, de = 8 * Math.floor(sel / 8);
      const cel = (a, k) => `<div class="x2-app${de + k === sel ? ' sel' : ''}"><span class="i">${a.i}</span><span class="n">${a.n}</span></div>`;
      return `<div class="x2-apps">${APPS.slice(de, de + 8).map(cel).join('')}</div>`
        + `<div class="x2-app-nom">${escapa(APPS[sel].n + ':' + tr(APPS[sel].t))}</div>`;
    },
  }),
});

/** Les pantalles pròpies que fan servir les fitxes d'aquesta calculadora (M.guions ja s'ha carregat quan es criden). */
M.x2 = Object.freeze({
  config: () => config(M.guions),
  menu: id => M.guions.deMenus(id, 0),
  signes: () => signes(M.guions),
  apps,
  /** CALC: «x=» i, a baix, el valor que té ara x. */
  demana: (ind, valor = '0') => M.guions.calc(ind, 'x=', valor, {cursor: true}),
});

})(Models.obre());
