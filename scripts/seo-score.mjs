/**
 * Scoreur SEO technique — note /100 reproductible sur tout ce que le CODE
 * contrôle (crawl, métadonnées, structure, données structurées, performance).
 *
 *   npm run seo:score          → affiche la note + le détail par catégorie
 *   npm run seo:score --strict → échoue si < 100 (CI)
 *
 * Honnêteté : cette note mesure le SEO ON-SITE. Elle ne prétend pas mesurer le
 * hors-site (avis Google, backlinks, fiche Business), qui dépend d'actions
 * humaines et ne se « code » pas. Voir AUDIT-SEO.md pour le tableau complet.
 *
 * Chaque critère est binaire et vérifié réellement sur les fichiers : aucun
 * critère « décoratif ». La note = critères réussis / critères total × 100.
 */
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SERVICES, LANGS, BRAND, hubPath, servicePath } from "./pages-data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STRICT = process.argv.includes("--strict");
const SITE = "https://ibrahimmajdoub.netlify.app";
const EMAIL = "avocat.ibrahim.majdoub@gmail.com";
const PHONE = "21696655238";
const FB = "https://www.facebook.com/brahim.majdoub.7/";
const NAP = { fr: "Immeuble Mahjoub", en: "Mahjoub Building", ar: "عمارة محجوب" };
const FORBIDDEN = ["Ibrahim Mahjoub", "Brahim Mahjoub", "ابراهيم مجدوب", "المحجوب"];

/* ---------- collecte des 27 pages de contenu ---------- */
const pageDefs = [
  { file: "index.html", lang: "fr", path: "/" },
  { file: "en/index.html", lang: "en", path: "/en/" },
  { file: "ar/index.html", lang: "ar", path: "/ar/" },
];
for (const l of LANGS) {
  pageDefs.push({ file: `${hubPath(l).slice(1)}index.html`, lang: l, path: hubPath(l), hub: true });
  for (const s of SERVICES)
    pageDefs.push({ file: `${servicePath(s, l).slice(1)}index.html`, lang: l, path: servicePath(s, l), service: s });
}
const pages = [];
for (const p of pageDefs) {
  const html = await readFile(path.join(root, p.file), "utf8").catch(() => null);
  if (html === null) { console.error(`Page manquante : ${p.file}`); process.exit(1); }
  pages.push({ ...p, html, visible: html.replace(/<script[\s\S]*?<\/script>/g, " ") });
}
const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
const robots = await readFile(path.join(root, "robots.txt"), "utf8");
const netlify = await readFile(path.join(root, "netlify.toml"), "utf8");
const notFound = await readFile(path.join(root, "404.html"), "utf8").catch(() => "");
const lastmods = [...sitemap.matchAll(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/g)].map((m) => m[1]);

/* ---------- helpers ---------- */
const title = (h) => h.match(/<title>([\s\S]*?)<\/title>/)?.[1].trim() ?? "";
const desc = (h) => h.match(/name="description"\s+content="([^"]*)"/)?.[1] ?? "";
const h1of = (h) => (h.match(/<h1>[\s\S]*?<\/h1>/)?.[0] ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const langOf = (file) => pages.find((p) => p.file === file)?.lang;
const ldNodes = (h) => {
  const out = [];
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const d = JSON.parse(m[1]); (d["@graph"] ? d["@graph"] : [d]).forEach((n) => out.push(n)); } catch {}
  }
  return out;
};
const everyPage = (fn) => { const fails = pages.filter((p) => !fn(p)).map((p) => p.file); return { pass: fails.length === 0, fails }; };

/* ---------- liens internes + assets locaux résolus (asynchrone) ---------- */
const linkFails = [];
const assetFails = [];
for (const p of pages) {
  for (const h of new Set([...p.html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1].split(/[?#]/)[0]).filter((h) => !h.startsWith("//") && !h.startsWith("/assets/")))) {
    const target = h.endsWith("/") ? `${h}index.html` : h;
    try { await readFile(path.join(root, target.slice(1))); } catch { linkFails.push(`${p.file}: ${h}`); }
  }
  for (const a of new Set([...p.html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((m) => m[1].split(/[?#]/)[0]))) {
    try { await readFile(path.join(root, a)); } catch { assetFails.push(`${p.file}: ${a}`); }
  }
}

/* ---------- définition des critères ---------- */
const checks = [];
const add = (cat, name, result) => checks.push({ cat, name, pass: result.pass, fails: result.fails ?? [] });
const ok = (pass, fails = []) => ({ pass, fails });

/* A. Indexabilité & crawl */
add("A. Indexabilité & crawl", "robots.txt valide + directive Sitemap canonique",
  ok(!/^\s*Disallow:\s*\/\s*$/m.test(robots) && robots.includes(`Sitemap: ${SITE}/sitemap.xml`)));
add("A. Indexabilité & crawl", "meta robots index,follow + max-image-preview:large (27 pages)",
  everyPage((p) => { const r = p.html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? ""; return /index/.test(r) && r.includes("max-image-preview:large"); }));
add("A. Indexabilité & crawl", "canonical auto-référent absolu (27 pages)",
  everyPage((p) => p.html.includes(`rel="canonical" href="${SITE}${p.path}"`)));
add("A. Indexabilité & crawl", "hreflang fr/en/ar/x-default présents (27 pages)",
  everyPage((p) => ["fr", "en", "ar", "x-default"].every((l) => p.html.includes(`hreflang="${l}"`))));
add("A. Indexabilité & crawl", "sitemap : 27 URLs + lastmod + 4 alternates par URL",
  ok([...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].length === pages.length &&
     [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].every(([, b]) => /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(b) && ["fr", "en", "ar", "x-default"].every((l) => b.includes(`hreflang="${l}"`)))));
add("A. Indexabilité & crawl", "aucun domaine mort / hôte étranger dans les URLs",
  everyPage((p) => !p.html.includes("cabinet-majdoub.tn") && ![...p.html.matchAll(/(?:href|content)="(https?:\/\/[^"]*)"/g)].some((m) => { try { const h = new URL(m[1]).host; return h !== new URL(SITE).host && /(?:^|\.)(netlify\.app|tn)$/i.test(h); } catch { return false; } })));

/* B. Métadonnées & partage */
add("B. Métadonnées & partage", "<title> 30–68 caractères (27 pages)",
  everyPage((p) => { const t = title(p.html); return t.length >= 30 && t.length <= 68; }));
add("B. Métadonnées & partage", "meta description 120–175 caractères (27 pages)",
  everyPage((p) => { const d = desc(p.html); return d.length >= 120 && d.length <= 175; }));
add("B. Métadonnées & partage", "titres uniques sur tout le site",
  ok(new Set(pages.map((p) => title(p.html))).size === pages.length));
add("B. Métadonnées & partage", "descriptions uniques sur tout le site",
  ok(new Set(pages.map((p) => desc(p.html))).size === pages.length));
add("B. Métadonnées & partage", "viewport + charset UTF-8 + lang/dir (27 pages)",
  everyPage((p) => /name="viewport"/.test(p.html) && /charset="UTF-8"/i.test(p.html) && /<html lang=/.test(p.html)));
add("B. Métadonnées & partage", "Open Graph complet : title/desc/url/type/locale (27 pages)",
  everyPage((p) => ["og:title", "og:description", "og:url", "og:type", "og:locale"].every((t) => p.html.includes(`property="${t}"`))));
add("B. Métadonnées & partage", "og:image + width/height/alt (27 pages)",
  everyPage((p) => p.html.includes('property="og:image"') && ["og:image:width", "og:image:height", "og:image:alt"].every((t) => p.html.includes(t))));
add("B. Métadonnées & partage", "image OG en nom versionné, sans query string",
  everyPage((p) => /property="og:image" content="[^"]*og-v4\.jpg"/.test(p.html) && !/og\.jpg\?v=/.test(p.html)));
add("B. Métadonnées & partage", "Twitter Card présente (27 pages)",
  everyPage((p) => p.html.includes('name="twitter:card"')));
add("B. Métadonnées & partage", "favicon + theme-color (27 pages)",
  everyPage((p) => p.html.includes('rel="icon"') && p.html.includes('name="theme-color"')));

/* C. Contenu & structure on-page */
add("C. Contenu & structure", "exactement un <h1> par page",
  everyPage((p) => (p.html.match(/<h1[\s>]/g) || []).length === 1));
add("C. Contenu & structure", "<h1> contient la marque + la ville (27 pages)",
  everyPage((p) => h1of(p.html).includes(BRAND[p.lang]) && /Sousse|سوسة/.test(h1of(p.html))));
add("C. Contenu & structure", "toutes les images ont un attribut alt",
  everyPage((p) => [...p.html.matchAll(/<img\b[^>]*>/g)].every((m) => /alt=/.test(m[0]))));
add("C. Contenu & structure", "toutes les images ont width+height (anti-CLS)",
  everyPage((p) => [...p.html.matchAll(/<img\b[^>]*>/g)].every((m) => /width=/.test(m[0]) && /height=/.test(m[0]))));
add("C. Contenu & structure", "graphie canonique de la marque (aucune variante visible)",
  everyPage((p) => !FORBIDDEN.some((b) => p.visible.includes(b)) && !p.visible.includes("أبراهيم")));
add("C. Contenu & structure", "NAP cohérent : immeuble Mahjoub dans la bonne langue",
  everyPage((p) => p.html.includes(NAP[p.lang])));
add("C. Contenu & structure", "ancres de liens descriptives (pas de « cliquez ici »)",
  everyPage((p) => ![...p.html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)].some((m) => /^(cliquez ici|click here)$/i.test(m[1].replace(/<[^>]+>/g, "").trim()))));

/* D. Données structurées */
add("D. Données structurées", "≥2 blocs JSON-LD valides par page",
  everyPage((p) => (p.html.match(/<script type="application\/ld\+json">/g) || []).length >= 2 && ldNodes(p.html).length > 0));
add("D. Données structurées", "nœud WebPage url/inLanguage/dateModified = sitemap",
  everyPage((p) => { const wp = ldNodes(p.html).find((n) => n["@type"] === "WebPage"); return wp && wp.url === `${SITE}${p.path}` && wp.inLanguage === p.lang && lastmods.includes(wp.dateModified); }));
add("D. Données structurées", "Service/ItemList + BreadcrumbList sur les pages services",
  everyPage((p) => { if (!p.service && !p.hub) return true; const ns = ldNodes(p.html); const main = p.service ? ns.find((n) => n["@type"] === "Service") : ns.find((n) => n["@type"] === "ItemList"); return main && ns.find((n) => n["@type"] === "BreadcrumbList"); }));
add("D. Données structurées", "FAQPage alignée sur les questions affichées",
  everyPage((p) => { const faq = ldNodes(p.html).find((n) => n["@type"] === "FAQPage"); if (!faq) return false; const sec = p.html.match(/<div class="faq-list">([\s\S]*?)<\/div>/)?.[1] ?? ""; const vis = [...sec.matchAll(/<summary>([\s\S]*?)<\/summary>/g)].map((m) => m[1].replace(/&amp;/g, "&").replace(/\s+/g, " ").trim()); const bal = (faq.mainEntity ?? []).map((q) => q.name.replace(/\s+/g, " ").trim()); return vis.length === bal.length && vis.every((v, i) => v === bal[i]); }));
add("D. Données structurées", "graphe d'entités : @id communs WebSite/LegalService/Person",
  ok(["WebSite", "LegalService", "Person"].every((t) => { const ids = new Set(pages.flatMap((p) => ldNodes(p.html).filter((n) => [].concat(n["@type"]).includes(t)).map((n) => n["@id"]))); return ids.size === 1; })));

/* E. Performance & technique */
add("E. Performance & technique", "preload de l'image LCP sur les 3 accueils",
  ok(pages.filter((p) => !p.service && !p.hub).every((p) => p.html.includes('rel="preload" as="image"'))));
add("E. Performance & technique", "images portrait/office : WebP + repli JPEG sur disque et référencés",
  ok(["portrait", "office"].every((n) => existsSync(path.join(root, `assets/img/${n}.webp`)) && existsSync(path.join(root, `assets/img/${n}.jpg`)) && pages.some((p) => p.html.includes(`${n}.webp`)))));
add("E. Performance & technique", "aucun lien interne cassé (href=/…)",
  ok(linkFails.length === 0, linkFails));
add("E. Performance & technique", "aucun asset local cassé",
  ok(assetFails.length === 0, assetFails));
add("E. Performance & technique", "vraie page 404 dédiée + noindex",
  ok(notFound.length > 0 && /name="robots" content="noindex/.test(notFound) && netlify.includes('to = "/404.html"')));
add("E. Performance & technique", "isolation bidi AR (e-mail/tél dans <bdi>)",
  everyPage((p) => { if (p.lang !== "ar") return true; const txt = p.html.replace(/<bdi[^>]*>[\s\S]*?<\/bdi>/g, " ").replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " "); return !txt.includes(EMAIL) && !/\+216\s*\d/.test(txt) && (p.html.match(/<bdi dir="ltr">/g) || []).length >= 3; }));
add("E. Performance & technique", "labels de formulaire appariés (for/id)",
  everyPage((p) => [...p.html.matchAll(/<label[^>]*for="([^"]+)"/g)].every((m) => p.html.includes(`id="${m[1]}"`))));
add("E. Performance & technique", "en-têtes de sécurité configurés (nosniff, referrer)",
  ok(netlify.includes("X-Content-Type-Options") && netlify.includes("Referrer-Policy")));
add("E. Performance & technique", "rel=me vers le profil Facebook (passerelle d'entité)",
  everyPage((p) => p.html.includes(`rel="me" href="${FB}"`)));
add("E. Performance & technique", "JS non render-blocking (defer)",
  everyPage((p) => /<script src="\/assets\/js\/main\.js[^"]*" defer>/.test(p.html)));

/* ---------- rapport ---------- */
const cats = [...new Set(checks.map((c) => c.cat))];
const passed = checks.filter((c) => c.pass).length;
const score = Math.round((passed / checks.length) * 100);
console.log("\nSCORE SEO TECHNIQUE — Cabinet Brahim Majdoub");
console.log("==========================================");
for (const cat of cats) {
  const cc = checks.filter((c) => c.cat === cat);
  const cp = cc.filter((c) => c.pass).length;
  console.log(`\n${cat}  (${cp}/${cc.length})`);
  for (const c of cc) {
    console.log(`  ${c.pass ? "✓" : "✗"} ${c.name}`);
    if (!c.pass) for (const f of c.fails.slice(0, 3)) console.log(`      → ${f}`);
  }
}
console.log("\n==========================================");
console.log(`SCORE : ${score}/100  (${passed}/${checks.length} critères)`);
console.log("Périmètre : SEO on-site contrôlable par le code. Le hors-site");
console.log("(avis Google, backlinks, fiche Business) se travaille en dehors du dépôt.");
if (STRICT && score < 100) { console.error("\n✗ Score < 100 : corrigez les critères en échec."); process.exit(1); }
if (score === 100) console.log("\n✓ 100/100 technique atteint et verrouillé.");
