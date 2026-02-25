/**
 * About.jsx
 * ---------
 * Section « À propos » : présentation orientée partenaire local,
 * avec des bénéfices métiers concrets au lieu de barres de compétences.
 * Animations : portrait parallax, tilt 3D sur cards, badges pop staggeré.
 */
import { useRef, useCallback } from 'react';
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

/* Animation pour les cartes — stagger + spring */
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, type: 'spring', stiffness: 120, damping: 14 },
  }),
};

/* Header label slide in */
const labelVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const titleVariants = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 } },
};

/* Value badges pop */
const valueBadgeVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 250, damping: 12, delay: 0.3 + i * 0.08 },
  }),
};

/* Tilt 3D handler pour les cards — séparé du motion.div */
const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

function useTilt() {
  const ref = useRef(null);
  const onMouseMove = useCallback((e) => {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  }, []);
  const onMouseLeave = useCallback(() => {
    if (isTouch) return;
    const el = ref.current;
    if (el) el.style.transform = '';
  }, []);
  return { ref, onMouseMove, onMouseLeave };
}

function BenefitCard({ benefit, index }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt();
  return (
    <motion.div
      className={styles.skillCard}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
    >
      <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ transition: 'transform 0.2s ease' }}>
        <div className={styles.benefitIcon}>{benefit.icon}</div>
        <h4 className={styles.skillCategory}>{benefit.title}</h4>
        <p className={styles.benefitDesc}>{benefit.desc}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <SectionWrapper id="a-propos" className={styles.bgImage}>
      {/* En-tête de section */}
      <div className={styles.header}>
        <motion.span
          className={styles.label}
          variants={labelVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          À propos
        </motion.span>
        <motion.h2
          className={styles.title}
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          On se connaît <span className={styles.accent}>pas encore ?</span>
        </motion.h2>
      </div>

      <div className={styles.grid}>
        {/* Portrait + texte */}
        <div className={styles.introRow}>
          <motion.div
            className={styles.portraitWrapper}
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
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
          <motion.div
            className={styles.text}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              Moi c'est <strong>Corentin Mayrand</strong>, ruthénois pure souche et
              développeur web indépendant. J'ai grandi ici, je connais nos rues, nos
              marchés et les <em>gens qui font vivre l'Aveyron</em>.
            </p>
            <p>
              Je sais que les réalités d'un artisan à Rodez, d'un restaurateur à Millau
              ou d'un commerçant à Villefranche-de-Rouergue n'ont rien à voir avec celles
              d'une startup parisienne. C'est justement pour ça que je fais ce métier ici :
              pour aider les <strong>pros de l'Aveyron</strong> à être enfin visibles en ligne.
            </p>
            <p>
              Pas d'intermédiaire.
              On parle de votre activité, et je vous livre un site
              qui <strong>ramène de vrais clients</strong> — à prix fixe, dans les délais.
            </p>

            {/* Valeurs — pop staggeré */}
            <div className={styles.values}>
              {['Proximité', 'Transparence', 'Réactivité', 'Prix juste'].map((v, i) => (
                <motion.span
                  key={v}
                  className={styles.valueBadge}
                  custom={i}
                  variants={valueBadgeVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  ✓ {v}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bénéfices métiers (tilt 3D) */}
        <div className={styles.skills}>
          {BENEFITS.map((benefit, i) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={i} />
          ))}
        </div>
      </div>

      {/* Carte interactive de l'Aveyron */}
      <AveyronMap />
    </SectionWrapper>
  );
}
