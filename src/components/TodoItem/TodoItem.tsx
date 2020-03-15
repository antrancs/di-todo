import React, { FunctionComponent } from 'react';

import Todo from '../../models/Todo';

interface IProps {
  todo: Todo;
}

const TodoItem: FunctionComponent<IProps> = ({ todo }) => {
  return <ul>{todo.description}</ul>;
};

export default TodoItem;
