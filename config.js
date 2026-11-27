/**
 * BetaNatura Public Website Configuration (betanatura.app)
 * Edit values below to update links, support contact, or feature flags across all pages.
 */
window.BETANATURA_CONFIG = Object.freeze({
  // Support contact email displayed in Support & FAQ and Account Deletion sections
  SUPPORT_EMAIL: "hello@tulpara.com",

  // Full bottle label product name (kept out of headings; owners can switch between
  // "GLP-1 Weight Loss Support" and "GLP-1 Activate" here in one place)
  PRODUCT_NAME: "BetaNatura GLP-1 Support",

  // Official App Store URL (iOS)
  APP_STORE_URL: "https://apps.apple.com/us/app/beta-natura/id6828905399",

  // Official Google Play URL (Android)
  // Configured with live package ID com.betanatura.betanatura (replaces TODO_PACKAGE_NAME placeholder)
  GOOGLE_PLAY_URL: "https://play.google.com/store/apps/details?id=com.betanatura.betanatura",

  // Official Product & Storefront URLs
  SHOP_URL: "https://www.betanatura.com",
  AMAZON_URL: "https://www.amazon.com/dp/B07PJW4RJH",

  // Newsletter / email capture section flag (MUST remain false until a backend endpoint is configured)
  ENABLE_EMAIL_CAPTURE: false,
  EMAIL_CAPTURE_ENDPOINT: "", // TODO: Set newsletter POST endpoint before setting ENABLE_EMAIL_CAPTURE = true

  // Privacy-first analytics hook flag (disabled by default; no third-party cookies or trackers)
  ENABLE_ANALYTICS: false,

  // Legal entity & address (printed on bottle label)
  COMPANY_NAME: "Demiroz LLC",
  COMPANY_ADDRESS: "" // TODO: Add physical address printed on the BetaNatura bottle label if required
});
