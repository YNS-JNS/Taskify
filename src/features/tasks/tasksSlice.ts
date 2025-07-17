import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

// On définit l'interface TypeScript pour une seule tâche.
// C'est la même que dans l'exemple précédent.
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// On définit l'interface pour l'état de notre slice.
// On utilise `Task[]` pour indiquer que `tasks` est un tableau de tâches.
// `tasks` est initialisé comme un tableau vide.
interface TasksState {
  tasks: Task[];
}

// On définit l'état initial de notre slice.
// Au début, on a quelques tâches pour l'exemple.

const initialState: TasksState = {
  tasks: [
    { id: 1, title: 'Learn Redux', completed: true },
    { id: 2, title: 'Learn RTK Query', completed: false },
    { id: 3, title: 'Learn Tailwind', completed: false },
  ],
};

// On définit notre slice.
// `createSlice` est une fonction fournie par Redux Toolkit qui crée automatiquement
// les actions et les reducers pour nous.
// On lui passe un objet avec les propriétés suivantes :
// - `name`: Le nom de notre slice.
// - `initialState`: L'état initial de notre slice.
// - `reducers`: Un objet contenant les différentes actions que nous voulons gérer.
const tasksSlice = createSlice({
  name: 'tasks', // Nom de la slice, utilisé dans les types d'actions
  initialState, // L'état de départ
  // Les `reducers` sont des fonctions qui décrivent comment l'état peut être modifié.
  reducers: {
    // Reducer pour ajouter une tâche.
    // `PayloadAction<string>` signifie que l'action attendra une charge utile (payload) de type string (le titre de la tâche).
    addTask: (state, action: PayloadAction<string>) => {
      const newTask = {
        id: Date.now(), // ID unique
        title: action.payload,
        completed: false,
      };
      // Grâce à Immer (inclus dans RTK), on peut écrire du code qui "mute" l'état.
      // En réalité, Immer crée une copie pour nous en arrière-plan.
      // C'est beaucoup plus simple que de faire `...state` manuellement.
      state.tasks.push(newTask);
    },
    // Reducer pour basculer l'état d'une tâche.
    // `PayloadAction<number>` signifie que l'action attendra une charge utile (payload) de type number (l'ID de la tâche).
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    // Reducer pour supprimer une tâche.
    // Il attend aussi l'ID de la tâche en payload.
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
  },
});

// RTK génère automatiquement des "Action Creators" pour chaque reducer.
// On les exporte pour pouvoir les utiliser dans nos composants (via `dispatch`).
export const { addTask, toggleTask, deleteTask, editTask } = tasksSlice.actions;

// On crée un "sélecteur" pour facilement récupérer la liste des tâches depuis n'importe quel composant.
// `state: RootState` est typé pour que TypeScript connaisse la forme de notre état global.
export const selectTasks = (state: RootState) => state.tasks.tasks;

// On exporte le reducer généré par la slice.
// C'est ce que le store utilisera.
export default tasksSlice.reducer;

/* 
###############################################################################
 Explication :
 . PayloadAction<T> : C'est un type de RTK très utile. Utilisez-le pour typer la charge utile (payload) de vos actions. 
 Cela vous assure de ne jamais dispatcher une action avec le mauvais type de données.
 
 . Sélecteurs : Créer des fonctions select... comme selectTasks est une bonne pratique. 
 Si un jour la structure de votre état change (ex: state.tasks.allTasks), vous n'aurez qu'à modifier le sélecteur à un seul endroit, au lieu de changer tous les composants qui l'utilisent.

 . Organisation par "feature" : Mettre tout ce qui concerne les tâches (slice, composants, etc.) 
 dans un dossier src/features/tasks est une façon très populaire et scalable d'organiser les applications Redux

############################################################################### 
*/
