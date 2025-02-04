import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import SortControl from './SortControl';
import { TodoData, Todo, RemoveTodo } from './types/Todo';
import { Order, Field } from './types/Sort';

function App() {
	const [todoList, setTodoList] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [sortOrder, setSortOrder] = useState<Order>(Order.NONE);
	const [sortField, setSortField] = useState<Field>(Field.CREATED_TIME);

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
			let todos = data.records.map((todo: TodoData) => {
				return {
					title: todo.fields.title,
					createdTime: todo.createdTime,
					id: todo.id
				};
			});

			setTodoList(todos);
			setIsLoading(false);
		} catch (error) {}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const sortData = (todos: Todo[]) => {
		if (sortOrder !== Order.NONE) {
			let sortFunction = (a: Todo, b: Todo) => {
				return 0;
			};
			switch (sortOrder) {
				case Order.ASCENDING:
					sortFunction = (a, b) => {
						if (a[sortField] && b[sortField]) {
							if (a[sortField] < b[sortField]) return -1;
							if (a[sortField] === b[sortField]) return 0;
						}
						return 1;
					};
					break;
				case Order.DESCENDING:
					sortFunction = (a, b) => {
						if (a[sortField] && b[sortField]) {
							if (a[sortField] < b[sortField]) return 1;
							if (a[sortField] === b[sortField]) return 0;
						}
						return -1;
					};
					break;
				default:
					console.error('Sort order not implemented.');
					return todoList;
			}
			return [...todos].sort(sortFunction);
		}
		return todoList;
	};

	useEffect(() => {
		setTodoList(todos => sortData(todos));
	}, [sortOrder, sortField]);

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
			<SortControl
				sortOrder={sortOrder}
				sortField={sortField}
				setSortOrder={setSortOrder}
				setSortField={setSortField}
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
