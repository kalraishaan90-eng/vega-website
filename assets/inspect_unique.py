import json

with open('d:/VEGA REDESIGN/assets/real_products.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

products = d.get('products', [])

with open('d:/VEGA REDESIGN/assets/product_summary.txt', 'w', encoding='utf-8') as out:
    for i, p in enumerate(products):
        price = p['variants'][0]['price']
        compare_at = p['variants'][0].get('compare_at_price') or ''
        imgs = [img['src'] for img in p.get('images', [])]
        opts = {o['name']: o['values'] for o in p.get('options', [])}
        out.write(f"ID: {p['id']} | Handle: {p['handle']}\n")
        out.write(f"Title: {p['title']}\n")
        out.write(f"Price: Rs. {price} (Compare: {compare_at})\n")
        out.write(f"Options: {opts}\n")
        out.write(f"Images count: {len(imgs)}\n")
        if imgs:
            out.write(f"First image: {imgs[0]}\n")
        out.write("-" * 40 + "\n")

print(f"Wrote summary of {len(products)} products to product_summary.txt")
