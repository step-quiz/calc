/* ═══════════════════════════════════════════════════════════════════
   nucli/preferencies.js — El que el navegador recorda de l'alumne
   ───────────────────────────────────────────────────────────────────
   «calc-model»   la seva calculadora (un id del catàleg)
   «calc-etapa»   l'última etapa que ha vist (la desa cada pàgina)
   «calc-idioma»  l'idioma dels menús de la seva calculadora (només si
                  el model té idiomes; el primer és el de per defecte)
   Sense memòria al navegador (mode privat, galetes bloquejades), tot
   funciona amb els valors per defecte.

   Exporta «Preferencies»: model(), desaModel(id), idioma(model), desaIdioma(valor), etapa(), desaEtapa(id).
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

const CLAU_MODEL = 'calc-model';
const CLAU_IDIOMA = 'calc-idioma';
const CLAU_ETAPA = 'calc-etapa';

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

/** L'última etapa que l'alumne ha vist (l'id, o null). Models.etapaActual comprova que existeixi. */
const etapa = () => llegeix(CLAU_ETAPA);
const desaEtapa = id => desa(CLAU_ETAPA, String(id));

arrel.Preferencies = Object.freeze({model, desaModel, idioma, desaIdioma, etapa, desaEtapa, CLAU_MODEL, CLAU_IDIOMA, CLAU_ETAPA});

})(globalThis);
