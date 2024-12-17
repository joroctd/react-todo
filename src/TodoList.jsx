import TodoListItem from './TodoListItem';

function TodoList({ todoList, onRemoveTodo }) {
	return (
		<ul className='todo-list'>
			{todoList.map(({ id, title }) => (
				<TodoListItem
					key={id}
					id={id}
					title={title}
					onRemoveTodo={onRemoveTodo}
				/>
			))}
		</ul>
	);
}

export default TodoList;
