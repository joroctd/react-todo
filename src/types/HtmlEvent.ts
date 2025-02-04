export type inputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type inputChangeEventHandler = (event: inputChangeEvent) => void;

export type selectChangeEvent = React.ChangeEvent<HTMLSelectElement>;
export type selectChangeEventHandler = (event: selectChangeEvent) => void;

export type formSubmitEvent = React.FormEvent<HTMLFormElement>;
export type formSubmitEventHandler = (event: formSubmitEvent) => void;
