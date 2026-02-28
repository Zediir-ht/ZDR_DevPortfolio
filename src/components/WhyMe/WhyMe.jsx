/**
 * WhyMe.jsx
 * ---------
 * Section « Pourquoi travailler avec moi » — fond sombre.
 * Argumentaire de confiance et projection projet.
 */
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './WhyMe.module.css';

const REASONS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Ancré dans le territoire',
    desc: 'Basé à Rodez, je connais les réalités des artisans, commerçants et restaurateurs du 12. Je parle votre langage et je comprends votre clientèle.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
    title: 'Création sur mesure',
    desc: 'Pas de template générique. Chaque site est conçu spécifiquement pour votre activité, votre identité et votre clientèle locale.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Livraison rapide',
    desc: 'Votre site est en ligne en 2 semaines maximum. Pas de délai à rallonge — votre temps est précieux.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Accompagnement durable',
    desc: 'Je ne disparais pas après la livraison. Maintenance, mises à jour, conseils — je reste votre partenaire digital.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Prix fixe, sans surprise',
    desc: 'Devis clair dès le départ. Pas de coûts cachés, pas de mauvaise surprise. Paiement en 3× possible.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    title: 'Visible sur Google',
    desc: 'Chaque site est optimisé pour le référencement local. Vos futurs clients vous trouvent quand ils cherchent votre métier.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function WhyMe() {
  return (
    <SectionWrapper id="pourquoi" dark>
      {/* En-tête */}
      <div className={styles.header}>
        <motion.span
          className={styles.label}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Pourquoi moi
        </motion.span>
        <motion.h2
          className={styles.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Un partenaire digital <span className={styles.accent}>à votre échelle</span>
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Pas une agence parisienne. Un créatif du territoire, engagé pour votre réussite.
        </motion.p>
      </div>

      {/* Grille des raisons */}
      <div className={styles.grid}>
        {REASONS.map((reason, i) => (
          <motion.div
            key={reason.title}
            className={styles.card}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <div className={styles.icon}>{reason.icon}</div>
            <h3 className={styles.cardTitle}>{reason.title}</h3>
            <p className={styles.cardDesc}>{reason.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
