/**
 * SectionWrapper.jsx
 * ------------------
 * HOC de section : apparition au défilement et halos décoratifs fixes.
 */
import { motion } from 'framer-motion';
import styles from './SectionWrapper.module.css';
import { EASE_OUT } from '../../motion';

/*
 * Un seul niveau de mouvement par section : seul le contenu intérieur glisse.
 * La section elle-même ne bouge pas (son fond ne se décale plus).
 */
const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const innerVariants = {
  hidden: { y: 30 },
  visible: {
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
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
