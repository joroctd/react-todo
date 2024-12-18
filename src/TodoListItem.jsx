function TodoListItem({ title, id, removeTodo }) {
	return (
		<li>
			<span>{title}</span>
			<button onClick={() => removeTodo(id)}>Remove</button>
		</li>
	);
}

export default TodoListItem;
