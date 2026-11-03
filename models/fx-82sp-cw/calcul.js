/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/calcul.js — Comprova els resultats de les pantalles (Node)
   ───────────────────────────────────────────────────────────────────
   Els resultats de les fitxes s'escriuen a mà ('0.7071067812',
   '\\frac{19}{12}'…). Aquest mòdul torna a calcular cada pantalla de
   càlcul que té entrada i resultat i comprova que coincideixen:
     · llegeix el TeX de l'entrada (el subconjunt que escriu el
       simulador: fraccions, arrels, potències, sen/cos/tan, log, ln,
       logaritme en base a, π, Ans, PreAns, nCr, f( ) i g( ), la r de radians…);
     · CALC (fx-570/991SP X II): una pantalla «x=valor» (també a parcials)
       dona el valor de x amb què es calculen les expressions següents;
     · fa servir la unitat dels angles de la barra (D o R), el valor
       d'Ans de la pantalla anterior i les f(x), g(x) definides abans;
     · un resultat decimal ha de ser el valor arrodonit a 10 xifres
       significatives, sense zeros al final (Normal 2); amb FIX, a 2
       decimals; un resultat exacte (fracció, arrel, π) ha de valer el
       mateix; amb Verificar, «Verdadero» o «Falso» segons la igualtat.
   La prioritat és la del manual (p. 113): la potència abans que el
   signe negatiu (−2⁴ = −16) i la multiplicació sense signe abans de
   × i ÷.

   Ús: const {comprova} = require('./calcul.js');
       comprova({FITXES}) → {comprovats, errors: [text…]}
   (la crida proves.js, d'aquesta mateixa carpeta.)
   ═══════════════════════════════════════════════════════════════════ */
'use strict';

/* ── Lectura del TeX ──────────────────────────────────────────────── */

const ORDRES = [   // ordre → testimoni (les més llargues primer)
  ['\\mathrm{Arcsen}', 'asen'], ['\\mathrm{Arccos}', 'acos'], ['\\mathrm{Arctan}', 'atan'],   // SHIFT sen/cos/tan (VERIFICAR.md, fila 27)
  ['\\mathrm{sen}', 'sen'], ['\\mathrm{PreAns}', 'PreAns'], ['\\mathrm{Ans}', 'Ans'], ['\\mathrm{C}', 'C'], ['\\mathrm{r}', 'r'],
  ['\\displaystyle', null], ['\\frac', 'frac'], ['\\dfrac', 'frac'], ['\\sqrt', 'sqrt'], ['\\log_', 'logb'],
  ['\\left', null], ['\\right', null], ['\\times', '*'], ['\\div', '/'], ['\\cdot', '*'],
  ['\\cos', 'cos'], ['\\tan', 'tan'], ['\\log', 'log'], ['\\ln', 'ln'], ['\\pi', 'pi'],
];

function testimonis(tex) {
  const t = [];
  let i = 0;
  while (i < tex.length) {
    const c = tex[i];
    if (/\s/.test(c)) { i++; continue; }
    if (c === '\\') {
      const o = ORDRES.find(([nom]) => tex.startsWith(nom, i) && !/[a-zA-Z]/.test(tex[i + nom.length] || '') || (nom === '\\log_' && tex.startsWith(nom, i)));
      if (!o) throw new Error(`ordre desconeguda a «${tex.slice(i, i + 12)}»`);
      if (o[1]) t.push(o[1]);
      i += o[0].length;
      continue;
    }
    const n = /^\d+(\.\d+)?|^\.\d+/.exec(tex.slice(i));
    if (n) { t.push(Number(n[0])); i += n[0].length; continue; }
    if ('+-*/()[]{}^_=xefg'.includes(c)) { t.push(c); i++; continue; }
    throw new Error(`caràcter inesperat «${c}» a «${tex}»`);
  }
  return t;
}

/**
 * Avalua el TeX d'una entrada.
 * ctx = {graus: true si la calculadora és en D, ans, funcions: {f: tex, g: tex}, x}
 */
function avalua(tex, ctx) {
  const t = testimonis(tex);
  let k = 0;
  const mira = () => t[k];
  const pren = esperat => {
    if (esperat !== undefined && t[k] !== esperat) throw new Error(`s'esperava «${esperat}» i hi ha «${t[k]}» a «${tex}»`);
    return t[k++];
  };
  const grup = (obre = '{', tanca = '}') => { pren(obre); const v = expressio(); pren(tanca); return v; };
  const angle = v => (ctx.graus ? v * Math.PI / 180 : v);
  const COMENCA = v => typeof v === 'number' || ['(', '{', 'frac', 'sqrt', 'logb', 'sen', 'cos', 'tan', 'asen', 'acos', 'atan', 'log', 'ln', 'pi', 'Ans', 'PreAns', 'x', 'e', 'f', 'g'].includes(v);

  function primari() {
    const v = pren();
    if (typeof v === 'number') return v;
    switch (v) {
      case '(': { const r = expressio(); if (mira() === ')') pren(')'); return r; }   // a la calculadora es pot deixar obert
      case '{': { const r = expressio(); pren('}'); return r; }
      case 'frac': { const a = grup(), b = grup(); return a / b; }
      case 'sqrt': {
        if (mira() === '[') {
          const n = grup('[', ']'), a = grup();
          return (a < 0 && n % 2 === 1) ? -Math.pow(-a, 1 / n) : Math.pow(a, 1 / n);
        }
        return Math.sqrt(grup());
      }
      case 'logb': { const b = grup(); pren('('); const a = expressio(); pren(')'); return Math.log(a) / Math.log(b); }
      case 'sen': case 'cos': case 'tan': {
        pren('(');
        const r = {fn: v, radians: false};
        ctx.pila = (ctx.pila || []).concat(r);
        const a = expressio();
        ctx.pila.pop();
        if (mira() === ')') pren(')');
        const arg = r.radians ? a : angle(a);
        return v === 'sen' ? Math.sin(arg) : v === 'cos' ? Math.cos(arg) : Math.tan(arg);
      }
      case 'asen': case 'acos': case 'atan': {   // el resultat, en la unitat de la barra (D: graus)
        pren('(');
        const a = expressio();
        if (mira() === ')') pren(')');
        const r = v === 'asen' ? Math.asin(a) : v === 'acos' ? Math.acos(a) : Math.atan(a);
        return ctx.graus ? r * 180 / Math.PI : r;
      }
      case 'log': { pren('('); const a = expressio(); if (mira() === ')') pren(')'); return Math.log10(a); }
      case 'ln': { pren('('); const a = expressio(); if (mira() === ')') pren(')'); return Math.log(a); }
      case 'pi': return Math.PI;
      case 'e': return Math.E;
      case 'Ans': return ctx.ans;
      case 'PreAns': return ctx.preans;   // l'Ans d'abans (fx-570/991SP X II)
      case 'x': return ctx.x;
      case 'f': case 'g': {
        if (!ctx.funcions[v]) throw new Error(`${v}(x) no està definida`);
        pren('(');
        const a = expressio();
        if (mira() === ')') pren(')');
        return avalua(ctx.funcions[v], Object.assign({}, ctx, {x: a, pila: []}));
      }
      default: throw new Error(`testimoni inesperat «${v}» a «${tex}»`);
    }
  }
  function potencia() {
    let b = primari();
    while (mira() === '^') {
      pren('^');
      if (t[k] === '{' && t[k + 1] === 'r' && t[k + 2] === '}') {   // la r de radians (CATALOG > Ang/Coord/Sexag)
        k += 3;
        if (ctx.pila && ctx.pila.length) ctx.pila[ctx.pila.length - 1].radians = true;
        continue;
      }
      b = Math.pow(b, grup());
    }
    return b;
  }
  function signe() {
    if (mira() === '-') { pren('-'); return -signe(); }
    if (mira() === '+') { pren('+'); return signe(); }
    return potencia();
  }
  function sensesigne() {   // multiplicació sense signe: 3x, 10(x−1)ln(x), 3π
    let v = signe();
    while (COMENCA(mira())) v *= potencia();
    return v;
  }
  function combinatori() {   // nCr: 6C4
    let v = sensesigne();
    while (mira() === 'C') {
      pren('C');
      const r = sensesigne();
      let c = 1;
      for (let j = 1; j <= r; j++) c = c * (v - r + j) / j;
      v = c;
    }
    return v;
  }
  function terme() {
    let v = combinatori();
    while (mira() === '*' || mira() === '/') v = pren() === '*' ? v * combinatori() : v / combinatori();
    return v;
  }
  function expressio() {
    let v = terme();
    while (mira() === '+' || mira() === '-') v = pren() === '+' ? v + terme() : v - terme();
    return v;
  }

  const v = expressio();
  if (k !== t.length) throw new Error(`sobra «${t.slice(k).join(' ')}» a «${tex}»`);
  return v;
}

/* ── Comparació amb el que diu la pantalla ────────────────────────── */

/** Com escriu la calculadora un decimal (Normal 2): 10 xifres significatives, sense zeros al final. */
const normal2 = v => String(Number(v.toPrecision(10)));
const iguals = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));

function comprovaPantalla(p, ctx) {
  const resultat = p.resultat.replace(/\s+/g, '');
  if (p.ind && p.ind.verif) {
    const [esq, dre] = p.entrada.split('=');
    const cert = iguals(avalua(esq, ctx), avalua(dre, ctx));
    ctx.preans = ctx.ans;
    ctx.ans = cert ? 1 : 0;   // manual, p. 66
    return (resultat === '\\text{Verdadero}') === cert ? null : `Verificar hauria de dir «${cert ? 'Verdadero' : 'Falso'}»`;
  }
  const v = avalua(p.entrada, ctx);
  ctx.preans = ctx.ans;
  ctx.ans = v;
  if (p.ind && p.ind.fix) return v.toFixed(2) === resultat ? null : `amb FIX 2 hauria de sortir ${v.toFixed(2)}`;
  // SCI 3: notació científica amb 3 xifres significatives (mantissa amb 2 decimals), com «1.67×10⁻¹»
  if (p.ind && p.ind.sci) {
    const [m, e] = v.toExponential(2).split('e');
    const esperat = `${m}\\times10^{${Number(e)}}`;
    return esperat === resultat ? null : `amb SCI 3 hauria de sortir ${esperat}`;
  }
  if (/^-?\d+\.\d+$/.test(resultat)) return normal2(v) === resultat ? null : `hauria de sortir ${normal2(v)}`;
  const mostrat = avalua(resultat, ctx);
  return iguals(v, mostrat) ? null : `val ${normal2(v)}, però la pantalla diu ${resultat} (= ${normal2(mostrat)})`;
}

/** Comprova totes les fitxes. Torna {comprovats, errors}. */
function comprova(Dades) {
  const errors = [];
  let comprovats = 0;
  for (const f of Dades.FITXES) {
    const ctx = {graus: true, ans: 0, preans: 0, funcions: Object.assign({}, f.funcions), x: 0};   // f.funcions: les de la fitxa, a l'«Ara tu»
    // CALC (fx-570/991SP X II): «x=» demana el valor de x (el resultat, si n'hi ha, és el valor d'ara); «x=-1», el valor
    // nou. També en una pantalla intermèdia (parcials), quan el valor s'escriu al mateix pas que el calcula.
    const valorX = (p, i) => {
      const demana = p && p.tipus === 'calc' && /^x=(.*)$/.exec(p.entrada || '');
      if (!demana) return false;
      try {
        if (demana[1]) ctx.x = avalua(demana[1], ctx);
        else if (p.resultat && !iguals(avalua(p.resultat, ctx), ctx.x)) errors.push(`fitxa ${f.id} · pas ${i + 1}: CALC demana x, i ara x val ${normal2(ctx.x)}, no ${p.resultat}`);
      } catch (err) { errors.push(`fitxa ${f.id} · pas ${i + 1}: no es pot llegir «${p.entrada}» (${err.message})`); }
      return true;
    };
    f.passos.forEach((pas, i) => {
      const p = pas.pantalla;
      if (p.tipus === 'definicio' && p.entrada) ctx.funcions[p.nom] = p.entrada;
      for (const k of Object.keys(pas.parcials || {}).map(Number).sort((a, b) => a - b)) valorX(pas.parcials[k], i);
      // La taula de Tabla (fx-82/85SP X II): cada f(x) i g(x) de la taula, amb les funcions escrites abans (f(x)=, g(x)=)
      if (p.tipus === 'x2-taula') {
        p.files.forEach((fila, r) => p.cols.slice(1).forEach((col, k) => {
          const nom = col[0], fn = ctx.funcions[nom], cel = fila[k + 1];
          if (!fn) { errors.push(`fitxa ${f.id} · pas ${i + 1}: la taula té ${col}, però no s'ha escrit`); return; }
          comprovats++;
          let v;
          try { v = avalua(fn, Object.assign({}, ctx, {x: Number(fila[0]), pila: []})); } catch (err) { v = NaN; }
          const esperat = isFinite(v) ? normal2(v) : 'ERROR';
          if (cel !== esperat) errors.push(`fitxa ${f.id} · pas ${i + 1}: a la taula, ${col} per a x = ${fila[0]} hauria de ser ${esperat}, no ${cel}`);
        }));
        return;
      }
      if (valorX(p, i)) return;
      if (p.tipus !== 'calc' || !p.resultat || !p.entrada || p.linia) return;
      ctx.graus = !p.ind || p.ind.ang !== 'R';
      comprovats++;
      try {
        const e = comprovaPantalla(p, ctx);
        if (e) errors.push(`fitxa ${f.id} · pas ${i + 1}: ${p.entrada} → ${e}`);
      } catch (err) {
        errors.push(`fitxa ${f.id} · pas ${i + 1}: no es pot calcular «${p.entrada}» (${err.message})`);
      }
    });
  }
  return {comprovats, errors};
}

module.exports = {comprova, avalua, normal2};
