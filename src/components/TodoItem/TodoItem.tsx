import React, { FunctionComponent, useState } from 'react';
import classnames from 'classnames';

import Todo from '../../models/Todo';
import './TodoItem.css';
import Checkbox from '../Checkbox/Checkbox';
import DeleteIcon from '../Icons/DeleteIcon';
import EditIcon from '../Icons/EditIcon';

interface IProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onInputChange: (id: string, checked: boolean) => void;
  onEdit: (id: string, newDesc: string) => boolean;
}

const TodoItem: FunctionComponent<IProps> = ({
  todo,
  onDelete,
  onInputChange,
  onEdit
}) => {
  const { completed, description, id } = todo;
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(description);

  function handleCancelEdit() {
    setEditMode(false);
    setEditText(description);
  }

  function handleSaveEdit() {
    if (editText.trim() === description) {
      handleCancelEdit();
      return;
    }

    // Edit successfully
    if (onEdit(id, editText)) {
      setEditMode(false);
    }
  }

  return (
    <ul
      className={classnames('todo-item', {
        'todo-item--completed': completed
      })}
    >
      {editMode ? (
        <input
          className="edit-input"
          value={editText}
          onChange={event => setEditText(event.target.value)}
        />
      ) : (
        <>
          <Checkbox
            checked={completed}
            onChange={checked => onInputChange(id, checked)}
          />{' '}
          <div className="item-desc" data-testid="todo-item">
            {' '}
            {description}
          </div>
        </>
      )}

      <div className="item-space"></div>

      {editMode ? (
        <>
          <button onClick={handleCancelEdit} className="cancel-edit-btn">
            Cancel
          </button>
          <button onClick={handleSaveEdit} className="save-edit-btn">
            Save
          </button>
        </>
      ) : (
        <>
          {!completed && (
            <button className="edit-btn" onClick={() => setEditMode(true)}>
              <EditIcon />
            </button>
          )}
          <button onClick={() => onDelete(id)} className="delete-btn">
            <DeleteIcon />
          </button>
        </>
      )}
    </ul>
  );
};

export default TodoItem;
