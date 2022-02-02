import React from 'react';

import './todo-list-item.css';

const TodoListItem = ({ onDelete, onToggleImportant, onToggleDone, label, done = false, important = false, id}) => {
  const style = {
    color: important && !done ? 'steelblue' : 'black',
    fontWeight: important && !done ? 'bold' : 'normal',
    textDecoration: done ? 'line-through' : 'none'
  };

  return (
    <span className="todo-list-item">
      <span onClick={() => onToggleDone(id) }
        className="todo-list-item-label"
        style={style}>
        {label}
      </span>

      <button onClick={ () =>onToggleImportant(id)}
              type="button"
              className="btn btn-outline-success btn-sm float-right">
        <i className="fa fa-exclamation" />
      </button>

      <button onClick={()=>onDelete(id)}
              type="button"
              className="btn btn-outline-danger btn-sm float-right">
        <i className="fa fa-trash-o" />
      </button>

    </span>
  );
};

export default TodoListItem;
