/* ═══════════════════════════════════════════════════════════════════
   nucli/portada.js — La portada: una targeta per bloc, amb les seves fitxes
   ───────────────────────────────────────────────────────────────────
   Tot surt de les dades del model (M.dades): una fitxa nova apareix
   sola a la portada. Un bloc sense fitxes diu «Properament». Sense
   descripcions ni nombre de passos (David, 31/10/2026: la portada ha de
   ser simple). El peu porta la versió de la web (Models.VERSIO).
   A dalt, «La teva calculadora» (v34): en triar-ne una altra, es desa i
   es torna a dibuixar la portada amb les fitxes d'aquella calculadora.

   Depèn de Models i Preferencies. Exporta «Portada»: arrenca().
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

const escapa = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function dibuixa(M, models) {
  const contenidor = document.getElementById('blocs');
  document.title = `Calculadora ${M.curt} — Matemàtiques de Batxillerat`;
  const h1 = document.querySelector('.capcalera h1');
  if (h1) h1.textContent = `La calculadora ${M.curt}, pas a pas`;

  /* La calculadora (v34): l'alumne tria la seva; el navegador la recorda */
  const model = document.getElementById('model');
  if (model) {
    model.replaceChildren(...models.map(d => Object.assign(document.createElement('option'), {value: d.id, textContent: d.curt})));
    model.value = M.id;
    model.addEventListener('change', () => { Preferencies.desaModel(model.value); location.href = Models.adreca(model.value); });
  }

  /* L'idioma de la calculadora (fase 3): l'alumne el tria aquí o a qualsevol fitxa, i el navegador el recorda.
     Si la calculadora no té idiomes, el selector no surt. */
  const idioma = document.getElementById('idioma');
  if (idioma && M.idiomes) {
    idioma.replaceChildren(...Object.entries(M.idiomes).map(([v, nom]) => Object.assign(document.createElement('option'), {value: v, textContent: nom})));
    idioma.value = Preferencies.idioma(M);
    idioma.addEventListener('change', () => Preferencies.desaIdioma(idioma.value));
  } else if (idioma) {
    idioma.closest('label').hidden = true;
  }

  // Els blocs grans, numerats; els petits (petit: true, p. ex. «Abans de l'examen»), com a bombolles a part
  const {BLOCS, FITXES} = M.dades;
  const grans = BLOCS.filter(b => !b.petit), petits = BLOCS.filter(b => b.petit);
  contenidor.innerHTML = grans.map((b, i) => {
    const fitxes = FITXES.filter(f => f.bloc === b.id);
    const llista = fitxes.length
      ? '<ol class="llista">' + fitxes.map((f, j) =>
        `<li><a href="${escapa(Models.adreca(M.id, f.id))}"><span class="n">${String(j + 1).padStart(2, '0')}</span>`
        + `<span>${escapa(f.titol)}</span></a></li>`).join('') + '</ol>'
      : '<span class="properament">Properament</span>';
    return `<section class="bloc" id="${b.id}" style="--cat:${b.color}">`
      + `<span class="num">${String(i + 1).padStart(2, '0')}</span>`
      + `<h2>${escapa(b.titol)}</h2>${llista}</section>`;
  }).join('');
  const bombolles = document.createElement('div');
  bombolles.className = 'bombolles';
  bombolles.innerHTML = petits.map(b => FITXES.filter(f => f.bloc === b.id).map(f =>
    `<a class="bombolla" id="${b.id}" style="--cat:${b.color}" href="${escapa(Models.adreca(M.id, f.id))}">`
    + `<span class="bombolla-bloc">${escapa(b.titol)}</span><span>${escapa(f.titol)}</span></a>`).join('')).join('');
  contenidor.after(bombolles);

  const versio = document.querySelector('.peu .versio');
  if (versio) versio.textContent = 'Versió ' + Models.VERSIO;
}

/** Carrega la calculadora de l'alumne (?model=, la desada o la de per defecte) i dibuixa la portada. */
async function arrenca() {
  try {
    const [M, models] = await Promise.all([Models.carrega(), Models.descriptorsTots()]);
    dibuixa(M, models);
  } catch (e) {
    document.getElementById('blocs').innerHTML = '<p class="error-carrega">No s\'ha pogut carregar la calculadora. Comprova la connexió i torna a carregar la pàgina.</p>';
  }
}

arrel.Portada = Object.freeze({arrenca});

})(globalThis);
