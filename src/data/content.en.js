// English version of the site. Images, colours and links come from the French file,
// so only the text needs to be kept up to date here.
import * as fr from './content';

const byName = Object.fromEntries(fr.projects.map((p) => [p.name, p]));

export const meta = {
  title: 'Salif Sawadogo · Full-Stack & Mobile Developer',
  description:
    'Portfolio of Sawadogo Kiswendsida Salif, Full-Stack & Mobile developer (React, Node.js, Flutter, Python) based in Koudougou, Burkina Faso.',
};

export const profile = {
  ...fr.profile,
  title: 'Full-Stack & Mobile Developer',
  tagline: 'I weave code that serves people.',
  lead:
    'I build complete web and mobile applications, from the API to the interface, with real care for code quality, testing and what users in Burkina Faso actually need.',
  bio: 'I hold a Bachelor’s degree in Computer Science (Programming and Entrepreneurship) from the Burkina Institute of Technology, and I work across the whole stack: REST APIs with Node.js or FastAPI, PostgreSQL and MongoDB databases, React interfaces and Flutter mobile apps. Two internships at Telia Informatique showed me how software is built inside a company. Like a weaver joining threads, I bring APIs, data and interfaces together so they hold, and so they are genuinely useful.',
  facts: [
    { label: 'Degree', value: 'BSc in Computer Science, BIT, 2026' },
    { label: 'Location', value: 'Koudougou, Burkina Faso' },
    { label: 'Languages', value: 'French, Mooré, English (intermediate)' },
    { label: 'Focus', value: 'Web, mobile, APIs and AI integration' },
  ],
  stats: [
    { value: '5', label: 'Published projects' },
    { value: '38', label: 'Automated tests' },
    { value: '2', label: 'Internships' },
  ],
};

export const skills = [
  { ...fr.skills[0], category: 'Languages' },
  { ...fr.skills[1], category: 'Frameworks' },
  { ...fr.skills[2], category: 'Data' },
  {
    category: 'Tools & practices',
    items: ['Git', 'GitHub', 'Docker', 'Postman', 'Swagger', 'Automated testing', 'Figma', 'Odoo'],
  },
];

export const services = [
  {
    title: 'Web Development',
    description: 'Modern, responsive web applications with React, from prototype to production.',
    icon: 'code',
  },
  {
    title: 'Mobile Development',
    description: 'Cross-platform Flutter apps built for performance and a smooth experience.',
    icon: 'mobile',
  },
  {
    title: 'APIs & Back-end',
    description: 'Secure REST APIs (Node.js/Express, FastAPI), JWT authentication, roles and documentation.',
    icon: 'server',
  },
  {
    title: 'AI Integration',
    description: 'Language models built into useful products, with validated answers and tests.',
    icon: 'ai',
  },
];

const t = (name, fields) => ({ ...byName[name], ...fields });

export const projects = [
  t('FasoConnect', {
    tag: 'Final-year project',
    description:
      'A platform that connects customers with skilled tradespeople (electricians, plumbers, mechanics…) in Burkina Faso: search, service requests, job tracking and reviews.',
    highlights: [
      'Express 5 + Prisma REST API documented with Swagger, 19 automated tests',
      'Flutter mobile app with separate customer and tradesperson flows',
      'React admin dashboard with statistics and CSV export',
      'Full request lifecycle: assignment, acceptance, job, review',
    ],
    images: byName.FasoConnect.images.map((img, k) => ({
      ...img,
      alt: ['FasoConnect, mobile home screen', 'FasoConnect, new service request'][k],
    })),
  }),
  t('CV AI Assistant', {
    tag: 'Artificial intelligence',
    description:
      'Generates a professional CV and cover letter from a form, with a live A4 preview and PDF export. The AI rewrites the text but never makes up facts.',
    highlights: [
      'FastAPI backend, Pydantic validation, works with Groq or OpenAI',
      'Contact details are never sent to the AI provider',
      '10 pytest tests with an injected mock AI',
    ],
    images: [{ ...byName['CV AI Assistant'].images[0], alt: 'CV AI Assistant, generated CV and A4 preview' }],
  }),
  t('TontiFaso Mobile', {
    tag: 'Mobile app · Fintech',
    description:
      'App for members of a tontine or microfinance group: balance, savings, loans and repayments in CFA francs. A built-in demo mode lets you try it without a server.',
    highlights: [
      'State management with Provider, cookie-based session',
      'Interest and remaining balance calculations, late payment detection',
      'Full user journey tested in demo mode',
    ],
    images: byName['TontiFaso Mobile'].images.map((img, k) => ({
      ...img,
      alt: ['TontiFaso, member dashboard', 'TontiFaso, sign-in with demo mode'][k],
    })),
  }),
  t('Restaurant Reservation System', {
    tag: 'Web app',
    description:
      'Customers browse restaurants and their menus, then book a table; restaurant owners manage their dishes and confirm bookings.',
    highlights: [
      'Customer and owner roles with ownership checks in the API',
      'Bookings: date validation, confirmation, cancellation',
      'Tested end to end on PostgreSQL',
    ],
    images: [{ ...byName['Restaurant Reservation System'].images[0], alt: 'Restaurant Reservation, bookings from the owner side' }],
  }),
  t('Delivery Driver Tracker', {
    tag: 'Mobile app',
    description:
      'Delivery driver tracking: role-based sign-in, delivery status updates, GPS location sharing and an admin area.',
    highlights: [
      'Geolocation with geolocator and a MongoDB geospatial index',
      'Secure API: drivers can only see their own deliveries',
      'Only administrators can create accounts',
    ],
    images: byName['Delivery Driver Tracker'].images.map((img, k) => ({
      ...img,
      alt: ['Delivery Driver Tracker, delivery list', 'Delivery Driver Tracker, sign-in'][k],
    })),
  }),
];

export const atelier = {
  label: 'The workshop: projects in 3D',
  kicker: 'Work',
  titleStart: 'Step into',
  titleEm: 'the workshop.',
  hint: 'Scroll, or use the ← → keys: each project comes off the wall.',
  loading: 'Opening the workshop…',
  details: 'See details',
  code: 'Source code',
  outroStart: 'Your project,',
  outroEm: 'the next cloth',
  outroEnd: 'on the wall.',
  emptyFrame: ['Your project', 'here.'],
  cta: "Let's talk",
  dotsLabel: 'Go to a project',
  prev: 'Previous project',
  next: 'Next project',
  start: 'Enter',
  end: 'End',
  skip: 'Skip the workshop',
  sheet: {
    close: 'Close',
    prev: 'Previous',
    next: 'Next',
    code: 'Source code',
    demo: 'Live demo',
    tech: 'Technologies',
  },
};

export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ia', label: 'AI' },
];

export const experience = [
  {
    period: '08/2024 – 10/2024, then 07/2025 – 10/2025',
    title: 'IT and software development intern',
    place: 'Telia Informatique, Burkina Faso',
    description:
      'Worked on digital management solutions, configured the Odoo ERP, provided technical support and maintenance, and learned how development works inside a company.',
  },
];

export const education = [
  {
    period: '2023 – 2026 · Graduated',
    title: 'BSc in Computer Science, Programming and Entrepreneurship',
    place: 'Burkina Institute of Technology (BIT), Koudougou',
    description:
      'Software development, algorithms, databases, software engineering and entrepreneurship. Final-year project: FasoConnect.',
  },
  {
    period: 'Before 2023',
    title: 'High school diploma (Baccalauréat, Series D)',
    place: 'Burkina Faso',
    description: 'Science track, with a focus on experimental sciences and mathematics.',
  },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Services', href: '#offers' },
  { label: 'Weave your cloth', href: '#loom' },
  { label: 'Contact', href: '#contact' },
];

export const offers = {
  ...fr.offers,
  kicker: "Let's work together",
  titleStart: 'Your project,',
  titleEm: 'woven to measure',
  titleEnd: '.',
  lead: 'Small business, non-profit or startup: I take your project from idea to launch, and I stay reachable after delivery.',
  available: 'Available for new projects',
  rate: 'From $15/h, or a fixed price on quote',
  upworkLabel: 'My Upwork profile',
  contactLabel: 'Tell me about your project',
  exampleLabel: 'Example:',
  items: [
    {
      title: 'A website for your business',
      description: 'A showcase site, online booking or small shop that is fast on mobile and easy to find on Google.',
      points: ['Design that fits your brand', 'Responsive and SEO-friendly', 'Hosting setup included'],
      example: 'Restaurant Reservation System',
    },
    {
      title: 'Mobile app',
      description: 'An Android and iOS app built with Flutter, connected to your own API and designed for slow networks.',
      points: ['One codebase for both platforms', 'Flows for each type of user', 'Demo mode to show it off'],
      example: 'TontiFaso Mobile',
    },
    {
      title: 'API and back office',
      description: 'The engine behind your service: a secure API, a database and a dashboard to run your business.',
      points: ['Authentication and roles', 'Swagger documentation', 'Automated tests'],
      example: 'FasoConnect',
    },
    {
      title: 'AI integration',
      description: 'An assistant or tool powered by a language model that saves you time, without making things up.',
      points: ['Controlled answers', 'Sensitive data kept private', 'Predictable costs'],
      example: 'CV AI Assistant',
    },
  ],
  stepsTitle: 'How it works',
  steps: [
    { title: 'We talk', text: 'You describe what you need and I ask the right questions.' },
    { title: 'I propose', text: 'A clear quote, a timeline and a first mockup.' },
    { title: 'I build', text: 'Regular versions you can test along the way.' },
    { title: 'We launch', text: 'Deployment, a walkthrough, then support if you need it.' },
  ],
};

export const ui = {
  ...fr.ui,
  langSwitch: 'FR',
  langSwitchLabel: 'Passer en français',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  skipToProjects: 'Skip to projects',
  navLabel: 'Main navigation',
  hero: {
    ...fr.ui.hero,
    taglineBefore: 'I',
    taglineWord: 'weave',
    taglineAfter: 'code',
    taglineLine2: 'that serves people.',
    seeWork: 'See my work',
    downloadCv: 'Download CV (French)',
    portraitAlt: 'Portrait of',
    labelTop: 'Graduated',
    labelMain: 'BSc in Computer Science',
  },
  about: {
    kicker: 'The story so far',
    titleStart: 'A software',
    titleEm: 'weaver',
    titleEnd: ', born in Koudougou.',
  },
  projects: {
    kicker: 'Work',
    titleStart: 'Every project,',
    titleEm: 'a different',
    titleEnd: 'cloth.',
    filtersLabel: 'Filter projects',
    code: 'Source code',
    demo: 'Live demo',
    logoAlt: 'Logo of',
    techLabel: 'Technologies',
  },
  skills: {
    kicker: 'The threads of my craft',
    titleStart: 'What I know how to',
    titleEm: 'put together',
    titleEnd: '.',
  },
  journey: {
    kicker: 'Journey',
    titleStart: 'The thread,',
    titleEm: 'knot after knot',
    titleEnd: '.',
    experience: 'Experience',
    education: 'Education',
  },
  loom: {
    ...fr.ui.loom,
    kicker: 'The loom',
    titleStart: 'Weave',
    titleEm: 'your',
    titleEnd: 'cloth.',
    lead: 'Type a first name: yours, your mother’s, your grandfather’s, your child’s. The code turns it into a unique pattern inspired by Faso Dan Fani, the woven cloth of Burkina Faso. The same name always gives the same cloth.',
    field: 'A first name',
    placeholder: 'Type a first name…',
    colors: 'Colours',
    palettes: ['Indigo', 'Earth', 'Shea', 'Night'],
    download: 'Download my cloth',
    surprise: 'Surprise me',
    caption: 'Cloth for',
    ariaFor: 'Cloth woven for',
    fileName: 'cloth',
  },
  contact: {
    kicker: 'Contact',
    title: "Let's talk",
    copy: 'Copy address',
    copied: 'Address copied',
    name: 'Your name',
    email: 'Your email',
    message: 'Your message',
    sendEmail: 'Send by email',
    sendWhatsapp: 'Send on WhatsApp',
    subject: 'Message from the portfolio',
    whatsappIntro: 'Hello Salif, my name is',
  },
  footer: {
    made: 'Woven in Koudougou, Burkina Faso, with React.',
    top: 'Back to top ↑',
  },
};
