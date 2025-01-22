import TodoListItem from './TodoListItem.jsx';
import styled from 'styled-components';

const TodoListStyled = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
`;

function TodoList({ todoList, removeTodo }) {
	return (
		<TodoListStyled>
			{todoList.map(({ id, title }) => (
				<TodoListItem
					key={id}
					id={id}
					title={title}
					removeTodo={removeTodo}
				/>
			))}
		</TodoListStyled>
	);
}

export default TodoList;
