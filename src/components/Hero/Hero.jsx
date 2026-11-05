/**
 * Hero.jsx
 * --------
 * Section hero dynamique — orbes flottantes, parallaxe au scroll.
 */
import styles from './Hero.module.css';

/* Entrée en CSS (classe .reveal) : visible dès le premier affichage, sans attendre le JavaScript */
const delai = (s) => ({ '--reveal-delay': `${s}s` });

export default function Hero() {
  return (
    <section id="accueil" className={styles.hero}>
      {/* Orbes décoratives (CSS-only) */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.orb3} aria-hidden="true" />

      <div className={styles.texture} aria-hidden="true" />
      <div className={styles.goldLine} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.srOnly}>Développeur web à Rodez, Aveyron : création de sites internet sur mesure</h1>
        <div className={styles.titleRow}>
          <span className={`${styles.heroLeft} reveal`} style={delai(0.1)}>
            ZDR
          </span>
          <span className={`${styles.heroRight} reveal`} style={delai(0.2)}>
            DEV
          </span>
        </div>
        <div className={styles.bottomRow}>
          <p className={`${styles.heroSub} reveal`} style={delai(0.3)}>
            Développeur<br />Web
          </p>
          <p className={`${styles.heroTagline} reveal`} style={delai(0.4)}>
            Rodez · Aveyron
          </p>
        </div>
      </div>

      {/* Flèche de scroll */}
      <a
        href="#a-propos"
        className={styles.scrollHint}
        aria-label="Descendre vers la section suivante"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>
    </section>
  );
}
