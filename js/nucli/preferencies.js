/* ═══════════════════════════════════════════════════════════════════
   nucli/preferencies.js — El que el navegador recorda de l'alumne
   ───────────────────────────────────────────────────────────────────
   «calc-model»   la seva calculadora (un id del catàleg)
   «calc-etapa»   l'última etapa que ha vist (la desa cada pàgina)
   «calc-idioma»  l'idioma dels menús de la seva calculadora (només si
                  el model té idiomes; el primer és el de per defecte)
   «calc-cursor»  el color del cursor que prem les tecles (un id de la
                  paleta de motor.js; si no n'hi ha, el blanc)
   «calc-visites» quantes vegades s'ha obert la portada en aquest navegador
   «calc-bombolles» 'baix' si l'alumne ha enviat les bombolles de la
                  portada a baix (si no, a dalt)
   Sense memòria al navegador (mode privat, galetes bloquejades), tot
   funciona amb els valors per defecte.

   Exporta «Preferencies»: model(), desaModel(id), idioma(model), desaIdioma(valor), etapa(), desaEtapa(id),
   cursor(), desaCursor(id), sumaVisita(), bombollesABaix(), desaBombollesABaix(sí/no).
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

const CLAU_MODEL = 'calc-model';
const CLAU_IDIOMA = 'calc-idioma';
const CLAU_ETAPA = 'calc-etapa';
const CLAU_CURSOR = 'calc-cursor';
const CLAU_VISITES = 'calc-visites';
const CLAU_BOMBOLLES = 'calc-bombolles';

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
/** El color del cursor que l'alumne va triar (l'id, o null). motor.js comprova que sigui de la paleta. */
const cursor = () => llegeix(CLAU_CURSOR);
const desaCursor = id => desa(CLAU_CURSOR, String(id));
/** Compta una visita a la portada i torna quantes n'hi ha hagut en aquest navegador (aquesta inclosa). */
function sumaVisita() {
  const n = (parseInt(llegeix(CLAU_VISITES), 10) || 0) + 1;
  desa(CLAU_VISITES, String(n));
  return n;
}
/** L'alumne ha enviat les bombolles de la portada a baix? */
const bombollesABaix = () => llegeix(CLAU_BOMBOLLES) === 'baix';
const desaBombollesABaix = si => desa(CLAU_BOMBOLLES, si ? 'baix' : 'dalt');

arrel.Preferencies = Object.freeze({model, desaModel, idioma, desaIdioma, etapa, desaEtapa, cursor, desaCursor,
  sumaVisita, bombollesABaix, desaBombollesABaix,
  CLAU_MODEL, CLAU_IDIOMA, CLAU_ETAPA, CLAU_CURSOR, CLAU_VISITES, CLAU_BOMBOLLES});

})(globalThis);
