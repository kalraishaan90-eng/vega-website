import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(
    'https://vegasportwear.com/products.json?limit=250',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
)

try:
    with urllib.request.urlopen(req, context=ctx) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        products = data.get('products', [])
        print(f"Total products fetched: {len(products)}")
        with open('d:/VEGA REDESIGN/assets/real_products.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
        for i, p in enumerate(products[:15]):
            print(f"{i+1}. {p['title']} | Handle: {p['handle']} | Price: Rs.{p['variants'][0]['price']} | Imgs: {len(p.get('images', []))}")
except Exception as e:
    print(f"Error: {e}")
