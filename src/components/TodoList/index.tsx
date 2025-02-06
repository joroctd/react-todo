import { FC } from 'react';
import TodoListItem from '@/components/TodoListItem';
import style from './TodoList.module.css';
import type { Todo } from '../types/Todo';
import type { OnRemoveTodo } from '../types/OnRemoveTodo';

interface TodoListProps extends OnRemoveTodo {
	todoList: Todo[];
}

const TodoList: FC<TodoListProps> = ({ todoList, onRemoveTodo }) => {
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
};

export default TodoList;
