import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import Lightbox from '../Lightbox/Lightbox';
import styles from './Portfolio.module.css';

const PROJETS = [
  {
    id: 'hotel-les-carillons',
    num: '01',
    nom: 'Hôtel Les Carillons',
    categorie: 'Hôtel-Restaurant ★★',
    lieu: 'Cransac-les-Thermes · Aveyron',
    desc: 'Site multi-pages pour un hôtel-restaurant familial labellisé Logis Hôtels. Chambres, restaurant gastronomique, meublés de caractère, séminaire et guide touristique de la région.',
    tags: ['Next.js', 'React', 'Multi-pages', 'SEO local', 'Google Maps'],
    url: 'https://hotel-les-carillons.vercel.app',
    shots: ['/carillons-1.jpg', '/carillons-2.jpg', '/carillons-3.jpg'],
  },
  {
    id: 'madouce',
    num: '02',
    nom: 'Madouce & Cie',
    categorie: 'Artisanat · Création textile',
    lieu: 'Aveyron',
    desc: 'Site vitrine pour une créatrice de pochettes de lecture artisanales. Présentation des créations, histoire de la marque et formulaire de contact — tissus chinés et fait main.',
    tags: ['React', 'Vite', 'Mobile First', 'Artisanat'],
    url: 'https://madouce-cie.vercel.app',
    shots: ['/madouce-1.jpg', '/madouce-2.jpg', '/madouce-3.jpg'],
  },
];

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const shotClasses = [styles.shot1, styles.shot2, styles.shot3];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Portfolio() {
  const [lightbox, setLightbox] = useState(null); // { images, index, projectName }

  return (
    <SectionWrapper id="portfolio" dark>
      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          projectName={lightbox.projectName}
          onClose={() => setLightbox(null)}
        />
      )}
      {/* En-tête */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.label}>Réalisations</span>
        <h2 className={styles.title}>
          Des projets concrets,<br />
          <span className={styles.accent}>livrés et en ligne</span>
        </h2>
        <p className={styles.subtitle}>
          Artisans, hôteliers, restaurateurs — chaque site est
          conçu sur mesure pour votre activité.
        </p>
      </motion.div>

      {/* Projets */}
      <div className={styles.list}>
        {PROJETS.map((projet, idx) => (
          <motion.article
            key={projet.id}
            className={`${styles.card} ${idx % 2 === 1 ? styles.cardReverse : ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={itemVariants}
          >
            {/* Info */}
            <div className={styles.info}>
              <span className={styles.num} aria-hidden="true">{projet.num}</span>
              <div className={styles.meta}>
                <span className={styles.categorie}>{projet.categorie}</span>
                <span className={styles.lieu}>{projet.lieu}</span>
              </div>
              <h3 className={styles.nom}>{projet.nom}</h3>
              <p className={styles.desc}>{projet.desc}</p>
              <div className={styles.tags}>
                {projet.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <a
                href={projet.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaLink}
              >
                Voir le site
                <ExternalIcon />
              </a>
            </div>

            {/* Visuels — 3 photos polaroid empilées */}
            <div className={styles.visuals}>
              {projet.shots.map((src, i) => (
                <button
                  key={i}
                  className={`${styles.shotBtn} ${shotClasses[i]}`}
                  onClick={() => setLightbox({ images: projet.shots, index: i, projectName: projet.nom })}
                  aria-label={`Voir ${projet.nom} — image ${i + 1} en grand`}
                >
                  <img
                    src={src}
                    alt={`Aperçu ${projet.nom} — vue ${i + 1}`}
                    className={styles.shot}
                    loading="lazy"
                    width="185"
                    height="347"
                    draggable={false}
                  />
                  <span className={styles.shotOverlay} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}
