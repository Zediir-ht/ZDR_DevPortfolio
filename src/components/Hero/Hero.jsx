/**
 * Hero.jsx
 * --------
 * Section d'accueil avec message accrocheur,
 * sous-titre orienté entrepreneur et CTA principal.
 * Animation d'apparition progressive au chargement.
 */
import React, { lazy, Suspense, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const LiquidEther = lazy(() => import('../LiquidEther/LiquidEther'));

/* Variants pour l'animation séquentielle des éléments */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Hero() {
  const contentRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    const circle = circleRef.current;
    if (!content || !circle) return;

    let rafId = 0;

    const onMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = content.getBoundingClientRect();
        circle.style.transform = `translate3d(${e.clientX - rect.left}px,${e.clientY - rect.top}px,0)`;
        circle.style.opacity = '1';
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(rafId);
      circle.style.opacity = '0';
    };

    content.addEventListener('mousemove', onMove, { passive: true });
    content.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      content.removeEventListener('mousemove', onMove);
      content.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section id="accueil" className={styles.hero}>
      {/* Fond LiquidEther — lazy-loaded pour perf */}
      <div className={styles.liquidBg} aria-hidden="true">
        <Suspense fallback={null}>
          <LiquidEther
          colors={['#e35336', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
        </Suspense>
      </div>

      <motion.div
        ref={contentRef}
        className={`container ${styles.content}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Cercle blur glass autour du curseur */}
        <div
          ref={circleRef}
          className={styles.blurCircle}
          aria-hidden="true"
        />
        {/* Badge */}
        <motion.span className={styles.badge} variants={itemVariants}>
          Développeur Web Full Stack · Rodez
        </motion.span>

        {/* Titre principal */}
        <motion.h1 className={styles.title} variants={itemVariants}>
          Transformez vos idées<br />
          en <span className={styles.highlight}>expériences digitales</span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p className={styles.subtitle} variants={itemVariants}>
          Sites web performants, designs modernes et solutions sur mesure
          pour donner vie à votre activité en ligne.
        </motion.p>

        {/* CTA */}
        <motion.div className={styles.actions} variants={itemVariants}>
          <a href="#contact" className={styles.btnPrimary}>
            Démarrer un projet
          </a>
          <a href="#services" className={styles.btnSecondary}>
            Découvrir l'offre
          </a>
        </motion.div>
      </motion.div>

      {/* Flèche de scroll */}
      <motion.a
        href="#a-propos"
        className={styles.scrollHint}
        aria-label="Descendre vers la section suivante"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.a>
    </section>
  );
}
