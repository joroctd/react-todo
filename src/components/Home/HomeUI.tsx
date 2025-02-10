import { FC } from 'react';
import TodoList from '@/components/TodoList';
import AddTodoForm from '@/components/AddTodoForm';
import SortControl from '@/components/SortControl';
import type { State } from '../types/TodoListReducer';
import type { OnAddTodo } from '../types/OnAddTodo';
import type { OnRemoveTodo } from '../types/OnRemoveTodo';
import type { OnSort } from '../types/OnSort';
import type { ServerSortState } from '../types/Sort';

interface HomeUIProps extends OnAddTodo, OnRemoveTodo, OnSort, ServerSortState {
	todoList: State;
}

const HomeUI: FC<HomeUIProps> = ({
	todoList,
	onAddTodo,
	onRemoveTodo,
	onSort,
	shouldServerSort,
	setServerSort
}) => {
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
};

export default HomeUI;
