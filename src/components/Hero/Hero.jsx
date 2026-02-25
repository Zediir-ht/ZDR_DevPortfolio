/**
 * Hero.jsx
 * --------
 * Section d'accueil avec message accrocheur,
 * sous-titre orienté entrepreneur et CTA principal.
 * Animation d'apparition progressive au chargement
 * avec spring physics, blur→clear, et particules flottantes.
 */
import React, { lazy, Suspense, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const LiquidEther = lazy(() => import('../LiquidEther/LiquidEther'));

/* Variants pour l'animation séquentielle des éléments — spring physics */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, x: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 150, damping: 12 },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 14, delay: 0.1 },
  },
};

/* Floating particles data */
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 4,
  left: `${5 + Math.random() * 90}%`,
  top: `${5 + Math.random() * 90}%`,
  delay: Math.random() * 5,
  duration: 4 + Math.random() * 6,
}));

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

      {/* Particules flottantes décoratives */}
      <div className={styles.particles} aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className={styles.particle}
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
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

        {/* Colonne gauche — Texte */}
        <div className={styles.textCol}>
          <motion.span className={styles.badge} variants={badgeVariants}>
            Votre partenaire web en Aveyron
          </motion.span>

          <motion.h1 className={styles.title} variants={itemVariants}>
            L'agence ruthénoise<br />
            au service <span className={styles.highlight}>de votre développement</span>
          </motion.h1>

          <motion.p className={styles.subtitle} variants={itemVariants}>
            Artisan, commerçant, restaurateur aveyronnais ? Je m'engage à crée un site web
            à votre image pour attirer la clientèle. Visible sur Google, adapté au mobile,
            livré en 2 semaines.
          </motion.p>

          <motion.div className={styles.trustBadges} variants={itemVariants}>
            {['✓ Devis gratuit en 24h', '✓ Paiement en 3×'].map((text, i) => (
              <motion.span
                key={text}
                className={styles.trustItem}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 12,
                  delay: 1.0 + i * 0.12,
                }}
              >
                {text}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Colonne droite — CTA */}
        <motion.div className={styles.actionsCol} variants={ctaVariants}>
          <motion.a
            href="#contact"
            className={styles.btnPrimary}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Demander mon audit gratuit</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
          <motion.a
            href="#services"
            className={styles.btnSecondary}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Voir les offres dès 600 €</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Flèche de scroll */}
      <motion.a
        href="#a-propos"
        className={styles.scrollHint}
        aria-label="Descendre vers la section suivante"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { repeat: Infinity, duration: 2 } }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.a>
    </section>
  );
}
