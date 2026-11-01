/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/simulador.js — La pantalla de la fx-82MS després de CADA tecla
   ───────────────────────────────────────────────────────────────────
   Com el de la CW: les fitxes només donen la pantalla del final de cada
   pas, i el simulador fa les del mig, tecla a tecla. Si un pas només
   escriu, el que s'escriu ha de ser el que diu la fitxa (es detecta una
   tecla de més o de menys), i la pantalla final és la simulada (amb el
   cursor i, a baix, el resultat d'abans, com a la calculadora).

   L'editor és lineal (S-V.P.A.M.): l'expressió és una llista de
   testimonis (el que escriu cada tecla: '7', 'sin ', '┘', 'Ans'…) i un
   cursor. Per defecte, escriure sobreescriu el testimoni del cursor; amb
   SHIFT DEL (INS), s'insereix. Després d'un resultat, una operació
   (+ − × ÷ ^ x² x³ x⁻¹ nCr…) continua amb Ans; una altra tecla en comença
   una de nova; ◀ i ▶ tornen a l'expressió per editar-la.
   MODE: COMP SD REG → Deg Rad Gra → Fix Sci Norm → Disp (i torna a
   començar); un número tria l'opció. SHIFT Ans (DRG▸) posa °, r o g.
   El que no sap fer (=, les conversions d'a b/c, SD, REG…) torna null:
   la fitxa ha de donar aquella pantalla (al final del pas, o a «parcials»).

   Depèn de M.guions (guions.js). Omple M.simulador: pantalles(fitxa),
   testimonis(text) (també el fa servir calcul.js, a les proves).
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

const G = M.guions;

/** El que escriu cada tecla (i amb SHIFT o ALPHA al davant). */
const ESCRIU = Object.freeze({
  0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', punt: '.',
  mes: '+', menys: '-', per: '×', entre: '÷', lpar: '(', rpar: ')', neg: '-', coma: ',',
  abc: '┘', x2: '²', x3: '³', inv: '⁻¹', pot: '^', arrel: '√', ncr: 'C',
  sin: 'sin ', cos: 'cos ', tan: 'tan ', log: 'log ', ln: 'ln ', ans: 'Ans',
});
const ESCRIU_SHIFT = Object.freeze({
  x3: '³√', pot: 'ˣ√', sin: 'sin⁻¹ ', cos: 'cos⁻¹ ', tan: 'tan⁻¹ ', log: '10^', ln: 'e^', exp: 'π', inv: '!', ncr: 'P',
});
const ESCRIU_ALPHA = Object.freeze({ln: 'e'});
/** Després d'un resultat, aquestes tecles continuen amb Ans (manual, «Cálculos consecutivos»). */
const CONTINUA = new Set(['mes', 'menys', 'per', 'entre', 'pot', 'x2', 'x3', 'inv', 'ncr']);
const CONTINUA_SHIFT = new Set(['pot', 'inv', 'ncr']);   // ˣ√, x!, nPr

/** Els testimonis d'un text, del més llarg al més curt (per tornar a editar una expressió escrita). */
const TOTS = [...new Set(Object.values(ESCRIU).concat(Object.values(ESCRIU_SHIFT), Object.values(ESCRIU_ALPHA), ['°', 'r', 'g']))]
  .filter(t => t !== '10^' && t !== 'e^')                    // 10^ i e^ es llegeixen com a «1», «0», «^» i «e», «^»
  .sort((a, b) => b.length - a.length);
function testimonis(text) {
  const t = String(text || ''), out = [];
  let i = 0;
  while (i < t.length) {
    const tros = TOTS.find(x => t.startsWith(x, i)) || t[i];
    out.push(tros);
    i += tros.length;
  }
  return out;
}

const DIGITS = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

function indActuals(estat) {
  const ind = Object.assign({}, estat.ind);
  if (estat.shift) ind.shift = true;
  if (estat.alpha) ind.alpha = true;
  if (estat.hist) ind.hist = true;
  return ind;
}
function pantallaCalc(estat) {
  return G.calc(indActuals(estat), estat.toks.join(''), '', {cursor: estat.cur >= estat.toks.length ? true : estat.cur, previ: estat.previ});
}
function buida(estat) {
  estat.toks = []; estat.cur = 0; estat.resultat = false; estat.previ = '';
  return pantallaCalc(estat);
}

/** Tria una opció d'una pantalla d'opcions (k = 1, 2, 3…). Torna la pantalla nova o null. */
function tria(estat, p, k) {
  if (k < 1 || k > p.titols.length) return null;
  switch (p.id) {
    case 'mode-1': return k === 1 ? buida(estat) : null;                      // COMP (SD i REG: encara no)
    case 'mode-2': estat.ind.ang = ['D', 'R', 'G'][k - 1]; return buida(estat);
    case 'mode-3': estat.pendent = ['fix', 'sci', 'norm'][k - 1]; return G.pregunta(['Fix 0~9?', 'Sci 0~9?', 'Norm 1~2?'][k - 1], estat.ind);
    case 'mode-4': return G.opcions('disp', estat.ind);
    case 'disp': estat.ind.disp = k === 2 ? 'dc' : undefined; if (!estat.ind.disp) delete estat.ind.disp; return buida(estat);
    case 'drg': escriu(estat, ['°', 'r', 'g'][k - 1]); return pantallaCalc(estat);
    default: return null;
  }
}

function escriu(estat, tok) {
  if (estat.cur < estat.toks.length && !estat.insereix) estat.toks[estat.cur] = tok;
  else estat.toks.splice(estat.cur, 0, tok);
  estat.cur++;
}

/** Prem una tecla. Torna la pantalla nova o null (el simulador no ho sap). */
function tecla(estat, id) {
  const shift = estat.shift, alpha = estat.alpha;
  estat.shift = estat.alpha = false;
  const p = estat.pantalla;

  if (p.tipus === 'opcions') {
    if (id === 'mode' && /^mode-\d$/.test(p.id)) return G.mode(Number(p.id.slice(5)) % 4 + 1, estat.ind);
    if (id === 'ac') return pantallaCalc(estat);
    if (DIGITS.has(id)) return tria(estat, p, Number(id));
    return null;
  }
  if (p.tipus === 'pregunta') {
    if (id === 'ac') { estat.pendent = null; return pantallaCalc(estat); }
    if (!DIGITS.has(id)) return null;
    const n = Number(id);
    if (estat.pendent === 'fix') { estat.ind.fix = n; delete estat.ind.sci; }
    else if (estat.pendent === 'sci') { estat.ind.sci = n; delete estat.ind.fix; }
    else if (estat.pendent === 'norm' && (n === 1 || n === 2)) { delete estat.ind.fix; delete estat.ind.sci; if (n === 2) estat.ind.norm = 2; else delete estat.ind.norm; }
    else return null;
    estat.pendent = null;
    return buida(estat);
  }
  if (p.tipus !== 'calc') return null;

  if (id === 'shift' || id === 'alpha') {
    estat.shift = id === 'shift' && !shift;
    estat.alpha = id === 'alpha' && !alpha;
    return pantallaCalc(estat);
  }
  if (id === 'mode') return shift ? null : G.mode(1, estat.ind);   // SHIFT MODE (CLR): encara no
  if (id === 'ac') return shift ? null : buida(estat);
  if (id === 'igual') return null;                                  // el resultat el dona la fitxa
  if (id === 'ans' && shift) return G.drg(estat.ind);
  if (id === 'abc' && estat.resultat) return null;                  // conversions (fracció ↔ decimal, d/c): les dona la fitxa
  if (id === 'del') {
    if (shift) { estat.insereix = !estat.insereix; return pantallaCalc(estat); }
    if (estat.resultat) return null;
    if (estat.cur < estat.toks.length) estat.toks.splice(estat.cur, 1);
    else if (estat.cur > 0) { estat.toks.pop(); estat.cur--; }
    return pantallaCalc(estat);
  }
  if (id === 'left' || id === 'right') {
    if (estat.resultat) {                                           // repetició: torna a l'expressió d'abans
      estat.resultat = false;
      estat.cur = id === 'left' ? estat.toks.length : 0;
      return pantallaCalc(estat);
    }
    estat.cur = Math.max(0, Math.min(estat.toks.length, estat.cur + (id === 'left' ? -1 : 1)));
    return pantallaCalc(estat);
  }
  const tok = (shift ? ESCRIU_SHIFT : alpha ? ESCRIU_ALPHA : ESCRIU)[id];
  if (tok === undefined) return null;
  if (estat.resultat) {
    const continua = shift ? CONTINUA_SHIFT.has(id) : (!alpha && CONTINUA.has(id));
    estat.toks = continua ? ['Ans'] : [];
    estat.cur = estat.toks.length;
    estat.resultat = false;
    estat.insereix = false;
  }
  escriu(estat, tok);
  return pantallaCalc(estat);
}

/* ── Una fitxa sencera ─────────────────────────────────────────────── */

/** Posa l'estat d'acord amb una pantalla donada per la fitxa (final de pas o inici). */
function adopta(estat, p, toksSimulats) {
  estat.pantalla = p;
  const ind = Object.assign({}, p.ind || {});
  estat.shift = Boolean(ind.shift);
  estat.alpha = Boolean(ind.alpha);
  delete ind.shift; delete ind.alpha;
  if (p.tipus !== 'calc') { estat.ind = ind; return; }
  estat.hist = Boolean(ind.hist);
  delete ind.hist;
  estat.ind = ind;
  estat.resultat = Boolean(p.resultat);
  if (p.resultat) estat.previ = p.resultat;
  estat.toks = toksSimulats && toksSimulats.join('') === p.entrada ? toksSimulats : testimonis(p.entrada);
  estat.cur = p.cursor === true || p.cursor === false || p.cursor === undefined ? estat.toks.length : p.cursor;
  if (!p.entrada && !p.resultat) estat.previ = p.previ || '';
}

function pantalles(fitxa) {
  const errors = [];
  const estat = {pantalla: null, toks: [], cur: 0, resultat: false, ind: {}, hist: false, shift: false, alpha: false,
    previ: '', insereix: false, pendent: null};
  adopta(estat, fitxa.inici, null);
  const totes = fitxa.passos.map((pas, i) => {
    const llista = [];
    let nomesEscriu = estat.pantalla.tipus === 'calc';
    pas.tecles.forEach((id, j) => {
      const darrera = j === pas.tecles.length - 1;
      const explicita = pas.parcials && pas.parcials[j];
      const abans = estat.toks.join('');
      const simulada = tecla(estat, id);
      if (!simulada || simulada.tipus !== 'calc' || ['mode', 'ac'].includes(id)) nomesEscriu = false;
      if (darrera) {
        const donada = pas.pantalla;
        if (simulada && donada.tipus !== simulada.tipus) {
          errors.push(`pas ${i + 1}: després de la tecla ${id} surt una pantalla «${simulada.tipus}», però la fitxa en dona una «${donada.tipus}»`);
        } else if (simulada && donada.tipus === 'opcions' && donada.id !== simulada.id) {
          errors.push(`pas ${i + 1}: després de la tecla ${id} surt la pantalla d'opcions «${simulada.id}», però la fitxa dona «${donada.id}»`);
        }
        if (id === 'igual' && donada.tipus === 'calc' && abans !== donada.entrada) {
          errors.push(`pas ${i + 1}: abans d'= hi ha escrit «${abans}», però la pantalla diu «${donada.entrada}»`);
        }
        if (nomesEscriu && simulada && donada.tipus === 'calc' && !donada.resultat) {
          // El pas només escriu: el que s'ha escrit ha de ser el de la fitxa, i es veu la pantalla simulada
          if (simulada.entrada !== donada.entrada) {
            errors.push(`pas ${i + 1}: amb aquestes tecles s'escriu «${simulada.entrada}», però la pantalla diu «${donada.entrada}»`);
          } else {
            const toks = estat.toks.slice();
            llista.push(Object.freeze(Object.assign({}, simulada, {marca: donada.marca})));
            adopta(estat, donada, toks);
            estat.cur = simulada.cursor === true ? toks.length : simulada.cursor;
            estat.previ = simulada.previ;
            return;
          }
        }
        const toks = estat.toks.slice();
        llista.push(donada);
        adopta(estat, donada, toks);
        return;
      }
      let nova = simulada;
      if (explicita) { nova = explicita; nomesEscriu = false; }
      if (!nova) {
        errors.push(`pas ${i + 1}, tecla ${j + 1} (${id}): el simulador no sap com queda la pantalla; dona-la a «parcials: {${j}: …}»`);
        nova = pas.pantalla;
      }
      if (explicita) adopta(estat, nova, estat.toks.slice());
      else estat.pantalla = nova;
      llista.push(nova);
    });
    if (!pas.tecles.length) adopta(estat, pas.pantalla, estat.toks.slice());
    return llista;
  });
  return {pantalles: totes, errors};
}

M.simulador = Object.freeze({pantalles, testimonis, ESCRIU, ESCRIU_SHIFT});

})(Models.obre('fx-82ms'));
