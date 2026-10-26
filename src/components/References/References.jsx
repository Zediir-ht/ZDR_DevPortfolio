/**
 * References.jsx
 * --------------
 * Bandeau « Ils m'ont fait confiance » — juste sous le hero, fond clair.
 * Uniquement des clients réels (src/data/projets.js), sans note ni citation :
 * les avis seront affichés quand de vrais avis clients seront disponibles.
 */
import { motion } from 'framer-motion';
import { PROJETS } from '../../data/projets';
import styles from './References.module.css';

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

/* Le classement hôtelier (★★) se confondrait ici avec une note d'avis */
const sansEtoiles = (txt) => txt.replace(/\s*★+/g, '');

export default function References() {
  return (
    <section id="references" className={styles.band} aria-labelledby="references-title">
      <motion.div
        className={`container ${styles.inner}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.div className={styles.intro} variants={fade}>
          <span className={styles.label}>Références</span>
          <h2 id="references-title" className={styles.title}>
            Ils m'ont fait confiance
          </h2>
        </motion.div>

        <ul className={styles.list}>
          {PROJETS.map((p, i) => (
            <motion.li key={p.id} className={styles.item} variants={fade} custom={i + 1}>
              <span className={styles.num} aria-hidden="true">{p.num}</span>
              <div>
                <p className={styles.nom}>{p.nom}</p>
                <p className={styles.meta}>
                  {sansEtoiles(p.categorie)} · {p.lieu.replace(' · Aveyron', '')}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.a
          href="#portfolio"
          className={styles.cta}
          variants={fade}
          custom={PROJETS.length + 1}
        >
          Voir les réalisations
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}
