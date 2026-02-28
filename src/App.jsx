/**
 * App.jsx
 * -------
 * Composant racine — architecture homepage single-page premium.
 * Alternance : Hero(dark) > About(light) > Services(dark)
 *            > WhyMe(dark) > Contact(light) > CTAFinal(dark) > Footer(dark)
 */
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import WhyMe from './components/WhyMe/WhyMe';
import Contact from './components/Contact/Contact';
import CTAFinal from './components/CTAFinal/CTAFinal';
import Footer from './components/Footer/Footer';
import Legal from './components/Legal/Legal';

export default function App() {
  const [legalPage, setLegalPage] = useState(null);
  const closeLegal = useCallback(() => setLegalPage(null), []);

  const curtainVariants = {
    initial: { y: "0%" },
    animate: { y: "-100%", transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 } }
  };

  return (
    <>
      {/* Rideau d'apparition Premium */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={curtainVariants}
        style={{
          position: "fixed", inset: 0, zIndex: 100000,
          background: "var(--c-accent)", pointerEvents: "none"
        }}
        aria-hidden="true"
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyMe />
        <Contact />
        <CTAFinal />
      </main>
      <Footer onOpenLegal={setLegalPage} />
      <Legal page={legalPage} onClose={closeLegal} />
    </>
  );
}
