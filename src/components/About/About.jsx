/**
 * About.jsx
 * ---------
 * Section « À propos » : présentation orientée partenaire local,
 * avec des bénéfices métiers concrets au lieu de barres de compétences.
 */
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import AveyronMap from '../AveyronMap/AveyronMap';
import styles from './About.module.css';

/* Bénéfices métiers — remplace les barres de compétences techniques */
const BENEFITS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
      </svg>
    ),
    title: 'Adapté au mobile',
    desc: 'Vos clients naviguent sur téléphone. Votre site s\'affiche parfaitement sur tous les écrans.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Livré en 2 semaines',
    desc: 'Pas de délai à rallonge. Votre site est en ligne rapidement pour commencer à travailler pour vous.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Circuit court numérique',
    desc: 'Basé à Rodez, je me déplace dans tout le 12. On se rencontre, on discute, on avance ensemble.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Sécurisé et fiable',
    desc: 'Votre site est protégé, sauvegardé et maintenu. Zéro risque pour vous et vos clients.',
  },
];

/* Animation pour les cartes */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function About() {
  return (
    <SectionWrapper id="a-propos" className={styles.bgImage}>
      {/* En-tête de section */}
      <div className={styles.header}>
        <span className={styles.label}>À propos</span>
        <h2 className={styles.title}>
          Votre voisin développeur,<br />
          au service de <span className={styles.accent}>votre réussite</span>
        </h2>
      </div>

      <div className={styles.grid}>
        {/* Portrait + texte */}
        <div className={styles.introRow}>
          <motion.div
            className={styles.portraitWrapper}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <img
              src="/portrait.png"
              alt="Corentin Mayrand — Développeur web à Rodez, Aveyron"
              className={styles.portrait}
              loading="lazy"
              width="320"
              height="400"
            />
            <div className={styles.portraitAccent} aria-hidden="true" />
          </motion.div>

          {/* Texte */}
          <div className={styles.text}>
            <p>
              Moi c'est <strong>Corentin Mayrand</strong>, ruthénois pure souche et
              développeur web indépendant. J'ai grandi ici, je connais nos rues, nos
              marchés et les <em>gens qui font vivre le 12</em>.
            </p>
            <p>
              Je sais que les réalités d'un artisan à Rodez, d'un restaurateur à Millau
              ou d'un commerçant à Villefranche-de-Rouergue n'ont rien à voir avec celles
              d'une startup parisienne. C'est justement pour ça que je fais ce métier ici :
              pour aider les <strong>pros de l'Aveyron</strong> à être enfin visibles en ligne.
            </p>
            <p>
              Pas d'intermédiaire, pas de mauvaise surprise.
              On se rencontre, on parle de votre activité, et je vous livre un site
              qui <strong>ramène de vrais clients</strong> — à prix fixe, dans les délais.
            </p>

            {/* Valeurs */}
            <div className={styles.values}>
              {['Proximité', 'Transparence', 'Réactivité', 'Prix juste'].map((v) => (
                <span key={v} className={styles.valueBadge}>✓ {v}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bénéfices métiers (au lieu des compétences techniques) */}
        <div className={styles.skills}>
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              className={styles.skillCard}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className={styles.benefitIcon}>{benefit.icon}</div>
              <h4 className={styles.skillCategory}>{benefit.title}</h4>
              <p className={styles.benefitDesc}>{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Carte interactive de l'Aveyron */}
      <AveyronMap />
    </SectionWrapper>
  );
}
