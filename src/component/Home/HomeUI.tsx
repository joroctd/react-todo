import TodoList from '../TodoList/TodoList';
import AddTodoForm from '../AddTodoForm/AddTodoForm';

interface HomeUIProps {
	todoList: {
		data: any[];
		isLoading?: boolean;
		isError?: boolean;
		errorMessage?: string;
	};
	addTodo: (todo: string) => void;
	removeTodo: (id: string) => void;
}

export default function HomeUI({ todoList, addTodo, removeTodo }: HomeUIProps) {
	return (
		<>
			<h1>Todo List</h1>
			<AddTodoForm
				onAddTodo={addTodo}
				isLoading={todoList.isLoading}
			/>
			<hr />
			{todoList.isLoading ? (
				<p>Loading...</p>
			) : (
				<TodoList
					todoList={todoList.data}
					onRemoveTodo={removeTodo}
				/>
			)}
		</>
	);
}
