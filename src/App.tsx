import React, { useState, useMemo } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import './App.css';
import Todo from './models/Todo';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';
import Filter, { FilterStatus } from './components/Filter/Filter';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);

  const [error, setError] = useState('');

  const filteredTodos = useMemo(() => {
    switch (filterStatus) {
      case FilterStatus.All:
        return todos;
      case FilterStatus.Completed:
        return todos.filter(todo => todo.completed);
      case FilterStatus.Incomplete:
        return todos.filter(todo => !todo.completed);
    }
  }, [todos, filterStatus]);

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

  function handleDeleteCompleted() {
    setTodos(todos.filter(todo => !todo.completed));
  }

  function reorder(list: Todo[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(todos, result.source.index, result.destination.index);

    setTodos(items);
  }

  return (
    <main className="app-container">
      <AddTodo onAddNewTodo={handleAddTodo} />
      {error && <p>{error}</p>}

      <Filter
        onFilterChange={setFilterStatus}
        onDeleteCompleted={handleDeleteCompleted}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <TodoList
          todos={filteredTodos}
          onDelete={handleDelete}
          onComplete={handleComplete}
          onEdit={handleEdit}
        />
      </DragDropContext>
    </main>
  );
}

export default App;
