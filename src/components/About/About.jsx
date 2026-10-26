/**
 * About.jsx
 * ---------
 * Section « À propos » — fond clair (blanc cassé).
 * Portrait conservé, titre conservé, bio officielle occitane.
 * Hooks psychologiques discrets intégrés.
 */
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './About.module.css';

const labelVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 } },
};

const valueBadgeVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 250, damping: 12, delay: 0.3 + i * 0.08 },
  }),
};

export default function About() {

  return (
    <SectionWrapper id="a-propos" className={styles.aboutSection}>
      <div className={styles.glassPanel}>
      {/* En-tête de section */}
      <div className={styles.header}>
        <motion.span
          className={styles.label}
          variants={labelVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          À propos
        </motion.span>
        <motion.h2
          className={styles.title}
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          On se connaît pas encore ?
        </motion.h2>
      </div>

      <div className={styles.introRow}>
        {/* Portrait */}
        <motion.div
          className={styles.portraitWrapper}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <picture>
            <source srcSet="/portrait.webp" type="image/webp" />
            <img
              src="/portrait.png"
              alt="Corentin Mayrand, développeur web freelance à Rodez, Aveyron"
              className={styles.portrait}
              loading="lazy"
              width="320"
              height="400"
            />
          </picture>
          <div className={styles.portraitAccent} aria-hidden="true" />
        </motion.div>

        {/* Bio officielle */}
        <motion.div
          className={styles.text}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>
            Je m'appelle Corentin et je suis <strong>développeur web à Rodez</strong>. Je crée des sites
            internet pour les artisans, les commerçants et les restaurateurs de l'Aveyron.
          </p>
          <p>
            Je travaille seul : c'est moi que vous rencontrez au premier rendez-vous, moi qui construis
            votre site, et moi que vous appelez s'il faut y changer quelque chose.
          </p>
          <p>
            Avant de dessiner quoi que ce soit, je cherche à comprendre votre métier : ce que vous vendez,
            à qui, et ce que vos clients tapent sur Google quand ils vous cherchent. Le site part de là.
          </p>

          {/* Valeurs */}
          <div className={styles.values}>
            {['Basé à Rodez', 'Un seul interlocuteur', 'Pas de modèle tout fait', 'Devis gratuit'].map((v, i) => (
              <motion.span
                key={v}
                className={styles.valueBadge}
                custom={i}
                variants={valueBadgeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {v}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </SectionWrapper>
  );
}
