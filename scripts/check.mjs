/**
 * Vérifications statiques sans dépendance, lancées par la CI :
 *  - les 3 pages existent et déclarent le bon lang/dir ;
 *  - chaque page référence les 3 hreflang + x-default + canonical ;
 *  - aucune ancre interne cassée (href="#x" sans id="#x") ;
 *  - aucun chemin local cassé (src/href vers /assets/…) ;
 *  - aucune URL absolue href/content vers un autre *.netlify.app ou un *.tn ;
 *  - chaque champ de formulaire reste labellisé (for/id appariés) ;
 *  - sitemap.xml et robots.txt sont cohérents avec le SITE et les canonical.
 *
 *   npm run check
 *
 * SITE = l'URL d'origine canonique, celle déclarée dans Search Console.
 * Tout ce qui porte une URL absolue (canonical, hreflang, og:url, "url" du
 * JSON-LD, sitemap.xml, robots.txt) doit l'utiliser : une divergence envoie
 * Google crawler un hôte mort — exactement le bug qui a cassé l'indexation.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SITE = "https://ibrahimmajdoub.netlify.app";

// L'hote canonique est DERIVE de SITE, jamais recopie : quand les deux divergent
// (l'ancienne graphie « mahjoub » vivait ici en dur), le controle s'auto-blanchit
// et laisse passer l'hote mort au lieu de le denoncer.
const SITE_HOST = new URL(SITE).host;
const SITE_ORIGIN_RE = SITE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Hotes interdits : tout autre *.netlify.app (apercu de branche, ancien nom de
// site) et tout *.tn (les domaines .tn cites dans l'historique ne resolvent pas).
const FOREIGN_HOST_RE = /(?:^|\.)(?:netlify\.app|tn)$/i;

// L'entite recherchee par son nom. Une seule graphie doit apparaitre dans le
// texte visible ; les autres variantes ne vivent que dans alternateName (JSON-LD),
// ou elles servent a rattacher les fautes d'orthographe a la MEME entite.
const BRAND = { "index.html": "Maître Brahim Majdoub", "en/index.html": "Brahim Majdoub", "ar/index.html": "الأستاذ أبراهيم المجدوب" };
const FORBIDDEN_VISIBLE = ["Ibrahim Mahjoub", "Brahim Mahjoub", "ابراهيم مجدوب", "المحجوب"];

// Contact : la seule adresse valide. cabinet-majdoub.tn ne resout pas (NXDOMAIN)
// => tout message poste la-bas rebondit, et Google peut l'afficher dans le panneau local.
const EMAIL = "avocat.ibrahim.majdoub@gmail.com";
const DEAD_HOSTS = ["cabinet-majdoub.tn"];

const FB = "https://www.facebook.com/brahim.majdoub.7/";
const PHONE = "21696655238";

const PAGES = [
  { file: "index.html", lang: "fr", dir: "ltr", path: "/", brand: "Maître Brahim Majdoub" },
  { file: "en/index.html", lang: "en", dir: "ltr", path: "/en/", brand: "Brahim Majdoub" },
  { file: "ar/index.html", lang: "ar", dir: "rtl", path: "/ar/", brand: "الأستاذ أبراهيم المجدوب" },
];

let failures = 0;
const ldNodes = [];
const fail = (msg) => {
  failures += 1;
  console.error(`✗ ${msg}`);
};
const ok = (msg) => console.log(`✓ ${msg}`);

for (const page of PAGES) {
  const html = await readFile(path.join(root, page.file), "utf8");

  if (!html.includes(`<html lang="${page.lang}" dir="${page.dir}">`))
    fail(`${page.file}: <html lang/dir> incorrect`);

  for (const l of ["fr", "en", "ar"])
    if (!html.includes(`hreflang="${l}"`)) fail(`${page.file}: hreflang ${l} manquant`);
  if (!html.includes('hreflang="x-default"')) fail(`${page.file}: hreflang x-default manquant`);

  const canonical = `rel="canonical" href="${SITE}${page.path}"`;
  if (!html.includes(canonical))
    fail(`${page.file}: canonical incorrect (attendu ${SITE}${page.path})`);

  // hreflang : les 4 URLs absolues doivent pointer sur SITE, sinon l'anneau
  // multilingue renvoie Google vers un hôte qui ne répond pas.
  for (const p of PAGES) {
    const want = `href="${SITE}${p.path}"`;
    if (!html.includes(want)) fail(`${page.file}: hreflang sans ${SITE}${p.path}`);
  }
  // Toute URL absolue portée par href/content doit viser SITE (ou un tiers
  // légitime : Facebook, OpenStreetMap, Google Fonts…). Un autre *.netlify.app
  // (aperçu de branche, ancien nom de site) ou un *.tn enverrait le visiteur et
  // le crawler sur un hôte qui n'est pas le canonique. L'hôte de référence est
  // dérivé de SITE : impossible qu'un renommage du site laisse ce contrôle
  // comparer les URLs à l'ancienne graphie.
  const absolues = [...html.matchAll(/(?:href|content)="(https?:\/\/[^"]*)"/g)].map((m) => m[1]);
  for (const url of new Set(absolues)) {
    let host;
    try {
      host = new URL(url).host;
    } catch {
      fail(`${page.file}: URL absolue illisible — ${url}`);
      continue;
    }
    if (host !== SITE_HOST && FOREIGN_HOST_RE.test(host))
      fail(`${page.file}: URL absolue vers un autre hôte — ${url} (attendu ${SITE_HOST})`);
    if (host === SITE_HOST && !new RegExp(`^${SITE_ORIGIN_RE}`).test(url))
      fail(`${page.file}: URL absolue vers SITE sans https — ${url}`);
  }

  // ancres internes
  const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
  for (const a of new Set(anchors))
    if (!html.includes(`id="${a}"`)) fail(`${page.file}: ancre #${a} sans cible`);

  // chemins locaux
  // query string de versionnage (?v=…) ignorée : le fichier vérifié est le chemin nu
  const locals = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((m) =>
    m[1].split(/[?#]/)[0]
  );
  for (const l of new Set(locals)) {
    try {
      await readFile(path.join(root, l), null);
    } catch {
      fail(`${page.file}: fichier manquant ${l}`);
    }
  }

  // le type MIME déclaré d'un <link rel="icon"> doit correspondre à l'extension
  for (const m of html.matchAll(/<link rel="icon" type="([^"]+)" href="(\/assets\/[^"]+)"/g)) {
    const ext = path.extname(m[2].split(/[?#]/)[0]).slice(1).toLowerCase();
    const mime = { svg: "image/svg+xml", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg" };
    if (mime[ext] && mime[ext] !== m[1])
      fail(`${page.file}: type="${m[1]}" pour ${m[2]} (attendu ${mime[ext]})`);
  }


  // ---------- SEO marque : le nom doit etre dans le title ET le h1 ----------
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1].trim() ?? "";
  const desc = html.match(/name="description"\s+content="([^"]*)"/)?.[1] ?? "";
  const h1 = (html.match(/<h1>[\s\S]*?<\/h1>/)?.[0] ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  if (!title.startsWith(page.brand)) fail(`${page.file}: <title> ne commence pas par « ${page.brand} »`);
  if (title.length > 68) fail(`${page.file}: <title> trop long (${title.length} > 68) — tronque en SERP`);
  if (title.length < 30) fail(`${page.file}: <title> trop court (${title.length})`);
  if (!h1.includes(page.brand)) fail(`${page.file}: le nom n'apparait pas dans le <h1> (requete de marque perdue)`);
  if (desc.length < 120 || desc.length > 175) fail(`${page.file}: meta description ${desc.length} car. (viser 120-175)`);
  if (!desc.includes(page.brand.split(" ").slice(-1)[0])) fail(`${page.file}: meta description sans le nom`);
  if (!html.includes('property="og:locale:alternate"')) fail(`${page.file}: og:locale:alternate absent`);
  for (const need of ["og:image:width", "og:image:height", "og:image:alt"])
    if (!html.includes(need)) fail(`${page.file}: ${need} absent`);

  // graphies concurrentes dans le texte visible (hors JSON-LD) = entite scindee
  const visible = html.replace(/<script[\s\S]*?<\/script>/g, " ");
  for (const bad of FORBIDDEN_VISIBLE)
    if (visible.includes(bad)) fail(`${page.file}: variante « ${bad} » dans le texte visible`);
  const brandHits = visible.split(page.brand).length - 1;
  if (brandHits < 2) fail(`${page.file}: « ${page.brand} » ${brandHits}x dans le visible (2+ attendu)`);

  // JSON-LD : blocs parseables, collectes pour la validation du graphe
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((m) => m[1]);
  if (ldBlocks.length < 2) fail(`${page.file}: au moins 2 blocs JSON-LD attendus`);
  for (const [i, raw] of ldBlocks.entries()) {
    try {
      const d = JSON.parse(raw);
      (d["@graph"] ? d["@graph"] : [d]).forEach((n) => ldNodes.push([page.file, n]));
    } catch (e) {
      fail(`${page.file}: bloc JSON-LD #${i + 1} invalide — ${e.message}`);
    }
  }


  // ---------- contact : rien ne doit pointer sur un domaine mort ----------
  for (const dead of DEAD_HOSTS)
    if (html.includes(dead)) fail(`${page.file}: reference au domaine mort ${dead} (les e-mails rebondissent)`);

  const mailtos = [...html.matchAll(/href="mailto:([^"?]+)/g)].map((m) => m[1]);
  for (const m of new Set(mailtos))
    if (m !== EMAIL) fail(`${page.file}: mailto « ${m} » ≠ ${EMAIL}`);
  if (!mailtos.length) fail(`${page.file}: aucun lien mailto`);

  const dataEmail = html.match(/data-email="([^"]*)"/)?.[1];
  if (dataEmail !== EMAIL) fail(`${page.file}: data-email = ${dataEmail} (composeur e-mail casse)`);
  if ((html.match(new RegExp(EMAIL.replace(/\./g, "\\."), "g")) || []).length < 4)
    fail(`${page.file}: ${EMAIL} present <4x (JSON-LD + composeur + coordonnees + pied de page)`);


  // ---------- RTL : toute chaine LTR (e-mail, +tel) doit etre isolee ----------
  // Sans <bdi dir="ltr">, l'algo bidi retourne l'affichage et le copie-colle du
  // visiteur arabe donne un numero ou une adresse illegibles.
  if (page.dir === "rtl") {
    const textSeulement = html
      .replace(/<bdi[^>]*>[\s\S]*?<\/bdi>/g, " ")
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ");
    if (textSeulement.includes(EMAIL))
      fail(`${page.file}: e-mail visible hors <bdi dir="ltr"> (rendu bidi inverse l'affichage)`);
    if (/\+216\s*\d/.test(textSeulement))
      fail(`${page.file}: telephone visible hors <bdi dir="ltr">`);
    if (/\d{2}\s\d{3}\s\d{3}\s*\d{3}\+/.test(html))
      fail(`${page.file}: numero ecrit a l'envers pour tromper bidi — utiliser <bdi dir="ltr">`);
    const bdi = (html.match(/<bdi dir="ltr">/g) || []).length;
    if (bdi < 3) fail(`${page.file}: ${bdi} isolation(s) <bdi> pour 3 coordonnees affichees`);
  }

  // labels appariés
  const fors = [...html.matchAll(/<label[^>]*for="([^"]+)"/g)].map((m) => m[1]);
  for (const f of fors)
    if (!html.includes(`id="${f}"`)) fail(`${page.file}: label for="${f}" sans contrôle`);

  ok(`${page.file} (lang=${page.lang}, dir=${page.dir}, ${locals.length} assets, ${anchors.length} ancres)`);
}

/* ---------- sitemap.xml / robots.txt ---------- */

const sitemapRawForDate = await readFile(path.join(root, "sitemap.xml"), "utf8").catch(() => "");
const sitemapRaw = sitemapRawForDate;
if (sitemapRaw === null) {
  fail("sitemap.xml introuvable à la racine");
} else {
  if (!sitemapRaw.includes("http://www.sitemaps.org/schemas/sitemap/0.9"))
    fail("sitemap.xml: namespace sitemaps.org manquant");

  const locs = [...sitemapRaw.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const want = PAGES.map((p) => `${SITE}${p.path}`);

  for (const u of want) if (!locs.includes(u)) fail(`sitemap.xml: URL absente ${u}`);
  for (const u of locs) {
    if (!u.startsWith(`${SITE}/`)) fail(`sitemap.xml: ${u} hors de ${SITE}`);
    if (!u.startsWith("https://")) fail(`sitemap.xml: ${u} en http (https obligatoire)`);
  }
  if (new Set(locs).size !== locs.length) fail("sitemap.xml: <loc> en double");

  // Google exige la réciprocité : chaque <url> déclare ses 3 alternates + x-default
  const blocks = [...sitemapRaw.matchAll(/<url>([\s\S]*?)<\/url>/g)];
  if (blocks.length !== locs.length) fail("sitemap.xml: <url> et <loc> en nombre différent");
  for (const [, b] of blocks) {
    for (const l of ["fr", "en", "ar", "x-default"])
      if (!b.includes(`hreflang="${l}"`)) fail(`sitemap.xml: alternate ${l} manquante dans un <url>`);
    if (!/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(b))
      fail(`sitemap.xml: <lastmod> (AAAA-MM-JJ) manquant pour ${b.match(/<loc>([^<]+)/)?.[1]}`);
  }

  ok(`sitemap.xml (${locs.length} URLs, ${blocks.length} blocs avec alternates + lastmod)`);

  // extension image: les <image:loc> doivent pointer sur un fichier reel, et le
  // <image:title> doit correspondre a un alt affiche (sinon entree ignoree / erreur)
  const pagesHtml = {};
  for (const p of PAGES) pagesHtml[p.file] = await readFile(path.join(root, p.file), "utf8");

  const imgs = [...sitemapRaw.matchAll(/<image:image>([\s\S]*?)<\/image:image>/g)].map((m) => m[1]);
  for (const b of imgs) {
    const loc = b.match(/<image:loc>([^<]+)<\/image:loc>/)?.[1].trim();
    const ttl = b.match(/<image:title>([\s\S]*?)<\/image:title>/)?.[1].trim();
    if (!loc) { fail("sitemap.xml: <image:image> sans <image:loc>"); continue; }
    if (!loc.startsWith(`${SITE}/`)) fail(`sitemap.xml: <image:loc> hors domaine — ${loc}`);
    const rel = "/" + loc.slice(SITE.length + 1).split("?")[0];
    try { await readFile(path.join(root, rel), null); }
    catch { fail(`sitemap.xml: image introuvable ${rel}`); }
    if (!ttl) fail(`sitemap.xml: <image:title> manquant pour ${loc}`);
    else if (!Object.values(pagesHtml).some((h) => h.replace(/\s+/g, " ").includes(ttl)))
      fail(`sitemap.xml: <image:title> absent des alt des pages — "${ttl.slice(0, 48)}…"`);
  }
  if (imgs.length) ok(`sitemap.xml: ${imgs.length} <image:image> declarees (fichiers + alt verifices)`);


  const robots = await readFile(path.join(root, "robots.txt"), "utf8").catch(() => null);
  if (robots === null) fail("robots.txt introuvable à la racine");
  else {
    if (/^\s*Disallow:\s*\/\s*$/m.test(robots)) fail("robots.txt: Disallow: / bloque tout le site");
    const sm = robots.match(/^\s*Sitemap:\s*(\S+)/im);
    if (!sm) fail("robots.txt: directive Sitemap: absente");
    else if (sm[1] !== `${SITE}/sitemap.xml`)
      fail(`robots.txt: Sitemap: ${sm[1]} ≠ ${SITE}/sitemap.xml`);
    else ok(`robots.txt (Sitemap: ${sm[1]})`);
  }
}

ok(`graphe d'entites (${ldNodes.length} noeux, @id commun aux 3 langues)`);

/* ---------- graphe d'entites : 1 noeud par langue, memes @id partout ---------- */

const byType = (t) => ldNodes.filter(([, n]) => [].concat(n["@type"] ?? []).includes(t));
for (const t of ["WebSite", "LegalService"]) {
  const found = byType(t);
  if (found.length !== PAGES.length) fail(`${t}: ${found.length} noeux pour ${PAGES.length} pages`);
}
const persons = byType("Person");
if (persons.length !== PAGES.length) fail(`Person: ${persons.length} noeux pour ${PAGES.length} pages`);

const officeIds = new Set(byType("LegalService").map(([, n]) => n["@id"]));
const personIds = new Set(persons.map(([, n]) => n["@id"]));
if (officeIds.size !== 1) fail(`LegalService: @id non partagé entre les langues (${[...officeIds]})`);
if (personIds.size !== 1) fail(`Person: @id non partagé entre les langues (${[...personIds]})`);

for (const [file, n] of ldNodes) {
  const types = [].concat(n["@type"] ?? []);
  if (types.includes("Person")) {
    const alias = n.alternateName ?? [];
    if (!alias.includes("Ibrahim Mahjoub")) fail(`${file}: Person.alternateName sans la variante « Mahjoub »`);
    if (alias.length < 8) fail(`${file}: Person.alternateName trop court (${alias.length})`);
    // la plaque du bureau (office.jpg) et la carte de partage (og.jpg) impriment
    // leur propre orthographe : declarees ici, elles renforcent l'entite au lieu
    // de creer une fiche concurrente
    for (const a of ["إبراهيم المجدوب", "Ibrahim Majdoub"])
      if (!alias.includes(a)) fail(`${file}: Person.alternateName sans la graphie « ${a} » visible dans les images`);
    if (!n.sameAs?.length) fail(`${file}: Person.sameAs absent (Facebook/LinkedIn = preuve d'entité)`);
    if (n.worksFor?.["@id"] !== [...officeIds][0]) fail(`${file}: Person.worksFor ne pointe pas sur le cabinet`);
    for (const k of ["jobTitle", "memberOf", "alumniOf", "knowsAbout", "telephone"])
      if (!n[k]) fail(`${file}: Person.${k} manquant`);
    // NAP : l'e-mail du graphe doit etre celui affiche sur la page
    if (n.email !== EMAIL) fail(`${file}: Person.email = ${n.email} ≠ ${EMAIL}`);
  }
  if (types.includes("LegalService")) {
    if (n.founder?.["@id"] !== [...personIds][0]) fail(`${file}: LegalService.founder ne pointe pas sur l'avocat`);
    // le cabinet porte aussi les graphies concurrentes : c'est lui que Google
    // matche sur « Ibrahim Mahjoub avocat Sousse »
    const lalias = n.alternateName ?? [];
    for (const a of ["Ibrahim Mahjoub", "الأستاذ أبراهيم المجدوب"])
      if (!lalias.includes(a)) fail(`${file}: LegalService.alternateName sans « ${a} »`);
    if (lalias.length < 8) fail(`${file}: LegalService.alternateName trop court (${lalias.length})`);
    if (!lalias.includes("إبراهيم المجدوب"))
      fail(`${file}: LegalService.alternateName sans la graphie de la plaque nominative`);
    if (!n.sameAs?.length) fail(`${file}: LegalService.sameAs absent`);
    if (n.email !== EMAIL) fail(`${file}: LegalService.email = ${n.email} ≠ ${EMAIL}`);
    if (n.telephone?.replace(/\D/g, "") !== PHONE)
      fail(`${file}: LegalService.telephone = ${n.telephone} incoherent avec le texte visible`);
    if (!n.geo || typeof n.geo.latitude !== "number") fail(`${file}: LegalService.geo absent`);
    if (!n.openingHoursSpecification?.length) fail(`${file}: LegalService.openingHoursSpecification absent`);
    if (!String(n.url).startsWith(SITE)) fail(`${file}: LegalService.url hors ${SITE}`);
  }
  // toute URL interne doit coller au domaine canonique
  for (const [, u] of JSON.stringify(n).matchAll(/"(?:url|image|logo|telephone)":\s*"((?:https?:)[^"]+)"/g))
    if (!String(u).startsWith(SITE) && !u.startsWith("https://www.openstreetmap.org"))
      fail(`${file}: URL structurée hors domaine canonique — ${u}`);
}


/* ---------- SEO avance : robots, rel=me, WebPage, catalogue de services ---------- */

const lastmod = [...sitemapRawForDate.matchAll(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/g)].map((m) => m[1]);

for (const page of PAGES) {
  const html = await readFile(path.join(root, page.file), "utf8");

  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1];
  if (!robots) fail(`${page.file}: <meta name="robots"> absent`);
  else {
    if (!/index/.test(robots)) fail(`${page.file}: <meta name="robots"> sans index`);
    if (!robots.includes("max-image-preview:large")) fail(`${page.file}: max-image-preview:large absent (image de SERP bridee)`);
  }
  if (!html.includes(`<link rel="me" href="${FB}" />`))
    fail(`${page.file}: rel="me" vers le profil Facebook absent (passerelle d'entite)`);

  // le catalogue declare doit etre exactement la liste des cartes affichees
  const sec = html.match(/id="services"([\s\S]*?)id="cabinet"/)?.[1] ?? "";
  const h3 = [...sec.matchAll(/<h3>([^<]+)<\/h3>/g)].map((m) => m[1].replace(/&amp;/g, "&").trim());
  const svc = byType("LegalService").find(([fn]) => fn === page.file)?.[1];
  if (!svc) fail(`${page.file}: aucun LegalService pour cette page`);
  else {
    const declared = svc.serviceType ?? [];
    if (declared.length !== h3.length)
      fail(`${page.file}: serviceType ${declared.length} entrees pour ${h3.length} cartes affichees`);
    for (const t of h3) if (!declared.includes(t)) fail(`${page.file}: service « ${t} » affichee mais non declaree`);
    const cat = svc.hasOfferCatalog?.itemListElement ?? [];
    if (cat.length !== h3.length) fail(`${page.file}: hasOfferCatalog ${cat.length} offres ≠ ${h3.length} cartes`);
    for (const it of cat) if (!it.itemOffered?.name || !h3.includes(it.itemOffered.name))
      fail(`${page.file}: offre du catalogue hors liste affichee (${it.itemOffered?.name})`);
    if (svc.contactPoint?.telephone?.replace(/\D/g, "") !== PHONE)
      fail(`${page.file}: contactPoint.telephone ≠ +${PHONE}`);
    if (!(svc.contactPoint?.availableLanguage?.length >= 3)) fail(`${page.file}: contactPoint.availableLanguage incomplet`);
  }

  // WebPage : dateModified DOIT egaler le <lastmod> du sitemap (anti-derive)
  const wp = byType("WebPage").find(([fn]) => fn === page.file)?.[1];
  if (!wp) fail(`${page.file}: noeud WebPage absent`);
  else {
    if (wp.url !== `${SITE}${page.path}`) fail(`${page.file}: WebPage.url = ${wp.url}`);
    if (wp.inLanguage !== page.lang) fail(`${page.file}: WebPage.inLanguage = ${wp.inLanguage}`);
    if (!lastmod.includes(wp.dateModified))
      fail(`${page.file}: WebPage.dateModified ${wp.dateModified} absent du <lastmod> du sitemap (a resynchroniser)`);
    for (const k of ["isPartOf", "about", "mainEntity", "primaryImageOfPage"])
      if (!wp[k]) fail(`${page.file}: WebPage.${k} manquant`);
    const img = wp.primaryImageOfPage?.url;
    if (img && !img.startsWith(SITE)) fail(`${page.file}: primaryImageOfPage hors domaine — ${img}`);
    const ids = new Set(ldNodes.map(([, n]) => n["@id"]));
    for (const ref of [wp.isPartOf?.["@id"], wp.mainEntity?.["@id"], ...(Array.isArray(wp.about) ? wp.about : [wp.about]).map((a) => a?.["@id"])])
      if (ref && !ids.has(ref)) fail(`${page.file}: WebPage pointe vers un @id inexistant (${ref})`);
  }
}

ok(`SEO avance (robots max-image-preview, rel=me, serviceType = cartes affichees, dateModified = lastmod)`);

if (failures) {
  console.error(`\n${failures} échec(s)`);
  process.exit(1);
}
console.log("\nToutes les vérifications statiques passent.");
