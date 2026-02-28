/**
 * Services.jsx
 * ------------
 * Section services & tarifs — fond sombre (noir charbon).
 * 4 services max + offres à prix fixe + abonnements.
 * INTÉGRITÉ COMMERCIALE : aucun tarif / service modifié.
 */
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './Services.module.css';

/* ── 4 services principaux ── */
const SERVICES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Site vitrine artisan',
    problem: 'Vos clients ne vous trouvent pas en ligne et passent chez le concurrent.',
    benefit: 'Un site professionnel qui reflète la qualité de votre travail et rassure vos prospects.',
    impact: 'Vous apparaissez sur Google quand un client cherche votre métier dans votre ville.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    title: 'Site restaurant',
    problem: 'Vos clients veulent voir la carte et réserver, mais votre présence web est inexistante.',
    benefit: 'Un site appétissant avec menu, photos et réservation qui donne envie de pousser la porte.',
    impact: 'Plus de réservations, moins d\'appels inutiles, une image à la hauteur de votre cuisine.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    ),
    title: 'E-commerce local',
    problem: 'Vous voulez vendre vos produits du terroir au-delà de votre comptoir.',
    benefit: 'Une boutique en ligne simple pour vendre vos produits locaux partout en France.',
    impact: 'Un canal de vente qui travaille 24h/24, même quand la boutique est fermée.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Maintenance web',
    problem: 'Votre site existe mais il est lent, pas à jour et vous ne savez pas le gérer.',
    benefit: 'Un site toujours rapide, sécurisé et à jour sans que vous ayez à y penser.',
    impact: 'Zéro stress technique : concentrez-vous sur votre métier, je m\'occupe du reste.',
  },
];

/* ── Offres à prix fixe (création) — NE PAS MODIFIER ── */
const OFFERS = [
  {
    id: 'essentiel',
    name: "L'Essentiel Local",
    type: 'One-Page',
    price: 600,
    description:
      'Vous êtes artisan, commerçant ou restaurateur et vous avez besoin d\'être trouvé rapidement sur Google ? Cette offre est faite pour vous.',
    features: [
      'Site one-page professionnel',
      'Design moderne sur mesure',
      'Adapté mobile & tablette',
      'Fiche Google Maps intégrée',
      'Formulaire de contact sécurisé',
      'Vitesse de chargement optimale',
      'Hébergement & mise en ligne',
      'Formation prise en main (1h)',
    ],
    highlight: false,
  },
  {
    id: 'premium',
    name: 'La Vitrine Premium',
    type: 'Multi-pages',
    price: 900,
    description:
      'Vous voulez un site complet qui travaille pour vous 24h/24 ? Plusieurs pages, galerie photo, référencement avancé et autonomie totale de gestion.',
    features: [
      'Site multi-pages sur mesure',
      'Référencement SEO avancé',
      'Galerie photo professionnelle',
      'Autonomie de gestion (CMS)',
      'Blog ou page actualités',
      'Formulaire de devis avancé',
      'Optimisation Google Maps',
      'Statistiques de visites',
      'Support prioritaire 30 jours',
    ],
    highlight: true,
    badge: '★ Recommandé',
  },
];

/* ── Abonnements mensuels — NE PAS MODIFIER ── */
const SUBSCRIPTIONS = [
  {
    id: 'tranquillite',
    name: 'Tranquillité',
    price: 29,
    period: '€/mois',
    description: 'Le minimum pour garder votre site en ligne, à jour et sécurisé.',
    features: [
      'Hébergement & nom de domaine',
      'Certificat SSL (HTTPS)',
      'Mises à jour de sécurité',
      'Sauvegardes automatiques',
      'Support par email',
    ],
    highlight: false,
  },
  {
    id: 'serenite',
    name: 'Sérénité',
    price: 39,
    period: '€/mois',
    description: 'Votre site reste performant et évolue avec votre activité.',
    features: [
      'Tout Tranquillité inclus',
      'Modifications mineures (2/mois)',
      'Rapport mensuel de performance',
      'Surveillance disponibilité 24/7',
      'Corrections de bugs incluses',
      'Support email & téléphone',
    ],
    highlight: true,
    badge: '★ Populaire',
  },
  {
    id: 'croissance',
    name: 'Croissance',
    price: 49,
    period: '€/mois',
    description: 'Un vrai partenariat pour développer votre visibilité en continu.',
    features: [
      'Tout Sérénité inclus',
      'Modifications illimitées',
      'Stratégie SEO locale mensuelle',
      'Optimisation Google Maps continue',
      'Réseaux sociaux : lien & intégration',
      'Support prioritaire 7j/7',
      'Refonte visuelle annuelle offerte',
    ],
    highlight: false,
  },
];

/* ── Animations ── */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ── Compteur animé pour les prix ── */
function AnimatedPrice({ target, suffix = ' €' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, target]);

  return <span ref={ref}>{value}{suffix}</span>;
}

export default function Services() {
  return (
    <SectionWrapper id="services" dark>
      {/* ═══ En-tête services ═══ */}
      <div className={styles.header}>
        <motion.span
          className={styles.label}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Services
        </motion.span>
        <motion.h2
          className={styles.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Ce que je fais <span className={styles.accent}>pour vous</span>
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Des solutions digitales pensées pour les réalités des professionnels
          de l'Aveyron.
        </motion.p>
      </div>

      {/* Grille 4 services */}
      <div className={styles.servicesGrid}>
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            className={styles.serviceCard}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <div className={styles.serviceIcon}>{service.icon}</div>
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <div className={styles.serviceDetails}>
              <div className={styles.serviceDetail}>
                <span className={styles.detailLabel}>Le problème</span>
                <p>{service.problem}</p>
              </div>
              <div className={styles.serviceDetail}>
                <span className={styles.detailLabel}>Le bénéfice</span>
                <p>{service.benefit}</p>
              </div>
              <div className={styles.serviceDetail}>
                <span className={styles.detailLabel}>L'impact</span>
                <p>{service.impact}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ═══ En-tête tarifs ═══ */}
      <div className={styles.headerSub}>
        <motion.span
          className={styles.label}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Tarifs
        </motion.span>
        <motion.h2
          className={styles.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Des offres <span className={styles.accent}>claires et sans surprise</span>
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Pas de jargon, pas de frais cachés. Choisissez la formule adaptée
          à votre activité.
        </motion.p>
      </div>

      {/* Offres création */}
      <div className={styles.gridTwo}>
        {OFFERS.map((offer, i) => (
          <motion.div
            key={offer.id}
            className={`${styles.card} ${offer.highlight ? styles.cardHighlight : ''}`}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            {offer.badge && (
              <span className={styles.cardBadge}>{offer.badge}</span>
            )}
            <span className={styles.cardType}>{offer.type}</span>
            <h3 className={styles.cardName}>{offer.name}</h3>
            <div className={styles.pricing}>
              <span className={styles.price}>
                <AnimatedPrice target={offer.price} />
              </span>
            </div>
            <p className={styles.desc}>{offer.description}</p>
            <ul className={styles.features}>
              {offer.features.map((f) => (
                <li key={f}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-or)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#contact" className={styles.cardBtn}>
              Demander un devis gratuit
            </a>
          </motion.div>
        ))}
      </div>

      {/* ═══ En-tête abonnements ═══ */}
      <div className={styles.headerSub}>
        <motion.span
          className={styles.label}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Abonnements
        </motion.span>
        <motion.h2
          className={styles.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Votre site <span className={styles.accent}>toujours au top</span>
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Un abonnement mensuel sans engagement pour que votre site reste rapide,
          sécurisé et visible sur Google.
        </motion.p>
      </div>

      {/* Abonnements */}
      <div className={styles.gridThree}>
        {SUBSCRIPTIONS.map((sub, i) => (
          <motion.div
            key={sub.id}
            className={`${styles.card} ${sub.highlight ? styles.cardHighlight : ''}`}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            {sub.badge && (
              <span className={styles.cardBadge}>{sub.badge}</span>
            )}
            <h3 className={styles.cardName}>{sub.name}</h3>
            <div className={styles.pricing}>
              <span className={styles.price}>
                <AnimatedPrice target={sub.price} suffix="" />
              </span>
              <span className={styles.period}>{sub.period}</span>
            </div>
            <p className={styles.engagement}>Sans engagement · annulable à tout moment</p>
            <p className={styles.desc}>{sub.description}</p>
            <ul className={styles.features}>
              {sub.features.map((f) => (
                <li key={f}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-or)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#contact" className={styles.cardBtn}>
              Choisir cet abonnement
            </a>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
