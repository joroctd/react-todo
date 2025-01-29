export interface Todo {
	id: string;
	title: string;
}

// example for "TodoMaybe"
export type TodoPartial<Todo> = {
	[TodoKey in keyof Todo]?: Todo[TodoKey];
};

export interface TodoData {
	id: string;
	fields: {
		title: string;
	};
}

export type RemoveTodo = (id: string) => void;
