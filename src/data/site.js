/**
 * site.js
 * -------
 * Constantes communes au site : pages, pré-rendu, données structurées et sitemap.
 */

export const SITE_URL = 'https://zdrdev.fr';

/* Profil vérifiable de Corentin Mayrand (sameAs du Person dans le JSON-LD) */
export const LINKEDIN_URL = 'https://fr.linkedin.com/in/corentin-mayrand-090469ab';

/* Téléphone professionnel : affichage lisible et lien tel: (format international) */
export const TEL_AFFICHE = '06 32 91 53 77';
export const TEL_LIEN = '+33632915377';

/*
 * Date de dernière mise à jour du contenu (AAAA-MM-JJ).
 * À modifier à la main quand les textes ou les offres changent : elle est affichée
 * en bas des pages, ajoutée en dateModified dans le JSON-LD et dans le sitemap.
 */
export const DATE_MAJ = '2026-11-05';
