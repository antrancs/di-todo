import React, { FunctionComponent } from 'react';

import Todo from '../../models/Todo';

interface IProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

const TodoItem: FunctionComponent<IProps> = ({
  todo,
  onDelete,
  onComplete
}) => {
  return (
    <ul>
      {todo.description}
      {todo.completed ? 'Yes' : 'No'}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
      <button onClick={() => onComplete(todo.id)}>Complete</button>
    </ul>
  );
};

export default TodoItem;
