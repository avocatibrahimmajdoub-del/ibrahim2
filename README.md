# lawf — site du cabinet, trilingue et statique

Site d'un cabinet d'avocat à Tunis, en **français, anglais et arabe** (page arabe
entièrement RTL), sous forme de **HTML / CSS / JS vanilla** : aucun build, aucun
framework, aucune dépendance à l'exécution. Chaque langue est un vrai document
statique, donc crawlable sans JavaScript.

```
index.html            page française (racine)
en/index.html         page anglaise
ar/index.html         page arabe (dir="rtl")
assets/css/style.css  feuille de style unique (propriétés logiques : 1 fichier = 2 directions)
assets/js/main.js     ~90 lignes : menu mobile, compteurs, composeur WhatsApp/e-mail, année
assets/img/           images servies (WebP + JPEG de repli, générées par npm run images)
assets/original/      originaux intouchés (source du pipeline d'images)
robots.txt sitemap.xml assets/favicon.svg
scripts/check.mjs     vérifications statiques lancées par la CI
```

## Servir le site

```bash
npm run serve          # http://localhost:5173  (python3 -m http.server)
```

N'importe quel hébergement statique fonctionne (CDN, objet storage, Apache,
nginx…) : copiez le dépôt tel quel. Conservez la structure `/`, `/en/`, `/ar/`.

## SEO : le nom de l'avocat doit être l'entité, pas un détail

Deux règles verrouillées par `npm run check`.

### 1. Une seule origine : le domaine canonique

L'URL d'origine est `https://ibrahimmahjoub.netlify.app`. Elle doit être
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
| AR | `الأستاذ أبراهيم المجدوب` |

Les autres orthographes (`Ibrahim Mahjoub`, `ابراهيم مجدوب`, `إبراهيم المجدوب`…)
n'apparaissent **que** dans `Person.alternateName` / `LegalService.alternateName`
du JSON-LD : c'est ce qui permet à Google de rattacher ces recherches à la même
entité au lieu de créer deux fiches concurrentes. Le test échoue si une variante
revient dans le texte visible (elle scinde l'entité et le nom ne remonte plus).

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

1. **Google Business Profile** vérifié, nom exact `Maître Brahim Majdoub`,
   catégorie « Avocat », ville Sousse — c'est ce qui déclenche le panneau de
   connaissances et la carte sur une recherche de nom.
2. **Mêmes NAP** (nom, adresse, téléphone) partout : Facebook, annuaires
   d'avocats, mentions légales. Une variante suffit pour tout diluer.
3. La page **Facebook** est déjà déclarée en `sameAs` : le nom de la page doit
   correspondre, sinon le lien n'apporte rien.
4. Bump du cache-busting (`?v=`) si `assets/img/og.jpg` change de contenu.

Balises en place : `<title>` ≤ 68 caractères, `meta description` 120–175,
`og:image` avec `width`/`height`/`alt`, `og:locale` + `og:locale:alternate` par
langue, JSON-LD parsé et validé par la CI.

Note : depuis août 2023, Google n'affiche plus les résultats enrichis `FAQPage`
pour les sites non institutionnels — le balisage nourrit la compréhension de
l'entité, il ne promet pas d'affichage dans la SERP.

## Modifier le contenu

Chaque page est autonome : ouvrez-la et éditez le texte directement. Les trois
pages partagent la même structure de sections —

1. **hero** (badge, titre, lead, 2 CTA, 3 repères, image, bandeau de 4 compteurs)
2. **citation** (bandeau sombre)
3. **services** (6 cartes numérotées)
4. **cabinet** (portrait + badge d'expérience, méthode, 4 engagements)
5. **avis** (4 cartes à initiales + note de transparence)
6. **bandeau CTA** (rendez-vous + téléphone)
7. **contact** (composeur honnête + coordonnées)
8. **pied de page** (navigation, coordonnées, mentions légales dépliables)

— donc une modification de structure se reporte sur les 3 fichiers.

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
des 3 pages, hreflang + canonical, ancres internes résolues, assets locaux
présents, labels de formulaire appariés.
