/**
 * App.jsx
 * -------
 * Composant racine : assemble toutes les sections du portfolio.
 * La structure est intentionnellement plate pour le SEO (un seul
 * flux de contenu dans la page).
 */
import { useState, useCallback } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Legal from './components/Legal/Legal';

export default function App() {
  const [legalPage, setLegalPage] = useState(null); // 'mentions' | 'confidentialite' | null
  const closeLegal = useCallback(() => setLegalPage(null), []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer onOpenLegal={setLegalPage} />
      <Legal page={legalPage} onClose={closeLegal} />
    </>
  );
}
