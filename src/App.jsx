import { useEffect, useReducer } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

const todoListReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_INIT':
			return {
				...state,
				isLoading: true,
				isError: false
			};
		case 'FETCH_SUCCESS':
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload
			};
		case 'FETCH_FAILURE':
			return {
				...state,
				isLoading: false,
				isError: true
			};
		case 'ADD':
			return {
				...state,
				data: [...state.data, action.payload]
			};
		case 'REMOVE':
			return {
				...state,
				data: state.data.filter(todo => todo.id !== action.payload.id)
			};
		default:
			throw new Error('Unsupported todoList action type.');
	}
};

function App() {
	const TODO_LIST_KEY = 'savedTodoList';
	const localTodoList = JSON.parse(localStorage.getItem(TODO_LIST_KEY));
	const [todoList, dispatchTodoList] = useReducer(todoListReducer, {
		data: localTodoList,
		isLoading: false,
		isError: false
	});

	useEffect(() => {
		dispatchTodoList({ type: 'FETCH_INIT' });

		const fetchTodos = async () => {
			const { data } = await new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({
						data: {
							todos: todoList.data
						}
					});
				}, 2000);
			});

			dispatchTodoList({ type: 'FETCH_SUCCESS', payload: data.todos });
		};

		fetchTodos();
	}, []);

	useEffect(() => {
		if (!todoList.isLoading) {
			localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList.data));
		}
	}, [todoList.data]);

	const addTodo = newTodo => {
		let id;
		try {
			id = crypto.randomUUID();
		} catch (e) {
			id = Date.now();
		}

		dispatchTodoList({ type: 'ADD', payload: { title: newTodo, id } });
	};

	const removeTodo = id => {
		dispatchTodoList({ type: 'REMOVE', payload: { id } });
	};

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

export default App;
