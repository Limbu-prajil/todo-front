import React, { useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'; 
import {v4 as uuidv4} from 'uuid'

const LOCAL_STORAGE_KEY = 'todos.key'

function App() {
  console.log('1')
  const [todos, setTodos] = useState([
    { id: '1', name: 'Swimming', complete: false },
    { id: '2', name: 'Hiking', complete: false },
    { id: '3', name: 'Biking', complete: false },
    { id: '4', name: 'Boating', complete: false },
    { id: '5', name: 'Running', complete: false }
  ])
  const todoNameRef = useRef()

  function addTodo(e) {
    console.log('2')
    const name = todoNameRef.current.value
    if (name === null) return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
   }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(idChecked) {
    console.log('3')
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === idChecked)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function clearCompleted() {
    console.log('4')
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div>
      <TodoList lists={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={clearCompleted}>Clear completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  )
}

export default App;
