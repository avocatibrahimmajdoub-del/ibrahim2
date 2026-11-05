# Audit SEO — Cabinet Maître Brahim Majdoub
*Date : 24 septembre 2026, mise à jour le 30 septembre 2026 (renommage AR + fiche Google), puis le 4 novembre 2026 (**site multipage : 24 pages services**, puis **score SEO technique verrouillé à 100/100** : vraie page 404, image OG versionnée sans query string, en-têtes de sécurité, scoreur `npm run seo:score` en CI) — périmètre : `/`, `/en/`, `/ar/`, `*/services/*`, `404.html`, robots.txt, sitemap.xml, netlify.toml, validation `npm run check` + `npm run seo:score` + audit manuel.*

## Verdict global

**SEO technique on-site : 100/100 sur les 38 critères mesurables** (`npm run seo:score --strict`, verrouillé en CI) — parmi les meilleurs réglages possibles pour un site statique.
Depuis le 04/11/2026, le site est **multipage** : 24 pages services (1 hub + 7 domaines × 3 langues) viennent lever le plafond « une page par langue ». Les deux derniers défauts réels ont été corrigés le 04/11 : **vraie page 404** (fini le soft-404 qui renvoyait l'accueil) et **image OG en nom versionné** `og-v4.jpg` (plus de query string `?v=4` sur les 27 pages).

> ⚠️ **Honnêteté du score** : 100/100 mesure tout ce que le *code* contrôle (crawl, métadonnées, structure, schema, technique). Cela **ne garantit pas** la 1ʳᵉ place Google : le **hors-site** (fiche Google Business, avis réels, backlinks, domaine dédié) et les **placeholders** (coordonnées, témoignages) restent des leviers humains, hors du dépôt. Voir P0 ci-dessous.

| Pilier | Note | Commentaire |
|---|---|---|
| Indexabilité & technique | 🟢 10/10 | Crawlable sans JS, canonical/hreflang parfaits, 404 dédiée, CI + score 100/100 verrouillés |
| Données structurées | 🟢 10/10 | LegalService + Attorney + FAQPage + OfferCatalog + Service + BreadcrumbList valides |
| Performance (théorique) | 🟢 8/10 | Léger, images optimisées ; preload LCP ajouté le 04/11 |
| Contenu & mots-clés | 🟢 8/10 | 24 pages services ciblées (domaine + ville) × 3 langues ; restent les articles |
| SEO local (off-site) | 🔴 3/10 | Ni fiche Google Business, ni avis réels, ni annuaires |
| e-E-A-T / YMYL | 🟡 7/10 | Meta/YMYL : signaux présents mais témoignages encore « gabarits » |

---

## ✅ Points forts vérifiés (à ne pas casser)

1. **Trois vrais documents statiques** (`/`, `/en/`, `/ar/`) — crawlables sans JavaScript, `dir="rtl"` correct pour l'arabe.
2. **Canonical + hreflang irréprochables** : auto-référents sur chaque langue, `x-default`, identiques au sitemap et au JSON-LD.
3. **robots.txt / sitemap.xml propres** : sitemap avec alternates `xhtml:link`, extension `image:image` dont les titres reprennent les alt (recherche d'images marque + visage).
4. **JSON-LD très complet et valide** (vérifié par parseur) : graphe `LegalService` ↔ `Person/Attorney` ↔ `WebSite` ↔ `WebPage`, géo, horaires, `knowsLanguage`, `alternateName` couvrant les variantes orthographiques du nom (Majdoub/Mahjoub, أبراهيم/إبراهيم…) — très utile pour la résolution d'entité Google. `FAQPage` conforme au contenu visible.
5. **Balises de partage complètes** : OG + Twitter Cards + `og:locale` alternates, image OG déclarée 1200×630 (dimensions réelles conformes).
6. **Titles et descriptions calibrés** : FR 64 car. / 155 car., EN 60 / 147, AR 68 / 158 — dans les plages optimales, requête « avocat + Sousse » en tête du title. *(AR passé de 61 à 68 car. le 30/09/2026 : l'ajout du titre « المحامي الاستاذ » a imposé de retirer le tanwīn de `محامٍ` pour rester sous la barre des 68 — la CI refuse au-delà.)*
7. **Sémantique HTML** : 1 seul `<h1>` par page, hiérarchie H1→H2→H3 nette, NAP visible (adresse, tél, e-mail, horaires) en texte indexable.
8. **Images : WebP + repli JPEG, ~50–90 ko, dimensions déclarées** (aucun CLS), `alt` descriptifs, lazy-load hors écran, `fetchpriority="high"` sur le visuel hero.
9. **Poids maîtrisé** : CSS 41 ko + JS 7 ko, images optimisées par pipeline sharp — le site passera les Core Web Vitals sans effort.
10. **CI (`npm run check`)** qui verrouille title, description, sitemap, entités — toutes les vérifications passent aujourd'hui.
11. **Accessibilité** (skip-link, aria, contrastes) — bonus indirect pour le classement.
12. **Prudence éprouvée** : les témoignages déclarés « gabarits » ne sont **pas** balisés en `Review` schema — bonne protection contre une action manuelle.

---

## 🔴 Priorité 0 — SEO local (hors du code, impact maximal)

C'est le canal qui rapportera de vrais clients à un avocat de Sousse ; le site seul ne suffit pas.

| # | Action | Impact estimé |
|---|---|---|
| 1 | ✅ **FAIT (24/09/2026)** — fiche Google Business Profile créée, nom officiel : `avocat ibrahim majdoub - المحامي إبراهيم مجدوب` (bilingue avec tiret, format supporté par Google). 🔁 **À RENOMMER + ADRESSE À CORRIGER (30/09/2026)** → nom `avocat ibrahim majdoub - المحامي الاستاذ ابراهيم مجدوب`, adresse `نهج فيكتور هوجو — عمارة محجوب، الطابق الرابع` : procédure détaillée ci-dessous. Reste : optimisation à 100 % (catégorie, horaires, photos, description) + transmission de l'URL Maps pour le point 5. 80 % des recherches « avocat près de moi » se décident dans le pack local. | Très fort |
| 2 | **Récolter des avis Google réels** (lien de partage d'avis envoyé après chaque dossier clos). Les témoignages actuels, marqués « illustratifs », ne comptent pour rien. Remplacer ensuite les gabarits par des avis réels (avec consentement écrit, comme prévu). | Très fort |
| 3 | **Domaine dédié** (ex. `majdoub-avocat.tn` ou `.com`) plutôt que `ibrahimmajdoub.netlify.app` : confiance, mémorabilité, autorité consolidée, cohérence NAP. Mettre à jour les 7 occurrences verrouillées par `check.mjs` (canonical, hreflang, og:url, JSON-LD, sitemap, robots, SITE) + redirections 301. | Fort (moyen terme) |
| 4 | **Citations NAP cohérentes** : annuaire de l'Ordre National des Avocats de Tunisie, Pages Jaunes Tunisie, annuaires d'avocats tunisiens — nom/adresse/tél **strictement identiques** partout, y compris l'immeuble (`عمارة محجوب`, pas `عمارة المجدوب`). | Fort (local) |
| 5 | 🔧 **Partiellement fait (24/09/2026, étendu le 30/09/2026)** : le nom bilingue de la fiche est intégré aux `alternateName` JSON-LD des 3 pages, dans **les deux graphies du nouveau titre** (`المحامي الاستاذ ابراهيم المجدوب` sans hamza et `المحامي الأستاذ أبراهيم المجدوب` avec) — verrouillé par `npm run check`. Reste : ajouter l'URL Google Maps dans `sameAs` et `hasMap` du JSON-LD — *(en attente de l'URL « Partager » de la fiche).* | Bonus |

### 🔁 Renommer la fiche Google et corriger l'adresse (30/09/2026)

Décision client du 30/09/2026 : le nom passe de `المحامي ابراهيم المجدوب` à
`المحامي الاستاذ ابراهيم المجدوب`, **et** l'adresse mentionne l'immeuble
`عمارة محجوب` (Mahjoub) — et non `عمارة المجدوب`. Les deux doivent être
identiques à la page `/ar/`, sinon Google relie deux entités distinctes.

Nom à saisir, une seule fois, exactement :

```
avocat ibrahim majdoub - المحامي الاستاذ ابراهيم المجدوب
```

- partie latine **inchangée** ; séparateur : tiret entouré d'espaces ;
- arabe **sans hamza** (`الاستاذ`, `ابراهيم`) — c'est la frappe réelle des recherches
  tunisiennes et la graphie du site ;
- ne rien ajouter d'autre (ni « Sousse », ni « droit pénal ») : les descripteurs
  ajoutés au nom sont un motif de suspension.

Adresse à saisir dans le champ **Adresse** de la fiche (même graphie que le site) :

```
نهج فيكتور هوجو — عمارة محجوب، الطابق الرابع، سوسة 4000
```

Procédure :

1. `business.google.com` → profil du cabinet → **Modifier le profil**.
2. **Nom de l'activité** : coller la chaîne ci-dessus. **Adresse** : corriger
   l'immeuble (`عمارة محجوب`). Enregistrer les deux **dans la même session** — un
   seul cycle de re-vérification au lieu de deux.
3. Google peut demander une **re-vérification** (vidéo ou code postal) : c'est le
   comportement normal après un changement de nom ou d'adresse. Préparer la plaque
   du cabinet, une facture ou l'attestation d'inscription au tableau de Sousse.
4. Contrôler sous 24–72 h la propagation sur Maps (vérifier que l'épingle n'a pas
   glissé), puis aligner les annuaires NAP (point 4) sur le nom **et** l'adresse.
5. Aucune action côté code : le site porte déjà le nouveau nom et la bonne adresse
   (les `alternateName` gardent les graphies accentuées pour l'appariement).

⚠️ **Risque à connaître** : modifier le nom ou l'adresse d'une fiche vérifiée peut
la faire repasser en « En attente de vérification » — elle disparaît alors
temporairement du pack local. Faire l'opération en une fois, ne pas la répéter, et
**ne pas toucher à la catégorie** la même semaine.

Côté site, le même jour (30/09/2026) : page `/ar/` passée à la graphie sans hamza
(`<title>` 68 car., `<h1>`, meta, OG/Twitter, alts, JSON-LD `Person.name` +
`honorificPrefix`), nom du cabinet aligné (`مكتب ابراهيم المجدوب للمحاماة`), adresse
corrigée dans les **3 langues** (FR `Immeuble Mahjoub`, EN `Mahjoub Building`,
AR `عمارة محجوب`) — JSON-LD `streetAddress` **et** texte visible — et toutes les
écritures accentuées conservées en `alternateName` sur les 3 pages
(`المحامي الأستاذ أبراهيم المجدوب`, `الأستاذ أبراهيم المجدوب`, `مكتب أبراهيم
المجدوب للمحاماة`). `npm run check` refuse désormais toute réapparition d'une
graphie accentuée du nom **ou** de `عمارة المجدوب` dans le texte visible : l'entité
et le NAP ne peuvent plus dériver.

## 🟡 Priorité 1 — Contenu & structure

6. ✅ **FAIT (04/11/2026) — le site est multipage.** 24 pages services ont été créées : 1 hub + 7 domaines × 3 langues (`/services/droit-penal/`, `/en/services/criminal-law/`, `/ar/services/criminal-law/`…). Chacune porte un title/description uniques (30–68 / 120–175 car.), un `<h1>` domaine + ville, 6 missions, un déroulement en 4 étapes, un encadré « Bon à savoir », une FAQ de 4 questions alignée sur son JSON-LD `FAQPage`, un fil d'Ariane `BreadcrumbList`, un nœud `Service` (ou `ItemList` pour le hub) et le graphe d'entités commun. Les cartes et le pied de page des 3 accueils pointent désormais vers ces pages (297 liens internes résolus, vérifiés par `npm run check`). Le sitemap couvre les 27 URLs avec hreflang réciproques. Contenu généré depuis `scripts/pages-data.mjs` via `npm run pages`, anti-dérive `npm run pages:check` en CI. **Reste :**
   - ✅ requêtes à intention réelle couvertes par les pages : « avocat divorce Tunisie » (famille), « procédure saisie-arrêt Tunisie » (recouvrement), « avocat stupéfiants Tunisie » (pénal) ; une FAQ « honoraires » par page.
   - ajouter 3–5 **articles de fond** (questions des clients) relayés en `Article` schema — prochaine marche longue traîne.
7. **Vérifier la propriété Search Console** : la balise meta est commentée ; seul le fichier `google58bface3e40de19d.html` au dépôt fait office de vérification. Confirmer que la propriété GSC est active et y **soumettre le sitemap**, idem Bing Webmaster Tools.
8. **Lier les ressources officielles** : un lien sortant vers le site de l'Ordre National des Avocats / le numéro de table si publiable renforce le e-E-A-T (secteur droit = YMYL). Actuellement un seul lien de fond sortant (ILF).

## 🟢 Priorité 2 — Optimisations fines (code)

9. ✅ **FAIT (04/11/2026)** — preload du visuel LCP dans le `<head>` des 3 accueils
   (`<link rel="preload" as="image" href="/assets/img/office.webp?v=6" type="image/webp" />`,
   complète `fetchpriority="high"`). Les pages services ont un LCP textuel, pas d'image à précharger.
10. **Fonts Google allégées** : Inter (4 graisses) + Playfair (6, italiques incluses) = CSS render-blocking. Réduire aux 5–6 graisses réellement utilisées, ou auto-héberger ± `font-display: swap` déjà OK.
11. ✅ **FAIT (04/11/2026)** — `og:image?v=4` → **nom versionné `og-v4.jpg`** sur les
    27 pages (og:image + twitter:image + image JSON-LD). Plus aucune query string sur
    l'URL OG : les scrapers de messagerie la mettent en cache telle quelle. En cas de
    changement de contenu, renommer en `og-v5.jpg` (voir README).
12. **Nettoyage** : `assets/img/hero.jpg` + `hero.webp` (~125 ko) non référencés — les retirer du déploiement ou les réemployer.
13. **Détails schema (optionnels)** : `priceRange` sur `LegalService`, `twitter:site` si un compte X existe.

---

## 🔒 Verrouillage 100/100 (04/11/2026)

Objectif « SEO 100/100 » : corriger les derniers défauts réels, puis **verrouiller**
le résultat pour qu'il ne puisse pas régresser. Trois livrables :

1. **Vraie page 404** (`404.html`) : trilingue, `noindex,follow`, liens de retour
   accueil / services / contact. `netlify.toml` la sert avec le statut **404**
   (`/* → /404.html status=404`) — avant, le catch-all renvoyait l'accueil, ce que
   Google traite comme un *soft-404* (gaspillage de crawl, signal de qualité dégradé).
2. **Image OG versionnée** : `og.jpg?v=4` → `og-v4.jpg` (point 11 ci-dessus), plus
   **en-têtes de sécurité** dans `netlify.toml` : `X-Content-Type-Options: nosniff`,
   `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`
   (caméra/micro/géo coupées). Pas de `X-Frame-Options` ni de CSP `frame-ancestors`
   pour ne pas bloquer l'intégration (preview, carte).
3. **Scoreur automatique** (`scripts/seo-score.mjs`, `npm run seo:score`) : **38
   critères réels** vérifiés sur les 27 pages, note /100 en 5 catégories
   (indexabilité, métadonnées, contenu/structure, données structurées,
   performance/technique). `--strict` sort en code 1 si < 100 → **ajouté à la CI**
   (`.github/workflows/ci.yml`). Résultat actuel : **100/100 (38/38)**.

Le score est *reproductible* : `npm run seo:score` le recalcule à chaque exécution,
la CI refuse toute régression. C'est la garantie « 100/100 » la plus honnête qu'un
dépôt puisse donner — elle porte sur le on-site, pas sur le classement Google.

## Plan d'action recommandé

| Semaine | Actions |
|---|---|
| 1 | Fiche Google Business + demande d'avis aux premiers clients + vérification GSC (P0) |
| 2–4 | Inscriptions annuaires NAP cohérentes ; ~~rédaction des 7 pages services~~ ✅ FAIT (04/11, FR + EN + AR d'emblée) |
| T2 | ~~Traduction EN/AR des pages services~~ ✅ FAIT ; achat domaine + migration 301 ; soumettre le sitemap 27 URLs à GSC/Bing |
| T3 | 3 articles longue traîne ; avis réels en lieu et place des gabarits ; mesures P2 |

## Mot de la fin

Le socle technique est à **100/100 sur les 38 critères mesurables** et verrouillé en CI (`npm run check` + `npm run pages:check` + `npm run seo:score --strict`). On atteint le niveau où **chaque heure passée dans le code rapporte moins qu'une heure passée sur la fiche Google, les avis et le contenu**. Garder ces trois verrous en CI pendant que le contenu grandit ; le prochain gain de trafic viendra du hors-site (P0) et des articles longue traîne, pas d'un réglage technique supplémentaire.
