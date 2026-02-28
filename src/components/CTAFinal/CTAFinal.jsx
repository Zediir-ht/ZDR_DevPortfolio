/**
 * CTAFinal.jsx
 * ------------
 * Section CTA finale — fond sombre, appel à l'action rouge occitan.
 */
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './CTAFinal.module.css';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function CTAFinal() {
  return (
    <SectionWrapper id="cta-final" dark>
      <motion.div
        className={styles.wrapper}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.span className={styles.label} variants={itemVariants}>
          Prêt à vous lancer ?
        </motion.span>

        <motion.h2 className={styles.title} variants={itemVariants}>
          Donnez à votre activité<br />
          la <span className={styles.accent}>présence digitale</span> qu'elle mérite
        </motion.h2>

        <motion.p className={styles.subtitle} variants={itemVariants}>
          Discutons de votre projet autour d'un café à Rodez, ou en visio.
          Premier échange gratuit et sans engagement.
        </motion.p>

        <motion.div className={styles.actions} variants={itemVariants}>
          <motion.a
            href="#contact"
            className={styles.btnPrimary}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            En savoir plus
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>

        <motion.p className={styles.reassurance} variants={itemVariants}>
          Devis gratuit en 24h · Paiement en 3× · À partir de 600 €
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}
