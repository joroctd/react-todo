import { useEffect, useReducer, useRef } from 'react';
import { todoListReducer } from './todoListReducer';
import requestWrapper from '../../util/requestWrapper';
import HomeUI from './HomeUI';
import { Sort } from '../propTypes/Sort';
import { Todo } from '../propTypes/Todo';

export default function Home() {
	const isMounted = useRef(false);
	const [todoList, dispatchTodoList] = useReducer(todoListReducer, {
		data: [],
		sort: Sort.NONE,
		isLoading: false,
		isError: false
	});

	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}

		fetchData();
	}, []);

	type Data = (data: {
		records: { id: string; fields: { title: string } }[];
	}) => void;

	interface fetchDataProps {
		sort?: Sort;
		queries?: object[];
		dataCallback?: Data;
	}

	const fetchData = ({
		sort,
		queries,
		dataCallback = data => {
			const todos = data.records.map(({ id, fields: { title } }) => ({
				id,
				title
			}));
			dispatchTodoList({
				type: 'FETCH_SUCCESS',
				payload: { todos, sort }
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
			queries
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

	const sortData = (sort: Sort) => {
		if (sort === todoList.sort) return;

		const queries = [];
		let manualSort = null;
		switch (sort) {
			case Sort.NONE:
				break;

			case Sort.VIEW:
				queries.push({ view: 'Grid%20view' });
				break;
			case Sort.FIELD:
				// newQueries.push({ view: 'Grid%20view' }); // seems unneeded
				queries.push({ 'sort[0][field]': 'title' });
				queries.push({ 'sort[0][direction]': 'asc' });
				break;

			case Sort.ASCENDING:
				manualSort = (objectA: Todo, objectB: Todo) => {
					if (objectA.title < objectB.title) return -1;
					if (objectA.title > objectB.title) return 1;
					return 0;
				};
				break;
			case Sort.DESCENDING:
				manualSort = (objectA: Todo, objectB: Todo) => {
					if (objectA.title > objectB.title) return -1;
					if (objectA.title < objectB.title) return 1;
					return 0;
				};
				break;
		}

		if (manualSort) {
			fetchData({
				sort,
				dataCallback: data => {
					const todos = data.records.map(({ id, fields: { title } }) => ({
						id,
						title
					}));
					dispatchTodoList({
						type: 'FETCH_SUCCESS',
						payload: { todos: todos.sort(manualSort), sort }
					});
				}
			});
			return;
		}

		if (queries.length) {
			fetchData({ sort, queries });
		} else fetchData({ sort });
	};

	return (
		<HomeUI
			todoList={todoList}
			onAddTodo={addTodo}
			onRemoveTodo={removeTodo}
			onSort={sortData}
		/>
	);
}
