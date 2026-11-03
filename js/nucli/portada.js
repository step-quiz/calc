/* ═══════════════════════════════════════════════════════════════════
   nucli/portada.js — La portada: una targeta per bloc, amb les seves fitxes
   ───────────────────────────────────────────────────────────────────
   Tot surt de les dades del model (M.dades): una fitxa nova apareix
   sola a la portada. Un bloc sense fitxes diu «Properament». Només els
   blocs de l'etapa triada (Batxillerat o ESO); els blocs petits, com a
   bombolles a dalt, abans dels blocs (o a baix, si l'alumne les hi envia: posaBombolles). A dalt, els selectors «Etapa» (només si n'hi ha més
   d'una amb fitxes), «La teva calculadora» i «Calculadora en» (si el
   model té idiomes); el navegador els recorda. El peu porta la versió.

   Depèn de Models i Preferencies. Exporta «Portada»: arrenca().
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

const escapa = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function dibuixa(M, models) {
  const contenidor = document.getElementById('blocs');
  const etapa = Models.etapa(Models.etapaActual());
  Preferencies.desaEtapa(etapa.id);         // l'última etapa vista (els enllaços de l'etapa per defecte no la porten)
  document.title = `Calculadora ${M.curt} — ${etapa.titol}`;
  const h1 = document.querySelector('.capcalera h1');
  if (h1) TriaCalculadora.titol(h1, M.id);
  const descripcio = document.querySelector('meta[name="description"]');
  if (descripcio) descripcio.setAttribute('content', etapa.descripcio);

  /* L'etapa: el selector només surt si n'hi ha més d'una per triar */
  const triaEtapa = document.getElementById('etapa');
  const visibles = Models.etapesVisibles(M);
  if (triaEtapa && visibles.length > 1) {
    triaEtapa.replaceChildren(...visibles.map(e => Object.assign(document.createElement('option'), {value: e.id, textContent: e.nom})));
    triaEtapa.value = etapa.id;
    triaEtapa.addEventListener('change', () => { Preferencies.desaEtapa(triaEtapa.value); location.href = Models.adreca({model: M.id, etapa: triaEtapa.value}); });
    triaEtapa.closest('label').hidden = false;
  }

  /* La calculadora: l'alumne tria la seva; el navegador la recorda */
  const model = document.getElementById('tria-model');
  if (model) model.replaceChildren(...[TriaCalculadora.boto(models, M.id, id => Models.adreca({model: id, etapa: etapa.id}))].filter(Boolean));

  /* L'idioma dels menús de la calculadora: l'alumne el tria aquí o a qualsevol fitxa, i el navegador el recorda.
     Si la calculadora no té idiomes, el selector no surt. */
  const idioma = document.getElementById('idioma');
  if (idioma && M.idiomes) {
    idioma.replaceChildren(...Object.entries(M.idiomes).map(([v, nom]) => Object.assign(document.createElement('option'), {value: v, textContent: nom})));
    idioma.value = Preferencies.idioma(M);
    idioma.addEventListener('change', () => Preferencies.desaIdioma(idioma.value));
  } else if (idioma) {
    idioma.closest('label').hidden = true;
  }

  // Només els blocs de l'etapa: els grans, numerats; els petits (petit: true, p. ex. «Abans de l'examen»), com a bombolles a part
  const {FITXES} = M.dades;
  const BLOCS = M.dades.BLOCS.filter(b => b.etapes.includes(etapa.id));
  const grans = BLOCS.filter(b => !b.petit), petits = BLOCS.filter(b => b.petit);
  const enllac = f => escapa(Models.adreca({model: M.id, etapa: etapa.id, fitxa: f.id}));
  contenidor.innerHTML = grans.length ? grans.map((b, i) => {
    const fitxes = FITXES.filter(f => f.bloc === b.id);
    const llista = fitxes.length
      ? '<ol class="llista">' + fitxes.map((f, j) =>
        `<li><a href="${enllac(f)}"><span class="n">${j + 1}</span>`
        + `<span>${escapa(f.titol)}</span></a></li>`).join('') + '</ol>'
      : '<span class="properament">Properament</span>';
    return `<section class="bloc" id="${b.id}" style="--cat:${b.color}">`
      + `<span class="num">T${i + 1}</span>`
      + `<h2>${escapa(b.titol)}</h2>${llista}</section>`;
  }).join('') : `<p class="properament etapa-buida">Properament: fitxes per a ${escapa(etapa.nom)}</p>`;
  const bombolles = document.createElement('div');
  bombolles.className = 'bombolles';
  bombolles.innerHTML = petits.map(b => FITXES.filter(f => f.bloc === b.id).map((f, k) =>
    `<a class="bombolla"${k ? '' : ` id="${b.id}"`} style="--cat:${b.color}" href="${enllac(f)}">`
    + `<span class="bombolla-bloc">${escapa(b.titol)}</span><span>${escapa(f.titol)}</span></a>`).join('')).join('');
  posaBombolles(contenidor, bombolles);

  const versio = document.querySelector('.peu .versio');
  if (versio) versio.textContent = 'Versió ' + Models.VERSIO;
}

/** A partir de quantes visites a la portada se suggereix enviar les bombolles a baix. */
const VISITES_PER_MOURE = 10;

/**
 * Les bombolles, a dalt dels blocs numerats (es veuen sense desplaçar la pàgina). A partir de la VISITES_PER_MOURE-a
 * visita en aquest navegador, un botó discret al final de la fila les envia a baix: l'alumne ja les coneix. A baix,
 * un botó les torna a dalt i unes fletxes conviden a baixar-hi (al marge esquerre si n'hi ha; si no, al racó de baix a
 * l'esquerra). Les fletxes s'amaguen quan les bombolles ja es veuen; en clicar-les, la pàgina hi baixa.
 */
function posaBombolles(contenidor, bombolles) {
  const visites = Preferencies.sumaVisita();
  const mou = document.createElement('button');
  mou.type = 'button';
  mou.className = 'bombolles-mou';
  bombolles.append(mou);
  const fletxes = document.createElement('button');
  fletxes.type = 'button';
  fletxes.className = 'fletxes-baix';
  fletxes.title = 'Hi ha més fitxes a baix';
  fletxes.setAttribute('aria-label', 'Hi ha més fitxes a baix');
  fletxes.innerHTML = '<svg viewBox="0 0 24 34" aria-hidden="true"><path d="M5 6l7 7 7-7M5 19l7 7 7-7" fill="none" '
    + 'stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  fletxes.addEventListener('click', () => {
    const suau = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    bombolles.scrollIntoView({block: 'nearest', behavior: suau ? 'smooth' : 'auto'});
  });
  document.body.append(fletxes);
  // Les fletxes només fan falta mentre les bombolles no es veuen
  if ('IntersectionObserver' in arrel) {
    // (el marge de baix: el peu, enganxat a baix, tapa una franja de la finestra)
    new IntersectionObserver(([e]) => fletxes.classList.toggle('a-la-vista', e.isIntersecting), {rootMargin: '0px 0px -48px 0px'}).observe(bombolles);
  }

  let aBaix = Preferencies.bombollesABaix();
  function posa() {
    if (aBaix) contenidor.after(bombolles); else contenidor.before(bombolles);
    mou.textContent = aBaix ? '↑ Torna-les a dalt' : '↓ Envia-les a baix';
    mou.title = aBaix ? 'Posa aquestes fitxes a dalt de la portada' : 'Ja les coneixes? Posa aquestes fitxes a baix de la portada';
    mou.hidden = !aBaix && visites < VISITES_PER_MOURE;
    fletxes.hidden = !aBaix;
  }
  mou.addEventListener('click', () => { aBaix = !aBaix; Preferencies.desaBombollesABaix(aBaix); posa(); });
  posa();
}

/** Carrega la calculadora de l'alumne (?model=, la desada o la de per defecte) i dibuixa la portada. */
async function arrenca() {
  try {
    const [M, models] = await Promise.all([Models.carrega(), Models.descriptorsTots()]);
    dibuixa(M, models);
    if (arrel.Vigia) Vigia.llesta();
  } catch (e) {
    if (arrel.Vigia) Vigia.problema('Portada: ' + (e && e.message || e));
    document.getElementById('blocs').innerHTML = '<p class="error-carrega">No s\'ha pogut carregar la calculadora. Comprova la connexió i torna a carregar la pàgina.</p>';
  }
}

arrel.Portada = Object.freeze({arrenca});

})(globalThis);
