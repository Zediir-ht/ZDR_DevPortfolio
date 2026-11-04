/**
 * prerender.js
 * ------------
 * Après `vite build` (client) et `vite build --ssr` (serveur), génère le HTML
 * statique de chaque route dans dist/ à partir du template dist/index.html.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { VILLES } from '../src/data/villes.js';
import { SITE_URL, DATE_MAJ } from '../src/data/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const ROUTES = [
  { url: '/', out: 'index.html' },
  {
    url: '/tarifs',
    out: 'tarifs.html',
    title: 'Tarifs Création Site Web Rodez & Aveyron | Zdr_DEV, Développeur Web',
    description: 'Création de site internet à Rodez et en Aveyron sur devis. Développeur web freelance pour artisans, commerçants et restaurateurs. Devis gratuit.',
    canonical: 'https://zdrdev.fr/tarifs',
  },
  ...VILLES.map((v) => ({
    url: `/${v.slug}`,
    out: `${v.slug}.html`,
    title: v.title,
    description: v.description,
    canonical: `https://zdrdev.fr/${v.slug}`,
  })),
  // Page 404 : l'hébergeur la sert avec le code 404 pour toute adresse inconnue
  {
    url: '/page-introuvable',
    out: '404.html',
    title: 'Page introuvable | Zdr_DEV',
    description: 'Cette page n\'existe pas. Retrouvez les offres et les zones d\'intervention de Zdr_DEV, développeur web à Rodez.',
    noindex: true,
  },
];

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function replaceOnce(html, pattern, replacement) {
  const found = typeof pattern === 'string' ? html.includes(pattern) : html.search(pattern) !== -1;
  if (!found) throw new Error(`Motif introuvable dans le template : ${pattern}`);
  return html.replace(pattern, replacement);
}

function applyHead(html, { title, description, canonical, noindex }) {
  if (title) {
    html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
    html = replaceOnce(html, /(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*(")/g, `$1${escapeAttr(title)}$2`);
  }
  if (description) {
    html = replaceOnce(html, /(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*(")/g, `$1${escapeAttr(description)}$2`);
  }
  if (canonical) {
    html = replaceOnce(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`);
    html = replaceOnce(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`);
  }
  if (noindex) {
    html = replaceOnce(html, '<meta name="robots" content="index, follow" />', '<meta name="robots" content="noindex, follow" />');
    html = replaceOnce(html, /\s*<link rel="canonical" href="[^"]*" \/>/, '');
    html = replaceOnce(html, /\s*<meta property="og:url" content="[^"]*" \/>/, '');
  }
  return html;
}

let template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');

// Les sections lazy ont leur CSS dans des chunks séparés : on les lie dès le
// HTML pour que le contenu pré-rendu s'affiche stylé avant le chargement du JS.
const cssLinks = fs.readdirSync(path.join(dist, 'assets'))
  .filter((f) => f.endsWith('.css') && !template.includes(`/assets/${f}`))
  .map((f) => `    <link rel="stylesheet" crossorigin href="/assets/${f}">`)
  .join('\n');
template = replaceOnce(template, '</head>', () => `${cssLinks}\n  </head>`);
const { render } = await import(pathToFileURL(ssrEntry).href);

for (const route of ROUTES) {
  const appHtml = await render(route.url);
  let html = applyHead(template, route);
  // L'image du hero n'existe que sur l'accueil : inutile de la précharger ailleurs
  if (route.url !== '/') {
    html = replaceOnce(html, /\s*<link rel="preload" as="image"[^>]*croix-occitane[^>]*\/>/, '');
  }
  html = replaceOnce(html, '<div id="root"></div>', () => `<div id="root">${appHtml}</div>`);

  const file = path.join(dist, route.out);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log(`prerender: ${route.url} → dist/${route.out} (${(html.length / 1024).toFixed(1)} ko)`);
}

// Sitemap généré avec la date de mise à jour de src/data/site.js (les pages noindex en sont exclues)
const urls = ROUTES.filter((r) => !r.noindex).map((r) => {
  const home = r.url === '/';
  return `  <url>
    <loc>${SITE_URL}${home ? '/' : r.url}</loc>
    <lastmod>${DATE_MAJ}</lastmod>
    <changefreq>${home ? 'weekly' : 'monthly'}</changefreq>
    <priority>${home ? '1.0' : '0.8'}</priority>
  </url>`;
});
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
);
console.log(`prerender: sitemap.xml (${urls.length} adresses, lastmod ${DATE_MAJ})`);

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
