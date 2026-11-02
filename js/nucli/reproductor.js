/* ═══════════════════════════════════════════════════════════════════
   nucli/reproductor.js — El reproductor pas a pas d'una fitxa
   ───────────────────────────────────────────────────────────────────
   Una fitxa és una pantalla de partida (inici) i una llista de passos
   {tecles, pantalla, text}. El reproductor:
     · dibuixa la llista de passos: el pas actual mostra la frase
       sencera; els altres, el número i el començament de la frase;
     · anima el pas següent: emmarca les tecles del pas al teclat (amb
       el número d'ordre si n'hi ha de 2 a MAX_ORDRE), el cursor les
       prem una a una i la pantalla canvia després de cada tecla (les
       pantalles intermèdies les calcula el simulador del model);
     · salta a qualsevol pas sense animació, i torna a animar el pas
       actual (repeteix).
   No coneix cap calculadora: tot el que en sap ho demana al model.

   Reproductor.crea(ctx, r, fitxa, temps, opcions) → controlador
     ctx      {M (el model), idioma, text (Text.creador)}
     r        els elements de la pàgina (motor.js, construeixPagina)
     temps    ms → ms a la velocitat triada
     opcions  adreca: false  no posa el pas a l'adreça (?pas=N)
              abans()        es crida abans de saltar o d'avançar
              finalAPart     el que surt en acabar («Ara tu»…) no surt
                             sol: s'hi va amb ▶ des de l'últim pas
   Les palanques del laboratori d'UX (nucli/ux.js) que canvien
   l'animació: B4 (lupa), C1 (temps de lectura), C2 (la frase [calc],
   quan comencen les tecles) i D1 (error sense tenyir la pàgina). Si
   motor.js hi posa r.fraseGran (C4, E2), la frase del pas actual s'hi
   copia.
   Depèn de Dom. Exporta «Reproductor».
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

const {element, icona, ICONES} = Dom;

/** Durades de l'animació d'una tecla, en mil·lisegons, abans d'aplicar la velocitat triada. */
const TEMPS = Object.freeze({
  cursor: 430,         // el cursor va fins a la tecla
  clic: 150,           // la tecla està premuda
  entreTecles: 170,    // pausa després de la tecla (la pantalla ja ha canviat)
  pantalla: 220,       // la pantalla del final del pas apareix
});
/** Les xifres i el punt (tecles de tipus 'num') van 3 vegades més de pressa: l'alumne ja sap com s'escriu un nombre. */
const RAPIDESA_XIFRES = 3;
/**
 * Abans d'animar un pas amb tecles (ms, sempre els mateixos, no depenen de la velocitat): repòs, vora groga de la
 * calculadora que s'esvaeix, les altres tecles que s'apaguen (la transició d'opacitat de .ux-b1 a estil.css) i, amb
 * les tecles ja apagades, un temps perquè la mirada es fixi a la calculadora abans que el cursor es mogui.
 */
const ATENCIO = Object.freeze({repos: 300, vora: 600, apaga: 250, fixacio: 800});
/** Fins a quantes tecles per pas es numeren al teclat (en una seqüència més llarga, els números fan soroll). */
const MAX_ORDRE = 6;
const CORBA = 'cubic-bezier(.45,.05,.25,1)';
/** C1: temps de lectura abans de les tecles, per paraula i entre un mínim i un màxim (ms, abans d'aplicar la velocitat). */
const LECTURA = Object.freeze({perParaula: 170, min: 600, max: 4200});
/** B4: la lupa (ms de la transició, que és a estil.css, i ampliació màxima). */
const LUPA = Object.freeze({ms: 450, maxim: 1.9});
const CURSOR = '<svg viewBox="0 0 22 30" aria-hidden="true"><path d="M2 2 L2 24 L7.6 18.8 L11.4 27.4 L15 25.8 L11.3 17.4 L18.6 17.4 Z" '
  + 'fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg>';

const espera = ms => new Promise(resol => setTimeout(resol, ms));
/** Una palanca del laboratori d'UX (nucli/ux.js) és activa? Sense ?ux=, mai. */
const ux = p => Boolean(arrel.UX && arrel.UX.te(p));
let instancies = 0;

/** C1: quantes paraules té la frase d'un pas (una fórmula, una tecla o una opció de menú compten com una). Amb C2, només les de [mat]. */
function paraules(t) {
  let s = String(t || '');
  const mat = s.match(/\[mat\][\s\S]*?\[\/mat\]/g);
  if (ux('c2') && mat) s = mat.join(' ');
  s = s.replace(/\$\$[^$]+\$\$|\$[^$]+\$|\[\[[^\]]+\]\]|\{\{[^}]+\}\}/g, ' x ').replace(/\[\/?[a-z]+\]|!!/g, ' ');
  return s.split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
}

/**
 * B4: amplia la calculadora al voltant de les tecles del pas (centrades en horitzontal, i dins de la calculadora en
 * vertical). activa = false la torna a la mida de sempre. Torna true si l'ha ampliada.
 */
function lupa(r, activa) {
  const c = r.calculadora;
  if (!activa) { c.style.transform = ''; return false; }
  const tecles = [...c.querySelectorAll('.tecla.del-pas')];
  if (!tecles.length) return false;
  const o = c.getBoundingClientRect();
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const t of tecles) {
    const q = t.getBoundingClientRect();
    x0 = Math.min(x0, q.left); y0 = Math.min(y0, q.top); x1 = Math.max(x1, q.right); y1 = Math.max(y1, q.bottom);
  }
  const W = o.width, H = o.height, w = x1 - x0, h = y1 - y0;
  const s = Math.min(LUPA.maxim, (W * 0.8) / w, (H * 0.5) / h);
  if (!(s > 1.15)) return false;
  const cx = (x0 + x1) / 2 - o.left, cy = (y0 + y1) / 2 - o.top;
  const marge = s * h / 2 + 0.05 * H;
  const ty = Math.min(Math.max(cy, marge), H - marge);
  c.style.transformOrigin = '0 0';
  c.style.transform = `translate(${W / 2 - s * cx}px, ${ty - s * cy}px) scale(${s})`;
  return true;
}

/** Anima un element i espera que acabi. Si l'animació es cancel·la (el pas s'interromp), acaba igualment, sense error. */
function anima(el, fotogrames, opcions) {
  return el.animate(fotogrames, Object.assign({fill: 'forwards', easing: CORBA}, opcions)).finished.catch(() => {});
}

/** La posició d'un element respecte d'un altre, en píxels. */
function rectangle(el, origen) {
  const o = origen.getBoundingClientRect(), q = el.getBoundingClientRect();
  return {cx: q.left - o.left + q.width / 2, cy: q.top - o.top + q.height / 2};
}

/** Al teclat, la classe «prefix-<capa>» ressalta els rètols de la capa activa (SHIFT…; els estils del model). null = cap. */
function capaActiva(teclat, capa) {
  for (const c of [...teclat.classList]) if (c.startsWith('prefix-')) teclat.classList.remove(c);
  if (capa) teclat.classList.add('prefix-' + capa);
}


/* ── El cursor que prem les tecles ─────────────────────────────────── */

function creaCursor(r) {
  let x = null, y = null;
  const transforma = (escala = 1) => `translate(${x}px, ${y}px) scale(${escala})`;
  const el = r.cursor;
  return {
    /** Va fins a (nx, ny) en «durada» ms. La primera vegada surt de sota la calculadora, a la dreta. */
    async va(nx, ny, durada) {
      if (x === null) {
        x = r.calculadora.offsetLeft + r.calculadora.offsetWidth - 20;
        y = r.calculadora.offsetTop + r.calculadora.offsetHeight + 10;
        el.style.transform = transforma();
        el.classList.add('visible');
      }
      const sortida = transforma();
      x = nx; y = ny;
      await anima(el, [{transform: sortida}, {transform: transforma()}], {duration: durada});
      el.style.transform = transforma();
      el.getAnimations().forEach(a => a.cancel());
    },
    prem(premut, durada) {
      const [de, a] = premut ? [1, 0.84] : [0.84, 1];
      el.animate([{transform: transforma(de)}, {transform: transforma(a)}], {duration: durada, fill: 'forwards'});
    },
    ona(px, py, durada) {
      const o = element('div', {class: 'ona'});
      o.style.left = px + 'px';
      o.style.top = py + 'px';
      r.efectes.append(o);
      o.animate([{transform: 'scale(.3)', opacity: 0.9}, {transform: 'scale(1.6)', opacity: 0}],
        {duration: durada, easing: 'ease-out'}).finished.then(() => o.remove());
    },
    amaga() {
      x = y = null;
      el.classList.remove('visible');
      el.getAnimations().forEach(a => a.cancel());
    },
  };
}


/* ── La llista de passos ───────────────────────────────────────────── */

/**
 * Un element per pas, i un d'inicial (el pas 0, abans de començar). Cada pas porta el número, un resum d'una línia
 * (el començament de la frase, per als passos que no són l'actual) i la frase sencera (només el pas actual).
 */
function omplPassos(ctx, r, passos, enClicar) {
  const zero = element('li', {class: 'pas zero'}, [element('div', {class: 'frase', html:
    'Prem ' + icona(ICONES.seguent).replace('<svg', '<svg class="icona-inline"') + ' o la fletxa ↓ del teclat per començar.'})]);
  const files = passos.map((pas, i) => {
    const html = ctx.text(pas.text);
    const boto = element('button', {class: 'cap', type: 'button', title: `Ves al pas ${i + 1}`},
      [element('span', {class: 'num', 'data-de': String(passos.length), text: String(i + 1)}), element('span', {class: 'resum', 'aria-hidden': 'true', html})]);
    boto.addEventListener('click', () => enClicar(i));
    return element('li', {class: 'pas'}, [boto, element('div', {class: 'frase', html})]);
  });
  r.passos.replaceChildren(zero, ...files);
  return {zero, files};
}

function marcaPassos(llista, pas) {
  llista.zero.classList.toggle('actual', pas < 0);
  llista.files.forEach((li, i) => {
    li.classList.toggle('fet', i < pas);
    li.classList.toggle('actual', i === pas);
    li.querySelector('.cap').setAttribute('aria-current', i === pas ? 'step' : 'false');
  });
  const actual = pas < 0 ? llista.zero : llista.files[pas];
  const caixa = actual.parentElement;
  if (/auto|scroll/.test(getComputedStyle(caixa).overflowY)) {
    // Dues columnes: el pas actual es veu sencer dins de la llista (només es desplaça la llista, no la pàgina)
    const a = actual.offsetTop - caixa.offsetTop, b = a + actual.offsetHeight;
    if (a < caixa.scrollTop) caixa.scrollTop = a - 6;
    else if (b > caixa.scrollTop + caixa.clientHeight) caixa.scrollTop = b - caixa.clientHeight + 6;
  } else if (pas >= 0) {
    // Una columna: la llista no es desplaça per dins; es desplaça la pàgina el mínim perquè es vegi la frase
    const q = actual.getBoundingClientRect();
    if (q.bottom > innerHeight || q.top < 0) {
      const suau = !matchMedia('(prefers-reduced-motion: reduce)').matches;
      actual.scrollIntoView({block: 'nearest', behavior: suau ? 'smooth' : 'auto'});
    }
  }
}

/** Emmarca al teclat les tecles del pas i, si n'hi ha de 2 a MAX_ORDRE, l'ordre en què es premen («2·3» si es prem dues vegades). */
function marcaTeclat(r, passos, pas) {
  r.teclat.querySelectorAll('.del-pas').forEach(t => { t.classList.remove('del-pas', 'pendent'); t.removeAttribute('data-ordre'); });
  if (pas < 0) return;
  const tecles = passos[pas].tecles;
  const ordre = new Map();
  tecles.forEach((id, j) => ordre.set(id, (ordre.get(id) || []).concat(j + 1)));
  for (const [id, ns] of ordre) {
    const t = r.teclat.querySelector(`[data-tecla="${id}"]`);
    if (!t) continue;
    t.classList.add('del-pas');
    if (tecles.length > 1 && tecles.length <= MAX_ORDRE) t.setAttribute('data-ordre', ns.join('·'));
  }
}


/* ── El reproductor ────────────────────────────────────────────────── */

function crea(ctx, r, fitxa, temps, opcions = {}) {
  const {M} = ctx;
  const passos = fitxa.passos;
  const darrer = passos.length - 1;
  const cursor = creaCursor(r);
  const parcials = M.simulador.pantalles(fitxa).pantalles;   // parcials[i][j]: la pantalla després de la tecla j del pas i
  /** La pantalla del final del pas i: la del simulador (amb el cursor de text al seu lloc) o, si el pas no té tecles, la de la fitxa. */
  const final = i => (i < 0 ? fitxa.inici : (parcials[i].length ? parcials[i][parcials[i].length - 1] : passos[i].pantalla));
  const prefix = id => (id && M.tecles.TECLES[id] && M.tecles.TECLES[id].prefix) || null;
  const esXifra = id => M.tecles.TECLES[id] && M.tecles.TECLES[id].tipus === 'num';
  /** Els elements que només surten en acabar l'últim pas («Ara tu», «Prova-ho tu»): {el, reinicia()}. */
  const alFinal = r.alFinal || [];
  let idx = -1;                 // -1 = el pas 0 (abans de començar)
  let ocupat = false;           // hi ha un pas animant-se
  let torn = 0;                 // canvia quan s'interromp l'animació
  let finalObert = false;       // finalAPart: es veu la pantalla de l'«Ara tu»
  const instancia = ++instancies;
  const finalAPart = Boolean(opcions.finalAPart && alFinal.length);

  function mostraPantalla(estat, canvi = false) {
    r.lcd.innerHTML = M.pantalla.html(estat, ctx.idioma);
    if (M.pantalla.ajusta) M.pantalla.ajusta(r.lcd);
    if (canvi) r.lcd.animate([{opacity: 0.35}, {opacity: 1}], {duration: temps(TEMPS.pantalla), easing: 'ease-out'});
  }

  const llista = omplPassos(ctx, r, passos, i => salta(i));

  /** A l'ordinador (dues columnes), que el que surt al final es vegi dins de la columna, que llavors es desplaça sencera. */
  function mostraFinal() {
    const el = alFinal.map(a => a.el).find(e => !e.hidden);
    if (!el) return;
    const columna = el.parentElement;
    if (getComputedStyle(columna).display !== 'flex') return;   // una columna: ja hi porta marcaPassos
    const c = columna.getBoundingClientRect(), a = el.getBoundingClientRect();
    if (a.bottom > c.bottom) columna.scrollTop += Math.min(a.bottom - c.bottom + 8, a.top - c.top);
  }
  for (const a of alFinal) a.el.querySelectorAll('button').forEach(b => b.addEventListener('click', () => requestAnimationFrame(mostraFinal)));

  /** Els elements que mostren la frase del pas actual: el de la llista i, si n'hi ha, la frase gran (C4, E2). */
  const ambLaFrase = () => [idx >= 0 ? llista.files[idx] : llista.zero, r.fraseGran].filter(Boolean);
  /** Treu els estats d'un pas animant-se (C1, C2, B4) de tots els passos. */
  function netejaEstats() {
    for (const el of [...llista.files, llista.zero, r.fraseGran]) if (el) el.classList.remove('calc-amagat', 'llegint');
    lupa(r, false);
  }
  /** D2: obre o tanca la pantalla de l'«Ara tu». */
  function posaFinal(obert) {
    finalObert = obert;
    document.documentElement.classList.toggle('ux-final', obert);
  }

  function pinta() {
    const alFinalVisible = idx === darrer && !ocupat && (!finalAPart || finalObert);
    for (const a of alFinal) {
      if (!alFinalVisible) a.reinicia();
      if (a.el.hidden === alFinalVisible) a.el.hidden = !alFinalVisible;
    }
    marcaPassos(llista, idx);
    if (alFinalVisible) mostraFinal();
    // L'apartat de l'enunciat que es resol en aquest pas, ressaltat
    const apartat = idx >= 0 ? passos[idx].apartat : null;
    r.enunciat.querySelectorAll('.apartat').forEach(e => e.classList.toggle('actiu', e.dataset.apartat === apartat));
    // Zona d'error: si el pas ensenya un ús erroni, la pàgina es tenyeix de vermell (estil.css)
    const error = idx >= 0 && Boolean(passos[idx].error);
    document.body.classList.toggle(ux('d1') ? 'error-suau' : 'zona-error', error);
    // La frase gran (C4, E2): la del pas actual, copiada de la llista (només quan canvia el pas, que no torni a sortir)
    if (r.fraseGran) {
      const clau = instancia + ':' + idx;
      if (r.fraseGran.dataset.clau !== clau) {
        r.fraseGran.dataset.clau = clau;
        const frase = (idx < 0 ? llista.zero : llista.files[idx]).querySelector('.frase');
        r.fraseGran.innerHTML = (idx >= 0 ? `<p class="frase-gran-num">Pas ${idx + 1} de ${passos.length}</p>` : '') + frase.innerHTML;
      }
      r.fraseGran.classList.toggle('error', error);
    }
    // L'anunci per als lectors de pantalla porta l'HTML de KaTeX, que inclou MathML accessible
    r.anunci.innerHTML = idx < 0 ? ctx.text(fitxa.enunciat)
      : `Pas ${idx + 1} de ${passos.length}.${error ? ' Atenció: aquest pas ensenya un ús erroni.' : ''} ${ctx.text(passos[idx].text)}`;
    // L'adreça porta el pas actual (fitxa.html?id=…&pas=N)
    if (opcions.adreca !== false) try {
      const u = new URL(location.href);
      if (idx < 0) u.searchParams.delete('pas'); else u.searchParams.set('pas', String(idx + 1));
      history.replaceState(null, '', u);
    } catch (e) { /* sense history (p. ex. file://) */ }
    if (opcions.adreca !== false) {
      document.body.classList.toggle('en-marxa', idx >= 0);       // A2: l'enunciat es plega un cop començada la fitxa
      if (arrel.UX) arrel.UX.avisa({tipus: 'pas', pas: idx + 1, total: passos.length});
    }
    r.anterior.disabled = idx < 0;
    r.seguent.disabled = idx === darrer && !ocupat && (!finalAPart || finalObert);
    if (r.repeteix) r.repeteix.disabled = idx < 0 || !passos[idx].tecles.length;
  }


  /** Va al pas i (-1 = el pas 0), sense animació. Si hi ha un pas animant-se, l'interromp. */
  function salta(i) {
    if (opcions.abans) opcions.abans();
    torn++;
    ocupat = false;
    netejaEstats();
    if (finalObert) posaFinal(false);
    idx = Math.max(-1, Math.min(darrer, i));
    mostraPantalla(final(idx));
    marcaTeclat(r, passos, idx);
    capaActiva(r.teclat, null);
    r.calculadora.querySelectorAll('.premuda').forEach(t => t.classList.remove('premuda'));
    cursor.amaga();
    pinta();
  }

  /**
   * Anima el pas següent: el cursor prem les tecles una a una i la pantalla canvia després de cada tecla.
   * Si ja hi ha un pas animant-se, l'acaba a l'instant.
   */
  async function seguent() {
    if (opcions.abans) opcions.abans();
    if (ocupat) { salta(idx); return; }
    if (idx >= darrer) {
      // D2: des de l'últim pas, ▶ obre la pantalla de l'«Ara tu»
      if (finalAPart && !finalObert) { posaFinal(true); pinta(); }
      return;
    }
    ocupat = true;
    const meu = ++torn;
    const viu = () => meu === torn;
    idx++;
    pinta();
    const pas = passos[idx];
    // Les tecles del pas d'abans deixen d'estar marcades: fins que comencin les d'aquest, no n'hi ha cap
    if (pas.tecles.length) r.teclat.querySelectorAll('.del-pas').forEach(t => { t.classList.remove('del-pas'); t.removeAttribute('data-ordre'); });
    // C2: la frase [calc] s'amaga fins que comencen les tecles
    const ambCalc = ux('c2') && pas.tecles.length > 0;
    if (ambCalc) for (const el of ambLaFrase()) el.classList.add('calc-amagat');
    // C1: abans de les tecles, el temps de llegir la frase (una barra a sota de la frase el va marcant)
    if (ux('c1') && pas.tecles.length) {
      const ms = temps(Math.min(LECTURA.max, Math.max(LECTURA.min, paraules(pas.text) * LECTURA.perParaula)));
      for (const el of ambLaFrase()) { el.style.setProperty('--lectura', ms + 'ms'); el.classList.add('llegint'); }
      await espera(ms);
      if (!viu()) return;
      for (const el of ambLaFrase()) el.classList.remove('llegint');
    }
    if (pas.tecles.length) {
      // Temps perquè la mirada vagi de les explicacions a la calculadora (fix, no depèn de la velocitat): 0,3 s sense
      // res marcat i, després, la vora de la calculadora en groc, que s'esvaeix en 0,6 s. Llavors comencen les tecles.
      await espera(ATENCIO.repos);
      if (!viu()) return;
      r.calculadora.classList.remove('atencio');
      void r.calculadora.offsetWidth;              // perquè l'animació torni a començar
      r.calculadora.classList.add('atencio');
      await espera(ATENCIO.vora);
      r.calculadora.classList.remove('atencio');
      if (!viu()) return;
    }
    marcaTeclat(r, passos, idx);
    if (pas.tecles.length) {
      // Les tecles del pas queden marcades i les altres s'apaguen; quan ja són apagades, encara un temps de fixació
      await espera(ATENCIO.apaga + ATENCIO.fixacio);
      if (!viu()) return;
    }
    // B4: la lupa s'acosta a les tecles del pas abans de prémer-les
    if (ux('b4') && pas.tecles.length && lupa(r, true)) {
      await espera(LUPA.ms);
      if (!viu()) return;
    }
    if (ambCalc) for (const el of ambLaFrase()) el.classList.remove('calc-amagat');
    for (const id of pas.tecles) {
      const t = r.teclat.querySelector(`[data-tecla="${id}"]`);
      if (t) t.classList.add('pendent');           // les tecles que encara s'han de prémer
    }
    if (!pas.tecles.length) cursor.amaga();
    for (let j = 0; j < pas.tecles.length; j++) {
      const id = pas.tecles[j];
      const t = r.teclat.querySelector(`[data-tecla="${id}"]`);
      const ms = d => temps(d) / (esXifra(id) ? RAPIDESA_XIFRES : 1);
      const q = rectangle(t, r.escenari);
      await cursor.va(q.cx - 2, q.cy - 2, ms(TEMPS.cursor));
      if (!viu()) return;
      cursor.prem(true, ms(90));
      t.classList.add('premuda');
      cursor.ona(q.cx, q.cy, ms(420));
      await espera(ms(TEMPS.clic));
      if (!viu()) return;
      cursor.prem(false, ms(90));
      t.classList.remove('premuda');
      if (!pas.tecles.slice(j + 1).includes(id)) t.classList.remove('pendent');
      // Després d'una tecla de prefix (SHIFT…), els rètols de la seva capa es ressalten fins a la tecla següent
      capaActiva(r.teclat, prefix(id));
      const darrera = j === pas.tecles.length - 1;
      mostraPantalla(parcials[idx][j], darrera);
      if (!darrera) {
        await espera(ms(TEMPS.entreTecles));
        if (!viu()) return;
      }
    }
    if (!pas.tecles.length) mostraPantalla(pas.pantalla, true);
    // B4: un moment amb la pantalla nova a la vista ampliada i, després, la calculadora sencera (la pantalla, a dalt)
    if (r.calculadora.style.transform) {
      await espera(temps(TEMPS.pantalla) + 350);
      if (!viu()) return;
      cursor.amaga();
      lupa(r, false);
    }
    ocupat = false;
    if (idx === darrer) cursor.amaga();
    pinta();
  }

  /** Torna a animar el pas actual (des de la pantalla del pas d'abans). */
  function repeteix() {
    if (idx < 0 || !passos[idx].tecles.length) return;
    salta(idx - 1);
    seguent();
  }

  // Si la finestra canvia de mida, les coordenades del cursor ja no valen: s'amaga i torna a sortir a la tecla següent
  addEventListener('resize', () => cursor.amaga());

  r.seguent.addEventListener('click', () => seguent());
  r.anterior.addEventListener('click', () => salta(idx - 1));
  if (r.repeteix) r.repeteix.addEventListener('click', () => repeteix());

  salta(-1);
  return {salta, seguent, repeteix,
    anterior: () => salta(idx - 1),
    get pas() { return idx; }, get total() { return passos.length; }, get ocupat() { return ocupat; }};
}

arrel.Reproductor = Object.freeze({crea, TEMPS, RAPIDESA_XIFRES});

})(globalThis);
