import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

/**
 * @interface Task
 * @description Définit la structure de données pour un seul objet Tâche.
 * En utilisant une interface, nous assurons que chaque tâche dans notre application
 * aura toujours ces trois propriétés avec les bons types.
 */
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

/**
 * @interface TasksState
 * @description Définit la forme de l'état pour cette "slice" (tranche) spécifique.
 * Notre état contient une seule propriété, `tasks`, qui est un tableau d'objets `Task`.
 */
interface TasksState {
  tasks: Task[];
}

// L'état initial de notre slice. Il est de type `TasksState`.
// Nous le remplissons avec quelques données pour que l'application ne soit pas vide au démarrage.
const initialState: TasksState = {
  tasks: [
    { id: 1, title: 'Learn Redux', completed: true },
    { id: 2, title: 'Learn RTK Query', completed: false },
    { id: 3, title: 'Learn Tailwind', completed: false },
  ],
};

/**
 * createSlice est le cœur de Redux Toolkit pour la gestion d'état.
 * Il accepte un état initial, un objet de "reducers", et un nom de slice,
 * et génère automatiquement les créateurs d'actions et le reducer principal pour cette slice.
 */
const tasksSlice = createSlice({
  // `name` est un identifiant pour cette slice. Il est utilisé pour préfixer les types d'actions générées
  // (par exemple, 'tasks/addTask').
  name: 'tasks',

  // `initialState` est l'état que cette slice aura au chargement de l'application.
  initialState,

  // `reducers` est un objet où chaque clé est le nom d'une action, et la valeur est la fonction
  // (le "reducer") qui met à jour l'état en réponse à cette action.
  reducers: {
    /**
     * Ajoute une nouvelle tâche à la liste.
     * @param state - L'état actuel de la slice. RTK (avec Immer) nous permet de le "muter" directement.
     * @param action - L'objet action. `payload` contient les données passées lors du dispatch.
     *                 On type le payload comme `{ title: string }` pour être explicite et scalable.
     */
    addTask: (state, action: PayloadAction<{ title: string }>) => {
      const { title } = action.payload;
      const newTask: Task = {
        id: Date.now(), // Utilisation de Date.now() pour un ID unique simple (non recommandé en production)
        title,
        completed: false,
      };
      state.tasks.push(newTask);
    },

    /**
     * Inverse l'état `completed` d'une tâche existante.
     * @param payload - Un objet contenant l' `id` de la tâche à modifier.
     */
    toggleTask: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    },

    /**
     * Supprime une tâche de la liste.
     * @param payload - Un objet contenant l' `id` de la tâche à supprimer.
     */
    deleteTask: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      // `.filter()` retourne un nouveau tableau, ce qui est une manière immuable de mettre à jour l'état.
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },

    /**
     * Modifie le titre d'une tâche existante.
     * @param payload - Un objet contenant l' `id` de la tâche et son nouveau `title`.
     */
    editTask: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const { id, title } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = title;
      }
    },
  },
});

// `tasksSlice.actions` est un objet où RTK a automatiquement créé des fonctions "action creator"
// pour chaque reducer que nous avons défini. On les exporte pour les utiliser dans nos composants.
export const { addTask, toggleTask, deleteTask, editTask } = tasksSlice.actions;

// Un "sélecteur" est une fonction qui extrait des données de l'état global.
// C'est une bonne pratique pour découpler les composants de la structure exacte de l'état.
export const selectTasks = (state: RootState) => state.tasks.tasks;

// On exporte le reducer complet généré par `createSlice`.
// Ce reducer sera combiné avec d'autres dans le store principal.
export default tasksSlice.reducer;
