import TodoListItem from '../TodoListItem/TodoListItem';
import style from './TodoListItem.module.css';

interface TodoListProps {
	todoList: any[];
	onRemoveTodo: (id: string) => void;
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
