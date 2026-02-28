/**
 * Header.jsx
 * ----------
 * Barre de navigation fixe — identité occitane premium.
 * Glassmorphism au scroll, hamburger mobile, CTA rouge occitan.
 * Pas de dark mode toggle (l'alternance section fait le rythme).
 */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#a-propos', label: 'À propos' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const navContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
};

const logoVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 15, delay: 0.2 },
  },
};

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <motion.header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
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

        {/* Navigation desktop */}
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

        {/* CTA */}
        <div className={styles.rightActions}>
          <motion.a
            href="#contact"
            className={styles.cta}
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            En savoir plus
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
                <a href="#contact" onClick={handleLinkClick} className={styles.mobileCta}>
                  En savoir plus
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
