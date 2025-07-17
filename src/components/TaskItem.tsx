import { deleteTask, editTask, toggleTask, type Task } from '@/features/tasks/tasksSlice'; // On importe notre type Task
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { useAppDispatch } from '@/app/hooks';
import { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';

// Zoom sur TypeScript : Définir les props d'un composant.
// On crée une interface pour décrire les "props" que notre composant attend.
// Ici, TaskItem DOIT recevoir une prop `task` qui est de type `Task`.
interface TaskItemProps {
  task : Task
}

// `React.FC` (Function Component) est un type générique qui nous aide à typer
// nos composants fonctionnels. En lui passant `<TaskItemProps>`, on s'assure
// que les props reçues par le composant sont bien conformes à notre interface.
const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { id, title, completed } = task;

  // État local pour gérer le mode édition
  const [isEditing, setIsEditing] = useState(false);

  // État local pour stocker la valeur de l'input pendant l'édition
  const [newTitle, setNewTitle] = useState(title);

  // Une ref pour pouvoir "focuser" l'input dès qu'il apparaît
  const inputRef = useRef<HTMLInputElement>(null);

  // Get the dispatch function, just like in the AddTaskForm
  const dispatch = useAppDispatch();

  // Handler for toggling the checkbox
  const handleToggle = () => {
    // Dispatch the `toggleTask` action, passing the task's ID as the payload.
    // TypeScript knows that `toggleTask` expects a `number` as its payload
    // because we defined it with `PayloadAction<number>` in our slice.
    dispatch(toggleTask({ id }));
  };

  // Handler for clicking the delete button
  const handleDelete = () => {
    // Dispatch the `deleteTask` action, also with the task's ID.
    dispatch(deleteTask({ id }));
  };

  // Fonction pour gérer la soumission de la modification
  const handleEdit = () => {
    // On ne sauvegarde que si le titre a changé et n'est pas vide
    if (newTitle.trim() && newTitle.trim() !== task.title) {
      dispatch(editTask({ id: id, title: newTitle.trim() }));
    }
    // On quitte le mode édition dans tous les cas
    setIsEditing(false);
  };

  // Hook pour focuser l'input quand on passe en mode édition
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className='flex items-center justify-between p-3 border-b'>
      <div className='flex items-center gap-3'>
        <Checkbox
          id={`task-${id}`}
          checked={completed}
          // The `onCheckedChange` prop is the correct event handler for Shadcn's Checkbox.
          // It gets called whenever the checked state changes.
          onCheckedChange={handleToggle}
        />
        {/* Affichage conditionnel : soit le label, soit l'input */}
        {isEditing ? (
          <Input
            ref={inputRef}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            // handleEdit est appelé quand on clique en dehors (onBlur)
            onBlur={handleEdit}
            // ou quand on appuie sur Entrée (onKeyDown)
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEdit();
              } else if (e.key === 'Escape') {
                // Optionnel : annuler avec la touche Échap
                setNewTitle(task.title);
                setIsEditing(false);
              }
            }}
            className='h-8'
          />
        ) : (
          <label
              // On active le mode édition au double-clic
              onDoubleClick={() => setIsEditing(true)}
            htmlFor={`task-${id}`}
            // We make the label clickable to also toggle the checkbox
            onClick={handleToggle}
            className={`text-sm font-medium leading-none ${
              completed ? 'line-through text-muted-foreground' : ''
            }`}
            // Pour l'instant, on ne gère pas le changement. On le fera à l'étape 5.
          >
            {title}
          </label>
        )}
      </div>
      <Button className='ml-auto' variant='ghost' size='icon' onClick={handleDelete}>
        <Trash2 className='h-4 w-4 text-muted-foreground' />
        {/* Pour l'instant, le bouton ne fait rien. On le fera à l'étape 5. */}
      </Button>
    </div>
  );
};

export default TaskItem;
