// import { useState } from 'react'
import './App.css'
import TodoList from './TodoList.jsx';
import AddTodoForm from './AddTodoForm.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm />
      <hr />
      <TodoList />
    </>
  )
}

export default App
