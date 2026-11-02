/* ═══════════════════════════════════════════════════════════════════
   nucli/dom.js — Petites eines per construir la pàgina
   ───────────────────────────────────────────────────────────────────
   Dom.element(etiqueta, atributs, fills): crea un element. Atributs
     especials: class, text (textContent), html (innerHTML). Un valor
     undefined, null o false no es posa; true posa l'atribut buit.
   Dom.icona(d): una icona SVG de 24×24 amb aquest camí.
   Exporta «Dom».
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

function element(etiqueta, atributs = {}, fills = []) {
  const e = document.createElement(etiqueta);
  for (const [k, v] of Object.entries(atributs)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === 'class') e.className = v;
    else if (k === 'text') e.textContent = v;
    else if (k === 'html') e.innerHTML = v;
    else e.setAttribute(k, v === true ? '' : v);
  }
  e.append(...[].concat(fills).filter(Boolean));
  return e;
}

const icona = d => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;

/** Els camins de les icones dels botons del reproductor. */
const ICONES = Object.freeze({
  anterior: 'M15.5 5 8.5 12l7 7z',
  seguent: 'M8.5 5l7 7-7 7z',
  repeteix: 'M12 4.5V1.8L7.6 5.6 12 9.4V6.7a5.3 5.3 0 1 1-5.3 5.3H4.5A7.5 7.5 0 1 0 12 4.5z',
});

arrel.Dom = Object.freeze({element, icona, ICONES});

})(globalThis);
