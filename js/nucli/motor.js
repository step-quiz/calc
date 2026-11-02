/* ═══════════════════════════════════════════════════════════════════
   nucli/motor.js — La pàgina d'una fitxa
   ───────────────────────────────────────────────────────────────────
   Construeix fitxa.html?id=… en dues columnes:
     · a l'esquerra, tot el que es llegeix: l'enunciat (amb la font i
       la figura, si n'hi ha), els botons ◀ ↻ ▶, la velocitat, la llista
       de passos, l'«Ara tu» o el «Prova-ho tu» (en acabar) i, plegades,
       les altres fitxes del bloc;
     · a la dreta, només la calculadora (la dibuixa el model).
   El reproductor pas a pas és a reproductor.js.

   Si l'últim pas d'una fitxa és un error, s'hi afegeix un pas de
   tancament sense tecles: la pantalla torna al resultat bo i el text és
   fitxa.tancament (la manera correcta i la resposta).

   No coneix cap calculadora: tot el que en sap ho demana al model.
   Depèn de KaTeX, Models, Preferencies, Text, Dom i Reproductor.
   Exporta «Motor»: arrenca(), inicia(model, id, contenidor).
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

const {element, icona, ICONES} = Dom;
const {escapa, formula} = Text;

/** Velocitats de l'animació: factor que multiplica les durades de Reproductor.TEMPS. */
const VELOCITATS = Object.freeze([['lenta', 2.09], ['normal', 1.65], ['ràpida', 0.83]]);
const PER_DEFECTE = 1.65;
/** Quant de temps es veu la bombolla de la font si no es tanca abans. */
const FONT_MS = 8000;
/** L'avís de les fletxes del teclat: surt després de tants clics de ratolí a ◀ ▶ i es tanca sol al cap de tant. */
const AVIS_CLICS = 5;
const AVIS_DURADA = 10000;
const AVIS_TEXT = 'Recorda: pots fer servir les fletxes ↑, ↓ del teclat per fer tots els passos';

const PEU = '© 2026 <strong>David Arso Civil</strong>. Ús educatiu lliure. Prohibida la comercialització '
  + 'i la modificació (<a rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>). '
  + 'Web no oficial, sense relació amb el fabricant de la calculadora. <span class="versio">Versió ' + Models.VERSIO + '</span>';

const ICONA_FONT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2.5h8.5L19 7v14.5H6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'
  + '<path d="M14 2.5V7.5h5M9 12h7M9 16h7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const CURSOR_HTML = '<svg viewBox="0 0 22 30" aria-hidden="true"><path d="M2 2 L2 24 L7.6 18.8 L11.4 27.4 L15 25.8 L11.3 17.4 L18.6 17.4 Z" '
  + 'fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg>';

/** El model, l'idioma dels menús de la calculadora, l'etapa i el creador de textos d'aquesta pàgina (els posa inicia). */
let M = null;
let MODELS = [];
let IDIOMA = null;
let ETAPA = null;
let text = t => escapa(t);

function parametre(nom) {
  try { return new URLSearchParams(location.search).get(nom); } catch (e) { return null; }
}


/* ── Capçalera: la calculadora i l'idioma dels menús ───────────────── */

/** «La teva calculadora»: en triar-ne una altra, es desa i s'obre la mateixa fitxa (el mateix id) en aquella calculadora. */
function selectorModel(fitxa) {
  if (MODELS.length < 2) return null;
  const sel = element('select', {id: 'model', 'aria-label': 'La teva calculadora'});
  for (const d of MODELS) sel.append(element('option', {value: d.id, text: d.curt}));
  sel.value = M.id;
  sel.addEventListener('change', () => { Preferencies.desaModel(sel.value); location.href = Models.adreca({model: sel.value, etapa: ETAPA, fitxa: fitxa.id}); });
  return element('label', {class: 'tria-model', for: 'model', text: 'La teva calculadora '}, [sel]);
}

/** «Calculadora en: Castellano / Català» (només si el model té idiomes). En canviar-lo, es desa i es recarrega la pàgina al mateix pas. */
function selectorIdioma() {
  if (!M.idiomes) return null;
  const sel = element('select', {id: 'idioma', 'aria-label': 'Idioma de la teva calculadora'});
  for (const [v, nom] of Object.entries(M.idiomes)) sel.append(element('option', {value: v, text: nom}));
  sel.value = IDIOMA;
  sel.addEventListener('change', () => { Preferencies.desaIdioma(sel.value); location.reload(); });
  return element('label', {class: 'tria-idioma', for: 'idioma', text: 'Calculadora en '}, [sel]);
}


/* ── L'enunciat: la font i la figura ───────────────────────────────── */

/** La figura de l'enunciat (fitxa.figura = {src, alt}): miniatura a la dreta; en clicar-la, gran en un <dialog>. */
function botoFigura(fitxa) {
  if (!fitxa.figura) return null;
  const {src, alt} = fitxa.figura;
  const tanca = element('button', {class: 'figura-tanca', type: 'button', 'aria-label': 'Tanca', title: 'Tanca', text: '×'});
  const gran = element('dialog', {class: 'figura-gran', 'aria-label': alt}, [tanca, element('img', {src, alt})]);
  const mini = element('button', {class: 'figura-mini', type: 'button', title: 'Amplia la figura', 'aria-label': 'Amplia la figura: ' + alt},
    [element('img', {src, alt: ''})]);
  mini.addEventListener('click', () => { if (!gran.open) gran.showModal(); });
  tanca.addEventListener('click', () => gran.close());
  gran.addEventListener('click', e => { if (e.target === gran) gran.close(); });
  return element('span', {class: 'figura'}, [mini, gran]);
}

/** La font d'un exercici real (fitxa.font): una icona davant de l'enunciat; en clicar-la, una bombolla que es tanca sola. */
function botoFont(fitxa) {
  if (!fitxa.font) return null;
  const tanca = element('button', {class: 'font-tanca', type: 'button', 'aria-label': 'Tanca', title: 'Tanca', text: '×'});
  const bombolla = element('span', {class: 'font-bombolla', role: 'status', hidden: true}, [element('span', {text: fitxa.font}), tanca]);
  const boto = element('button', {class: 'font-boto', type: 'button', 'aria-label': 'D\'on surt aquest exercici', title: 'D\'on surt aquest exercici',
    'aria-expanded': 'false', html: ICONA_FONT});
  let rellotge = null;
  const mostra = obert => {
    bombolla.hidden = !obert;
    boto.setAttribute('aria-expanded', String(obert));
    clearTimeout(rellotge);
    if (obert) rellotge = setTimeout(() => mostra(false), FONT_MS);
  };
  boto.addEventListener('click', () => mostra(bombolla.hidden));
  tanca.addEventListener('click', e => { e.stopPropagation(); mostra(false); });
  return element('span', {class: 'font'}, [boto, bombolla]);
}


/* ── El que surt en acabar: «Ara tu» i «Prova-ho tu» ──────────────── */

/** Un botó «Mostra la solució / Amaga la solució» que obre i tanca «solucio». Torna {boto, amaga()}. */
function botoSolucio(solucio) {
  const boto = element('button', {class: 'ara-tu-boto', type: 'button', 'aria-expanded': 'false', text: 'Mostra la solució'});
  const posa = obert => {
    solucio.hidden = !obert;
    boto.textContent = obert ? 'Amaga la solució' : 'Mostra la solució';
    boto.setAttribute('aria-expanded', String(obert));
  };
  boto.addEventListener('click', () => posa(solucio.hidden));
  return {boto, amaga: () => posa(false)};
}

/**
 * «Ara tu» (fitxa.araTu = {enunciat, resultat, error, inici, passos}): un exercici semblant. «Mostra la solució» ensenya
 * el resultat correcte i l'error típic; «Comprova-ho pas a pas» fa servir la calculadora per a l'«Ara tu», amb uns
 * botons ◀ ▶ propis (el mode «Ara tu»: el governa inicia()).
 */
function construeixAraTu(A) {
  const boto = (classe, nom, d) => element('button', {class: 'boto ' + classe, type: 'button', title: nom, 'aria-label': nom, html: icona(d)});
  const pasAPas = element('button', {class: 'ara-tu-boto ara-tu-comprova', type: 'button', text: 'Comprova-ho pas a pas'});
  const surt = element('button', {class: 'ara-tu-boto', type: 'button', text: 'Torna a l\'exercici'});
  const solucio = element('div', {class: 'ara-tu-solucio', hidden: true}, [
    element('p', {class: 'ara-tu-resultat', html: 'Resultat correcte: ' + formula(A.resultat)}),
    A.error ? element('p', {class: 'ara-tu-error', html: '<span class="avis-error">Error típic</span>: ' + text(A.error)}) : null,
    A.passos ? pasAPas : null,
  ]);
  const veure = botoSolucio(solucio);
  const modePas = element('div', {class: 'ara-tu-mode', hidden: true}, [
    element('div', {class: 'ara-tu-controls'}, [
      element('div', {class: 'botons'}, [boto('', 'Pas anterior de l\'«Ara tu»', ICONES.anterior), boto('principal', 'Pas següent de l\'«Ara tu»', ICONES.seguent)]),
      surt]),
    element('ol', {class: 'passos passos-ara-tu', 'aria-label': 'Passos de l\'«Ara tu»'}),
  ]);
  const el = element('section', {class: 'ara-tu', 'aria-label': 'Ara tu', hidden: true}, [
    element('p', {class: 'ara-tu-titol', text: 'Ara tu'}),
    element('p', {class: 'ara-tu-enunciat', html: text(A.enunciat)}), veure.boto, solucio, modePas]);
  const botons = modePas.querySelectorAll('.boto');
  return {el, reinicia: veure.amaga,
    ui: {pasAPas, surt, modePas, passos: modePas.querySelector('ol'), anterior: botons[0], seguent: botons[1]}};
}

/** «Prova-ho tu» (fitxa.provaTu = {enunciat, solucio}): un exercici semblant per fer amb la calculadora, i la solució amagada. */
function construeixProvaTu(P) {
  const solucio = element('div', {class: 'ara-tu-solucio', hidden: true}, [element('p', {class: 'ara-tu-resultat', html: text(P.solucio)})]);
  const veure = botoSolucio(solucio);
  const el = element('section', {class: 'ara-tu prova-tu', 'aria-label': 'Prova-ho tu', hidden: true}, [
    element('p', {class: 'ara-tu-titol', text: 'Prova-ho tu'}),
    element('p', {class: 'ara-tu-enunciat', html: text(P.enunciat)}), veure.boto, solucio]);
  return {el, reinicia: veure.amaga};
}


/* ── La pàgina ─────────────────────────────────────────────────────── */

function construeixPagina(fitxa, bloc, germanes, contenidor) {
  const boto = (classe, nom, d) => element('button', {class: 'boto ' + classe, type: 'button', title: nom, 'aria-label': nom, html: icona(d)});
  const T = M.tecles.TECLAT;
  const r = {
    lcd: element('div', {class: 'lcd-pantalla', role: 'img', 'aria-label': 'Pantalla de la calculadora'}),
    passos: element('ol', {class: 'passos', 'aria-label': 'Passos'}),
    reproductor: element('div', {class: 'reproductor'}),
    anunci: element('p', {class: 'nomes-lectors', 'aria-live': 'polite'}),
    efectes: element('div', {class: 'efectes', 'aria-hidden': 'true'}),
    cursor: element('div', {class: 'cursor', 'aria-hidden': 'true', html: CURSOR_HTML}),
    anterior: boto('', 'Pas anterior', ICONES.anterior),
    repeteix: boto('', 'Torna a fer aquest pas (R)', ICONES.repeteix),
    seguent: boto('principal', 'Pas següent', ICONES.seguent),
    velocitat: element('select', {id: 'velocitat'}),
    enunciat: element('p', {class: 'enunciat', html: text(fitxa.enunciat)}),
    alFinal: [],
  };
  const font = botoFont(fitxa);
  if (font) r.enunciat.prepend(font, ' ');
  const figura = botoFigura(fitxa);
  if (figura) r.enunciat.prepend(figura);
  for (const [nom, factor] of VELOCITATS) r.velocitat.append(element('option', {value: String(factor), text: nom}));
  r.velocitat.value = String(PER_DEFECTE);
  r.reproductor.append(
    element('div', {class: 'botons'}, [r.anterior, r.repeteix, r.seguent]),
    element('label', {class: 'velocitat', for: 'velocitat', text: 'Velocitat '}, [r.velocitat]),
  );

  r.calculadora = element('div', {class: 'calculadora', style: `aspect-ratio:100/${T.alcada};--alcada-rel:${T.alcada / 100}`, html: M.tecles.htmlTeclat()});
  r.calculadora.append(element('div', {class: 'lcd', style: `left:${T.vidre.x}cqw;top:${T.vidre.y}cqw;width:${T.vidre.w}cqw;height:${T.vidre.h}cqw`}, [r.lcd]));
  r.teclat = r.calculadora;
  if (fitxa.araTu) { r.araTu = construeixAraTu(fitxa.araTu); r.alFinal.push(r.araTu); }
  if (fitxa.provaTu) r.alFinal.push(construeixProvaTu(fitxa.provaTu));

  r.escenari = element('div', {class: 'escenari'}, [r.calculadora, r.efectes, r.cursor]);

  const enllac = f => element('a', {class: 'pastilla' + (f.id === fitxa.id ? ' actual' : ''), href: Models.adreca({model: M.id, etapa: ETAPA, fitxa: f.id}),
    'aria-current': f.id === fitxa.id ? 'page' : null, text: f.titol});
  // Les relacionades d'un altre bloc (les del mateix bloc ja hi són)
  const relacionades = (fitxa.relacionades || []).map(id => M.dades.FITXES.find(f => f.id === id)).filter(f => f && f.bloc !== fitxa.bloc);
  const altres = element('details', {class: 'altres'}, [
    element('summary', {text: 'Fitxes de «' + bloc.titol + '»'}),
    element('div', {class: 'pastilles'}, germanes.map(enllac)),
    relacionades.length ? element('p', {class: 'titol-altres', text: 'Et pot interessar'}) : null,
    relacionades.length ? element('div', {class: 'pastilles'}, relacionades.map(enllac)) : null,
  ]);

  contenidor.replaceChildren(
    element('header', {class: 'capcalera'}, [
      element('a', {class: 'torna', href: Models.adreca({model: M.id, etapa: ETAPA}) + '#' + bloc.id, text: '← Calculadora'}),
      element('div', {class: 'tries'}, [selectorModel(fitxa), selectorIdioma()]),
      // Avisos que només mostra el CSS quan cal: navegador sense unitats cqw, tauleta en vertical
      element('p', {class: 'avis-capcalera avis-navegador', text: 'Aquest navegador és massa antic per dibuixar la calculadora. Actualitza\'l (Chrome 105 o posterior).'}),
      element('p', {class: 'avis-capcalera avis-gira', text: 'Gira la tauleta: en horitzontal veuràs alhora la calculadora i les explicacions.'}),
    ]),
    element('main', {class: 'contingut'}, [
      element('div', {class: 'columna'}, [
        element('h1', {class: 'nomes-lectors', text: fitxa.titol}),
        r.enunciat,
        r.reproductor,
        r.passos,
        ...r.alFinal.map(a => a.el),
        r.anunci,
        altres,
      ]),
      r.escenari,
    ]),
    element('footer', {class: 'peu', html: PEU}),
  );
  return r;
}


/* ── L'avís de les fletxes del teclat ──────────────────────────────── */

/**
 * Una bombolla sota els botons, una sola vegada per càrrega de la pàgina, quan l'usuari ha clicat AVIS_CLICS vegades
 * ◀ ▶ amb el ratolí sense haver premut mai una fletxa del teclat. Els tocs amb el dit i les pulsacions de teclat no
 * compten (potser no hi ha teclat). Es tanca amb la creu, en prémer una fletxa o al cap d'AVIS_DURADA.
 */
function creaAvis(r) {
  let clics = 0, teclat = false, mostrat = false, rellotge = null, aparell = '';
  const tanca = element('button', {class: 'avis-tanca', type: 'button', 'aria-label': 'Tanca l\'avís', title: 'Tanca', text: '×'});
  const bombolla = element('div', {class: 'avis-teclat', role: 'status'}, [element('span', {text: AVIS_TEXT}), tanca]);
  r.reproductor.append(bombolla);

  function amaga() {
    clearTimeout(rellotge);
    bombolla.classList.remove('visible');
  }
  function mostra() {
    mostrat = true;
    bombolla.classList.add('visible');
    rellotge = setTimeout(amaga, AVIS_DURADA);
  }
  tanca.addEventListener('click', amaga);

  return {
    /** Què ha premut el botó (pointerdown va abans del clic): 'mouse', 'touch' o 'pen'. */
    pulsacio(e) { aparell = e.pointerType; },
    /** Un clic a ◀ ▶: només compta si és de ratolí (detail 0 = l'ha activat el teclat). */
    clic(e) {
      const delRatoli = aparell === 'mouse' && e.detail > 0;
      aparell = '';
      if (!delRatoli || teclat || mostrat) return;
      if (++clics >= AVIS_CLICS) mostra();
    },
    /** S'ha fet servir una fletxa del teclat: l'avís ja no fa falta. */
    teclat() {
      teclat = true;
      amaga();
    },
  };
}


/* ── Inici ─────────────────────────────────────────────────────────── */

function errorCarrega(contenidor, html) {
  contenidor.replaceChildren(element('p', {class: 'error-carrega', html}));
  return null;
}

/** Carrega la calculadora d'aquesta pàgina i hi obre la fitxa ?id=. El controlador del reproductor queda a globalThis.fitxa. */
async function arrenca(contenidor = document.getElementById('fitxa')) {
  if (typeof katex === 'undefined') {
    return errorCarrega(contenidor, 'No s\'ha pogut carregar KaTeX, la biblioteca que dibuixa les fórmules. Comprova la connexió i torna a carregar la pàgina.');
  }
  let model;
  try { [model, MODELS] = await Promise.all([Models.carrega(), Models.descriptorsTots()]); } catch (e) {
    return errorCarrega(contenidor, 'No s\'ha pogut carregar la calculadora. Comprova la connexió i torna a carregar la pàgina.');
  }
  arrel.fitxa = inicia(model, parametre('id'), contenidor);
  return arrel.fitxa;
}

/**
 * Si l'últim pas és un error, la fitxa del reproductor porta un pas més, sense tecles: la pantalla torna a la del
 * resultat bo (l'últim pas que no és un error) i el text és fitxa.tancament.
 */
function ambTancament(fitxa) {
  const passos = fitxa.passos;
  if (!passos.length || !passos[passos.length - 1].error || !fitxa.tancament) return fitxa;
  if (!ambTancament.cache) ambTancament.cache = new Map();
  if (!ambTancament.cache.has(fitxa)) {
    const bo = passos.map(p => !p.error).lastIndexOf(true);
    const pantalla = bo >= 0 ? passos[bo].pantalla : fitxa.inici;
    ambTancament.cache.set(fitxa, Object.assign({}, fitxa, {passos: passos.concat([{tecles: [], pantalla, text: fitxa.tancament}])}));
  }
  return ambTancament.cache.get(fitxa);
}

function inicia(model, id, contenidor) {
  M = model;
  IDIOMA = Preferencies.idioma(M);
  text = Text.creador({model: M, idioma: IDIOMA});
  const ctx = {M, idioma: IDIOMA, text};
  const fitxa = M.dades.FITXES.find(f => f.id === id) || null;
  if (!fitxa) {
    document.title = 'Calculadora ' + M.curt;
    return errorCarrega(contenidor, `No hi ha cap fitxa «${escapa(id || '')}» per a la ${escapa(M.curt)}. `
      + `<a href="${escapa(Models.adreca({model: M.id, etapa: Models.etapaActual()}))}">Torna a la portada</a> per veure les fitxes d'aquesta calculadora.`);
  }
  const bloc = M.dades.BLOCS.find(b => b.id === fitxa.bloc);
  // L'etapa és la del bloc (si el bloc és de dues etapes, la de l'adreça o l'última vista); es desa com a última vista
  ETAPA = Models.etapaDe(bloc.etapes);
  Preferencies.desaEtapa(ETAPA);
  const germanes = M.dades.FITXES.filter(f => f.bloc === fitxa.bloc);
  document.title = fitxa.titol + ' — Calculadora ' + M.curt;
  document.body.style.setProperty('--cat', bloc.color);
  document.body.classList.add('pagina-fitxa');

  const r = construeixPagina(fitxa, bloc, germanes, contenidor);
  let factor = PER_DEFECTE;
  const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const temps = ms => Math.max(40, ms * factor * (reduit ? 0.35 : 1));
  // En triar la velocitat, el selector deixa anar el focus: si no, les fletxes del teclat hi canviarien la velocitat
  r.velocitat.addEventListener('change', () => { factor = parseFloat(r.velocitat.value) || PER_DEFECTE; r.velocitat.blur(); });

  // ?pas=N obre directament el pas N (1 = el primer). Es llegeix abans de crear el reproductor, que reescriu l'adreça.
  const pasInicial = parseInt(parametre('pas'), 10);

  /* Mode «Ara tu»: la calculadora passa a l'«Ara tu», amb un reproductor propi i el fons verd oliva. En surt amb
     «Torna a l'exercici» o en tocar el reproductor principal. */
  let modeAraTu = false, sub = null;
  const ui = r.araTu && r.araTu.ui;
  function surtAraTu() {
    if (!modeAraTu) return;
    modeAraTu = false;
    document.body.classList.remove('mode-ara-tu');
    ui.modePas.hidden = true;
    ui.pasAPas.hidden = false;
    if (sub) sub.salta(sub.pas);              // atura'n l'animació, si n'hi ha
    reproductor.salta(reproductor.pas);       // la calculadora torna a l'exercici
  }
  function entraAraTu() {
    modeAraTu = true;
    document.body.classList.add('mode-ara-tu');
    ui.modePas.hidden = false;
    ui.pasAPas.hidden = true;
    if (!sub) {
      const r2 = Object.assign({}, r, {passos: ui.passos, enunciat: element('p'), anterior: ui.anterior, seguent: ui.seguent, repeteix: null, alFinal: []});
      sub = Reproductor.crea(ctx, r2, {inici: fitxa.araTu.inici, passos: fitxa.araTu.passos}, temps, {adreca: false});
    } else sub.salta(-1);
    requestAnimationFrame(() => ui.modePas.scrollIntoView({block: 'nearest'}));
  }
  if (ui) {
    ui.pasAPas.addEventListener('click', entraAraTu);
    ui.surt.addEventListener('click', surtAraTu);
  }
  const actiu = () => (modeAraTu && sub ? sub : reproductor);

  const ambFinal = ambTancament(fitxa);
  const reproductor = Reproductor.crea(ctx, r, ambFinal, temps, {abans: surtAraTu});
  if (pasInicial >= 1 && pasInicial <= ambFinal.passos.length) reproductor.salta(pasInicial - 1);
  const avis = creaAvis(r);
  for (const b of [r.anterior, r.seguent]) {
    b.addEventListener('pointerdown', e => avis.pulsacio(e));
    b.addEventListener('click', e => avis.clic(e));
  }

  /* Teclat: ↓ o → = pas següent; ↑ o ← = pas anterior; R = torna a fer el pas actual. No fa res mentre hi ha la figura ampliada. */
  document.addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.defaultPrevented) return;
    if (document.querySelector('dialog[open]')) return;
    const t = e.target instanceof Element ? e.target : document.body;
    if (t.closest('input, select, textarea')) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      avis.teclat();
      actiu().seguent();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      avis.teclat();
      actiu().anterior();
    } else if ((e.key === 'r' || e.key === 'R') && !modeAraTu) {
      e.preventDefault();
      reproductor.repeteix();
    }
  });
  return reproductor;
}

arrel.Motor = Object.freeze({arrenca, inicia, text: t => text(t)});

})(globalThis);
