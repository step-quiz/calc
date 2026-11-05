import re,sys
for p in sys.argv[1:]:
    for ln in open(p):
        m=re.search(r"(titol|enunciat|solucio|tancament|text): (.*)$",ln)
        if not m: continue
        t=m.group(2)
        t2=re.sub(r"\$[^$]*\$","",t); t2=re.sub(r"\[\[[^\]]*\]\]","",t2); t2=re.sub(r"\{\{[^}]*\}\}","",t2)
        t2=re.sub(r"FRASE_ERROR","",t2)
        probs=[]
        if re.search(r"\d",t2): probs.append("nombre sense $: "+",".join(re.findall(r"[^ ]*\d[^ ]*",t2))[:80])
        for w in ["euros","La resposta correcta","estima:","com havíem","uns ","esborra amb"]:
            if w in t: probs.append(w)
        if probs: print(p.split('/')[-3] if 'models' in p else 'ex', m.group(1), '|', '; '.join(probs))
