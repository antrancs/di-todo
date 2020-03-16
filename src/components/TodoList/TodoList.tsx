import React, { FunctionComponent } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Todo from '../../models/Todo';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

interface IProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onEdit: (id: string, newDesc: string) => boolean;
}

const TodoList: FunctionComponent<IProps> = ({
  todos,
  onDelete,
  onEdit,
  onComplete
}) => {
  function handleInputChange(id: string, checked: boolean) {
    if (!checked) {
      return;
    }

    onComplete(id);
  }

  return (
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <ul
          className="todo-list"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {todos.map((todo, index) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              onDelete={onDelete}
              onInputChange={handleInputChange}
              onEdit={onEdit}
              index={index}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default TodoList;
