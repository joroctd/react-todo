const todoList = [];
[
  'Master React', 
  'Master Node', 
  'Clear out email'
].forEach((title, id) => { todoList.push({id, title}) });

function TodoList() {
    return (
      <ul className='todo-list'>
        {
          todoList.map(({title, id}) => (
            <li
              key={id}
            >
              {title}
            </li>
          ))
        }
      </ul>
  );
}

export default TodoList;
