/**
 * Hero.jsx
 * --------
 * Section hero dynamique — orbes flottantes, parallaxe au scroll.
 */
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section id="accueil" className={styles.hero}>
      {/* Orbes décoratives (CSS-only) */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.orb3} aria-hidden="true" />

      <div className={styles.texture} aria-hidden="true" />
      <div className={styles.goldLine} aria-hidden="true" />

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.titleRow}>
          <motion.span className={styles.heroLeft} variants={itemVariants}>
            ZDR
          </motion.span>
          <motion.span className={styles.heroRight} variants={itemVariants}>
            DEV
          </motion.span>
        </div>
        <div className={styles.bottomRow}>
          <motion.p className={styles.heroSub} variants={itemVariants}>
            Développeur<br />Web
          </motion.p>
          <motion.p className={styles.heroTagline} variants={itemVariants}>
            Aveyron mon país
          </motion.p>
        </div>
      </motion.div>

      {/* Flèche de scroll */}
      <motion.a
        href="#a-propos"
        className={styles.scrollHint}
        aria-label="Descendre vers la section suivante"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { repeat: Infinity, duration: 2 } }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.a>
    </section>
  );
}
