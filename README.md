# lawf — site du cabinet, trilingue et statique

Site d'un cabinet d'avocat à Tunis, en **français, anglais et arabe** (page arabe
entièrement RTL), sous forme de **HTML / CSS / JS vanilla** : aucun build, aucun
framework, aucune dépendance à l'exécution. Chaque langue est un vrai document
statique, donc crawlable sans JavaScript.

```
index.html            page française (racine)
en/index.html         page anglaise
ar/index.html         page arabe (dir="rtl")
services/             hub + 7 pages « domaines d'expertise » (FR)
en/services/          hub + 7 pages (EN)
ar/services/          hub + 7 pages (AR, dir="rtl")
assets/css/style.css  feuille de style unique (propriétés logiques : 1 fichier = 2 directions)
assets/js/main.js     ~90 lignes : menu mobile, compteurs, composeur WhatsApp/e-mail, année
assets/img/           images servies (WebP + JPEG de repli, générées par npm run images)
assets/original/      originaux intouchés (source du pipeline d'images)
robots.txt sitemap.xml assets/favicon.svg
scripts/pages-data.mjs     contenu trilingue des 24 pages services (source unique)
scripts/build-pages.mjs    génère les pages services + sitemap.xml (npm run pages)
scripts/check.mjs     vérifications statiques lancées par la CI
```

## Pages services : le site est multipage

Chaque domaine d'expertise a **sa propre URL dans chaque langue** (24 pages :
1 hub + 7 domaines × 3 langues), pour capter les requêtes longue traîne
(« avocat droit pénal Sousse », « محامي قضايا جزائية سوسة », « customs lawyer
Sousse »…). Chaque page porte un `<title>` et une meta description uniques, un
`<h1>` ciblant le domaine + la ville, une FAQ alignée sur son JSON-LD, un fil
d'Ariane (`BreadcrumbList`), un nœud `Service` (ou `ItemList` pour le hub) et le
graphe d'entités commun (`LegalService` ↔ `Person/Attorney` ↔ `WebSite`).

```
/services/                        /en/services/                 /ar/services/
/services/droit-penal/            /en/services/criminal-law/    /ar/services/criminal-law/
/services/droit-douanier/         /en/services/customs-law/     /ar/services/customs-law/
/services/droit-des-affaires/     /en/services/business-law/    /ar/services/business-law/
/services/droit-de-la-famille/    /en/services/family-law/      /ar/services/family-law/
/services/droit-immobilier/       /en/services/real-estate-law/ /ar/services/real-estate-law/
/services/droit-du-travail/       /en/services/employment-law/  /ar/services/employment-law/
/services/recouvrement-de-creances/ /en/services/debt-collection/ /ar/services/debt-collection/
```

Slugs français pour `/services/`, anglais pour `/en/` et `/ar/` (slug latin pour
l'arabe : URLs partageables sans percent-encoding). Le sélecteur de langue mène
à la **page équivalente** dans l'autre langue, pas à l'accueil.

**Workflow de maintenance** (aucun build au déploiement — les pages sont
commitées telles quelles, Netlify sert la racine) :

```bash
# 1. Éditer le contenu dans scripts/pages-data.mjs (ou le chrome des accueils)
npm run pages          # 2. régénère les 24 pages + sitemap.xml
npm run check          # 3. vérifie SEO, hreflang, JSON-LD, maillage, NAP…
npm run pages:check    # 4. (CI) échoue si une page commitée diffère de la génération
```

Le générateur **extrait le chrome des pages d'accueil** (header, footer, contact,
CTA, graphe d'entités) : une seule source de vérité, pas de dérive. Ne pas éditer
les pages `*/services/*/index.html` à la main : elles sont régénérées.

## Servir le site

```bash
npm run serve          # http://localhost:5173  (python3 -m http.server)
```

N'importe quel hébergement statique fonctionne (CDN, objet storage, Apache,
nginx…) : copiez le dépôt tel quel. Conservez la structure `/`, `/en/`, `/ar/`.

## SEO : le nom de l'avocat doit être l'entité, pas un détail

Deux règles verrouillées par `npm run check`.

### 1. Une seule origine : le domaine canonique

L'URL d'origine est `https://ibrahimmajdoub.netlify.app`. Elle doit être
**identique** dans les 7 endroits suivants, sinon Google crawle un hôte qui ne
répond pas (c'est le bug qui a empêché l'indexation) :

`<link rel="canonical">` · les 4 `<link rel="alternate" hreflang>` · `og:url` ·
`"url"` et `"@id"` du JSON-LD · `<loc>` et `xhtml:link` de `sitemap.xml` ·
`Sitemap:` de `robots.txt` · la constante `SITE` de `scripts/check.mjs`.

### 2. Une seule graphie du nom dans le texte visible

| Langue | Graphie canonique (visible) |
| --- | --- |
| FR | `Maître Brahim Majdoub` |
| EN | `Brahim Majdoub` |
| AR | `المحامي الاستاذ ابراهيم المجدوب` |

Les autres orthographes (`Ibrahim Mahjoub`, `ابراهيم مجدوب`, `إبراهيم المجدوب`,
`الأستاذ أبراهيم المجدوب`, `المحامي الأستاذ أبراهيم المجدوب`…)
n'apparaissent **que** dans `Person.alternateName` / `LegalService.alternateName`
du JSON-LD : c'est ce qui permet à Google de rattacher ces recherches à la même
entité au lieu de créer deux fiches concurrentes. Le test échoue si une variante
revient dans le texte visible (elle scinde l'entité et le nom ne remonte plus).

> **Pourquoi deux titres et pas de hamza (30/09/2026).** Le nom arabe est passé de
> `الأستاذ أبراهيم المجدوب` à `المحامي الاستاذ ابراهيم المجدوب`, pour reprendre mot
> pour mot le nom de la fiche Google Business Profile. Il s'écrit **sans hamza** :
> c'est la frappe réelle des recherches tunisiennes (« محامي استاذ ابراهيم المجدوب »)
> et la graphie de la fiche. Les variantes accentuées (`المحامي الأستاذ أبراهيم
> المجدوب`, `الأستاذ أبراهيم المجدوب`) restent déclarées en `alternateName` sur les
> 3 pages — l'entité reste donc unique, et `npm run check` refuse qu'elles
> disparaissent du graphe. Même règle pour le nom du cabinet sur la page AR :
> `مكتب ابراهيم المجدوب للمحاماة` (sans hamza) dans le visible, l'écriture
> accentuée `مكتب أبراهيم المجدوب للمحاماة` en `alternateName`. Le test échoue
> désormais si `أبراهيم` réapparaît dans le texte visible d'une page.

Le nom doit aussi figurer **en tête du `<title>` et dans le `<h1>`** — un slogan
seul dans le `h1` ne répond à aucune recherche de marque.

### Le graphe d'entités

Chaque langue déclare le même graphe (`@graph`), avec des `@id` **communs aux 3
pages** — c'est ce qui fusionne FR/EN/AR en une seule entité au lieu de trois :

- `WebSite` `#site` → `publisher` vers le cabinet ;
- `LegalService` `#cabinet` : adresse, `geo`, `hasMap`, `openingHoursSpecification`,
  `areaServed`, `knowsAbout`, `sameAs`, `founder` → `#avocat` ;
- `Person` + `Attorney` `#avocat` : `jobTitle`, `memberOf` (Barreau), `alumniOf`,
  `worksFor` → `#cabinet`, `alternateName` (toutes les graphies), `sameAs` ;
- `FAQPage` séparé, aligné sur les questions réellement visibles.

Modifier un numéro, une adresse ou un nom : les 3 pages **et** le JSON-LD doivent
changer ensemble, puis mettre à jour la même fiche côté Google Business Profile.

### En dehors du dépôt (indispensable pour la recherche par nom)

Le site seul ne suffit pas : Google relie les sources entre elles.

1. **Google Business Profile** vérifié, nom exact
   `avocat ibrahim majdoub - المحامي الاستاذ ابراهيم مجدوب`, catégorie « Avocat »,
   ville Sousse — c'est ce qui déclenche le panneau de connaissances et la carte
   sur une recherche de nom. Renommage et procédure : `AUDIT-SEO.md` (Priorité 0,
   lignes 1 et 5). Ce nom doit rester **strictement identique** à la graphie
   canonique AR du site.
2. **Mêmes NAP** (nom, adresse, téléphone) partout : Facebook, annuaires
   d'avocats, mentions légales. Une variante suffit pour tout diluer.
   Adresse de référence (immeuble **محجوب** / Mahjoub, pas المجدوب — vérifié par
   `npm run check`) :

   | Langue | Adresse |
   | --- | --- |
   | FR | `Rue Victor Hugo — Immeuble Mahjoub, 4ᵉ étage — Sousse, Tunisie` |
   | EN | `Rue Victor Hugo — Mahjoub Building, 4th floor — Sousse, Tunisia` |
   | AR | `نهج فيكتور هوجو — عمارة محجوب، الطابق الرابع — سوسة، الجمهورية التونسية` |
3. La page **Facebook** est déjà déclarée en `sameAs` : le nom de la page doit
   correspondre, sinon le lien n'apporte rien.
4. Bump du cache-busting (`?v=`) si `assets/img/og.jpg` change de contenu.

Balises en place : `<title>` ≤ 68 caractères, `meta description` 120–175,
`og:image` avec `width`/`height`/`alt`, `og:locale` + `og:locale:alternate` par
langue, JSON-LD parsé et validé par la CI.

### Les visuels portent aussi le nom

`assets/img/office.jpg` (hero) affiche une plaque nominative «إبراهيم المجدوب» et
`assets/img/og.jpg` (carte de partage) imprime « Ibrahim Majdoub — Avocat à la
Cour ». Ces graphies **ne doivent pas être supprimées des images** mais être
déclarées dans `alternateName`, sinon Google traite l'image comme une entité
étrangère. Les `alt` décrivent ce que l'image montre réellement (plaque, robe,
drapeau) et commencent par la graphie canonique — un `alt` qui contredit l'image
est un signal de spam. `npm run check` exige que ces graphies figurent bien dans
`alternateName`.

Si un visuel est re-exporté : orthographier `Brahim Majdoub` / `المحامي الاستاذ
ابراهيم المجدوب`, ajouter « Sousse » (la carte actuelle n'indique aucune ville), et
conserver 1200×630.

Note : depuis août 2023, Google n'affiche plus les résultats enrichis `FAQPage`
pour les sites non institutionnels — le balisage nourrit la compréhension de
l'entité, il ne promet pas d'affichage dans la SERP.

## Modifier le contenu

**Pages d'accueil** (`/`, `/en/`, `/ar/`) : chaque page est autonome, ouvrez-la
et éditez le texte directement. Les trois pages partagent la même structure de
sections —

1. **hero** (badge, titre, lead, 2 CTA, 3 repères, image, bandeau de 4 compteurs)
2. **citation** (bandeau sombre)
3. **services** (6 cartes numérotées)
4. **cabinet** (portrait + badge d'expérience, méthode, 4 engagements)
5. **avis** (4 cartes à initiales + note de transparence)
6. **bandeau CTA** (rendez-vous + téléphone)
7. **contact** (composeur honnête + coordonnées)
8. **pied de page** (navigation, coordonnées, mentions légales dépliables)

— donc une modification de structure se reporte sur les 3 fichiers, puis
`npm run pages` propage le chrome aux 24 pages services.

**Pages services** : tout le contenu vit dans `scripts/pages-data.mjs` (titres,
descriptions, leads, missions, déroulement, FAQ, par langue). Éditez ce fichier
et relancez `npm run pages` — ne touchez pas aux HTML générés.

## Le formulaire est honnête par construction

Aucun backend : les boutons **WhatsApp** et **e-mail** construisent en direct
(`assets/js/main.js`) le message à partir des champs, puis ouvrent l'application
du visiteur. Le site n'affiche jamais « message envoyé » : rien n'est transmis
en silence, rien n'est stocké. Le jour où un vrai point d'entrée existe,
remplacez le composeur par un `fetch` vers celui-ci.

## Images

```bash
npm install            # installe sharp (seule dépendance, de développement)
npm run images         # assets/original/ -> assets/img/ (WebP + JPEG progressif)
```

## Accessibilité & RTL

Lien d'évitement, menu mobile via l'attribut `hidden` (hors tab-order quand
fermé, Escape pour fermer), labels appariés aux champs, `aria-current` sur la
langue active, `prefers-reduced-motion` respecté, contrastes mesurés (le laiton
sur fond clair utilise `--gold` #8a6c30, ≥ 4.5:1). La feuille de style n'emploie
que des propriétés logiques (`margin-inline`, `padding-inline`,
`inset-inline-end`) : la page arabe se contente de `dir="rtl"`, avec polices
arabes dédiées et annulation du crénage latin.

## Données de démonstration

Coordonnées, chiffres et témoignages sont des **placeholders** ; les trois pieds
de page le signalent. Avant mise en ligne pour un praticien réel : remplacer les
coordonnées, substituer des avis recueillis avec consentement écrit, compléter
l'hébergement dans les mentions légales et déclarer le traitement à l'INPDP.

## CI

`.github/workflows/ci.yml` exécute `npm run check` : présence et `lang`/`dir`
des 3 accueils **et des 24 pages services**, hreflang + canonical réciproques,
ancres internes résolues, assets locaux présents, labels de formulaire appariés,
title/description calibrés, JSON-LD (WebPage, Service/ItemList, BreadcrumbList,
FAQPage alignée sur le visible), maillage interne, NAP et isolation bidi AR.
Puis `npm run pages:check` échoue si une page services commitée diffère de ce que
produirait `npm run pages` (anti-dérive data → HTML).
