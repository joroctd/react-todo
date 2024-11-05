import TodoListItem from './TodoListItem.jsx';

function TodoList({ todoList }) {
    return (
      <ul className='todo-list'>
        {
          todoList.map(({id, title}) => <TodoListItem key={id} title={title} />)
        }
      </ul>
  );
}

export default TodoList;
