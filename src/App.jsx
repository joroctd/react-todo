import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './TodoList.jsx';
import AddTodoForm from './AddTodoForm.jsx';

function useSemiPersistentState() {
	const todoListKey = 'savedTodoList';
	const localTodoList = JSON.parse(localStorage.getItem(todoListKey));
	const [todoList, setTodoList] = useState(localTodoList || []);

	useEffect(() => {
		localStorage.setItem(todoListKey, JSON.stringify(todoList));
	}, [todoList]);

	return [todoList, setTodoList];
}

function App() {
	const [todoList, setTodoList] = useSemiPersistentState();

	const addTodo = newTodo => {
		let id;
		try {
			id = crypto.randomUUID();
		} catch (e) {
			id = Date.now();
		}
		setTodoList([...todoList, { title: newTodo, id }]);
	};

	return (
		<>
			<h1>Todo List</h1>
			<AddTodoForm onAddTodo={addTodo} />
			<hr />
			<TodoList todoList={todoList} />
		</>
	);
}

export default App;
