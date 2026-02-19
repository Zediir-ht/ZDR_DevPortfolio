/**
 * About.jsx
 * ---------
 * Section « À propos » : présentation de Zdr_DEV,
 * expertise full stack avec liste de compétences
 * et technologies maîtrisées.
 */
import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import styles from './About.module.css';

/* Compétences techniques */
const SKILLS = [
  { category: 'Front-end',  techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Back-end',   techs: ['Node.js', 'Express', 'PHP', 'Python'] },
  { category: 'Base de données', techs: ['MySQL', 'PostgreSQL', 'MongoDB'] },
  { category: 'Outils',     techs: ['Git', 'Docker', 'Figma', 'VS Code'] },
];

/* Animation pour les cartes de compétences */
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
          Un développeur passionné,<br />
          au service de <span className={styles.accent}>votre réussite</span>
        </h2>
      </div>

      <div className={styles.grid}>
        {/* Texte */}
        <div className={styles.text}>
          <p>
            Salut, moi c'est <strong>Zdr_DEV</strong> — développeur web full stack
            basé à <strong>Rodez</strong>, au cœur de l'Aveyron. Je conçois des
            sites et applications web <em>modernes, performants et sécurisés</em>{' '}
            pour les entrepreneurs, artisans et PME qui veulent une vraie présence en ligne.
          </p>
          <p>
            Mon approche : comprendre votre métier, traduire vos besoins en solutions
            digitales concrètes et vous livrer un produit fini — sans jargon technique
            inutile. Du design à la mise en production, je gère tout le processus.
          </p>
          <p>
            Chaque projet est une collaboration. Je m'engage sur la qualité, les délais
            et un accompagnement transparent du début à la fin.
          </p>

          {/* Valeurs */}
          <div className={styles.values}>
            {['Qualité', 'Transparence', 'Réactivité'].map((v) => (
              <span key={v} className={styles.valueBadge}>✓ {v}</span>
            ))}
          </div>
        </div>

        {/* Compétences */}
        <div className={styles.skills}>
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.category}
              className={styles.skillCard}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <h4 className={styles.skillCategory}>{skill.category}</h4>
              <div className={styles.techList}>
                {skill.techs.map((t) => (
                  <span key={t} className={styles.techBadge}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
