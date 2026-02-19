/**
 * sanitize.js
 * -----------
 * Utilitaires de sécurité : protection contre XSS et injections
 * dans les champs utilisateur (formulaire de contact).
 */

/**
 * Échappe les caractères HTML dangereux pour empêcher les attaques XSS.
 * @param {string} str — chaîne brute saisie par l'utilisateur
 * @returns {string} — chaîne échappée prête pour l'affichage
 */
export function escapeHtml(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return String(str).replace(/[&<>"'/]/g, (char) => map[char]);
}

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
