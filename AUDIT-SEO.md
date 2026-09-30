# Audit SEO — Cabinet Maître Brahim Majdoub
*Date : 24 septembre 2026, mise à jour le 30 septembre 2026 (renommage AR + fiche Google) — périmètre : `/`, `/en/`, `/ar/`, robots.txt, sitemap.xml, netlify.toml, validation `npm run check` + audit manuel.*

## Verdict global

**SEO technique : 9/10 — excellent, parmi les meilleurs réglages possibles pour un site statique.**
Le vrai potentiel de croissance n'est **pas** dans le code : il est dans le **SEO local hors site** (fiche Google, avis, annuaires) et dans **l'élargissement du contenu** (aujourd'hui une seule page par langue).

| Pilier | Note | Commentaire |
|---|---|---|
| Indexabilité & technique | 🟢 9/10 | Crawlable sans JS, canonical/hreflang/herflang parfaits, CI verrouillée |
| Données structurées | 🟢 10/10 | LegalService + Attorney + FAQPage + OfferCatalog valides |
| Performance (théorique) | 🟢 8/10 | Léger, images optimisées ; LCP améliorable d'un cran |
| Contenu & mots-clés | 🟡 6/10 | Bon ciblage « avocat Sousse », mais 1 page = plafond bas |
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

6. **Une page = un plafond de mots-clés.** 43 des 66 liens de chaque page sont des ancres internes (`#services`, `#contact`…) : Google n'indexe qu'une seule URL par langue. Pour capter les requêtes longue traîne :
   - créer **une page par domaine** (`/services/droit-penal-sousse/`, `/services/droit-douanier/`…) × 3 langues, chacune avec title/description/FQA spécifiques ciblant « avocat droit pénal Sousse », « محامي قضايا جزائية سوسة »…
   - cibler des requêtes à intention réelle : « avocat divorce Tunisie », « honoraires avocat Sousse », « procédure saisie-arrêt Tunisie », « avocat stupéfiants Tunisie ».
   - ajouter 3–5 **articles de fond** (questions des clients) relayés en `Article` schema.
7. **Vérifier la propriété Search Console** : la balise meta est commentée ; seul le fichier `google58bface3e40de19d.html` au dépôt fait office de vérification. Confirmer que la propriété GSC est active et y **soumettre le sitemap**, idem Bing Webmaster Tools.
8. **Lier les ressources officielles** : un lien sortant vers le site de l'Ordre National des Avocats / le numéro de table si publiable renforce le e-E-A-T (secteur droit = YMYL). Actuellement un seul lien de fond sortant (ILF).

## 🟢 Priorité 2 — Optimisations fines (code)

9. **Precharger le visuel LCP** : ajouter dans `<head>` des 3 pages —
   `<link rel="preload" as="image" href="/assets/img/office.webp" type="image/webp" />`
   (complète `fetchpriority="high"` déjà présent ; quelques dizaines de ms de LCP gagnées).
10. **Fonts Google allégées** : Inter (4 graisses) + Playfair (6, italiques incluses) = CSS render-blocking. Réduire aux 5–6 graisses réellement utilisées, ou auto-héberger ± `font-display: swap` déjà OK.
11. **`og:image?v=4` → nom versionné** (`og-v4.jpg`) : certains scrapers de messagerie gèrent mal les query strings ; cause classique de carte de partage obsolète après mise à jour.
12. **Nettoyage** : `assets/img/hero.jpg` + `hero.webp` (~125 ko) non référencés — les retirer du déploiement ou les réemployer.
13. **Détails schema (optionnels)** : `priceRange` sur `LegalService`, `twitter:site` si un compte X existe.

---

## Plan d'action recommandé

| Semaine | Actions |
|---|---|
| 1 | Fiche Google Business + demande d'avis aux premiers clients + vérification GSC (P0) |
| 2–4 | Inscriptions annuaires NAP cohérentes ; rédaction des 7 pages services (FR d'abord) |
| T2 | Traduction EN/AR des pages services ; achat domaine + migration 301 |
| T3 | 3 articles longue traîne ; avis réels en lieu et place des gabarits ; mesures P2 |

## Mot de la fin

Le socle technique atteint déjà le niveau où **chaque heure passée dans le code rapporte moins qu'une heure passée sur la fiche Google, les avis et le contenu**. Garder `npm run check` en CI pour ne rien casser pendant que le contenu grandit.
