import urllib.request
import ssl
import json
import os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open('d:/VEGA REDESIGN/assets/real_products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

products = data.get('products', [])

def download(url, dest):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx) as r:
            with open(dest, 'wb') as f:
                f.write(r.read())
        print(f"Downloaded {dest}")
    except Exception as e:
        print(f"Failed {url}: {e}")

# Target key items:
targets = [
    'jackets', 'ts-pl-polo', 'supporter', 'sleeves', 
    'exode-mud-motion-relaxed-fit-terry-tee',
    'exode-life-is-a-journey-relaxed-fit-tee'
]

for p in products:
    if any(t in p['handle'] for t in targets):
        for i, img in enumerate(p.get('images', [])[:3]):
            src = img['src']
            ext = src.split('?')[0].split('.')[-1]
            target = f"d:/VEGA REDESIGN/assets/img/{p['handle']}-{i+1}.{ext}"
            if not os.path.exists(target):
                download(src, target)

# Also cricket socks or cricket gear
for p in products:
    if 'cricket' in p['title'].lower() or 'cric' in p['handle'].lower():
        for i, img in enumerate(p.get('images', [])[:3]):
            src = img['src']
            ext = src.split('?')[0].split('.')[-1]
            target = f"d:/VEGA REDESIGN/assets/img/{p['handle']}-{i+1}.{ext}"
            if not os.path.exists(target):
                download(src, target)

print("Targeted image downloads completed.")
