/**
 * Portfolio.jsx
 * -------------
 * Section portfolio — fond clair (blanc cassé).
 * Présente les réalisations avec un grid premium.
 */
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './Portfolio.module.css';

const PROJECTS = [
  {
    id: 1,
    title: 'Boulangerie du Faubourg',
    type: 'Site vitrine artisan',
    description: 'Site vitrine pour une boulangerie artisanale à Rodez. Présentation des produits, horaires et localisation Google Maps.',
    tags: ['Artisan', 'Rodez', 'One-page'],
  },
  {
    id: 2,
    title: 'Le Comptoir Aveyronnais',
    type: 'Site restaurant',
    description: 'Site avec carte interactive, galerie photo et réservation en ligne pour un restaurant de cuisine du terroir à Millau.',
    tags: ['Restaurant', 'Millau', 'Multi-pages'],
  },
  {
    id: 3,
    title: 'Ferme de Laissac',
    type: 'E-commerce local',
    description: 'Boutique en ligne pour la vente directe de produits fermiers. Commande et livraison en circuit court dans le 12.',
    tags: ['E-commerce', 'Terroir', 'Circuit court'],
  },
  {
    id: 4,
    title: 'Atelier Bois & Pierre',
    type: 'Site vitrine artisan',
    description: 'Vitrine digitale pour un ébéniste-maçon. Portfolio photo de réalisations et formulaire de devis en ligne.',
    tags: ['Artisan', 'Villefranche', 'Sur mesure'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Portfolio() {
  return (
    <SectionWrapper id="portfolio">
      {/* En-tête */}
      <div className={styles.header}>
        <motion.span
          className={styles.label}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Réalisations
        </motion.span>
        <motion.h2
          className={styles.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Des projets qui <span className={styles.accent}>parlent d'ici</span>
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Chaque site est conçu sur mesure pour refléter l'identité et le savoir-faire
          de chaque professionnel du territoire.
        </motion.p>
      </div>

      {/* Grille de projets */}
      <div className={styles.grid}>
        {PROJECTS.map((project, i) => (
          <motion.article
            key={project.id}
            className={styles.card}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <div className={styles.cardTop}>
              <span className={styles.cardType}>{project.type}</span>
              <h3 className={styles.cardTitle}>{project.title}</h3>
            </div>
            <p className={styles.cardDesc}>{project.description}</p>
            <div className={styles.cardTags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}
