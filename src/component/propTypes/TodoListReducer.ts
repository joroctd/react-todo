import { Todo } from './Todo';

export interface State {
	data: Todo[];
	isLoading?: boolean;
	isError?: boolean;
	errorMessage?: string;
}

export interface Action {
	type: string;
	payload?: {
		todos?: Todo[];
		message?: string;
		id?: string;
	};
}
