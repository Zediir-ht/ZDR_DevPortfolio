/**
 * SectionWrapper.jsx
 * ------------------
 * HOC de section avec orbes flottantes, parallaxe au scroll.
 * Supporte le mode sombre via prop `dark` pour l'alternance des fonds.
 */
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './SectionWrapper.module.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SectionWrapper({ id, dark = false, className = '', children }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className={`${styles.section} ${dark ? styles.dark : ''} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      {/* Orbes flottantes */}
      <motion.div
        className={`${styles.orb} ${styles.orb1} ${dark ? styles.orbDark : styles.orbLight}`}
        style={{ y: orb1Y }}
        aria-hidden="true"
      />
      <motion.div
        className={`${styles.orb} ${styles.orb2} ${dark ? styles.orbDark : styles.orbLight}`}
        style={{ y: orb2Y }}
        aria-hidden="true"
      />

      <motion.div className={`container ${styles.inner}`} style={{ y: contentY }}>
        {children}
      </motion.div>
    </motion.section>
  );
}
