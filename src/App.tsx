import React, { useState } from 'react';
import './App.css';
import Todo from './models/Todo';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');

  function handleAddTodo(description: string) {
    const hasAdded = todos.find(todo => todo.description === description);
    if (hasAdded) {
      setError('Punkten har lagt til før');
      return;
    }

    setError('');
    setTodos([
      ...todos,
      {
        id: Date.now().toString(),
        description,
        completed: false
      }
    ]);
  }

  function handleDelete(id: string) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function handleComplete(id: string) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: true
          };
        }
        return todo;
      })
    );
  }

  return (
    <div className="App">
      <main>
        <AddTodo onAddNewTodo={handleAddTodo} />
        {error && <p>{error}</p>}

        <TodoList
          todos={todos}
          onDelete={handleDelete}
          onComplete={handleComplete}
        />
      </main>
    </div>
  );
}

export default App;
