import { Field } from './Sort';

export interface Todo {
	id: string;
	createdTime?: Field;
	title: Field | string;
}

export type TodoPartial<Todo> = {
	[TodoKey in keyof Todo]?: Todo[TodoKey];
};

export interface TodoData {
	id: string;
	createdTime: string;
	fields: {
		title: string;
	};
}

export type RemoveTodo = (id: string) => void;
