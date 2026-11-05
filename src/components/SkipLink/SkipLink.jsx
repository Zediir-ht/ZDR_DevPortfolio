/**
 * SkipLink.jsx
 * ------------
 * Lien « Aller au contenu » : invisible, il apparaît au premier appui sur Tab
 * et évite de parcourir tout le menu au clavier. Style dans global.css (.skip-link).
 * La cible est l'élément <main id="contenu">.
 */
export default function SkipLink() {
  return (
    <a href="#contenu" className="skip-link">
      Aller au contenu
    </a>
  );
}
