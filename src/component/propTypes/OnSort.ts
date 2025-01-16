import { Sort } from './Sort';

export interface OnSort {
	onSort: (newSort: Sort) => void;
}
