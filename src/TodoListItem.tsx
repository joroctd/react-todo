import style from './TodoListItem.module.css';

import { Todo, RemoveTodo } from '@/types/Todo';

interface TodoListItemProps extends Todo {
	removeTodo: RemoveTodo;
}

function TodoListItem({ title, id, removeTodo }: TodoListItemProps) {
	return (
		<li className={style.todoListItem}>
			<span>{title}</span>
			<button onClick={() => removeTodo(id)}>Remove</button>
		</li>
	);
}

export default TodoListItem;
