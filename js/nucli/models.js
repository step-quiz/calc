/* ═══════════════════════════════════════════════════════════════════
   nucli/models.js — El registre i el carregador de les calculadores
   ───────────────────────────────────────────────────────────────────
   Una calculadora («model») és una carpeta models/<id>/ amb:
     model.js   el descriptor: Models.descriu({id, nom, curt, idiomes, fitxers, estils, proves})
     …          els fitxers de «fitxers», en ordre; cadascun omple una
                part del model en construcció: const M = Models.obre('<id>');
                M.tecles = …; M.pantalla = …; M.guions = …; M.simulador = …;
                M.blocs = […]; M.fitxes.push(…)
   models/cataleg.js diu quins models hi ha: Models.cataleg(['<id>', …]);
   el primer és el de per defecte.

   El contracte (Models.tanca el comprova i congela el model):
     id, nom, curt, idiomes ({codi: nom} o null)
     tecles    {TECLES, TECLAT: {alcada, vidre, …}, html(id, opcions), existeix(id), htmlTeclat()}
               TECLES[id] = {etiqueta, nom, tipus, …}; una tecla de prefix (SHIFT, ALPHA…) porta
               prefix: '<capa>': el nucli dibuixa la tecla següent amb html(id, {prefix}) i, mentre
               s'anima, posa la classe «prefix-<capa>» al teclat (per ressaltar els rètols d'aquella capa)
     pantalla  {html(estat, idioma), TIPUS}
     guions    {textCalc(text, idioma)} i els constructors de pantalles que fan servir les fitxes
     simulador {pantalles(fitxa) → {pantalles, errors}}
     dades     {BLOCS, FITXES}
   El nucli (motor.js, portada.js, text.js) només fa servir el contracte:
   no coneix cap tecla ni cap menú de cap calculadora.

   L'aspecte de cada calculadora és als seus estils (models/<id>/estil.css), que
   es carreguen després de css/estil.css (el del nucli).

   Exporta «Models»: VERSIO, cataleg, descriu, obre, tanca, carrega,
   idActual, adreca, descriptorsTots, model, carpeta, dibuix (eines per dibuixar
   el teclat), CONTRACTE.
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

/**
 * Versió de la web. Quan es canvia qualsevol .js o .css, s'ha d'augmentar aquí I als «?v=» de
 * index.html i fitxa.html (la prova ho comprova): així cap navegador no fa servir fitxers vells.
 * Els fitxers dels models es carreguen amb aquest mateix «?v=».
 */
const VERSIO = '35';

/** Les parts que ha de donar cada model, amb les funcions o els camps que el nucli hi fa servir. */
const CONTRACTE = Object.freeze({
  tecles: ['TECLES', 'TECLAT', 'html', 'existeix', 'htmlTeclat'],
  pantalla: ['html', 'TIPUS'],
  guions: ['textCalc'],
  simulador: ['pantalles'],
});

let ids = [];                       // el catàleg, en ordre
const descriptors = {};             // id → descriptor (model.js)
const enObres = {};                 // id → model en construcció
const tancats = {};                 // id → model acabat (congelat)

function cataleg(llista) { ids = llista.slice(); }

function descriu(d) {
  if (!d || !d.id) throw new Error('Models.descriu: falta l\'id');
  descriptors[d.id] = Object.freeze(Object.assign({idiomes: null, estils: [], proves: []}, d));
}

/** El model en construcció (el fan servir els fitxers del model en carregar-se). */
function obre(id) {
  if (!enObres[id]) enObres[id] = {fitxes: []};
  return enObres[id];
}

/** Acaba el model: comprova el contracte i el congela. Torna el model. */
function tanca(id) {
  if (tancats[id]) return tancats[id];
  const d = descriptors[id], m = enObres[id];
  if (!d || !m) throw new Error(`El model «${id}» no s'ha carregat`);
  for (const [part, camps] of Object.entries(CONTRACTE)) {
    if (!m[part]) throw new Error(`El model «${id}» no té «${part}»`);
    for (const c of camps) if (m[part][c] === undefined) throw new Error(`El model «${id}»: a «${part}» li falta «${c}»`);
  }
  if (!Array.isArray(m.blocs)) throw new Error(`El model «${id}» no té blocs`);
  tancats[id] = Object.freeze({
    id: d.id, nom: d.nom, curt: d.curt, idiomes: d.idiomes,
    tecles: m.tecles, pantalla: m.pantalla, guions: m.guions, simulador: m.simulador,
    dades: Object.freeze({BLOCS: Object.freeze(m.blocs.slice()), FITXES: Object.freeze(m.fitxes.slice())}),
  });
  return tancats[id];
}

const carpeta = id => 'models/' + id + '/';

function parametre(nom) {
  try { return new URLSearchParams(location.search).get(nom); } catch (e) { return null; }
}

/**
 * El model d'aquesta pàgina: ?model=<id> si existeix; si no, el que l'alumne va triar (Preferencies, si s'ha
 * carregat); si no, el primer del catàleg (el de per defecte).
 */
function idActual() {
  const p = parametre('model');
  if (ids.includes(p)) return p;
  const desat = typeof Preferencies !== 'undefined' ? Preferencies.model() : null;
  return ids.includes(desat) ? desat : ids[0];
}

/** L'adreça d'una fitxa d'un model: el paràmetre model només hi va si no és el de per defecte (els enllaços d'abans no canvien). */
function adreca(id, fitxa) {
  const q = new URLSearchParams();
  if (id !== ids[0]) q.set('model', id);
  if (fitxa) q.set('id', fitxa);
  const s = q.toString();
  return (fitxa ? 'fitxa.html' : 'index.html') + (s ? '?' + s : '');
}

/** Els descriptors de tots els models del catàleg (per al selector de calculadora): carrega els model.js que faltin. */
async function descriptorsTots() {
  await Promise.all(ids.filter(id => !descriptors[id]).map(id => script(carpeta(id) + 'model.js')));
  return ids.map(id => descriptors[id]);
}

/** Carrega un script (en ordre, gràcies a async = false) amb el «?v=» de la versió. */
function script(src) {
  return new Promise((resol, falla) => {
    const s = document.createElement('script');
    s.src = src + '?v=' + VERSIO;
    s.async = false;
    s.onload = () => resol();
    s.onerror = () => falla(new Error('No s\'ha pogut carregar ' + src));
    document.head.append(s);
  });
}

/** Carrega un full d'estil (després dels que ja hi ha: el del model mana sobre el del nucli) amb el «?v=» de la versió. */
function estil(href) {
  return new Promise((resol, falla) => {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href + '?v=' + VERSIO;
    l.onload = () => resol();
    l.onerror = () => falla(new Error('No s\'ha pogut carregar ' + href));
    document.head.append(l);
  });
}

/**
 * Carrega el model (per defecte, el d'aquesta pàgina): el descriptor i, després, els seus fitxers i els seus
 * estils (es dibuixa quan tot és a punt, sense parpelleig). Torna una promesa del model.
 */
async function carrega(id = idActual()) {
  if (tancats[id]) return tancats[id];
  if (!descriptors[id]) await script(carpeta(id) + 'model.js');
  const d = descriptors[id];
  await Promise.all(d.fitxers.map(f => script(carpeta(id) + f)).concat(d.estils.map(f => estil(carpeta(id) + f))));
  return tanca(id);
}

/**
 * Eines per dibuixar el teclat (les fan servir els models a htmlTeclat): totes les mesures en cqw, és a dir,
 * en percentatge de l'amplada de la calculadora.
 *   caixa(classe, {x, y, w, h})  un rectangle (marc, creu…) amb la cantonada de dalt a l'esquerra a (x, y);
 *   cel({x, y, w, h}, html)      el lloc d'una tecla: un rectangle w × h centrat a (x, y) (vegeu .cel a estil.css).
 */
const dibuix = Object.freeze({
  caixa: (classe, q) => `<div class="${classe}" style="left:${q.x}cqw;top:${q.y}cqw;width:${q.w}cqw;height:${q.h}cqw"></div>`,
  cel: (q, html) => `<div class="cel" style="left:${q.x}cqw;top:${q.y}cqw;--w:${q.w}cqw;--h:${q.h}cqw">${html}</div>`,
});

/** Un model ja carregat (o null). */
const model = id => tancats[id] || null;

arrel.Models = Object.freeze({VERSIO, CONTRACTE, cataleg, descriu, obre, tanca, carrega, idActual, model, carpeta, dibuix, adreca, descriptorsTots,
  get ids() { return ids.slice(); }, descriptor: id => descriptors[id] || null});

})(globalThis);
