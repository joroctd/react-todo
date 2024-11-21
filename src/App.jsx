import { useEffect, useState } from 'react'
import './App.css'
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function useSemiPersistentState() {
  const TODO_LIST_KEY = 'savedTodoList';
  const localTodoList = JSON.parse(localStorage.getItem(TODO_LIST_KEY));
  const [todoList, setTodoList] = useState(localTodoList || []);

  useEffect(() => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
  }, [todoList])

  return [todoList, setTodoList]
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

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
