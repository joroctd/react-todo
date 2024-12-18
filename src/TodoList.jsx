import TodoListItem from './TodoListItem.jsx';

function TodoList({ todoList, removeTodo }) {
	return (
		<ul className='todo-list'>
			{todoList.map(({ id, title }) => (
				<TodoListItem
					key={id}
					id={id}
					title={title}
					removeTodo={removeTodo}
				/>
			))}
		</ul>
	);
}

export default TodoList;
