/**
 * Services.jsx
 * ------------
 * Section tarifs : deux offres à prix fixe (création de site)
 * + trois formules d'abonnement mensuel (maintenance & suivi),
 * bloc subventions Pass Occitanie, et argumentaire SEO.
 * Animations : tilt 3D, compteur de prix, badge pulse, stagger.
 */
import { useRef, useCallback, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './Services.module.css';

/* ── Offres à prix fixe (création) ── */
const OFFERS = [
  {
    id: 'essentiel',
    name: "L'Essentiel Local",
    type: 'One-Page',
    price: 600,
    description:
      'Vous êtes artisan, commerçant ou restaurateur et vous avez besoin d\'être trouvé rapidement sur Google ? Cette offre est faite pour vous.',
    features: [
      'Site one-page professionnel',
      'Design moderne sur mesure',
      'Adapté mobile & tablette',
      'Fiche Google Maps intégrée',
      'Formulaire de contact sécurisé',
      'Vitesse de chargement optimale',
      'Hébergement & mise en ligne',
      'Formation prise en main (1h)',
    ],
    highlight: false,
  },
  {
    id: 'premium',
    name: 'La Vitrine Premium',
    type: 'Multi-pages',
    price: 900,
    description:
      'Vous voulez un site complet qui travaille pour vous 24h/24 ? Plusieurs pages, galerie photo, référencement avancé et autonomie totale de gestion.',
    features: [
      'Site multi-pages sur mesure',
      'Référencement SEO avancé',
      'Galerie photo professionnelle',
      'Autonomie de gestion (CMS)',
      'Blog ou page actualités',
      'Formulaire de devis avancé',
      'Optimisation Google Maps',
      'Statistiques de visites',
      'Support prioritaire 30 jours',
    ],
    highlight: true,
    badge: '★ Recommandé',
  },
];

/* ── Abonnements mensuels (maintenance & suivi) ── */
const SUBSCRIPTIONS = [
  {
    id: 'tranquillite',
    name: 'Tranquillité',
    price: 29,
    period: '€/mois',
    description: 'Le minimum pour garder votre site en ligne, à jour et sécurisé.',
    features: [
      'Hébergement & nom de domaine',
      'Certificat SSL (HTTPS)',
      'Mises à jour de sécurité',
      'Sauvegardes automatiques',
      'Support par email',
    ],
    highlight: false,
  },
  {
    id: 'serenite',
    name: 'Sérénité',
    price: 39,
    period: '€/mois',
    description: 'Votre site reste performant et évolue avec votre activité.',
    features: [
      'Tout Tranquillité inclus',
      'Modifications mineures (2/mois)',
      'Rapport mensuel de performance',
      'Surveillance disponibilité 24/7',
      'Corrections de bugs incluses',
      'Support email & téléphone',
    ],
    highlight: true,
    badge: '★ Populaire',
  },
  {
    id: 'croissance',
    name: 'Croissance',
    price: 49,
    period: '€/mois',
    description: 'Un vrai partenariat pour développer votre visibilité en continu.',
    features: [
      'Tout Sérénité inclus',
      'Modifications illimitées',
      'Stratégie SEO locale mensuelle',
      'Optimisation Google Maps continue',
      'Réseaux sociaux : lien & intégration',
      'Support prioritaire 7j/7',
      'Refonte visuelle annuelle offerte',
    ],
    highlight: false,
  },
];

/* Animation des cartes */
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.15, type: 'spring', stiffness: 100, damping: 14 },
  }),
};

/* Header stagger */
const headerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const headerItemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
};

/* SEO items stagger */
const seoContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const seoItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};

/* ── Compteur animé pour les prix ── */
function AnimatedPrice({ target, suffix = ' €' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, target]);

  return <span ref={ref}>{value}{suffix}</span>;
}

/* ── Tilt 3D hook ── */
function useTilt() {
  const ref = useRef(null);
  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  }, []);
  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = '';
  }, []);
  return { ref, onMouseMove, onMouseLeave };
}

function OfferCard({ offer, index }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt();
  return (
    <motion.div
      ref={ref}
      className={`${styles.card} ${offer.highlight ? styles.cardHighlight : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      custom={index}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {offer.badge && (
        <span className={styles.cardBadge}>{offer.badge}</span>
      )}
      <span className={styles.cardType}>{offer.type}</span>
      <h3 className={styles.cardName}>{offer.name}</h3>

      <div className={styles.pricing}>
        <span className={styles.price}>
          <AnimatedPrice target={offer.price} />
        </span>
      </div>

      <p className={styles.desc}>{offer.description}</p>

      <ul className={styles.features}>
        {offer.features.map((f) => (
          <li key={f}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <a href="#contact" className={styles.cardBtn}>
        Demander un devis gratuit
      </a>
    </motion.div>
  );
}

function SubCard({ sub, index }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt();
  return (
    <motion.div
      ref={ref}
      className={`${styles.card} ${sub.highlight ? styles.cardHighlight : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      custom={index}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {sub.badge && (
        <span className={styles.cardBadge}>{sub.badge}</span>
      )}
      <h3 className={styles.cardName}>{sub.name}</h3>

      <div className={styles.pricing}>
        <span className={styles.price}>
          <AnimatedPrice target={sub.price} suffix="" />
        </span>
        <span className={styles.period}>{sub.period}</span>
      </div>

      <p className={styles.engagement}>Sans engagement · annulable à tout moment</p>
      <p className={styles.desc}>{sub.description}</p>

      <ul className={styles.features}>
        {sub.features.map((f) => (
          <li key={f}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <a href="#contact" className={styles.cardBtn}>
        Choisir cet abonnement
      </a>
    </motion.div>
  );
}

export default function Services() {
  return (
    <SectionWrapper id="services">
      {/* ═══ En-tête — Offres création ═══ */}
      <motion.div
        className={styles.header}
        variants={headerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.span className={styles.label} variants={headerItemVariants}>Services & Tarifs</motion.span>
        <motion.h2 className={styles.title} variants={headerItemVariants}>
          Des offres <span className={styles.accent}>claires et sans surprise</span>
        </motion.h2>
        <motion.p className={styles.subtitle} variants={headerItemVariants}>
          Pas de jargon, pas de frais cachés. Choisissez la formule adaptée à votre activité
          dans le 12.
        </motion.p>
      </motion.div>

      {/* Grille des 2 offres à prix fixe */}
      <div className={styles.gridTwo}>
        {OFFERS.map((offer, i) => (
          <OfferCard key={offer.id} offer={offer} index={i} />
        ))}
      </div>

      {/* ═══ En-tête — Abonnements ═══ */}
      <motion.div
        className={styles.headerSub}
        variants={headerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.span className={styles.label} variants={headerItemVariants}>Abonnements</motion.span>
        <motion.h2 className={styles.title} variants={headerItemVariants}>
          Votre site <span className={styles.accent}>toujours au top</span>
        </motion.h2>
        <motion.p className={styles.subtitle} variants={headerItemVariants}>
          Un abonnement mensuel sans engagement pour que votre site reste rapide, sécurisé
          et visible sur Google.
        </motion.p>
      </motion.div>

      {/* Grille des 3 abonnements */}
      <div className={styles.gridThree}>
        {SUBSCRIPTIONS.map((sub, i) => (
          <SubCard key={sub.id} sub={sub} index={i} />
        ))}
      </div>

      {/* Bloc argumentaire SEO */}
      <motion.div
        className={styles.seoBlock}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h3 className={styles.seoTitle} variants={headerItemVariants}>
          Pourquoi un site web <span className={styles.accent}>change la donne</span> pour votre commerce ?
        </motion.h3>
        <motion.p className={styles.seoText} variants={headerItemVariants}>
          93 % des expériences en ligne commencent sur Google. Vos futurs clients vous
          cherchent déjà — soyez là quand ils ont besoin de vous.
        </motion.p>
        <motion.div
          className={styles.seoGrid}
          variants={seoContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className={styles.seoItem} variants={seoItemVariants}>
            <svg className={styles.seoIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12" y2="18.01" />
            </svg>
            <h4>Vitesse mobile optimale</h4>
            <p>Vos clients naviguent sur téléphone. Votre site se charge en moins de 2 secondes pour ne perdre aucun visiteur.</p>
          </motion.div>
          <motion.div className={styles.seoItem} variants={seoItemVariants}>
            <svg className={styles.seoIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <h4>Trouvé sur Google Maps</h4>
            <p>Quand un client cherche « boulangerie Rodez » ou « plombier Millau », votre fiche apparaît en premier.</p>
          </motion.div>
          <motion.div className={styles.seoItem} variants={seoItemVariants}>
            <svg className={styles.seoIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <h4>Des clients, pas du trafic</h4>
            <p>Un formulaire de contact et un bouton d'appel direct pour convertir les visiteurs en vrais rendez-vous.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
