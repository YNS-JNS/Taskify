import type { Task } from '@/features/tasks/tasksSlice'; // On importe notre type Task
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

// Zoom sur TypeScript : Définir les props d'un composant.
// On crée une interface pour décrire les "props" que notre composant attend.
// Ici, TaskItem DOIT recevoir une prop `task` qui est de type `Task`.
interface TaskItemProps {
  task: Task;
}

// `React.FC` (Function Component) est un type générique qui nous aide à typer
// nos composants fonctionnels. En lui passant `<TaskItemProps>`, on s'assure
// que les props reçues par le composant sont bien conformes à notre interface.
const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  console.log('TaskItem :', task);

  return (
    <div className='flex items-center justify-between p-3 border-b'>
      <div className='flex items-center gap-3'>
        <Checkbox id={`task-${task.id}`} checked={task.completed} />
        <label
          htmlFor={`task-${task.id}`}
          className={`text-sm font-medium leading-none ${
            task.completed ? 'line-through text-muted-foreground' : ''
          }`}
          // Pour l'instant, on ne gère pas le changement. On le fera à l'étape 5.
        >
          {task.title}
        </label>
      </div>
      <Button className='ml-auto' variant='ghost' size='icon'>
        <Trash2 className='h-4 w-4 text-muted-foreground' />
        {/* Pour l'instant, le bouton ne fait rien. On le fera à l'étape 5. */}
      </Button>
    </div>
  );
};

export default TaskItem;
