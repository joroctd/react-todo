import style from './TodoListItem.module.css';

function TodoListItem({ title, id, removeTodo }) {
	return (
		<li className={style.todoListItem}>
			<span>{title}</span>
			<button onClick={() => removeTodo(id)}>Remove</button>
		</li>
	);
}

export default TodoListItem;
