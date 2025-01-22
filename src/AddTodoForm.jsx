import { useState } from 'react';
import styled from 'styled-components';
import InputWithLabel from './InputWithLabel';

const Form = styled.form`
	display: flex;
	gap: 10px;
	align-items: baseline;
`;

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
		<Form onSubmit={handleAddTodo}>
			<InputWithLabel
				label='Title'
				onChange={handleTitleChange}
				inputValue={todoTitle}>
				Title
			</InputWithLabel>
			{isLoading ? <button disabled>Loading...</button> : <button>Add</button>}
		</Form>
	);
}

export default AddTodoForm;
