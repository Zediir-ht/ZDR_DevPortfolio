/**
 * PrixResume.jsx
 * --------------
 * Section résumée des offres tarifaires — homepage.
 * 3 packs minimalistes + CTA vers /tarifs.
 */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './PrixResume.module.css';

const PACKS = [
  {
    name: "L'Essentiel",
    price: 'À partir de 490 €',
    desc: 'Site one-page · Mobile First · SEO Maps · Contact',
  },
  {
    name: "L'Atelier",
    price: 'À partir de 890 €',
    desc: '5 pages · SEO local avancé · Galerie · Gestion autonome',
  },
  {
    name: 'Le Terroir',
    price: 'À partir de 1 490 €',
    desc: 'Menu/Catalogue · Réservation · Click & Collect · Design premium',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function PrixResume() {
  return (
    <SectionWrapper id="solutions" dark>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.label}>Nos solutions</span>
        <h2 className={styles.title}>
          Des solutions adaptées<br />à votre activité
        </h2>
        <p className={styles.subtitle}>
          Artisans, commerçants, restaurateurs de l'Aveyron.
        </p>
      </motion.div>

      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {PACKS.map((pack) => (
          <motion.div
            key={pack.name}
            className={styles.card}
            variants={itemVariants}
          >
            <h3 className={styles.packName}>{pack.name}</h3>
            <p className={styles.packPrice}>{pack.price}</p>
            <p className={styles.packDesc}>{pack.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className={styles.ctaWrapper}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <Link to="/tarifs" className={styles.cta}>
          Découvrir le détail des offres
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        <p className={styles.note}>Paiement en 3× sans frais · Devis gratuit sous 24h</p>
      </motion.div>
    </SectionWrapper>
  );
}
