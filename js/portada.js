/* ═══════════════════════════════════════════════════════════════════
   portada.js — La portada: una targeta per bloc, amb les seves fitxes
   ───────────────────────────────────────────────────────────────────
   Tot surt de Dades (fitxes.js): una fitxa nova apareix sola a la
   portada. Un bloc sense fitxes diu «Properament».
   ═══════════════════════════════════════════════════════════════════ */
(function () {
'use strict';

const escapa = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const contenidor = document.getElementById('blocs');

contenidor.innerHTML = Dades.BLOCS.map((b, i) => {
  const fitxes = Dades.FITXES.filter(f => f.bloc === b.id);
  const llista = fitxes.length
    ? '<ol class="llista">' + fitxes.map((f, j) =>
      `<li><a href="fitxa.html?id=${encodeURIComponent(f.id)}"><span class="n">${String(j + 1).padStart(2, '0')}</span>`
      + `<span>${escapa(f.titol)}</span><span class="passos">${f.passos.length} passos</span></a></li>`).join('') + '</ol>'
    : '<span class="properament">Properament</span>';
  return `<section class="bloc" id="${b.id}" style="--cat:${b.color}">`
    + `<span class="num">${String(i + 1).padStart(2, '0')}</span>`
    + `<h2>${escapa(b.titol)}</h2><p class="desc">${escapa(b.descripcio)}</p>${llista}</section>`;
}).join('');

})();
