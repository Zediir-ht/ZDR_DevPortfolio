/**
 * Header.jsx
 * ----------
 * Barre de navigation fixe — identité occitane premium.
 * Glassmorphism au scroll, hamburger mobile, CTA rouge occitan.
 * Pas de dark mode toggle (l'alternance section fait le rythme).
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';
import { TEL_LIEN } from '../../data/site';

const NAV_LINKS = [
  { href: '#portfolio', label: 'Réalisations' },
  { href: '#services', label: 'Services' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '#a-propos', label: 'À propos' },
  { href: '#faq', label: 'FAQ' },
];

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = '!@#$%^&*():{};|,.<>/?';

/* Le brouillage n'a de sens qu'avec une souris : sur écran tactile, un appui déclenche un faux survol */
const peutBrouiller = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function ScrambleLink({ href, children, className = '', style }) {
  const intervalRef = useRef(null);
  const [text, setText] = useState(children);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const scramble = () => {
    if (!peutBrouiller()) return;
    clearInterval(intervalRef.current);
    let pos = 0;
    intervalRef.current = setInterval(() => {
      const scrambled = children
        .split('')
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) return char;
          if (char === ' ') return ' ';
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');
      setText(scrambled);
      pos++;
      if (pos >= children.length * CYCLES_PER_LETTER) {
        clearInterval(intervalRef.current);
        setText(children);
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current);
    setText(children);
  };

  return (
    <a
      href={href}
      className={`${className} reveal`}
      style={style}
      aria-label={children}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
    >
      {text}
    </a>
  );
}

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
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} reveal`}
      style={{ '--reveal-y': '-100px', '--reveal-duration': '0.5s' }}
    >
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a
          href="#accueil"
          className={`${styles.logo} reveal`}
          aria-label="Retour à l'accueil"
          style={{ '--reveal-y': '8px', '--reveal-duration': '0.5s', '--reveal-delay': '0.1s' }}
        >
          <span className={styles.logoAccent}>Zdr</span>_DEV
        </a>

        {/* Navigation — centrée */}
        <nav className={styles.centerNav} aria-label="Navigation principale">
          {NAV_LINKS.map(({ href, label }, i) => (
            <ScrambleLink
              key={href}
              href={href}
              style={{ '--reveal-y': '-15px', '--reveal-duration': '0.4s', '--reveal-delay': `${0.2 + i * 0.06}s` }}
            >
              {label}
            </ScrambleLink>
          ))}
        </nav>

        {/* Contact — bouton à droite */}
        <ScrambleLink
          href="#contact"
          className={styles.rightLink}
          style={{ '--reveal-y': '-15px', '--reveal-duration': '0.4s', '--reveal-delay': '0.1s' }}
        >
          Contact
        </ScrambleLink>

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
                <a href={`tel:${TEL_LIEN}`} onClick={handleLinkClick}>Appeler</a>
              </li>
              <li>
                <a href="#contact" onClick={handleLinkClick} className={styles.mobileCta}>
                  Contact
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
