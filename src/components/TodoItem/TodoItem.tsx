import React, { FunctionComponent, useState } from 'react';
import classnames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';

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

  index: number;
}

const TodoItem: FunctionComponent<IProps> = ({
  todo,
  onDelete,
  onInputChange,
  onEdit,
  index
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

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // change background colour if dragging
    background: isDragging ? '#d1e0e9' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
  });

  return (
    <Draggable key={todo.id} draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          className={classnames('todo-item', {
            'todo-item--completed': completed
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
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
        </li>
      )}
    </Draggable>
  );
};

export default TodoItem;
