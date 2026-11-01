/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/proves.js — Les proves pròpies de la fx-82MS (Node)
   ───────────────────────────────────────────────────────────────────
   El crida proves/comprova.js amb el model ja carregat i unes eines
   comunes, i torna:
     comprovaPantalla(p, on)  el format de cada tipus de pantalla (càlcul,
                              opcions, pregunta), els indicadors i les marques;
     comprova({AMB_ARA_TU})   el teclat (posicions, solapaments), la regla
                              del signe negatiu i els resultats (calcul.js).
   ═══════════════════════════════════════════════════════════════════ */
'use strict';

module.exports = function (M, {ok, error, compta}) {
  const {pantalla: Pantalla, guions: G, tecles: Tecles, simulador: S} = M;
  const on0 = `model ${M.id}`;
  const CONEGUTS = new Set(Object.values(S.ESCRIU).concat(Object.values(S.ESCRIU_SHIFT), ['e', '°', 'r', 'g']).flatMap(t => [t, ...[...t]]));
  const RESULTAT = /^(-?\d+(\.\d+)?(E-?\d\d)?|-?\d+┘\d+(┘\d+)?)$/;
  const PREGUNTES = new Set(['Fix 0~9?', 'Sci 0~9?', 'Norm 1~2?']);

  function comprovaInd(ind, on) {
    if (!ok(ind && typeof ind === 'object', on, 'falten els indicadors')) return;
    ok(!ind.ang || ['D', 'R', 'G'].includes(ind.ang), on, `unitat d'angle desconeguda (${ind.ang})`);
    ok(!(ind.fix !== undefined && ind.sci !== undefined), on, 'FIX i SCI alhora');
    ok(ind.fix === undefined || (Number.isInteger(ind.fix) && ind.fix >= 0 && ind.fix <= 9), on, 'fix ha de ser un nombre de 0 a 9');
    ok(ind.sci === undefined || (Number.isInteger(ind.sci) && ind.sci >= 0 && ind.sci <= 9), on, 'sci ha de ser un nombre de 0 a 9');
  }

  function comprovaPantalla(p, on) {
    if (!p || !Pantalla.TIPUS.includes(p.tipus)) return;   // el tipus ja l'ha comprovat comprova.js
    comprovaInd(p.ind, on);
    const marques = Pantalla.INDICADORS.slice();
    if (p.tipus === 'calc') {
      ok(typeof p.entrada === 'string', on, 'l\'entrada ha de ser un text');
      for (const t of S.testimonis(p.entrada)) ok(CONEGUTS.has(t), on, `l'entrada «${p.entrada}» porta «${t}», que cap tecla no escriu`);
      ok(p.resultat === '' || RESULTAT.test(p.resultat), on, `resultat mal escrit (${p.resultat}): '0.5', '-16', '1┘7┘12' o '5E-03'`);
      if (p.resultat) ok(Pantalla.partsResultat(p.resultat).m.replace(/[-.┘]/g, '').length <= 10, on, `el resultat ${p.resultat} té més de 10 xifres`);
      marques.push('entrada', 'resultat');
      if (p.marca === 'resultat') ok(p.resultat, on, 'es marca el resultat, però no n\'hi ha');
    } else if (p.tipus === 'opcions') {
      if (ok(G.OPCIONS[p.id], on, `pantalla d'opcions desconeguda (${p.id})`)) {
        ok(p.titols.join('|') === G.OPCIONS[p.id].join('|'), on, `les opcions de ${p.id} no coincideixen amb G.OPCIONS`);
        p.titols.forEach((t, i) => marques.push('opcio-' + (i + 1)));
      }
    } else if (p.tipus === 'pregunta') {
      ok(PREGUNTES.has(p.text), on, `pregunta desconeguda (${p.text})`);
    }
    ok(!p.marca || marques.includes(p.marca), on, `marca desconeguda (${p.marca})`);
    if (p.marca && Pantalla.INDICADORS.includes(p.marca)) ok(p.ind && p.ind[p.marca], on, `es marca l'indicador ${p.marca}, però no hi és`);
    ok(typeof Pantalla.html(p) === 'string', on, 'Pantalla.html falla');
  }

  function comprova({AMB_ARA_TU}) {
    /* El teclat: cada tecla té una posició, és dins del cos, sota la pantalla, i cap no en trepitja cap altra */
    const T = Tecles.TECLAT;
    for (const id of Object.keys(Tecles.TECLES)) ok(T.tecles[id], `${on0} · tecla ${id}`, 'no té posició al teclat');
    for (const id of Object.keys(T.tecles)) ok(Tecles.existeix(id), `${on0} · TECLAT`, `tecla desconeguda (${id})`);
    const caixes = Object.entries(T.tecles);
    for (const [id, q] of caixes) {
      ok(['rodona', 'rect'].includes(q.forma), `${on0} · tecla ${id}`, 'forma ha de ser «rodona» o «rect»');
      ok(q.x - q.w / 2 > 0 && q.x + q.w / 2 < 100 && q.y - q.h / 2 > T.marc.y + T.marc.h && q.y + q.h / 2 < T.alcada,
        `${on0} · tecla ${id}`, 'surt del cos o toca la pantalla');
      for (const [id2, q2] of caixes) {
        if (id < id2) ok(Math.abs(q.x - q2.x) >= (q.w + q2.w) / 2 || Math.abs(q.y - q2.y) >= (q.h + q2.h) / 2, `${on0} · tecles ${id} i ${id2}`, 'es trepitgen');
      }
    }
    for (const id of Object.keys(Tecles.TECLES)) ok(Tecles.html(id).includes('class="tecla'), `${on0} · tecla ${id}`, 'no es dibuixa');
    ok((Tecles.htmlTeclat().match(/data-tecla="/g) || []).length === Object.keys(Tecles.TECLES).length, on0, 'el teclat no dibuixa totes les tecles');

    /* El signe negatiu (David, v34): a la fx-82MS és la tecla (−), [[neg]]. La resta, [[menys]], no pot anar on comença un nombre
       (al principi de l'entrada, després d'un parèntesi, d'una operació o d'una funció). */
    const COMENCA = new Set(['lpar', 'mes', 'menys', 'per', 'entre', 'pot', 'abc', 'neg', 'sin', 'cos', 'tan', 'log', 'ln', 'arrel', 'ac']);
    for (const f of AMB_ARA_TU) {
      f.passos.forEach((pas, i) => pas.tecles.forEach((t, j) => {
        if (t !== 'menys') return;
        const abans = j > 0 ? pas.tecles[j - 1] : null;
        ok(abans === null ? true : !COMENCA.has(abans), `${on0} · fitxa ${f.id} · pas ${i + 1}`, 'a la fx-82MS, el signe negatiu és [[neg]], no [[menys]]');
      }));
    }

    /* Els resultats: es tornen a calcular (calcul.js) */
    const {comprovats, errors} = require('./calcul.js')(M).comprova({FITXES: AMB_ARA_TU});
    compta(comprovats);
    ok(comprovats > 0, `${on0} · resultats`, 'no s\'ha comprovat cap resultat');
    for (const e of errors) error(`${on0} · resultat`, e);
  }

  return {comprovaPantalla, comprova};
};
