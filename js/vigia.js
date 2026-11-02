/* ═══════════════════════════════════════════════════════════════════
   js/vigia.js — Que la pàgina mai no es quedi en blanc sense dir per què
   ───────────────────────────────────────────────────────────────────
   Es carrega el primer, al <head>, i està escrit en JavaScript antic
   (ES5) perquè funcioni encara que el navegador no entengui la resta.
     · Si un fitxer (script o full d'estil) no es pot carregar, o hi ha
       un error de JavaScript, surt una caixa a dalt de la pàgina amb el
       missatge, el fitxer i el navegador (per poder-ho arreglar).
     · Només compten els fitxers i els errors d'aquest mateix lloc web.
       La web no demana res a cap altre servidor: el que ve de fora l'hi
       ha afegit algú altre (el comptador de visites que Cloudflare
       injecta, una extensió del navegador) i, si no es carrega (p. ex.
       Brave o un bloquejador de publicitat el bloquegen), la pàgina
       funciona igual. No es diu res.
     · Si al cap de VIGIA_MS la pàgina no ha dit que està llesta
       (portada.js i motor.js posen data-llest a <html>), surt la caixa
       igualment.
   Exporta «Vigia»: llesta() (la pàgina ja s'ha dibuixat) i
   problema(text) (un error que el codi ha capturat però s'ha de veure).
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

var VIGIA_MS = 10000;
var problemes = [];
var caixa = null;

function escriu() {
  var desti = document.body || document.documentElement;
  if (!desti) return;
  if (!caixa) {
    caixa = document.createElement('div');
    caixa.setAttribute('role', 'alert');
    caixa.style.cssText = 'position:fixed;left:8px;right:8px;top:8px;z-index:99999;padding:12px 14px;'
      + 'background:#fff4d6;color:#3a2a00;border:2px solid #9e1b32;border-radius:10px;'
      + 'font:14px/1.45 system-ui,sans-serif;white-space:pre-wrap;word-break:break-word;'
      + 'max-height:70vh;overflow:auto;box-shadow:0 4px 16px rgba(0,0,0,.25)';
    desti.appendChild(caixa);
  }
  caixa.textContent = 'La pàgina no s\'ha pogut carregar bé. Fes una captura d\'aquest missatge i envia-la al professor.\n\n'
    + problemes.join('\n') + '\n\nNavegador: ' + navigator.userAgent
    + '\nPantalla: ' + window.innerWidth + '×' + window.innerHeight + ' · ' + location.href;
}

/** L'adreça és d'aquest mateix lloc web? (Sense adreça, es considera que sí.) */
function delLloc(url) {
  if (!url) return true;
  var a = document.createElement('a');
  a.href = url;
  return a.protocol === location.protocol && a.host === location.host;
}

function afegeix(text) {
  if (problemes.length >= 8) return;
  problemes.push('• ' + text);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', escriu);
  else escriu();
}

// Errors de JavaScript i fitxers que no es carreguen (captura: els errors de càrrega no pugen)
window.addEventListener('error', function (e) {
  var t = e.target;
  if (t && t !== window && (t.tagName === 'SCRIPT' || t.tagName === 'LINK')) {
    if (delLloc(t.src || t.href)) afegeix('No s\'ha pogut carregar ' + (t.src || t.href));
  } else if (e.filename ? delLloc(e.filename) : e.message !== 'Script error.') {
    // («Script error.» sense fitxer: un error d'un script d'un altre lloc, que el navegador amaga)
    afegeix('Error: ' + (e.message || 'desconegut') + (e.filename ? ' (' + e.filename.replace(/^.*\//, '') + ':' + e.lineno + ')' : ''));
  }
}, true);
window.addEventListener('unhandledrejection', function (e) {
  var r = e.reason;
  afegeix('Error: ' + (r && (r.stack || r.message) ? String(r.message || r) : String(r)));
});

var llest = false;
setTimeout(function () {
  if (!llest && !document.documentElement.hasAttribute('data-llest')) afegeix('Al cap de ' + (VIGIA_MS / 1000) + ' s la pàgina encara no s\'ha dibuixat.');
}, VIGIA_MS);

arrel.Vigia = {
  llesta: function () { llest = true; document.documentElement.setAttribute('data-llest', ''); },
  problema: function (text) { afegeix(text); },
};

})(window);
