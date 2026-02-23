/**
 * Legal.jsx
 * ---------
 * Modales « Mentions légales » et « Politique de confidentialité ».
 * Ouvertes via les liens du Footer, affichées en overlay plein écran.
 */
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Legal.module.css';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: 30, transition: { duration: 0.2 } },
};

/* ───────────────────────────── Mentions Légales ───────────────────────────── */
function MentionsLegales() {
  return (
    <>
      <h2 className={styles.title}>Mentions légales</h2>
      <p className={styles.updated}>Dernière mise à jour : 23 février 2026</p>

      <section className={styles.block}>
        <h3>1. Éditeur du site</h3>
        <p>
          Le site <strong>zdr-dev-portfolio.vercel.app</strong> est édité par :
        </p>
        <ul>
          <li><strong>Nom :</strong> Corentin Mayrand (micro-entreprise « Zdr_DEV »)</li>
          <li><strong>Statut :</strong> Entrepreneur individuel (EI)</li>
          <li><strong>Siège social :</strong> Rodez, 12000, Aveyron, France</li>
          <li><strong>Email :</strong> <a href="mailto:corentin.mayrand@gmail.com">corentin.mayrand@gmail.com</a></li>
          <li><strong>SIRET :</strong> 10103383500014 </li>
          <li><strong>Directeur de la publication :</strong> Corentin Mayrand</li>
        </ul>
      </section>

      <section className={styles.block}>
        <h3>2. Hébergement</h3>
        <ul>
          <li><strong>Hébergeur :</strong> Vercel Inc.</li>
          <li><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
          <li><strong>Site :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></li>
        </ul>
      </section>

      <section className={styles.block}>
        <h3>3. Propriété intellectuelle</h3>
        <p>
          L'ensemble du contenu de ce site (textes, images, logos, code source, design)
          est la propriété exclusive de Corentin Mayrand / Zdr_DEV, sauf mention contraire.
          Toute reproduction, représentation, modification ou exploitation, totale ou
          partielle, est interdite sans autorisation écrite préalable.
        </p>
      </section>

      <section className={styles.block}>
        <h3>4. Responsabilité</h3>
        <p>
          Les informations fournies sur ce site sont à titre indicatif. Zdr_DEV s'efforce
          de les maintenir à jour mais ne peut garantir leur exactitude à tout moment.
          Zdr_DEV ne saurait être tenu responsable de tout dommage direct ou indirect
          résultant de l'utilisation de ce site.
        </p>
      </section>

      <section className={styles.block}>
        <h3>5. Liens hypertextes</h3>
        <p>
          Ce site peut contenir des liens vers des sites tiers. Zdr_DEV n'exerce aucun
          contrôle sur ces sites et décline toute responsabilité quant à leur contenu
          ou leurs pratiques en matière de protection des données.
        </p>
      </section>

      <section className={styles.block}>
        <h3>6. Droit applicable</h3>
        <p>
          Les présentes mentions légales sont régies par le droit français. En cas de
          litige, les tribunaux compétents de Rodez seront seuls compétents.
        </p>
      </section>
    </>
  );
}

/* ──────────────────────── Politique de confidentialité ──────────────────────── */
function PolitiqueConfidentialite() {
  return (
    <>
      <h2 className={styles.title}>Politique de confidentialité</h2>
      <p className={styles.updated}>Dernière mise à jour : 23 février 2026</p>

      <section className={styles.block}>
        <h3>1. Responsable du traitement</h3>
        <p>
          Le responsable du traitement des données personnelles collectées sur ce site est :
        </p>
        <ul>
          <li><strong>Corentin Mayrand</strong> – Zdr_DEV</li>
          <li>Rodez, 12000, Aveyron, France</li>
          <li>Email : <a href="mailto:corentin.mayrand@gmail.com">corentin.mayrand@gmail.com</a></li>
        </ul>
      </section>

      <section className={styles.block}>
        <h3>2. Données collectées</h3>
        <p>
          Lorsque vous utilisez le formulaire de contact, les données suivantes sont
          collectées :
        </p>
        <ul>
          <li><strong>Nom</strong> — pour vous identifier et personnaliser ma réponse.</li>
          <li><strong>Adresse email</strong> — pour vous recontacter.</li>
          <li><strong>Message</strong> — pour comprendre votre projet et vos besoins.</li>
        </ul>
        <p>
          Ces données sont transmises via le service <strong>Formspree</strong> (formspree.io)
          et sont uniquement utilisées pour répondre à votre demande.
        </p>
      </section>

      <section className={styles.block}>
        <h3>3. Finalité du traitement</h3>
        <p>Vos données sont collectées pour :</p>
        <ul>
          <li>Répondre à vos demandes de contact, de devis ou d'information.</li>
          <li>Assurer le suivi de votre projet le cas échéant.</li>
        </ul>
        <p>
          Vos données ne sont <strong>jamais vendues, cédées ou partagées</strong> avec
          des tiers à des fins commerciales.
        </p>
      </section>

      <section className={styles.block}>
        <h3>4. Base juridique</h3>
        <p>
          Le traitement de vos données repose sur votre <strong>consentement</strong>{' '}
          (article 6.1.a du RGPD), que vous exprimez en soumettant le formulaire de contact.
        </p>
      </section>

      <section className={styles.block}>
        <h3>5. Durée de conservation</h3>
        <p>
          Vos données sont conservées pendant une durée maximale de <strong>3 ans</strong>{' '}
          après votre dernier contact, puis supprimées automatiquement.
        </p>
      </section>

      <section className={styles.block}>
        <h3>6. Sous-traitant</h3>
        <p>Le formulaire de contact utilise le service :</p>
        <ul>
          <li>
            <strong>Formspree Inc.</strong> — 2261 Market Street #5041, San Francisco, CA 94114, USA.{' '}
            <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Politique de confidentialité Formspree
            </a>.
          </li>
        </ul>
        <p>
          L'hébergement du site est assuré par <strong>Vercel Inc.</strong> (voir Mentions légales).
        </p>
      </section>

      <section className={styles.block}>
        <h3>7. Cookies</h3>
        <p>
          Ce site <strong>n'utilise aucun cookie de suivi, publicitaire ou analytique</strong>.
          Seul un stockage local (localStorage) est utilisé pour mémoriser votre préférence
          de thème (clair / sombre). Cette donnée reste sur votre navigateur et n'est jamais
          transmise à un serveur.
        </p>
      </section>

      <section className={styles.block}>
        <h3>8. Vos droits (RGPD)</h3>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD) et à la
          loi Informatique et Libertés, vous disposez des droits suivants :
        </p>
        <ul>
          <li><strong>Droit d'accès</strong> — obtenir une copie de vos données.</li>
          <li><strong>Droit de rectification</strong> — corriger des données inexactes.</li>
          <li><strong>Droit à l'effacement</strong> — demander la suppression de vos données.</li>
          <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré.</li>
          <li><strong>Droit d'opposition</strong> — vous opposer au traitement de vos données.</li>
          <li><strong>Droit de retirer votre consentement</strong> — à tout moment.</li>
        </ul>
        <p>
          Pour exercer ces droits, contactez-moi à :{' '}
          <a href="mailto:corentin.mayrand@gmail.com">corentin.mayrand@gmail.com</a>.
          Je m'engage à vous répondre sous 30 jours.
        </p>
      </section>

      <section className={styles.block}>
        <h3>9. Réclamation</h3>
        <p>
          Si vous estimez que le traitement de vos données ne respecte pas la réglementation,
          vous pouvez adresser une réclamation à la <strong>CNIL</strong> :{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.
        </p>
      </section>

      <section className={styles.block}>
        <h3>10. Modifications</h3>
        <p>
          Cette politique de confidentialité peut être mise à jour à tout moment. La date
          de dernière modification est indiquée en haut de cette page. Je vous invite à
          la consulter régulièrement.
        </p>
      </section>
    </>
  );
}

/* ───────────────────────────── Composant Modal ───────────────────────────── */
export default function Legal({ page, onClose }) {
  // Bloque le scroll du body quand la modale est ouverte
  useEffect(() => {
    if (page) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [page]);

  // Ferme avec la touche Échap
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (page) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [page, onClose]);

  return (
    <AnimatePresence>
      {page && (
        <motion.div
          className={styles.overlay}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className={styles.panel}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={page === 'mentions' ? 'Mentions légales' : 'Politique de confidentialité'}
          >
            {/* Bouton fermer */}
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Fermer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className={styles.content}>
              {page === 'mentions' && <MentionsLegales />}
              {page === 'confidentialite' && <PolitiqueConfidentialite />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
