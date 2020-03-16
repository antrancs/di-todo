import React, { FunctionComponent, useState } from 'react';

import './AddTodo.css';

interface IProps {
  onAddNewTodo: (description: string) => boolean;
}

const AddTodo: FunctionComponent<IProps> = ({ onAddNewTodo }) => {
  const [text, setText] = useState('');

  function handleAddBtnClicked() {
    if (text.trim().length === 0) {
      return;
    }

    if (onAddNewTodo(text)) {
      setText('');
    }
  }

  function handleInputKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      // Enter
      handleAddBtnClicked();
    }
  }

  return (
    <div className="add-todo-wrapper">
      <input
        className="input-todo"
        placeholder="Hva vil du gjøre i dag?"
        value={text}
        onChange={event => setText(event.target.value)}
        onKeyDown={handleInputKeydown}
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
