# 🚀 Zdr_DEV — Portfolio

Portfolio professionnel pour **Zdr_DEV** (Corentin Mayrand), développeur web indépendant basé à Rodez (Aveyron, 12). Site vitrine orienté conversion de clients locaux : artisans, commerçants, restaurateurs.

🔗 **En ligne** : [zdr-dev-portfolio.vercel.app](https://zdr-dev-portfolio.vercel.app)

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/Zediir-ht/ZDR_DevPortfolio.git
cd ZDR_DevPortfolio

# Installer les dépendances
npm install
```

## Usage

```bash
# Lancer en développement (http://localhost:3000)
npm run dev

# Build production
npm run build

# Preview du build
npm run preview

# Déployer sur Vercel
npx vercel --prod
```

## Stack technique

| Catégorie    | Technologie              |
| ------------ | ------------------------ |
| Framework    | React 18 + Vite 6       |
| Animations   | Framer Motion 11         |
| 3D / WebGL   | Three.js (LiquidEther)   |
| Styles       | CSS Modules              |
| Formulaire   | Formspree                |
| Sécurité     | Sanitization XSS custom  |
| Déploiement  | Vercel                   |

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

## API

Le formulaire de contact utilise [Formspree](https://formspree.io) comme backend. L'endpoint est configuré dans `Contact.jsx` :

```
POST https://formspree.io/f/xnjbzypl
Content-Type: application/json

{ "name": "...", "email": "...", "message": "..." }
```

Aucune autre API externe n'est utilisée.

## Licence

MIT — voir [LICENSE](LICENSE).
