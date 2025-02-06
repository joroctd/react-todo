import { useState } from 'react';
import style from './AddTodoForm.module.css';
import InputWithLabel from '@components/InputWithLabel';
import { OnAddTodo } from '../types/OnAddTodo';
import { onInputChange, onFormEvent } from '@components/types/OnEvent';

interface AddTodoFormProps extends OnAddTodo {
	isLoading: boolean;
}

function AddTodoForm({ onAddTodo, isLoading }: AddTodoFormProps) {
	const [todoTitle, setTodoTitle] = useState('');

	const handleTitleChange: onInputChange = event => {
		const newTodoTitle = event.target.value;
		setTodoTitle(newTodoTitle);
	};

	const handleAddTodo: onFormEvent = event => {
		event.preventDefault();
		if (todoTitle !== '') {
			onAddTodo(todoTitle);
			setTodoTitle('');
		}
	};

	return (
		<form
			className={style.addTodoForm}
			onSubmit={handleAddTodo}>
			<InputWithLabel
				id='todo-title'
				value={todoTitle}
				onChange={handleTitleChange}>
				Title:
			</InputWithLabel>
			{isLoading ? <button disabled>Loading...</button> : <button>Add</button>}
		</form>
	);
}

export default AddTodoForm;
