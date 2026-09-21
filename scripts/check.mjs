/**
 * Vérifications statiques sans dépendance, lancées par la CI :
 *  - les 3 pages existent et déclarent le bon lang/dir ;
 *  - chaque page référence les 3 hreflang + x-default + canonical ;
 *  - aucune ancre interne cassée (href="#x" sans id="#x") ;
 *  - aucun chemin local cassé (src/href vers /assets/…) ;
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

const SITE = "https://ibrahimmahjoub.netlify.app";

const PAGES = [
  { file: "index.html", lang: "fr", dir: "ltr", path: "/" },
  { file: "en/index.html", lang: "en", dir: "ltr", path: "/en/" },
  { file: "ar/index.html", lang: "ar", dir: "rtl", path: "/ar/" },
];

let failures = 0;
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
  if (/(?:href|content)="https:\/\/(?!ibrahimmahjoub\.netlify\.app)[^"]*\.tn\//.test(html))
    fail(`${page.file}: URL absolue vers un autre hôte (domaine non résolu ?)`);

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

  // labels appariés
  const fors = [...html.matchAll(/<label[^>]*for="([^"]+)"/g)].map((m) => m[1]);
  for (const f of fors)
    if (!html.includes(`id="${f}"`)) fail(`${page.file}: label for="${f}" sans contrôle`);

  ok(`${page.file} (lang=${page.lang}, dir=${page.dir}, ${locals.length} assets, ${anchors.length} ancres)`);
}

/* ---------- sitemap.xml / robots.txt ---------- */

const sitemapRaw = await readFile(path.join(root, "sitemap.xml"), "utf8").catch(() => null);
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

if (failures) {
  console.error(`\n${failures} échec(s)`);
  process.exit(1);
}
console.log("\nToutes les vérifications statiques passent.");
