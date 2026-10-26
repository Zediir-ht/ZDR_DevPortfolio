/**
 * LocalPage.jsx
 * -------------
 * Page locale /creation-site-internet-<ville> — contenu dans src/data/villes.js.
 * Reprend le design de la page Tarifs (fond sombre, header et footer minimaux).
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { VILLES } from '../../data/villes';
import styles from '../Tarifs/Tarifs.module.css';
import local from './LocalPage.module.css';

const SITE = 'https://zdrdev.fr';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function jsonLd(v) {
  const url = `${SITE}/${v.slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Création de site internet à ${v.ville}`,
      serviceType: 'Création de site internet',
      url,
      provider: { '@id': `${SITE}/#business` },
      areaServed: [v.ville, ...v.communes].map((name) => ({ '@type': 'City', name })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: `Création de site internet à ${v.ville}`, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: v.faq.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ];
}

export default function LocalPage({ ville: v }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    const originalTitle = document.title;
    document.title = v.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc?.getAttribute('content');
    metaDesc?.setAttribute('content', v.description);

    const canonical = document.querySelector('link[rel="canonical"]');
    const originalCanonical = canonical?.getAttribute('href');
    canonical?.setAttribute('href', `${SITE}/${v.slug}`);

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) metaDesc.setAttribute('content', originalDesc);
      if (canonical && originalCanonical) canonical.setAttribute('href', originalCanonical);
    };
  }, [v]);

  const autres = VILLES.filter((o) => o.slug !== v.slug);

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(v)) }}
      />

      {/* ── Header minimal ── */}
      <header className={styles.pageHeader}>
        <Link to="/" className={styles.backLink}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Accueil
        </Link>
        <span className={styles.headerLogo}>
          <span className={styles.logoAccent}>Zdr</span>_DEV
        </span>
      </header>

      <main className={styles.main}>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className="container">
            <nav aria-label="Fil d'Ariane" className={local.breadcrumb}>
              <Link to="/">Accueil</Link>
              <span aria-hidden="true">/</span>
              <span>{v.ville}</span>
            </nav>
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {v.h1}<br />
              <span className={styles.accent}>{v.h1Accent}</span>
            </motion.h1>
            <div className={local.intro}>
              {v.intro.map((p) => <p key={p}>{p}</p>)}
            </div>
            <a href="/#contact" className={`${styles.finalCtaBtn} ${local.heroCta}`}>
              Demander un devis gratuit
            </a>
          </div>
        </section>

        {/* ── Publics ── */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{v.publicTitle}</h2>
              <p className={styles.sectionSub}>Un site pensé pour votre activité et votre clientèle.</p>
            </div>
            <motion.div
              className={`${styles.raisonsGrid} ${local.publicsGrid}`}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {v.publics.map((p, i) => (
                <motion.div key={p.title} className={styles.raisonCard} variants={fadeUp} custom={i}>
                  <h3 className={styles.raisonTitle}>{p.title}</h3>
                  <p className={styles.raisonDesc}>{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Approche + communes ── */}
        <section className={`${styles.section} ${styles.sectionLight}`}>
          <div className={`container ${local.split}`}>
            <div>
              <h2 className={styles.sectionTitle}>{v.approcheTitle}</h2>
              <p className={local.prose}>{v.approche}</p>
              <p className={local.prose}>
                Chaque offre comprend un design sur mesure, l'optimisation pour Google et le mobile,
                la mise en ligne et une formation à la prise en main.{' '}
                <Link to="/tarifs" className={local.inlineLink}>Voir les offres et tarifs</Link>.
              </p>
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Zone d'intervention</h2>
              <p className={local.prose}>{v.ville} et les communes voisines :</p>
              <ul className={local.communes}>
                {[v.ville, ...v.communes].map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQ locale ── */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Questions fréquentes à {v.ville}</h2>
            </div>
            <div className={local.faq}>
              {v.faq.map(({ q, a }) => (
                <details key={q} className={local.faqItem}>
                  <summary className={local.faqQuestion}>
                    <h3>{q}</h3>
                    <span className={local.chevron} aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </summary>
                  <p className={local.faqAnswer}>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA + autres villes ── */}
        <section className={`${styles.section} ${styles.sectionCta}`}>
          <div className="container">
            <div className={styles.finalCta}>
              <h2 className={styles.finalCtaTitle}>Votre site internet à {v.ville}</h2>
              <p className={styles.finalCtaSub}>
                Premier échange gratuit, devis sous 24h, aucun engagement.
              </p>
              <a href="/#contact" className={styles.finalCtaBtn}>
                Me contacter
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <nav aria-label="Autres zones d'intervention" className={local.autres}>
              <p>J'interviens aussi à :</p>
              <ul>
                {autres.map((o) => (
                  <li key={o.slug}>
                    <Link to={`/${o.slug}`}>Création de site internet à {o.ville}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

      </main>

      {/* ── Footer minimal ── */}
      <footer className={styles.pageFooter}>
        <div className="container">
          <p className={styles.footerText}>
            © {new Date().getFullYear()} <span className={styles.logoAccent}>Zdr</span>_DEV · Développeur web à Rodez, Aveyron
          </p>
          <Link to="/" className={styles.footerBack}>← Retour à l'accueil</Link>
        </div>
      </footer>
    </div>
  );
}
