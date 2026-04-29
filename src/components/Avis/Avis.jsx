import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import { useGoogleReviews } from '../../utils/useGoogleReviews';
import styles from './Avis.module.css';

const AVIS = [
  {
    nom: 'Léa B.',
    role: 'Chambres d\'hôtes · Les Logis de Léa',
    lieu: 'Saint-Beauzély, Aveyron',
    note: 5,
    texte:
      'Résultat bluffant pour notre gîte. Le site reflète exactement l\'ambiance que je voulais transmettre : chaleur, authenticité, Aveyron. Les demandes de réservation ont augmenté dès la première semaine.',
  },
  {
    nom: 'Nathalie & Florian',
    role: 'Hôtel-Restaurant · Les Carillons',
    lieu: 'Cransac-les-Thermes, Aveyron',
    note: 5,
    texte:
      'Très professionnel, à l\'écoute et réactif. Notre site multi-pages est moderne, rapide et bien référencé sur Google. Le résultat dépasse vraiment nos attentes — on recommande sans hésiter.',
  },
  {
    nom: 'Maxime D.',
    role: 'Blog spécialisé · Chat Serein',
    lieu: 'En ligne',
    note: 5,
    texte:
      'Livraison rapide, code propre et SEO bien travaillé. Mon site de conseils félin génère du trafic organique dès le départ. Un développeur sérieux qui sait exactement ce qu\'il fait.',
  },
];

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
  </svg>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Avis() {
  const { reviews: googleReviews, rating, total, loading } = useGoogleReviews();

  // Utilise les vrais avis Google si disponibles, sinon les avis statiques
  const avisData = (googleReviews && googleReviews.length > 0) ? googleReviews : AVIS;
  const isGoogle = !!(googleReviews && googleReviews.length > 0);

  return (
    <SectionWrapper id="avis">
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.label}>Témoignages</span>
        <h2 className={styles.title}>
          Ce que disent<br />
          <span className={styles.accent}>mes clients</span>
        </h2>
        {isGoogle && rating && (
          <p className={styles.googleBadge}>
            <GoogleIcon />
            <strong>{rating.toFixed(1)}</strong>
            <span className={styles.stars} aria-label={`Note : ${rating} sur 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.round(rating) ? styles.star : styles.starEmpty}>
                  <StarIcon />
                </span>
              ))}
            </span>
            {total && <span className={styles.totalLabel}>({total} avis Google)</span>}
          </p>
        )}
      </motion.div>

      {loading ? (
        <div className={styles.skeleton}>
          {[0, 1, 2].map((i) => <div key={i} className={styles.skeletonCard} />)}
        </div>
      ) : (
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {avisData.map((avis, idx) => (
            <motion.article
              key={avis.nom + idx}
              className={styles.card}
              variants={cardVariants}
            >
              <div className={styles.quoteIcon} aria-hidden="true">
                <QuoteIcon />
              </div>

              <div className={styles.stars} aria-label={`Note : ${avis.note} sur 5`}>
                {Array.from({ length: avis.note }).map((_, i) => (
                  <span key={i} className={styles.star}>
                    <StarIcon />
                  </span>
                ))}
              </div>

              <blockquote className={styles.texte}>{avis.texte}</blockquote>

              <footer className={styles.footer}>
                {avis.photo && (
                  <img src={avis.photo} alt={avis.nom} className={styles.avatar} width="40" height="40" loading="lazy" />
                )}
                <div>
                  <p className={styles.nom}>{avis.nom}</p>
                  {avis.role && <p className={styles.role}>{avis.role}</p>}
                  {avis.lieu && <p className={styles.lieu}>{avis.lieu}</p>}
                  {avis.date && <p className={styles.date}>{avis.date}</p>}
                </div>
              </footer>
            </motion.article>
          ))}
        </motion.div>
      )}
    </SectionWrapper>
  );
}
