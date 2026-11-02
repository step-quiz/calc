/* exercicis/pau.js — DADES. El format és a exercicis/blocs.js. */
Models.afegeixExercicis(

{
  id: 'definir-fx', bloc: 'pau',
  titol: 'Defineix f(x) i g(x) i calcula\'n valors',
  enunciat: 'Siguin $f(x)=x^3-3x+2$ i $g(x)=f\'(x)=3x^2-3$. Resolent $g(x)=0$ a mà has obtingut $x=-1$ i $x=1$. Amb la calculadora, troba les coordenades del mínim relatiu R i del màxim relatiu S de $f$.',
},
{
  id: 'barrow', bloc: 'pau',
  titol: 'Regla de Barrow amb f(x)',
  font: 'PAU juny 2024, qüestió 3 b)',
  enunciat: 'La superfície del terreny és $\\int_1^6 f(x)\\,dx-\\frac{25}{2}$, amb $f(x)=-x^3+7x^2-6x+5$ (el $\\frac{25}{2}$ és el triangle que no hi entra). A mà has trobat la primitiva $F(x)=-\\frac{x^4}{4}+\\frac{7x^3}{3}-3x^2+5x$. Calcula $F(6)-F(1)$ amb la calculadora.',
},
{
  id: 'ans', bloc: 'pau',
  titol: 'Reutilitza l\'últim resultat (Ans)',
  enunciat: 'Calcula $\\dfrac{8}{\\sin 35^\\circ}$ amb la calculadora en graus, sense copiar cap decimal intermedi.',
  tancament: '[calc]Recorda: per fer servir un resultat en el càlcul següent, prem [[ans]]. No en copiïs els decimals.[/calc]',
},
{
  id: 'logaritmes', bloc: 'pau',
  titol: 'Logaritme en qualsevol base',
  enunciat: 'Resol l\'equació $3^x=7$: calcula $x=\\log_3 7$ i comprova el resultat.',
},
{
  id: 'combinatoria', bloc: 'pau',
  titol: 'Nombres combinatoris',
  enunciat: 'Una variable $X$ segueix una binomial amb $n=6$ i $p=\\frac{1}{2}$. Calcula $P(X=4)=\\binom{6}{4}\\left(\\frac{1}{2}\\right)^{6}$ sense calcular el nombre combinatori a mà.',
},
{
  id: 'verificar', bloc: 'pau',
  titol: 'Comprova una igualtat',
  enunciat: 'Comprova amb la calculadora que $\\dfrac{1}{\\sqrt{2}}=\\dfrac{\\sqrt{2}}{2}$.',
},

);
