import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('Should disable Add button when input empty', () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  const addBtn = getByText('Legg til');
  const input = getByPlaceholderText(/Hva vil du gjøre i dag?/i);

  const newTodo = '     ';

  fireEvent.change(input, {
    target: {
      value: newTodo
    }
  });

  expect(addBtn).toBeDisabled();
});

test('Should add new todo', () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  const addBtn = getByText('Legg til');
  const input = getByPlaceholderText(/Hva vil du gjøre i dag?/i);

  const newTodo = 'task 1';

  fireEvent.change(input, {
    target: {
      value: newTodo
    }
  });

  fireEvent.click(addBtn);

  // Should clear the input
  expect(input).toHaveValue('');

  expect(getByText('task 1')).toBeInTheDocument();
});
