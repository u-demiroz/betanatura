/**
 * BetaNatura (betanatura.app) — Vanilla Client-Side Enhancement
 * Handles:
 * 1. Config binding from window.BETANATURA_CONFIG
 * 2. Device-aware App Store / Google Play badge ordering
 * 3. Sticky top bar hide-on-scroll-down / show-on-scroll-up
 * 4. Subtle scroll-reveal animations (respecting prefers-reduced-motion)
 * 5. Account deletion request form & optional newsletter flag
 * 6. Disabled-by-default privacy-first analytics hook
 */
(function () {
  "use strict";

  var cfg = window.BETANATURA_CONFIG || {
    SUPPORT_EMAIL: "hello@tulpara.com",
    PRODUCT_NAME: "BetaNatura GLP-1 Support",
    APP_STORE_URL: "https://apps.apple.com/us/app/beta-natura/id6828905399",
    GOOGLE_PLAY_URL:
      "https://play.google.com/store/apps/details?id=com.betanatura.betanatura",
    SHOP_URL: "https://www.betanatura.com",
    AMAZON_URL: "https://www.amazon.com/dp/B07PJW4RJH",
    ENABLE_EMAIL_CAPTURE: false,
    ENABLE_ANALYTICS: false,
    COMPANY_NAME: "Demiroz LLC",
    COMPANY_ADDRESS: ""
  };

  // Privacy-first analytics hook (disabled by default; zero cookies or trackers)
  window.BetaNaturaAnalytics = {
    track: function (eventName, payload) {
      if (!cfg.ENABLE_ANALYTICS) return;
      if (typeof window. customAnalyticsEndpoint === "function") {
        window.customAnalyticsEndpoint(eventName, payload || {});
      }
    }
  };

  // 1. Apply config values to data-* attributes
  function applyConfigBindings() {
    var appStoreLinks = document.querySelectorAll("[data-config-href='APP_STORE_URL']");
    appStoreLinks.forEach(function (el) {
      el.setAttribute("href", cfg.APP_STORE_URL);
    });

    var playLinks = document.querySelectorAll("[data-config-href='GOOGLE_PLAY_URL']");
    playLinks.forEach(function (el) {
      el.setAttribute("href", cfg.GOOGLE_PLAY_URL);
    });

    var shopLinks = document.querySelectorAll("[data-config-href='SHOP_URL']");
    shopLinks.forEach(function (el) {
      el.setAttribute("href", cfg.SHOP_URL);
    });

    var amazonLinks = document.querySelectorAll("[data-config-href='AMAZON_URL']");
    amazonLinks.forEach(function (el) {
      el.setAttribute("href", cfg.AMAZON_URL);
    });

    var emailLinks = document.querySelectorAll("[data-config-email]");
    emailLinks.forEach(function (el) {
      el.setAttribute("href", "mailto:" + cfg.SUPPORT_EMAIL);
      if (el.getAttribute("data-config-email") === "text") {
        el.textContent = cfg.SUPPORT_EMAIL;
      } else if (el.getAttribute("data-config-email") === "button") {
        el.textContent = "Contact Support (" + cfg.SUPPORT_EMAIL + ")";
      }
    });

    var productNodes = document.querySelectorAll("[data-config-text='PRODUCT_NAME']");
    productNodes.forEach(function (el) {
      el.textContent = cfg.PRODUCT_NAME;
    });

    var addressNodes = document.querySelectorAll("[data-config-text='COMPANY_ADDRESS']");
    addressNodes.forEach(function (el) {
      if (cfg.COMPANY_ADDRESS && cfg.COMPANY_ADDRESS.trim().length > 0) {
        el.textContent = " · " + cfg.COMPANY_ADDRESS.trim();
        el.hidden = false;
      }
    });

    // Newsletter section flag (ENABLE_EMAIL_CAPTURE = false by default)
    var newsletterSection = document.getElementById("newsletter");
    if (newsletterSection) {
      newsletterSection.hidden = !cfg.ENABLE_EMAIL_CAPTURE;
    }
  }

  // 2. Detect visitor's device and order App Store / Google Play badges
  function applyDeviceAwareStoreOrder() {
    var ua = navigator.userAgent || "";
    var isAndroid = /Android/i.test(ua);
    var isIOS = /iPhone|iPad|iPod/i.test(ua);
    var device = isAndroid ? "android" : isIOS ? "ios" : "desktop";

    var badgeGroups = document.querySelectorAll(".store-badges");
    badgeGroups.forEach(function (group) {
      group.setAttribute("data-device", device);
    });

    var topGetAppBtn = document.getElementById("top-get-app-btn");
    if (topGetAppBtn) {
      if (isAndroid) {
        topGetAppBtn.setAttribute("href", cfg.GOOGLE_PLAY_URL);
      } else if (isIOS) {
        topGetAppBtn.setAttribute("href", cfg.APP_STORE_URL);
      }
    }
  }

  // 3. Sticky top bar auto-hide on scroll down, reveal on scroll up
  function initStickyTopBar() {
    var topBar = document.querySelector(".top-bar");
    if (!topBar) return;

    var lastScrollY = window.scrollY || 0;
    var ticking = false;

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            var currentY = window.scrollY || 0;
            if (currentY > 90 && currentY > lastScrollY + 6) {
              topBar.classList.add("is-hidden");
            } else if (currentY < lastScrollY - 6 || currentY <= 90) {
              topBar.classList.remove("is-hidden");
            }
            lastScrollY = currentY;
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // 4. Subtle scroll reveal (respects prefers-reduced-motion)
  function initScrollReveal() {
    var reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var targets = document.querySelectorAll(".reveal-on-scroll");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  // 5. Account deletion form & optional newsletter form handlers
  function initForms() {
    var delForm = document.getElementById("delete-account-form");
    if (delForm) {
      delForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var msg = document.getElementById("del-msg");
        if (msg) {
          msg.style.display = "block";
          msg.hidden = false;
        }
        delForm.reset();
        window.BetaNaturaAnalytics.track("account_deletion_requested");
      });
    }

    var newsForm = document.getElementById("newsletter-form");
    if (newsForm) {
      newsForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!cfg.ENABLE_EMAIL_CAPTURE) return;
        var status = document.getElementById("newsletter-status");
        if (status) {
          status.hidden = false;
        }
        newsForm.reset();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      applyConfigBindings();
      applyDeviceAwareStoreOrder();
      initStickyTopBar();
      initScrollReveal();
      initForms();
    });
  } else {
    applyConfigBindings();
    applyDeviceAwareStoreOrder();
    initStickyTopBar();
    initScrollReveal();
    initForms();
  }
})();
