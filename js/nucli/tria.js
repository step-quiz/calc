/* ═══════════════════════════════════════════════════════════════════
   nucli/tria.js — «Escollir calculadora»: el botó i la finestra
   ───────────────────────────────────────────────────────────────────
   A la capçalera de la portada i de la fitxa, un botó «Escollir
   calculadora» (ressaltat 1,5 s si l'alumne encara no n'ha triat cap en
   aquest navegador) o «Canviar de calculadora» (si ja n'ha triat una).
   En clicar-lo s'obre una finestra (<dialog>) amb una
   graella de totes les calculadores del catàleg (3 columnes; menys a
   les pantalles estretes): la imatge (models/<id>/<imatge> del
   descriptor, tan alta com permet la casella) i el nom curt. La que es
   fa servir ara té la vora verda. En
   clicar-ne una, es desa (Preferencies) i s'obre la mateixa pàgina amb
   aquella calculadora. Esc, la creu o un clic fora la tanquen.

   TriaCalculadora.boto(descriptors, actual, adreca) → l'element del botó
     (la finestra s'afegeix al <body>); adreca(id) = l'adreça on anar.
   TriaCalculadora.titol(element, id) → el títol «La calculadora <nom>,
     pas a pas», amb la foto de la calculadora en passar el ratolí pel nom.
   No fa servir Dom (la portada no el carrega). Exporta «TriaCalculadora».
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

function crea(etiqueta, classe, text) {
  const e = document.createElement(etiqueta);
  if (classe) e.className = classe;
  if (text) e.textContent = text;
  return e;
}

/** La finestra amb la graella de calculadores. */
function finestra(descriptors, actual, adreca) {
  const dlg = crea('dialog', 'tria-finestra');
  dlg.setAttribute('aria-labelledby', 'tria-titol');
  const titol = crea('h2', 'tria-titol', 'Escull la teva calculadora');
  titol.id = 'tria-titol';
  const tanca = crea('button', 'tria-tanca', '×');
  tanca.type = 'button';
  tanca.setAttribute('aria-label', 'Tanca');
  tanca.addEventListener('click', () => dlg.close());

  const graella = crea('div', 'tria-graella');
  for (const d of descriptors) {
    const b = crea('button', 'tria-casella' + (d.id === actual ? ' actual' : ''));
    b.type = 'button';
    b.title = d.nom;
    if (d.imatge) {
      const img = crea('img');
      img.src = Models.carpeta(d.id) + d.imatge + '?v=' + Models.VERSIO;
      img.alt = '';
      img.loading = 'lazy';
      b.append(img);
    }
    b.append(crea('span', 'tria-nom', d.curt));
    b.addEventListener('click', () => {
      if (d.id === actual) { dlg.close(); return; }
      Preferencies.desaModel(d.id);
      location.href = adreca(d.id);
    });
    graella.append(b);
  }
  // Un clic fora de la caixa (al fons enfosquit) també la tanca
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.append(tanca, titol, graella);
  return dlg;
}

/** El botó de la capçalera (null si només hi ha una calculadora). */
function boto(descriptors, actual, adreca) {
  if (!descriptors || descriptors.length < 2) return null;
  // Si l'alumne encara no n'ha triat cap en aquest navegador: «Escollir calculadora», ressaltat 1,5 s en obrir la pàgina.
  // Si ja n'ha triat una: «Canviar de calculadora», sense ressaltat.
  const triada = descriptors.some(d => d.id === Preferencies.model());
  const b = crea('button', 'tria-boto' + (triada ? '' : ' destaca'), triada ? 'Canviar de calculadora' : 'Escollir calculadora');
  b.type = 'button';
  if (!triada) b.addEventListener('animationend', () => b.classList.remove('destaca'));
  b.setAttribute('aria-haspopup', 'dialog');
  let dlg = null;
  b.addEventListener('click', () => {
    if (!dlg) { dlg = finestra(descriptors, actual, adreca); document.body.append(dlg); }
    dlg.showModal();
    const actualEl = dlg.querySelector('.tria-casella.actual') || dlg.querySelector('.tria-casella');
    if (actualEl) actualEl.focus();
  });
  return b;
}

/**
 * El títol de la capçalera, «La calculadora <nom>, pas a pas», dins de l'element que es passa. En passar el ratolí pel
 * nom (o en donar-li el focus), surt una foto petita de la calculadora (la imatge del descriptor).
 */
function titol(el, id) {
  const d = Models.descriptor(id);
  const nom = crea('span', 'nom-calc', d ? d.curt : id);
  if (d && d.imatge) {
    nom.tabIndex = 0;
    const img = crea('img', 'nom-calc-foto');
    img.src = Models.carpeta(id) + d.imatge + '?v=' + Models.VERSIO;
    img.alt = d.nom;
    nom.append(img);
  }
  el.replaceChildren('La calculadora ', nom, ', pas a pas');
  return el;
}

arrel.TriaCalculadora = Object.freeze({boto, titol});

})(globalThis);
