/**
 * App.jsx
 * -------
 * Composant racine — architecture homepage single-page premium.
 * Alternance : Hero(dark) > About(light) > Services(dark)
 *            > WhyMe(dark) > Contact(light) > CTAFinal(dark) > Footer(dark)
 */
import { lazy, Suspense, useState, useCallback } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';

/* Below-fold : chargement différé pour un premier affichage ultra-rapide */
const About    = lazy(() => import('./components/About/About'));
const Services = lazy(() => import('./components/Services/Services'));
const WhyMe    = lazy(() => import('./components/WhyMe/WhyMe'));
const Contact  = lazy(() => import('./components/Contact/Contact'));
const CTAFinal = lazy(() => import('./components/CTAFinal/CTAFinal'));
const Footer   = lazy(() => import('./components/Footer/Footer'));
const Legal    = lazy(() => import('./components/Legal/Legal'));

export default function App() {
  const [legalPage, setLegalPage] = useState(null);
  const closeLegal = useCallback(() => setLegalPage(null), []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Services />
          <WhyMe />
          <Contact />
          <CTAFinal />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer onOpenLegal={setLegalPage} />
        <Legal page={legalPage} onClose={closeLegal} />
      </Suspense>
    </>
  );
}
