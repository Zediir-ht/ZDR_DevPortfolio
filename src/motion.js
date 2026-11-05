/**
 * motion.js
 * ---------
 * Courbes et durées partagées par toutes les animations Framer Motion.
 * Les équivalents CSS sont dans global.css (--ease-out, --ease-in-out).
 *
 * - EASE_OUT : entrées et sorties (démarre vite, réactif). Courbe par défaut.
 * - EASE_IN_OUT : déplacements d'éléments déjà à l'écran.
 */
export const EASE_OUT = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT = [0.77, 0, 0.175, 1];

export const DUREE = {
  rapide: 0.2,
  normale: 0.35,
  lente: 0.6,
};
