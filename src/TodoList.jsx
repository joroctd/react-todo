import TodoListItem from './TodoListItem.jsx';
import style from './TodoList.module.css';

function TodoList({ todoList, removeTodo }) {
	return (
		<ul className={style.todoList}>
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
