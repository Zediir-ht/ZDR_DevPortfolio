/**
 * App.jsx
 * -------
 * Composant racine — routing homepage + page /tarifs.
 */
import { lazy, Suspense, useState, useCallback, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';

/* Below-fold : chargement différé pour un premier affichage ultra-rapide */
const About      = lazy(() => import('./components/About/About'));
const Services   = lazy(() => import('./components/Services/Services'));
const PrixResume = lazy(() => import('./components/PrixResume/PrixResume'));
const WhyMe      = lazy(() => import('./components/WhyMe/WhyMe'));
const Contact    = lazy(() => import('./components/Contact/Contact'));
const CTAFinal   = lazy(() => import('./components/CTAFinal/CTAFinal'));
const Footer     = lazy(() => import('./components/Footer/Footer'));
const Legal      = lazy(() => import('./components/Legal/Legal'));
const Tarifs     = lazy(() => import('./pages/Tarifs/Tarifs'));

function HomePage({ onOpenLegal, legalPage, closeLegal }) {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      // Laisser le DOM se rendre avant de scroller
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [hash]);
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Services />
          <PrixResume />
          <WhyMe />
          <Contact />
          <CTAFinal />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer onOpenLegal={onOpenLegal} />
        <Legal page={legalPage} onClose={closeLegal} />
      </Suspense>
    </>
  );
}

export default function App() {
  const [legalPage, setLegalPage] = useState(null);
  const closeLegal = useCallback(() => setLegalPage(null), []);

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onOpenLegal={setLegalPage}
              legalPage={legalPage}
              closeLegal={closeLegal}
            />
          }
        />
        <Route path="/tarifs" element={<Tarifs />} />
      </Routes>
    </Suspense>
  );
}
