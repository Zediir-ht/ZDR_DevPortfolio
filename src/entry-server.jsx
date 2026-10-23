/**
 * entry-server.jsx
 * ----------------
 * Rendu serveur utilisé au build (scripts/prerender.js) pour générer
 * le HTML statique de chaque route — lisible par Google sans JavaScript.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';

const tick = () => new Promise((resolve) => setTimeout(resolve, 20));

/*
 * renderToString n'attend pas les composants lazy : le premier passage
 * déclenche leurs imports, les suivants les rendent une fois résolus.
 * (renderToPipeableStream de React 18.3 corrompt les caractères UTF-8
 * coupés en bordure de buffer, d'où ce choix.)
 */
export async function render(url) {
  const renderOnce = () =>
    renderToString(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>
    );

  let html = renderOnce();
  for (let i = 0; i < 10; i += 1) {
    await tick();
    const next = renderOnce();
    if (next === html) return html;
    html = next;
  }
  throw new Error(`Rendu instable pour ${url}`);
}
