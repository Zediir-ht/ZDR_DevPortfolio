/**
 * sanitize.js
 * -----------
 * Utilitaires de sécurité : protection contre XSS et injections
 * dans les champs utilisateur (formulaire de contact).
 */

/**
 * Supprime les balises HTML / script d'une chaîne.
 * @param {string} str
 * @returns {string}
 */
export function stripTags(str) {
  return String(str).replace(/<[^>]*>/g, '');
}

/**
 * Nettoie complètement une entrée utilisateur :
 * 1. Supprime les balises HTML
 * 2. Trim les espaces
 * 3. Limite la longueur (défaut 1000 caractères)
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export function sanitizeInput(str, maxLength = 1000) {
  return stripTags(str).trim().slice(0, maxLength);
}

/**
 * Valide un e-mail avec une regex robuste.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
