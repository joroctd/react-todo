export enum Sort {
	NONE = 'NONE',
	VIEW = 'VIEW',
	FIELD = 'FIELD',
	ASCENDING = 'ASCENDING',
	DESCENDING = 'DESCENDING'
}

export interface ServerSortState {
	shouldServerSort: boolean;
	setServerSort: (value: boolean) => void;
}
