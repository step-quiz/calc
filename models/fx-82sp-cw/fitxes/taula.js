/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/taula.js — L'app Taula (bloc «Funcions útils per a la PAU»)
   ───────────────────────────────────────────────────────────────────
   Només la fx-82SP CW (no és a la llista de fitxers de la fx-570/991SP
   CW: la seva pantalla HOME té més apps i la Taula hi és en un altre
   lloc). Les pantalles de l'app Taula que el manual no dibuixa (o que
   no s'han pogut veure) són a VERIFICAR.md.
   NOMÉS DADES. El format d'una fitxa és a fitxes/blocs.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, definicio, home, taula, rangTaula} = M.guions;
const {D} = M.comu;
const F_BOLZANO = '-2+10(x-1)\\ln(x)';
/** La taula de 1 a 1,5 amb pas 0,1 (calcul.js comprova cada valor de f; g no està definida: columna buida). */
const TAULA_BOLZANO = [['1', '-2', ''], ['1.1', '-1.90468982', ''], ['1.2', '-1.635356886', ''], ['1.3', '-1.212907207', ''],
  ['1.4', '-0.6541110535', ''], ['1.5', '0.02732554054', '']];

M.fitxes.push(

{
  id: 'taula-bolzano',
  inici: calc(D),
  passos: [
    {tecles: ['home'], pantalla: home(0),
      text: '[calc]Prem [[home]]: surten les aplicacions de la calculadora.[/calc]'},
    {tecles: ['right', 'right', 'ok'], pantalla: taula(),
      text: '[calc]Tria {{Tabla}} amb dues vegades [[right]] i prem [[ok]]: surt la taula, encara buida.[/calc]'},
    {tecles: ['funcio', 'down', 'down', 'ok', 'menys', '2', 'mes', '1', '0', 'lpar', 'x', 'menys', '1', 'rpar', 'shift', 'logab', 'x', 'rpar'],
      pantalla: definicio('f', F_BOLZANO),
      text: '[calc]Defineix $f$: [[funcio]], dos cops [[down]] fins a {{Definir f(x)}} i [[ok]]. Escriu $-2+10(x-1)\\ln(x)$; ln és [[shift]] [[logab]].[/calc]'},
    {tecles: ['exe'], pantalla: taula(),
      text: '[calc]Prem [[exe]]: $f$ queda desada i tornes a la taula.[/calc]'},
    {tecles: ['tools', 'down', 'down', 'ok'], pantalla: rangTaula(['1', '5', '1'], 0),
      text: '[calc][[tools]] obre el menú de la taula: baixa fins a {{Rango tabla}} i prem [[ok]].[/calc]'},
    {tecles: ['1', 'exe', '1', 'punt', '5', 'exe', '0', 'punt', '1', 'exe', 'exe'], pantalla: taula(TAULA_BOLZANO, 0, 0),
      text: '[mat]L\'interval és $[1;\\,1{,}5]$, i les dècimes són els punts que t\'interessen.[/mat] [calc]{{Inic.}} 1, {{Final}} 1.5 i {{Paso}} 0.1, cada un amb [[exe]]. A {{Ejecutar}}, [[exe]] una altra vegada: surt la taula.[/calc]'},
    {tecles: ['right'], pantalla: taula(TAULA_BOLZANO, 0, 1),
      text: '[calc]Passa a la columna de $f$ amb [[right]]: a baix hi ha el valor sencer.[/calc] [mat]$f(1)=-2<0$.[/mat]'},
    {tecles: ['down', 'down', 'down', 'down', 'down'], pantalla: taula(TAULA_BOLZANO, 5, 1),
      text: '[calc]Baixa fins a l\'última fila, $x=1{,}5$.[/calc] [mat]$f(1{,}5)\\approx 0{,}0273>0$. Com que $f$ és contínua a $[1;\\,1{,}5]$ i canvia de signe, pel teorema de Bolzano hi ha una arrel. ✓[/mat]'},
    {tecles: ['up'], pantalla: taula(TAULA_BOLZANO, 4, 1),
      text: '[mat]Una fila amunt, $f(1{,}4)\\approx -0{,}654<0$: hi ha canvi de signe a $[1{,}4;\\,1{,}5]$, un interval d\'una dècima. ✓ Tot surt d\'una sola taula.[/mat]'},
  ],
  relacionades: ['pau-ana-24i-q1', 'definir-fx'],
},

);

})(Models.obre());
