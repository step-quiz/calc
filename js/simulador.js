/* ═══════════════════════════════════════════════════════════════════
   simulador.js — La pantalla després de CADA tecla
   ───────────────────────────────────────────────────────────────────
   A les fitxes, cada pas diu quines tecles es premen i com queda la
   pantalla al final. La calculadora real, però, canvia a cada tecla
   (David, 31/10/2026). Aquest mòdul calcula les pantalles intermèdies:

     Simulador.pantalles(fitxa) → {pantalles, errors}
       pantalles[i][j] = la pantalla després de la tecla j del pas i
                         (l'última és passos[i].pantalla; si el pas només
                         escriu, la mateixa però amb el cursor al seu lloc,
                         per exemple dins del denominador);
       errors = llista de textos (la prova proves/comprova.js hi falla).

   Què sap fer (prou per a les fitxes, no és un emulador):
     · escriure: xifres, punt, + − × ÷, ( ), sen( cos( tan( ln( log(, x², x, y, z,
       π, e, Ans, el signe negatiu (−); les plantilles de fracció, d'arrel
       quadrada, d'arrel d'índex n (SHIFT arrel: primer l'índex, → i el radicand),
       de logaritme en base a (logab: primer la base, → i l'argument) i d'exponent,
       amb ↓ ↑ → ← per moure-s'hi;
       després d'un resultat, el que s'escriu comença un càlcul nou;
     · SHIFT (la S de la barra) i AC;
     · obrir CONFIG, CATALOG, FORMAT i VARIABLE; moure's pels menús i
       per la llista de variables; els OK que es poden deduir (llistes
       amb ◉, CONFIG > Config cálculo > Unidad angular / Formato número,
       CONFIG > Reiniciar, CATALOG > Ang/Coord/Sexag, OK sobre una variable);
     · FUNCTION: {Definir f(x)} i {Definir g(x)} (escriure l'expressió) i {f(x)}, {g(x)} (escriuen «f(», «g(»);
     · CATALOG > Probabilidad (%, !, P, C escriuen el seu símbol); TOOLS > Verificar ON / Verificar OFF (la
       barra porta ✔ o no, i l'historial s'esborra) i, amb Verificar activat, CATALOG > Verificar (= ≠ > < ≥ ≤).
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
  x: 'x', ans: '\\mathrm{Ans}', sen: '\\mathrm{sen}(', cos: '\\cos(', tan: '\\tan(', x2: '^{2}',
});
const ESCRIU_SHIFT = Object.freeze({7: '\\pi ', 8: 'e', 0: 'x', punt: 'y', exp: 'z', menys: '-',   // SHIFT − = signe negatiu (−)
  logab: '\\ln(', x2: '\\log('});
/**
 * Les plantilles, en una sola taula: tipus de node → {camps (en ordre; el cursor entra al primer),
 * tex (el TeX a partir del de cada camp), vertical (↓ ↑ passen d'un camp a l'altre, com a la
 * fracció; si no, → ← passen al camp següent o anterior)}. Una plantilla nova només s'afegeix aquí
 * i a la tecla que l'escriu (TECLA_PLANTILLA o TECLA_PLANTILLA_SHIFT).
 */
const PLANTILLA = Object.freeze({
  frac: {camps: ['num', 'den'], vertical: true, tex: c => `\\frac{${c.num}}{${c.den}}`},
  arrel: {camps: ['rad'], tex: c => `\\sqrt{${c.rad}}`},
  arreln: {camps: ['idx', 'rad'], tex: c => `\\sqrt[${c.idx}]{${c.rad}}`},   // SHIFT arrel: primer l'índex, → i el radicand
  logab: {camps: ['base', 'arg'], tex: c => `\\log_{${c.base}}(${c.arg})`},   // primer la base, → i l'argument
  pot: {camps: ['exp'], tex: c => `^{${c.exp}}`},
});
const TECLA_PLANTILLA = Object.freeze({frac: 'frac', arrel: 'arrel', pot: 'pot', logab: 'logab'});
const TECLA_PLANTILLA_SHIFT = Object.freeze({arrel: 'arreln'});
const plantilla = (id, shift) => (shift ? TECLA_PLANTILLA_SHIFT[id] : TECLA_PLANTILLA[id]);
const CAMPS = Object.freeze(Object.fromEntries(Object.entries(PLANTILLA).map(([t, p]) => [t, p.camps])));
/** El camp de la mateixa plantilla al qual es passa amb una tecla de cursor (null: cap). */
function campVei(node, camp, tecla) {
  const p = PLANTILLA[node.t], k = p.camps.indexOf(camp);
  const endavant = p.vertical ? tecla === 'down' : tecla === 'right';
  const enrere = p.vertical ? tecla === 'up' : tecla === 'left';
  if (endavant && k < p.camps.length - 1) return p.camps[k + 1];
  if (enrere && k > 0) return p.camps[k - 1];
  return null;
}
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
/** Una plantilla (fracció, arrel, exponent): el cursor hi entra, al primer camp. */
function insereixPlantilla(ed, tipus) {
  const node = {t: tipus};
  for (const c of CAMPS[tipus]) node[c] = [];
  insereix(ed, node);                                   // el marc de fora queda just després de la plantilla
  ed.pila.push({llista: node[CAMPS[tipus][0]], i: 0, node, camp: CAMPS[tipus][0]});
}
/** Mou el cursor. Torna false si la tecla no fa res que el simulador sàpiga representar. */
function mou(ed, tecla) {
  const m = dalt(ed);
  if (tecla === 'down' || tecla === 'up') {
    const camp = m.node && PLANTILLA[m.node.t].vertical && campVei(m.node, m.camp, tecla);   // ↓ ↑ només dins d'una plantilla vertical (fracció)
    if (!camp) return false;
    ed.pila[ed.pila.length - 1] = {llista: m.node[camp], i: tecla === 'down' ? 0 : m.node[camp].length, node: m.node, camp};
    return true;
  }
  if (tecla === 'right') {
    if (m.i < m.llista.length) {
      const seguent = m.llista[m.i];
      m.i++;
      if (CAMPS[seguent.t]) { const c = CAMPS[seguent.t][0]; ed.pila.push({llista: seguent[c], i: 0, node: seguent, camp: c}); }
      return true;
    }
    const seg = m.node && !PLANTILLA[m.node.t].vertical && campVei(m.node, m.camp, 'right');   // de l'índex al radicand, de la base a l'argument
    if (seg) {
      ed.pila[ed.pila.length - 1] = {llista: m.node[seg], i: 0, node: m.node, camp: seg};
      return true;
    }
    if (ed.pila.length > 1) { ed.pila.pop(); return true; }   // surt de la plantilla
    return false;
  }
  if (tecla === 'left') {
    if (m.i > 0) { m.i--; return !CAMPS[m.llista[m.i].t]; }   // entrar a una plantilla per la dreta: no cal
    const ant = m.node && !PLANTILLA[m.node.t].vertical && campVei(m.node, m.camp, 'left');
    if (ant) {
      ed.pila[ed.pila.length - 1] = {llista: m.node[ant], i: m.node[ant].length, node: m.node, camp: ant};
      return true;
    }
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
      s += PLANTILLA[e.t] ? PLANTILLA[e.t].tex(Object.fromEntries(PLANTILLA[e.t].camps.map(c => [c, buit(e[c])]))) : e.v;
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

/**
 * Què passa en prémer OK en un menú: menú (id de G.MENUS) → clau de la fila → funció(estat) que torna
 * la pantalla nova. Va per l'id i la clau, mai pels textos ni per la posició: així, si es corregeix
 * l'ordre d'un menú o es tradueixen els textos (calculadora en català), no cal tocar res aquí.
 */
const EN_TRIAR = Object.freeze({
  config: {calcul: () => G.configCalcul(0), reiniciar: () => G.reiniciar(0)},
  'config-calcul': {
    'unitat-angular': estat => G.unitatAngular(Math.max(0, G.posicio('unitat-angular', (estat.ind || {}).ang || 'D'))),
    'format-numero': estat => G.formatNumero(G.posicio('format-numero', (estat.ind || {}).fix ? 'fix' : (estat.ind || {}).sci ? 'sci' : 'normal')),
  },
  catalog: {probabilidad: () => G.probabilidad(0), 'ang-coord-sexag': () => G.angCoordSexag(0)},
  'catalog-verificar': {verificar: () => G.verificar(0), probabilidad: () => G.probabilidad(0)},
  probabilidad: {percent: e => escriuDelMenu(e, '\\%'), factorial: e => escriuDelMenu(e, '!'),
    permutacio: e => escriuDelMenu(e, '\\mathrm{P}'), combinacio: e => escriuDelMenu(e, '\\mathrm{C}')},
  verificar: {igual: e => escriuDelMenu(e, '='), diferent: e => escriuDelMenu(e, '\\neq '), major: e => escriuDelMenu(e, '>'),
    menor: e => escriuDelMenu(e, '<'), 'major-igual': e => escriuDelMenu(e, '\\geq '), 'menor-igual': e => escriuDelMenu(e, '\\leq ')},
  tools: {'verificar-on': e => canviaVerificar(e, true)},
  'tools-verificar': {'verificar-off': e => canviaVerificar(e, false)},
  funcio: {
    f: e => escriuFuncio(e, 'f('), g: e => escriuFuncio(e, 'g('),
    'definir-f': e => definir(e, 'f'), 'definir-g': e => definir(e, 'g'),
  },
});
const FILES_VAR = [['A', 'B'], ['C', 'D'], ['E', 'F'], ['x', 'y'], ['z']];

/** La pantalla després d'OK en un menú, si es pot deduir (si no, null). */
function okAlMenu(p, estat) {
  const sel = p.sel;
  if (p.files.some(f => f.radio)) {                     // llista amb ◉: el ◉ passa a la fila triada
    return Object.freeze(Object.assign({}, p, {marca: null, files: Object.freeze(p.files.map((f, k) => G.fila(f.t, Object.assign({}, f, {radio: k === sel ? 'on' : 'off'}))))}));
  }
  const accio = p.id && EN_TRIAR[p.id] && p.files[sel] && EN_TRIAR[p.id][p.files[sel].clau];
  return accio ? accio(estat) : null;
}

/** FUNCTION > f(x) o g(x): escriu «f(» o «g(» a la pantalla de càlcul. */
function escriuFuncio(estat, tros) {
  if (estat.resultat || !estat.ed) { estat.ed = editorBuit(); estat.resultat = false; estat.hist = true; }
  insereix(estat.ed, {t: 'tex', v: tros});
  return pantallaCalc(estat);
}
/** FUNCTION > Definir f(x) o g(x): una pantalla nova, amb un editor buit. */
function definir(estat, nom) {
  estat.ed = editorBuit();
  estat.resultat = false;
  return G.definicio(nom, tex(estat.ed, true));
}

/** Activar o desactivar Verificar: la barra porta ✔ (o no) i l'historial s'esborra (manual, p. 63-64). */
function canviaVerificar(estat, actiu) {
  const ind = Object.assign({}, estat.ind);
  if (actiu) ind.verif = true; else delete ind.verif;
  estat.ind = ind;
  estat.ed = editorBuit();
  estat.resultat = false;
  estat.hist = false;
  return pantallaCalc(estat);
}

/** Escriu un símbol triat en un menú a l'expressió i torna a la pantalla de càlcul (null si no se sap què hi havia escrit). */
function escriuDelMenu(estat, tros) {
  if (!estat.ed) return null;
  if (estat.resultat) { estat.ed = editorBuit(); estat.resultat = false; estat.hist = true; }
  insereix(estat.ed, {t: 'tex', v: tros});
  return pantallaCalc(estat);
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
    if (['down', 'up'].includes(id) || (p.columnes && ['left', 'right'].includes(id))) {
      // Llista: ↓ ↑ d'una en una. Graella (p.columnes, els símbols de Verificar): ↓ ↑ canvien de fila, → ← de columna
      const pas = {down: p.columnes || 1, up: -(p.columnes || 1), right: 1, left: -1}[id];
      const sel = Math.max(0, Math.min(p.files.length - 1, p.sel + pas));
      return Object.freeze(Object.assign({}, p, {sel, marca: null}));
    }
    if (id === 'ok') return okAlMenu(p, estat);
    return null;
  }
  if (p.tipus === 'definicio') {                        // escriure l'expressió de f(x)
    const tros = shift ? ESCRIU_SHIFT[id] : ESCRIU[id];
    const pl = plantilla(id, shift);
    if (pl) insereixPlantilla(estat.ed, pl);
    else if (tros !== undefined) insereix(estat.ed, {t: 'tex', v: tros});
    else if (!(['down', 'up', 'left', 'right'].includes(id) && mou(estat.ed, id))) return null;
    return G.definicio(p.nom, tex(estat.ed, true));
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
  if (id === 'catalog') return estat.ind && estat.ind.verif ? G.catalogVerificar(0) : G.catalog(0);
  if (id === 'tools') return estat.ind && estat.ind.verif ? G.toolsVerificar(0) : G.tools(0);
  if (id === 'variable') return G.variables(estat.vars, 'A');
  if (id === 'format') return estat.resultat ? G.format(0) : null;
  if (id === 'funcio') return G.menuFuncio(0);

  // Escriure
  const tros = shift ? ESCRIU_SHIFT[id] : ESCRIU[id];
  const pl = plantilla(id, shift);
  if (tros !== undefined || pl) {
    if (estat.resultat || !estat.ed) {                  // després d'un resultat: càlcul nou
      if (!estat.resultat && !estat.ed) return null;    // no se sap què hi ha escrit
      estat.ed = editorBuit();
      if (OPERACIONS.has(id) && !shift) insereix(estat.ed, {t: 'tex', v: '\\mathrm{Ans}'});
      estat.resultat = false;
      estat.hist = true;
    }
    if (pl) insereixPlantilla(estat.ed, pl);
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
    let nomesEscriu = ['calc', 'definicio'].includes(estat.pantalla.tipus);  // el pas només escriu (per comparar el resultat)
    pas.tecles.forEach((id, j) => {
      const darrera = j === pas.tecles.length - 1;
      const explicita = pas.parcials && pas.parcials[j];
      let nova = tecla(estat, id);
      if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'punt', 'mes', 'menys', 'per', 'entre', 'lpar', 'rpar', 'x',
        'sen', 'cos', 'tan', 'frac', 'arrel', 'pot', 'x2', 'logab', 'ans', 'shift', 'ac', 'down', 'up', 'left', 'right', 'exe', 'exp'].includes(id)) nomesEscriu = false;
      if (darrera) nova = pas.pantalla;
      else if (explicita) { nova = explicita; nomesEscriu = false; }
      if (!nova) {
        errors.push(`pas ${i + 1}, tecla ${j + 1} (${id}): el simulador no sap com queda la pantalla; dona-la a «parcials: {${j}: …}»`);
        nova = pas.pantalla;
      }
      if (darrera || explicita) {
        // Abans d'adoptar la pantalla final: si el pas només ha escrit, ha de coincidir amb el que diu la fitxa
        if (darrera && nomesEscriu && ['calc', 'definicio'].includes(nova.tipus) && nova.entrada && estat.ed && !['exe'].includes(id)) {
          const simulat = net(tex(estat.ed, false)), donat = net(nova.entrada);
          if (simulat !== donat) errors.push(`pas ${i + 1}: amb aquestes tecles s'escriu «${tex(estat.ed, false)}», però la pantalla diu «${nova.entrada}»`);
          else if (!nova.resultat) {
            // La pantalla final, amb el cursor on és de debò (dins de la plantilla, si no se n'ha sortit), com a la calculadora
            const ambCursor = Object.freeze(Object.assign({}, nova, {entrada: tex(estat.ed, true), cursor: false}));
            llista.push(ambCursor);
            adopta(estat, nova, estat.ed);
            return;
          }
        }
        if (darrera && id === 'exe' && estat.ed && nova.tipus === 'calc' && estat.pantalla.tipus === 'calc') {   // (des de Definir f(x), EXE torna a una pantalla buida)
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
