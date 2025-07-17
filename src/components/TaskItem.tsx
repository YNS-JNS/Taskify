// src/components/TaskItem.tsx

import { type Task, toggleTask, deleteTask, editTask } from '@/features/tasks/tasksSlice';
import { useAppDispatch } from '@/app/hooks';
import { useState, useRef, useEffect, FC } from 'react';

import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Trash2 } from 'lucide-react';

/**
 * @interface TaskItemProps
 * @description Définit les propriétés (props) attendues par le composant TaskItem.
 * Il doit recevoir un objet `task` qui correspond à notre interface `Task`.
 */
interface TaskItemProps {
  task: Task;
}

/**
 * @component TaskItem
 * @description Un composant pour afficher une seule tâche.
 * Il gère son propre état pour le mode édition et dispatche les actions
 * Redux pour modifier, basculer ou supprimer la tâche.
 */
const TaskItem: FC<TaskItemProps> = ({ task }) => {
  // On déstructure les props de la tâche pour un accès plus facile.
  const { id, title, completed } = task;

  // Récupération de la fonction `dispatch` du store Redux via notre hook typé.
  const dispatch = useAppDispatch();

  // --- États locaux pour la gestion de l'UI ---
  // `isEditing` est un booléen qui détermine si on affiche le label ou le champ de saisie.
  const [isEditing, setIsEditing] = useState(false);
  // `newTitle` stocke la valeur actuelle du champ de saisie pendant l'édition.
  const [newTitle, setNewTitle] = useState(title);

  // `useRef` nous donne un accès direct à l'élément <input> du DOM.
  // Utile pour des opérations impératives comme `.focus()`.
  const inputRef = useRef<HTMLInputElement>(null);

  // --- Gestionnaires d'événements ---
  const handleToggle = () => dispatch(toggleTask({ id }));
  const handleDelete = () => dispatch(deleteTask({ id }));

  // Gère la soumission de l'édition.
  const handleEdit = () => {
    // On dispatche l'action uniquement si le titre a changé et n'est pas vide.
    if (newTitle.trim() && newTitle.trim() !== title) {
      dispatch(editTask({ id: id, title: newTitle.trim() }));
    }
    // On sort toujours du mode édition après une tentative de sauvegarde.
    setIsEditing(false);
  };

  // --- Effet de bord pour l'ergonomie ---
  // Ce `useEffect` s'exécute chaque fois que `isEditing` change.
  useEffect(() => {
    // Si on entre en mode édition, on met automatiquement le focus sur l'input.
    // L'effet s'exécute APRÈS que React a mis à jour le DOM, garantissant que `inputRef.current` existe.
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className='flex items-center justify-between p-3 border-b'>
      <div className='flex items-center gap-3 flex-grow mr-2'>
        <Checkbox id={`task-${id}`} checked={completed} onCheckedChange={handleToggle} />

        {/* Rendu conditionnel : on affiche l'input si `isEditing` est true, sinon le label. */}
        {isEditing ? (
          <Input
            ref={inputRef}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            // `onBlur` se déclenche quand l'élément perd le focus (clic à l'extérieur).
            onBlur={handleEdit}
            // `onKeyDown` permet de gérer les pressions de touches.
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEdit(); // Sauvegarde avec Entrée
              if (e.key === 'Escape') {
                // Annule avec Échap
                setNewTitle(title); // Réinitialise le titre
                setIsEditing(false); // Quitte le mode édition
              }
            }}
            className='h-8'
          />
        ) : (
          <label
            htmlFor={`task-${id}`}
            // Passer en mode édition au double-clic.
            onDoubleClick={() => setIsEditing(true)}
            className={`text-sm font-medium leading-none cursor-pointer ${
              completed ? 'line-through text-muted-foreground' : ''
            }`}
          >
            {title}
          </label>
        )}
      </div>
      <Button
        variant='ghost'
        size='icon'
        onClick={handleDelete}
        aria-label={`Delete task: ${title}`}
      >
        <Trash2 className='h-4 w-4 text-muted-foreground' />
      </Button>
    </div>
  );
};

export default TaskItem;
