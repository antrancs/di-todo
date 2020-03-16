import React, { useState, FunctionComponent } from 'react';

import './Filter.css';

export enum FilterStatus {
  All = 0,
  Completed,
  Incomplete
}

interface IProps {
  onFilterChange: (value: FilterStatus) => void;
  onDeleteCompleted: () => void;
}

const Filter: FunctionComponent<IProps> = ({
  onFilterChange,
  onDeleteCompleted
}) => {
  const [filter, setFilter] = useState(FilterStatus.All);

  function handleOptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = +event.target.value;
    setFilter(value);
    onFilterChange(value);
  }

  return (
    <div className="filter-wrapper">
      <div>
        <input
          type="radio"
          id="filter-all"
          name="todo-status"
          value={FilterStatus.All}
          checked={filter === FilterStatus.All}
          onChange={handleOptionChange}
        />
        <label htmlFor="filter-all"> Alle</label>

        <input
          type="radio"
          id="filter-complete"
          name="todo-status"
          value={FilterStatus.Completed}
          checked={filter === FilterStatus.Completed}
          onChange={handleOptionChange}
        />
        <label htmlFor="filter-complete"> Utført </label>

        <input
          type="radio"
          id="filter-incomplete"
          name="todo-status"
          value={FilterStatus.Incomplete}
          checked={filter === FilterStatus.Incomplete}
          onChange={handleOptionChange}
        />
        <label htmlFor="filter-incomplete">Gjenstående </label>
      </div>

      <button className="clear-btn" onClick={onDeleteCompleted}>
        Clear completed
      </button>
    </div>
  );
};

export default Filter;
