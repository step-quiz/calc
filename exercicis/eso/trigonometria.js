/* exercicis/eso/trigonometria.js — DADES. El format és a exercicis/blocs.js. */
Models.afegeixExercicis(

{
  id: 'eso-posa-graus', bloc: 'eso-trigonometria',
  titol: 'La calculadora en radians: posa-la en graus',
  figura: {src: 'img/eso/ll4-7-37.svg', alt: 'Un arbre i la seva ombra de 12 m; els raigs del sol formen 35° amb el terra; l\'altura de l\'arbre és la incògnita'},
  enunciat: 'A dalt de la pantalla de la calculadora hi ha una R: és en radians. Calcula l\'altura de l\'arbre de l\'exercici 37, $12\\cdot\\tan 35^\\circ$, i arregla-ho.',
  provaTu: {
    enunciat: 'En primer lloc, comprova que la calculadora és en graus (D)\nDesprés, calcula $5\\cdot\\tan 30^\\circ$.',
    solucio: '$5\\cdot\\tan 30^\\circ=\\frac{5\\sqrt{3}}{3}\\approx 2{,}89$.\n[nota]Si et surt −32,03, la calculadora és en radians.[/nota]',
  },
},
{
  id: 'll4-7-37', bloc: 'eso-trigonometria',
  titol: 'L\'altura d\'un arbre: la tangent',
  font: 'Llibre 4t ESO, unitat 7, exercici 37',
  figura: {src: 'img/eso/ll4-7-37.svg', alt: 'Un arbre i la seva ombra de 12 m; els raigs del sol formen 35° amb el terra; l\'altura de l\'arbre és la incògnita'},
  enunciat: 'Un arbre fa una ombra de 12 m, precisament quan els raigs del sol arriben inclinats i formen 35° amb el terra.\nQuina és l\'altura de l\'arbre?',
  provaTu: {
    enunciat: 'Un fanal fa una ombra de 6 m, justament quan els raigs del sol formen 40° amb el terra.\nQuina és l\'altura del fanal?',
    solucio: '$6\\cdot\\tan 40^\\circ\\approx 5{,}03$ m.',
  },
},
{
  id: 'll4-7-38', bloc: 'eso-trigonometria',
  titol: 'L\'escala recolzada: el sinus',
  font: 'Llibre 4t ESO, unitat 7, exercici 38',
  figura: {src: 'img/eso/ll4-7-38.svg', alt: 'Una escala de 5 m recolzada a la paret, que forma 60° amb el terra; l\'altura on arriba és la incògnita'},
  enunciat: 'Una escala està recolzada a la paret:\n• l\'escala fa 5 m de llarg;\n• forma un angle de 60° amb el terra.\nA quina altura arriba el punt més alt de l\'escala?',
  provaTu: {
    enunciat: 'Un estel està lligat amb un fil de 20 m, que forma un angle de 50° amb el terra. A quina altitud és l\'estel?',
    solucio: '$20\\cdot\\sin 50^\\circ\\approx 15{,}32$ m.',
  },
},
{
  id: 'll4-7-39', bloc: 'eso-trigonometria',
  titol: 'L\'angle d\'una escala: la tecla inversa',
  font: 'Llibre 4t ESO, unitat 7, exercici 39',
  figura: {src: 'img/eso/ll4-7-39.svg', alt: 'Una escala de 5 m recolzada a la paret, amb la base a 1,5 m de la paret; l\'angle amb el terra és la incògnita'},
  enunciat: 'Una escala està recolzada a la paret:\n• l\'escala fa 5 m de llarg;\n• la base és a 1,5 m de la paret.\nQuin angle forma l\'escala amb la superfície horitzontal del terra?',
  tancament: '[mat]Recorda: per trobar un angle a partir d\'una raó, cal la funció inversa:\n\n$\\alpha=\\cos^{-1}(1{,}5\\div 5)\\approx 72{,}5^\\circ$.\n\n[/mat] [calc]A la calculadora, [[shift]] [[cos]].[/calc]',
  provaTu: {
    enunciat: 'Una rampa fa 8 m de llarg i puja una altura d\'1 m. Quin angle forma amb el terra?',
    solucio: '$\\sin\\alpha=\\frac{1}{8}$, $\\alpha=\\sin^{-1}(1\\div 8)\\approx 7{,}2^\\circ$.',
  },
},

);
