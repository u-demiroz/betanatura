# BetaNatura Web — `betanatura.app`

Mobile-first companion landing page, Support & FAQ center, Privacy Policy, and Account Deletion portal for the **BetaNatura — 30-Day GLP-1 Companion** iOS and Android apps.

This site is reached when a customer scans the QR code on their BetaNatura supplement bottle, and it satisfies Apple App Store and Google Play Store review requirements for public Support, Privacy Policy, and Account Deletion URLs.

---

## 1. File Structure

```text
docs/
├── index.html                  # 11-section mobile-first landing page (includes #support, #privacy, #delete-account anchors)
├── support/
│   └── index.html              # Standalone crawlable /support page (11 FAQs + support email button)
├── privacy/
│   └── index.html              # Standalone crawlable /privacy page (100% verbatim Privacy Policy)
├── delete-account/
│   └── index.html              # Standalone crawlable /delete-account page (100% verbatim Account Deletion + form)
├── support.html                # Legacy redirect alias -> /support/
├── privacy.html                # Legacy redirect alias -> /privacy/
├── delete-account.html         # Legacy redirect alias -> /delete-account/
├── styles.css                  # Mobile-first CSS with light/dark mode (color-scheme: light dark & light-dark())
├── app.js                      # Vanilla JS: config binding, device detection, sticky bar, scroll reveal, form handlers
├── config.js                   # Single source of truth for store URLs, shop links, contact email, and feature flags
├── assets/
│   ├── logo.svg                # BetaNatura SVG wordmark + leaf icon
│   ├── favicon.svg             # Vector favicon
│   ├── favicon-32x32.png       # 32x32 PNG favicon fallback
│   ├── apple-touch-icon.png    # 180x180 Apple touch icon
│   ├── og-image.webp           # 1200x630 Open Graph / Twitter preview (WebP)
│   ├── og-image.png            # 1200x630 Open Graph / Twitter preview (PNG fallback)
│   ├── app-today.webp          # 1170x2532 Today screen mockup (WebP, <40 KB)
│   ├── app-today.png           # 1170x2532 Today screen mockup (PNG fallback)
│   ├── app-progress.webp       # 1170x2532 30-Day Progress screen mockup (WebP, <40 KB)
│   ├── app-progress.png        # 1170x2532 30-Day Progress screen mockup (PNG fallback)
│   ├── app-refill.webp         # 1170x2532 Refill & Plan screen mockup (WebP, <40 KB)
│   ├── app-refill.png          # 1170x2532 Refill & Plan screen mockup (PNG fallback)
│   ├── badge-app-store.svg     # Official "Download on the App Store" vector badge
│   ├── badge-google-play.svg   # Official "Get it on Google Play" vector badge
│   ├── qr-app-store.svg        # Desktop scan-to-download QR code for App Store
│   ├── qr-google-play.svg      # Desktop scan-to-download QR code for Google Play
│   └── chevron-down.svg        # Accordion summary disclosure mask icon
├── robots.txt                  # Search engine crawler directives
├── sitemap.xml                 # XML sitemap for /, /support/, /privacy/, /delete-account/
├── CNAME                       # Custom domain binding (betanatura.app)
└── README.md                   # This documentation file
```

---

## 2. How to Edit Configuration (`config.js`)

All URLs, contact emails, company details, and feature flags are centralized in [`config.js`](./config.js). Editing `config.js` automatically updates every store badge, footer link, support button, and deletion form across all four pages.

```javascript
window.BETANATURA_CONFIG = {
  SUPPORT_EMAIL: "info@betanatura.com",
  PRODUCT_NAME: "BetaNatura GLP-1 Support",
  APP_STORE_URL: "https://apps.apple.com/us/app/beta-natura/id6828905399",
  GOOGLE_PLAY_URL: "https://play.google.com/store/apps/details?id=com.betanatura.betanatura",
  AMAZON_URL: "https://www.amazon.com/dp/B07PJW4RJH",
  SHOP_URL: "https://www.betanatura.com",
  ENABLE_EMAIL_CAPTURE: false,
  ENABLE_ANALYTICS: false,
  COMPANY_NAME: "Demiroz LLC",
  COMPANY_ADDRESS: "United States"
};
```

### Feature Flags
- **`ENABLE_EMAIL_CAPTURE`**: Set to `true` when you connect an email provider (e.g., Klaviyo or Mailchimp) to reveal Section 9 ("Get your free 30-day GLP-1 habit guide by email"). Defaults to `false` (hidden).
- **`ENABLE_ANALYTICS`**: Set to `true` and optionally define `window.BETANATURA_ANALYTICS_HANDLER = function(payload) { ... }` to receive privacy-friendly events (`click_app_store`, `click_google_play`, `click_shop`, `click_amazon`, `open_faq`, `submit_delete_request`, `submit_email_capture`). Defaults to `false` (no cookies, no third-party tracking).

---

## 3. How to Run Locally

No build step, bundler, or Node dependencies are required. Serve the `docs/` folder with any static HTTP server:

```bash
# From the repository root:
python3 -m http.server 8000 --directory docs
```

Then open in your browser:
- Landing Page: `http://localhost:8000/`
- Standalone Support & FAQ: `http://localhost:8000/support/`
- Standalone Privacy Policy: `http://localhost:8000/privacy/`
- Standalone Account Deletion: `http://localhost:8000/delete-account/`

---

## 4. How to Deploy

### GitHub Pages (`https://betanatura.app`)
The `docs/` folder is tracked by its own Git repository connected to `https://github.com/u-demiroz/betanatura.git` with the `CNAME` file set to `betanatura.app`:

```bash
git -C docs status
git -C docs add -A
git -C docs commit -m "Update betanatura.app"
git -C docs push origin main
```

### Firebase Hosting (`https://betanatura-ed1a1.web.app`)
From the project root directory (where `firebase.json` points `"public": "docs"`):

```bash
firebase deploy --only hosting --project betanatura-ed1a1
```

---

## 5. Owner-Supplied Assets & Future `TODO` List

The site ships with production-ready UI screenshots (`1170×2532` WebP & PNG) matching the real BetaNatura app UI, real App Store & Google Play links, and real Amazon/Shop links. If the brand team wants to customize further in the future, review these optional items:

- [ ] **Support Email Domain (`config.js` → `SUPPORT_EMAIL`)**: Currently set to `info@betanatura.com` (matching the verbatim Privacy Policy and Account Deletion text). Update to a `@betanatura.com` address in `config.js` if desired.
- [ ] **Company Mailing Address (`config.js` → `COMPANY_ADDRESS`)**: Currently set to `"United States"` under `Demiroz LLC`. Replace with a full street/suite address if needed for footer display.
- [ ] **Optional High-Resolution Bottle Studio Photo**: Section 5 ("Inside Your Bottle") currently uses a clean botanical capsule illustration card and ingredient grid. If a studio bottle PNG/WebP cutout is available, it can be dropped into `docs/assets/` and referenced in Section 5.
- [ ] **Optional Email Marketing Integration (`config.js` → `ENABLE_EMAIL_CAPTURE`)**: When ready to collect email leads for the 30-day GLP-1 habit guide, set `ENABLE_EMAIL_CAPTURE: true` in `config.js` and wire the form submission in `app.js` (`initEmailCaptureForm`) to your ESP endpoint.
