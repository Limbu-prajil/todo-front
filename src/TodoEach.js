import React from 'react'

export default function Todo({ listEach, toggleTodo }) {
    console.log('6')
    function handleTodoClick() {
        console.log('7')
        toggleTodo(listEach.id)
    }
    return (
        <div>
            <label>
                <input type="checkbox" checked={listEach.complete} onChange={handleTodoClick} />
                {listEach.name}
            </label>
        </div>
    )
}
 