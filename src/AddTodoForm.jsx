function AddTodoForm({ onAddTodo }) {
  const handleAddTodo = event => {
    event.preventDefault();
    const todoTitle = event.target.querySelector('input[name="title"]').value;
    // console.log(todoTitle);
    onAddTodo(todoTitle);
    event.target.reset();
  };

  return (
    <form className='add-todo-form' onSubmit={handleAddTodo}>
      <label htmlFor='todo-title'>Title: </label>
      <input id='todo-title' name='title' />
      <button>Add</button>
    </form>
  );
}

export default AddTodoForm;