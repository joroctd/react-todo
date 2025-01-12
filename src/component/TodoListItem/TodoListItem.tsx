import style from './TodoListItem.module.css';

interface TodoListItemProps {
	title: string;
	id: string;
	onRemoveTodo: (id: string) => void;
}

function TodoListItem({ title, id, onRemoveTodo }: TodoListItemProps) {
	return (
		<li className={style.listItem}>
			<span>{title}</span>
			<button onClick={() => onRemoveTodo(id)}>Remove</button>
		</li>
	);
}

export default TodoListItem;
