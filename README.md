# 🚀 Zdr_DEV — Portfolio

Portfolio professionnel pour **Zdr_DEV**, développeur web full stack basé à Rodez (Aveyron).

## Stack technique

| Catégorie    | Technologie              |
| ------------ | ------------------------ |
| Framework    | React 18 + Vite 6       |
| Animations   | Framer Motion 11         |
| Styles       | CSS Modules              |
| Sécurité     | Sanitization XSS custom  |

## Lancer le projet

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en développement (http://localhost:3000)
npm run dev

# 3. Build production
npm run build

# 4. Preview du build
npm run preview
```

## Structure du projet

```
src/
├── main.jsx                      # Point d'entrée
├── App.jsx                       # Composant racine
├── styles/
│   └── global.css                # Variables CSS + reset
├── utils/
│   └── sanitize.js               # Sécurité : XSS, validation
└── components/
    ├── Header/                   # Navigation fixe responsive
    ├── Hero/                     # Section d'accueil
    ├── About/                    # Présentation & compétences
    ├── Services/                 # Tarifs & offres
    ├── Portfolio/                # Projets & réalisations
    ├── Contact/                  # Formulaire sécurisé
    ├── Footer/                   # Pied de page
    └── SectionWrapper/           # HOC animation scroll
```

## Personnalisation

- **Couleurs** : modifier les variables CSS dans `src/styles/global.css`
- **Contenu** : chaque section a ses données en haut du fichier JSX (tableaux `SERVICES`, `PROJECTS`, etc.)
- **Email** : dans `Contact.jsx` et `Footer.jsx`
- **API Contact** : décommenter le `fetch()` dans `Contact.jsx` et brancher votre endpoint

## SEO

- Balises meta complètes dans `index.html`
- Open Graph configuré
- HTML sémantique (`<main>`, `<section>`, `<nav>`, `<footer>`)
- Attributs `aria-*` pour l'accessibilité

## Licence

© 2026 Zdr_DEV — Tous droits réservés.
