export enum Sort {
	NONE = 'NONE',
	ASCENDING = 'ASCENDING',
	DESCENDING = 'DESCENDING'
}

export interface ServerSortState {
	shouldServerSort: boolean;
	setServerSort: (value: boolean) => void;
}
