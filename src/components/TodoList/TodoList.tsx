import React, { FunctionComponent } from 'react';

import Todo from '../../models/Todo';
import TodoItem from '../TodoItem/TodoItem';

interface IProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

const TodoList: FunctionComponent<IProps> = ({
  todos,
  onDelete,
  onComplete
}) => {
  function handleInputChange(id: string, checked: boolean) {
    if (!checked) {
      return;
    }

    onComplete(id);
  }

  return (
    <li>
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onDelete={onDelete}
          onInputChange={handleInputChange}
        />
      ))}
    </li>
  );
};

export default TodoList;
