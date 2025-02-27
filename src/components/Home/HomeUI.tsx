import { FC } from 'react';
import TodoList from '@/components/TodoList';
import AddTodoForm from '@/components/AddTodoForm';
import SortControl from '@/components/SortControl';
import type { State } from '@/types/TodoListReducer';
import type { OnAddTodo } from '@/types/OnAddTodo';
import type { OnRemoveTodo } from '@/types/OnRemoveTodo';
import type { OnSort } from '@/types/OnSort';

interface HomeUIProps extends OnAddTodo, OnRemoveTodo, OnSort {
	todoList: State;
}

const HomeUI: FC<HomeUIProps> = ({
	todoList,
	onAddTodo,
	onRemoveTodo,
	onSort
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
