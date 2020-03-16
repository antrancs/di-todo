import React, { useState } from 'react';
import './App.css';
import Todo from './models/Todo';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');

  function checkIfItemHasAdded(desc: string) {
    const hasAdded = todos.find(todo => todo.description === desc);
    if (hasAdded) {
      setError('Punkten har lagt til før');
      return true;
    }

    setError('');
    return false;
  }

  function handleAddTodo(description: string) {
    if (checkIfItemHasAdded(description)) {
      return false;
    }

    setTodos([
      ...todos,
      {
        id: Date.now().toString(),
        description,
        completed: false
      }
    ]);

    return true;
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

  function handleEdit(id: string, newDesc: string) {
    if (checkIfItemHasAdded(newDesc)) {
      return false;
    }

    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            description: newDesc
          };
        }
        return todo;
      })
    );

    return true;
  }

  return (
    <main className="app-container">
      <AddTodo onAddNewTodo={handleAddTodo} />
      {error && <p>{error}</p>}

      <TodoList
        todos={todos}
        onDelete={handleDelete}
        onComplete={handleComplete}
        onEdit={handleEdit}
      />
    </main>
  );
}

export default App;
