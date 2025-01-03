import TodoListItem from './TodoListItem';
import style from './TodoListItem.module.css';

function TodoList({ todoList, onRemoveTodo }) {
	return (
		<ul className={style.todoList}>
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
