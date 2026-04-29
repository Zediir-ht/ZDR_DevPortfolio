/**
 * Hero.jsx
 * --------
 * Section hero dynamique — orbes flottantes, parallaxe au scroll.
 */
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const GoogleStars = () => (
  <motion.div
    className={styles.googleBadge}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.5 }}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className={styles.googleIcon}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
    <span className={styles.googleStars} aria-label="5 étoiles sur 5">
      {'★★★★★'}
    </span>
    <span className={styles.googleLabel}>Avis Google</span>
  </motion.div>
);

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
        <h1 className={styles.srOnly}>Développeur Web à Rodez, Aveyron — Création de sites internet sur mesure</h1>
        <GoogleStars />
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
            Rodez · Aveyron
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
