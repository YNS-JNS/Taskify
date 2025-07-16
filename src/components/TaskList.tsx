import { useAppSelector } from '@/app/hooks'; // Notre hook typé !
import TaskItem from './TaskItem'; // Notre sélecteur !
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { selectTasks } from '@/features/tasks/tasksSlice';

const TaskList = () => {
  // C'est ici que la connexion avec Redux se fait.
  // `useAppSelector` prend notre sélecteur en argument.
  // Il s'abonne à la partie de l'état retournée par `selectTasks`.
  // Chaque fois que cette partie de l'état changera, ce composant sera re-rendu automatiquement.
  const tasks = useAppSelector(selectTasks);
  console.log('Tasks from the store:', tasks);

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Tasks list</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <div>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <p className='text-center'>No tasks</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
