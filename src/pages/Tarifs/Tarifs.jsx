/**
 * Tarifs.jsx
 * ----------
 * Page dédiée /tarifs — offre tarifaire complète.
 * Design cohérent avec zdrdev.fr : sombre, épuré, identité occitane.
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Tarifs.module.css';

/* ── Packs création ── */
const PACKS = [
  {
    id: 'essentiel',
    name: "L'Essentiel",
    price: '490 €',
    type: 'One-Page',
    desc: 'Vous êtes artisan ou commerçant et avez besoin d\'être trouvé rapidement sur Google ? Cette offre est faite pour vous.',
    features: [
      'Site one-page professionnel',
      'Design mobile first sur mesure',
      'Fiche Google Maps intégrée',
      'Formulaire de contact sécurisé',
      'Vitesse de chargement optimale',
      'Hébergement & mise en ligne',
      'Formation prise en main (1h)',
    ],
  },
  {
    id: 'atelier',
    name: "L'Atelier",
    price: '890 €',
    type: 'Multi-pages',
    desc: 'Un site complet qui travaille pour vous 24h/24. Plusieurs pages, galerie photo, référencement avancé et autonomie de gestion.',
    features: [
      'Jusqu\'à 5 pages sur mesure',
      'SEO local avancé',
      'Galerie photo professionnelle',
      'Gestion autonome du contenu (CMS)',
      'Formulaire de devis avancé',
      'Statistiques de visites',
      'Support prioritaire 30 jours',
    ],
  },
  {
    id: 'terroir',
    name: 'Le Terroir',
    price: '1 490 €',
    type: 'Premium',
    desc: 'L\'offre complète pour les restaurants, épiceries fines et producteurs locaux souhaitant vendre et réserver en ligne.',
    features: [
      'Menu ou catalogue produits',
      'Système de réservation en ligne',
      'Click & Collect intégré',
      'Design premium sur mesure',
      'SEO local avancé + Google Maps',
      'Galerie & photos professionnelles',
      'Formation complète (2h)',
    ],
  },
];

/* ── Abonnements maintenance ── */
const ABOS = [
  {
    id: 'tranquillite',
    name: 'Formule Tranquillité',
    price: '19 €',
    period: '/mois',
    desc: 'Le minimum pour garder votre site en ligne, à jour et sécurisé, sans y penser.',
    features: [
      'Hébergement & nom de domaine',
      'Certificat SSL (HTTPS)',
      'Mises à jour de sécurité',
      'Sauvegardes automatiques',
      'Support par email',
    ],
  },
  {
    id: 'serenite',
    name: 'Formule Sérénité',
    price: '39 €',
    period: '/mois',
    desc: 'Votre site reste performant et évolue avec votre activité.',
    features: [
      'Tout Tranquillité inclus',
      '1h de modifications de contenu/mois',
      'Rapport mensuel de performance',
      'Surveillance disponibilité 24/7',
      'Corrections de bugs incluses',
      'Support email & téléphone',
    ],
  },
];

/* ── Raisons maintenance ── */
const RAISONS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Votre outil de travail',
    desc: 'Votre site est l\'outil de travail de votre activité. Comme tout outil, il doit être entretenu pour rester efficace.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: 'Révision régulière',
    desc: 'Je surveille les performances, les mises à jour de sécurité et les évolutions SEO pour que vous restiez visible.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Réactivité garantie',
    desc: 'Un problème sur votre site ? Je réponds sous 24h et je m\'en occupe. Votre activité n\'attend pas.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Un interlocuteur unique',
    desc: 'Je connais votre site de fond en comble. Pas besoin d\'expliquer à quelqu\'un de nouveau à chaque fois.',
  },
];

/* ── Animations ── */
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

/* ── Icône check ── */
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Tarifs() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Tarifs — ZDR Dev · Création de sites web Aveyron';
  }, []);

  return (
    <div className={styles.page}>
      {/* ── Header minimal ── */}
      <header className={styles.pageHeader}>
        <Link to="/" className={styles.backLink}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour
        </Link>
        <span className={styles.headerLogo}>
          <span className={styles.logoAccent}>Zdr</span>_DEV
        </span>
      </header>

      <main className={styles.main}>

        {/* ── Hero titre ── */}
        <section className={styles.hero}>
          <div className="container">
            <motion.span
              className={styles.heroLabel}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Offres &amp; tarifs
            </motion.span>
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Des offres claires,<br />
              <span className={styles.accent}>sans surprise</span>
            </motion.h1>
            <motion.p
              className={styles.heroSub}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Artisans, commerçants et restaurateurs de l'Aveyron —
              voici exactement ce que vous obtenez pour chaque offre.
            </motion.p>
          </div>
        </section>

        {/* ── Section 1 : Packs création ── */}
        <section className={styles.section}>
          <div className="container">
            <motion.div
              className={styles.sectionHeader}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h2 className={styles.sectionTitle}>Packs de création</h2>
              <p className={styles.sectionSub}>Votre site livré en 2 semaines, clé en main.</p>
            </motion.div>

            <motion.div
              className={styles.packsGrid}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {PACKS.map((pack, i) => (
                <motion.div
                  key={pack.id}
                  className={styles.packCard}
                  variants={fadeUp}
                  custom={i}
                >
                  <div className={styles.packTop}>
                    <span className={styles.packType}>{pack.type}</span>
                    <h3 className={styles.packName}>{pack.name}</h3>
                    <p className={styles.packPrice}>{pack.price}</p>
                    <p className={styles.packDesc}>{pack.desc}</p>
                  </div>
                  <ul className={styles.packFeatures}>
                    {pack.features.map((f) => (
                      <li key={f}>
                        <span className={styles.checkIcon}><CheckIcon /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/#contact" className={`${styles.packCta} ${pack.featured ? styles.packCtaFeatured : ''}`}>
                    Demander un devis
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Section 2 : Abonnements ── */}
        <section className={`${styles.section} ${styles.sectionLight}`}>
          <div className="container">
            <motion.div
              className={styles.sectionHeader}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h2 className={styles.sectionTitle}>Après la mise en ligne</h2>
              <p className={styles.sectionSub}>
                Votre site est livré. Je reste présent pour le maintenir performant et sécurisé.
              </p>
            </motion.div>

            <motion.div
              className={styles.abosGrid}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {ABOS.map((abo, i) => (
                <motion.div
                  key={abo.id}
                  className={styles.aboCard}
                  variants={fadeUp}
                  custom={i}
                >
                  <h3 className={styles.aboName}>{abo.name}</h3>
                  <p className={styles.aboPrice}>
                    {abo.price}<span className={styles.aboPeriod}>{abo.period}</span>
                  </p>
                  <p className={styles.aboDesc}>{abo.desc}</p>
                  <ul className={styles.aboFeatures}>
                    {abo.features.map((f) => (
                      <li key={f}>
                        <span className={styles.checkIcon}><CheckIcon /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Bandeau sans engagement */}
            <motion.div
              className={styles.sansBandeau}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Sans engagement — résiliable à tout moment, sans justification.</span>
            </motion.div>
          </div>
        </section>

        {/* ── Section 3 : Pourquoi me confier la maintenance ── */}
        <section className={styles.section}>
          <div className="container">
            <motion.div
              className={styles.sectionHeader}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h2 className={styles.sectionTitle}>Pourquoi me confier votre maintenance ?</h2>
            </motion.div>

            <motion.div
              className={styles.raisonsGrid}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {RAISONS.map((r, i) => (
                <motion.div key={r.title} className={styles.raisonCard} variants={fadeUp} custom={i}>
                  <span className={styles.raisonIcon}>{r.icon}</span>
                  <h3 className={styles.raisonTitle}>{r.title}</h3>
                  <p className={styles.raisonDesc}>{r.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Section 4 : Réassurance + CTA final ── */}
        <section className={`${styles.section} ${styles.sectionCta}`}>
          <div className="container">
            <motion.div
              className={styles.reassuranceWrapper}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p className={styles.reassLine} variants={fadeUp} custom={0}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Paiement en 3× sans frais disponible pour tous les projets.
              </motion.p>
              <motion.p className={`${styles.reassLine} ${styles.reassLegal}`} variants={fadeUp} custom={1}>
                TVA non applicable, art. 293 B du CGI.
              </motion.p>

              <motion.div className={styles.finalCta} variants={fadeUp} custom={2}>
                <h2 className={styles.finalCtaTitle}>
                  Discutons de votre projet
                </h2>
                <p className={styles.finalCtaSub}>
                  Premier échange gratuit, devis sous 24h, aucun engagement.
                </p>
                <a href="/#contact" className={styles.finalCtaBtn}>
                  Me contacter
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ── Footer minimal ── */}
      <footer className={styles.pageFooter}>
        <div className="container">
          <p className={styles.footerText}>
            © {new Date().getFullYear()} <span className={styles.logoAccent}>Zdr</span>_DEV · Rodez, Aveyron
          </p>
          <Link to="/" className={styles.footerBack}>← Retour à l'accueil</Link>
        </div>
      </footer>
    </div>
  );
}
