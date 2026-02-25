/**
 * Footer.jsx
 * ----------
 * Pied de page avec mentions légales, liens rapides et coordonnées.
 * Animations : fade-in-up staggeré au scroll, liens avec underline animé.
 */
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

const CURRENT_YEAR = new Date().getFullYear();

/* Stagger container */
const footerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const colVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 14 },
  },
};

const bottomVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
};

export default function Footer({ onOpenLegal }) {
  return (
    <motion.footer
      className={styles.footer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={footerContainerVariants}
    >
      <div className={`container ${styles.grid}`}>
        {/* Colonne 1 – Marque */}
        <motion.div className={styles.brand} variants={colVariants}>
          <h4 className={styles.logo}>
            <span className={styles.accent}>Zdr</span>_DEV
          </h4>
          <p className={styles.tagline}>
            Votre voisin développeur<br />Rodez · Aveyron (12)
          </p>
          <p className={styles.tagline}>
            Sites web pour artisans, commerçants<br />et restaurateurs du 12.
          </p>
        </motion.div>

        {/* Colonne 2 – Liens rapides */}
        <motion.div className={styles.links} variants={colVariants}>
          <h5 className={styles.colTitle}>Navigation</h5>
          <ul>
            <li><a href="#accueil">Accueil</a></li>
            <li><a href="#a-propos">À propos</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </motion.div>

        {/* Colonne 3 – Contact */}
        <motion.div className={styles.contact} variants={colVariants}>
          <h5 className={styles.colTitle}>Contact</h5>
          <ul>
            <li>
              <a href="mailto:corentin.mayrand@gmail.com">
                corentin.mayrand@gmail.com
              </a>
            </li>
            <li>Rodez, Aveyron (12)</li>
          </ul>
        </motion.div>
      </div>

      {/* Bas de page */}
      <motion.div className={`container ${styles.bottom}`} variants={bottomVariants}>
        <p>© {CURRENT_YEAR} Zdr_DEV — Tous droits réservés.</p>
        <p className={styles.legal}>
          <button
            type="button"
            className={styles.legalBtn}
            onClick={() => onOpenLegal('mentions')}
          >
            Mentions légales
          </button>
          <span className={styles.sep}>·</span>
          <button
            type="button"
            className={styles.legalBtn}
            onClick={() => onOpenLegal('confidentialite')}
          >
            Politique de confidentialité
          </button>
        </p>
      </motion.div>
    </motion.footer>
  );
}
