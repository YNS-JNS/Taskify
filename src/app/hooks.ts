import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from './store';

// Zoom sur TypeScript :
// On crée des versions typées des hooks `useDispatch` et `useSelector`.
// Cela nous évite d'avoir à importer `RootState` et `AppDispatch` dans chaque composant.

// `useAppDispatch` est un hook qui a déjà le bon type pour notre `dispatch`
// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppDispatch: () => AppDispatch = useDispatch;

// `useAppSelector` est une version de `useSelector` qui connaît déjà la forme de notre état global (`RootState`).
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;