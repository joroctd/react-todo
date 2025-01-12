import { useState } from 'react';
import style from './AddTodoForm.module.css';
import InputWithLabel from './InputWithLabel';

interface AddTodoFormProps {
	onAddTodo: (todoTitle: string) => void;
	isLoading: boolean;
}

function AddTodoForm({ onAddTodo, isLoading }: AddTodoFormProps) {
	const [todoTitle, setTodoTitle] = useState('');

	const handleTitleChange = (event: { target: { value: string } }) => {
		const newTodoTitle = event.target.value;
		setTodoTitle(newTodoTitle);
	};

	const handleAddTodo = (event: { preventDefault: () => void }) => {
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
