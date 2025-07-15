import { configureStore } from '@reduxjs/toolkit';

// configureStore crée un store Redux, et configure automatiquement
// l'extension Redux DevTools pour que vous puissiez inspecter le store pendant le développement.
export const store = configureStore({
  reducer: {},
});

// Zoom sur TypeScript :
// Nous allons déduire les types `RootState` et `AppDispatch` directement du store.
// C'est la meilleure pratique pour avoir un typage robuste.

// `ReturnType<typeof store.getState>`: Ceci prend la fonction `store.getState` et en extrait son type de retour.
// Le résultat est le type complet de notre état Redux.
export type RootState = ReturnType<typeof store.getState>;

// `typeof store.dispatch`: Ceci nous donne le type de la fonction `dispatch` du store,
// qui inclut tous les middlewares configurés (comme Thunk, qui est là par défaut).
export type AppDispatch = typeof store.dispatch;