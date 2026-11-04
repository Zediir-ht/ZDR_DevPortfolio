/**
 * PageSchema.jsx
 * --------------
 * JSON-LD propre à chaque page : WebPage avec dateModified, et BreadcrumbList
 * quand un fil d'Ariane est fourni. Les entités communes (LocalBusiness, Person,
 * WebSite) sont déclarées une fois pour toutes dans index.html.
 */
import { SITE_URL, DATE_MAJ } from '../../data/site';

export default function PageSchema({ path, name, description, breadcrumb }) {
  const url = `${SITE_URL}${path}`;
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: 'fr-FR',
      dateModified: DATE_MAJ,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#business` },
    },
  ];

  if (breadcrumb) {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumb.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
