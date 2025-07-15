import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 
    Le composant Provider rend le store Redux disponible
    à tous les composants enfants qui en ont besoin. 
    */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
