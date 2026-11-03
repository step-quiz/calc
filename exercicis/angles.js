/* exercicis/angles.js — DADES. El format és a exercicis/blocs.js. */
Models.afegeixExercicis(

{
  id: 'canvia-radians', bloc: 'angles',
  titol: 'Posa la calculadora en radians',
  enunciat: 'En un exercici de trigonometria cal treballar en radians: calcula $\\sin\\frac{\\pi}{6}$.',
},
{
  id: 'error-angles', bloc: 'angles',
  titol: 'Troba l\'error: el mode equivocat',
  enunciat: 'La Laia calcula $\\cos\\frac{\\pi}{3}$, que hauria de ser $\\frac{1}{2}$, però la calculadora li dona aquest resultat: 0.9998329795.\nQuè ha passat?',
  tancament: '[calc]Recorda: abans de calcular, mira la unitat dels angles a dalt de la pantalla: R si l\'angle és en radians (per exemple, si porta π); D si és en graus.[/calc]',
},
{
  id: 'graus-radians', bloc: 'angles',
  titol: 'Convertir de graus a radiants',
  enunciat: 'Expressa en radiants un angle de $60^\\circ$.',
  tancament: '[mat]Recorda: al factor de conversió, al numerador hi va la unitat que vols ($\\pi$ rad) i al denominador la que vols treure ($180^\\circ$), perquè se simplifiqui.\n$60^\\circ=\\frac{\\pi}{3}$ rad.[/mat]',
},

);
