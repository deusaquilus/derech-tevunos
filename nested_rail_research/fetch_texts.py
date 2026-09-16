import json, re, sys, urllib.request, unicodedata
def strip(s):
    s = re.sub(r'<[^>]+>', '', s)
    s = ''.join(c for c in unicodedata.normalize('NFD', s) if not unicodedata.combining(c))
    s = s.replace('\u05bd','').replace('\u05be','-').replace('\u05c3','')
    return re.sub(r'\s+', ' ', s).strip()
for ref in sys.argv[1:]:
    url = f"https://www.sefaria.org/api/v3/texts/{ref}?version=hebrew"
    d = json.load(urllib.request.urlopen(url, timeout=30))
    t = d['versions'][0]['text']
    out = open(ref.replace('.', '_') + '.txt', 'w')
    for i, s in enumerate(t):
        out.write(f"{ref}:{i+1}\t{strip(s)}\n")
    out.close()
    print(ref, len(t))
