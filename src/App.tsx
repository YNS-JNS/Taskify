// src/App.tsx

import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm'; // Import the new component

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center p-8">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-center">Taskify</h1>
        
        {/* Add the form component here */}
        <AddTaskForm /> 

        <TaskList />
      </div>
    </main>
  );
}

export default App;