export const profile = {
  name: 'Sawadogo Kiswendsida Salif',
  initials: 'SKS',
  title: 'Développeur Full-Stack & Développeur Mobile',
  subtitle: 'Flutter · React · Node.js',
  location: 'Koudougou, Burkina Faso',
  email: 'salifswd6@gmail.com',
  phone: '+226 07 03 62 83',
  phoneHref: 'tel:+22607036283',
  github: 'https://github.com/Cipher26-S',
  linkedin: 'https://www.linkedin.com/in/salif-sawadogo-348081375',
  cvPath: '/cv.pdf',
  bio: "Je suis Sawadogo Kiswendsida Salif, étudiant en troisième année d'Informatique option Programmation au Burkina Institute of Technology (BIT). Passionné par le développement web et mobile, je conçois des applications modernes qui répondent à des besoins concrets, avec un intérêt particulier pour les solutions numériques ayant un impact social au Burkina Faso. Mon objectif est de développer des logiciels performants, intuitifs et innovants tout en continuant à approfondir mes compétences en développement Full-Stack.",
  stats: [
    { value: '3+', label: 'Projets réalisés' },
    { value: '10+', label: 'Technologies maîtrisées' },
    { value: '3ᵉ', label: 'Année de Licence Info.' },
  ],
};

export const skills = [
  {
    category: 'Langages',
    items: ['JavaScript', 'Dart', 'Java', 'Python', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    category: 'Frameworks',
    items: ['React', 'Flutter', 'Node.js', 'Express.js'],
  },
  {
    category: 'Bases de données',
    items: ['PostgreSQL', 'MongoDB', 'Firebase'],
  },
  {
    category: 'Outils',
    items: ['Git', 'GitHub', 'VS Code', 'Android Studio', 'Postman', 'Docker', 'Figma', 'Photoshop'],
  },
];

export const services = [
  {
    title: 'Développement Web',
    description: "Sites et applications web modernes, rapides et responsives, du prototype à la mise en production.",
    icon: 'code',
  },
  {
    title: 'Développement Mobile',
    description: 'Applications mobiles multiplateformes avec Flutter, pensées pour la performance et une expérience fluide.',
    icon: 'mobile',
  },
  {
    title: 'API & Back-end',
    description: 'Conception et développement d’API REST sécurisées avec Node.js, Express et authentification JWT.',
    icon: 'server',
  },
  {
    title: 'Base de données',
    description: 'Modélisation et gestion de bases de données relationnelles et NoSQL adaptées à chaque projet.',
    icon: 'database',
  },
];

export const projects = [
  {
    name: 'FasoConnect',
    tag: 'Projet de fin d’études',
    description:
      'Plateforme intelligente mettant en relation les clients avec des artisans qualifiés (électriciens, plombiers, mécaniciens, etc.) au Burkina Faso. Facilite la recherche d’artisans, la prise de contact et la gestion des demandes de services.',
    tech: ['Flutter', 'React', 'Node.js', 'Express', 'PostgreSQL', 'JWT', 'REST API'],
    github: 'https://github.com/Cipher26-S/fasoconnect',
    demo: '',
    gradient: 'var(--gradient-1)',
  },
  {
    name: 'Restaurant Reservation System',
    tag: 'Application web',
    description:
      'Application web de réservation de restaurants permettant aux clients de consulter les établissements, réserver une table et gérer leurs réservations via une interface moderne.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize'],
    github: 'https://github.com/Cipher26-S/restaurant-reservation-system',
    demo: '',
    gradient: 'var(--gradient-2)',
  },
  {
    name: 'Delivery Driver Tracker',
    tag: 'Application mobile',
    description:
      'Application mobile de suivi des livreurs : authentification par rôles, partage de la position GPS et progression du statut des livraisons, avec un espace administrateur.',
    tech: ['Flutter', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/Cipher26-S/delivery-driver-tracker',
    demo: '',
    gradient: 'var(--gradient-3)',
  },
];

export const education = [
  {
    period: '2023 — 2026',
    title: 'Licence en Informatique — Option Programmation',
    place: 'Burkina Institute of Technology (BIT)',
    description: "Formation approfondie en développement logiciel, algorithmique, bases de données et génie logiciel.",
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
  { label: 'Compétences', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projets', href: '#projects' },
  { label: 'Formation', href: '#education' },
  { label: 'Contact', href: '#contact' },
];
