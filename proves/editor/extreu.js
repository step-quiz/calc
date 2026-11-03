// proves/editor/extreu.js — Extreu els textos editables (exercicis comuns i textos propis de cada calculadora) per a
// l'artifact «Editor d'enunciats». Ús: node proves/editor/extreu.js . > dades.json (es posa a plantilla.html, a /*DADES*/).
const fs = require('fs'), path = require('path'), vm = require('vm');
const arrel = process.argv[2];
const context = {console, URLSearchParams}; context.globalThis = context; vm.createContext(context);
const executa = f => vm.runInContext(fs.readFileSync(path.join(arrel, f), 'utf8'), context, {filename: f});
executa('js/nucli/models.js'); executa('models/cataleg.js');
const Models = context.Models;
// La llista de fitxers d'exercicis i els blocs: es llegeixen tal com els carrega la web
const llistaEx = vm.runInContext('Models', context);
const fitxersEx = fs.readFileSync(path.join(arrel, 'models/cataleg.js'), 'utf8').match(/Models\.exercicis\(\[([\s\S]*?)\]\)/)[1].match(/'([^']+)'/g).map(s => s.slice(1, -1));
const exercicis = [], blocs = [];
const capturaEx = {afegeixExercicis: (...l) => l.forEach(e => exercicis.push(JSON.parse(JSON.stringify(Object.assign({}, e, {fitxer: actual}))))),
                   defineixBlocs: l => l.forEach(b => blocs.push(JSON.parse(JSON.stringify(b))))};
let actual = '';
const orig = {afegeixExercicis: Models.afegeixExercicis, defineixBlocs: Models.defineixBlocs};
for (const f of fitxersEx) {
  actual = 'exercicis/' + f;
  const codi = fs.readFileSync(path.join(arrel, actual), 'utf8');
  vm.runInNewContext(codi, {Models: capturaEx}, {filename: actual});
  vm.runInContext(codi, context, {filename: actual});
}
const CAMPS = ['titol', 'enunciat', 'tancament'];
const models = {}, variants = {};
for (const id of Models.ids) {
  const carpeta = Models.carpeta(id);
  executa(carpeta + 'model.js');
  const d = Models.descriptor(id);
  models[id] = d.curt;
  Models.carregant(id);
  for (const f of d.fitxers) { context.__fitxer = f; executa(carpeta + f); }
  const M = Models.obre();
  Models.carregant(null);
  for (const fx of M.fitxes) for (const c of CAMPS) if (typeof fx[c] === 'string') {
    (variants[fx.id] = variants[fx.id] || {})[id] = Object.assign((variants[fx.id] || {})[id] || {}, {[c]: fx[c]});
  }
  // Quines fitxes té cada calculadora
  for (const fx of M.fitxes) { const e = exercicis.find(x => x.id === fx.id); if (e) (e.calculadores = e.calculadores || []).push(id); }
}
for (const e of exercicis) if (variants[e.id]) e.variants = variants[e.id];
const etapes = vm.runInContext('Models.etapesTotes ? Models.etapesTotes() : null', context);
const versio = fs.readFileSync(path.join(arrel, 'js/nucli/models.js'), 'utf8').match(/const VERSIO = '(\d+)'/)[1];
process.stdout.write(JSON.stringify({versio, blocs, exercicis, models}, null, 1));
