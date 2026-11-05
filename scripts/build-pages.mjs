/**
 * Génère les pages « services » statiques du site (FR / EN / AR) + le sitemap.
 * ---------------------------------------------------------------------------
 *   node scripts/build-pages.mjs           → (ré)écrit les pages + sitemap.xml
 *   node scripts/build-pages.mjs --check   → échoue si une page diffère (CI)
 *
 * Philosophie du dépôt : AUCUN build au déploiement. Les pages générées sont
 * commitées telles quelles ; Netlify sert la racine du dépôt. Ce script est un
 * outil de maintenance local : on le lance après avoir édité pages-data.mjs ou
 * le chrome des pages d'accueil, puis on commit le résultat.
 *
 * Le chrome (header, footer, section contact, bandeau CTA, barres flottantes,
 * graphe d'entités JSON-LD) est EXTRAIT des pages d'accueil : une seule source
 * de vérité, pas de dérive entre l'accueil et les pages internes.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE, PAGES_DATE, LANGS, BRAND, BRAND_LINE, LANG_META, OG_ALT, UI, ICONS,
  SERVICES, HUB, langBase, hubPath, servicePath, otherServices,
} from "./pages-data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHECK = process.argv.includes("--check");

/* ---------- petits utilitaires ---------- */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const abs = (p) => `${SITE}${p}`;
const homeFile = { fr: "index.html", en: "en/index.html", ar: "ar/index.html" };

function between(html, startMarker, endMarker, label) {
  const i = html.indexOf(startMarker);
  if (i === -1) throw new Error(` Marqueur introuvable : ${label} (« ${startMarker} »)`);
  const j = html.indexOf(endMarker, i);
  if (j === -1) throw new Error(` Marqueur de fin introuvable : ${label}`);
  return html.slice(i, j + endMarker.length);
}

/* Extrait le chrome d'une page d'accueil. */
async function loadChrome(lang) {
  const html = await readFile(path.join(root, homeFile[lang]), "utf8");
  const header = between(html, '<header class="site-head">', "</header>", "header");
  const footer = between(html, '<footer class="site-foot">', "</footer>", "footer");
  const contact = between(html, '<section class="section contact" id="contact">', "</section>", "contact");
  const cta = between(html, '<section class="section cta">', "</section>", "cta");
  const callbar = between(html, '<div class="callbar">', "</div>", "callbar");
  const fabs = between(html, '<div class="fabs">', "</div>", "fabs");
  const mobileCta = between(html, '<div class="mobile-cta"', "</div>", "mobile-cta");
  const script = html.match(/<script src="\/assets\/js\/main\.js[^"]*" defer><\/script>/)?.[0];
  if (!script) throw new Error(" Script main.js introuvable dans " + homeFile[lang]);
  const fonts = html.match(/<link\s+href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]*"\s+rel="stylesheet"\s*\/>/)?.[0];
  if (!fonts) throw new Error(" Lien Google Fonts introuvable dans " + homeFile[lang]);

  // Graphe d'entités : on garde WebSite + LegalService + Person, on retire le
  // WebPage de l'accueil (chaque page interne déclare le sien).
  const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  const graph = JSON.parse(ldMatch[1])["@graph"].filter((n) => n["@type"] !== "WebPage");

  return { header, footer, contact, cta, callbar, fabs, mobileCta, script, fonts, graph };
}

/* Adapte le chrome extrait à une page interne : réécrit les ancres de
   navigation (qui pointaient vers des sections de l'accueil) et le sélecteur
   de langue (qui doit mener à la page équivalente dans l'autre langue). */
function adaptChrome(block, lang, pagePaths) {
  const home = langBase(lang);
  const hub = hubPath(lang);
  let out = block;
  // Logo → racine de la langue
  out = out.replace('<a class="mark" href="#accueil">', `<a class="mark" href="${home}">`);
  // Ancres de sections qui n'existent pas sur la page interne → accueil
  out = out.replaceAll('href="#accueil"', `href="${home}#accueil"`);
  out = out.replaceAll('href="#cabinet"', `href="${home}#cabinet"`);
  out = out.replaceAll('href="#methode"', `href="${home}#methode"`);
  out = out.replaceAll('href="#avis"', `href="${home}#avis"`);
  // « Services » → hub
  out = out.replaceAll('href="#services"', `href="${hub}"`);
  // #faq et #contact existent sur la page interne : on les laisse locaux.
  // aria-current : on le retire de « Accueil » (on n'y est plus).
  out = out.replace(/(href="[^"]*#accueil") aria-current="page"/g, "$1");
  // Sélecteur de langue : page équivalente dans chaque langue.
  const pill = out.match(/<div class="lang-pill"[\s\S]*?<\/div>/)?.[0];
  if (pill) {
    const globe = pill.match(/<svg[\s\S]*?<\/svg>/)[0];
    const label = pill.match(/aria-label="([^"]*)"/)[1];
    const links = LANGS.map((l) => {
      const cur = l === lang ? ' aria-current="page"' : "";
      return `<a href="${pagePaths[l]}"${cur} lang="${l}">${l.toUpperCase()}</a>`;
    }).join("\n            ");
    const rebuilt = `<div class="lang-pill" role="group" aria-label="${label}">\n            ${globe}\n            ${links}\n          </div>`;
    out = out.replace(pill, rebuilt);
  }
  return out;
}

/* ---------- blocs de contenu ---------- */
const arrowSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>';
const checkSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>';
const phoneSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3.5h3l1.6 4-2 1.4a12 12 0 006.5 6.5l1.4-2 4 1.6v3a2 2 0 01-2.2 2A16.5 16.5 0 013 5.7 2 2 0 015 3.5z"/></svg>';
const waSvg = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a9.9 9.9 0 00-8.5 15L2 22l5.2-1.4A9.9 9.9 0 1012 2zm0 17.9c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3a7.9 7.9 0 1112.9 5.9 7.8 7.8 0 01-6.1 1.8z"/></svg>';
const calSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>';
const mailSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6 8.5-6"/></svg>';
const svcIcon = (id) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[id]}</svg>`;

const EMAIL = "avocat.ibrahim.majdoub@gmail.com";
const PHONE_DISPLAY = "+216 96 655 238";
const PHONE_TEL = "+21696655238";
const WA = "21696655238";

/* En arabe, toute chaîne LTR visible (tél, e-mail) doit être isolée par <bdi>. */
const ltr = (lang, s) => (lang === "ar" ? `<bdi dir="ltr">${s}</bdi>` : s);

const PORTRAIT_ALT = {
  fr: "Portrait de Maître Brahim Majdoub, avocat au Barreau de Sousse, en costume devant une bibliothèque",
  en: "Portrait of Brahim Majdoub, attorney at the Sousse Bar, in front of a bookshelf",
  ar: "صورة للمحامي الاستاذ ابراهيم المجدوب، محامٍ بسوسة، أمام مكتبة قانونية",
};

function crumbs(lang, trail) {
  const u = UI[lang];
  const items = [{ label: u.crumbHome, href: langBase(lang) }, { label: u.crumbServices, href: hubPath(lang) }, ...trail];
  const lis = items.map((it, i) => {
    const last = i === items.length - 1;
    const inner = last
      ? `<span aria-current="page">${esc(it.label)}</span>`
      : `<a href="${it.href}">${esc(it.label)}</a>`;
    return `<li>${inner}</li>`;
  }).join("\n          ");
  return `<nav class="crumbs" aria-label="${u.crumbsLabel}">
      <div class="wrap">
        <ol>
          ${lis}
        </ol>
      </div>
    </nav>`;
}

function hero(lang, c, isHub) {
  const u = UI[lang];
  const eyebrow = isHub ? u.hubEyebrow : u.heroEyebrow;
  return `<section class="page-hero">
      <div class="wrap">
        <span class="eyebrow dot">${eyebrow}</span>
        <h1>
          <span class="b">${esc(c.h1)}</span>
          <span class="it">${esc(BRAND_LINE[lang])}</span>
        </h1>
        <p class="lead">${esc(c.lead)}</p>
        <div class="hero-cta">
          <a class="btn" href="#contact">${calSvg} ${u.ctaConsult}</a>
          <a class="btn btn-line" href="tel:${PHONE_TEL}">${phoneSvg} ${ltr(lang, PHONE_DISPLAY)}</a>
        </div>
        <div class="trust-chips">
          <span>${checkSvg}${u.chip1}</span>
          <span>${checkSvg}${u.chip2}</span>
          <span>${checkSvg}${u.chip3}</span>
        </div>
      </div>
    </section>`;
}

function scopeSection(lang, c) {
  const u = UI[lang];
  const cards = c.scope.map((s, i) => `<article class="card">
            <span class="num">${String(i + 1).padStart(2, "0")}</span>
            <h3>${esc(s.t)}</h3>
            <p>${esc(s.d)}</p>
          </article>`).join("\n          ");
  return `<section class="section svc-block" id="scope">
        <div class="section-head">
          <div>
            <span class="eyebrow dash">${u.scopeEyebrow}</span>
            <h2 class="h2">${esc(u.scopeTitle)}</h2>
          </div>
        </div>
        <div class="cards scope-grid reveal-stagger">
          ${cards}
        </div>
      </section>`;
}

function processSection(lang, c) {
  const u = UI[lang];
  const steps = c.process.map((s, i) => `<div class="step">
            <span class="s-num">${String(i + 1).padStart(2, "0")}</span>
            <h3>${esc(s.t)}</h3>
            <p>${esc(s.d)}</p>
          </div>`).join("\n          ");
  return `<section class="section svc-block" id="process">
        <div class="section-head">
          <div>
            <span class="eyebrow dash">${u.processEyebrow}</span>
            <h2 class="h2">${esc(u.processTitle)}</h2>
          </div>
        </div>
        <div class="steps-grid reveal-stagger">
          ${steps}
        </div>
      </section>`;
}

function watchSection(lang, c) {
  return `<aside class="watch reveal">
        <h2>${esc(c.watch.title)}</h2>
        <p>${esc(c.watch.body)}</p>
      </aside>`;
}

function faqSection(lang, faq) {
  const u = UI[lang];
  const items = faq.map((f) => `<details>
            <summary>${esc(f.q)}</summary>
            <p class="a">${esc(f.a)}</p>
          </details>`).join("\n          ");
  return `<section class="section faq svc-block" id="faq">
        <div class="section-head">
          <div>
            <span class="eyebrow dash">${u.faqEyebrow}</span>
            <h2 class="h2">${esc(u.faqTitle)}</h2>
          </div>
        </div>
        <div class="faq-list">
          ${items}
        </div>
      </section>`;
}

function relatedSection(lang, currentId) {
  const u = UI[lang];
  const idx = SERVICES.findIndex((s) => s.id === currentId);
  const related = [1, 2, 3].map((k) => SERVICES[(idx + k) % SERVICES.length]);
  const cards = related.map((s) => `<article class="card">
            <span class="ic" aria-hidden="true">${svcIcon(s.id)}</span>
            <h3>${esc(s.name[lang])}</h3>
            <p>${esc(s.tagline[lang])}</p>
            <a href="${servicePath(s, lang)}">${u.relatedLink} ${arrowSvg}</a>
          </article>`).join("\n          ");
  return `<section class="section svc-block" id="related">
        <div class="section-head">
          <div>
            <span class="eyebrow dash">${u.relatedEyebrow}</span>
            <h2 class="h2">${esc(u.relatedTitle)}</h2>
          </div>
        </div>
        <div class="cards reveal-stagger">
          ${cards}
        </div>
      </section>`;
}

function asideBlock(lang, currentId) {
  const u = UI[lang];
  const others = currentId ? otherServices(currentId) : SERVICES;
  const domainLinks = others.map((s) => `<li><a href="${servicePath(s, lang)}">${esc(s.name[lang])}</a></li>`).join("\n            ");
  const lawyerLink = currentId ? `${langBase(lang)}#cabinet` : `${langBase(lang)}#cabinet`;
  return `<aside class="svc-aside">
        <div class="aside-card aside-contact">
          <h2>${u.asideTitle}</h2>
          <p>${u.asideText}</p>
          <a class="btn btn-white" href="tel:${PHONE_TEL}">${phoneSvg} ${ltr(lang, PHONE_DISPLAY)}</a>
          <a class="btn btn-goldline" href="https://wa.me/${WA}" target="_blank" rel="noreferrer">${waSvg} WhatsApp</a>
          <a class="aside-mail" href="mailto:${EMAIL}">${mailSvg} ${ltr(lang, EMAIL)}</a>
        </div>
        <div class="aside-card aside-lawyer">
          <picture>
            <source type="image/webp" srcset="/assets/img/portrait.webp?v=5" />
            <img src="/assets/img/portrait.jpg?v=5" width="800" height="792" loading="lazy" decoding="async" alt="${esc(PORTRAIT_ALT[lang])}" />
          </picture>
          <div>
            <h2>${u.lawyerCardTitle}</h2>
            <p>${esc(u.lawyerCardText)}</p>
            <a href="${lawyerLink}">${u.lawyerCardLink} ${arrowSvg}</a>
          </div>
        </div>
        <div class="aside-card aside-domains">
          <h2>${u.asideDomains}</h2>
          <ul>
            ${domainLinks}
          </ul>
          <a class="aside-all" href="${hubPath(lang)}">${u.asideAll} ${arrowSvg}</a>
        </div>
      </aside>`;
}

function hubCards(lang) {
  const u = UI[lang];
  const cards = SERVICES.map((s) => {
    const wide = s.id === "douanier";
    // La carte « wide » est une grille à 4 colonnes (num, icône, bloc texte,
    // lien) : h3+p doivent être enveloppés dans un <div>, comme sur l'accueil.
    const text = wide
      ? `<div>\n              <h3>${esc(s.name[lang])}</h3>\n              <p>${esc(s.tagline[lang])}</p>\n            </div>`
      : `<h3>${esc(s.name[lang])}</h3>\n            <p>${esc(s.tagline[lang])}</p>`;
    return `<article class="card${wide ? " wide" : ""}">
            <span class="num">${s.num}</span>
            <span class="ic" aria-hidden="true">${svcIcon(s.id)}</span>
            ${text}
            <a href="${servicePath(s, lang)}">${u.hubCardLink} ${arrowSvg}</a>
          </article>`;
  }).join("\n          ");
  return `<section class="section svc-block" id="domaines">
        <div class="section-head">
          <div>
            <span class="eyebrow dash">${u.hubEyebrow}</span>
            <h2 class="h2">${esc(u.hubCardsTitle)}</h2>
          </div>
        </div>
        <div class="cards reveal-stagger">
          ${cards}
        </div>
      </section>`;
}

/* ---------- JSON-LD ---------- */
function jsonLdGraph(chrome, lang, pagePath, c, service) {
  const pageUrl = abs(pagePath);
  const nodes = [...chrome.graph];
  const u = UI[lang];

  if (service) {
    nodes.push({
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: service.name[lang],
      serviceType: service.name[lang],
      description: c.description,
      url: pageUrl,
      provider: { "@id": `${SITE}/#cabinet` },
      areaServed: [{ "@type": "City", name: "Sousse" }, { "@type": "Country", name: lang === "en" ? "Tunisia" : lang === "ar" ? "تونس" : "Tunisie" }],
    });
  } else {
    nodes.push({
      "@type": "ItemList",
      "@id": `${pageUrl}#services`,
      name: u.hubCardsTitle,
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: abs(servicePath(s, lang)),
        name: s.name[lang],
      })),
    });
  }

  const trail = [{ label: u.crumbHome, url: abs(langBase(lang)) }, { label: u.crumbServices, url: abs(hubPath(lang)) }];
  if (service) trail.push({ label: service.name[lang], url: pageUrl });
  nodes.push({
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.label, item: t.url })),
  });

  nodes.push({
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: c.title,
    inLanguage: lang,
    isPartOf: { "@id": `${SITE}/#site` },
    about: service ? [{ "@id": `${pageUrl}#service` }, { "@id": `${SITE}/#cabinet` }] : [{ "@id": `${SITE}/#cabinet` }],
    mainEntity: { "@id": service ? `${pageUrl}#service` : `${pageUrl}#services` },
    primaryImageOfPage: { "@type": "ImageObject", url: abs("/assets/img/portrait.jpg") },
    dateModified: PAGES_DATE,
  });

  return { "@context": "https://schema.org", "@graph": nodes };
}

function jsonLdFaq(lang, faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* ---------- head ---------- */
function head(lang, chrome, pagePath, pagePaths, c, service) {
  const meta = LANG_META[lang];
  const alternates = LANGS.map((l) => `    <link rel="alternate" hreflang="${l}" href="${abs(pagePaths[l])}" />`).join("\n");
  const ogLocaleAlts = LANGS.filter((l) => l !== lang).map((l) => `    <meta property="og:locale:alternate" content="${LANG_META[l].locale}" />`).join("\n");
  return `  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>${esc(c.title)}</title>
    <meta name="description" content="${esc(c.description)}" />
    <meta name="theme-color" content="#0f1c26" />
    <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
    <link rel="icon" type="image/png" sizes="96x96" href="/assets/img/favicon.png?v=2" />
    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${abs(pagePaths.fr)}" />
    <link rel="canonical" href="${abs(pagePath)}" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />
    <link rel="me" href="https://www.facebook.com/brahim.majdoub.7/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(meta.ogSiteName)}" />
    <meta property="og:title" content="${esc(c.title)}" />
    <meta property="og:description" content="${esc(c.description)}" />
    <meta property="og:url" content="${abs(pagePath)}" />
    <meta property="og:image" content="${abs("/assets/img/og-v4.jpg")}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(OG_ALT[lang])}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(c.title)}" />
    <meta name="twitter:description" content="${esc(c.description)}" />
    <meta name="twitter:image" content="${abs("/assets/img/og-v4.jpg")}" />
    <meta property="og:locale" content="${meta.locale}" />
${ogLocaleAlts}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    ${chrome.fonts}
    <link rel="stylesheet" href="/assets/css/style.css?v=20261104" />
    <script type="application/ld+json">
${JSON.stringify(jsonLdGraph(chrome, lang, pagePath, c, service), null, 2).replace(/^/gm, "      ")}
    </script>
    <script type="application/ld+json">
${JSON.stringify(jsonLdFaq(lang, c.faq), null, 2).replace(/^/gm, "      ")}
    </script>
  </head>`;
}

/* ---------- assemblage d'une page ---------- */
function renderPage({ lang, chrome, pagePath, pagePaths, c, service }) {
  const meta = LANG_META[lang];
  const u = UI[lang];
  const adaptedHeader = adaptChrome(chrome.header, lang, pagePaths);
  const adaptedFooter = adaptChrome(chrome.footer, lang, pagePaths);
  const trail = service ? [{ label: service.name[lang] }] : [];
  const main = service
    ? `${scopeSection(lang, c)}
      ${processSection(lang, c)}
      ${watchSection(lang, c)}
      ${faqSection(lang, c.faq)}
      ${relatedSection(lang, service.id)}`
    : `${hubCards(lang)}
      ${faqSection(lang, c.faq)}`;

  const headHtml = head(lang, chrome, pagePath, pagePaths, c, service);

  return `<!doctype html>
<html lang="${lang}" dir="${meta.dir}">
${headHtml}
  <body>
    <a class="skip" href="#main">${esc(skipText(lang))}</a>

    ${adaptedHeader}

    <main id="main">
      ${crumbs(lang, trail)}
      ${hero(lang, c, !service)}
      <div class="svc-layout wrap">
        <div class="svc-main">
          ${main}
        </div>
        ${asideBlock(lang, service ? service.id : null)}
      </div>
      <p class="svc-note wrap">${esc(u.note)}</p>
      ${chrome.cta}
      ${chrome.contact}
    </main>

    ${adaptedFooter}

    ${chrome.callbar}

    ${chrome.fabs}

    ${chrome.script}
    ${chrome.mobileCta}
  </body>
</html>
`;
}

function skipText(lang) {
  return { fr: "Aller au contenu principal", en: "Skip to main content", ar: "تخطٍّ إلى المحتوى الرئيسي" }[lang];
}

/* ---------- sitemap ---------- */
function sitemapEntry(url, paths, lastmod, images = []) {
  const alts = ["x-default", "fr", "en", "ar"].map((hl) => {
    const target = hl === "x-default" ? paths.fr : paths[hl];
    return `    <xhtml:link rel="alternate" hreflang="${hl}" href="${abs(target)}" />`;
  }).join("\n");
  const imgs = images.map((im) => `      <image:image>
        <image:loc>${abs(im.loc)}</image:loc>
        <image:title>${esc(im.title)}</image:title>
      </image:image>`).join("\n");
  return `  <url>
    <loc>${abs(url)}</loc>
    <lastmod>${lastmod}</lastmod>
${alts}
${imgs}
  </url>`;
}

async function buildSitemap() {
  const homePaths = { fr: "/", en: "/en/", ar: "/ar/" };
  const homeImages = {
    fr: [
      { loc: "/assets/img/office.jpg", title: "Maître Brahim Majdoub, avocat au Barreau de Sousse, à son bureau — plaque nominative « إبراهيم المجدوب », balance de la justice et rayonnage juridique" },
      { loc: "/assets/img/portrait.jpg", title: "Portrait de Maître Brahim Majdoub, avocat au Barreau de Sousse, en costume devant une bibliothèque" },
    ],
    en: [
      { loc: "/assets/img/office.jpg", title: "Brahim Majdoub, attorney at the Sousse Bar, at his desk — Arabic nameplate “إبراهيم المجدوب”, scales of justice and law shelves" },
      { loc: "/assets/img/portrait.jpg", title: "Portrait of Brahim Majdoub, attorney at the Sousse Bar, in front of a bookshelf" },
    ],
    ar: [
      { loc: "/assets/img/office.jpg", title: "المحامي الاستاذ ابراهيم المجدوب، محامٍ لدى الاستئناف بسوسة، في مكتبه — لوحة الاسم «إبراهيم المجدوب» وميزان العدالة ومكتبة قانونية" },
      { loc: "/assets/img/portrait.jpg", title: "صورة للمحامي الاستاذ ابراهيم المجدوب، محامٍ بسوسة، أمام مكتبة قانونية" },
    ],
  };
  const entries = [];
  for (const l of LANGS) entries.push(sitemapEntry(homePaths[l], homePaths, PAGES_DATE, homeImages[l]));
  for (const l of LANGS) {
    const paths = Object.fromEntries(LANGS.map((x) => [x, hubPath(x)]));
    entries.push(sitemapEntry(hubPath(l), paths, PAGES_DATE));
  }
  for (const s of SERVICES) {
    for (const l of LANGS) {
      const paths = Object.fromEntries(LANGS.map((x) => [x, servicePath(s, x)]));
      entries.push(sitemapEntry(servicePath(s, l), paths, PAGES_DATE));
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<!--
  Sitemap du site (source unique de vérité pour Google Search Console).
  Le domaine doit être identique à celui des <link rel="canonical">, hreflang,
  og:url, "url" du JSON-LD, robots.txt et SITE dans scripts/check.mjs.
  <lastmod> : date du dernier changement de CONTENU de la page — elle doit être
  égale au dateModified du noeud WebPage (contrôlé par npm run check).
  L'extension image:image déclare les visuels du cabinet : leurs <image:title>
  reprennent les alt des pages, pour la recherche d'images (marque + visage).
  Généré par scripts/build-pages.mjs — ne pas éditer à la main.
-->
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${entries.join("\n")}
</urlset>
`;
}

/* ---------- validation SEO du contenu ---------- */
function validateContent() {
  const problems = [];
  const all = [...SERVICES.map((s) => ({ id: s.id, content: s.content })), { id: "hub", content: HUB.content }];
  for (const { id, content } of all) {
    for (const l of LANGS) {
      const c = content[l];
      const brand = BRAND[l];
      const family = brand.split(" ").slice(-1)[0];
      if (!c.title.startsWith(brand)) problems.push(`${id}/${l}: title ne commence pas par la marque`);
      if (c.title.length < 30 || c.title.length > 68) problems.push(`${id}/${l}: title ${c.title.length} car. (30–68)`);
      if (c.description.length < 120 || c.description.length > 175) problems.push(`${id}/${l}: description ${c.description.length} car. (120–175)`);
      if (!c.description.includes(family)) problems.push(`${id}/${l}: description sans le nom de famille`);
      if (!c.h1) problems.push(`${id}/${l}: h1 vide`);
      if (l === "ar" && /أبراهيم/.test(JSON.stringify(c))) problems.push(`${id}/${l}: hamza « أبراهيم » dans le contenu arabe`);
    }
  }
  if (problems.length) {
    console.error("Problèmes de contenu :\n" + problems.map((p) => "  ✗ " + p).join("\n"));
    process.exit(1);
  }
}

/* ---------- orchestration ---------- */
async function main() {
  validateContent();
  const chromes = Object.fromEntries(await Promise.all(LANGS.map(async (l) => [l, await loadChrome(l)])));
  const outputs = new Map(); // chemin relatif → contenu

  for (const l of LANGS) {
    // Hub
    const hubPaths = Object.fromEntries(LANGS.map((x) => [x, hubPath(x)]));
    outputs.set(`${hubPath(l).slice(1)}index.html`, renderPage({ lang: l, chrome: chromes[l], pagePath: hubPath(l), pagePaths: hubPaths, c: HUB.content[l], service: null }));
    // Services
    for (const s of SERVICES) {
      const paths = Object.fromEntries(LANGS.map((x) => [x, servicePath(s, x)]));
      outputs.set(`${servicePath(s, l).slice(1)}index.html`, renderPage({ lang: l, chrome: chromes[l], pagePath: servicePath(s, l), pagePaths: paths, c: s.content[l], service: s }));
    }
  }
  outputs.set("sitemap.xml", await buildSitemap());

  let drift = 0;
  for (const [rel, content] of outputs) {
    const full = path.join(root, rel);
    if (CHECK) {
      const existing = await readFile(full, "utf8").catch(() => null);
      if (existing !== content) {
        drift++;
        console.error(`✗ ${rel} diffère de la génération (relancez « npm run pages »)`);
      }
    } else {
      await mkdir(path.dirname(full), { recursive: true });
      await writeFile(full, content, "utf8");
      console.log(`✓ ${rel}`);
    }
  }
  if (CHECK) {
    if (drift) {
      console.error(`\n${drift} fichier(s) en dérive.`);
      process.exit(1);
    }
    console.log(`✓ ${outputs.size} fichiers générés à l'identique.`);
  } else {
    console.log(`\n${outputs.size} fichiers écrits (24 pages + sitemap).`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
