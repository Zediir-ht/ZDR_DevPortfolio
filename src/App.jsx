/**
 * App.jsx
 * -------
 * Composant racine : assemble toutes les sections du portfolio.
 * La structure est intentionnellement plate pour le SEO (un seul
 * flux de contenu dans la page).
 */
import { useState, useCallback, useEffect, useRef } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Legal from './components/Legal/Legal';

/* ── Cursor Glow — cercle de lumière subtile suivant la souris ── */
function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Test touch device
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId = 0;
    const onMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
        el.style.opacity = '1';
      });
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

export default function App() {
  const [legalPage, setLegalPage] = useState(null); // 'mentions' | 'confidentialite' | null
  const closeLegal = useCallback(() => setLegalPage(null), []);

  return (
    <>
      <CursorGlow />
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

