import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './TodoList.jsx';
import AddTodoForm from './AddTodoForm.jsx';

function App() {
	const todoListKey = 'savedTodoList';
	const localTodoList = JSON.parse(localStorage.getItem(todoListKey));
	const [todoList, setTodoList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchData = async () => {
		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
			}
		};
		const url = `https://api.airtable.com/v0/${
			import.meta.env.VITE_AIRTABLE_BASE_ID
		}/${import.meta.env.VITE_TABLE_NAME}`;

		try {
			setIsLoading(true);

			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			const data = await response.json();
			const todos = data.records.map(todo => ({
				title: todo.fields.title,
				id: todo.id
			}));

			setTodoList(todos);
			setIsLoading(false);
		} catch (error) {}
	};

	useEffect(() => {
		fetchData();
	}, []);

	// useEffect(() => {
	// 	if (!isLoading) {
	// 		localStorage.setItem(todoListKey, JSON.stringify(todoList));
	// 	}
	// }, [todoList]);

	const addTodo = async newTodo => {
		const options = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				fields: { title: newTodo }
			})
		};
		const url = `https://api.airtable.com/v0/${
			import.meta.env.VITE_AIRTABLE_BASE_ID
		}/${import.meta.env.VITE_TABLE_NAME}`;

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			const data = await response.json();
			const id = data.id;

			setTodoList([...todoList, { title: newTodo, id }]);
		} catch (error) {}
	};

	// TODO: make work with Airtable
	const removeTodo = id => {
		setTodoList(todoList.filter(todo => todo.id !== id));
	};

	const Home = () => (
		<>
			<h1>Todo List</h1>
			<AddTodoForm
				onAddTodo={addTodo}
				isLoading={isLoading}
			/>
			<hr />
			{isLoading ? (
				<p>Loading... </p>
			) : (
				<TodoList
					todoList={todoList}
					removeTodo={removeTodo}
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
					element={<h1>New List</h1>}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
