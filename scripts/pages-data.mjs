/**
 * Contenu des pages « services » du site (FR / EN / AR).
 * ----------------------------------------------------
 * Source unique de vérité pour scripts/build-pages.mjs, qui génère des pages
 * 100 % statiques (commitées dans le dépôt — aucun build au déploiement).
 *
 * Règles SEO verrouillées ici et vérifiées par scripts/check.mjs :
 *  - <title> : commence par la graphie canonique du nom, 30 à 68 caractères ;
 *  - meta description : 120 à 175 caractères, contient le nom de famille ;
 *  - le nom canonique apparaît dans le <h1> et au moins 2× dans le visible ;
 *  - arabe sans hamza (« ابراهيم », « الاستاذ ») dans tout le texte visible ;
 *  - chaque page a son canonical, ses 4 hreflang, son JSON-LD et sa FAQ alignée.
 *
 * Slugs : français pour /services/, anglais pour /en/services/ et /ar/services/
 * (slug latin pour l'arabe : URLs partageables sans percent-encoding).
 */

export const SITE = "https://ibrahimmajdoub.netlify.app";
export const PAGES_DATE = "2026-11-04";

export const LANGS = ["fr", "en", "ar"];

export const BRAND = {
  fr: "Maître Brahim Majdoub",
  en: "Brahim Majdoub",
  ar: "المحامي الاستاذ ابراهيم المجدوب",
};

/* Ligne de marque réutilisée dans le <h1> de chaque page interne (le nom doit
   figurer dans le h1 — requête de marque). */
export const BRAND_LINE = {
  fr: "Maître Brahim Majdoub, avocat au Barreau de Sousse.",
  en: "Brahim Majdoub, attorney at the Sousse Bar.",
  ar: "المحامي الاستاذ ابراهيم المجدوب، محامٍ لدى الاستئناف بسوسة.",
};

export const LANG_META = {
  fr: { dir: "ltr", locale: "fr_TN", home: "/", ogSiteName: "Cabinet Brahim Majdoub" },
  en: { dir: "ltr", locale: "en_US", home: "/en/", ogSiteName: "Brahim Majdoub Law Office" },
  ar: { dir: "rtl", locale: "ar_TN", home: "/ar/", ogSiteName: "مكتب ابراهيم المجدوب للمحاماة" },
};

export const OG_ALT = {
  fr: "Carte de partage — Maître Brahim Majdoub, avocat, en robe devant une bibliothèque juridique et le drapeau tunisien",
  en: "Share card — Brahim Majdoub, attorney in robes, before a law library and the Tunisian flag",
  ar: "بطاقة مشاركة الموقع: المحامي الاستاذ ابراهيم المجدوب بالروب، أمام مكتبة قانونية وبجانبه العلم التونسي",
};

/* Libellés propres aux pages internes (le reste du chrome — header, footer,
   contact, CTA — est extrait des pages d'accueil par le générateur). */
export const UI = {
  fr: {
    crumbsLabel: "Fil d'Ariane",
    crumbHome: "Accueil",
    crumbServices: "Services",
    heroEyebrow: "Domaine d'expertise · Sousse",
    ctaConsult: "Consultation gratuite",
    ctaCall: "Appeler le cabinet",
    chip1: "Réponse sous 24 h ouvrées",
    chip2: "Honoraires convenus par écrit",
    chip3: "Confidentialité absolue",
    scopeTitle: "Ce que nous prenons en charge",
    scopeEyebrow: "Notre intervention",
    processTitle: "Déroulement type d'un dossier",
    processEyebrow: "Notre méthode",
    faqTitle: "Questions fréquentes",
    faqEyebrow: "Vos questions",
    relatedTitle: "Explorer un autre domaine",
    relatedEyebrow: "Maillage interne",
    relatedLink: "Découvrir ce service",
    asideTitle: "Parler à votre avocat",
    asideText: "Exposez votre situation en toute confidentialité. Réponse sous 24 h ouvrées.",
    asideDomains: "Autres domaines",
    asideAll: "Tous les services",
    lawyerCardTitle: "Votre avocat",
    lawyerCardText: "Avocat au Barreau de Sousse, spécialiste en droit pénal et en droit douanier. Chaque dossier est étudié avec précision, avec des honoraires convenus à l'avance et un compte rendu après chaque audience.",
    lawyerCardLink: "Découvrir le cabinet",
    hubEyebrow: "Cabinet d'avocat · Sousse",
    hubCardsTitle: "Nos sept domaines d'expertise",
    hubCardLink: "Découvrir ce service",
    note: "Les informations publiées sur cette page sont générales et ne constituent pas une consultation juridique.",
  },
  en: {
    crumbsLabel: "Breadcrumb",
    crumbHome: "Home",
    crumbServices: "Services",
    heroEyebrow: "Practice area · Sousse",
    ctaConsult: "Free consultation",
    ctaCall: "Call the office",
    chip1: "Reply within 24 working hours",
    chip2: "Fees agreed in writing",
    chip3: "Absolute confidentiality",
    scopeTitle: "What we handle",
    scopeEyebrow: "Our work",
    processTitle: "How a case unfolds",
    processEyebrow: "Our method",
    faqTitle: "Frequently asked questions",
    faqEyebrow: "Your questions",
    relatedTitle: "Explore another practice area",
    relatedEyebrow: "Related services",
    relatedLink: "Discover this service",
    asideTitle: "Speak to your lawyer",
    asideText: "Describe your situation in full confidence. Reply within 24 working hours.",
    asideDomains: "Other practice areas",
    asideAll: "All services",
    lawyerCardTitle: "Your lawyer",
    lawyerCardText: "Attorney at the Sousse Bar, specialising in criminal defence and customs law. Every case is studied with precision, with fees agreed in advance and a report after every hearing.",
    lawyerCardLink: "About the firm",
    hubEyebrow: "Law office · Sousse",
    hubCardsTitle: "Our seven practice areas",
    hubCardLink: "Discover this service",
    note: "The information on this page is general and does not constitute legal advice.",
  },
  ar: {
    crumbsLabel: "مسار التنقل",
    crumbHome: "الرئيسية",
    crumbServices: "الخدمات",
    heroEyebrow: "مجال خبرة · سوسة",
    ctaConsult: "استشارة مجانية",
    ctaCall: "الاتصال بالمكتب",
    chip1: "جواب في ظرف 24 ساعة عمل",
    chip2: "أتعاب متفق عليها كتابيًا",
    chip3: "سرية مطلقة",
    scopeTitle: "ما نتكفل به",
    scopeEyebrow: "تدخلنا",
    processTitle: "سير الملف",
    processEyebrow: "منهجنا",
    faqTitle: "أسئلة شائعة",
    faqEyebrow: "أسئلتكم",
    relatedTitle: "استكشف مجالًا آخر",
    relatedEyebrow: "خدمات ذات صلة",
    relatedLink: "اكتشف هذه الخدمة",
    asideTitle: "تحدث إلى محاميكم",
    asideText: "اعرضوا وضعيتكم بكل سرية. جواب في ظرف 24 ساعة عمل.",
    asideDomains: "مجالات أخرى",
    asideAll: "كل الخدمات",
    lawyerCardTitle: "محاميكم",
    lawyerCardText: "محامٍ لدى الاستئناف بسوسة، مختص في القضايا الجزائية والقانون الديواني. كل ملف يُدرس بدقة، مع أتعاب متفق عليها مسبقًا وتقرير بعد كل جلسة.",
    lawyerCardLink: "اكتشف المكتب",
    hubEyebrow: "مكتب محاماة · سوسة",
    hubCardsTitle: "مجالات خبرتنا السبعة",
    hubCardLink: "اكتشف هذه الخدمة",
    note: "المعلومات المنشورة في هذه الصفحة عامة ولا تُعدّ استشارة قانونية.",
  },
};

/* Icônes des cartes (mêmes tracés que la page d'accueil). */
export const ICONS = {
  affaires: '<rect x="2.5" y="7" width="19" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M2.5 12h19"/>',
  penal: '<path d="M14 4l6 6-3 3-6-6zM10 8l-7 7 3 3 7-7M4 21h10"/>',
  famille: '<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9.5" r="2.3"/><path d="M2.5 20c0-3 2.4-5.3 5.5-5.3s5.5 2.3 5.5 5.3M15 20c0-2.2 1-3.9 2.6-3.9 1.6 0 2.9 1.6 2.9 3.9"/>',
  immobilier: '<path d="M3 10.5L12 3l9 7.5M5.5 9.5V21h13V9.5M10 21v-6h4v6"/>',
  travail: '<path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6M9 13h6M9 17h6"/>',
  recouvrement: '<ellipse cx="12" cy="6.5" rx="7.5" ry="3"/><path d="M4.5 6.5v11c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-11M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>',
  douanier: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
};

/* ------------------------------------------------------------------ */
/*  LES SEPT DOMAINES                                                   */
/* ------------------------------------------------------------------ */

export const SERVICES = [
  {
    id: "affaires",
    num: "01",
    slug: { fr: "droit-des-affaires", en: "business-law", ar: "business-law" },
    name: { fr: "Droit des affaires", en: "Business law", ar: "قانون الأعمال" },
    tagline: {
      fr: "Constitution, vie sociale, opérations sur titres et contentieux entre associés.",
      en: "Formation, corporate life, share transactions and disputes between partners.",
      ar: "التأسيس، حياة الشركة، التفويت في الحصص والنزاعات بين الشركاء.",
    },
    content: {
      fr: {
        title: "Maître Brahim Majdoub — Avocat droit des affaires à Sousse",
        description: "Maître Brahim Majdoub, avocat en droit des affaires à Sousse : création de société, statuts, pactes d'associés, cessions et litiges entre associés. Devis écrit.",
        h1: "Avocat en droit des affaires à Sousse",
        lead: "De la création de votre société à la résolution des litiges entre associés, le cabinet conseille les entrepreneurs, les PME et les dirigeants à Sousse et dans toute la Tunisie : structure, contrats, gouvernance, contentieux.",
        scope: [
          { t: "Création de société", d: "Choix de la forme (SARL, SUARL, SA), rédaction des statuts, immatriculation au Registre national des entreprises." },
          { t: "Pactes & gouvernance", d: "Pactes d'associés, clauses d'agrément et de sortie, organisation des pouvoirs : prévenir les blocages avant qu'ils n'arrivent." },
          { t: "Cessions & restructurations", d: "Cession de parts ou d'actions, augmentation de capital, fusion, transmission d'entreprise : sécurisation de chaque étape." },
          { t: "Contrats commerciaux", d: "Rédaction et revue des contrats : distribution, prestation, bail commercial, conditions générales — des clauses qui protègent." },
          { t: "Litiges entre associés", d: "Abus de majorité, révocation de gérant, reddition de comptes, expertise de gestion : défense de vos intérêts devant le tribunal." },
          { t: "Entreprises en difficulté", d: "Prévention, règlement amiable, redressement et liquidation judiciaires : anticiper plutôt que subir." },
        ],
        process: [
          { t: "Audit de la situation", d: "Statuts, registres, contrats, comptes : nous cartographions les risques juridiques de votre société avant d'agir." },
          { t: "Stratégie & rédaction", d: "Nous sécurisons l'opération par des actes précis : statuts, pactes, contrats, procès-verbaux — chaque document est rédigé ou revu." },
          { t: "Négociation", d: "Face à un associé, un partenaire ou un créancier, nous négocions sur la base du droit et des pièces, pour éviter le contentieux quand c'est possible." },
          { t: "Contentieux si nécessaire", d: "Lorsque le litige est inévitable, nous représentons la société ou le dirigeant devant la juridiction commerciale compétente." },
        ],
        watch: {
          title: "Bon à savoir",
          body: "La plupart des litiges entre associés naissent de statuts copiés-collés et de l'absence de pacte. Un accompagnement en amont coûte toujours moins qu'un contentieux de plusieurs années.",
        },
        faq: [
          { q: "Quelle forme de société choisir en Tunisie ?", a: "SARL, SUARL ou SA selon le nombre d'associés, le capital, l'activité et les projets d'entrée d'investisseurs. Le cabinet compare les options avec vous et rédige les statuts adaptés." },
          { q: "Peut-on créer une société à distance ?", a: "Oui, avec une procuration dûment établie : le cabinet prépare les actes, coordonne les signatures et suit l'immatriculation, où que vous soyez." },
          { q: "Comment prévenir un conflit entre associés ?", a: "Par des statuts précis et un pacte d'associés : répartition des pouvoirs, majorité, sortie, valorisation des parts. Nous les rédigeons dès la création ou lors d'une refonte." },
          { q: "Quels honoraires pour un dossier d'affaires ?", a: "Forfait pour les opérations standard (création, cession), taux horaire ou abonnement pour le conseil récurrent, honoraire de résultat encadré pour le contentieux. Tout est convenu par écrit." },
        ],
      },
      en: {
        title: "Brahim Majdoub — Business Lawyer in Sousse, Tunisia",
        description: "Brahim Majdoub, business law attorney in Sousse: company formation, articles, shareholder agreements, share transfers and partner disputes. Written quote.",
        h1: "Business law attorney in Sousse",
        lead: "From company formation to shareholder disputes, the firm advises entrepreneurs, SMEs and executives in Sousse and across Tunisia: structure, contracts, governance and litigation.",
        scope: [
          { t: "Company formation", d: "Choice of form (SARL, SUARL, SA), drafting of articles of association, registration with the National Business Register." },
          { t: "Shareholder agreements & governance", d: "Shareholder pacts, approval and exit clauses, allocation of powers: preventing deadlocks before they happen." },
          { t: "Transfers & restructuring", d: "Share transfers, capital increases, mergers, business succession: securing every step." },
          { t: "Commercial contracts", d: "Drafting and review: distribution, services, commercial leases, terms and conditions — clauses that protect you." },
          { t: "Shareholder disputes", d: "Abuse of majority, removal of managers, accounting claims, management audits: defending your interests in court." },
          { t: "Companies in difficulty", d: "Prevention, amicable settlement, judicial reorganisation and liquidation: anticipating rather than enduring." },
        ],
        process: [
          { t: "Situation audit", d: "Articles, registers, contracts, accounts: we map your company's legal risks before acting." },
          { t: "Strategy & drafting", d: "We secure the operation with precise documents: articles, pacts, contracts, minutes — every document is drafted or reviewed." },
          { t: "Negotiation", d: "Facing a partner, a counterparty or a creditor, we negotiate on the basis of law and evidence, to avoid litigation where possible." },
          { t: "Litigation if needed", d: "When a dispute is unavoidable, we represent the company or its executive before the competent commercial court." },
        ],
        watch: {
          title: "Good to know",
          body: "Most shareholder disputes start with copy-pasted articles and no shareholder agreement. Upstream advice always costs less than years of litigation.",
        },
        faq: [
          { q: "Which company form should I choose in Tunisia?", a: "SARL, SUARL or SA depending on the number of shareholders, capital, activity and investor plans. The firm compares the options with you and drafts tailored articles." },
          { q: "Can I set up a company remotely?", a: "Yes, with a duly executed power of attorney: the firm prepares the deeds, coordinates signatures and follows registration through, wherever you are." },
          { q: "How can shareholder conflicts be prevented?", a: "With precise articles and a shareholders' agreement: powers, majorities, exit, share valuation. We draft them at formation or during an overhaul." },
          { q: "What are the fees for a business matter?", a: "Flat fees for standard operations (formation, transfer), hourly rates or retainers for ongoing advice, regulated success fees for litigation. Everything is agreed in writing." },
        ],
      },
      ar: {
        title: "المحامي الاستاذ ابراهيم المجدوب — محامي شركات وأعمال بسوسة",
        description: "المحامي الاستاذ ابراهيم المجدوب، محامٍ في قانون الأعمال بسوسة: تأسيس الشركات، القوانين الأساسية، ميثاق الشركاء، التفويت والنزاعات بين الشركاء.",
        h1: "محامي شركات وأعمال بسوسة",
        lead: "من تأسيس شركتكم إلى فض النزاعات بين الشركاء، يرافق المكتب باعثي المؤسسات والمؤسسات الصغرى والمتوسطة والمسيرين بسوسة وفي كامل تونس: الهيكلة، العقود، الحوكمة والتقاضي.",
        scope: [
          { t: "تأسيس الشركات", d: "اختيار الشكل القانوني (ش.ذ.م.م، شركة الشخص الواحد، خفية الاسم)، تحرير القانون الأساسي، والترسيم بالسجل الوطني للمؤسسات." },
          { t: "ميثاق الشركاء والحوكمة", d: "ميثاق الشركاء، شروط الموافقة والخروج، تنظيم السلطات: تفادي الانسداد قبل وقوعه." },
          { t: "التفويت وإعادة الهيكلة", d: "التفويت في الحصص والأسهم، الترفيع في رأس المال، الإدماج، إحالة المؤسسة: تأمين كل مرحلة." },
          { t: "العقود التجارية", d: "تحرير ومراجعة العقود: التوزيع، الخدمات، الكراء التجاري، الشروط العامة — بنود تحميكم." },
          { t: "النزاعات بين الشركاء", d: "التعسف في الأغلبية، عزل المسير، المطالبة بالحسابات، الاختبار في التصرف: الدفاع عن مصالحكم أمام المحكمة." },
          { t: "المؤسسات في صعوبة", d: "الوقاية، التسوية الرضائية، التسوية القضائية والتفليس: الاستباق بدل المعاناة." },
        ],
        process: [
          { t: "تدقيق الوضعية", d: "القانون الأساسي، السجلات، العقود، الحسابات: نرسم خريطة المخاطر القانونية لشركتكم قبل التحرك." },
          { t: "الاستراتيجية والتحرير", d: "نؤمّن العملية بوثائق دقيقة: قانون أساسي، مواثيق، عقود، محاضر — كل وثيقة تُحرر أو تُراجع." },
          { t: "التفاوض", d: "أمام شريك أو متعاقد أو دائن، نتفاوض على أساس القانون والمؤيدات لتفادي التقاضي متى أمكن." },
          { t: "التقاضي عند الاقتضاء", d: "حين يكون النزاع محتومًا، نمثل الشركة أو المسير أمام المحكمة التجارية المختصة." },
        ],
        watch: {
          title: "جدير بالذكر",
          body: "أغلب النزاعات بين الشركاء تنشأ عن قوانين أساسية منسوخة وغياب ميثاق للشركاء. المرافقة المسبقة أقل كلفة دائمًا من نزاع يدوم سنوات.",
        },
        faq: [
          { q: "أي شكل قانوني أختار لشركتي في تونس؟", a: "ش.ذ.م.م أو شركة الشخص الواحد أو خفية الاسم حسب عدد الشركاء ورأس المال والنشاط ومشاريع دخول المستثمرين. يقارن المكتب الخيارات معكم ويحرر القانون الأساسي الملائم." },
          { q: "هل يمكن تأسيس شركة عن بُعد؟", a: "نعم، بتوكيل محرر حسب الأصول: يعدّ المكتب الوثائق، ينسق الإمضاءات ويتابع الترسيم، أينما كنتم." },
          { q: "كيف يمكن تفادي النزاع بين الشركاء؟", a: "بقانون أساسي دقيق وميثاق شركاء: توزيع السلطات، الأغلبية، الخروج، تقييم الحصص. نحررها عند التأسيس أو عند إعادة الهيكلة." },
          { q: "ما هي أتعاب ملفات الأعمال؟", a: "مبلغ جزافي للعمليات العادية (التأسيس، التفويت)، احتساب بالساعة أو اشتراك للاستشارة المستمرة، وأتعاب نتائج مؤطرة للتقاضي. كل شيء متفق عليه كتابيًا." },
        ],
      },
    },
  },

  {
    id: "penal",
    num: "02",
    slug: { fr: "droit-penal", en: "criminal-law", ar: "criminal-law" },
    name: { fr: "Droit pénal", en: "Criminal law", ar: "القانون الجزائي" },
    tagline: {
      fr: "Stupéfiants, blanchiment d’argent, abus de confiance, atteintes aux antiquités : une défense pénale engagée dès les premières heures de la procédure.",
      en: "Drug charges, money laundering, breach of trust, antiquities offences: criminal defence engaged from the first hours of the procedure.",
      ar: "المخدرات، تبييض الأموال، خيانة الأمانة، الاعتداء على الآثار: دفاع جزائي منذ الساعات الأولى للإجراءات.",
    },
    content: {
      fr: {
        title: "Maître Brahim Majdoub — Avocat droit pénal à Sousse",
        description: "Maître Brahim Majdoub, avocat pénaliste à Sousse : garde à vue, stupéfiants, abus de confiance, blanchiment. Défense dès les premières heures de la procédure.",
        h1: "Avocat en droit pénal à Sousse",
        lead: "Stupéfiants, blanchiment, abus de confiance, atteintes aux biens ou aux personnes : le cabinet défend les personnes mises en cause comme les victimes, à chaque stade de la procédure pénale — de la garde à vue au pourvoi en cassation.",
        scope: [
          { t: "Garde à vue & premières heures", d: "Intervention dès la retenue : visite au poste, contrôle des délais et des droits, préparation des auditions." },
          { t: "Stupéfiants", d: "Consommation, détention, trafic : analyse du dossier, nullités de procédure, application des atténuations prévues par la loi." },
          { t: "Abus de confiance & escroquerie", d: "Défense des prévenus comme des victimes : qualification des faits, preuve, réparation du préjudice." },
          { t: "Blanchiment & infractions financières", d: "Dossiers complexes mêlant pénal et financier : flux, traçabilité, saisies et confiscations." },
          { t: "Antiquités & patrimoine", d: "Atteintes aux antiquités et au patrimoine : expertise, contexte, stratégie de défense adaptée." },
          { t: "Appel & cassation", d: "Évaluation des chances, rédaction des moyens, plaidoirie devant la cour d'appel et la Cour de cassation." },
        ],
        process: [
          { t: "Urgence & garde à vue", d: "En Tunisie, la garde à vue de droit commun est de 48 heures, renouvelable une fois sur autorisation du procureur. L'avocat peut intervenir dès cette phase : ne restez pas seul face aux premières auditions." },
          { t: "Enquête & instruction", d: "Suivi des auditions, demandes d'actes, accès au dossier, demandes de mise en liberté provisoire devant le juge d'instruction ou la chambre d'accusation." },
          { t: "Jugement", d: "Préparation des conclusions, constitution de partie civile pour les victimes, plaidoirie devant le tribunal cantonal ou la chambre correctionnelle." },
          { t: "Voies de recours", d: "Les délais d'appel et de pourvoi sont courts : le cabinet évalue immédiatement l'opportunité d'un recours et le forme dans les temps." },
        ],
        watch: {
          title: "Bon à savoir",
          body: "En matière pénale, les premières heures comptent : déclarations faites sans conseil, délais de recours très courts, détention provisoire… Depuis la réforme de 2016, le droit à l'avocat dès la garde à vue est garanti. Contactez le cabinet avant toute audition si possible.",
        },
        faq: [
          { q: "Que faire en cas de garde à vue d'un proche ?", a: "Contactez immédiatement le cabinet : nous vérifions la régularité de la mesure, les délais (48 h renouvelables une fois en droit commun) et organisons l'assistance dès que la loi le permet." },
          { q: "Un avocat peut-il intervenir avant le jugement ?", a: "Oui : dès la garde à vue, puis pendant l'enquête et l'instruction. Une défense précoce pèse souvent plus qu'une plaidoirie tardive : nullités, demandes d'actes, liberté provisoire." },
          { q: "Peut-on obtenir une libération provisoire ?", a: "Selon la qualification, la détention provisoire peut être combattue par des demandes motivées de mise en liberté, avec garanties de représentation. Le cabinet les prépare et les soutient." },
          { q: "Comment sont fixés les honoraires en matière pénale ?", a: "Ils sont convenus par écrit avant toute intervention : forfait par phase (garde à vue, instruction, jugement, recours) ou taux horaire. Une estimation claire vous est remise dès le premier rendez-vous." },
        ],
      },
      en: {
        title: "Brahim Majdoub — Criminal Lawyer in Sousse, Tunisia",
        description: "Brahim Majdoub, criminal defence lawyer in Sousse: police custody, drug charges, breach of trust, money laundering. Defence from the first hours of proceedings.",
        h1: "Criminal defence lawyer in Sousse",
        lead: "Drug charges, money laundering, breach of trust, offences against people or property: the firm defends both the accused and victims at every stage of Tunisian criminal proceedings — from police custody to the Court of Cassation.",
        scope: [
          { t: "Police custody & first hours", d: "Immediate intervention: visit at the police station, review of time limits and rights, preparation for questioning." },
          { t: "Drug offences", d: "Use, possession, trafficking: file analysis, procedural nullities, application of the mitigations provided by law." },
          { t: "Breach of trust & fraud", d: "Defending the accused and victims alike: legal classification, evidence, compensation for the damage suffered." },
          { t: "Money laundering & financial crime", d: "Complex files combining criminal and financial issues: money flows, traceability, seizures and confiscation." },
          { t: "Antiquities & heritage", d: "Offences involving antiquities and heritage: expert evidence, context, a defence strategy tailored to each case." },
          { t: "Appeal & cassation", d: "Assessment of prospects, drafting of grounds, pleading before the Court of Appeal and the Court of Cassation." },
        ],
        process: [
          { t: "Urgency & custody", d: "In Tunisia, ordinary police custody lasts 48 hours, renewable once with the prosecutor's authorisation. A lawyer can intervene from this stage: do not face the first interviews alone." },
          { t: "Investigation", d: "Monitoring of interviews, requests for investigative acts, access to the file, applications for provisional release before the investigating judge or the indictment chamber." },
          { t: "Trial", d: "Preparation of submissions, civil-party constitution for victims, pleading before the cantonal court or the criminal chamber." },
          { t: "Appeals", d: "Appeal and cassation deadlines are short: the firm immediately assesses whether to challenge the judgment and files within time." },
        ],
        watch: {
          title: "Good to know",
          body: "In criminal matters the first hours matter: statements made without counsel, very short appeal deadlines, pre-trial detention… Since the 2016 reform, the right to a lawyer from police custody is guaranteed. Contact the firm before any interview if possible.",
        },
        faq: [
          { q: "A relative is in police custody — what should I do?", a: "Contact the firm immediately: we check the lawfulness of the measure and the time limits (48 hours, renewable once in ordinary cases) and organise assistance as soon as the law allows." },
          { q: "Can a lawyer intervene before trial?", a: "Yes: from police custody, then throughout the investigation. Early defence often weighs more than a late plea: nullities, requests for acts, provisional release." },
          { q: "Is provisional release possible?", a: "Depending on the charges, pre-trial detention can be challenged with reasoned release applications backed by guarantees of appearance. The firm prepares and argues them." },
          { q: "How are criminal defence fees set?", a: "They are agreed in writing before any work: a flat fee per stage (custody, investigation, trial, appeal) or an hourly rate. A clear estimate is given at the first meeting." },
        ],
      },
      ar: {
        title: "المحامي الاستاذ ابراهيم المجدوب — محامي قضايا جزائية بسوسة",
        description: "المحامي الاستاذ ابراهيم المجدوب، محامٍ مختص في القضايا الجزائية بسوسة: الاحتفاظ، المخدرات، التحيل، تبييض الأموال. دفاع من الساعات الأولى للإجراءات.",
        h1: "محامي قضايا جزائية بسوسة",
        lead: "قضايا المخدرات، تبييض الأموال، التحيل وخيانة الأمانة، الاعتداء على الأشخاص والأملاك: يدافع المكتب عن المتهمين وعن المتضررين على حد سواء، في كل أطوار الإجراءات الجزائية — من الاحتفاظ إلى التعقيب.",
        scope: [
          { t: "الاحتفاظ والساعات الأولى", d: "تدخل فوري: الزيارة بمركز الإيقاف، مراقبة الآجال والحقوق، والتحضير للاستنطاقات الأولى." },
          { t: "قضايا المخدرات", d: "الاستهلاك والمسك والاتجار: دراسة الملف، أوجه البطلان الإجرائية، وتطبيق ظروف التخفيف المنصوص عليها قانونًا." },
          { t: "خيانة الأمانة والتحيل", d: "الدفاع عن المتهمين وعن المتضررين: تكييف الوقائع، الإثبات، وجبر الضرر." },
          { t: "تبييض الأموال والجرائم المالية", d: "ملفات معقدة تجمع بين الجزائي والمالي: تدفقات الأموال، التتبع، الحجوزات والمصادرة." },
          { t: "الآثار والتراث", d: "الاعتداءات على الآثار والتراث: الخبرة، السياق، واستراتيجية دفاع ملائمة لكل ملف." },
          { t: "الاستئناف والتعقيب", d: "تقييم الحظوظ، تحرير أوجه الطعن، والمرافعة أمام محكمة الاستئناف ومحكمة التعقيب." },
        ],
        process: [
          { t: "الاستعجال والاحتفاظ", d: "في تونس، مدة الاحتفاظ في الحق العام 48 ساعة قابلة للتجديد مرة واحدة بإذن من وكيل الجمهورية. يمكن للمحامي التدخل منذ هذا الطور: لا تواجه الاستنطاقات الأولى وحدك." },
          { t: "البحث والتحقيق", d: "متابعة الاستنطاقات، طلب أعمال التحقيق، النفاذ إلى الملف، ومطالب السراح المؤقت أمام حاكم التحقيق أو دائرة الاتهام." },
          { t: "المحاكمة", d: "إعداد المستنتجات، القيام بالحق الشخصي للمتضررين، والمرافعة أمام محكمة الناحية أو الدائرة الجزائية بالمحكمة الابتدائية." },
          { t: "طرق الطعن", d: "آجال الاستئناف والتعقيب قصيرة: يقيّم المكتب فورًا جدوى الطعن ويقدّمه في الآجال القانونية." },
        ],
        watch: {
          title: "جدير بالذكر",
          body: "في المادة الجزائية، الساعات الأولى حاسمة: تصريحات بدون مؤازرة، آجال طعن قصيرة جدًا، إيقاف تحفظي… منذ إصلاح 2016، الحق في المحامي منذ الاحتفاظ مضمون. اتصل بالمكتب قبل أي استنطاق إن أمكن.",
        },
        faq: [
          { q: "أحد أقاربي في الاحتفاظ، ماذا أفعل؟", a: "اتصل بالمكتب فورًا: نتحقق من سلامة الإجراء ومن احترام الآجال (48 ساعة قابلة للتجديد مرة واحدة في الحق العام) وننظم المؤازرة في أقرب وقت يسمح به القانون." },
          { q: "هل يمكن للمحامي التدخل قبل المحاكمة؟", a: "نعم: منذ الاحتفاظ، ثم خلال البحث والتحقيق. الدفاع المبكر غالبًا أهم من مرافعة متأخرة: أوجه البطلان، طلبات أعمال التحقيق، والسراح المؤقت." },
          { q: "هل يمكن الحصول على السراح المؤقت؟", a: "حسب التكييف، يمكن مقاومة الإيقاف التحفظي بمطالب سراح معللة مع ضمانات الحضور. يعدّها المكتب ويدافع عنها." },
          { q: "كيف تُحدد الأتعاب في القضايا الجزائية؟", a: "تُحدد كتابيًا قبل أي تدخل: مبلغ جزافي لكل طور (الاحتفاظ، التحقيق، المحاكمة، الطعن) أو احتساب بالساعة. تُسلّم لكم تقديرات واضحة منذ الموعد الأول." },
        ],
      },
    },
  },

  {
    id: "famille",
    num: "03",
    slug: { fr: "droit-de-la-famille", en: "family-law", ar: "family-law" },
    name: { fr: "Droit de la famille", en: "Family law", ar: "قانون الأسرة" },
    tagline: {
      fr: "Accompagnement humain et rigoureux des procédures familiales et du statut personnel.",
      en: "Caring, rigorous guidance through family proceedings and personal status matters.",
      ar: "مرافقة إنسانية دقيقة للإجراءات العائلية وقضايا الأحوال الشخصية.",
    },
    content: {
      fr: {
        title: "Maître Brahim Majdoub — Avocat droit de la famille à Sousse",
        description: "Maître Brahim Majdoub, avocat en droit de la famille à Sousse : divorce, pension alimentaire, garde des enfants, successions. Accompagnement humain et rigoureux.",
        h1: "Avocat en droit de la famille à Sousse",
        lead: "Divorce, pension alimentaire, garde des enfants, successions : le cabinet accompagne les familles avec écoute et rigueur, devant le juge de la famille et toutes les juridictions tunisiennes, dans le respect du Code du statut personnel.",
        scope: [
          { t: "Divorce", d: "Consentement mutuel, divorce pour préjudice ou à la demande d'un époux : choix de la voie, constitution du dossier, plaidoirie." },
          { t: "Pension & mesures urgentes", d: "Pension alimentaire, logement, mesures provisoires : demandes chiffrées et défendues dès les premières audiences." },
          { t: "Garde & droit de visite", d: "Organisation de la garde, droit de visite et d'hébergement, déplacements de l'enfant : l'intérêt de l'enfant au centre." },
          { t: "Successions & partages", d: "Dévolution successorale, indivision, partage amiable ou judiciaire, contestation de testament." },
          { t: "Mariage & filiation", d: "Conditions du mariage, régimes matrimoniaux, actions relatives à la filiation : conseil et contentieux." },
          { t: "Exécution des jugements", d: "Recouvrement des pensions impayées, exequatur des jugements étrangers, voies d'exécution." },
        ],
        process: [
          { t: "Écoute & qualification", d: "Un premier rendez-vous confidentiel pour comprendre la situation familiale, les urgences et vos objectifs — sans jugement." },
          { t: "Mesures urgentes", d: "Le juge de la famille peut ordonner des mesures provisoires (pension, logement, garde) : nous les demandons dès que la situation l'exige." },
          { t: "Conciliation & jugement", d: "La tentative de conciliation est une étape obligatoire : nous la préparons, puis plaidons le divorce et ses conséquences si elle échoue." },
          { t: "Après le jugement", d: "Exécution des décisions, révision des pensions, organisation durable de la garde : le dossier ne s'arrête pas au jugement." },
        ],
        watch: {
          title: "Bon à savoir",
          body: "En Tunisie, le divorce ne peut être prononcé que par le tribunal : trois voies existent (consentement mutuel, préjudice, demande d'un époux), avec des conséquences financières différentes. Le choix de la voie se discute dès le premier rendez-vous.",
        },
        faq: [
          { q: "Quels sont les types de divorce en Tunisie ?", a: "Le Code du statut personnel prévoit le divorce par consentement mutuel, pour préjudice subi, ou à la demande de l'un des époux. Chaque voie a ses conditions et ses conséquences financières : nous vous aidons à choisir." },
          { q: "Comment est fixée la pension alimentaire ?", a: "Selon les ressources du débiteur, les besoins des enfants et le niveau de vie de la famille. Nous constituons un dossier chiffré (salaires, charges, frais de scolarité) pour défendre un montant juste." },
          { q: "La garde des enfants est-elle automatique ?", a: "Non : le juge statue selon l'intérêt de l'enfant, en tenant compte de l'âge, de la stabilité et des capacités de chaque parent. Nous préparons les éléments qui éclairent sa décision." },
          { q: "Quels honoraires pour un dossier familial ?", a: "Ils sont convenus par écrit dès le départ, selon la procédure et les urgences. Une estimation claire est remise avant toute intervention, avec un souci de prévisibilité pour les familles." },
        ],
      },
      en: {
        title: "Brahim Majdoub — Family Lawyer in Sousse, Tunisia",
        description: "Brahim Majdoub, family law attorney in Sousse: divorce, child support, custody and inheritance. Caring, rigorous guidance under the Tunisian Personal Status Code.",
        h1: "Family law attorney in Sousse",
        lead: "Divorce, child support, custody, inheritance: the firm supports families with care and rigour before the family judge and all Tunisian courts, under the Code of Personal Status.",
        scope: [
          { t: "Divorce", d: "Mutual consent, divorce for harm or at one spouse's request: choosing the route, building the file, pleading." },
          { t: "Support & urgent measures", d: "Child support, housing, interim measures: quantified applications argued from the first hearings." },
          { t: "Custody & visitation", d: "Custody arrangements, visitation and residence rights, the child's travel: the child's best interests at the centre." },
          { t: "Inheritance & division", d: "Succession, joint ownership, amicable or judicial division, will contests." },
          { t: "Marriage & filiation", d: "Marriage requirements, matrimonial regimes, filiation actions: advice and litigation." },
          { t: "Enforcement of judgments", d: "Recovery of unpaid support, recognition of foreign judgments, enforcement proceedings." },
        ],
        process: [
          { t: "Listening & assessment", d: "A confidential first meeting to understand the family situation, the urgencies and your goals — without judgment." },
          { t: "Urgent measures", d: "The family judge can order interim measures (support, housing, custody): we apply as soon as the situation requires." },
          { t: "Conciliation & judgment", d: "The conciliation attempt is a mandatory step: we prepare it, then plead the divorce and its consequences if it fails." },
          { t: "After the judgment", d: "Enforcement of decisions, revision of support, lasting custody arrangements: the case does not end at judgment." },
        ],
        watch: {
          title: "Good to know",
          body: "In Tunisia, divorce can only be pronounced by a court: three routes exist (mutual consent, harm, one spouse's request), with different financial consequences. The choice of route is discussed at the first meeting.",
        },
        faq: [
          { q: "What types of divorce exist in Tunisia?", a: "The Code of Personal Status provides for divorce by mutual consent, for harm suffered, or at the request of either spouse. Each route has its conditions and financial consequences: we help you choose." },
          { q: "How is child support calculated?", a: "According to the debtor's resources, the children's needs and the family's standard of living. We build a quantified file (salaries, expenses, school fees) to argue a fair amount." },
          { q: "Is custody automatic?", a: "No: the judge rules according to the child's best interests, considering age, stability and each parent's capacity. We prepare the elements that inform the decision." },
          { q: "What are the fees for a family case?", a: "Agreed in writing from the start, according to the procedure and urgencies. A clear estimate is given before any work, with predictability in mind for families." },
        ],
      },
      ar: {
        title: "المحامي الاستاذ ابراهيم المجدوب — محامي أحوال شخصية بسوسة",
        description: "المحامي الاستاذ ابراهيم المجدوب، محامٍ في قانون الأسرة بسوسة: الطلاق، النفقة، الحضانة، المواريث. مرافقة إنسانية دقيقة وفق مجلة الأحوال الشخصية.",
        h1: "محامي أحوال شخصية وطلاق بسوسة",
        lead: "الطلاق، النفقة، حضانة الأبناء، المواريث: يرافق المكتب العائلات بإصغاء ودقة أمام قاضي الأسرة وكل المحاكم التونسية، في احترام مجلة الأحوال الشخصية.",
        scope: [
          { t: "الطلاق", d: "بالتراضي، للضرر، أو بطلب أحد الزوجين: اختيار المسار، إعداد الملف، والمرافعة." },
          { t: "النفقة والتدابير الاستعجالية", d: "نفقة الأبناء، السكن، التدابير الوقتية: مطالب محددة المبالغ تُدافع منذ الجلسات الأولى." },
          { t: "الحضانة وحق الزيارة", d: "تنظيم الحضانة، حق الزيارة والاستضافة، سفر المحضون: مصلحة الطفل في صميم كل طلب." },
          { t: "المواريث والقسمة", d: "التركة، الشيوع، القسمة الرضائية أو القضائية، الطعن في الوصية." },
          { t: "الزواج والنسب", d: "شروط الزواج، الأنظمة المالية بين الزوجين، دعاوى النسب: استشارة وتقاضٍ." },
          { t: "تنفيذ الأحكام", d: "استخلاص النفقات غير المدفوعة، تذييل الأحكام الأجنبية بالصيغة التنفيذية، طرق التنفيذ." },
        ],
        process: [
          { t: "الإصغاء والتكييف", d: "موعد أول سري لفهم الوضعية العائلية والاستعجالات وأهدافكم — دون أحكام مسبقة." },
          { t: "التدابير الاستعجالية", d: "يمكن لقاضي الأسرة أن يأذن بتدابير وقتية (نفقة، سكن، حضانة): نطلبها متى اقتضت الوضعية ذلك." },
          { t: "الصلح والحكم", d: "محاولة الصلح مرحلة وجوبية: نحضّر لها، ثم نترافع في الطلاق ونتائجه إن تعذر الصلح." },
          { t: "بعد الحكم", d: "تنفيذ القرارات، مراجعة النفقة، تنظيم دائم للحضانة: الملف لا ينتهي عند الحكم." },
        ],
        watch: {
          title: "جدير بالذكر",
          body: "في تونس، لا يقع الطلاق إلا بحكم من المحكمة: ثلاثة مسارات (التراضي، الضرر، طلب أحد الزوجين) بنتائج مالية مختلفة. يُناقش اختيار المسار منذ الموعد الأول.",
        },
        faq: [
          { q: "ما أنواع الطلاق في تونس؟", a: "تنص مجلة الأحوال الشخصية على الطلاق بالتراضي، وللضرر، وبطلب أحد الزوجين. لكل مسار شروطه ونتائجه المالية: نساعدكم على الاختيار." },
          { q: "كيف تُحدد النفقة؟", a: "حسب موارد المدين وحاجات الأبناء ومستوى عيش العائلة. نعد ملفًا محددًا (الأجور، الأعباء، مصاريف الدراسة) للدفاع عن مبلغ عادل." },
          { q: "هل الحضانة تلقائية؟", a: "لا: يقضي القاضي حسب مصلحة المحضون، مع مراعاة السن والاستقرار وقدرة كل والد. نعد العناصر التي تنير قراره." },
          { q: "ما هي أتعاب الملف العائلي؟", a: "تُحدد كتابيًا منذ البداية حسب الإجراءات والاستعجالات. تُسلّم تقديرات واضحة قبل أي تدخل، حرصًا على وضوح الرؤية للعائلات." },
        ],
      },
    },
  },

  {
    id: "immobilier",
    num: "04",
    slug: { fr: "droit-immobilier", en: "real-estate-law", ar: "real-estate-law" },
    name: { fr: "Droit immobilier", en: "Real estate law", ar: "القانون العقاري" },
    tagline: {
      fr: "Sécurisation des titres et des transactions, du compromis à l'enregistrement.",
      en: "Securing titles and transactions, from the preliminary agreement to registration.",
      ar: "تأمين الرسوم والمعاملات العقارية، من الوعد بالبيع إلى الترسيم.",
    },
    content: {
      fr: {
        title: "Maître Brahim Majdoub — Avocat droit immobilier à Sousse",
        description: "Maître Brahim Majdoub, avocat en droit immobilier à Sousse : titres fonciers, achat, vente, indivision, baux et litiges. Sécurisez vos transactions immobilières.",
        h1: "Avocat en droit immobilier à Sousse",
        lead: "Achat, vente, titre foncier, indivision, bail, litige de voisinage ou de construction : le cabinet sécurise vos transactions et défend vos biens immobiliers, à Sousse comme à distance pour les Tunisiens de l'étranger.",
        scope: [
          { t: "Vérification du titre foncier", d: "Inscription à la conservation de la propriété foncière, charges, hypothèques, servitudes : rien n'est acheté à l'aveugle." },
          { t: "Achat & vente", d: "Promesse de vente, conditions suspensives, séquestre du prix, enregistrement et publication : chaque étape est verrouillée." },
          { t: "Vente à distance (TRE)", d: "Procuration encadrée, comptes rendus réguliers, coordination avec l'acquéreur et l'administration : vendre ou acheter depuis l'étranger." },
          { t: "Indivision & partage", d: "Sortie d'indivision, partage amiable ou judiciaire, licitation, occupation d'un bien commun." },
          { t: "Baux & expulsion", d: "Bail d'habitation ou commercial, loyers impayés, congé, expulsion : droits du bailleur comme du locataire." },
          { t: "Contentieux immobilier", d: "Annulation de vente, bornage, empiètement, malfaçons, retard de livraison : défense devant le tribunal immobilier." },
        ],
        process: [
          { t: "Audit du bien", d: "Titre, situation cadastrale, charges, urbanisme : nous vérifions ce que vous achetez avant de signer quoi que ce soit." },
          { t: "Rédaction & sécurisation", d: "Promesse ou acte définitif, conditions suspensives, séquestre : le prix et le transfert sont protégés jusqu'à la publication." },
          { t: "Formalités", d: "Enregistrement, paiement des droits, publication à la conservation foncière : le transfert de propriété est mené à son terme." },
          { t: "Contentieux si nécessaire", d: "En cas de litige, nous défendons vos droits devant la juridiction immobilière compétente, avec les pièces du dossier." },
        ],
        watch: {
          title: "Bon à savoir",
          body: "En Tunisie, la propriété d'un bien immatriculé ne se transfère qu'à l'inscription au titre foncier. Une promesse de vente, même enregistrée, ne suffit pas : la publication à la conservation foncière est l'étape décisive.",
        },
        faq: [
          { q: "Comment vérifier un titre foncier avant d'acheter ?", a: "Nous demandons un état récent de l'inscription à la conservation de la propriété foncière : propriétaire réel, hypothèques, saisies, servitudes. L'achat ne se fait qu'après cet audit." },
          { q: "Peut-on acheter ou vendre depuis l'étranger ?", a: "Oui, par procuration dûment établie et encadrée. Le cabinet coordonne signatures, enregistrement et publication, avec un compte rendu à chaque étape." },
          { q: "Que faire en cas d'indivision bloquée ?", a: "Partage amiable d'abord ; à défaut, action en partage judiciaire ou licitation. Nous évaluons la voie la plus rapide et la moins coûteuse pour sortir de l'indivision." },
          { q: "Quels honoraires pour un dossier immobilier ?", a: "Forfait pour l'accompagnement d'une transaction (audit, rédaction, formalités), honoraires convenus par écrit pour le contentieux. Devis remis avant toute intervention." },
        ],
      },
      en: {
        title: "Brahim Majdoub — Real Estate Lawyer in Sousse, Tunisia",
        description: "Brahim Majdoub, real estate attorney in Sousse: land titles, purchase, sale, joint ownership, leases and disputes. Secure your property transactions in Tunisia.",
        h1: "Real estate lawyer in Sousse",
        lead: "Purchase, sale, land title, joint ownership, lease, neighbour or construction dispute: the firm secures your transactions and defends your property, in Sousse and remotely for Tunisians abroad.",
        scope: [
          { t: "Land title verification", d: "Registry search, charges, mortgages, easements: nothing is bought blind." },
          { t: "Purchase & sale", d: "Preliminary agreement, conditions precedent, escrow of the price, registration and publication: every step is locked down." },
          { t: "Remote sale (Tunisians abroad)", d: "Controlled power of attorney, regular reports, coordination with the buyer and the administration: selling or buying from abroad." },
          { t: "Joint ownership & division", d: "Exit from joint ownership, amicable or judicial division, auction, occupation of a common property." },
          { t: "Leases & eviction", d: "Residential or commercial leases, unpaid rent, notice, eviction: rights of landlords and tenants alike." },
          { t: "Property litigation", d: "Cancellation of sale, boundary disputes, encroachment, defects, late delivery: defence before the property court." },
        ],
        process: [
          { t: "Property audit", d: "Title, cadastral situation, charges, planning: we verify what you are buying before you sign anything." },
          { t: "Drafting & security", d: "Preliminary or final deed, conditions precedent, escrow: the price and the transfer are protected until publication." },
          { t: "Formalities", d: "Registration, payment of duties, publication at the land registry: the transfer of ownership is carried through." },
          { t: "Litigation if needed", d: "In a dispute, we defend your rights before the competent property court, with the full file." },
        ],
        watch: {
          title: "Good to know",
          body: "In Tunisia, ownership of registered property only transfers upon entry in the land title. A preliminary agreement, even registered, is not enough: publication at the land registry is the decisive step.",
        },
        faq: [
          { q: "How do I check a land title before buying?", a: "We request a recent registry extract from the land registry: actual owner, mortgages, seizures, easements. The purchase only proceeds after this audit." },
          { q: "Can I buy or sell from abroad?", a: "Yes, through a duly executed and controlled power of attorney. The firm coordinates signatures, registration and publication, with a report at each step." },
          { q: "What if joint ownership is deadlocked?", a: "Amicable division first; failing that, judicial division or auction. We assess the fastest and least costly route out of joint ownership." },
          { q: "What are the fees for a property matter?", a: "A flat fee for transaction support (audit, drafting, formalities), written agreed fees for litigation. A quote is given before any work." },
        ],
      },
      ar: {
        title: "المحامي الاستاذ ابراهيم المجدوب — محامي عقارات بسوسة",
        description: "المحامي الاستاذ ابراهيم المجدوب، محامٍ في القانون العقاري بسوسة: الرسوم العقارية، البيع والشراء، الشيوع، الكراء والنزاعات. أمّنوا معاملاتكم العقارية.",
        h1: "محامي قانون عقاري بسوسة",
        lead: "شراء، بيع، رسم عقاري، شيوع، كراء، نزاع جوار أو بناء: يؤمّن المكتب معاملاتكم ويدافع عن أملاككم العقارية، بسوسة وعن بُعد للتونسيين بالخارج.",
        scope: [
          { t: "التحقق من الرسم العقاري", d: "حالة الترسيم بإدارة الملكية العقارية، التحملات، الرهون، حقوق الارتفاق: لا شراء على غير بيّنة." },
          { t: "الشراء والبيع", d: "الوعد بالبيع، الشروط الواقفة، تجميد الثمن، التسجيل والترسيم: كل مرحلة مؤمّنة." },
          { t: "البيع عن بُعد (للتونسيين بالخارج)", d: "توكيل مؤطر، تقارير منتظمة، تنسيق مع المشتري والإدارة: البيع أو الشراء من الخارج." },
          { t: "الشيوع والقسمة", d: "الخروج من الشيوع، القسمة الرضائية أو القضائية، البيع بالمزاد، إشغال الملك المشاع." },
          { t: "الكراء والإخلاء", d: "كراء السكن أو المحلات، المعاليم غير المدفوعة، الإعلام، الإخلاء: حقوق المكري والمكتري معًا." },
          { t: "النزاعات العقارية", d: "إبطال البيع، التحديد، الاعتداء على الملك، عيوب البناء، التأخر في التسليم: الدفاع أمام المحكمة العقارية." },
        ],
        process: [
          { t: "تدقيق العقار", d: "الرسم، الوضعية العقارية، التحملات، التهيئة: نتحقق مما تشترونه قبل إمضاء أي وثيقة." },
          { t: "التحرير والتأمين", d: "وعد بالبيع أو عقد نهائي، شروط واقفة، تجميد الثمن: الثمن والتفويت محميان إلى غاية الترسيم." },
          { t: "الإجراءات", d: "التسجيل، خلاص المعاليم، الترسيم بإدارة الملكية العقارية: نقل الملكية يُستكمل إلى نهايته." },
          { t: "التقاضي عند الاقتضاء", d: "عند النزاع، ندافع عن حقوقكم أمام المحكمة العقارية المختصة بكامل مؤيدات الملف." },
        ],
        watch: {
          title: "جدير بالذكر",
          body: "في تونس، لا تنتقل ملكية العقار المرسم إلا بالترسيم بالرسم العقاري. الوعد بالبيع، حتى لو سُجّل، لا يكفي: الترسيم بإدارة الملكية العقارية هو المرحلة الحاسمة.",
        },
        faq: [
          { q: "كيف أتحقق من الرسم العقاري قبل الشراء؟", a: "نطلب حالة حديثة للترسيم من إدارة الملكية العقارية: المالك الحقيقي، الرهون، الحجوزات، حقوق الارتفاق. لا يتم الشراء إلا بعد هذا التدقيق." },
          { q: "هل يمكن الشراء أو البيع من الخارج؟", a: "نعم، بتوكيل محرر ومؤطر حسب الأصول. ينسق المكتب الإمضاءات والتسجيل والترسيم، مع تقرير في كل مرحلة." },
          { q: "ماذا أفعل إذا كان الشيوع معطلًا؟", a: "القسمة الرضائية أولًا؛ وعند تعذرها، دعوى قسمة قضائية أو بيع بالمزاد. نقيّم أسرع الطرق وأقلها كلفة للخروج من الشيوع." },
          { q: "ما هي أتعاب الملف العقاري؟", a: "مبلغ جزافي لمرافقة المعاملة (تدقيق، تحرير، إجراءات)، وأتعاب متفق عليها كتابيًا للتقاضي. تُسلّم التقديرات قبل أي تدخل." },
        ],
      },
    },
  },

  {
    id: "travail",
    num: "05",
    slug: { fr: "droit-du-travail", en: "employment-law", ar: "employment-law" },
    name: { fr: "Droit du travail", en: "Employment law", ar: "قانون الشغل" },
    tagline: {
      fr: "Conseil et représentation des employeurs comme des salariés, à preuve égale.",
      en: "Advice and representation for employers and employees alike, on equal evidence.",
      ar: "استشارة وتمثيل للمؤجرين والأجراء على حد سواء، بنفس الدقة.",
    },
    content: {
      fr: {
        title: "Maître Brahim Majdoub — Avocat droit du travail à Sousse",
        description: "Maître Brahim Majdoub, avocat en droit du travail à Sousse : licenciement abusif, prud'hommes, contrats, salaires impayés. Défense des salariés et des employeurs.",
        h1: "Avocat en droit du travail à Sousse",
        lead: "Licenciement, salaires impayés, harcèlement, contrat de travail, accident du travail : le cabinet défend les salariés comme les employeurs, à preuve égale, devant l'inspection du travail et la juridiction sociale.",
        scope: [
          { t: "Licenciement abusif", d: "Cause réelle et sérieuse, procédure, préavis, indemnités : contestation du licenciement et évaluation du préjudice." },
          { t: "Salaires & indemnités", d: "Rappels de salaire, heures supplémentaires, congés payés, indemnité de licenciement : calcul et recouvrement." },
          { t: "Contrats & clauses", d: "CDI, CDD, clause de non-concurrence, mobilité, télétravail : rédaction et sécurisation des contrats." },
          { t: "Harcèlement & discrimination", d: "Constitution de la preuve, protection du salarié, action en réparation : dossiers traités avec discrétion." },
          { t: "Accidents du travail", d: "Déclaration, reconnaissance, faute inexcusable, indemnisation : accompagnement de la victime et de l'employeur." },
          { t: "Conseil aux employeurs", d: "Règlement intérieur, procédures disciplinaires, ruptures conventionnelles, restructurations : prévenir le contentieux." },
        ],
        process: [
          { t: "Analyse du dossier", d: "Contrat, bulletins de paie, lettres, témoins : nous qualifions la situation et chiffrons les droits de chacune des parties." },
          { t: "Inspection du travail", d: "La tentative de conciliation devant l'inspection du travail est souvent décisive : nous la préparons et y assistons." },
          { t: "Juridiction sociale", d: "À défaut d'accord, nous saisissons la juridiction compétente (conseil de prud'hommes) et plaidons le dossier, pièces en main." },
          { t: "Exécution", d: "Recouvrement des condamnations, certificats, régularisations : la décision est suivie jusqu'à son exécution complète." },
        ],
        watch: {
          title: "Bon à savoir",
          body: "En Tunisie, un licenciement sans cause réelle et sérieuse ou sans respect de la procédure ouvre droit à réparation. Les délais pour agir sont courts — notamment devant le conseil de prud'hommes : ne tardez pas à consulter.",
        },
        faq: [
          { q: "Qu'est-ce qu'un licenciement abusif en Tunisie ?", a: "Un licenciement sans cause réelle et sérieuse, ou sans respect de la procédure légale ou conventionnelle. Le juge évalue le préjudice selon l'ancienneté, l'âge, la situation familiale et les circonstances." },
          { q: "Quel délai pour contester un licenciement ?", a: "Les actions en justice doivent être engagées dans un délai d'un an devant le conseil de prud'hommes. Passé ce délai, le droit d'agir peut être perdu : consultez rapidement." },
          { q: "L'employeur peut-il aussi consulter ?", a: "Oui : le cabinet conseille les employeurs sur la procédure disciplinaire, la rupture du contrat et la prévention des litiges, avec la même rigueur qu'il défend les salariés." },
          { q: "Quels honoraires pour un dossier de travail ?", a: "Ils sont convenus par écrit dès le départ : forfait, taux horaire ou honoraire de résultat dans les limites permises. Une estimation est remise avant toute intervention." },
        ],
      },
      en: {
        title: "Brahim Majdoub — Employment Lawyer in Sousse, Tunisia",
        description: "Brahim Majdoub, employment law attorney in Sousse: unfair dismissal, labour court, contracts and unpaid wages. Defending employees and employers with equal rigour.",
        h1: "Employment law attorney in Sousse",
        lead: "Dismissal, unpaid wages, harassment, employment contracts, workplace accidents: the firm defends employees and employers alike, with equal rigour, before the labour inspectorate and the labour courts.",
        scope: [
          { t: "Unfair dismissal", d: "Real and serious cause, procedure, notice, compensation: challenging the dismissal and assessing the damage." },
          { t: "Wages & entitlements", d: "Back pay, overtime, paid leave, severance: calculation and recovery." },
          { t: "Contracts & clauses", d: "Permanent and fixed-term contracts, non-compete, mobility, remote work: drafting and securing employment contracts." },
          { t: "Harassment & discrimination", d: "Building the evidence, protecting the employee, compensation claims: files handled with discretion." },
          { t: "Workplace accidents", d: "Declaration, recognition, inexcusable fault, compensation: supporting the victim and the employer." },
          { t: "Advice to employers", d: "Internal rules, disciplinary procedures, mutual terminations, restructuring: preventing litigation." },
        ],
        process: [
          { t: "File analysis", d: "Contract, payslips, letters, witnesses: we assess the situation and quantify each party's rights." },
          { t: "Labour inspectorate", d: "The conciliation attempt before the labour inspectorate is often decisive: we prepare it and attend." },
          { t: "Labour court", d: "If no agreement is reached, we bring the case before the competent labour court and plead it, evidence in hand." },
          { t: "Enforcement", d: "Recovery of awarded sums, certificates, regularisations: the decision is followed through to full enforcement." },
        ],
        watch: {
          title: "Good to know",
          body: "In Tunisia, a dismissal without a real and serious cause, or without following the required procedure, gives rise to compensation. Time limits to act are short — notably before the labour court: do not delay consulting.",
        },
        faq: [
          { q: "What is unfair dismissal in Tunisia?", a: "A dismissal without a real and serious cause, or without following the statutory or contractual procedure. The judge assesses the damage based on seniority, age, family situation and circumstances." },
          { q: "What is the deadline to challenge a dismissal?", a: "Claims must be brought before the labour court within one year. After that, the right to act may be lost: consult quickly." },
          { q: "Can employers also consult?", a: "Yes: the firm advises employers on disciplinary procedure, contract termination and dispute prevention, with the same rigour it defends employees." },
          { q: "What are the fees for an employment case?", a: "Agreed in writing from the start: flat fee, hourly rate or a success fee within permitted limits. An estimate is given before any work." },
        ],
      },
      ar: {
        title: "المحامي الاستاذ ابراهيم المجدوب — محامي قضايا شغل بسوسة",
        description: "المحامي الاستاذ ابراهيم المجدوب، محامٍ في قانون الشغل بسوسة: الطرد التعسفي، الأجور غير المدفوعة، العقود وحوادث الشغل. دفاع عن الأجراء والمؤجرين.",
        h1: "محامي قانون الشغل بسوسة",
        lead: "الطرد، الأجور غير المدفوعة، التحرش، عقد الشغل، حوادث الشغل: يدافع المكتب عن الأجراء والمؤجرين على حد سواء، بنفس الدقة، أمام تفقدية الشغل والدوائر الشغلية.",
        scope: [
          { t: "الطرد التعسفي", d: "السبب الحقيقي والجاد، الإجراءات، الإعلام، التعويضات: الطعن في الطرد وتقييم الضرر." },
          { t: "الأجور والمنح", d: "الأجور المتأخرة، الساعات الإضافية، العطل المدفوعة، منحة الطرد: الاحتساب والاستخلاص." },
          { t: "العقود والبنود", d: "عقود محددة وغير محددة المدة، شرط عدم المنافسة، التنقل، العمل عن بُعد: تحرير وتأمين عقود الشغل." },
          { t: "التحرش والتمييز", d: "تكوين الدليل، حماية الأجير، دعوى التعويض: ملفات تُعالج بسرية." },
          { t: "حوادث الشغل", d: "التصريح، الاعتراف، الخطأ الفادح، التعويض: مرافقة المتضرر والمؤجر." },
          { t: "استشارة المؤجرين", d: "النظام الداخلي، الإجراءات التأديبية، الإنهاء الرضائي، إعادة الهيكلة: تفادي النزاعات." },
        ],
        process: [
          { t: "دراسة الملف", d: "العقد، بطاقات الأجور، المراسلات، الشهود: نكيف الوضعية ونحدد حقوق كل طرف." },
          { t: "تفقدية الشغل", d: "محاولة الصلح أمام تفقدية الشغل غالبًا حاسمة: نحضّر لها ونحضرها." },
          { t: "الدوائر الشغلية", d: "عند تعذر الاتفاق، نرفع الدعوى أمام الدائرة الشغلية المختصة ونترافع بالمؤيدات." },
          { t: "التنفيذ", d: "استخلاص المبالغ المحكوم بها، الشهادات، التسويات: تُتابع القرارات إلى تنفيذها الكامل." },
        ],
        watch: {
          title: "جدير بالذكر",
          body: "في تونس، الطرد بدون سبب حقيقي وجاد أو بدون احترام الإجراءات يفتح الحق في التعويض. آجال التقاضي قصيرة — خاصة أمام الدوائر الشغلية: لا تتأخروا في الاستشارة.",
        },
        faq: [
          { q: "ما هو الطرد التعسفي في تونس؟", a: "هو الطرد بدون سبب حقيقي وجاد، أو بدون احترام الإجراءات القانونية أو التعاقدية. يقيّم القاضي الضرر حسب الأقدمية والسن والوضعية العائلية والظروف." },
          { q: "ما أجل الطعن في الطرد؟", a: "يجب رفع الدعوى أمام الدوائر الشغلية في أجل سنة. بعد هذا الأجل قد يسقط الحق في التقاضي: استشيروا بسرعة." },
          { q: "هل يمكن للمؤجر أيضًا الاستشارة؟", a: "نعم: ينصح المكتب المؤجرين في الإجراءات التأديبية وإنهاء العقد وتفادي النزاعات، بنفس الدقة التي يدافع بها عن الأجراء." },
          { q: "ما هي أتعاب ملف الشغل؟", a: "تُحدد كتابيًا منذ البداية: مبلغ جزافي، احتساب بالساعة، أو أتعاب نتائج في الحدود المسموح بها. تُسلّم التقديرات قبل أي تدخل." },
        ],
      },
    },
  },

  {
    id: "recouvrement",
    num: "06",
    slug: { fr: "recouvrement-de-creances", en: "debt-collection", ar: "debt-collection" },
    name: { fr: "Recouvrement & exécution", en: "Debt collection & enforcement", ar: "استخلاص الديون" },
    tagline: {
      fr: "Transformer un titre exécutoire en somme effectivement recouvrée.",
      en: "Turning an enforceable title into money actually recovered.",
      ar: "تحويل السند التنفيذي إلى مبلغ مستخلص فعليًا.",
    },
    content: {
      fr: {
        title: "Maître Brahim Majdoub — Recouvrement de créances à Sousse",
        description: "Maître Brahim Majdoub, avocat en recouvrement à Sousse : injonction de payer, saisie-arrêt, saisie-exécution. Transformez vos titres en paiements réels.",
        h1: "Recouvrement de créances à Sousse",
        lead: "Factures impayées, chèques sans provision, reconnaissances de dette, jugements non exécutés : le cabinet transforme vos créances et vos titres en paiements effectifs, par la voie amiable puis par les voies d'exécution.",
        scope: [
          { t: "Mise en demeure", d: "Lettre d'avocat, négociation, échéancier sécurisé : obtenir le paiement sans procès quand c'est possible." },
          { t: "Injonction de payer", d: "Procédure rapide sur requête pour les créances certaines : obtention d'un titre exécutoire à moindre coût." },
          { t: "Saisie-arrêt", d: "Blocage des sommes détenues par un tiers (banque, client, locataire) : la voie la plus efficace contre les débiteurs solvables." },
          { t: "Saisie-exécution & vente", d: "Saisie des biens meubles, vente aux enchères, distribution du prix : exécution par huissier de justice." },
          { t: "Saisie immobilière", d: "Lorsque le débiteur possède un bien : procédure encadrée, publication, vente et distribution." },
          { t: "Créances internationales", d: "Exequatur des jugements étrangers, coordination avec des correspondants, recouvrement transfrontalier." },
        ],
        process: [
          { t: "Audit de la créance", d: "Montant, exigibilité, preuve, solvabilité du débiteur : nous vérifions que la créance est recouvrable avant d'engager des frais." },
          { t: "Phase amiable", d: "Mise en demeure et négociation : une part importante des dossiers se règle à ce stade, sans procès." },
          { t: "Titre exécutoire", d: "Injonction de payer ou action au fond : nous obtenons le titre qui permet l'exécution forcée." },
          { t: "Exécution forcée", d: "Saisie-arrêt, saisie-exécution, saisie immobilière : nous pilotons l'huissier et suivons chaque étape jusqu'au paiement." },
        ],
        watch: {
          title: "Bon à savoir",
          body: "Un jugement gagné ne vaut que s'il est exécuté. La saisie-arrêt entre les mains d'une banque ou d'un tiers est souvent l'arme la plus rapide : encore faut-il identifier les sommes saisissables au bon moment.",
        },
        faq: [
          { q: "Comment recouvrer une facture impayée en Tunisie ?", a: "Mise en demeure d'abord, puis injonction de payer si la créance est certaine, puis voies d'exécution (saisie-arrêt, saisie-exécution). Le cabinet choisit la voie la plus rapide selon le débiteur." },
          { q: "Qu'est-ce qu'une saisie-arrêt ?", a: "Une procédure qui bloque entre les mains d'un tiers (banque, employeur, client) les sommes dues au débiteur, pour les attribuer au créancier. C'est l'une des voies d'exécution les plus efficaces." },
          { q: "Puis-je recouvrer sans procès ?", a: "Souvent oui : la mise en demeure d'un avocat et la négociation d'un échéancier sécurisé règlent de nombreux dossiers. Le contentieux n'est engagé que si nécessaire." },
          { q: "Quels honoraires pour le recouvrement ?", a: "Ils sont convenus par écrit : forfait pour la phase amiable, puis honoraire de résultat encadré sur les sommes effectivement recouvrées, dans les limites permises par la réglementation." },
        ],
      },
      en: {
        title: "Brahim Majdoub — Debt Collection Lawyer in Sousse",
        description: "Brahim Majdoub, debt collection attorney in Sousse: payment orders, garnishment, seizure and enforcement. Turn your judgments and invoices into actual payments.",
        h1: "Debt collection & enforcement in Sousse",
        lead: "Unpaid invoices, bounced cheques, debt acknowledgments, unenforced judgments: the firm turns your claims and titles into actual payments, through amicable recovery and then enforcement proceedings.",
        scope: [
          { t: "Formal notice", d: "Lawyer's letter, negotiation, secured payment plan: obtaining payment without trial where possible." },
          { t: "Payment order", d: "Fast ex parte procedure for undisputed claims: obtaining an enforceable title at lower cost." },
          { t: "Garnishment", d: "Freezing sums held by a third party (bank, client, tenant): the most effective route against solvent debtors." },
          { t: "Seizure & sale", d: "Seizure of movable assets, auction, distribution of proceeds: enforcement through a bailiff." },
          { t: "Real-property seizure", d: "When the debtor owns property: controlled procedure, publication, sale and distribution." },
          { t: "International claims", d: "Recognition of foreign judgments, coordination with correspondents, cross-border recovery." },
        ],
        process: [
          { t: "Claim audit", d: "Amount, maturity, evidence, debtor's solvency: we verify the claim is recoverable before incurring costs." },
          { t: "Amicable phase", d: "Formal notice and negotiation: a significant share of files settle at this stage, without trial." },
          { t: "Enforceable title", d: "Payment order or action on the merits: we obtain the title that allows forced enforcement." },
          { t: "Forced enforcement", d: "Garnishment, seizure, property seizure: we direct the bailiff and follow every step until payment." },
        ],
        watch: {
          title: "Good to know",
          body: "A judgment won is only worth what is enforced. Garnishment in the hands of a bank or third party is often the fastest weapon — provided the attachable sums are identified at the right moment.",
        },
        faq: [
          { q: "How do I recover an unpaid invoice in Tunisia?", a: "Formal notice first, then a payment order if the claim is undisputed, then enforcement (garnishment, seizure). The firm chooses the fastest route according to the debtor." },
          { q: "What is garnishment?", a: "A procedure that freezes, in the hands of a third party (bank, employer, client), the sums owed to the debtor, to allocate them to the creditor. It is one of the most effective enforcement routes." },
          { q: "Can I recover without going to court?", a: "Often yes: a lawyer's formal notice and a negotiated, secured payment plan settle many files. Litigation is only started if necessary." },
          { q: "What are the fees for debt collection?", a: "Agreed in writing: a flat fee for the amicable phase, then a regulated success fee on sums actually recovered, within the limits permitted by professional rules." },
        ],
      },
      ar: {
        title: "المحامي الاستاذ ابراهيم المجدوب — محامي استخلاص الديون بسوسة",
        description: "المحامي الاستاذ ابراهيم المجدوب، محامٍ في استخلاص الديون بسوسة: الأمر بالأداء، العقلة التوقيفية، العقلة التنفيذية. حوّلوا سنداتكم إلى خلاص فعلي.",
        h1: "استخلاص الديون والتنفيذ بسوسة",
        lead: "فواتير غير مدفوعة، صكوك بدون رصيد، اعترافات بدين، أحكام غير منفذة: يحوّل المكتب ديونكم وسنداتكم إلى خلاص فعلي، عبر الاستخلاص الرضائي ثم طرق التنفيذ.",
        scope: [
          { t: "التنبيه بالوفاء", d: "رسالة محامٍ، تفاوض، جدول خلاص مؤمّن: الحصول على الدفع بدون محاكمة متى أمكن." },
          { t: "الأمر بالأداء", d: "إجراء سريع بناءً على عريضة للديون الثابتة: الحصول على سند تنفيذي بكلفة أقل." },
          { t: "العقلة التوقيفية", d: "تجميد المبالغ المحمولة لدى الغير (بنك، حريف، مكتري): أنجع الطرق ضد المدينين الموسرين." },
          { t: "العقلة التنفيذية والبيع", d: "حجز المنقولات، البيع بالمزاد، توزيع الثمن: التنفيذ بواسطة عدل منفذ." },
          { t: "العقلة العقارية", d: "حين يملك المدين عقارًا: إجراءات مؤطرة، إشهار، بيع وتوزيع." },
          { t: "الديون الدولية", d: "تذييل الأحكام الأجنبية بالصيغة التنفيذية، التنسيق مع مراسلين، الاستخلاص عبر الحدود." },
        ],
        process: [
          { t: "تدقيق الدين", d: "المبلغ، الحلول، الإثبات، ملاءة المدين: نتحقق من قابلية الدين للاستخلاص قبل تكبد المصاريف." },
          { t: "المرحلة الرضائية", d: "التنبيه بالوفاء والتفاوض: جزء هام من الملفات يُحل في هذه المرحلة بدون محاكمة." },
          { t: "السند التنفيذي", d: "أمر بالأداء أو دعوى في الأصل: نحصل على السند الذي يتيح التنفيذ الجبري." },
          { t: "التنفيذ الجبري", d: "عقلة توقيفية، عقلة تنفيذية، عقلة عقارية: نوجه العدل المنفذ ونتابع كل مرحلة إلى غاية الخلاص." },
        ],
        watch: {
          title: "جدير بالذكر",
          body: "الحكم المكتسب لا قيمة له إلا إذا نُفّذ. العقلة التوقيفية لدى بنك أو لدى الغير غالبًا أسرع سلاح — بشرط تحديد المبالغ القابلة للعقل في الوقت المناسب.",
        },
        faq: [
          { q: "كيف أستخلص فاتورة غير مدفوعة في تونس؟", a: "التنبيه بالوفاء أولًا، ثم الأمر بالأداء إذا كان الدين ثابتًا، ثم طرق التنفيذ (العقلة التوقيفية، العقلة التنفيذية). يختار المكتب أسرع مسار حسب المدين." },
          { q: "ما هي العقلة التوقيفية؟", a: "إجراء يجمّد لدى الغير (بنك، مؤجر، حريف) المبالغ المستحقة للمدين، لتخصيصها للدائن. وهي من أنجع طرق التنفيذ." },
          { q: "هل يمكن الاستخلاص بدون محاكمة؟", a: "غالبًا نعم: تنبيه بالوفاء من محامٍ وتفاوض على جدول خلاص مؤمّن يحلان العديد من الملفات. لا يُلجأ للتقاضي إلا عند الضرورة." },
          { q: "ما هي أتعاب الاستخلاص؟", a: "تُحدد كتابيًا: مبلغ جزافي للمرحلة الرضائية، ثم أتعاب نتائج على المبالغ المستخلصة فعليًا، في الحدود التي تسمح بها التراتيب." },
        ],
      },
    },
  },

  {
    id: "douanier",
    num: "07",
    slug: { fr: "droit-douanier", en: "customs-law", ar: "customs-law" },
    name: { fr: "Droit douanier", en: "Customs law", ar: "القانون الديواني" },
    tagline: {
      fr: "Contrôles, contentieux du dédouanement, infractions douanières et transactions avec l'administration des douanes.",
      en: "Inspections, clearance disputes, customs offences and settlements with the customs administration.",
      ar: "المراقبة، نزاعات التخليص، المخالفات الديوانية والصلح مع إدارة الديوانة.",
    },
    content: {
      fr: {
        title: "Maître Brahim Majdoub — Avocat droit douanier à Sousse",
        description: "Maître Brahim Majdoub, avocat en droit douanier à Sousse : contrôles, retenue, contrebande, fausses déclarations, transactions avec la douane. Protégez vos marchandises.",
        h1: "Avocat en droit douanier à Sousse",
        lead: "Contrôle à l'import ou à l'export, marchandises retenues, procès-verbal de douane, infraction de change : le cabinet intervient en urgence pour protéger vos marchandises, votre entreprise et votre liberté, et négocier avec l'administration des douanes.",
        scope: [
          { t: "Contrôles & retenue douanière", d: "Assistance dès le contrôle : vérification du procès-verbal, des délais et des droits de la personne retenue." },
          { t: "Contrebande & fausses déclarations", d: "Espèce, valeur, origine : contestation de la qualification, de la preuve et de l'évaluation des marchandises." },
          { t: "Transaction douanière", d: "Négociation d'un règlement transactionnel avec l'administration : réduction des amendes, mainlevée des saisies." },
          { t: "Saisies & confiscations", d: "Demandes de mainlevée, restitution des marchandises ou des véhicules, contestation des confiscations." },
          { t: "Régimes particuliers & admission temporaire", d: "Véhicules des Tunisiens à l'étranger, régimes suspensifs, entrepôts : mise en conformité et contentieux." },
          { t: "Infractions de change", d: "Transferts, devises, comptes : défense pénale et régularisation auprès des autorités compétentes." },
        ],
        process: [
          { t: "Urgence", d: "Un contrôle ou une retenue douanière se joue dans les premières heures : le cabinet vérifie immédiatement la régularité du procès-verbal et la situation de la personne et des marchandises." },
          { t: "Analyse du dossier douanier", d: "Nature de l'infraction reprochée, valeur des marchandises, droits et taxes en jeu, antécédents : chaque élément pèse sur la stratégie." },
          { t: "Transaction ou contentieux", d: "Selon le dossier, nous négocions une transaction avec l'administration des douanes ou nous contestons devant la juridiction compétente." },
          { t: "Mainlevée & suivi", d: "Restitution des marchandises saisies, exécution de la transaction, suivi jusqu'à la clôture complète du dossier." },
        ],
        watch: {
          title: "Bon à savoir",
          body: "Le Code des douanes tunisien ouvre la voie à la transaction : un accord avec l'administration peut éteindre les poursuites et réduire fortement les amendes. Encore faut-il la négocier au bon moment, avant que le dossier ne se cristallise.",
        },
        faq: [
          { q: "Mes marchandises sont retenues par la douane, que faire ?", a: "Contactez le cabinet avec le procès-verbal ou la référence du contrôle : nous analysons l'infraction reprochée, les délais, et engageons la démarche de mainlevée ou de transaction la plus rapide." },
          { q: "Qu'est-ce que la transaction douanière ?", a: "C'est un accord avec l'administration des douanes qui peut mettre fin aux poursuites moyennant le paiement d'une somme négociée. Bien menée, elle réduit les amendes et accélère la restitution des marchandises." },
          { q: "Un véhicule en admission temporaire peut-il être saisi ?", a: "Oui, en cas d'irrégularité du régime (délai dépassé, usage non conforme). Le cabinet examine la régularisation possible et conteste les saisies irrégulières." },
          { q: "Quels honoraires pour un dossier douanier ?", a: "Ils sont convenus par écrit dès le départ, selon l'urgence et la complexité : forfait pour la phase de transaction, ou honoraires détaillés pour le contentieux. Devis remis avant toute intervention." },
        ],
      },
      en: {
        title: "Brahim Majdoub — Customs Lawyer in Sousse, Tunisia",
        description: "Brahim Majdoub, customs law attorney in Sousse: inspections, detention, smuggling, false declarations and customs settlements. Protect your goods and your business.",
        h1: "Customs law attorney in Sousse",
        lead: "Import or export inspection, detained goods, customs report, exchange-control offence: the firm acts urgently to protect your goods, your business and your liberty, and negotiates with the Tunisian customs administration.",
        scope: [
          { t: "Inspections & customs detention", d: "Assistance from the first inspection: review of the report, time limits and the rights of the detained person." },
          { t: "Smuggling & false declarations", d: "Description, value, origin: challenging the classification, the evidence and the valuation of the goods." },
          { t: "Customs settlement", d: "Negotiating a settlement with the administration: reduced fines, release of seized goods." },
          { t: "Seizures & confiscation", d: "Applications for release, return of goods or vehicles, challenging confiscation orders." },
          { t: "Special regimes & temporary admission", d: "Vehicles of Tunisians abroad, suspensive regimes, warehouses: compliance and disputes." },
          { t: "Exchange-control offences", d: "Transfers, currency, accounts: criminal defence and regularisation before the competent authorities." },
        ],
        process: [
          { t: "Urgency", d: "A customs inspection or detention is decided in the first hours: the firm immediately checks the lawfulness of the report and the situation of the person and the goods." },
          { t: "Analysis of the customs file", d: "Alleged offence, value of the goods, duties and taxes at stake, history: every element shapes the strategy." },
          { t: "Settlement or litigation", d: "Depending on the file, we negotiate a settlement with the customs administration or challenge the case before the competent court." },
          { t: "Release & follow-up", d: "Return of seized goods, performance of the settlement, follow-up until the file is fully closed." },
        ],
        watch: {
          title: "Good to know",
          body: "The Tunisian Customs Code allows settlement: an agreement with the administration can end proceedings and substantially reduce fines. It must be negotiated at the right moment, before the case hardens.",
        },
        faq: [
          { q: "Customs is holding my goods — what can I do?", a: "Contact the firm with the report or inspection reference: we analyse the alleged offence and the deadlines, and start the fastest route to release or settlement." },
          { q: "What is a customs settlement?", a: "An agreement with the customs administration that can end proceedings in exchange for a negotiated payment. Properly handled, it reduces fines and speeds up the return of goods." },
          { q: "Can a temporarily admitted vehicle be seized?", a: "Yes, if the regime is breached (overstayed deadline, non-compliant use). The firm examines possible regularisation and challenges unlawful seizures." },
          { q: "What are the fees for a customs case?", a: "Agreed in writing from the start, according to urgency and complexity: a flat fee for the settlement phase, or detailed fees for litigation. A quote is given before any work." },
        ],
      },
      ar: {
        title: "المحامي الاستاذ ابراهيم المجدوب — محامي قضايا ديوانية بسوسة",
        description: "المحامي الاستاذ ابراهيم المجدوب، محامٍ في القانون الديواني بسوسة: المراقبة، الاحتفاظ الديواني، التهريب، الصلح الديواني واسترجاع المحجوزات.",
        h1: "محامي قضايا ديوانية بسوسة",
        lead: "مراقبة عند التوريد أو التصدير، بضاعة محجوزة، محضر ديواني، مخالفة صرف: يتدخل المكتب بشكل عاجل لحماية بضاعتكم ومؤسستكم وحريتكم، والتفاوض مع إدارة الديوانة.",
        scope: [
          { t: "المراقبة والاحتفاظ الديواني", d: "المؤازرة منذ المراقبة الأولى: فحص المحضر والآجال وحقوق الشخص المحتفظ به." },
          { t: "التهريب والتصريحات المغالطة", d: "النوع والقيمة والمنشأ: الطعن في التكييف وفي الإثبات وفي تقييم البضاعة." },
          { t: "الصلح الديواني", d: "التفاوض على صلح مع الإدارة: التخفيض في الخطايا ورفع الحجز عن البضاعة." },
          { t: "الحجوزات والمصادرة", d: "مطالب رفع الحجز، استرجاع البضاعة أو السيارات، والطعن في قرارات المصادرة." },
          { t: "الأنظمة الخصوصية والإدخال المؤقت", d: "سيارات التونسيين بالخارج، الأنظمة الموقوفة، المستودعات: التسوية والنزاعات." },
          { t: "مخالفات الصرف", d: "التحويلات والعملة والحسابات: الدفاع الجزائي والتسوية لدى السلطات المختصة." },
        ],
        process: [
          { t: "الاستعجال", d: "المراقبة أو الاحتفاظ الديواني يُحسم في الساعات الأولى: يفحص المكتب فورًا سلامة المحضر ووضعية الشخص والبضاعة." },
          { t: "دراسة الملف الديواني", d: "المخالفة المنسوبة، قيمة البضاعة، المعاليم والأداءات المطروحة، السوابق: كل عنصر يؤثر في الاستراتيجية." },
          { t: "الصلح أو التقاضي", d: "حسب الملف، نتفاوض على صلح مع إدارة الديوانة أو نطعن أمام المحكمة المختصة." },
          { t: "رفع الحجز والمتابعة", d: "استرجاع البضاعة المحجوزة، تنفيذ الصلح، والمتابعة إلى غاية الغلق النهائي للملف." },
        ],
        watch: {
          title: "جدير بالذكر",
          body: "تتيح مجلة الديوانة التونسية طريق الصلح: اتفاق مع الإدارة يمكن أن ينهي التتبعات ويخفف الخطايا بشكل كبير. لكن يجب التفاوض في الوقت المناسب قبل أن يتجمد الملف.",
        },
        faq: [
          { q: "الديوانة تحتجز بضاعتي، ماذا أفعل؟", a: "اتصل بالمكتب ومعك المحضر أو مرجع المراقبة: نحلل المخالفة المنسوبة والآجال، ونباشر أسرع مسار لرفع الحجز أو للصلح." },
          { q: "ما هو الصلح الديواني؟", a: "هو اتفاق مع إدارة الديوانة يمكن أن ينهي التتبعات مقابل مبلغ متفاوض عليه. إذا أُحسن تسييره، يخفف الخطايا ويسرّع استرجاع البضاعة." },
          { q: "هل يمكن حجز سيارة في نظام الإدخال المؤقت؟", a: "نعم، عند الإخلال بالنظام (تجاوز الأجل، استعمال غير مطابق). يدرس المكتب إمكانية التسوية ويطعن في الحجوزات غير القانونية." },
          { q: "ما هي أتعاب الملف الديواني؟", a: "تُحدد كتابيًا منذ البداية حسب الاستعجال والتعقيد: مبلغ جزافي لمرحلة الصلح، أو أتعاب مفصلة للتقاضي. تُسلّم التقديرات قبل أي تدخل." },
        ],
      },
    },
  },
];

/* ------------------------------------------------------------------ */
/*  HUB « SERVICES » (une page par langue)                              */
/* ------------------------------------------------------------------ */

export const HUB = {
  content: {
    fr: {
      title: "Maître Brahim Majdoub — Services juridiques à Sousse",
      description: "Maître Brahim Majdoub, avocat au Barreau de Sousse : sept domaines d'expertise, du droit pénal au recouvrement. Honoraires convenus par écrit, réponse sous 24 h.",
      h1: "Nos services juridiques à Sousse",
      lead: "Sept domaines d'expertise, une même méthode : écoute, étude écrite, honoraires convenus, compte rendu après chaque audience. Choisissez votre domaine pour découvrir comment le cabinet vous accompagne.",
      faq: [
        { q: "Quel domaine correspond à mon problème ?", a: "Décrivez votre situation via le formulaire ou par téléphone : le cabinet qualifie les faits et vous oriente vers le domaine compétent, même si votre dossier en croise plusieurs." },
        { q: "Comment sont fixés les honoraires ?", a: "Ils sont convenus par écrit dès le départ : forfait, taux horaire ou honoraire de résultat dans les limites permises. Une estimation est remise avant toute intervention." },
        { q: "Le cabinet intervient-il en dehors de Sousse ?", a: "Oui : le cabinet plaide devant les juridictions de Sousse et intervient dans toute la Tunisie, ainsi qu'à distance pour les clients résidant à l'étranger." },
      ],
    },
    en: {
      title: "Brahim Majdoub — Legal Services in Sousse, Tunisia",
      description: "Brahim Majdoub, attorney at the Sousse Bar: seven practice areas, from criminal defence to debt recovery. Fees agreed in writing, reply within 24 hours.",
      h1: "Our legal services in Sousse",
      lead: "Seven practice areas, one method: listening, written analysis, agreed fees, a report after every hearing. Choose your area to see how the firm can help.",
      faq: [
        { q: "Which area matches my problem?", a: "Describe your situation through the form or by phone: the firm assesses the facts and points you to the right area, even if your case spans several." },
        { q: "How are fees set?", a: "Agreed in writing from the start: flat fee, hourly rate or a success fee within permitted limits. An estimate is given before any work." },
        { q: "Does the firm work outside Sousse?", a: "Yes: the firm pleads before the courts of Sousse and acts across Tunisia, and remotely for clients living abroad." },
      ],
    },
    ar: {
      title: "المحامي الاستاذ ابراهيم المجدوب — خدمات قانونية بسوسة",
      description: "المحامي الاستاذ ابراهيم المجدوب، محامٍ لدى الاستئناف بسوسة: سبعة مجالات خبرة من القضايا الجزائية إلى استخلاص الديون. أتعاب كتابية وجواب في 24 ساعة.",
      h1: "خدماتنا القانونية بسوسة",
      lead: "سبعة مجالات خبرة، ومنهج واحد: الإصغاء، دراسة مكتوبة، أتعاب متفق عليها، وتقرير بعد كل جلسة. اختاروا مجالكم لاكتشاف كيف يرافقكم المكتب.",
      faq: [
        { q: "أي مجال يوافق مشكلتي؟", a: "صفوا وضعيتكم عبر الاستمارة أو بالهاتف: يكيف المكتب الوقائع ويوجهكم إلى المجال المختص، حتى لو تداخل ملفكم مع عدة مجالات." },
        { q: "كيف تُحدد الأتعاب؟", a: "تُحدد كتابيًا منذ البداية: مبلغ جزافي، احتساب بالساعة، أو أتعاب نتائج في الحدود المسموح بها. تُسلّم التقديرات قبل أي تدخل." },
        { q: "هل يتدخل المكتب خارج سوسة؟", a: "نعم: يترافع المكتب أمام محاكم سوسة ويتدخل في كامل تونس، وعن بُعد للحرفاء المقيمين بالخارج." },
      ],
    },
  },
};

/* Helpers de chemins -------------------------------------------------- */

export function langBase(lang) {
  return LANG_META[lang].home;
}

export function hubPath(lang) {
  return `${langBase(lang)}services/`;
}

export function servicePath(service, lang) {
  return `${hubPath(lang)}${service.slug[lang]}/`;
}

/* Ordre d'affichage des « autres domaines » : on retire la page courante. */
export function otherServices(currentId) {
  return SERVICES.filter((s) => s.id !== currentId);
}
