import React from 'react'
import TodoEach from './TodoEach'

export default function TodoList({lists, toggleTodo, editTodo}) {
    console.log('5')
    return (
        <div>
            {lists.map(arrEach => (
                <TodoEach key={arrEach.id} toggleTodo={toggleTodo} editTodo={editTodo} listEach={arrEach}/>
            ))}
        </div>
    )
}