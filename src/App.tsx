import TaskList from './components/TaskList';

function App() {
  return (
    <main className='min-h-screen bg-foreground text-foreground flex flex-col items-center p-8'>
      <div className='w-full max-w-md space-y-8'>
        <h1 className='font-bold text-3xl text-center'>Taskify</h1>
        <TaskList />
      </div>
    </main>
  );
}

export default App;
