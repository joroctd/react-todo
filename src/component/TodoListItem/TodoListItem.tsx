import style from './TodoListItem.module.css';
import { Todo } from '../propTypes/Todo';
import { OnRemoveTodo } from '../propTypes/OnRemoveTodo';

interface TodoListItemProps extends Todo, OnRemoveTodo {}

function TodoListItem({ title, id, onRemoveTodo }: TodoListItemProps) {
	return (
		<li className={style.listItem}>
			<span>{title}</span>
			<button onClick={() => onRemoveTodo(id)}>Remove</button>
		</li>
	);
}

export default TodoListItem;
