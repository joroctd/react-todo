import { useEffect, useReducer, useRef } from 'react';
import { todoListReducer } from './todoListReducer';
import requestWrapper from '../../util/requestWrapper';
import HomeUI from './HomeUI';

export default function Home() {
	const isMounted = useRef(false);
	const [todoList, dispatchTodoList] = useReducer(todoListReducer, {
		data: [],
		isLoading: false,
		isError: false
	});

	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}

		dispatchTodoList({ type: 'FETCH_INIT' });
		fetchData();
	}, []);

	const fetchData = async () => {
		const dataCallback = (data: {
			records: { id: string; fields: { title: string } }[];
		}) => {
			const todos = data.records.map(({ id, fields: { title } }) => ({
				id,
				title
			}));
			dispatchTodoList({ type: 'FETCH_SUCCESS', payload: { todos } });
		};
		const errorCallback = (message: string) => {
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

	const addTodo = async (newTodo: string) => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const dataCallback = (data: { id: string }) => {
			const { id } = data;
			dispatchTodoList({
				type: 'ADD',
				payload: { todos: [{ title: newTodo, id }] }
			});
		};
		requestWrapper({
			options,
			dataCallback,
			body: {
				title: newTodo
			}
		});
	};

	const removeTodo = (id: string) => {
		const options = {
			method: 'DELETE'
		};
		const dataCallback = (data: { id: string }) => {
			const { id } = data;
			dispatchTodoList({ type: 'REMOVE', payload: { id } });
		};
		requestWrapper({ options, dataCallback, id });
	};

	return (
		<HomeUI
			todoList={todoList}
			addTodo={addTodo}
			removeTodo={removeTodo}
		/>
	);
}
