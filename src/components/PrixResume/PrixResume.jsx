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
    price: 'Sur devis',
    desc: 'Un site d\'une page, lisible sur mobile, avec votre fiche Google Maps et un formulaire de contact.',
  },
  {
    name: "L'Atelier",
    price: 'Sur devis',
    desc: 'Jusqu\'à 5 pages, une galerie photo et un espace pour modifier vos contenus vous-même.',
  },
  {
    name: 'Le Terroir',
    price: 'Sur devis',
    desc: 'Carte ou catalogue, réservation en ligne et click & collect, pour les restaurants et les producteurs.',
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
        <span className={styles.label}>Offres</span>
        <h2 className={styles.title}>
          Trois formules de départ
        </h2>
        <p className={styles.subtitle}>
          Chaque projet est chiffré sur devis, après un premier échange.
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
            <p className={styles.packMaintenance}>Maintenance possible en option</p>
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
          Voir le détail des offres
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        <p className={styles.note}>Devis gratuit, sans engagement</p>
      </motion.div>
    </SectionWrapper>
  );
}
