function AddTodoForm() {
    return (
        <form className='add-todo-form'>
          <label htmlFor='todo-title'>Title: </label>
          <input id='todo-title' />
          <button>Add</button>
        </form>
    );
}

export default AddTodoForm;