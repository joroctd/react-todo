import { State, Action } from '../propTypes/TodoListReducer';

export const todoListReducer = (state: State, action: Action) => {
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
				data: action.payload.todos,
				sort: action.payload.sort
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
				data: [...state.data, ...action.payload.todos]
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
