/**
 * Services.jsx
 * ------------
 * Section tarifs : deux offres à prix fixe (création de site)
 * + trois formules d'abonnement mensuel (maintenance & suivi),
 * bloc subventions Pass Occitanie, et argumentaire SEO.
 */
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './Services.module.css';

/* ── Offres à prix fixe (création) ── */
const OFFERS = [
  {
    id: 'essentiel',
    name: "L'Essentiel Local",
    type: 'One-Page',
    price: '600 €',
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
    price: '900 €',
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
    price: '29',
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
    price: '39',
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
    price: '49',
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
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Services() {
  return (
    <SectionWrapper id="services">
      {/* ═══ En-tête — Offres création ═══ */}
      <div className={styles.header}>
        <span className={styles.label}>Services & Tarifs</span>
        <h2 className={styles.title}>
          Des offres <span className={styles.accent}>claires et sans surprise</span>
        </h2>
        <p className={styles.subtitle}>
          Pas de jargon, pas de frais cachés. Choisissez la formule adaptée à votre activité
          dans le 12.
        </p>
      </div>

      {/* Grille des 2 offres à prix fixe */}
      <div className={styles.gridTwo}>
        {OFFERS.map((offer, i) => (
          <motion.div
            key={offer.id}
            className={`${styles.card} ${offer.highlight ? styles.cardHighlight : ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={i}
            whileHover={{ y: -6 }}
          >
            {offer.badge && (
              <span className={styles.cardBadge}>{offer.badge}</span>
            )}
            <span className={styles.cardType}>{offer.type}</span>
            <h3 className={styles.cardName}>{offer.name}</h3>

            <div className={styles.pricing}>
              <span className={styles.price}>{offer.price}</span>
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
        ))}
      </div>

      {/* ═══ En-tête — Abonnements ═══ */}
      <div className={styles.headerSub}>
        <span className={styles.label}>Abonnements</span>
        <h2 className={styles.title}>
          Votre site <span className={styles.accent}>toujours au top</span>
        </h2>
        <p className={styles.subtitle}>
          Un abonnement mensuel sans engagement pour que votre site reste rapide, sécurisé
          et visible sur Google.
        </p>
      </div>

      {/* Grille des 3 abonnements */}
      <div className={styles.gridThree}>
        {SUBSCRIPTIONS.map((sub, i) => (
          <motion.div
            key={sub.id}
            className={`${styles.card} ${sub.highlight ? styles.cardHighlight : ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={i}
            whileHover={{ y: -6 }}
          >
            {sub.badge && (
              <span className={styles.cardBadge}>{sub.badge}</span>
            )}
            <h3 className={styles.cardName}>{sub.name}</h3>

            <div className={styles.pricing}>
              <span className={styles.price}>{sub.price}</span>
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
        ))}
      </div>

      {/* Bloc Subventions — Pass Occitanie */}
      <motion.div
        className={styles.subsidyBlock}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        custom={3}
      >
        <div className={styles.subsidyIcon} aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M16 8h-6a2 2 0 100 4h4a2 2 0 010 4H8" />
            <path d="M12 6v2m0 8v2" />
          </svg>
        </div>
        <h3 className={styles.subsidyTitle}>
          Jusqu'à <span className={styles.accent}>50 % de prise en charge</span> avec le Pass Occitanie
        </h3>
        <p className={styles.subsidyText}>
          Vous êtes une TPE ou un artisan en Aveyron ? La Région Occitanie finance jusqu'à
          la moitié de votre projet de digitalisation via le{' '}
          <strong>Pass Occitanie Numérique</strong>. Concrètement, votre site « Essentiel Local »
          pourrait ne vous coûter que <strong>300 €</strong> au lieu de 600 €.
        </p>
        <p className={styles.subsidyNote}>
          Je vous accompagne gratuitement dans le montage du dossier. Parlons-en !
        </p>
        <a href="#contact" className={styles.subsidyBtn}>
          Vérifier mon éligibilité
        </a>
      </motion.div>

      {/* Bloc argumentaire SEO */}
      <motion.div
        className={styles.seoBlock}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        custom={4}
      >
        <h3 className={styles.seoTitle}>
          Pourquoi un site web <span className={styles.accent}>change la donne</span> pour votre commerce ?
        </h3>
        <p className={styles.seoText}>
          93 % des expériences en ligne commencent sur Google. Vos futurs clients vous
          cherchent déjà — soyez là quand ils ont besoin de vous.
        </p>
        <div className={styles.seoGrid}>
          <div className={styles.seoItem}>
            <svg className={styles.seoIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12" y2="18.01" />
            </svg>
            <h4>Vitesse mobile optimale</h4>
            <p>Vos clients naviguent sur téléphone. Votre site se charge en moins de 2 secondes pour ne perdre aucun visiteur.</p>
          </div>
          <div className={styles.seoItem}>
            <svg className={styles.seoIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <h4>Trouvé sur Google Maps</h4>
            <p>Quand un client cherche « boulangerie Rodez » ou « plombier Millau », votre fiche apparaît en premier.</p>
          </div>
          <div className={styles.seoItem}>
            <svg className={styles.seoIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <h4>Des clients, pas du trafic</h4>
            <p>Un formulaire de contact et un bouton d'appel direct pour convertir les visiteurs en vrais rendez-vous.</p>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
