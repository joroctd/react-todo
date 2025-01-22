import styled from 'styled-components';

const TodoListItemStyled = styled.ul`
	display: flex;
	gap: 10px;
	align-items: baseline;
	justify-content: center;
`;

function TodoListItem({ title, id, removeTodo }) {
	return (
		<TodoListItemStyled>
			<span>{title}</span>
			<button onClick={() => removeTodo(id)}>Remove</button>
		</TodoListItemStyled>
	);
}

export default TodoListItem;
