import React, { FunctionComponent } from 'react';
import classnames from 'classnames';

import Todo from '../../models/Todo';
import './TodoItem.css';
import Checkbox from '../Checkbox/Checkbox';
import DeleteIcon from '../Icons/DeleteIcon';

interface IProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onInputChange: (id: string, checked: boolean) => void;
}

const TodoItem: FunctionComponent<IProps> = ({
  todo,
  onDelete,
  onInputChange
}) => {
  return (
    <ul
      className={classnames('todo-item', {
        'todo-item--completed': todo.completed
      })}
    >
      <Checkbox
        checked={todo.completed}
        onChange={checked => onInputChange(todo.id, checked)}
      />
      <div className="item-desc"> {todo.description}</div>

      <div className="item-space"></div>

      <button onClick={() => onDelete(todo.id)} className="delete-btn">
        <DeleteIcon />
      </button>
    </ul>
  );
};

export default TodoItem;
