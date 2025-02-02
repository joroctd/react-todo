import TodoList from '@components/TodoList';
import AddTodoForm from '@components/AddTodoForm';
import SortControl from '@components/SortControl';
import { State } from '../types/TodoListReducer';
import { OnAddTodo } from '../types/OnAddTodo';
import { OnRemoveTodo } from '../types/OnRemoveTodo';
import { OnSort } from '../types/OnSort';
import { ServerSortState } from '../types/Sort';

interface HomeUIProps extends OnAddTodo, OnRemoveTodo, OnSort, ServerSortState {
	todoList: State;
}

export default function HomeUI({
	todoList,
	onAddTodo,
	onRemoveTodo,
	onSort,
	shouldServerSort,
	setServerSort
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
						shouldServerSort={shouldServerSort}
						setServerSort={setServerSort}
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
