/**
 * Services.jsx
 * ------------
 * Section services — fond sombre (noir charbon).
 * 4 services en liste typographique numérotée. Les tarifs sont sur /tarifs.
 */
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './Services.module.css';
import { EASE_OUT } from '../../motion';

const SERVICES = [
  {
    title: 'Site vitrine artisan',
    desc: 'Une ou quelques pages pour présenter votre travail, vos réalisations et votre zone d\'intervention, avec un bouton pour vous appeler. Le site est construit pour ressortir quand quelqu\'un cherche votre métier dans votre ville.',
  },
  {
    title: 'Site restaurant',
    desc: 'La carte, des photos, les horaires, l\'accès et, si vous le souhaitez, la réservation en ligne. Les informations que vos clients cherchent avant de venir, faciles à lire sur un téléphone.',
  },
  {
    title: 'E-commerce local',
    desc: 'Pour vendre vos produits en ligne, en livraison ou en retrait sur place. Une boutique simple, que vous gérez vous-même au quotidien.',
  },
  {
    title: 'Maintenance web',
    desc: 'Mises à jour, sauvegardes, sécurité et petites modifications. Je m\'occupe de la partie technique, vous me prévenez quand vous voulez changer quelque chose.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
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

export default function Services() {
  return (
    <SectionWrapper id="services" dark>
      <div className={styles.header}>
        <motion.h2
          className={styles.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Ce que je fais
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          Du site d'une page pour un artisan à la boutique en ligne d'un producteur,
          voici les projets sur lesquels je travaille en Aveyron.
        </motion.p>
      </div>

      <ol className={styles.list}>
        {SERVICES.map((service, i) => (
          <motion.li
            key={service.title}
            className={styles.row}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <h3 className={styles.rowTitle}>{service.title}</h3>
            <p className={styles.rowDesc}>{service.desc}</p>
          </motion.li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
