import TodoListItem from './TodoListItem.jsx';

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
          todoList.map(props => <TodoListItem {...props} />)
        }
      </ul>
  );
}

export default TodoList;
