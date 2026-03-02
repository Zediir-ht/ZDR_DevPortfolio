/**
 * SectionWrapper.jsx
 * ------------------
 * HOC de section avec animations au scroll, parallaxe et orbes flottantes.
 */
import { motion } from 'framer-motion';
import styles from './SectionWrapper.module.css';

const sectionVariants = {
  hidden: { y: 60 },
  visible: {
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const innerVariants = {
  hidden: { y: 30 },
  visible: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function SectionWrapper({ id, dark = false, className = '', children }) {
  return (
    <motion.section
      id={id}
      className={`${styles.section} ${dark ? styles.dark : ''} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={sectionVariants}
    >
      {/* Orbes décoratives */}
      <div
        className={`${styles.orb} ${styles.orb1} ${dark ? styles.orbDark : styles.orbLight}`}
        aria-hidden="true"
      />
      <div
        className={`${styles.orb} ${styles.orb2} ${dark ? styles.orbDark : styles.orbLight}`}
        aria-hidden="true"
      />

      <motion.div
        className={`container ${styles.inner}`}
        variants={innerVariants}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
