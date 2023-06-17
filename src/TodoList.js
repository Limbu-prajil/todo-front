import React from 'react'
import { useTable } from 'react-table';
// import TodoEach from './TodoEach'

export default function TodoList({lists, toggleTodo, editTodo}) {

    const data = React.useMemo(() => lists, [lists]);
    const columns = React.useMemo(
        () => [
        {
            Header: 'Todo',
            accessor: 'name',
        },
        {
            Header: 'Completed',
            accessor: 'complete',
            Cell: ({ value }) => <input type="checkbox" checked={value} readOnly />,
        },
        {
            Header: 'Edit',
            accessor: 'id',
            Cell: ({ value }) => <button onClick={() => editTodo(value)}>Edit</button>,
        },
        ],
        [editTodo]
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


    /*    console.log('5')
    return (
        <div>
            {lists.map(arrEach => (
                <TodoEach key={arrEach.id} toggleTodo={toggleTodo} editTodo={editTodo} listEach={arrEach}/>
            ))}
        </div>
    )    */
}