/**
 * Hero.jsx
 * --------
 * Section hero dynamique — orbes flottantes, parallaxe au scroll.
 */
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="accueil" className={styles.hero} ref={sectionRef}>
      {/* Orbes lumineuses */}
      <motion.div
        className={styles.orb1}
        aria-hidden="true"
        style={{ y: orb1Y }}
      />
      <motion.div
        className={styles.orb2}
        aria-hidden="true"
        style={{ y: orb2Y }}
      />
      <motion.div className={styles.orb3} aria-hidden="true" />

      <div className={styles.texture} aria-hidden="true" />
      <div className={styles.goldLine} aria-hidden="true" />

      <motion.div
        className={`container ${styles.content}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: contentY, opacity }}
      >
        <motion.h1 className={styles.heroTitle} variants={itemVariants}>
          ZDR_DEV
        </motion.h1>
        <motion.p className={styles.heroSub} variants={itemVariants}>
          Développeur web
        </motion.p>
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
