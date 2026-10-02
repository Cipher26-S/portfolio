# Portfolio — Salif Sawadogo

**En ligne : https://cipher26-s.github.io/portfolio/**

Portfolio personnel de **Sawadogo Kiswendsida Salif**, développeur Full-Stack & Mobile basé à Koudougou (Burkina Faso).

## Concept

Une identité inspirée du **Faso Dan Fani**, le pagne tissé du Burkina Faso : coton crème, indigo, ocre, terre rouge, vert karité, et des bandes tissées qui se « tissent » à l'écran au défilement.

- **Réalisations** : chaque projet a son propre motif de pagne, généré à partir de son nom
- **Le métier à tisser** : le visiteur écrit un prénom et obtient un pagne unique, téléchargeable — le même prénom donne toujours le même motif
- **Le fil** : une barre de progression en fil tissé le long de la page
- Parcours, compétences, contact et CV téléchargeable

Tout le contenu se modifie dans [`src/data/content.js`](src/data/content.js) ; les motifs sont générés par [`src/lib/weave.js`](src/lib/weave.js).

## CV

La source du CV est [`cv/cv.html`](cv/cv.html). Pour régénérer le PDF : l'ouvrir dans Chrome, Imprimer, « Enregistrer au format PDF » (A4, marges Aucune, graphiques d'arrière-plan cochés), puis remplacer `public/cv.pdf`.

## Stack

React 19, Vite, CSS sans framework, Canvas 2D, React Icons.

## Lancer en local

```bash
npm install
npm run dev
```

## Déploiement

Chaque push sur `main` recompile le site et le publie sur GitHub Pages (workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), branche `gh-pages`).

Pour un hébergement à la racine d'un domaine (Netlify, Vercel) : `BASE_PATH=/ npm run build`.
