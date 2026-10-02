// Fichiers de public/, préfixés par la base du site (/ en local, /portfolio/ sur GitHub Pages)
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

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
  github: 'https://github.com/Cipher26-S',
  linkedin: 'https://www.linkedin.com/in/salif-sawadogo-348081375',
  cvPath: asset('cv.pdf'),
  availability: 'Disponible pour un stage ou un premier emploi',
  lead:
    "Je conçois des applications web et mobiles complètes, de l'API à l'interface, avec une attention particulière à la qualité du code, aux tests et aux besoins réels des utilisateurs au Burkina Faso.",
  bio: "Étudiant en troisième année de Licence Informatique (Programmation et Entrepreneuriat) au Burkina Institute of Technology, je développe des applications sur toute la chaîne : API REST avec Node.js ou FastAPI, bases PostgreSQL et MongoDB, interfaces React et applications mobiles Flutter. Deux stages chez Telia Informatique m'ont fait découvrir le développement en entreprise. Mon projet de fin d'études, FasoConnect, met en relation des clients avec des artisans qualifiés.",
  facts: [
    { label: 'Formation', value: 'Licence Informatique — BIT, 2026' },
    { label: 'Localisation', value: 'Koudougou, Burkina Faso' },
    { label: 'Langues', value: 'Français, Mooré, Anglais (intermédiaire)' },
    { label: 'Recherche', value: 'Stage ou premier emploi en développement' },
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
export const projects = [
  {
    name: 'FasoConnect',
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
    period: '2023 — 2026',
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
  { label: 'Accueil', href: '#home' },
  { label: 'À propos', href: '#about' },
  { label: 'Projets', href: '#projects' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Parcours', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];
