import { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = event => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = event => {
    event.preventDefault();
    onAddTodo(todoTitle);
    setTodoTitle('');
  };

  return (
    <form className='add-todo-form' onSubmit={handleAddTodo}>
      <label htmlFor='todo-title'>Title: </label>
      <input id='todo-title' name='title' value={todoTitle} onChange={handleTitleChange} />
      <button>Add</button>
    </form>
  );
}

export default AddTodoForm;