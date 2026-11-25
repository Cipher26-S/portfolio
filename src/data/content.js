// Fichiers de public/, préfixés par la base du site (/ en local, /portfolio/ sur GitHub Pages)
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const meta = {
  title: 'Salif Sawadogo — Développeur Full-Stack & Mobile',
  description:
    'Portfolio de Sawadogo Kiswendsida Salif — Développeur Full-Stack & Mobile (React, Node.js, Flutter, Python) basé à Koudougou, Burkina Faso.',
};

export const profile = {
  name: 'Sawadogo Kiswendsida Salif',
  shortName: 'Salif Sawadogo',
  initials: 'SKS',
  photo: asset('profile.webp'),
  title: 'Développeur Full-Stack & Mobile',
  subtitle: 'React · Node.js · Flutter · Python',
  location: 'Koudougou, Burkina Faso',
  email: 'salifswd6@gmail.com',
  phone: '+226 07 03 62 83',
  phoneHref: 'tel:+22607036283',
  whatsapp: 'https://wa.me/22607036283',
  github: 'https://github.com/Cipher26-S',
  linkedin: 'https://www.linkedin.com/in/salif-sawadogo-348081375',
  cvPath: asset('cv.pdf'),
  tagline: 'Je tisse du code qui sert les gens.',
  lead:
    "Je conçois des applications web et mobiles complètes, de l'API à l'interface, avec une attention particulière à la qualité du code, aux tests et aux besoins réels des utilisateurs au Burkina Faso.",
  bio: "Diplômé d'une Licence en Informatique (Programmation et Entrepreneuriat) du Burkina Institute of Technology, je développe des applications sur toute la chaîne : API REST avec Node.js ou FastAPI, bases PostgreSQL et MongoDB, interfaces React et applications mobiles Flutter. Deux stages chez Telia Informatique m'ont fait découvrir le développement en entreprise. Comme un tisserand assemble ses fils, j'assemble API, données et interfaces pour qu'elles tiennent ensemble — et servent vraiment.",
  facts: [
    { label: 'Diplôme', value: 'Licence en Informatique — BIT, 2026' },
    { label: 'Localisation', value: 'Koudougou, Burkina Faso' },
    { label: 'Langues', value: 'Français, Mooré, Anglais (intermédiaire)' },
    { label: 'Spécialités', value: 'Web, mobile, API et intégration IA' },
  ],
  stats: [
    { value: '5', label: 'Projets publiés' },
    { value: '38', label: 'Tests automatisés' },
    { value: '2', label: 'Stages en entreprise' },
  ],
};

export const skills = [
  {
    category: 'Langages',
    items: ['JavaScript', 'Dart', 'Python', 'Java', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    category: 'Frameworks',
    items: ['React', 'Flutter', 'Node.js', 'Express', 'FastAPI', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    category: 'Données',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'Sequelize', 'Firebase'],
  },
  {
    category: 'Outils & pratiques',
    items: ['Git', 'GitHub', 'Docker', 'Postman', 'Swagger', 'Tests automatisés', 'Figma', 'Odoo'],
  },
];

export const services = [
  {
    title: 'Développement Web',
    description: "Applications web modernes et responsives avec React, du prototype à la mise en production.",
    icon: 'code',
  },
  {
    title: 'Développement Mobile',
    description: 'Applications Flutter multiplateformes, pensées pour la performance et une expérience fluide.',
    icon: 'mobile',
  },
  {
    title: 'API & Back-end',
    description: 'API REST sécurisées (Node.js/Express, FastAPI), authentification JWT, rôles et documentation.',
    icon: 'server',
  },
  {
    title: 'Intégration IA',
    description: "Intégration de modèles de langage dans des produits utiles, avec validation des réponses et tests.",
    icon: 'ai',
  },
];

// category : 'web' | 'mobile' | 'ia' — sert aux filtres de la section Projets
// images : kind 'phone' (capture mobile) ou 'desktop' (capture navigateur)
// colors : palette du « pagne » propre à chaque projet
export const projects = [
  {
    name: 'FasoConnect',
    colors: ['#b8432a', '#d9922b', '#1d2a5e', '#f4ead8', '#121a40'],
    tag: "Projet de fin d'études",
    categories: ['web', 'mobile'],
    featured: true,
    logo: asset('projects/fasoconnect-logo.webp'),
    description:
      'Plateforme qui met en relation des clients avec des artisans qualifiés (électriciens, plombiers, mécaniciens…) au Burkina Faso : recherche, demandes de service, suivi des interventions et avis.',
    highlights: [
      'API REST Express 5 + Prisma documentée avec Swagger, 19 tests automatisés',
      'Application mobile Flutter avec parcours distincts client et artisan',
      "Tableau de bord d'administration React avec statistiques et export CSV",
      'Cycle de vie complet des demandes : attribution, acceptation, intervention, avis',
    ],
    tech: ['Flutter', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT'],
    images: [
      { src: asset('projects/fasoconnect-home.webp'), alt: "FasoConnect — écran d'accueil mobile", kind: 'phone' },
      { src: asset('projects/fasoconnect-request.webp'), alt: 'FasoConnect — nouvelle demande de service', kind: 'phone' },
    ],
    github: 'https://github.com/Cipher26-S/fasoconnect',
    demo: '',
  },
  {
    name: 'CV AI Assistant',
    colors: ['#1d2a5e', '#2f6b4f', '#d9922b', '#f4ead8', '#121a40'],
    tag: 'Intelligence artificielle',
    categories: ['web', 'ia'],
    description:
      "Génère un CV et une lettre de motivation professionnels à partir d'un formulaire, avec aperçu A4 en direct et export PDF. L'IA reformule le texte sans jamais inventer de fait.",
    highlights: [
      'Backend FastAPI, validation Pydantic, compatible Groq/OpenAI',
      "Coordonnées jamais envoyées au fournisseur d'IA",
      '10 tests pytest avec une IA simulée injectée',
    ],
    tech: ['Python', 'FastAPI', 'Pydantic', 'LLM', 'JavaScript'],
    images: [{ src: asset('projects/cv-ai-assistant.webp'), alt: 'CV AI Assistant — CV généré et aperçu A4', kind: 'desktop' }],
    github: 'https://github.com/Cipher26-S/cv-ai-assistant',
    demo: '',
  },
  {
    name: 'TontiFaso Mobile',
    colors: ['#2f6b4f', '#d9922b', '#f4ead8', '#1c1712', '#b8432a'],
    tag: 'Application mobile · Fintech',
    categories: ['mobile'],
    description:
      "Application des membres d'une tontine / microfinance : solde, épargne, prêts et remboursements en FCFA. Un mode démo intégré permet de l'essayer sans serveur.",
    highlights: [
      'Gestion d’état avec Provider, session par cookie',
      'Calcul des intérêts et du reste à payer, détection des retards',
      'Tests du parcours complet en mode démo',
    ],
    tech: ['Flutter', 'Dart', 'Provider', 'REST API'],
    images: [
      { src: asset('projects/tontifaso-dashboard.webp'), alt: 'TontiFaso — tableau de bord du membre', kind: 'phone' },
      { src: asset('projects/tontifaso-login.webp'), alt: 'TontiFaso — connexion avec mode démo', kind: 'phone' },
    ],
    github: 'https://github.com/Cipher26-S/tontifaso-mobile',
    demo: '',
  },
  {
    name: 'Restaurant Reservation System',
    colors: ['#b8432a', '#1c1712', '#d9922b', '#e7d6b8', '#2f6b4f'],
    tag: 'Application web',
    categories: ['web'],
    description:
      'Les clients consultent les restaurants et leurs menus puis réservent une table ; les restaurateurs gèrent leurs plats et confirment les réservations.',
    highlights: [
      'Rôles client / restaurateur avec contrôle de propriété côté API',
      'Réservations : validation des dates, confirmation, annulation',
      'Testée de bout en bout sur PostgreSQL',
    ],
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'Bootstrap'],
    images: [
      { src: asset('projects/restaurant-reservations.webp'), alt: 'Restaurant Reservation — réservations côté restaurateur', kind: 'desktop' },
    ],
    github: 'https://github.com/Cipher26-S/restaurant-reservation-system',
    demo: '',
  },
  {
    name: 'Delivery Driver Tracker',
    colors: ['#121a40', '#d9922b', '#1d2a5e', '#e7d6b8', '#b8432a'],
    tag: 'Application mobile',
    categories: ['mobile'],
    description:
      'Suivi des livreurs : authentification par rôles, progression du statut des livraisons, partage de la position GPS et espace administrateur.',
    highlights: [
      'Géolocalisation avec geolocator et index géospatial MongoDB',
      'API sécurisée : un livreur n’accède qu’à ses livraisons',
      'Création des comptes réservée aux administrateurs',
    ],
    tech: ['Flutter', 'Node.js', 'Express', 'MongoDB'],
    images: [
      { src: asset('projects/delivery-list.webp'), alt: 'Delivery Driver Tracker — liste des livraisons', kind: 'phone' },
      { src: asset('projects/delivery-login.webp'), alt: 'Delivery Driver Tracker — connexion', kind: 'phone' },
    ],
    github: 'https://github.com/Cipher26-S/delivery-driver-tracker',
    demo: '',
  },
];

// Texte de l'atelier 3D (section qui précède les réalisations)
export const atelier = {
  label: "L'atelier : les projets en 3D",
  kicker: "L'atelier",
  titleStart: 'Entrez dans',
  titleEm: "l'atelier.",
  hint: 'Faites défiler, ou utilisez les flèches ← → : chaque projet se décroche du mur.',
  loading: "Ouverture de l'atelier…",
  details: 'Voir le détail',
  code: 'Code source',
  outroStart: 'Votre projet,',
  outroEm: 'le prochain pagne',
  outroEnd: 'sur le mur.',
  emptyFrame: ['Votre projet', 'ici.'],
  cta: 'Parlons-en',
  dotsLabel: 'Aller à un projet',
  prev: 'Projet précédent',
  next: 'Projet suivant',
  start: 'Entrer',
  end: 'Fin',
  skip: "Passer l'atelier",
};

export const projectFilters = [
  { id: 'all', label: 'Tous' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ia', label: 'IA' },
];

export const experience = [
  {
    period: '08/2024 — 10/2024 puis 07/2025 — 10/2025',
    title: 'Stagiaire en informatique et développement',
    place: 'Telia Informatique, Burkina Faso',
    description:
      "Participation à des projets de solutions numériques de gestion, configuration du progiciel Odoo, assistance technique et maintenance, découverte du workflow de développement en entreprise.",
  },
];

export const education = [
  {
    period: '2023 — 2026 · Diplôme obtenu',
    title: 'Licence en Informatique — Programmation et Entrepreneuriat',
    place: 'Burkina Institute of Technology (BIT), Koudougou',
    description: "Développement logiciel, algorithmique, bases de données, génie logiciel et entrepreneuriat. Projet de fin d'études : FasoConnect.",
  },
  {
    period: 'Avant 2023',
    title: 'Baccalauréat Série D',
    place: 'Burkina Faso',
    description: 'Filière scientifique, spécialité sciences expérimentales et mathématiques.',
  },
];

export const navLinks = [
  { label: 'À propos', href: '#about' },
  { label: 'Réalisations', href: '#projects' },
  { label: 'Parcours', href: '#journey' },
  { label: 'Services', href: '#offers' },
  { label: 'Tissez votre pagne', href: '#loom' },
  { label: 'Contact', href: '#contact' },
];

// « Travaillons ensemble » : ce que je propose aux clients.
// Le tarif et le lien Upwork se modifient ici (laisser upwork vide masque le bouton).
export const offers = {
  kicker: 'Travaillons ensemble',
  titleStart: 'Votre projet,',
  titleEm: 'tissé sur mesure',
  titleEnd: '.',
  lead: "Petite entreprise, association ou startup : je prends en charge votre projet de l'idée à la mise en ligne, et je reste joignable après la livraison.",
  available: 'Disponible pour de nouvelles missions',
  rate: 'À partir de 15 $/h, ou forfait sur devis',
  upwork: '',
  upworkLabel: 'Mon profil Upwork',
  contactLabel: 'Décrire mon projet',
  exampleLabel: 'Exemple :',
  items: [
    {
      title: 'Site web pour votre activité',
      description: 'Site vitrine, réservation en ligne ou petite boutique, rapide sur mobile et facile à trouver sur Google.',
      points: ['Design adapté à votre image', 'Responsive et bien référencé', 'Mise en ligne incluse'],
      example: 'Restaurant Reservation System',
    },
    {
      title: 'Application mobile',
      description: "Application Android et iOS en Flutter, reliée à votre propre API, pensée pour les réseaux lents.",
      points: ['Une seule base de code', 'Parcours par type d’utilisateur', 'Mode démo pour la présenter'],
      example: 'TontiFaso Mobile',
    },
    {
      title: 'API et back-office',
      description: 'Le moteur de votre service : API sécurisée, base de données et tableau de bord pour gérer votre activité.',
      points: ['Authentification et rôles', 'Documentation Swagger', 'Tests automatisés'],
      example: 'FasoConnect',
    },
    {
      title: 'Intégration IA',
      description: "Un assistant ou un outil qui utilise un modèle de langage pour vous faire gagner du temps, sans inventer de faits.",
      points: ['Réponses contrôlées', 'Données sensibles protégées', 'Coûts maîtrisés'],
      example: 'CV AI Assistant',
    },
  ],
  stepsTitle: 'Comment ça se passe',
  steps: [
    { title: 'On échange', text: 'Vous me décrivez votre besoin, je pose les bonnes questions.' },
    { title: 'Je propose', text: 'Un devis clair, un planning et une première maquette.' },
    { title: 'Je développe', text: 'Des versions régulières que vous testez au fur et à mesure.' },
    { title: 'On met en ligne', text: 'Déploiement, prise en main, puis suivi si besoin.' },
  ],
};

// Petits textes de l'interface
export const ui = {
  langSwitch: 'EN',
  langSwitchLabel: 'Switch to English',
  menuOpen: 'Ouvrir le menu',
  menuClose: 'Fermer le menu',
  skipToProjects: 'Aller aux réalisations',
  navLabel: 'Navigation principale',
  cv: 'CV',
  cvFile: 'CV-Sawadogo-Salif.pdf',
  hero: {
    taglineBefore: 'Je',
    taglineWord: 'tisse',
    taglineAfter: 'du code',
    taglineLine2: 'qui sert les gens.',
    seeWork: 'Voir les réalisations',
    downloadCv: 'Télécharger le CV',
    portraitAlt: 'Portrait de',
    labelTop: 'Diplômé',
    labelMain: 'Licence en Informatique',
    labelBottom: 'BIT · 2026',
  },
  about: {
    kicker: "Le fil de l'histoire",
    titleStart: 'Un tisserand',
    titleEm: 'de logiciels',
    titleEnd: ', né à Koudougou.',
  },
  projects: {
    kicker: 'Réalisations',
    titleStart: 'Chaque projet,',
    titleEm: 'un pagne',
    titleEnd: 'différent.',
    filtersLabel: 'Filtrer les projets',
    code: 'Code source',
    demo: 'Démo',
    logoAlt: 'Logo',
    techLabel: 'Technologies',
  },
  skills: {
    kicker: 'Les fils de mon métier',
    titleStart: 'Ce que je sais',
    titleEm: 'assembler',
    titleEnd: '.',
  },
  journey: {
    kicker: 'Parcours',
    titleStart: 'Le fil,',
    titleEm: 'nœud après nœud',
    titleEnd: '.',
    experience: 'Expérience',
    education: 'Formation',
  },
  loom: {
    kicker: 'Le métier à tisser',
    titleStart: 'Tissez',
    titleEm: 'votre',
    titleEnd: 'pagne.',
    lead: 'Écrivez un prénom : le vôtre, celui de votre mère, de votre grand-père, de votre enfant. Le code le transforme en un motif unique, inspiré du Faso Dan Fani. Le même prénom donne toujours le même pagne.',
    field: 'Un prénom',
    placeholder: 'Écrivez un prénom…',
    colors: 'Couleurs',
    palettes: ['Indigo', 'Terre', 'Karité', 'Nuit'],
    download: 'Télécharger mon pagne',
    surprise: 'Surprenez-moi',
    caption: 'Pagne de',
    ariaFor: 'Pagne tissé pour',
    fileName: 'pagne',
  },
  contact: {
    kicker: 'Contact',
    title: 'Parlons-en',
    copy: "Copier l'adresse",
    copied: 'Adresse copiée',
    name: 'Votre nom',
    email: 'Votre email',
    message: 'Votre message',
    sendEmail: 'Envoyer par email',
    sendWhatsapp: 'Envoyer sur WhatsApp',
    subject: 'Message du portfolio',
    whatsappIntro: 'Bonjour Salif, je suis',
  },
  footer: {
    made: 'Tissé à Koudougou, Burkina Faso, avec React.',
    top: 'Revenir en haut ↑',
  },
};
