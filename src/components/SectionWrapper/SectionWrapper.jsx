/**
 * SectionWrapper.jsx
 * ------------------
 * HOC de section qui ajoute automatiquement :
 *  – un id pour la navigation anchor
 *  – une animation d'apparition au scroll (framer-motion)
 *    avec blur→clear + scale pour un effet premium
 *  – un fond alterné si `alt` est passé
 */
import { motion } from 'framer-motion';
import styles from './SectionWrapper.module.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.97, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function SectionWrapper({ id, alt = false, className = '', children }) {
  return (
    <motion.section
      id={id}
      className={`${styles.section} ${alt ? styles.alt : ''} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={sectionVariants}
    >
      <div className={`container ${styles.inner}`}>
        {children}
      </div>
    </motion.section>
  );
}
