import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks'; // Our typed dispatch hook
import { addTask } from '../features/tasks/tasksSlice'; // The action creator we want to dispatch
import { Input } from './ui/input';
import { Button } from './ui/button';

const AddTaskForm = () => {
  // We use a local state `useState` to control the input field.
  // This state is specific to this component and doesn't need to be in Redux.
  const [title, setTitle] = useState('');

  // Here we get the `dispatch` function from our Redux store.
  // `useAppDispatch` is our typed version, which is recommended.
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page

    // Basic validation: don't add empty tasks.
    // `.trim()` removes whitespace from both ends of a string.
    if (title.trim()) {
      // This is the key part: we call `dispatch` and pass it the result
      // of our action creator `addTask`.
      // `addTask(title)` creates an action object like: { type: 'tasks/addTask', payload: 'The new task title' }
      dispatch(addTask(title.trim()));

      // Clear the input field after submitting.
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex w-full items-center space-x-2'>
      <Input
        type='text'
        placeholder='What needs to be done?'
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update local state on every keystroke
        aria-label='New task title'
      />
      <Button type='submit'>Add Task</Button>
    </form>
  );
};

export default AddTaskForm;
