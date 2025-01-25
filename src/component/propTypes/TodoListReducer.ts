import { Todo } from './Todo';
import { Sort } from './Sort';

export interface State {
	data: Todo[];
	sort?: Sort;
	isLoading?: boolean;
	isError?: boolean;
	errorMessage?: string;
}

export interface Action {
	type: string;
	payload?: {
		todos?: Todo[];
		sort?: Sort;
		message?: string;
		id?: string;
	};
}
