/**
 * scrollToId.js
 * -------------
 * Défilement vers une section (liens du menu, #faq, #contact...).
 *
 * Les sections utilisent content-visibility: auto : tant qu'elles n'ont pas été
 * dessinées, leur hauteur n'est qu'une estimation. Un défilement fluide sur une
 * longue distance s'arrêtait donc avant la cible (jusqu'à 2 500 px sur mobile)
 * parce que la page s'allongeait pendant le trajet. Ici :
 *  - cible lointaine : saut direct (la cible est mesurée une fois dessinée) ;
 *  - cible proche : défilement fluide ;
 *  - dans les deux cas, recalage si la page a bougé entre-temps, sauf si le
 *    visiteur a repris la main (molette, toucher, clavier).
 */
const RECALAGES_MS = [350, 800, 1500];

export function scrollToId(id) {
  const cible = document.getElementById(id);
  if (!cible) return () => {};

  const loin = Math.abs(cible.getBoundingClientRect().top) > window.innerHeight * 1.5;
  cible.scrollIntoView({ behavior: loin ? 'instant' : 'smooth' });

  const timers = [];
  const arreter = () => {
    timers.forEach(clearTimeout);
    ['wheel', 'touchstart', 'keydown'].forEach((e) => window.removeEventListener(e, arreter));
  };
  ['wheel', 'touchstart', 'keydown'].forEach((e) => window.addEventListener(e, arreter, { passive: true }));

  RECALAGES_MS.forEach((ms, i) => {
    timers.push(setTimeout(() => {
      // Une cible tout en bas de page ne peut pas atteindre le haut de l'écran : rien à recaler.
      const enBas = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (!enBas && Math.abs(cible.getBoundingClientRect().top) > 4) {
        cible.scrollIntoView({ behavior: 'instant' });
      }
      if (i === RECALAGES_MS.length - 1) arreter();
    }, ms));
  });

  return arreter;
}
