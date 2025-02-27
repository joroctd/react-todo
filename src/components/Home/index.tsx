import { FC, useEffect, useReducer } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { todoListReducer } from './todoListReducer';
import requestWrapper from '@/utils/requestWrapper';
import HomeUI from './HomeUI';
import { Sort } from '@/types/Sort';
import type { Todo } from '@/types/Todo';

type Data = { records: { id: string; fields: { title: string } }[] };
type DataCallback = (data: Data) => void;
interface fetchDataProps {
	dataCallback?: DataCallback;
}

const Home: FC = () => {
	const [todoList, dispatchTodoList] = useReducer(todoListReducer, {
		data: [],
		sort: Sort.NONE,
		isLoading: false,
		isError: false
	});
	const { userId, isLoaded, isSignedIn } = useAuth();

	useEffect(() => {
		if (isSignedIn && isLoaded) {
			fetchData();
		}
	}, [isSignedIn, isLoaded]);

	const fetchData = ({
		dataCallback = data => {
			const todos = data.records.map(({ id, fields: { title } }) => ({
				id,
				title
			}));
			dispatchTodoList({
				type: 'FETCH_SUCCESS',
				payload: { todos, sort: todoList.sort }
			});
		}
	}: fetchDataProps = {}) => {
		dispatchTodoList({ type: 'FETCH_INIT' });
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
			errorCallback,
			userId
		});
	};

	const addTodo = (newTodo: string) => {
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
			},
			userId
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
		requestWrapper({ options, dataCallback, id, userId });
	};

	const sortData = (sort: Sort) => {
		if (sort === todoList.sort) return;

		let manualSort: null | ((a: Required<Todo>, b: Required<Todo>) => number) =
			null;
		switch (sort) {
			case Sort.ASCENDING:
				manualSort = (a, b) => a.title.localeCompare(b.title);
				break;
			case Sort.DESCENDING:
				manualSort = (a, b) => b.title.localeCompare(a.title);
				break;
			default:
				return;
		}

		const todos = [...todoList.data].sort(manualSort);
		dispatchTodoList({
			type: 'FETCH_SUCCESS',
			payload: { todos, sort }
		});
	};

	return (
		<HomeUI
			todoList={todoList}
			onAddTodo={addTodo}
			onRemoveTodo={removeTodo}
			onSort={sortData}
		/>
	);
};

export default Home;
