import TodoListItem from './TodoListItem.jsx';
import style from './TodoList.module.css';

import { Todo, RemoveTodo } from './types/Todo';

interface TodoListProps {
	todoList: Todo[];
	removeTodo: RemoveTodo;
}

function TodoList({ todoList, removeTodo }: TodoListProps) {
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
