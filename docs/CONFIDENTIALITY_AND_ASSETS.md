# Asset Policy & Presentation Confidentiality Notice

> **Client:** Vega Auto Accessories Pvt. Ltd. (Belgaum, Karnataka, India)  
> **Status:** Strictly Confidential Demo / Pitch Prototype  
> **Distribution:** Internal & Direct Stakeholder Presentation Only

---

## 1. Asset Ownership & Copyright
- **Photography & Imagery:** All helmet imagery, visor renders, studio photography, and brand graphics located in `/assets/img/` and referenced in `/assets/js/data.js` or `assets/real_products.json` are the intellectual property of **Vega Auto Accessories Pvt. Ltd.**
- **Permitted Use:** These assets are incorporated solely for the private stakeholder demonstration and pitch to Vega leadership (including the executive leadership and son).
- **Prohibited Actions:** 
  - **DO NOT** deploy this repository to public, unauthenticated hosting services (such as public Vercel, Netlify, or GitHub Pages without password protection or IP whitelisting).
  - **DO NOT** push this repository to public Git remotes (GitHub, GitLab, Bitbucket).
  - **DO NOT** repurpose or distribute Vega high-resolution photography for any third-party commercial applications.

---

## 2. Secure Local & Private Demo Protocol
To present the demo to the client on both desktop and mobile without public exposure:

### Option A: Local Network Wi-Fi Testing (Direct Phone Access)
1. Start a local server:
   ```bash
   npx serve .
   # or
   python -m http.server 8080
   ```
2. Note your local machine IP address (e.g. `192.168.1.XX:8080`).
3. Connect the smartphone to the same local Wi-Fi network and open `http://192.168.1.XX:8080`.

### Option B: Authenticated Tunneling (ngrok / Cloudflare Tunnel)
If presenting remotely to the son over cellular data:
1. Run tunnel with HTTP Basic Auth:
   ```bash
   ngrok http 8080 --basic-auth="vega:secret2026"
   ```
2. Share the temporary secured HTTPS link with credentials.
3. Terminate tunnel immediately once the walkthrough concludes.

---

## 3. Production Transition Protocol
Upon project green-light and contract execution:
1. All photography assets will be ingested directly into the official Vega Shopify CDN via the client's official Shopify store admin.
2. The static prototype will be retired in favor of the private Shopify theme repository (`vega-theme-shopify`).
