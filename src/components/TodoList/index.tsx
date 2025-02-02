import TodoListItem from '@components/TodoListItem';
import style from './TodoList.module.css';
import { Todo } from '../types/Todo';
import { OnRemoveTodo } from '../types/OnRemoveTodo';

interface TodoListProps extends OnRemoveTodo {
	todoList: Todo[];
}

function TodoList({ todoList, onRemoveTodo }: TodoListProps) {
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
