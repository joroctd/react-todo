import { useEffect, useReducer, useRef } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import requestWrapper from '../util/requestWrapper';

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

function Home() {
	const isMounted = useRef(false);
	const [todoList, dispatchTodoList] = useReducer(todoListReducer, {
		data: [],
		isLoading: false,
		isError: false
	});

	const fetchData = async () => {
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
			dataCallback,
			errorCallback
		});
	};

	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}

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

export default Home;
