/**
 * AveyronMap.jsx
 * --------------
 * Carte animée des cantons de l'Aveyron.
 * Chaque canton apparaît progressivement au scroll,
 * avec un effet de survol qui met en valeur le canton
 * et affiche son nom. Les villes-clés sont signalées par des marqueurs.
 */
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './AveyronMap.module.css';
import aveyronRaw from './aveyron.svg?raw';

/* Dimensions du viewBox SVG */
const SVG_WIDTH = 2107;
const SVG_HEIGHT = 2278;

/* Noms lisibles pour chaque ID de canton */
const CANTON_LABELS = {
  '1201 Aubrac et Carladez': 'Aubrac & Carladez',
  '1202 Aveyron et Tarn': 'Aveyron & Tarn',
  '1203 Causse-Comtal': 'Causse-Comtal',
  '1204 Causses-Rougiers': 'Causses-Rougiers',
  '1205 Ceor-Ségala': 'Céor-Ségala',
  '1206 Enne et Alzou': 'Enne & Alzou',
  '1207 Lot et Dourdou': 'Lot & Dourdou',
  '1208 Lot et Montbazinois': 'Lot & Montbazinois',
  '1209 Lot et Palanges': 'Lot & Palanges',
  '1210 Lot et Truyère': 'Lot & Truyère',
  '1211 Millau-1': 'Millau-1',
  '1212 Millau-2': 'Millau-2',
  '1213 Monts du Réquistanais': 'Monts du Réquistanais',
  '1214 Nord-Lévezou': 'Nord-Lévezou',
  '1215 Raspes et Lévezou': 'Raspes & Lévezou',
  '1216 Rodez-1': 'Rodez-1',
  '1217 Rodez-2': 'Rodez-2',
  '1218 Rodez-Onet': 'Rodez-Onet',
  '1219 Saint-Affrique': 'Saint-Affrique',
  '1220 Tarn et Causses': 'Tarn & Causses',
  '1221 Vallon': 'Vallon',
  '1222 Villefranche-de-Rouergue': 'Villefranche-de-Rouergue',
  '1223 Villeneuvois et Villefranchois': 'Villeneuvois & Villefranchois',
};

export default function AveyronMap() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [hoveredCanton, setHoveredCanton] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, label: '' });

  /* Injecte le SVG et configure les cantons */
  useEffect(() => {
    if (!svgRef.current) return;

    // Injecter le SVG brut
    svgRef.current.innerHTML = aveyronRaw;

    const svg = svgRef.current.querySelector('svg');
    if (!svg) return;

    // S'assurer que le SVG prend tout l'espace
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.overflow = 'visible';

    // Appliquer les classes et les événements à chaque canton (path)
    const paths = svg.querySelectorAll('path[id]');
    paths.forEach((path, i) => {
      const cantonId = path.getAttribute('id');
      if (!CANTON_LABELS[cantonId]) return;

      path.classList.add(styles.canton);
      path.style.setProperty('--delay', `${i * 0.07}s`);

      path.addEventListener('mouseenter', (e) => {
        setHoveredCanton(cantonId);
        updateTooltip(e, cantonId);
      });

      path.addEventListener('mousemove', (e) => {
        updateTooltip(e, cantonId);
      });

      path.addEventListener('mouseleave', () => {
        setHoveredCanton(null);
        setTooltip((t) => ({ ...t, visible: false }));
      });
    });
  }, []);

  /* Ajoute/retire la classe d'animation quand le composant entre dans le viewport */
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current.querySelector('svg');
    if (!svg) return;

    const paths = svg.querySelectorAll('path[id]');
    paths.forEach((path) => {
      if (isInView) {
        path.classList.add(styles.visible);
      }
    });
  }, [isInView]);

  /* Met à jour la position du hover highlight */
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current.querySelector('svg');
    if (!svg) return;

    const paths = svg.querySelectorAll('path[id]');
    paths.forEach((path) => {
      const cantonId = path.getAttribute('id');
      if (!CANTON_LABELS[cantonId]) return;

      if (cantonId === hoveredCanton) {
        path.classList.add(styles.hovered);
      } else {
        path.classList.remove(styles.hovered);
      }
    });
  }, [hoveredCanton]);

  const updateTooltip = useCallback((e, cantonId) => {
    const rect = containerRef.current.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 12,
      label: CANTON_LABELS[cantonId] || cantonId,
    });
  }, []);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      {/* Titre */}
      <motion.div
        className={styles.mapHeader}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className={styles.mapTitle}>
         Ancré en <span className={styles.accent}>Aveyron</span>
        </h3>
        <p className={styles.mapSubtitle}>
          Je me déplace dans tout le département — Rodez, Millau, Villefranche,
          Decazeville, Espalion, Saint-Affrique… et partout entre les deux.
        </p>
      </motion.div>

      {/* Conteneur de la carte */}
      <motion.div
        className={styles.mapContainer}
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* SVG injecté */}
        <div
          ref={svgRef}
          className={`${styles.svgWrap} ${isInView ? styles.animating : ''}`}
        />

        {/* Tooltip au survol */}
        {tooltip.visible && (
          <div
            className={styles.tooltip}
            style={{
              left: tooltip.x,
              top: tooltip.y,
            }}
          >
            {tooltip.label}
          </div>
        )}
      </motion.div>
    </div>
  );
}
