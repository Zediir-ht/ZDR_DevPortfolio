/**
 * Header.jsx
 * ----------
 * Barre de navigation fixe en haut.
 * – Slide-down animé au chargement
 * – Effet glassmorphism au scroll
 * – Menu hamburger responsive sur mobile
 * – Navigation smooth-scroll vers les ancres
 * – CTA avec pulse glow
 */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#a-propos', label: 'À propos' },
  { href: '#services', label: 'Services' },
];

/* Variants pour le header */
const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* Variants pour les liens nav (stagger) */
const navContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

/* Logo scale bounce */
const logoVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 15, delay: 0.2 },
  },
};

/* CTA apparition */
const ctaVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 180, damping: 14, delay: 0.6 },
  },
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : true;
    }
    return true;
  });

  /* Applique le thème au chargement et quand il change */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggleTheme = useCallback(() => setDark((d) => !d), []);

  /* Détecte le scroll pour changer l'apparence du header */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Ferme le menu mobile quand on clique un lien */
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <motion.header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`container ${styles.inner}`}>
        {/* Logo — scale bounce */}
        <motion.a
          href="#accueil"
          className={styles.logo}
          aria-label="Retour à l'accueil"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <span className={styles.logoAccent}>Zdr</span>_DEV
        </motion.a>

        {/* Navigation desktop — stagger */}
        <motion.nav
          className={styles.desktopNav}
          aria-label="Navigation principale"
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <ul>
            {NAV_LINKS.map(({ href, label }) => (
              <motion.li key={href} variants={navItemVariants}>
                <a href={href}>{label}</a>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Bouton CTA + Theme toggle */}
        <div className={styles.rightActions}>
          <motion.button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            title={dark ? 'Mode clair' : 'Mode sombre'}
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {dark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </motion.button>
          <motion.a
            href="#contact"
            className={styles.cta}
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Audit gratuit
          </motion.a>
        </div>

        {/* Hamburger mobile */}
        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Overlay mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={styles.mobileNav}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            aria-label="Navigation mobile"
          >
            <ul>
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} onClick={handleLinkClick}>{label}</a>
                </li>
              ))}
              <li>
                <a href="#contact" onClick={handleLinkClick}>Contact</a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
