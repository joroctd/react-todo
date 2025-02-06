export type onInputChange = (
	event: React.ChangeEvent<HTMLInputElement>
) => void;
export interface OnChange {
	onChange: onInputChange;
}

export type onSelectChange = (
	event: React.ChangeEvent<HTMLSelectElement>
) => void;
export interface OnSelectChange {
	onChange: OnSelectChange;
}

export type onFormEvent = (event: React.FormEvent<HTMLFormElement>) => void;
