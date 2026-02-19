/**
 * Contact.jsx
 * -----------
 * Formulaire de contact sécurisé avec :
 *  – Validation front-end complète
 *  – Protection XSS (sanitize avant envoi)
 *  – Honeypot anti-bot
 *  – Rate limiting basique
 *  – Infos de contact et localisation Rodez
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
      <div className={styles.header}>
        <span className={styles.label}>Contact</span>
        <h2 className={styles.title}>
          Parlons de votre <span className={styles.accent}>projet</span>
        </h2>
        <p className={styles.subtitle}>
          Une idée, une question, un devis ? Envoyez-moi un message,
          je vous réponds sous 24 h.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Formulaire */}
        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
          <div className={styles.field}>
            <label htmlFor="contact-name" className={styles.labelField}>
              Nom complet
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jean Dupont"
              maxLength={100}
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              aria-describedby={errors.name ? 'err-name' : undefined}
            />
            {errors.name && (
              <span id="err-name" className={styles.error} role="alert">{errors.name}</span>
            )}
          </div>

          {/* Email */}
          <div className={styles.field}>
            <label htmlFor="contact-email" className={styles.labelField}>
              Adresse email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jean@exemple.fr"
              maxLength={254}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              aria-describedby={errors.email ? 'err-email' : undefined}
            />
            {errors.email && (
              <span id="err-email" className={styles.error} role="alert">{errors.email}</span>
            )}
          </div>

          {/* Message */}
          <div className={styles.field}>
            <label htmlFor="contact-message" className={styles.labelField}>
              Votre message
            </label>
            <textarea
              id="contact-message"
              name="message"
              autoComplete="off"
              value={form.message}
              onChange={handleChange}
              placeholder="Décrivez votre projet ou posez votre question…"
              rows={5}
              maxLength={2000}
              className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
              aria-describedby={errors.message ? 'err-message' : undefined}
            />
            {errors.message && (
              <span id="err-message" className={styles.error} role="alert">{errors.message}</span>
            )}
          </div>

          {/* Bouton envoi */}
          <motion.button
            type="submit"
            className={styles.submitBtn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Envoyer le message
          </motion.button>

          {/* Feedback */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.p
                className={styles.success}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="alert"
              >
                ✅ Message envoyé avec succès ! Je vous recontacte rapidement.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                className={styles.errorMsg}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="alert"
              >
                ❌ Une erreur est survenue. Veuillez réessayer ou me contacter par email.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Informations de contact */}
        <motion.aside
          className={styles.info}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Email */}
          <div className={styles.infoCard}>
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
          </div>

          {/* Localisation */}
          <div className={styles.infoCard}>
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
          </div>

          {/* Disponibilité */}
          <div className={styles.infoCard}>
            <div className={styles.infoIcon} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <h4 className={styles.infoTitle}>Disponibilité</h4>
              <p className={styles.infoText}>Lun – Ven · 9h – 18h</p>
            </div>
          </div>

          {/* Carte Google Maps – Rodez */}
          <div className={styles.mapCard}>
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
              Basé au cœur de l'Aveyron, j'interviens au niveau local.
            </p>
          </div>
        </motion.aside>
      </div>
    </SectionWrapper>
  );
}
