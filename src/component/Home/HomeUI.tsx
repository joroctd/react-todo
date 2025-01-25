import TodoList from '../TodoList/TodoList';
import AddTodoForm from '../AddTodoForm/AddTodoForm';
import SortControl from '../SortControl/SortControl';
import { State } from '../propTypes/TodoListReducer';
import { OnAddTodo } from '../propTypes/OnAddTodo';
import { OnRemoveTodo } from '../propTypes/OnRemoveTodo';
import { OnSort } from '../propTypes/OnSort';

interface HomeUIProps extends OnAddTodo, OnRemoveTodo, OnSort {
	todoList: State;
}

export default function HomeUI({
	todoList,
	onAddTodo,
	onRemoveTodo,
	onSort
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
				<>
					<SortControl
						sort={todoList.sort}
						onSort={onSort}
					/>
					<hr />
					<TodoList
						todoList={todoList.data}
						onRemoveTodo={onRemoveTodo}
					/>
				</>
			)}
		</>
	);
}
