import { useState } from 'react'
import './App.css'
import TodoList from './TodoList.jsx';
import AddTodoForm from './AddTodoForm.jsx';

function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = newTodo => {
    let id;
    try {
      id = crypto.randomUUID();
    } catch (e) {
      id = Date.now();
    }
    setTodoList([...todoList, { title: newTodo, id }]);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <hr />
      <TodoList todoList={todoList} />
    </>
  )
}

export default App
