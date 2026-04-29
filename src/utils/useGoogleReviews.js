/**
 * useGoogleReviews.js
 * -------------------
 * Charge les avis Google Places d'une fiche Google Business.
 * Utilise la Places API (New) qui supporte les appels CORS côté client.
 *
 * Stratégie :
 *  1. Si VITE_GOOGLE_PLACE_ID est défini → Place Details direct.
 *  2. Sinon → Text Search "ZDR DEV Rodez" pour trouver le Place ID,
 *     puis Place Details.
 *  3. En cas d'erreur ou d'absence d'avis → retourne null (fallback statique).
 */

import { useState, useEffect } from 'react';

const API_KEY  = import.meta.env.VITE_GOOGLE_API_KEY;
const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;

const PLACES_BASE = 'https://places.googleapis.com/v1';

async function searchPlaceId() {
  const res = await fetch(`${PLACES_BASE}/places:searchText`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName',
    },
    body: JSON.stringify({ textQuery: 'ZDR DEV Rodez Aveyron' }),
  });
  if (!res.ok) throw new Error(`Text Search ${res.status}`);
  const data = await res.json();
  return data.places?.[0]?.id ?? null;
}

async function fetchReviews(placeId) {
  const fields = 'reviews,displayName,userRatingCount,rating';
  const res = await fetch(`${PLACES_BASE}/places/${placeId}?fields=${fields}`, {
    headers: {
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': fields,
    },
  });
  if (!res.ok) throw new Error(`Place Details ${res.status}`);
  return res.json();
}

/**
 * @returns {{ reviews: Array|null, rating: number|null, total: number|null, loading: boolean, error: string|null }}
 */
export function useGoogleReviews() {
  const [state, setState] = useState({
    reviews: null,
    rating: null,
    total: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!API_KEY) {
      setState(s => ({ ...s, loading: false, error: 'Clé API manquante' }));
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        let pid = PLACE_ID || null;
        if (!pid) {
          pid = await searchPlaceId();
        }
        if (!pid) throw new Error('Fiche Google introuvable');

        const place = await fetchReviews(pid);

        if (cancelled) return;

        const reviews = (place.reviews ?? []).map((r) => ({
          nom: r.authorAttribution?.displayName ?? 'Client',
          photo: r.authorAttribution?.photoUri ?? null,
          note: r.rating ?? 5,
          texte: r.text?.text ?? '',
          date: r.relativePublishTimeDescription ?? '',
        }));

        setState({
          reviews: reviews.length ? reviews : null,
          rating: place.rating ?? null,
          total: place.userRatingCount ?? null,
          loading: false,
          error: null,
        });
      } catch (err) {
        if (!cancelled) {
          setState(s => ({ ...s, loading: false, error: err.message }));
        }
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return state;
}
