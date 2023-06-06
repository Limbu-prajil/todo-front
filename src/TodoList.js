import React from 'react'
import TodoEach from './TodoEach'

export default function TodoList({lists, toggleTodo}) {
    console.log('5')
    return (
        lists.map(arrEach => {
            return <TodoEach key={arrEach.id} toggleTodo={toggleTodo} listEach={arrEach}/>
        })
    )
}