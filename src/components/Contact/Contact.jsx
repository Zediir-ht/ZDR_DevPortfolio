/**
 * Contact.jsx
 * -----------
 * Formulaire de contact sécurisé avec :
 *  – Validation front-end complète
 *  – Protection XSS (sanitize avant envoi)
 *  – Honeypot anti-bot
 *  – Rate limiting basique
 *  – Infos de contact et localisation Rodez
 *  – Animations staggered, shimmer bouton, info cards slide
 */
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import { sanitizeInput, isValidEmail } from '../../utils/sanitize';
import styles from './Contact.module.css';

/* État initial du formulaire */
const INITIAL_FORM = { name: '', email: '', message: '', honeypot: '' };

/* Limite d'envois pour éviter les abus (par session) */
const MAX_SUBMISSIONS = 5;

/* Header stagger */
const headerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const headerItemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
};

/* Form fields stagger */
const formContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fieldVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};

/* Info cards stagger (from right) */
const infoContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const infoCardVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 14 } },
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const submitCount = useRef(0);

  /**
   * Met à jour un champ du formulaire.
   * On sanitize en temps réel pour éviter les injections.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Efface l'erreur du champ dès que l'utilisateur le modifie
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  /**
   * Valide les champs et retourne les erreurs éventuelles.
   */
  const validate = () => {
    const errs = {};
    const cleanName = sanitizeInput(form.name, 100);
    const cleanEmail = sanitizeInput(form.email, 254);
    const cleanMessage = sanitizeInput(form.message, 2000);

    if (!cleanName || cleanName.length < 2) {
      errs.name = 'Veuillez entrer votre nom (min. 2 caractères).';
    }
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      errs.email = 'Veuillez entrer une adresse email valide.';
    }
    if (!cleanMessage || cleanMessage.length < 10) {
      errs.message = 'Votre message doit contenir au moins 10 caractères.';
    }
    return errs;
  };

  /**
   * Gère la soumission du formulaire.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot : si rempli, c'est un bot
    if (form.honeypot) return;

    // Rate limiting
    if (submitCount.current >= MAX_SUBMISSIONS) {
      setStatus('error');
      return;
    }

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Sanitize les données avant « envoi »
    const payload = {
      name: sanitizeInput(form.name, 100),
      email: sanitizeInput(form.email, 254),
      message: sanitizeInput(form.message, 2000),
    };

    // Envoi via Formspree
    try {
      const res = await fetch('https://formspree.io/f/xnjbzypl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        submitCount.current += 1;
        setStatus('success');
        setForm(INITIAL_FORM);
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <SectionWrapper id="contact">
      {/* En-tête */}
      <motion.div
        className={styles.header}
        variants={headerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.span className={styles.label} variants={headerItemVariants}>Contact</motion.span>
        <motion.h2 className={styles.title} variants={headerItemVariants}>
          Discutons de votre <span className={styles.accent}>projet</span>
        </motion.h2>
        <motion.p className={styles.subtitle} variants={headerItemVariants}>
          Dites-moi simplement ce que vous faites et ce dont vous avez besoin.
          Je vous recontacte sous 24 h, on en discute comme des voisins.
        </motion.p>
      </motion.div>

      <div className={styles.grid}>
        {/* Formulaire — stagger des champs */}
        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          variants={formContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Honeypot invisible */}
          <input
            type="text"
            name="honeypot"
            value={form.honeypot}
            onChange={handleChange}
            className={styles.honeypot}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Nom */}
          <motion.div className={styles.field} variants={fieldVariants}>
            <label htmlFor="contact-name" className={styles.labelField}>
              Votre nom
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ex : Marie Martin"
              maxLength={100}
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              aria-describedby={errors.name ? 'err-name' : undefined}
            />
            {errors.name && (
              <span id="err-name" className={styles.error} role="alert">{errors.name}</span>
            )}
          </motion.div>

          {/* Email */}
          <motion.div className={styles.field} variants={fieldVariants}>
            <label htmlFor="contact-email" className={styles.labelField}>
              Votre email (pour vous recontacter)
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="marie@moncommerce.fr"
              maxLength={254}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              aria-describedby={errors.email ? 'err-email' : undefined}
            />
            {errors.email && (
              <span id="err-email" className={styles.error} role="alert">{errors.email}</span>
            )}
          </motion.div>

          {/* Message */}
          <motion.div className={styles.field} variants={fieldVariants}>
            <label htmlFor="contact-message" className={styles.labelField}>
              Parlez-moi de votre activité et de vos besoins
            </label>
            <textarea
              id="contact-message"
              name="message"
              autoComplete="off"
              value={form.message}
              onChange={handleChange}
              placeholder="Ex : Je suis boulanger à Rodez et j'aimerais un site pour présenter mes produits et prendre des commandes…"
              rows={5}
              maxLength={2000}
              className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
              aria-describedby={errors.message ? 'err-message' : undefined}
            />
            {errors.message && (
              <span id="err-message" className={styles.error} role="alert">{errors.message}</span>
            )}
          </motion.div>

          {/* Bouton envoi — shimmer + scale */}
          <motion.div variants={fieldVariants}>
            <motion.button
              type="submit"
              className={styles.submitBtn}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>☕ Discuter de mon projet</span>
            </motion.button>
          </motion.div>

          {/* Feedback */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.p
                className={styles.success}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 150, damping: 12 }}
                role="alert"
              >
                ✅ C'est envoyé ! Je vous recontacte sous 24 h pour en discuter.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                className={styles.errorMsg}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 150, damping: 12 }}
                role="alert"
              >
                ❌ Une erreur est survenue. Veuillez réessayer ou me contacter par email.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Informations de contact — stagger from right */}
        <motion.aside
          className={styles.info}
          variants={infoContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Email */}
          <motion.div className={styles.infoCard} variants={infoCardVariants}>
            <div className={styles.infoIcon} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4l-10 8L2 4" />
              </svg>
            </div>
            <div>
              <h4 className={styles.infoTitle}>Email</h4>
              <a href="mailto:corentin.mayrand@gmail.com" className={styles.infoLink}>
                corentin.mayrand@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Localisation */}
          <motion.div className={styles.infoCard} variants={infoCardVariants}>
            <div className={styles.infoIcon} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <h4 className={styles.infoTitle}>Localisation</h4>
              <p className={styles.infoText}>Rodez, Aveyron (12)</p>
            </div>
          </motion.div>

          {/* Disponibilité */}
          <motion.div className={styles.infoCard} variants={infoCardVariants}>
            <div className={styles.infoIcon} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <h4 className={styles.infoTitle}>Disponibilité</h4>
              <p className={styles.infoText}>Lun – Ven · 9h – 18h<br />RDV possible à Rodez, Millau ou en visio</p>
            </div>
          </motion.div>

          {/* Carte Google Maps – Rodez */}
          <motion.div className={styles.mapCard} variants={infoCardVariants}>
            <iframe
              className={styles.mapIframe}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45678.12345678!2d2.5734!3d44.3497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebc8fddf3c5cd%3A0x406f69c2f3e86a0!2sRodez!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation Rodez, Aveyron"
            />
            <p className={styles.mapText}>
              Basé à Rodez, j'interviens dans tout l'Aveyron : Millau,
              Villefranche-de-Rouergue, Decazeville, Espalion…
              On peut se retrouver autour d'un café pour discuter de votre projet !
            </p>
          </motion.div>
        </motion.aside>
      </div>
    </SectionWrapper>
  );
}
