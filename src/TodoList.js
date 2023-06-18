import React, { useState, useCallback } from 'react';
import { useTable } from 'react-table';

export default function TodoList({ lists, toggleTodo, editTodo }) {
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editValue, setEditValue] = useState(lists.name);

  const handleEditInputChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleEditSave = useCallback(
    (todoId) => {
        editTodo(todoId, editValue);
        setEditingTodoId(null);
        setEditValue('');
        },
        [editTodo, editValue]
  );

  const data = React.useMemo(() => lists, [lists]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Todo',
        accessor: 'name',
        Cell: ({ row }) => {
          if (row.original.id === editingTodoId) {
            return (
              <div>
                <input
                  type="text"
                  value={editValue}
                  onChange={handleEditInputChange}
                />
                <button onClick={() => handleEditSave(row.original.id)}>
                  Save
                </button>
              </div>
            );
          } else {
            return row.original.name;
          }
        },
      },
      {
        Header: 'Completed',
        accessor: 'complete',
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.original.complete}
            onChange={() => toggleTodo(row.original.id)}
          />
        ),
      },
      {
        Header: 'Edit',
        accessor: 'id',
        Cell: ({ row }) => {
          if (row.original.id === editingTodoId) {
            return null; // Hide the edit button while editing
          } else {
            return (
              <button onClick={() => setEditingTodoId(row.original.id)}>
                Edit
              </button>
            );
          }
        },
      },
    ],
    [toggleTodo, editingTodoId, editValue, handleEditSave]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
