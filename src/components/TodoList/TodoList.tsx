import React, { FunctionComponent } from 'react';

import Todo from '../../models/Todo';
import TodoItem from '../TodoItem/TodoItem';

interface IProps {
  todos: Todo[];
  onDelete: (id: string) => void;
}

const TodoList: FunctionComponent<IProps> = ({ todos, onDelete }) => {
  return (
    <li>
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} onDelete={onDelete} />
      ))}
    </li>
  );
};

export default TodoList;
