import { useState } from 'react';
import InputWithLabel from './InputWithLabel';

function AddTodoForm({ onAddTodo, isLoading }) {
	const [todoTitle, setTodoTitle] = useState('');

	const handleTitleChange = event => {
		const newTodoTitle = event.target.value;
		setTodoTitle(newTodoTitle);
	};

	const handleAddTodo = event => {
		event.preventDefault();
		onAddTodo(todoTitle);
		setTodoTitle('');
	};

	return (
		<form
			className='add-todo-form'
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
