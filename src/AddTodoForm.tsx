import { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import style from './AddTodoForm.module.css';
import {
	inputChangeEventHandler,
	formSubmitEventHandler
} from '@/types/HtmlEvent';

interface AddTodoFormProps {
	onAddTodo: (title: string) => void;
	isLoading: boolean;
}

function AddTodoForm({ onAddTodo, isLoading }: AddTodoFormProps) {
	const [todoTitle, setTodoTitle] = useState('');

	const handleTitleChange: inputChangeEventHandler = event => {
		const newTodoTitle = event.target.value;
		setTodoTitle(newTodoTitle);
	};

	const handleAddTodo: formSubmitEventHandler = event => {
		event.preventDefault();
		onAddTodo(todoTitle);
		setTodoTitle('');
	};

	return (
		<form
			className={style.addTodoForm}
			onSubmit={handleAddTodo}>
			<InputWithLabel
				label='Title'
				onChange={handleTitleChange}
				inputValue={todoTitle}>
				Title
			</InputWithLabel>
			{isLoading ? <button disabled>Loading...</button> : <button>Add</button>}
		</form>
	);
}

export default AddTodoForm;
