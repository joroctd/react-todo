export interface Todo {
	id: string;
	title: string;
}

// example for "TodoMaybe"
type Partial<T> = {
	[P in keyof T]?: T[P];
};
export type TodoPartial = Partial<Todo>;

export interface TodoData {
	id: string;
	fields: {
		title: string;
	};
}

export type RemoveTodo = (id: string) => void;
