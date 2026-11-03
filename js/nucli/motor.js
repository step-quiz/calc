/* ═══════════════════════════════════════════════════════════════════
   nucli/motor.js — La pàgina d'una fitxa
   ───────────────────────────────────────────────────────────────────
   Construeix fitxa.html?id=… en dues columnes:
     · a l'esquerra, tot el que es llegeix: l'enunciat (amb la font i
       la figura, si n'hi ha), els botons ◀ ↻ ▶, la velocitat, la llista
       de passos i l'«Ara tu» o el «Prova-ho tu» (en acabar);
     · a la dreta, només la calculadora (la dibuixa el model).
   El peu surt sencer en obrir la fitxa i, al cap de PEU_SENCER_MS,
   només hi queda «© 2026 David Arso Civil».
   El reproductor pas a pas és a reproductor.js.

   Si l'últim pas d'una fitxa és un error, s'hi afegeix un pas de
   tancament sense tecles: la pantalla torna al resultat bo i el text és
   fitxa.tancament (la manera correcta i la resposta).

   No coneix cap calculadora: tot el que en sap ho demana al model.
   Depèn de KaTeX, Models, Preferencies, Text, Dom i Reproductor (i avisa js/vigia.js quan ha acabat).
   Exporta «Motor»: arrenca(), inicia(model, id, contenidor).
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

const {element, icona, ICONES} = Dom;
const {escapa, formula} = Text;

/** Velocitats de l'animació: factor que multiplica les durades de Reproductor.TEMPS. */
const VELOCITATS = Object.freeze([['lenta', 3.46], ['normal', 1.90], ['ràpida', 0.83]]);
const PER_DEFECTE = 1.90;
/** Quant de temps es veu la bombolla de la font si no es tanca abans. */
const FONT_MS = 8000;
/** L'avís de les fletxes del teclat: surt després de tants clics de ratolí a ◀ ▶ i es tanca sol al cap de tant. */
const AVIS_CLICS = 5;
const AVIS_DURADA = 10000;
const AVIS_TEXT = 'Recorda: pots fer servir les fletxes ↑, ↓ del teclat per fer tots els passos';

/** El peu: l'autor, que sempre es veu, i la resta, que s'esvaeix al cap de PEU_SENCER_MS (i en ESVAIR_MS). */
const PEU = '<span class="peu-autor">© 2026 <strong>David Arso Civil</strong></span><span class="peu-resta">. Ús educatiu lliure. '
  + 'Prohibida la comercialització i la modificació (<a rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>). '
  + 'Web no oficial, sense relació amb el fabricant de la calculadora. <span class="versio">Versió ' + Models.VERSIO + '</span></span>';
const PEU_SENCER_MS = 5000;
const ESVAIR_MS = 500;

const ICONA_FONT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2.5h8.5L19 7v14.5H6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'
  + '<path d="M14 2.5V7.5h5M9 12h7M9 16h7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const CURSOR_HTML = '<svg viewBox="0 0 22 30" aria-hidden="true"><path d="M2 2 L2 24 L7.6 18.8 L11.4 27.4 L15 25.8 L11.3 17.4 L18.6 17.4 Z" '
  + 'style="fill:var(--cursor-fons, #fff); stroke:var(--cursor-vora, #111)" stroke-width="1.6" stroke-linejoin="round"/></svg>';

/** El model, l'idioma dels menús de la calculadora, l'etapa i el creador de textos d'aquesta pàgina (els posa inicia). */
let M = null;
let MODELS = [];
let IDIOMA = null;
let ETAPA = null;
let text = t => escapa(t);

function parametre(nom) {
  try { return new URLSearchParams(location.search).get(nom); } catch (e) { return null; }
}

/** Una palanca del laboratori d'UX (nucli/ux.js) és activa? Sense ?ux=, mai. */
const ux = p => Boolean(arrel.UX && arrel.UX.te(p));


/* ── Capçalera: on som, la calculadora i l'idioma dels menús ─────────── */

/**
 * On som, com a la portada: «T1 · <títol del bloc>» (els blocs grans de l'etapa es numeren T1, T2…; un bloc petit, només
 * el títol) i «1. <títol de la fitxa>» (el número dins del bloc).
 */
function titolFitxa(fitxa, bloc, germanes) {
  const grans = M.dades.BLOCS.filter(b => b.etapes.includes(ETAPA) && !b.petit);
  const t = grans.findIndex(b => b.id === bloc.id);
  const n = germanes.findIndex(f => f.id === fitxa.id) + 1;
  return element('div', {class: 'on-som'}, [
    element('p', {class: 'on-som-bloc', text: (t >= 0 ? `T${t + 1} · ` : '') + bloc.titol}),
    element('p', {class: 'on-som-fitxa', text: `${n}. ${fitxa.titol}`}),
  ]);
}

/** «Escollir calculadora» (nucli/tria.js): en triar-ne una altra, es desa i s'obre la mateixa fitxa (el mateix id) en aquella calculadora. */
function selectorModel(fitxa) {
  return TriaCalculadora.boto(MODELS, M.id, id => Models.adreca({model: id, etapa: ETAPA, fitxa: fitxa.id}));
}

/**
 * Els colors que l'alumne pot triar per al cursor que prem les tecles (⚙ → «Color del cursor»). El primer, el blanc, és
 * el de per defecte. Cap negre: sobre les calculadores fosques no es veuria. La vora del cursor és fosca sobre els
 * colors clars i blanca sobre els foscos (luminància), perquè sempre es distingeixi de la tecla.
 */
const COLORS_CURSOR = Object.freeze([
  ['blanc', 'Blanc', '#ffffff'], ['groc', 'Groc', '#ffd60a'], ['ambre', 'Ambre', '#ffa600'], ['taronja', 'Taronja', '#ff6b1a'],
  ['vermell', 'Vermell', '#e5383b'], ['gerd', 'Gerd', '#c9184a'], ['rosa', 'Rosa', '#ff8fc7'], ['magenta', 'Magenta', '#d020d6'],
  ['lila', 'Lila', '#b197fc'], ['violeta', 'Violeta', '#7b2ff7'], ['blau', 'Blau', '#2563eb'], ['cel', 'Blau cel', '#4cc9f0'],
  ['turquesa', 'Turquesa', '#14e0c0'], ['verd', 'Verd', '#22c55e'], ['llima', 'Llima', '#b5f23a'], ['gris', 'Gris', '#a0a7b4'],
].map(([id, nom, color]) => Object.freeze({id, nom, color})));

/** Vora del cursor per a un color: fosca si el color és clar, blanca si és fosc (luminància relativa sRGB). */
function voraCursor(hex) {
  const lin = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = [1, 3, 5].map(i => lin(parseInt(hex.slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.22 ? '#111111' : '#ffffff';
}

/** Posa el color del cursor (variables CSS --cursor-fons i --cursor-vora de la pàgina). */
function aplicaColorCursor(id) {
  const c = COLORS_CURSOR.find(x => x.id === id) || COLORS_CURSOR[0];
  document.documentElement.style.setProperty('--cursor-fons', c.color);
  document.documentElement.style.setProperty('--cursor-vora', voraCursor(c.color));
  return c.id;
}

/** «Color del cursor» (dins del ⚙): 16 mostres; en clicar-ne una, el cursor canvia a l'instant i el color es desa. */
function selectorColorCursor() {
  let actual = aplicaColorCursor(Preferencies.cursor());
  const mostres = COLORS_CURSOR.map(c => {
    const b = element('button', {class: 'mostra-cursor', type: 'button', title: c.nom, 'aria-label': c.nom,
      'aria-pressed': String(c.id === actual)});
    b.style.setProperty('--mostra', c.color);
    b.addEventListener('click', () => {
      actual = aplicaColorCursor(c.id);
      Preferencies.desaCursor(c.id);
      for (const m of mostres) m.setAttribute('aria-pressed', String(m === b));
    });
    return b;
  });
  return element('div', {class: 'tria-cursor', role: 'group', 'aria-label': 'Color del cursor'}, [
    element('span', {class: 'tria-cursor-nom', text: 'Color del cursor'}),
    element('div', {class: 'mostres-cursor'}, mostres),
  ]);
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
  // L'enunciat dins d'una caixa amb el botó per plegar-lo (A2): icona de comprimir en vertical o, plegat, d'expandir
  const ICONA_PLEC = (classe, d) => `<svg class="${classe}" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  r.plegaEnunciat = element('button', {class: 'plega-enunciat', type: 'button', title: 'Plega o desplega l\'enunciat',
    'aria-label': 'Plega o desplega l\'enunciat', 'aria-expanded': 'true',
    html: ICONA_PLEC('comprimeix', 'M12 3v6M9 6l3 3 3-3M12 21v-6M9 18l3-3 3 3M4 12h16') + ICONA_PLEC('expandeix', 'M12 9V3M9 6l3-3 3 3M12 15v6M9 18l3 3 3-3M4 12h16')});
  r.caixaEnunciat = element('div', {class: 'enunciat-caixa'}, [r.enunciat, r.plegaEnunciat]);
  if (font) r.enunciat.prepend(font, ' ');
  const figura = botoFigura(fitxa);
  if (figura) r.enunciat.prepend(figura);
  for (const [nom, factor] of VELOCITATS) r.velocitat.append(element('option', {value: String(factor), text: nom}));
  r.velocitat.value = String(PER_DEFECTE);
  // Palanca A1: només es veu el pas actual; aquest botó ensenya o amaga la llista sencera
  const totsElsPassos = ux('a1') ? element('button', {class: 'ux-tots', type: 'button', 'aria-pressed': 'false', text: 'Tots els passos'}) : null;
  if (totsElsPassos) totsElsPassos.addEventListener('click', () => {
    const tots = document.documentElement.classList.toggle('ux-a1-tots');
    totsElsPassos.setAttribute('aria-pressed', String(tots));
  });
  r.reproductor.append(...[
    element('div', {class: 'botons'}, [r.anterior, r.repeteix, r.seguent]),
    totsElsPassos,
    element('label', {class: 'velocitat', for: 'velocitat', text: 'Velocitat '}, [r.velocitat]),
  ].filter(Boolean));
  // Palanca A2: l'enunciat sempre es veu sencer; en clicar-lo, es plega a una línia (i es torna a desplegar)
  if (ux('a2')) r.enunciat.title = 'Clica per plegar o desplegar l\'enunciat';
  function plegaEnunciat() {
    // L'alçada sencera, mesurada ara, fa d'origen o de destí de la cortina (estil.css, A2). En acabar de desplegar-se,
    // l'enunciat torna a no tenir cap alçada màxima (.mesurat fora).
    const en = r.enunciat;
    // (a l'ordinador, com a molt el 34 % de la finestra: estil.css hi limita l'enunciat desplegat)
    const sostre = matchMedia('(min-width: 1000px)').matches ? 0.34 * innerHeight : Infinity;
    en.style.setProperty('--alt-enunciat', Math.min(en.scrollHeight, sostre) + 'px');
    if (en.classList.contains('plegat')) {
      en.classList.add('mesurat');
      en.classList.remove('plegat');
    } else {
      en.classList.add('mesurat');
      void en.offsetHeight;                         // que la cortina comenci de l'alçada sencera
      en.classList.add('plegat');
    }
    if (r.plegaEnunciat) r.plegaEnunciat.setAttribute('aria-expanded', String(!en.classList.contains('plegat')));
  }
  if (ux('a2')) r.enunciat.addEventListener('click', e => {
    if (!e.target.closest('button, a, dialog') && !r.caixaEnunciat.classList.contains('enunciat-curt')) plegaEnunciat();
  });
  // Un enunciat d'una sola línia de text (encara que porti una fracció alta) no es pot plegar: no s'hi guanyaria res.
  // Sense icona ni clic (.enunciat-curt). Les línies es compten amb els rectangles del text: un rectangle que comença
  // per sota del final de la línia d'ara n'obre una de nova (els trossos d'una fracció es solapen amb la seva línia).
  function linies(en) {
    const rang = document.createRange();
    rang.selectNodeContents(en);
    const rs = [...rang.getClientRects()].filter(q => q.width > 0 && q.height > 0).sort((p, q) => p.top - q.top);
    let n = 0, fi = -Infinity;
    for (const q of rs) {
      if (q.top >= fi - 2) { n++; fi = q.bottom; } else fi = Math.max(fi, q.bottom);
    }
    return n;
  }
  function revisaCurt() {
    const en = r.enunciat;
    if (en.classList.contains('plegat') || en.classList.contains('mesurat')) return;
    const curt = linies(en) <= 1;
    r.caixaEnunciat.classList.toggle('enunciat-curt', curt);
    en.title = curt ? '' : 'Clica per plegar o desplegar l\'enunciat';
  }
  if (ux('a2')) {
    requestAnimationFrame(revisaCurt);
    // Quan l'enunciat canvia de mida (lletres de les fórmules que acaben d'arribar, finestra més estreta), es torna a mirar
    if ('ResizeObserver' in arrel) new ResizeObserver(() => requestAnimationFrame(revisaCurt)).observe(r.enunciat);
    addEventListener('resize', revisaCurt);
  }
  if (ux('a2')) r.plegaEnunciat.addEventListener('click', plegaEnunciat);
  if (ux('a2')) r.enunciat.addEventListener('transitionend', ev => {
    if (ev.propertyName === 'max-height' && !r.enunciat.classList.contains('plegat')) r.enunciat.classList.remove('mesurat');
  });
  // Palanques C4 i E2: la frase del pas actual surt fora de la llista, en gran (sota la calculadora o a la dreta)
  if (ux('c4') || ux('e2')) {
    r.fraseGran = element('div', {class: 'frase-gran', 'aria-hidden': 'true'});
    document.documentElement.classList.add('ux-frase-fora');
  }

  r.calculadora = element('div', {class: 'calculadora', style: `aspect-ratio:100/${T.alcada};--alcada-rel:${T.alcada / 100}`, html: M.tecles.htmlTeclat()});
  r.calculadora.append(element('div', {class: 'lcd', style: `left:${T.vidre.x}cqw;top:${T.vidre.y}cqw;width:${T.vidre.w}cqw;height:${T.vidre.h}cqw`}, [r.lcd]));
  r.teclat = r.calculadora;
  if (fitxa.araTu) { r.araTu = construeixAraTu(fitxa.araTu); r.alFinal.push(r.araTu); }
  if (fitxa.provaTu) r.alFinal.push(construeixProvaTu(fitxa.provaTu));

  r.escenari = element('div', {class: 'escenari'}, [r.calculadora, r.efectes, r.cursor]);
  // C4: la frase, sota la calculadora. E2 (sense C4): la frase i els botons, en una columna a la dreta de la calculadora.
  let costat = null;
  if (r.fraseGran && ux('c4')) r.escenari.append(r.fraseGran);
  else if (r.fraseGran) costat = element('div', {class: 'costat'}, [r.fraseGran, r.reproductor]);
  // D2: a la pantalla de l'«Ara tu», un botó per tornar als passos
  r.tornaPassos = ux('d2') && r.alFinal.length ? element('button', {class: 'ux-torna-passos', type: 'button', text: '← Torna als passos'}) : null;

  // El peu: sencer en obrir la fitxa; al cap de PEU_SENCER_MS, només l'autor
  const peu = element('footer', {class: 'peu', html: PEU});
  setTimeout(() => {
    peu.classList.add('esvaint');
    setTimeout(() => peu.classList.add('curt'), ESVAIR_MS);
  }, PEU_SENCER_MS);

  // A3: capçalera mínima, amb «Escollir calculadora» i l'idioma plegats dins d'un ⚙
  const tries = element('div', {class: 'tries'}, [selectorModel(fitxa), selectorIdioma(), ux('a3') ? selectorColorCursor() : null]);
  if (!ux('a3')) aplicaColorCursor(Preferencies.cursor());
  const ajustos = ux('a3') ? element('details', {class: 'ux-ajustos'}, [element('summary', {title: 'Ajustos', 'aria-label': 'Ajustos', text: '⚙'}), tries]) : tries;

  contenidor.replaceChildren(
    element('header', {class: 'capcalera capcalera-de-fitxa'}, [
      element('a', {class: 'torna', href: Models.adreca({model: M.id, etapa: ETAPA}) + '#' + bloc.id, text: '← Fitxes'}),
      titolFitxa(fitxa, bloc, germanes),
      ajustos,
      // Avisos que només mostra el CSS quan cal: navegador sense unitats cqw, tauleta en vertical
      element('p', {class: 'avis-capcalera avis-navegador', text: 'Aquest navegador és massa antic per dibuixar la calculadora. Actualitza\'l (Chrome 105 o posterior).'}),
      element('p', {class: 'avis-capcalera avis-gira', text: 'Gira la tauleta: en horitzontal veuràs alhora la calculadora i les explicacions.'}),
    ]),
    element('main', {class: 'contingut'}, [
      element('div', {class: 'columna'}, [
        element('h1', {class: 'nomes-lectors', text: fitxa.titol}),
        r.tornaPassos,
        r.caixaEnunciat,
        costat ? null : r.reproductor,
        r.passos,
        ...r.alFinal.map(a => a.el),
        r.anunci,
      ]),
      r.escenari,
      costat,
    ]),
    peu,
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
/**
 * Les fletxes que conviden a passar al pas següent (reproductor.js, .convida) surten primer ben visibles, en cercles
 * grocs, durant uns segons que s'escurcen a cada visita al web: 4 s la primera, 3,5, 2,5, 1,5, 0,5 i, a partir de la
 * sisena, gens (només les fletxes discretes). estil.css llegeix --convida-fort i .sense-convida-fort.
 */
const CONVIT_FORT_S = Object.freeze([4, 3.5, 2.5, 1.5, 0.5]);
function posaConvitFort(visita) {
  const s = CONVIT_FORT_S[Math.max(1, visita) - 1] || 0;
  document.documentElement.style.setProperty('--convida-fort', s + 's');
  document.documentElement.classList.toggle('sense-convida-fort', !s);
}

async function arrenca(contenidor = document.getElementById('fitxa')) {
  if (typeof katex === 'undefined') {
    return errorCarrega(contenidor, 'No s\'ha pogut carregar KaTeX, la biblioteca que dibuixa les fórmules. Comprova la connexió i torna a carregar la pàgina.');
  }
  let model;
  try { [model, MODELS] = await Promise.all([Models.carrega(), Models.descriptorsTots()]); } catch (e) {
    if (arrel.Vigia) Vigia.problema('Fitxa: ' + (e && e.message || e));
    return errorCarrega(contenidor, 'No s\'ha pogut carregar la calculadora. Comprova la connexió i torna a carregar la pàgina.');
  }
  posaConvitFort(Preferencies.visita());
  arrel.fitxa = inicia(model, parametre('id'), contenidor);
  if (arrel.Vigia) Vigia.llesta();
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
  // D2: l'«Ara tu» i el «Prova-ho tu» no surten sols en acabar; s'hi va amb ▶ des de l'últim pas, i tornen amb un botó
  const reproductor = Reproductor.crea(ctx, r, ambFinal, temps, {abans: surtAraTu, finalAPart: Boolean(r.tornaPassos),
    nomFinal: fitxa.araTu ? 'Ara tu' : 'Prova-ho tu'});
  if (r.tornaPassos) r.tornaPassos.addEventListener('click', () => { surtAraTu(); reproductor.salta(reproductor.pas); });
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
