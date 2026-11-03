/* exercicis/pau.js — DADES. El format és a exercicis/blocs.js. */
Models.afegeixExercicis(

{
  id: 'definir-fx', bloc: 'pau',
  titol: 'Defineix les funcions f(x) i g(x), i calcula\'n valors',
  enunciat: 'Sigui $f(x)=x^3-3x+2$. La funció derivada és $f\'(x)=3x^2-3$.\nResolent l\'equació $f\'(x)=0$ has obtingut els punts crítics: $x=-1$ i $x=1$.\n\nTroba les coordenades del mínim relatiu R(x,y) i del màxim relatiu S(x,y).',
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
  tancament: '[calc]Recorda: per fer servir un resultat en el càlcul següent, prem [[ans]]. Així t\'estalvies copiar tots els decimals.[/calc]',
},
{
  id: 'logaritmes', bloc: 'pau',
  titol: 'Logaritme en qualsevol base',
  enunciat: 'Resol l\'equació $3^x=7$: calcula $x=\\log_3 7$ i comprova el resultat.',
},
{
  id: 'combinatoria', bloc: 'pau',
  titol: 'Nombres combinatoris',
  enunciat: 'Una variable $X$ segueix una binomial amb $n=6$ i $p=\\frac{1}{3}$.\nCalcula $P(X=4)=\\binom{6}{4}\\left(\\frac{1}{3}\\right)^{4}\\left(\\frac{2}{3}\\right)^{2}$.',
},
{
  id: 'verificar', bloc: 'pau',
  titol: 'Comprova una igualtat',
  enunciat: 'Comprova que es compleix aquesta igualtat: $\\dfrac{1}{\\sqrt{2}}=\\dfrac{\\sqrt{2}}{2}$.',
},

{
  id: 'producte-escalar-vectorial', bloc: 'pau',
  titol: 'Producte escalar i producte vectorial',
  enunciat: 'Siguin $\\vec u=(2,-1,3)$ i $\\vec v=(1,4,-2)$.\nCalcula el producte escalar $\\vec u\\cdot\\vec v$ i el producte vectorial $\\vec u\\times\\vec v$.',
},

{
  id: 'taula-bolzano', bloc: 'pau',
  titol: 'Taula de valors: Bolzano d\'una passada',
  font: 'PAU juny 2024 (incidències), qüestió 1 a)',
  enunciat: 'Considereu $f(x)=-2+10(x-1)\\ln x$, per a $x>0$.\nComproveu que $f$ té una arrel a l\'interval $[1;\\,1{,}5]$ i busqueu un interval d\'una dècima de longitud que la contingui, tot amb una sola taula de valors.',
},

);
