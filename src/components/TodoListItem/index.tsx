import style from './TodoListItem.module.css';
import { Todo } from '@/types/Todo';
import { OnRemoveTodo } from '@/types/OnRemoveTodo';

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
