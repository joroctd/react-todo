import TodoList from '../TodoList/TodoList';
import AddTodoForm from '../AddTodoForm/AddTodoForm';
import { State } from '../propTypes/TodoListReducer';
import { OnAddTodo } from '../propTypes/OnAddTodo';
import { OnRemoveTodo } from '../propTypes/OnRemoveTodo';

interface HomeUIProps extends OnAddTodo, OnRemoveTodo {
	todoList: State;
}

export default function HomeUI({
	todoList,
	onAddTodo,
	onRemoveTodo
}: HomeUIProps) {
	return (
		<>
			<h1>Todo List</h1>
			<AddTodoForm
				onAddTodo={onAddTodo}
				isLoading={todoList.isLoading}
			/>
			<hr />
			{todoList.isLoading ? (
				<p>Loading...</p>
			) : (
				<TodoList
					todoList={todoList.data}
					onRemoveTodo={onRemoveTodo}
				/>
			)}
		</>
	);
}
