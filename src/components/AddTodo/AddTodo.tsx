import React, { FunctionComponent, useState } from 'react';

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
    <div>
      <input
        placeholder="Hva vil du gjøre i dag"
        value={text}
        onChange={event => setText(event.target.value)}
      />

      <button onClick={handleAddBtnClicked} disabled={text.trim().length === 0}>
        Legg til
      </button>
    </div>
  );
};

export default AddTodo;
