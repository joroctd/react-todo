import { FC } from 'react';
import style from './TodoListItem.module.css';
import type { Todo } from '../types/Todo';
import type { OnRemoveTodo } from '../types/OnRemoveTodo';

interface TodoListItemProps extends Todo, OnRemoveTodo {}

const TodoListItem: FC<TodoListItemProps> = ({ title, id, onRemoveTodo }) => {
	return (
		<li className={style.listItem}>
			<span>{title}</span>
			<button onClick={() => onRemoveTodo(id)}>Remove</button>
		</li>
	);
};

export default TodoListItem;
