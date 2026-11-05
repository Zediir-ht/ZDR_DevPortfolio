/**
 * WhyMe.jsx
 * ---------
 * Section « Pourquoi travailler avec moi » — fond sombre.
 * Argumentaire de confiance et projection projet.
 */
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './WhyMe.module.css';
import { EASE_OUT } from '../../motion';

const REASONS = [
  {
    title: 'Sur place',
    desc: 'J\'habite et je travaille à Rodez. On peut se voir dans votre commerce ou votre atelier, et je connais la clientèle d\'ici.',
  },
  {
    title: 'Pas de modèle tout fait',
    desc: 'Je ne pars pas d\'un thème acheté en ligne. La mise en page, les textes et les photos sont choisis pour votre activité.',
  },
  {
    title: 'À votre rythme',
    desc: 'On fixe ensemble la date de mise en ligne, selon votre activité et votre calendrier : une ouverture, un lancement, le début de la saison.',
  },
  {
    title: 'Après la mise en ligne',
    desc: 'Une fois le site livré, je reste joignable. Si quelque chose change dans votre activité, on met le site à jour.',
  },
  {
    title: 'Un devis détaillé',
    desc: 'Vous savez ce qui est compris avant de vous engager, et le prix ne bouge pas en cours de route.',
  },
  {
    title: 'Visible sur Google',
    desc: 'Chaque site est construit pour la recherche locale : votre métier, votre ville, votre fiche Google. C\'est souvent là que se fait le premier contact.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function WhyMe() {
  return (
    <SectionWrapper id="pourquoi" dark>
      {/* En-tête */}
      <div className={styles.header}>
        <motion.h2
          className={styles.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Travailler avec un indépendant d'ici
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Concrètement, voici ce que ça change pour vous.
        </motion.p>
      </div>

      {/* Liste numérotée en deux colonnes */}
      <ol className={styles.list}>
        {REASONS.map((reason, i) => (
          <motion.li
            key={reason.title}
            className={styles.item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className={styles.itemTitle}>{reason.title}</h3>
              <p className={styles.itemDesc}>{reason.desc}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
