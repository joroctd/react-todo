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
				isError: true,
				errorMessage: action.payload.message
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
	const url = `https://api.airtable.com/v0/${
		import.meta.env.VITE_AIRTABLE_BASE_ID
	}/${import.meta.env.VITE_TABLE_NAME}`;
	const [todoList, dispatchTodoList] = useReducer(todoListReducer, {
		data: [],
		isLoading: false,
		isError: false
	});

	const fetchData = async () => {
		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
			}
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			const data = await response.json();
			const todos = data.records.map(({ id, fields: { title } }) => ({
				id,
				title
			}));
			dispatchTodoList({ type: 'FETCH_SUCCESS', payload: todos });
		} catch (err) {
			console.error(err.message);
			dispatchTodoList({
				type: 'FETCH_FAILURE',
				payload: {
					message: err.message
				}
			});
		}
	};

	useEffect(() => {
		dispatchTodoList({ type: 'FETCH_INIT' });
		fetchData();
	}, []);

	// TODO: update add and remove methods to communicate with airtable API
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
