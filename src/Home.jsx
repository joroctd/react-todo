import { useEffect, useState } from 'react';
import TodoList from './TodoList.jsx';
import AddTodoForm from './AddTodoForm.jsx';

export default function Home() {
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
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

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
		} catch (error) {
			console.error(error.message);
		}
	};

	const removeTodo = async id => {
		const options = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
			}
		};
		const url = `https://api.airtable.com/v0/${
			import.meta.env.VITE_AIRTABLE_BASE_ID
		}/${import.meta.env.VITE_TABLE_NAME}/${id}`;

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			setTodoList(todoList.filter(todo => todo.id !== id));
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
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
}
