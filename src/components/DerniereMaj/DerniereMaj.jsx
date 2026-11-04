/**
 * DerniereMaj.jsx
 * ---------------
 * « Dernière mise à jour : 4 novembre 2026 » avec une balise <time>.
 * La date vient de src/data/site.js et est formatée en UTC pour que le rendu
 * soit identique au pré-rendu et dans le navigateur.
 */
import { DATE_MAJ } from '../../data/site';

const libelle = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'UTC' })
  .format(new Date(`${DATE_MAJ}T00:00:00Z`));

export default function DerniereMaj({ className }) {
  return (
    <p className={className}>
      Dernière mise à jour : <time dateTime={DATE_MAJ}>{libelle}</time>
    </p>
  );
}
