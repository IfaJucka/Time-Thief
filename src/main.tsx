import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './ui/styles/darkChrono.css';
import { App } from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root container #root was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
