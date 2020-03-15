import React, { FunctionComponent } from 'react';

import Todo from '../../models/Todo';
import TodoItem from '../TodoItem/TodoItem';

interface IProps {
  todos: Todo[];
}

const TodoList: FunctionComponent<IProps> = ({ todos }) => {
  return (
    <li>
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </li>
  );
};

export default TodoList;
