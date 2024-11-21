import { useState } from 'react';
import InputWithLabel from './InputWithLabel'

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
      <InputWithLabel 
        id='todo-title' 
        value={todoTitle} 
        onChange={handleTitleChange}
      >
        Title: 
      </InputWithLabel>
      <button>Add</button>
    </form>
  );
}

export default AddTodoForm;