import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './TodoList.jsx';
import AddTodoForm from './AddTodoForm.jsx';

function App() {
	const todoListKey = 'savedTodoList';
	const localTodoList = JSON.parse(localStorage.getItem(todoListKey));
	const [todoList, setTodoList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchTodos() {
			const { data } = await new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({
						data: {
							todoList: localTodoList || []
						}
					});
				}, 2000);
			});

			setTodoList(data.todoList);
			setIsLoading(false);
		}

		fetchTodos();
	}, []);

	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem(todoListKey, JSON.stringify(todoList));
		}
	}, [todoList]);

	const addTodo = newTodo => {
		let id;
		try {
			id = crypto.randomUUID();
		} catch (e) {
			id = Date.now();
		}
		setTodoList([...todoList, { title: newTodo, id }]);
	};

	const removeTodo = id => {
		setTodoList(todoList.filter(todo => todo.id !== id));
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
