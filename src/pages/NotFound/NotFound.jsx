/**
 * NotFound.jsx
 * ------------
 * Page 404. Pré-rendue en dist/404.html (scripts/prerender.js) : l'hébergeur la
 * sert avec le code HTTP 404 pour toute adresse inconnue.
 */
import { Link } from 'react-router-dom';
import { VILLES } from '../../data/villes';
import SkipLink from '../../components/SkipLink/SkipLink';
import styles from '../Tarifs/Tarifs.module.css';
import local from '../Local/LocalPage.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <SkipLink />
      <header className={styles.pageHeader}>
        <Link to="/" className={styles.backLink}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Accueil
        </Link>
        <span className={styles.headerLogo}>
          <span className={styles.logoAccent}>Zdr</span>_DEV
        </span>
      </header>

      <main className={styles.main} id="contenu" tabIndex={-1}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>Cette page n'existe pas</h1>
            <p className={styles.heroSub}>
              L'adresse est peut-être erronée, ou la page a été déplacée. Voici où aller.
            </p>
            <a href="/" className={`${styles.finalCtaBtn} ${local.heroCta}`}>
              Retour à l'accueil
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <nav aria-label="Pages du site" className={local.autres}>
              <ul>
                <li><Link to="/tarifs">Tarifs</Link></li>
                {VILLES.map((v) => (
                  <li key={v.slug}>
                    <Link to={`/${v.slug}`}>Création de site internet à {v.ville}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </main>
    </div>
  );
}
