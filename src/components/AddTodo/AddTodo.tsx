import React, { FunctionComponent, useState } from 'react';

import './AddTodo.css';

interface IProps {
  onAddNewTodo: (description: string) => void;
}

const AddTodo: FunctionComponent<IProps> = ({ onAddNewTodo }) => {
  const [text, setText] = useState('');

  function handleAddBtnClicked() {
    onAddNewTodo(text);
    setText('');
  }

  return (
    <div className="add-todo-wrapper">
      <input
        className="input-todo"
        placeholder="Hva vil du gjøre i dag"
        value={text}
        onChange={event => setText(event.target.value)}
      />

      <button
        onClick={handleAddBtnClicked}
        disabled={text.trim().length === 0}
        className="add-btn"
      >
        Legg til
      </button>
    </div>
  );
};

export default AddTodo;
