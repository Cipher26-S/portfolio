# Portfolio — Salif Sawadogo

**En ligne : https://cipher26-s.github.io/portfolio/**

Portfolio personnel de **Sawadogo Kiswendsida Salif**, développeur Full-Stack & Mobile basé à Koudougou (Burkina Faso).

## Contenu

- Présentation, compétences et services
- Projets avec captures réelles, points forts et liens vers le code : FasoConnect, CV AI Assistant, TontiFaso Mobile, Restaurant Reservation System, Delivery Driver Tracker
- Parcours (expérience et formation), contact et CV téléchargeable

Tout le contenu se modifie dans [`src/data/content.js`](src/data/content.js) ; les images sont dans `public/`.

## Stack

React 19, Vite, Framer Motion, React Icons.

## Lancer en local

```bash
npm install
npm run dev
```

## Déploiement

Chaque push sur `main` recompile le site et le publie sur GitHub Pages (workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), branche `gh-pages`).

Pour un hébergement à la racine d'un domaine (Netlify, Vercel) : `BASE_PATH=/ npm run build`.
