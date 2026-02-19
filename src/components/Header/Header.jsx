/**
 * Header.jsx
 * ----------
 * Barre de navigation fixe en haut.
 * – Effet de fond semi-transparent au scroll
 * – Menu hamburger responsive sur mobile
 * – Navigation smooth-scroll vers les ancres
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '#accueil',   label: 'Accueil' },
  { href: '#a-propos',  label: 'À propos' },
  { href: '#services',  label: 'Services' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Détecte le scroll pour changer l'apparence du header */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Ferme le menu mobile quand on clique un lien */
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="#accueil" className={styles.logo} aria-label="Retour à l'accueil">
          <span className={styles.logoAccent}>Zdr</span>_DEV
        </a>

        {/* Navigation desktop */}
        <nav className={styles.desktopNav} aria-label="Navigation principale">
          <ul>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bouton CTA */}
        <a href="#contact" className={styles.cta}>Me contacter</a>

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
    </header>
  );
}
