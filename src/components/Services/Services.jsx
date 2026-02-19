/**
 * Services.jsx
 * ------------
 * Section tarifs / services : cartes interactives
 * avec les prestations proposées et prix.
 */
import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './Services.module.css';

/* Données de l'offre */
const SERVICE = {
  id: 'creation',
  name: 'Création de site web',
  price: '690 €',
  maintenance: '+39 €/mois',
  maintenanceLabel: 'maintenance',
  description:
    'Un site professionnel, responsive et optimisé SEO qui reflète votre image et convertit vos visiteurs en clients. Maintenance incluse pour un site toujours à jour et sécurisé.',
  features: [
    'Design moderne sur mesure',
    'Responsive mobile & tablette',
    'Optimisation SEO de base',
    'Formulaire de contact sécurisé',
    'Hébergement & mise en ligne',
    'Formation à la prise en main',
    'Mises à jour régulières',
    'Sauvegardes automatiques',
    'Surveillance sécurité',
    'Support par email',
    'Corrections de bugs',
    'Rapport mensuel',
  ],
};

/* Animation des cartes */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Services() {
  return (
    <SectionWrapper id="services">
      {/* En-tête */}
      <div className={styles.header}>
        <span className={styles.label}>Services & Tarifs</span>
        <h2 className={styles.title}>
          Des offres <span className={styles.accent}>claires et transparentes</span>
        </h2>
        <p className={styles.subtitle}>
          Pas de surprise, pas de frais cachés. Choisissez la formule qui vous correspond.
        </p>
      </div>

      {/* Carte unique */}
      <div className={styles.grid}>
        <motion.div
          className={`${styles.card} ${styles.cardHighlight}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          custom={0}
          whileHover={{ y: -6 }}
        >
          <h3 className={styles.cardName}>{SERVICE.name}</h3>

          <div className={styles.pricing}>
            <span className={styles.price}>{SERVICE.price}</span>
            <span className={styles.period}>{SERVICE.maintenance}</span>
            <span className={styles.periodLabel}>{SERVICE.maintenanceLabel}</span>
          </div>

          <p className={styles.desc}>
            Un site professionnel, responsive et optimisé SEO qui reflète votre image et{' '}
            <span className={styles.accent}>convertit vos visiteurs en clients</span>.
            {' '}Maintenance optionnelle pour un site toujours à jour et sécurisé.
          </p>

          <ul className={styles.features}>
            {SERVICE.features.map((f) => (
              <li key={f}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <a href="#contact" className={styles.cardBtn}>
            Choisir cette offre
          </a>
        </motion.div>
      </div>

      {/* Bloc référencement */}
      <motion.div
        className={styles.seoBlock}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        custom={1}
      >
        <h3 className={styles.seoTitle}>
          Pourquoi un bon <span className={styles.accent}>référencement</span> est essentiel ?
        </h3>
        <p className={styles.seoText}>
          93% des expériences en ligne commencent par un moteur de recherche. Un site bien référencé, c'est un site qui travaille pour vous 24h/24.
        </p>
        <div className={styles.seoGrid}>
          <div className={styles.seoItem}>
            <svg className={styles.seoIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <h4>Visibilité accrue</h4>
            <p>Apparaissez en première page de Google et soyez trouvé par les clients qui recherchent vos services.</p>
          </div>
          <div className={styles.seoItem}>
            <svg className={styles.seoIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <h4>Nouveaux clients</h4>
            <p>Attirez des prospects qualifiés sans dépenser en publicité. Le SEO génère un trafic gratuit et durable.</p>
          </div>
          <div className={styles.seoItem}>
            <svg className={styles.seoIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M12 20V10" />
              <path d="M18 20V4" />
              <path d="M6 20v-4" />
            </svg>
            <h4>Croissance continue</h4>
            <p>Un bon référencement s'améliore avec le temps. Plus votre site est en ligne, plus il gagne en autorité.</p>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
