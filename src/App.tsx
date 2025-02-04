import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { TodoData, Todo, RemoveTodo } from '@/types/Todo';

function App() {
	const [todoList, setTodoList] = useState<Todo[]>([]);
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
		}/${
			import.meta.env.VITE_TABLE_NAME
		}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;

		try {
			setIsLoading(true);

			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			const data = await response.json();
			const todos = data.records
				.map((todo: TodoData) => ({
					title: todo.fields.title,
					id: todo.id
				}))
				.sort((a: Todo, b: Todo) => {
					if (a.title < b.title) return 1;
					if (a.title === b.title) return 0;
					return -1;
				});

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

	const addTodo = async (newTodo: string) => {
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

	const removeTodo: RemoveTodo = id => {
		setTodoList(todoList.filter((todo: Todo) => todo.id !== id));
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

export default App;
