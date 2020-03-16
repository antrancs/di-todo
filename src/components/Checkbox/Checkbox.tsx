import React, { FunctionComponent } from 'react';

import './Checkbox.css';
import CheckIcon from '../Icons/CheckIcon';

interface IProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox: FunctionComponent<IProps> = ({ checked, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        className="cb-input"
        checked={checked}
        onChange={event => onChange(event.target.checked)}
      />
      <span className="cb-span">{checked && <CheckIcon />}</span>
    </label>
  );
};

export default Checkbox;
