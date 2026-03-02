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

const NAV_LINKS = [
  { href: '#a-propos', label: 'A propos' },
  { href: '#contact', label: 'Contact' },
];

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = '!@#$%^&*():{};|,.<>/?';

function ScrambleLink({ href, children, className, variants, ...props }) {
  const intervalRef = useRef(null);
  const [text, setText] = useState(children);

  const scramble = () => {
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
    <motion.a
      href={href}
      className={className}
      variants={variants}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      {...props}
    >
      {text}
    </motion.a>
  );
}

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

        {/* A propos — centré */}
        <motion.nav
          className={styles.centerNav}
          aria-label="Navigation principale"
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <ScrambleLink href="#a-propos" variants={navItemVariants}>A propos</ScrambleLink>
        </motion.nav>

        {/* Contact — à droite */}
        <ScrambleLink
          href="#contact"
          className={styles.rightLink}
          variants={navItemVariants}
          initial="hidden"
          animate="visible"
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
