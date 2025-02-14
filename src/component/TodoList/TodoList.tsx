import { Todo } from '../propTypes/Todo';
import TodoListItem from '../TodoListItem/TodoListItem';
import style from './TodoList.module.css';
import { OnRemoveTodo } from '../propTypes/OnRemoveTodo';

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
