/**
 * Services.jsx
 * ------------
 * Section services — fond sombre (noir charbon).
 * 4 cartes de services uniquement. Les tarifs sont sur /tarifs.
 */
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './Services.module.css';

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
    impact: "Vous apparaissez sur Google quand un client cherche votre métier dans votre ville.",
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
    benefit: "Un site appétissant avec menu, photos et réservation qui donne envie de pousser la porte.",
    impact: "Plus de réservations, moins d'appels inutiles, une image à la hauteur de votre cuisine.",
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
    problem: "Vous voulez vendre vos produits du terroir au-delà de votre comptoir.",
    benefit: 'Une boutique en ligne simple pour vendre vos produits locaux partout en France.',
    impact: "Un canal de vente qui travaille 24h/24, même quand la boutique est fermée.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Maintenance web',
    problem: 'Votre site existe mais il est lent, pas à jour et vous ne savez pas le gérer.',
    benefit: "Un site toujours rapide, sécurisé et à jour sans que vous ayez à y penser.",
    impact: "Zéro stress technique : concentrez-vous sur votre métier, je m'occupe du reste.",
  },
];

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

export default function Services() {
  return (
    <SectionWrapper id="services" dark>
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
    </SectionWrapper>
  );
}
