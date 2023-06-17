// TodoEach.js
import React, { useState } from 'react';

export default function TodoEach({ listEach, toggleTodo, editTodo }) {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(listEach.name);

  function handleTodoClick() {
    toggleTodo(listEach.id);
  }

  function handleEditClick() {
    setEditing(true);
  }

  function handleSaveClick() {
    editTodo(listEach.id, editedName);
    setEditing(false);
  }

  function handleInputChange(e) {
    setEditedName(e.target.value);
  }

  return (
    <div>
      {!editing ? (
        <div>
          <label>
            <input type="checkbox" checked={listEach.complete} onChange={handleTodoClick} />
            {listEach.name}
          </label>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      ) : (
        <div>
          <input type="text" value={editedName} onChange={handleInputChange} />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      )}
    </div>
  );
}    
