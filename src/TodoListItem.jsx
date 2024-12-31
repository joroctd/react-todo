function TodoListItem({ title, id, onRemoveTodo }) {
	return (
		<li>
			<span>{title}</span>
			<button onClick={() => onRemoveTodo(id)}>Remove</button>
		</li>
	);
}

export default TodoListItem;
