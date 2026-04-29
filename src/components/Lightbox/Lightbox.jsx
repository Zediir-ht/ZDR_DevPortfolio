import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Lightbox.module.css';

const AUTOPLAY_DELAY = 4000; // ms entre chaque slide

const ArrowLeft = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ArrowRight = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function Lightbox({ images, initialIndex = 0, projectName, onClose }) {
  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const total = images.length;

  const goTo = useCallback((idx, dir) => {
    setDirection(dir);
    setCurrent((idx + total) % total);
  }, [total]);

  const goNext = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(goNext, AUTOPLAY_DELAY);
    return () => clearTimeout(timerRef.current);
  }, [current, paused, goNext]);

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') { setPaused(true); goNext(); }
      if (e.key === 'ArrowLeft') { setPaused(true); goPrev(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, goNext, goPrev]);

  // Bloquer le scroll body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return createPortal(
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Galerie ${projectName}`}
    >
      {/* Bouton fermer */}
      <button
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Fermer la galerie"
      >
        <CloseIcon />
      </button>

      {/* Compteur */}
      <div className={styles.counter} onClick={(e) => e.stopPropagation()}>
        {current + 1} / {total}
      </div>

      {/* Image principale */}
      <div
        className={styles.imageWrapper}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`${projectName} — vue ${current + 1}`}
            className={styles.image}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {/* Flèche précédente */}
      <button
        className={`${styles.navBtn} ${styles.navPrev}`}
        onClick={(e) => { e.stopPropagation(); setPaused(true); goPrev(); }}
        aria-label="Image précédente"
      >
        <ArrowLeft />
      </button>

      {/* Flèche suivante */}
      <button
        className={`${styles.navBtn} ${styles.navNext}`}
        onClick={(e) => { e.stopPropagation(); setPaused(true); goNext(); }}
        aria-label="Image suivante"
      >
        <ArrowRight />
      </button>

      {/* Miniatures / dots */}
      <div className={styles.dots} onClick={(e) => e.stopPropagation()}>
        {images.map((src, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => { setPaused(true); goTo(i, i > current ? 1 : -1); }}
            aria-label={`Vue ${i + 1}`}
          >
            <img src={src} alt="" className={styles.dotThumb} draggable={false} />
            {/* Barre de progression autoplay */}
            {i === current && !paused && (
              <motion.div
                className={styles.dotProgress}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTOPLAY_DELAY / 1000, ease: 'linear' }}
                key={`prog-${current}`}
              />
            )}
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
}
