// proves/editor-textos/construeix.js — Munta l'artifact «Editor de textos de calc»: un sol fitxer HTML amb les dades
// (extreu.js) dins de la plantilla (a /*DADES*/). Ús, des de l'arrel del repositori:
//   node proves/editor-textos/construeix.js <fitxer de sortida, p. ex. /tmp/editor-textos.html>
// Després, es publica (o es republica) aquest fitxer a l'artifact (vegeu HANDOUT.md, «Editor de textos»).
'use strict';
const fs = require('fs'), path = require('path'), {execFileSync} = require('child_process');
const sortida = path.resolve(process.argv[2] || 'editor-textos.html');
const dades = execFileSync(process.execPath, [path.join(__dirname, 'extreu.js')], {maxBuffer: 64 << 20}).toString();
JSON.parse(dades);   // que sigui JSON vàlid
const plantilla = fs.readFileSync(path.join(__dirname, 'plantilla.html'), 'utf8');
if (!plantilla.includes('/*DADES*/null')) throw new Error('La plantilla no té /*DADES*/null');
// </script dins de les dades tancaria l'script: s'escapa
fs.writeFileSync(sortida, plantilla.replace('/*DADES*/null', () => dades.replace(/<\/script/gi, '<\\/script')));
console.log(`${sortida} (${Math.round(fs.statSync(sortida).size / 1024)} kB)`);
