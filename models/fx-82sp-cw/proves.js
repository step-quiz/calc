/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/proves.js — Les proves pròpies de la fx-82SP CW
   ───────────────────────────────────────────────────────────────────
   Mòdul de Node (no va al navegador). El crida proves/comprova.js amb el
   model ja carregat i unes eines comunes, i torna:
     comprovaPantalla(p, on)  el format de cada tipus de pantalla de la CW
                              (menús de G.MENUS, indicadors, TeX amb KaTeX…);
     comprova({AMB_ARA_TU})   el que mira el conjunt: les traduccions al
                              català, la regla «E Mat/S Mat», el teclat
                              (posicions, solapaments) i els resultats
                              (calcul.js els torna a calcular).
   ═══════════════════════════════════════════════════════════════════ */
'use strict';

module.exports = function (M, {ok, error, compta, comprovaTeX}) {
  const {pantalla: Pantalla, guions: G, tecles: Tecles} = M;
  const TeX = (t, on) => comprovaTeX(t, on, Pantalla.OPCIONS_KATEX);
  const on0 = `model ${M.id}`;

  function comprovaPantalla(p, on) {
    if (!p || !Pantalla.TIPUS.includes(p.tipus)) return;   // el tipus ja l'ha comprovat comprova.js
    if (p.tipus === 'calc') {
      ok(p.ind && typeof p.ind === 'object', on, 'falten els indicadors');
      ok(!p.ind.ang || ['D', 'R', 'G'].includes(p.ind.ang), on, `unitat d'angle desconeguda (${p.ind.ang})`);
      ok(!(p.ind.fix && p.ind.sci), on, 'FIX i SCI alhora');
      if (!p.linia) { TeX(p.entrada, on + ' (entrada)'); TeX(p.resultat, on + ' (resultat)'); }
      ok(!p.marca || ['mat', 'ang', 'fix', 'sci', 'shift', 'alpha', 'hist', 'simp', 'verif', 'entrada', 'resultat'].includes(p.marca), on, `marca desconeguda (${p.marca})`);
      if (p.marca && Pantalla.INDICADORS.includes(p.marca)) ok(p.ind[p.marca], on, `es marca l'indicador ${p.marca}, però no hi és`);
      if (p.marca === 'hist') ok(p.ind.hist, on, 'es marca ▲, però no hi és');
    } else if (p.tipus === 'menu') {
      ok(Array.isArray(p.files) && p.files.length > 0, on, 'menú buit');
      ok(Number.isInteger(p.sel) && p.sel >= 0 && p.sel < p.files.length, on, `fila triada fora del menú (${p.sel})`);
      ok(p.files.filter(f => f.radio === 'on').length <= 1, on, 'més d\'un ◉');
      // El simulador navega pels menús per l'id i la clau de cada fila, mai pel text
      if (ok(p.id && G.MENUS[p.id], on, `menú sense id conegut (${p.id}): fes-lo amb els constructors de guions.js`)) {
        ok(p.files.every((f, k) => f.clau === G.MENUS[p.id][k][0]), on, `les files del menú ${p.id} no coincideixen amb G.MENUS`);
      }
      for (const f of p.files) ok(typeof f.t === 'string' && f.t.length > 0, on, 'fila sense text');
    } else if (p.tipus === 'home') {
      ok(p.sel >= 0 && p.sel < 4, on, 'aplicació triada fora de la pantalla HOME');
    } else if (p.tipus === 'definicio') {
      ok(/^[fg]$/.test(p.nom), on, 'la funció ha de ser f o g');
      TeX(p.nom + '(x)=' + (p.entrada || ''), on + ' (definició)');
    } else if (p.tipus === 'variables') {
      ok(Array.isArray(p.valors) && p.valors.length === 9, on, 'la llista de variables ha de tenir les 9 variables');
      ok(p.valors.some(([n]) => n === p.sel), on, `variable triada desconeguda (${p.sel})`);
    } else if (p.tipus === 'missatge') {
      ok(Array.isArray(p.linies) && p.linies.length > 0, on, 'missatge sense text');
    }
    // Que es pugui dibuixar (sense KaTeX, la pantalla escriu el TeX tal qual)
    ok(typeof Pantalla.html(p) === 'string', on, 'Pantalla.html falla');
  }

  function comprova({AMB_ARA_TU}) {
    const FITXES = M.dades.FITXES;

    /* Menús de G.MENUS: claus úniques dins de cada menú */
    for (const [id, files] of Object.entries(G.MENUS)) {
      ok(new Set(files.map(f => f[0])).size === files.length, `${on0} · menú ${id}`, 'claus repetides');
    }

    /* Calculadora en català: cada text de menú i cada {{…}} dels textos ha de tenir traducció a G.CATALA */
    for (const [id, files] of Object.entries(G.MENUS)) {
      for (const f of files) ok(Object.prototype.hasOwnProperty.call(G.CATALA, f[1]), `${on0} · menú ${id}`, `«${f[1]}» no té traducció al català (G.CATALA)`);
    }
    for (const f of FITXES) {
      const textos = [f.enunciat, ...f.passos.map(p => p.text)].concat(f.araTu ? [f.araTu.enunciat, f.araTu.error || '', ...(f.araTu.passos || []).map(p => p.text)] : []);
      for (const t of textos) {
        for (const m of String(t).replace(/\$[^$]*\$/g, '').matchAll(/\{\{([^}]+)\}\}/g)) {
          ok(Object.prototype.hasOwnProperty.call(G.CATALA, m[1]), `${on0} · fitxa ${f.id}`, `{{${m[1]}}} no té traducció al català (G.CATALA)`);
        }
      }
    }

    /* Un alumne pot tenir la calculadora en mode decimal. A cada fitxa, el primer resultat exacte (fracció, arrel o π)
       ha d'anar amb una frase que digui que surt així pel mode {{E Mat/S Mat}} (en aquell pas o abans). A l'ESO, sense
       el nom del mode: «configurada per donar resultats exactes». */
    const ESO = new Set(M.dades.BLOCS.filter(b => b.etapes.includes('eso')).map(b => b.id));
    for (const f of FITXES) {
      const frase = ESO.has(f.bloc) ? /resultats exactes/ : /E Mat\/S Mat/;
      let dit = frase.test(f.enunciat);
      f.passos.forEach((p, i) => {
        if (frase.test(p.text)) dit = true;
        const exacte = p.pantalla.tipus === 'calc' && /\\frac|\\sqrt|\\pi/.test(p.pantalla.resultat || '');
        if (exacte && !dit) error(`${on0} · fitxa ${f.id} · pas ${i + 1}`, 'primer resultat exacte: cal dir per què surt exacte (el mode)');
        if (exacte) dit = true;
        compta(1);
      });
    }

    /* La calculadora: cada tecla del catàleg té posició (o és a la peça de pàgina), i cap no en trepitja cap altra.
       Una posició és [x, y, diàmetre] (tecla rodona) o [x, y, amplada, alçada] (tecla rectangular, d'un altre teclat). */
    const T = Tecles.TECLAT;
    const aLaPagina = T.aLaPagina || [];
    for (const id of Object.keys(Tecles.TECLES)) {
      const n = (T.tecles[id] ? 1 : 0) + (aLaPagina.includes(id) ? 1 : 0);
      ok(n === 1, `${on0} · tecla ${id}`, 'ha de tenir posició al teclat (o ser a la peça de pàgina), i només una');
    }
    for (const id of [...Object.keys(T.tecles), ...aLaPagina]) ok(Tecles.existeix(id), `${on0} · TECLAT`, `tecla desconeguda (${id})`);
    const posicions = Object.entries(T.tecles).map(([id, [x, y, w, h]]) => [id, {x, y, w, h: h === undefined ? w : h, rodona: h === undefined}]);
    for (const [id, q] of posicions) {
      ok(q.x - q.w / 2 > 0 && q.x + q.w / 2 < 100 && q.y - q.h / 2 > T.vidre.y + T.vidre.h && q.y + q.h / 2 < T.alcada, `${on0} · tecla ${id}`, 'surt de la calculadora o toca la pantalla');
      for (const [id2, q2] of posicions) {
        if (id >= id2) continue;
        const separades = q.rodona && q2.rodona ? Math.hypot(q.x - q2.x, q.y - q2.y) >= (q.w + q2.w) / 2
          : Math.abs(q.x - q2.x) >= (q.w + q2.w) / 2 || Math.abs(q.y - q2.y) >= (q.h + q2.h) / 2;
        ok(separades, `${on0} · tecles ${id} i ${id2}`, 'es trepitgen');
      }
    }
    /* Totes les tecles del catàleg es poden dibuixar, i el teclat sencer també */
    for (const id of Object.keys(Tecles.TECLES)) ok(Tecles.html(id).includes('class="tecla'), `${on0} · tecla ${id}`, 'no es dibuixa');
    ok((Tecles.htmlTeclat().match(/data-tecla="/g) || []).length === Object.keys(Tecles.TECLES).length, on0, 'el teclat no dibuixa totes les tecles');

    /* Els resultats de les pantalles: es tornen a calcular i han de coincidir amb el que hi ha escrit (calcul.js) */
    const {comprovats, errors} = require('./calcul.js').comprova({FITXES: AMB_ARA_TU});
    compta(comprovats);
    ok(comprovats > 0, `${on0} · resultats`, 'no s\'ha comprovat cap resultat');
    for (const e of errors) error(`${on0} · resultat`, e);
  }

  return {comprovaPantalla, comprova};
};
