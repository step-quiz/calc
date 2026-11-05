"""Solució del «Prova-ho tu»: la part matemàtica (les línies abans de «R)») dins de [mat]…[/mat] (David, v114)."""
def solmat(t):
    if t.lstrip().startswith('[mat]') or '$' not in t:
        return t
    linies = t.split('\n')
    i = next((k for k, l in enumerate(linies) if l.startswith('R)') or l.startswith('[nota]')), len(linies))
    if i == 0:
        return t
    return '[mat]' + '\n'.join(linies[:i]) + '[/mat]' + ('\n' + '\n'.join(linies[i:]) if i < len(linies) else '')
