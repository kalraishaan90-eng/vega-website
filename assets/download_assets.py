import urllib.request
import ssl
import json
import os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

os.makedirs('d:/VEGA REDESIGN/assets/img', exist_ok=True)

def download(url, dest):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx) as r:
            with open(dest, 'wb') as f:
                f.write(r.read())
        print(f"Downloaded {dest} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed {url}: {e}")

# Download brand assets
download('https://cdn.shopify.com/s/files/1/0775/8299/1545/files/Vega_2_1.png', 'd:/VEGA REDESIGN/assets/img/vega-logo.png')
download('https://cdn.shopify.com/s/files/1/0775/8299/1545/files/Vega_banner_17_4_2026_jpg.jpg', 'd:/VEGA REDESIGN/assets/img/hero-banner-1.jpg')
download('https://cdn.shopify.com/s/files/1/0775/8299/1545/files/Vega_banner_17_4_2026_2_jpg.jpg', 'd:/VEGA REDESIGN/assets/img/hero-banner-2.jpg')

# Now load products and inspect categories
with open('d:/VEGA REDESIGN/assets/real_products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

products = data.get('products', [])
print(f"Total products: {len(products)}")

# Categorize and download key product images
downloaded_count = 0
for p in products:
    for i, img in enumerate(p.get('images', [])[:3]): # top 3 images per product
        src = img.get('src')
        ext = src.split('?')[0].split('.')[-1]
        filename = f"{p['handle']}-{i+1}.{ext}"
        target = f"d:/VEGA REDESIGN/assets/img/{filename}"
        if not os.path.exists(target) and downloaded_count < 40:
            download(src, target)
            downloaded_count += 1

print(f"Finished downloading {downloaded_count} product images")
