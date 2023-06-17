import React, { useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'; 
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'

function App() {
  console.log('1')
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    axios.get('/api/todos')
      .then(response => {
        setTodos(response.data)
      })
      .catch(error => {
        console.error('Error fetching todos:', error)
      })
  }, [])

  function addTodo(e) {
    console.log('2')
    const name = todoNameRef.current.value
    if (name === '') return
    axios.post('/api/todos', {id: uuidv4, name, complete: false})
      .then(response => {
        setTodos(prevTodos =>[...prevTodos, response.data])
      })
      .catch(error => {
        console.error('Error adding todo:', error)
      })   
    todoNameRef.current.value = null
   }

  /*
  const LOCAL_STORAGE_KEY = 'todos.key'
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])
  useEffect(() => { 
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]) */

  function toggleTodo(idChecked) {
    console.log('3')
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === idChecked)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function editTodo(id, newName) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, name: newName}
      }
      return todo
    })
    axios.put(`/api/todos/${id}`, { name: newName, complete: todos.complete })
      .then(response => {
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  }

  function clearCompleted() {
    console.log('4')
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div>
      <TodoList lists={todos} toggleTodo={toggleTodo} editTodo={editTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={clearCompleted}>Delete Todo</button>
      <div>{todos.filter(todo => !todo.complete).length} Left Todo</div>
    </div>
  )
}

export default App;
