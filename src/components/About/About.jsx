/**
 * About.jsx
 * ---------
 * Section « À propos » — fond clair (blanc cassé).
 * Portrait conservé, titre conservé, bio officielle occitane.
 * Hooks psychologiques discrets intégrés.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './About.module.css';

import forgeImg from '../../assets/forge.png';
import roquefortImg from '../../assets/roquefort.png';
import soulagesImg from '../../assets/soulages.png';

const skills = [
  { title: "Forgeron du Code", desc: "Développement web sur mesure, robuste comme une lame de Laguiole. Un code frontend et backend taillé pour la performance.", img: forgeImg },
  { title: "Maturation & Architecture", desc: "Des fondations solides et performantes, affinées avec le temps comme dans les caves de Roquefort.", img: roquefortImg },
  { title: "Design Outrenoir", desc: "Une interface premium jouant sur la lumière et le contraste, inspirée par le minimalisme et la profondeur de Soulages.", img: soulagesImg }
];

const labelVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 } },
};

const valueBadgeVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 250, damping: 12, delay: 0.3 + i * 0.08 },
  }),
};

export default function About() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <SectionWrapper id="a-propos">
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

      <div className={styles.introRow}>
        {/* Portrait */}
        <motion.div
          className={styles.portraitWrapper}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <img
            src="/portrait.png"
            alt="Corentin Mayrand — Créatif web indépendant en Aveyron"
            className={styles.portrait}
            loading="lazy"
            width="320"
            height="400"
          />
          <div className={styles.portraitAccent} aria-hidden="true" />
        </motion.div>

        {/* Bio officielle */}
        <motion.div
          className={styles.text}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>
            Je suis <strong>créatif web indépendant</strong> et j'allie mes deux passions :
            la création digitale et le terroir.
          </p>
          <p>
            Installé en Aveyron, je conçois des <strong>sites internet pour les artisans,
              commerçants et restaurateurs locaux</strong> qui font vivre notre territoire.
          </p>
          <p>
            Mon approche est simple : mettre en lumière votre savoir-faire avec authenticité.
            Je m'inspire de la richesse de notre terroir aveyronnais pour créer des identités
            digitales fortes, modernes et ancrées dans le local.
          </p>
          <p className={styles.signature}>
            Chaque projet est pensé comme un produit du terroir : travaillé avec soin,
            sincérité et exigence.
          </p>

          {/* Valeurs */}
          <div className={styles.values}>
            {['Authenticité', 'Sur mesure', 'Proximité', 'Exigence'].map((v, i) => (
              <motion.span
                key={v}
                className={styles.valueBadge}
                custom={i}
                variants={valueBadgeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {v}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Spécialités avec Hover-Reveal */}
      <div className={styles.skillsContainer}>
        <motion.h3
          className={styles.skillsTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          L'art de concevoir
        </motion.h3>

        <div className={styles.skillsList}>
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              className={styles.skillItem}
              onMouseEnter={() => setHoveredSkill(i)}
              onMouseLeave={() => setHoveredSkill(null)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <div className={styles.skillContent}>
                <h4>{skill.title}</h4>
                <p>{skill.desc}</p>
              </div>

              {/* Image Reveal */}
              <motion.img
                src={skill.img}
                alt={skill.title}
                className={styles.skillImg}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{
                  opacity: hoveredSkill === i ? 1 : 0,
                  scale: hoveredSkill === i ? 1 : 0.8,
                  rotate: hoveredSkill === i ? 0 : -5
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
