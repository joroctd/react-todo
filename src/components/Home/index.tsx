import { useEffect, useReducer, useState, useRef } from 'react';
import { todoListReducer } from './todoListReducer';
import requestWrapper from '@utils/requestWrapper';
import HomeUI from './HomeUI';
import { Sort } from '../types/Sort';
import { Todo } from '../types/Todo';

export default function Home() {
	const isMounted = useRef(false);
	const [todoList, dispatchTodoList] = useReducer(todoListReducer, {
		data: [],
		sort: Sort.NONE,
		isLoading: false,
		isError: false
	});
	const [shouldServerSort, setShouldServerSort] = useState(false);
	const prevShouldServerSort = useRef(false);

	useEffect(() => {
		prevShouldServerSort.current = shouldServerSort;
	}, [shouldServerSort]);

	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}

		fetchData();
	}, []);

	type Data = { records: { id: string; fields: { title: string } }[] };
	type DataCallback = (data: Data) => void;
	interface fetchDataProps {
		sort?: Sort;
		queries?: object[];
		dataCallback?: DataCallback;
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
		if (
			sort === todoList.sort &&
			shouldServerSort === prevShouldServerSort.current
		) {
			return;
		}

		const options: fetchDataProps = { sort };

		if (sort === Sort.NONE) {
			fetchData(options);
			return;
		}

		if (shouldServerSort) {
			options.queries = [
				{ view: 'Grid%20view' },
				{ 'sort[0][field]': 'title' }
			];

			switch (sort) {
				case Sort.ASCENDING:
					options.queries.push({ 'sort[0][direction]': 'asc' });
					break;
				case Sort.DESCENDING:
					options.queries.push({ 'sort[0][direction]': 'desc' });
					break;
			}

			fetchData(options);
			return;
		}

		let manualSort = null;
		switch (sort) {
			case Sort.ASCENDING:
				manualSort = (a: Todo, b: Todo) => a.title.localeCompare(b.title);
				break;
			case Sort.DESCENDING:
				manualSort = (a: Todo, b: Todo) => b.title.localeCompare(a.title);
				break;
		}
		if (manualSort) {
			const todos = [...todoList.data].sort(manualSort);
			dispatchTodoList({
				type: 'FETCH_SUCCESS',
				payload: { todos, sort }
			});
			return;
		}
	};

	return (
		<HomeUI
			todoList={todoList}
			onAddTodo={addTodo}
			onRemoveTodo={removeTodo}
			onSort={sortData}
			shouldServerSort={shouldServerSort}
			setServerSort={setShouldServerSort}
		/>
	);
}
