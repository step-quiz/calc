# Reescriu els textos de la T7 «Trigonometria» amb les normes de la T3–T6.
import re, sys
import os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from solmat import solmat
ARREL = sys.argv[1]

def js(t):
    return "'" + t.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n') + "'"

def EXACTE(forma):
    return "Si surt " + forma + " és perquè la calculadora està configurada per donar resultats exactes.\nSi estigués configurada per donar decimals, sortiria "

EX = {
'eso-posa-graus': dict(titol='La calculadora en radians',
  enunciat="A dalt de la pantalla de la calculadora hi ha una R: la calculadora treballa en radians.\n\nCalcula l'altura de l'arbre de la fitxa següent, $12\\cdot\\tan 35^\\circ$, i posa la calculadora en graus.",
  provaTu=("Primer, comprova que la calculadora és en graus: a dalt de la pantalla hi ha d'haver una D.\nDesprés, calcula $5\\cdot\\tan 30^\\circ$.",
           "$5\\cdot\\tan 30^\\circ=\\frac{5\\sqrt{3}}{3}\\simeq 2{,}89$\n[nota]Si et surt $-32{,}03$, la calculadora és en radians.[/nota]")),
'll4-7-37': dict(titol="L'arbre del pati",
  enunciat="En Pol vol saber l'altura de l'arbre del pati de l'institut. Un dia de sol, l'arbre fa una ombra de $12$ m, i els raigs del sol formen un angle de $35^\\circ$ amb el terra.\n\nQuina és l'altura de l'arbre?",
  provaTu=("Un fanal del carrer fa una ombra de $6$ m, quan els raigs del sol formen un angle de $40^\\circ$ amb el terra.\nQuina és l'altura del fanal?",
           "$h=6\\cdot\\tan 40^\\circ\\simeq 5{,}03$ m\nR) El fanal fa aproximadament $5{,}03$ m d'altura.")),
'll4-7-38': dict(titol="L'escala dels bombers",
  enunciat="Els bombers recolzen una escala de $5$ m a la paret d'un edifici. L'escala forma un angle de $60^\\circ$ amb el terra.\n\nA quina altura de la paret arriba l'escala?",
  provaTu=("L'estel de la Laia està lligat amb un fil de $20$ m, que forma un angle de $50^\\circ$ amb el terra.\nA quina altura vola l'estel?",
           "$h=20\\cdot\\sin 50^\\circ\\simeq 15{,}32$ m\nR) L'estel vola aproximadament a $15{,}32$ m d'altura.")),
'll4-7-39': dict(titol="L'angle de l'escala",
  enunciat="Per seguretat, una escala de mà ha de formar un angle d'uns $75^\\circ$ amb el terra. La Laia recolza una escala de $5$ m a la paret, amb la base a $1{,}5$ m de la paret.\n\nQuin angle forma l'escala amb el terra?",
  tancament="[mat]Recorda:\n• Si vols trobar un angle a partir d'una raó, cal la funció inversa ([[shift]] [[cos]])\n\n$\\alpha=\\cos^{-1}(1{,}5\\div 5)\\simeq 72{,}5^\\circ$[/mat]",
  provaTu=("Una rampa per a cadires de rodes fa $8$ m de llarg i puja una altura d'$1$ m.\nQuin angle forma la rampa amb el terra?",
           "$\\sin\\alpha=\\frac{1}{8}$\n$\\alpha=\\sin^{-1}(1\\div 8)\\simeq 7{,}2^\\circ$\nR) La rampa forma un angle d'aproximadament $7{,}2^\\circ$ amb el terra.")),
}

ERR_RAD = "[mat]La calculadora ha seguit bé les instruccions, però ha entès $35$ radians, i no $35^\\circ$.[/mat]"
R_ARBRE = "[mat]R) Ara sí: l'arbre fa aproximadament $8{,}4$ m d'altura.[/mat]"
ARBRE_P2 = "[mat]Podem formar un triangle rectangle, on:\n• l'ombra ($12$ m) és el catet contigu a l'angle de $35^\\circ$;\n• l'altura de l'arbre és el catet oposat.\nOposat i contigu → tangent. L'altura es calcula així:\n$h=12\\cdot\\tan 35^\\circ$[/mat] "
ESC_P1 = "[mat]Podem formar un triangle rectangle, on:\n• la pròpia escala ($5$ m) és la hipotenusa;\n• l'altura a la qual arriba és el catet oposat a l'angle de $60^\\circ$.\nOposat i hipotenusa → sinus. L'altura es calcula així:\n$h=5\\cdot\\sin 60^\\circ$[/mat] "
ANG_P1 = "[mat]Coneixem el catet contigu ($1{,}5$ m) i la hipotenusa ($5$ m): $\\cos\\alpha=\\frac{1{,}5}{5}$\nPer trobar l'angle, cal la funció inversa:\n$\\alpha=\\cos^{-1}(1{,}5\\div 5)$[/mat] "
ANG_R = "[mat]R) L'escala forma un angle d'aproximadament $72{,}5^\\circ$ amb el terra, una mica menys del recomanat.[/mat]"
ANG_ERR = "[mat]La calculadora ha seguit les teves instruccions, però sense la funció inversa ha calculat un cosinus, no un angle. Un angle d'$1^\\circ$ voldria dir que l'escala està gairebé estirada a terra![/mat]"

CW = {
'eso-posa-graus': [
  "[calc]!!Error típic!!:\nSi calcules amb la R a la barra: $12$ [[tan]] $35$ [[rpar]].[/calc]",
  "[calc]Prem [[exe]]: obtens $5.685776645$.[/calc] " + ERR_RAD,
  "[calc]Ho arreglem. Prem [[settings]]: menú CONFIG.[/calc]",
  "[calc]Entra a {{Config cálculo}} amb [[ok]].[/calc]",
  "[calc]Baixa a {{Unidad angular}} amb [[down]].[/calc]",
  "[calc]Prem [[ok]]. El ◉ és a {{Radián}}: per això hi ha la R.[/calc]",
  "[calc]Puja a {{Grado sexag (D)}} (graus) amb [[up]].[/calc]",
  "[calc]Prem [[ok]]: el ◉ passa a {{Grado sexag (D)}}.[/calc]",
  "[calc]Prem [[ac]] per tornar a calcular.\nA la barra ara hi ha D.[/calc]",
  "[calc]Torna a escriure $12$ [[tan]] $35$ [[rpar]].[/calc]",
  "[calc]Prem [[exe]]: obtens $8.402490459$.[/calc] " + R_ARBRE],
'll4-7-37': [
  "[calc]Abans de res, mira la barra: hi ha d'haver una D (graus), perquè els angles d'aquest problema són en graus.\nSi hi ha una R, mira la fitxa anterior.[/calc]",
  ARBRE_P2 + "[calc]Escriu $12$, [[tan]], $35$ i [[rpar]].\nNo cal el [[per]].[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $8.402490459$.[/calc] [mat]R) L'arbre fa aproximadament $8{,}4$ m d'altura.[/mat]"],
'll4-7-38': [
  ESC_P1 + "[calc]Amb la D a la barra, escriu $5$, [[sen]], $60$ i [[rpar]].[/calc]",
  "[calc]Prem [[exe]]: obtens $\\frac{5\\sqrt{3}}{2}$.\n" + EXACTE("en forma d'arrel") + "$4.330127019$.[/calc] [mat]$\\frac{5\\sqrt{3}}{2}\\simeq 4{,}33$ m[/mat]",
  "[calc]Per obtenir l'expressió decimal de l'arrel, prem [[shift]] [[exe]] (≈).\nObtens $4.330127019$.[/calc] [mat]R) L'escala arriba aproximadament a $4{,}33$ m d'altura.[/mat]"],
'll4-7-39': [
  ANG_P1 + "[calc]Prem [[shift]] [[cos]] (a sobre hi ha Arccos), escriu $1.5$ [[entre]] $5$ i tanca amb [[rpar]].[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $72.54239688$.\nÉs en graus, perquè a la barra hi ha D.[/calc] " + ANG_R,
  "[calc]!!Error típic!!:\nSi oblides la tecla [[shift]]: [[cos]] $1.5$ [[entre]] $5$ [[rpar]].[/calc]",
  "[calc]Prem [[shift]] [[exe]] (≈): obtens $0.9999862922$.[/calc] " + ANG_ERR],
}
X2 = {k: list(v) for k, v in CW.items()}
X2['eso-posa-graus'] = CW['eso-posa-graus'][:2] + [
  "[calc]Ho arreglem. Prem [[shift]] i [[menu]] (a sobre hi ha CONFIG): el menú de configuració.\nLes opcions es trien prement el seu número.[/calc]",
  "[calc]Prem $2$: {{2:Unidad angular}}.[/calc]",
  "[calc]Prem $1$: {{1:Grado sexag (D)}}, els graus.\nLa calculadora torna a la pantalla de calcular, i a la barra ara hi ha D.[/calc]",
  CW['eso-posa-graus'][9], CW['eso-posa-graus'][10]]
X2['ll4-7-38'][2] = CW['ll4-7-38'][2].replace("prem [[shift]] [[exe]] (≈).", "prem [[sd]].")

MS = {
'eso-posa-graus': [
  "[calc]!!Error típic!!:\nSi calcules amb la R a dalt de la pantalla: $12$ [[tan]] $35$.[/calc]",
  "[calc]Prem [[igual]]: obtens $5.685776645$.[/calc] " + ERR_RAD,
  "[calc]Ho arreglem. Prem [[mode]]: surten els modes de càlcul.[/calc]",
  "[calc]Torna a prémer [[mode]]: ara surt la unitat dels angles, {{Deg}} (graus), {{Rad}} (radians) i {{Gra}}.[/calc]",
  "[calc]Prem l'[[1]], el número de {{Deg}}: tornes a la pantalla de càlcul, i ara a dalt hi ha una D.[/calc]",
  "[calc]Torna a escriure $12$ [[tan]] $35$.[/calc]",
  "[calc]Prem [[igual]]: obtens $8.402490459$.[/calc] " + R_ARBRE],
'll4-7-37': [
  "[calc]Abans de res, mira la pantalla: hi ha d'haver una D (graus), perquè els angles d'aquest problema són en graus.\nSi hi ha una R, mira la fitxa anterior.[/calc]",
  ARBRE_P2 + "[calc]Escriu $12$, [[tan]] i $35$.\nNo cal el [[per]].[/calc]",
  "[calc]Prem [[igual]]: obtens el resultat, que és $8.402490459$.[/calc] [mat]R) L'arbre fa aproximadament $8{,}4$ m d'altura.[/mat]"],
'll4-7-38': [
  ESC_P1 + "[calc]Amb la D a la pantalla, escriu $5$, [[sin]] i $60$.[/calc]",
  "[calc]Prem [[igual]]: obtens el resultat, que és $4.330127019$.[/calc] [mat]R) L'escala arriba aproximadament a $4{,}33$ m d'altura.[/mat]"],
'll4-7-39': [
  ANG_P1 + "[calc]Prem [[shift]] [[cos]] (a sobre hi ha cos⁻¹) i escriu, entre parèntesis, $1.5$ [[entre]] $5$.[/calc]",
  "[calc]Prem [[igual]]: obtens el resultat, que és $72.54239688$.\nÉs en graus, perquè a la pantalla hi ha D.[/calc] " + ANG_R,
  "[calc]!!Error típic!!:\nSi oblides la tecla [[shift]]: [[cos]] [[lpar]] $1.5$ [[entre]] $5$ [[rpar]].[/calc]",
  "[calc]Prem [[igual]]: obtens $0.999986292$.[/calc] " + ANG_ERR],
}

def bloc(s, fid):
    a = s.index("{\n  id: '%s'" % fid); b = s.index("\n},\n", a) + 4
    return a, b

def posaPassos(path, textos):
    s = open(path).read()
    for fid, nous in textos.items():
        a, b = bloc(s, fid)
        cos = s[a:b].split('\n')
        idx = [i for i, l in enumerate(cos) if l.lstrip().startswith('text: ')]
        assert len(idx) == len(nous), (path, fid, len(idx), len(nous))
        for i, t in zip(idx, nous):
            final = '},' if cos[i].rstrip().endswith('},') else '}'
            cos[i] = '      text: ' + js(t) + final
        s = s[:a] + '\n'.join(cos) + s[b:]
    open(path, 'w').write(s)

def posaExercicis(path, EX):
    s = open(path).read()
    for fid, d in EX.items():
        a, b = bloc(s, fid)
        o = s[a:b]
        out = []
        for l in o.split('\n'):
            if l.startswith('  titol: '): out.append('  titol: ' + js(d['titol']) + ','); continue
            if l.startswith('  enunciat: '):
                out.append('  enunciat: ' + js(d['enunciat']) + ',')
                if 'tancament' in d and '\n  tancament: ' not in o: out.append('  tancament: ' + js(d['tancament']) + ',')
                continue
            if l.startswith('  tancament: '):
                if 'tancament' in d: out.append('  tancament: ' + js(d['tancament']) + ',')
                continue
            if l.startswith('    enunciat: '): out.append('    enunciat: ' + js(d['provaTu'][0]) + ','); continue
            if l.startswith('    solucio: '): out.append('    solucio: ' + js(solmat(d['provaTu'][1])) + ','); continue
            out.append(l)
        s = s[:a] + '\n'.join(out) + s[b:]
    open(path, 'w').write(s)

posaExercicis(ARREL + '/exercicis/eso/trigonometria.js', EX)
posaPassos(ARREL + '/models/fx-82sp-cw/fitxes/eso/trigonometria.js', CW)
posaPassos(ARREL + '/models/fx-570sp-x2/fitxes/eso/trigonometria.js', X2)
posaPassos(ARREL + '/models/fx-82sp-x2/fitxes/eso/trigonometria.js', X2)
posaPassos(ARREL + '/models/fx-82ms/fitxes/eso/trigonometria.js', MS)
print('fet')
