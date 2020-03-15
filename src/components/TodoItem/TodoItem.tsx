import React, { FunctionComponent } from 'react';

import Todo from '../../models/Todo';

interface IProps {
  todo: Todo;
  onDelete: (id: string) => void;
}

const TodoItem: FunctionComponent<IProps> = ({ todo, onDelete }) => {
  return (
    <ul>
      {todo.description}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </ul>
  );
};

export default TodoItem;
