import { useEffect, useReducer } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TodoList from './component/TodoList';
import AddTodoForm from './component/AddTodoForm';
import requestWrapper from './util/requestWrapper';

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
	const [todoList, dispatchTodoList] = useReducer(todoListReducer, {
		data: [],
		isLoading: false,
		isError: false
	});

	const fetchData = async () => {
		const options = { method: 'GET' };
		const dataCallback = data => {
			const todos = data.records.map(({ id, fields: { title } }) => ({
				id,
				title
			}));
			dispatchTodoList({ type: 'FETCH_SUCCESS', payload: todos });
		};
		const errorCallback = message => {
			dispatchTodoList({
				type: 'FETCH_FAILURE',
				payload: {
					message
				}
			});
		};
		requestWrapper({
			options,
			dataCallback,
			errorCallback
		});
	};

	useEffect(() => {
		dispatchTodoList({ type: 'FETCH_INIT' });
		fetchData();
	}, []);

	const addTodo = async newTodo => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const dataCallback = data => {
			const { id } = data;
			dispatchTodoList({ type: 'ADD', payload: { title: newTodo, id } });
		};
		requestWrapper({
			options,
			dataCallback,
			body: {
				title: newTodo
			}
		});
	};

	const removeTodo = id => {
		const options = {
			method: 'DELETE'
		};
		const dataCallback = data => {
			const { id } = data;
			dispatchTodoList({ type: 'REMOVE', payload: { id } });
		};
		requestWrapper({ options, dataCallback, id });
	};

	const Home = () => (
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

	return (
		<BrowserRouter>
			<nav>
				<Link to='/'>Home</Link>
				<Link to='/new'>New</Link>
			</nav>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/new'
					element={<h1>New (empty) Todo List</h1>}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
