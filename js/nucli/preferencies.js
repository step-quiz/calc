/* ═══════════════════════════════════════════════════════════════════
   nucli/preferencies.js — El que el navegador recorda de l'alumne
   ───────────────────────────────────────────────────────────────────
   La seva calculadora (v34): «calc-model», l'id d'un model del catàleg.
   L'idioma de la seva calculadora (fase 3, v25): «calc-idioma». Només
   té sentit si el model té idiomes (model.idiomes); el primer idioma
   del model és el de per defecte. Sense memòria al navegador (mode
   privat, galetes bloquejades), tot continua funcionant amb el de
   per defecte.

   Exporta «Preferencies»: model(), desaModel(id), idioma(model), desaIdioma(valor).
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

const CLAU_MODEL = 'calc-model';
const CLAU_IDIOMA = 'calc-idioma';

function llegeix(clau) {
  try { return typeof localStorage !== 'undefined' ? localStorage.getItem(clau) : null; } catch (e) { return null; }
}
function desa(clau, valor) {
  try { localStorage.setItem(clau, valor); } catch (e) { /* navegador sense memòria: es queda per a aquesta pàgina */ }
}

/** L'idioma de la calculadora de l'alumne, d'entre els del model (null si el model no en té). */
function idioma(model) {
  const codis = model && model.idiomes ? Object.keys(model.idiomes) : [];
  if (!codis.length) return null;
  const desat = llegeix(CLAU_IDIOMA);
  return codis.includes(desat) ? desat : codis[0];
}

const desaIdioma = valor => desa(CLAU_IDIOMA, String(valor));

/** La calculadora que l'alumne va triar (l'id, o null si no n'ha triat cap). Models.idActual comprova que existeixi. */
const model = () => llegeix(CLAU_MODEL);
const desaModel = id => desa(CLAU_MODEL, String(id));

arrel.Preferencies = Object.freeze({model, desaModel, idioma, desaIdioma, CLAU_MODEL, CLAU_IDIOMA});

})(globalThis);
