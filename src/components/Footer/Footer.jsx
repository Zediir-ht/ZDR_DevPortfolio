/**
 * Footer.jsx
 * ----------
 * Pied de page avec mentions légales, liens rapides et coordonnées.
 */
import styles from './Footer.module.css';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ onOpenLegal }) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Colonne 1 – Marque */}
        <div className={styles.brand}>
          <h4 className={styles.logo}>
            <span className={styles.accent}>Zdr</span>_DEV
          </h4>
          <p className={styles.tagline}>
            Votre voisin développeur<br />Rodez · Aveyron (12)
          </p>
          <p className={styles.tagline}>
            Sites web pour artisans, commerçants<br />et restaurateurs du 12.
          </p>
        </div>

        {/* Colonne 2 – Liens rapides */}
        <div className={styles.links}>
          <h5 className={styles.colTitle}>Navigation</h5>
          <ul>
            <li><a href="#accueil">Accueil</a></li>
            <li><a href="#a-propos">À propos</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Colonne 3 – Contact */}
        <div className={styles.contact}>
          <h5 className={styles.colTitle}>Contact</h5>
          <ul>
            <li>
              <a href="mailto:corentin.mayrand@gmail.com">
                corentin.mayrand@gmail.com
              </a>
            </li>
            <li>Rodez, Aveyron (12)</li>
          </ul>
        </div>
      </div>

      {/* Bas de page */}
      <div className={`container ${styles.bottom}`}>
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
      </div>
    </footer>
  );
}
