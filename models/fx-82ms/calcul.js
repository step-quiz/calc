/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/calcul.js — Comprova els resultats de la fx-82MS (Node)
   ───────────────────────────────────────────────────────────────────
   Torna a calcular cada pantalla de càlcul amb entrada i resultat i
   comprova que el resultat és el que la calculadora mostraria:
     · llegeix l'entrada (text pla de la línia de dalt) amb els testimonis
       del simulador i la prioritat del manual (S-V.P.A.M., «Secuencia de
       prioridad de cálculos»): 1 funcions de tipus A (x² x³ x⁻¹ x! ° r g),
       2 potències i arrels (^ ˣ√), 3 fraccions (┘), 4 multiplicació
       implícita de π, e i Ans (2π), 5 funcions de tipus B (√ ³√ log ln
       sin cos tan i el signe negatiu), 6 multiplicació implícita amb
       funcions de tipus B (2√3), 7 nPr nCr, 8 × ÷, 9 + −; d'esquerra a
       dreta si tenen la mateixa prioritat. Per tant, −2^4 = −16;
     · la unitat dels angles és la dels indicadors (D, R, G); una r o un °
       darrere d'un valor el converteix (DRG▸);
     · el format: Norm 1 (per defecte: exponencial si |x| < 10⁻² o
       |x| ≥ 10¹⁰), Norm 2 (|x| < 10⁻⁹), Fix n, Sci n; 10 xifres en total,
       comptant el 0 de 0,…: cos (π÷3) en graus dona 0.999832979; una
       fracció (a┘b o a┘b┘c) ha de valer el mateix, ser irreductible i
       tenir com a molt 10 caràcters, i en ab/c (per defecte), una fracció
       més gran que 1 surt com a nombre mixt (llevat d'una conversió d/c);
     · una conversió (a b/c, d/c) deixa la mateixa entrada i no torna a
       calcular: el valor és el d'abans.

   Ús: require('./calcul.js')(M).comprova({FITXES}) → {comprovats, errors: [text…]}
   (la crida proves.js, d'aquesta mateixa carpeta.)
   ═══════════════════════════════════════════════════════════════════ */
'use strict';

module.exports = function (M) {
  const FUNCIONS_B = new Set(['√', '³√', 'log ', 'ln ', 'sin ', 'cos ', 'tan ', 'sin⁻¹ ', 'cos⁻¹ ', 'tan⁻¹ ']);
  const CONSTANTS = new Set(['π', 'e', 'Ans']);

  /** Agrupa les xifres i el punt en nombres. */
  function llegeix(text) {
    const out = [];
    for (const t of M.simulador.testimonis(text)) {
      if (/^[\d.]$/.test(t) && out.length && typeof out[out.length - 1] === 'object' && out[out.length - 1].num !== undefined && !out[out.length - 1].tancat) {
        out[out.length - 1].num += t;
      } else if (/^[\d.]$/.test(t)) {
        out.push({num: t});
      } else {
        if (out.length && typeof out[out.length - 1] === 'object') out[out.length - 1].tancat = true;
        out.push(t);
      }
    }
    return out.map(t => (typeof t === 'object' ? Number(t.num) : t));
  }

  /** Avalua una entrada. ctx = {ang: 'D' | 'R' | 'G', ans} */
  function avalua(text, ctx) {
    const t = llegeix(text);
    let k = 0;
    const mira = () => t[k];
    const pren = esperat => {
      if (esperat !== undefined && t[k] !== esperat) throw new Error(`s'esperava «${esperat}» i hi ha «${t[k]}» a «${text}»`);
      return t[k++];
    };
    const aRad = v => (ctx.ang === 'D' ? v * Math.PI / 180 : ctx.ang === 'G' ? v * Math.PI / 200 : v);
    const deRad = v => (ctx.ang === 'D' ? v * 180 / Math.PI : ctx.ang === 'G' ? v * 200 / Math.PI : v);
    const COMENCA_B = v => typeof v === 'number' || v === '(' || FUNCIONS_B.has(v) || CONSTANTS.has(v);

    function primari() {
      const v = pren();
      if (typeof v === 'number') return v;
      if (v === 'π') return Math.PI;
      if (v === 'e') return Math.E;
      if (v === 'Ans') return ctx.ans;
      if (v === '(') { const r = expressio(); if (mira() === ')') pren(')'); return r; }   // el parèntesi final es pot ometre
      throw new Error(`testimoni inesperat «${v}» a «${text}»`);
    }
    function tipusA() {
      let v = primari();
      for (;;) {
        const o = mira();
        if (o === '²') v = v * v;
        else if (o === '³') v = v * v * v;
        else if (o === '⁻¹') v = 1 / v;
        else if (o === '!') { let f = 1; for (let i = 2; i <= v; i++) f *= i; v = f; }
        else if (o === 'r') v = deRad(v);                       // DRG▸ R: el valor és en radians
        else if (o === '°') v = deRad(v * Math.PI / 180);       // DRG▸ D: el valor és en graus
        else if (o === 'g') v = deRad(v * Math.PI / 200);
        else break;
        pren();
      }
      return v;
    }
    function exponent() {   // l'exponent pot portar el signe negatiu sense parèntesis: 2^-3
      if (mira() === '-') { pren(); return -exponent(); }
      return tipusA();
    }
    function potencia() {
      let v = tipusA();
      while (mira() === '^' || mira() === 'ˣ√') {
        const o = pren(), b = exponent();
        if (o === '^') v = Math.pow(v, b);
        else v = (b < 0 && v % 2 === 1) ? -Math.pow(-b, 1 / v) : Math.pow(b, 1 / v);   // v ˣ√ b
      }
      return v;
    }
    function fraccio() {
      const a = potencia();
      if (mira() !== '┘') return a;
      pren();
      const b = potencia();
      if (mira() !== '┘') return a / b;
      pren();
      const c = potencia();
      return a + b / c;                                           // nombre mixt a┘b┘c
    }
    function implicitaPi() {   // 2π, 3Ans
      let v = fraccio();
      while (CONSTANTS.has(mira())) v *= fraccio();
      return v;
    }
    function tipusB() {
      const o = mira();
      if (o === '-') { pren(); return -tipusB(); }
      if (FUNCIONS_B.has(o)) {
        pren();
        const a = tipusB();
        switch (o) {
          case '√': return Math.sqrt(a);
          case '³√': return Math.cbrt(a);
          case 'log ': return Math.log10(a);
          case 'ln ': return Math.log(a);
          case 'sin ': return Math.sin(aRad(a));
          case 'cos ': return Math.cos(aRad(a));
          case 'tan ': return Math.tan(aRad(a));
          case 'sin⁻¹ ': return deRad(Math.asin(a));
          case 'cos⁻¹ ': return deRad(Math.acos(a));
          case 'tan⁻¹ ': return deRad(Math.atan(a));
        }
      }
      return implicitaPi();
    }
    function implicitaB() {   // 2√3
      let v = tipusB();
      while (COMENCA_B(mira())) v *= tipusB();
      return v;
    }
    function combinatori() {
      let v = implicitaB();
      while (mira() === 'C' || mira() === 'P') {
        const o = pren(), r = implicitaB();
        let c = 1;
        for (let j = 1; j <= r; j++) c = o === 'C' ? c * (v - r + j) / j : c * (v - r + j);
        v = c;
      }
      return v;
    }
    function terme() {
      let v = combinatori();
      while (mira() === '×' || mira() === '÷') v = pren() === '×' ? v * combinatori() : v / combinatori();
      return v;
    }
    function expressio() {
      let v = terme();
      while (mira() === '+' || mira() === '-') v = pren() === '+' ? v + terme() : v - terme();
      return v;
    }
    const v = expressio();
    if (k !== t.length) throw new Error(`sobra «${t.slice(k).join(' ')}» a «${text}»`);
    return v;
  }

  /* ── Com ho escriu la pantalla ─────────────────────────────────────── */

  const dosXifres = e => (e < 0 ? '-' : '') + String(Math.abs(e)).padStart(2, '0');
  /** Mantissa i exponent amb n xifres significatives (sense zeros al final si sensezeros). */
  function exponencial(v, n, sensezeros) {
    let [m, e] = v.toExponential(n - 1).split('e');
    if (sensezeros && m.includes('.')) m = m.replace(/0+$/, '').replace(/\.$/, '');
    return m + 'E' + dosXifres(Number(e));
  }
  /** El que mostra la calculadora per a un valor, segons el format (Norm 1 per defecte, Norm 2, Fix n, Sci n). */
  function format(v, ind) {
    if (ind.fix !== undefined) return v.toFixed(ind.fix);
    if (ind.sci !== undefined) return exponencial(v, ind.sci || 10, false);
    if (v === 0) return '0';
    const lim = ind.norm === 2 ? 1e-9 : 1e-2;
    if (Math.abs(v) < lim || Math.abs(v) >= 1e10) return exponencial(v, 10, true);
    // 10 xifres a la pantalla, comptant el 0 de davant dels decimals (manual: tan(−35) = −0,612800788, log 1,23 = 0,089905111)
    const enteres = Math.abs(v) < 1 ? 1 : Math.floor(Math.log10(Math.abs(v))) + 1;
    let s = v.toFixed(Math.max(0, 10 - enteres));
    if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '');
    return s === '-0' ? '0' : s;
  }
  const mcd = (a, b) => (b ? mcd(b, a % b) : a);
  const iguals = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));

  function comprovaResultat(p, v, conversio) {
    const r = p.resultat;
    if (r.includes('┘')) {
      const m = /^(-?)(\d+)┘(\d+)(?:┘(\d+))?$/.exec(r);
      if (!m) return `fracció mal escrita (${r})`;
      const signe = m[1] ? -1 : 1;
      const [w, n, d] = m[4] ? [Number(m[2]), Number(m[3]), Number(m[4])] : [0, Number(m[2]), Number(m[3])];
      if (!iguals(signe * (w + n / d), v)) return `val ${format(v, p.ind)}, però la pantalla diu ${r}`;
      if (mcd(n, d) !== 1) return `la fracció ${r} no és irreductible`;
      if (m[4] && n >= d) return `al nombre mixt ${r}, el numerador ha de ser més petit que el denominador`;
      if (r.replace('-', '').length > 10) return `${r} té més de 10 caràcters: la calculadora el donaria en decimal`;
      if (!m[4] && n > d && p.ind.disp !== 'dc' && !conversio) return `en ab/c (per defecte), ${r} surt com a nombre mixt`;
      return null;
    }
    const esperat = format(v, p.ind);
    return esperat === r ? null : `hauria de sortir ${esperat}, però la pantalla diu ${r}`;
  }

  function comprova({FITXES}) {
    const errors = [];
    let comprovats = 0;
    for (const f of FITXES) {
      const ctx = {ang: 'D', ans: 0};
      let ultim = null;                                         // {entrada, valor}: per a les conversions
      f.passos.forEach((pas, i) => {
        const p = pas.pantalla;
        if (p.tipus !== 'calc' || !p.resultat || !p.entrada) { if (p.tipus === 'calc' && p.entrada !== (ultim && ultim.entrada)) ultim = null; return; }
        ctx.ang = (p.ind && p.ind.ang) || 'D';
        comprovats++;
        try {
          const conversio = Boolean(ultim && ultim.entrada === p.entrada);
          const v = conversio ? ultim.valor : avalua(p.entrada, ctx);
          ctx.ans = v;
          ultim = {entrada: p.entrada, valor: v};
          const e = comprovaResultat(p, v, conversio);
          if (e) errors.push(`fitxa ${f.id} · pas ${i + 1}: ${p.entrada} → ${e}`);
        } catch (err) {
          errors.push(`fitxa ${f.id} · pas ${i + 1}: no es pot calcular «${p.entrada}» (${err.message})`);
        }
      });
    }
    return {comprovats, errors};
  }

  return {comprova, avalua, format};
};
