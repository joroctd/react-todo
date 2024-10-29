// import { useState } from 'react'
import './App.css'

const todoList = [];
[
  'Master React', 
  'Master Node', 
  'Clear out email'
].forEach((title, id) => { todoList.push({id, title}) });

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1>Todo List</h1>
      <ul className='todo-list'>
        {
          todoList.map(({title, id}) => (
            <li
              key={id}
            >
              {title}
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default App
