/* exercicis/eso/trigonometria.js — DADES. El format és a exercicis/blocs.js. */
Models.afegeixExercicis(

{
  id: 'eso-posa-graus', bloc: 'eso-trigonometria',
  titol: 'La calculadora en radians: posa-la en graus',
  enunciat: 'A dalt de la pantalla de la calculadora hi ha una R: és en radians. Calcula l\'altura de l\'arbre de l\'exercici 37, $12\\cdot\\tan 35^\\circ$, i arregla-ho.',
  provaTu: {
    enunciat: 'Comprova que la calculadora és en graus (D) i calcula $5\\cdot\\tan 30^\\circ$.',
    solucio: '$5\\cdot\\tan 30^\\circ\\approx 2{,}89$ (la fx-82SP CW el dona exacte, $\\frac{5\\sqrt{3}}{3}$). Si et surt −32,03, la calculadora és en radians.',
  },
},
{
  id: 'll4-7-37', bloc: 'eso-trigonometria',
  titol: 'L\'altura d\'un arbre: la tangent',
  font: 'Llibre 4t ESO, unitat 7, exercici 37',
  enunciat: 'Un arbre fa una ombra a terra quan els raigs del sol arriben inclinats:\n• l\'ombra fa 12 m;\n• els raigs del sol formen 35° amb el terra.\nQuant fa d\'alt l\'arbre?',
  provaTu: {
    enunciat: 'Un fanal fa una ombra de 6 m quan els raigs del sol formen 40° amb el terra. Quant fa d\'alt el fanal?',
    solucio: '$6\\cdot\\tan 40^\\circ\\approx 5{,}03$ m.',
  },
},
{
  id: 'll4-7-38', bloc: 'eso-trigonometria',
  titol: 'L\'escala recolzada: el sinus',
  font: 'Llibre 4t ESO, unitat 7, exercici 38',
  enunciat: 'Una escala està recolzada a la paret:\n• l\'escala fa 5 m de llarg;\n• forma un angle de 60° amb el terra.\nA quina altura arriba a la paret?',
  provaTu: {
    enunciat: 'Un estel està lligat amb un fil de 20 m, que forma un angle de 50° amb el terra. A quina altura és l\'estel?',
    solucio: '$20\\cdot\\sin 50^\\circ\\approx 15{,}32$ m.',
  },
},
{
  id: 'll4-7-39', bloc: 'eso-trigonometria',
  titol: 'L\'angle d\'una escala: la tecla inversa',
  font: 'Llibre 4t ESO, unitat 7, exercici 39',
  enunciat: 'Una escala està recolzada a la paret:\n• l\'escala fa 5 m de llarg;\n• la base és a 1,5 m de la paret.\nQuin angle forma l\'escala amb el terra?',
  tancament: '[mat]Recorda: per trobar un angle a partir d\'una raó, cal la funció inversa: $\\alpha=\\cos^{-1}(1{,}5\\div 5)\\approx 72{,}5^\\circ$.[/mat] [calc]A la calculadora, [[shift]] [[cos]].[/calc]',
  provaTu: {
    enunciat: 'Una rampa fa 8 m de llarg i puja una altura d\'1 m. Quin angle forma amb el terra?',
    solucio: '$\\sin\\alpha=\\frac{1}{8}$, $\\alpha=\\sin^{-1}(1\\div 8)\\approx 7{,}2^\\circ$.',
  },
},

);
