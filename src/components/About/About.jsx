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
          On se connaît <span className={styles.accent}>pas encore ?</span>
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
              alt="Corentin Mayrand — Créatif web indépendant en Aveyron"
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
            Je suis <strong>créatif web indépendant</strong> et j'allie mes deux passions :
            la <span className={styles.keyword}>création digitale</span> et le <span className={styles.keyword}>terroir</span>.
          </p>
          <p>
            Installé en <span className={styles.keyword}>Aveyron</span>, je conçois des <strong>sites internet pour les artisans,
              commerçants et restaurateurs locaux</strong> qui font vivre notre territoire.
          </p>
          <p>
            Mon approche est simple : mettre en lumière votre <span className={styles.keyword}>savoir-faire</span> avec authenticité.
            Je m'inspire de la richesse de notre terroir aveyronnais pour créer des <span className={styles.keyword}>identités
            digitales fortes</span>, modernes et ancrées dans le local.
          </p>
          <p className={styles.signature}>
            Chaque projet est pensé comme un produit du terroir : travaillé avec <span className={styles.keyword}>soin</span>,
            <span className={styles.keyword}> sincérité</span> et <span className={styles.keyword}>exigence</span>.
          </p>

          {/* Valeurs */}
          <div className={styles.values}>
            {['Authenticité', 'Sur mesure', 'Proximité', 'Exigence'].map((v, i) => (
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
