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
   el primer és el de per defecte. També diu quines etapes té el web
   (v36): Models.etapes([{id, nom, lema, titol, descripcio}, …]); la
   primera és la de per defecte. Cada bloc d'un model diu a quines
   etapes surt (bloc.etapes = ['batx'], ['eso'] o ['eso', 'batx']).

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
   el teclat), CONTRACTE; i les etapes: etapes, etapa, etapaActual, etapaDe,
   etapesVisibles.
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

/**
 * Versió de la web. Quan es canvia qualsevol .js o .css, s'ha d'augmentar aquí I als «?v=» de
 * index.html i fitxa.html (la prova ho comprova): així cap navegador no fa servir fitxers vells.
 * Els fitxers dels models es carreguen amb aquest mateix «?v=».
 */
const VERSIO = '44';

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

/* ── Les etapes (v36): Batxillerat i ESO ───────────────────────────
   Són configuració del web, no de cap calculadora: el nucli les pot llegir. Cada bloc diu a quines etapes surt
   (bloc.etapes); una fitxa és de l'etapa del seu bloc. La portada només ensenya els blocs de l'etapa triada. */

let etapesWeb = [];                 // [{id, nom, lema, titol, descripcio}], en ordre; la primera, la de per defecte

function etapes(llista) { etapesWeb = Object.freeze(llista.map(e => Object.freeze(Object.assign({}, e)))); }

/** Una etapa (el descriptor) o null. */
const etapa = id => etapesWeb.find(e => e.id === id) || null;

/**
 * L'etapa d'aquesta pàgina: ?etapa=<id> si existeix; si no, l'última que l'alumne va veure (Preferencies, si
 * s'ha carregat); si no, la primera (la de per defecte).
 */
function etapaActual() {
  const p = parametre('etapa');
  if (etapa(p)) return p;
  const desada = typeof Preferencies !== 'undefined' ? Preferencies.etapa() : null;
  return etapa(desada) ? desada : etapesWeb[0].id;
}

/** D'una llista d'etapes (les d'un bloc), la que toca ara: l'actual si hi és; si no, la primera de la llista. */
const etapaDe = llista => (llista.includes(etapaActual()) ? etapaActual() : llista[0]);

/**
 * Les etapes que surten al selector de la portada per a un model: les que hi tenen alguna fitxa, en l'ordre del
 * catàleg, i l'actual encara que no en tingui (així, amb ?etapa=eso, es pot veure i tornar enrere). Una etapa sense
 * cap fitxa no surt: l'alumnat no veu una etapa buida.
 */
function etapesVisibles(M) {
  const actual = etapaActual();
  const blocsAmbFitxes = new Set(M.dades.FITXES.map(f => f.bloc));
  const ambFitxes = new Set(M.dades.BLOCS.filter(b => blocsAmbFitxes.has(b.id)).flatMap(b => b.etapes));
  return etapesWeb.filter(e => e.id === actual || ambFitxes.has(e.id));
}

/**
 * L'adreça de la portada (sense fitxa) o d'una fitxa: {model, etapa, fitxa}. Els paràmetres model i etapa només hi
 * van si no són els de per defecte: així els enllaços d'abans (Batxillerat, fx-82SP CW) no canvien.
 */
function adreca({model, etapa: e, fitxa} = {}) {
  const q = new URLSearchParams();
  if (model && model !== ids[0]) q.set('model', model);
  if (e && etapesWeb.length && e !== etapesWeb[0].id) q.set('etapa', e);
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
  get ids() { return ids.slice(); }, descriptor: id => descriptors[id] || null,
  etapes, etapa, etapaActual, etapaDe, etapesVisibles, get llistaEtapes() { return etapesWeb.slice(); }});

})(globalThis);
