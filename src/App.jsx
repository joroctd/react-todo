import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
	const TODO_LIST_KEY = 'savedTodoList';
	const localTodoList = JSON.parse(localStorage.getItem(TODO_LIST_KEY));
	const [todoList, setTodoList] = useState(localTodoList || []);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const { data } = await new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({
						data: {
							todoList
						}
					});
				}, 2000);
			});

			setTodoList(data.todoList);
			setIsLoading(false);
		})();
	}, []);

	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
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
			<AddTodoForm onAddTodo={addTodo} />
			<hr />
			<TodoList
				todoList={todoList}
				onRemoveTodo={removeTodo}
			/>
		</>
	);
}

export default App;
