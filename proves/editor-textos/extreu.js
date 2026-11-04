// proves/editor-textos/extreu.js — Les dades de l'artifact «Editor de textos de calc»: tots els textos de totes les
// fitxes de cada calculadora, tal com els veu la web (exercici + textos propis del model), els blocs i l'HTML de les
// tecles petites. Ús, des de l'arrel:  node proves/editor-textos/extreu.js > dades.json
// (construeix.js ho fa sol i ho posa a la plantilla).
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const arrel = path.join(__dirname, '..', '..');
const context = {console, URLSearchParams};
context.globalThis = context;
vm.createContext(context);
const executa = f => vm.runInContext(fs.readFileSync(path.join(arrel, f), 'utf8'), context, {filename: f});
executa('js/nucli/models.js');
executa('models/cataleg.js');
const {Models} = context;
for (const f of Models.fitxersExercicis) executa('exercicis/' + f);

const sortida = {versio: Models.VERSIO, models: [], blocs: null, fitxes: {}, tecles: {}, menus: {}, etapes: []};
const tecla = /\[\[([^\]]+)\]\]/g, menu = /\{\{([^}]+)\}\}/g;
for (const id of Models.ids) {
  const carpeta = Models.carpeta(id);
  executa(carpeta + 'model.js');
  const d = Models.descriptor(id);
  Models.carregant(id);
  for (const f of d.fitxers) executa(carpeta + f);
  Models.carregant(null);
  const M = Models.tanca(id);
  sortida.models.push({id, curt: M.curt});
  if (!sortida.blocs) sortida.blocs = M.dades.BLOCS.map(b => ({id: b.id, titol: b.titol, color: b.color, etapes: [...b.etapes], petit: Boolean(b.petit)}));
  const textos = [];
  sortida.fitxes[id] = M.dades.FITXES.map(f => {
    const ultim = f.passos[f.passos.length - 1];
    const o = {id: f.id, bloc: f.bloc, titol: f.titol, enunciat: f.enunciat, font: f.font || '',
      passos: f.passos.map(p => [p.text, p.error ? 1 : 0])};
    if (f.grup) o.grup = f.grup;
    if (f.tancament && ultim && ultim.error) o.tancament = f.tancament;
    if (f.provaTu) o.provaTu = {enunciat: f.provaTu.enunciat, solucio: f.provaTu.solucio};
    if (f.araTu && f.araTu.enunciat) o.araTu = {enunciat: f.araTu.enunciat};
    textos.push(o.titol, o.enunciat, o.tancament || '', ...o.passos.map(p => p[0]), o.provaTu ? o.provaTu.enunciat + o.provaTu.solucio : '', o.araTu ? o.araTu.enunciat : '');
    return o;
  });
  // L'HTML de totes les tecles (per si David n'escriu una de nova) i el text dels menús que surten als textos
  sortida.tecles[id] = {};
  for (const t of Object.keys(M.tecles.TECLES)) sortida.tecles[id][t] = M.tecles.html(t, {petita: true});
  sortida.menus[id] = {};
  for (const t of textos) for (const m of String(t).matchAll(menu)) sortida.menus[id][m[1]] = M.guions.textCalc(m[1], 'es');
  for (const t of textos) for (const m of String(t).matchAll(tecla)) if (!(m[1] in sortida.tecles[id])) sortida.tecles[id][m[1]] = `<span class="tecla petita">${m[1]}</span>`;
}
sortida.etapes = Models.etapesWeb ? Models.etapesWeb.map(e => ({id: e.id, nom: e.nom})) : [{id: 'batx', nom: 'Batxillerat'}, {id: 'eso', nom: 'ESO'}];
process.stdout.write(JSON.stringify(sortida));
