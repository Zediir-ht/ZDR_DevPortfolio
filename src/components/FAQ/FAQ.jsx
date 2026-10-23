/**
 * FAQ.jsx
 * -------
 * Section « Questions fréquentes » — fond clair.
 * Le contenu est visible (accordéons <details>) et alimente aussi le JSON-LD
 * FAQPage : Google n'exploite le balisage que s'il correspond au texte affiché.
 */
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './FAQ.module.css';

export const FAQ_ITEMS = [
  {
    q: 'Combien coûte la création d\'un site internet à Rodez ?',
    a: 'Chaque projet est chiffré sur devis, selon vos besoins : site one-page (L\'Essentiel), site multi-pages (L\'Atelier) ou site premium avec réservation et vente en ligne (Le Terroir). Le devis est gratuit, envoyé sous 24h et sans engagement. Le paiement en 3× sans frais est possible pour tous les projets.',
  },
  {
    q: 'En combien de temps mon site sera-t-il en ligne ?',
    a: 'Votre site est livré clé en main en 2 semaines maximum après validation du devis et réception de vos contenus (textes, photos, logo).',
  },
  {
    q: 'Pourquoi choisir un développeur web local en Aveyron plutôt qu\'une agence ?',
    a: 'Basé à Rodez, je connais les réalités des artisans, commerçants et restaurateurs du 12. On peut se rencontrer en personne, vous avez un interlocuteur unique du premier échange à la maintenance, et votre site est pensé pour votre clientèle et votre zone de chalandise.',
  },
  {
    q: 'Dans quelles villes intervenez-vous ?',
    a: 'J\'interviens à Rodez, Onet-le-Château, Millau, Villefranche-de-Rouergue, Decazeville et dans tout l\'Aveyron. Je travaille aussi à distance pour les professionnels situés hors du département.',
  },
  {
    q: 'Mon site sera-t-il visible sur Google ?',
    a: 'Oui, chaque site est optimisé pour le référencement local : structure et textes pensés pour les recherches de votre métier dans votre ville, fiche Google Maps intégrée, chargement rapide et affichage mobile soigné. Le positionnement se construit ensuite sur quelques semaines ; votre fiche Google Business Profile et vos avis clients l\'accélèrent fortement.',
  },
  {
    q: 'L\'hébergement et le nom de domaine sont-ils inclus ?',
    a: 'La mise en ligne et l\'hébergement font partie de chaque offre. Ensuite, les formules de maintenance prennent en charge l\'hébergement, le nom de domaine, le certificat SSL (HTTPS), les mises à jour de sécurité et les sauvegardes, pour que vous n\'ayez rien à gérer.',
  },
  {
    q: 'Pourrai-je modifier mon site moi-même ?',
    a: 'Oui. Chaque livraison comprend une formation à la prise en main, et l\'offre L\'Atelier inclut un espace de gestion (CMS) pour modifier vos textes et photos en autonomie. Si vous préférez déléguer, la Formule Sérénité inclut 1h de modifications de contenu par mois.',
  },
  {
    q: 'Mon site sera-t-il adapté aux smartphones ?',
    a: 'Oui, tous les sites sont conçus « mobile first » : la majorité de vos clients vous cherchent depuis leur téléphone, l\'affichage mobile est donc travaillé en priorité.',
  },
  {
    q: 'Je suis restaurateur ou producteur : puis-je proposer la réservation ou le click & collect ?',
    a: 'Oui, c\'est l\'objet de l\'offre Le Terroir : menu ou catalogue produits, réservation en ligne et click & collect intégrés, avec un design premium et un référencement local avancé.',
  },
  {
    q: 'Que se passe-t-il après la mise en ligne ?',
    a: 'Je reste votre interlocuteur. Les formules Tranquillité et Sérénité couvrent la sécurité, les sauvegardes, la surveillance et les évolutions de votre site. En cas de problème, je réponds sous 24h.',
  },
];

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FAQ() {
  return (
    <SectionWrapper id="faq" className={styles.faqSection}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      {/* En-tête */}
      <div className={styles.header}>
        <motion.span
          className={styles.label}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          FAQ
        </motion.span>
        <motion.h2
          className={styles.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Questions fréquentes sur la <span className={styles.accent}>création de site internet</span>
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Tarifs, délais, hébergement, référencement : tout ce qu'il faut savoir avant de lancer votre site à Rodez et en Aveyron.
        </motion.p>
      </div>

      {/* Questions — <details> : contenu présent dans le HTML même replié */}
      <div className={styles.list}>
        {FAQ_ITEMS.map(({ q, a }) => (
          <details key={q} className={styles.item}>
            <summary className={styles.question}>
              <h3 className={styles.questionText}>{q}</h3>
              <span className={styles.chevron} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </summary>
            <p className={styles.answer}>{a}</p>
          </details>
        ))}
      </div>
    </SectionWrapper>
  );
}
