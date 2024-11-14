function TodoListItem ({title, id}) {
    return (
    <li
        key={id}
    >
        {title}
    </li>
    );
}

export default TodoListItem;