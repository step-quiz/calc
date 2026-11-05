/* exercicis/eso/trigonometria.js — DADES. El format és a exercicis/blocs.js. */
Models.afegeixExercicis(

{
  id: 'eso-posa-graus', bloc: 'eso-trigonometria',
  titol: 'La calculadora en radians',
  figura: {src: 'img/eso/ll4-7-37.svg', alt: 'Un arbre i la seva ombra de 12 m; els raigs del sol formen 35° amb el terra; l\'altura de l\'arbre és la incògnita'},
  enunciat: 'A dalt de la pantalla de la calculadora hi ha una R: la calculadora treballa en radians.\n\nCalcula l\'altura de l\'arbre de la fitxa següent, $12\\cdot\\tan 35^\\circ$, i posa la calculadora en graus.',
  provaTu: {
    enunciat: 'Primer, comprova que la calculadora és en graus: a dalt de la pantalla hi ha d\'haver una D.\nDesprés, calcula $5\\cdot\\tan 30^\\circ$.',
    solucio: '[mat]$5\\cdot\\tan 30^\\circ=\\frac{5\\sqrt{3}}{3}\\simeq 2{,}89$[/mat]\n[nota]Si et surt $-32{,}03$, la calculadora és en radians.[/nota]',
  },
},
{
  id: 'll4-7-37', bloc: 'eso-trigonometria',
  titol: 'L\'arbre del pati',
  font: 'Llibre 4t ESO, unitat 7, exercici 37',
  figura: {src: 'img/eso/ll4-7-37.svg', alt: 'Un arbre i la seva ombra de 12 m; els raigs del sol formen 35° amb el terra; l\'altura de l\'arbre és la incògnita'},
  enunciat: 'En Pol vol saber l\'altura de l\'arbre del pati de l\'institut. Un dia de sol, l\'arbre fa una ombra de $12$ m, i els raigs del sol formen un angle de $35^\\circ$ amb el terra.\n\nQuina és l\'altura de l\'arbre?',
  provaTu: {
    enunciat: 'Un fanal del carrer fa una ombra de $6$ m, quan els raigs del sol formen un angle de $40^\\circ$ amb el terra.\nQuina és l\'altura del fanal?',
    solucio: '[mat]$6\\cdot\\tan 40^\\circ\\simeq 5{,}03$ m[/mat]\nR) El fanal fa aproximadament $5{,}03$ m d\'altura.',
  },
},
{
  id: 'll4-7-38', bloc: 'eso-trigonometria',
  titol: 'L\'escala dels bombers',
  font: 'Llibre 4t ESO, unitat 7, exercici 38',
  figura: {src: 'img/eso/ll4-7-38.svg', alt: 'Una escala de 5 m recolzada a la paret, que forma 60° amb el terra; l\'altura on arriba és la incògnita'},
  enunciat: 'Els bombers recolzen una escala de $5$ m a la paret d\'un edifici. L\'escala forma un angle de $60^\\circ$ amb el terra.\n\nA quina altura de la paret arriba l\'escala?',
  provaTu: {
    enunciat: 'L\'estel de la Laia està lligat amb un fil de $20$ m, que forma un angle de $50^\\circ$ amb el terra.\nA quina altura vola l\'estel?',
    solucio: '[mat]$20\\cdot\\sin 50^\\circ\\simeq 15{,}32$ m[/mat]\nR) L\'estel vola aproximadament a $15{,}32$ m d\'altura.',
  },
},
{
  id: 'll4-7-39', bloc: 'eso-trigonometria',
  titol: 'L\'angle de l\'escala',
  font: 'Llibre 4t ESO, unitat 7, exercici 39',
  figura: {src: 'img/eso/ll4-7-39.svg', alt: 'Una escala de 5 m recolzada a la paret, amb la base a 1,5 m de la paret; l\'angle amb el terra és la incògnita'},
  enunciat: 'Per seguretat, una escala de mà ha de formar un angle d\'uns $75^\\circ$ amb el terra. La Laia recolza una escala de $5$ m a la paret, amb la base a $1{,}5$ m de la paret.\n\nQuin angle forma l\'escala amb el terra?',
  tancament: '[mat]Recorda:\n• Si vols trobar un angle a partir d\'una raó, cal la funció inversa ([[shift]] [[cos]])\n\n$\\alpha=\\cos^{-1}(1{,}5\\div 5)\\simeq 72{,}5^\\circ$[/mat]',
  provaTu: {
    enunciat: 'Una rampa per a cadires de rodes fa $8$ m de llarg i puja una altura d\'$1$ m.\nQuin angle forma la rampa amb el terra?',
    solucio: '[mat]$\\sin\\alpha=\\frac{1}{8}$\n$\\alpha=\\sin^{-1}(1\\div 8)\\simeq 7{,}2^\\circ$[/mat]\nR) La rampa forma un angle d\'aproximadament $7{,}2^\\circ$ amb el terra.',
  },
},

);
