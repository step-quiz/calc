/* ═══════════════════════════════════════════════════════════════════
   simulador.js — La pantalla després de CADA tecla
   ───────────────────────────────────────────────────────────────────
   A les fitxes, cada pas diu quines tecles es premen i com queda la
   pantalla al final. La calculadora real, però, canvia a cada tecla
   (David, 31/10/2026). Aquest mòdul calcula les pantalles intermèdies:

     Simulador.pantalles(fitxa) → {pantalles, errors}
       pantalles[i][j] = la pantalla després de la tecla j del pas i
                         (l'última és sempre passos[i].pantalla);
       errors = llista de textos (la prova proves/comprova.js hi falla).

   Què sap fer (prou per a les fitxes, no és un emulador):
     · escriure: xifres, punt, + − × ÷, ( ), sen( cos( tan(, x, y, z,
       π, e, Ans, el signe negatiu (−); la plantilla de fracció, amb ↓ ↑ → ← per moure-s'hi;
       després d'un resultat, el que s'escriu comença un càlcul nou;
     · SHIFT (la S de la barra) i AC;
     · obrir CONFIG, CATALOG, FORMAT i VARIABLE; moure's pels menús i
       per la llista de variables; els OK que es poden deduir (llistes
       amb ◉, CONFIG > Config cálculo > Unidad angular / Formato número,
       CONFIG > Reiniciar, CATALOG > Ang/Coord/Sexag, OK sobre una variable).
   Quan no ho sap deduir, la fitxa ha de donar la pantalla al pas:
     {tecles, pantalla, text, parcials: {<índex de la tecla>: pantalla}}.

   A més, quan un pas acaba escrivint (sense menús pel mig), el TeX que
   escriu el simulador ha de ser el mateix que el de la pantalla final
   de la fitxa: així es detecta una tecla de més o de menys a les dades.

   Depèn de G (guions.js). Exporta «Simulador».
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

/* ── 1. L'EDITOR DE L'EXPRESSIÓ ──────────────────────────────────────
   L'expressió és una llista d'elements: {t:'tex', v:'…'} o
   {t:'frac', num:[…], den:[…]}. El cursor és una pila de marcs
   {llista, i, node, camp}: el de dalt de tot és on s'escriu. */

/** El TeX que escriu cada tecla (i amb SHIFT al davant). */
const ESCRIU = Object.freeze({
  0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9',
  punt: '.', mes: '+', menys: '-', per: '\\times ', entre: '\\div ', lpar: '(', rpar: ')',
  x: 'x', ans: '\\mathrm{Ans}', sen: '\\mathrm{sen}(', cos: '\\cos(', tan: '\\tan(',
});
const ESCRIU_SHIFT = Object.freeze({7: '\\pi ', 8: 'e', 0: 'x', punt: 'y', exp: 'z', menys: '-'});   // SHIFT − = signe negatiu (−)
const OPERACIONS = new Set(['mes', 'per', 'entre']);    // després d'un resultat, continuen amb Ans

function editorBuit() {
  const arrel = [];
  return {arrel, pila: [{llista: arrel, i: 0, node: null, camp: null}]};
}
const dalt = ed => ed.pila[ed.pila.length - 1];

function insereix(ed, element) {
  const m = dalt(ed);
  m.llista.splice(m.i, 0, element);
  m.i++;
}
function insereixFraccio(ed) {
  const node = {t: 'frac', num: [], den: []};
  insereix(ed, node);                                   // el marc de fora queda just després de la fracció
  ed.pila.push({llista: node.num, i: 0, node, camp: 'num'});
}
/** Mou el cursor. Torna false si la tecla no fa res que el simulador sàpiga representar. */
function mou(ed, tecla) {
  const m = dalt(ed);
  if (tecla === 'down' || tecla === 'up') {
    if (!m.node) return false;
    const camp = tecla === 'down' ? 'den' : 'num';
    if (m.camp === camp) return false;
    ed.pila[ed.pila.length - 1] = {llista: m.node[camp], i: tecla === 'down' ? 0 : m.node[camp].length, node: m.node, camp};
    return true;
  }
  if (tecla === 'right') {
    if (m.i < m.llista.length) {
      const seguent = m.llista[m.i];
      m.i++;
      if (seguent.t === 'frac') ed.pila.push({llista: seguent.num, i: 0, node: seguent, camp: 'num'});
      return true;
    }
    if (ed.pila.length > 1) { ed.pila.pop(); return true; }   // surt de la fracció
    return false;
  }
  if (tecla === 'left') {
    if (m.i > 0) { m.i--; return m.llista[m.i].t !== 'frac'; } // entrar a una fracció per la dreta: no cal
    if (ed.pila.length > 1) { ed.pila.pop(); dalt(ed).i--; return true; }
    return false;
  }
  return false;
}

/** El TeX de l'expressió; amb cursor, hi posa la barra on és. */
function tex(ed, ambCursor) {
  const marc = dalt(ed);
  const CURSOR = '\\htmlClass{cursor-tex}{\\rule[-0.12em]{0.07em}{1em}}';
  const llista = l => {
    let s = '';
    l.forEach((e, k) => {
      if (ambCursor && l === marc.llista && k === marc.i) s += CURSOR;
      s += e.t === 'frac' ? `\\frac{${buit(e.num)}}{${buit(e.den)}}` : e.v;
    });
    if (ambCursor && l === marc.llista && marc.i === l.length) s += CURSOR;
    return s;
  };
  const buit = l => (l.length || (ambCursor && l === marc.llista) ? llista(l) : '\\square');
  return llista(ed.arrel);
}
/** Per comparar TeX: sense espais. */
const net = s => String(s || '').replace(/\s+/g, '');


/* ── 2. ELS MENÚS QUE ES PODEN DEDUIR ─────────────────────────────── */

const mateixMenu = (p, textos) => p && p.tipus === 'menu' && p.files.length === textos.length && p.files.every((f, k) => f.t === textos[k]);
const FILES_VAR = [['A', 'B'], ['C', 'D'], ['E', 'F'], ['x', 'y'], ['z']];

/** La pantalla després d'OK en un menú, si es pot deduir (si no, null). */
function okAlMenu(p, estat) {
  const sel = p.sel;
  if (p.files.some(f => f.radio)) {                     // llista amb ◉: el ◉ passa a la fila triada
    return G.menu(p.files.map((f, k) => G.fila(f.t, {radio: k === sel ? 'on' : 'off'})), sel);
  }
  if (mateixMenu(p, G.CONFIG)) {
    if (sel === 0) return G.configCalcul(0);
    if (sel === 2) return G.reiniciar(0);
  }
  if (mateixMenu(p, G.CONFIG_CALCUL)) {
    const ind = estat.ind || {};
    if (sel === 1) return G.unitatAngular(Math.max(0, ['D', 'R', 'G'].indexOf(ind.ang)));
    if (sel === 2) return G.formatNumero(ind.fix ? 0 : ind.sci ? 1 : 2);
  }
  if (mateixMenu(p, G.CATALOG) && sel === 3) return G.angCoordSexag(0);
  return null;
}

function mouVariables(p, tecla) {
  let f = FILES_VAR.findIndex(r => r.includes(p.sel)), c = FILES_VAR[f].indexOf(p.sel);
  if (tecla === 'down') f = Math.min(f + 1, FILES_VAR.length - 1);
  else if (tecla === 'up') f = Math.max(f - 1, 0);
  else if (tecla === 'right') c = 1;
  else if (tecla === 'left') c = 0;
  else return null;
  c = Math.min(c, FILES_VAR[f].length - 1);
  return Object.freeze(Object.assign({}, p, {sel: FILES_VAR[f][c]}));
}


/* ── 3. UNA TECLA ─────────────────────────────────────────────────────
   estat = {pantalla, ed (editor o null si no se sap què hi ha escrit),
            resultat (hi ha un resultat a la pantalla), ind (els indicadors
            de l'última pantalla de càlcul), vars (valors de les variables),
            shift (s'acaba de prémer SHIFT)}.
   Torna la pantalla nova (i canvia l'estat), o null si no la sap deduir. */

function pantallaCalc(estat, ambCursor = true) {
  const ind = Object.assign({}, estat.ind, {shift: estat.shift || undefined, hist: estat.hist || undefined});
  return Object.freeze({tipus: 'calc', ind: Object.freeze(ind), entrada: estat.ed ? tex(estat.ed, ambCursor) : '',
    resultat: '', cursor: false, linia: false, marca: null});
}

function tecla(estat, id) {
  const p = estat.pantalla;
  const shift = estat.shift;
  estat.shift = false;

  if (id === 'shift') {
    estat.shift = true;
    return p.tipus === 'calc' ? Object.freeze(Object.assign({}, p, {ind: Object.freeze(Object.assign({}, p.ind, {shift: true})), marca: null})) : p;
  }
  if (id === 'ac') {
    estat.ed = editorBuit();
    estat.resultat = false;
    return pantallaCalc(estat);
  }

  // Menús i llistes
  if (p.tipus === 'menu') {
    if (id === 'down' || id === 'up') {
      const sel = Math.max(0, Math.min(p.files.length - 1, p.sel + (id === 'down' ? 1 : -1)));
      return Object.freeze(Object.assign({}, p, {sel, marca: null}));
    }
    if (id === 'ok') return okAlMenu(p, estat);
    return null;
  }
  if (p.tipus === 'variables') {
    if (id === 'ok') return G.menuVariable(0);
    return mouVariables(p, id);
  }
  if (p.tipus === 'home') {
    if (id === 'ok' && p.sel === 0) { estat.ed = editorBuit(); estat.resultat = false; return pantallaCalc(estat); }
    return null;
  }
  if (p.tipus !== 'calc') return null;

  // Tecles que obren un menú des de la pantalla de càlcul
  if (id === 'settings') return G.config(0);
  if (id === 'catalog') return G.catalog(0);
  if (id === 'variable') return G.variables(estat.vars, 'A');
  if (id === 'format') return estat.resultat ? G.format(0) : null;

  // Escriure
  const tros = shift ? ESCRIU_SHIFT[id] : ESCRIU[id];
  if (tros !== undefined || (id === 'frac' && !shift)) {
    if (estat.resultat || !estat.ed) {                  // després d'un resultat: càlcul nou
      if (!estat.resultat && !estat.ed) return null;    // no se sap què hi ha escrit
      estat.ed = editorBuit();
      if (OPERACIONS.has(id) && !shift) insereix(estat.ed, {t: 'tex', v: '\\mathrm{Ans}'});
      estat.resultat = false;
      estat.hist = true;
    }
    if (id === 'frac') insereixFraccio(estat.ed);
    else insereix(estat.ed, {t: 'tex', v: tros});
    return pantallaCalc(estat);
  }
  if (['down', 'up', 'left', 'right'].includes(id)) {
    if (!estat.ed || estat.resultat) return null;
    return mou(estat.ed, id) ? pantallaCalc(estat) : null;
  }
  return null;                                          // EXE, ≈, etc.: el resultat el dona la fitxa
}


/* ── 4. UNA FITXA SENCERA ─────────────────────────────────────────── */

/** Posa l'estat d'acord amb una pantalla donada per la fitxa (final de pas o inici). */
function adopta(estat, p, edSimulat) {
  estat.pantalla = p;
  estat.shift = false;
  if (p.tipus === 'variables') {
    estat.vars = Object.fromEntries(p.valors);
  }
  if (p.tipus !== 'calc') return;
  estat.ind = Object.assign({}, p.ind);
  delete estat.ind.shift;
  estat.hist = Boolean(p.ind.hist);
  delete estat.ind.hist;
  estat.resultat = Boolean(p.resultat);
  if (!p.entrada) estat.ed = editorBuit();
  else if (edSimulat && net(tex(edSimulat, false)) === net(p.entrada)) estat.ed = edSimulat;
  else estat.ed = null;                                 // no se sap com s'ha escrit
}

function pantalles(fitxa) {
  const errors = [];
  const estat = {pantalla: null, ed: null, resultat: false, ind: {}, hist: false, vars: {}, shift: false};
  adopta(estat, fitxa.inici, null);
  const totes = fitxa.passos.map((pas, i) => {
    const llista = [];
    let nomesEscriu = estat.pantalla.tipus === 'calc';  // el pas només escriu (per comparar el resultat)
    pas.tecles.forEach((id, j) => {
      const darrera = j === pas.tecles.length - 1;
      const explicita = pas.parcials && pas.parcials[j];
      let nova = tecla(estat, id);
      if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'punt', 'mes', 'menys', 'per', 'entre', 'lpar', 'rpar', 'x',
        'sen', 'cos', 'tan', 'frac', 'shift', 'ac', 'down', 'up', 'left', 'right', 'exe', 'exp'].includes(id)) nomesEscriu = false;
      if (darrera) nova = pas.pantalla;
      else if (explicita) { nova = explicita; nomesEscriu = false; }
      if (!nova) {
        errors.push(`pas ${i + 1}, tecla ${j + 1} (${id}): el simulador no sap com queda la pantalla; dona-la a «parcials: {${j}: …}»`);
        nova = pas.pantalla;
      }
      if (darrera || explicita) {
        // Abans d'adoptar la pantalla final: si el pas només ha escrit, ha de coincidir amb el que diu la fitxa
        if (darrera && nomesEscriu && nova.tipus === 'calc' && nova.entrada && estat.ed && !['exe'].includes(id)) {
          const simulat = net(tex(estat.ed, false)), donat = net(nova.entrada);
          if (simulat !== donat) errors.push(`pas ${i + 1}: amb aquestes tecles s'escriu «${tex(estat.ed, false)}», però la pantalla diu «${nova.entrada}»`);
        }
        if (darrera && id === 'exe' && estat.ed && nova.tipus === 'calc') {
          const simulat = net(tex(estat.ed, false)), donat = net(nova.entrada);
          if (simulat !== donat) errors.push(`pas ${i + 1}: abans d'EXE hi ha escrit «${tex(estat.ed, false)}», però la pantalla diu «${nova.entrada}»`);
        }
        adopta(estat, nova, estat.ed);
      } else {
        estat.pantalla = nova;
        if (nova.tipus === 'variables') estat.vars = Object.fromEntries(nova.valors);
      }
      llista.push(nova);
    });
    if (!pas.tecles.length) adopta(estat, pas.pantalla, estat.ed);
    return llista;
  });
  return {pantalles: totes, errors};
}

arrel.Simulador = Object.freeze({pantalles, net});

})(globalThis);
