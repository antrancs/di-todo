import React, { useState } from 'react';
import './App.css';
import Todo from './models/Todo';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function handleAddTodo(description: string) {
    setTodos([
      ...todos,
      {
        id: Date.now().toString(),
        description,
        completed: false
      }
    ]);
  }

  return (
    <div className="App">
      <main>
        <AddTodo onAddNewTodo={handleAddTodo} />

        <TodoList todos={todos} />
      </main>
    </div>
  );
}

export default App;
