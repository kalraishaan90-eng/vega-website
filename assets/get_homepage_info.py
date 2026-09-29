import urllib.request
import re
import ssl
import json
import os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(
    'https://vegasportwear.com',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
)

with urllib.request.urlopen(req, context=ctx) as r:
    html = r.read().decode('utf-8', errors='ignore')

titles = re.findall(r'<title>(.*?)</title>', html, re.I)
print("Page title:", titles)

# Find logo
logo_candidates = re.findall(r'(https?:)?(//cdn\.shopify\.com/s/files/[^"\'\s]+\.(?:png|jpg|jpeg|webp|svg))', html)
print(f"Found {len(logo_candidates)} CDN image URLs on homepage:")
seen = set()
for prefix, url in logo_candidates:
    full_url = "https:" + url if url.startswith("//") else url
    # Clean query string if any
    clean_url = full_url.split('?')[0]
    if clean_url not in seen:
        seen.add(clean_url)
        if any(w in clean_url.lower() for w in ['logo', 'icon', 'brand', 'header']):
            print(" Potential Logo:", clean_url)
        else:
            print(" Image:", clean_url)
