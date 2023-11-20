import React, { useState } from "react";
import "./CustomInputNumber.css";

const CustomInputNumber = ({
  min,
  max,
  step,
  name,
  value,
  onChange,
  onBlur,
  disabled,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange({ target: { name, value: newValue } });
    }
  };

  const handleInputBlur = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onBlur) {
      onBlur({ target: { name, value: newValue } });
    }
  };

  const handleIncrement = () => {
    let newValue = Number(inputValue) + step;
    if (max !== undefined && newValue > max) {
      newValue = max;
    }
    setInputValue(newValue);
    if (onChange) {
      onChange({ target: { name, value: newValue } });
    }
  };

  const handleDecrement = () => {
    let newValue = Number(inputValue) - step;
    if (min !== undefined && newValue < min) {
      newValue = min;
    }
    setInputValue(newValue);
    if (onChange) {
      onChange({ target: { name, value: newValue } });
    }
  };

  return (
    <div className="custom-input-number-container">
      <button
        className="custom-input-number-button"
        onClick={handleDecrement}
        disabled={min !== undefined && inputValue <= min}
      >
        -
      </button>
      <input
        type="number"
        name={name}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={disabled}
        className="custom-input-number-input"
      />
      <button
        className="custom-input-number-button"
        onClick={handleIncrement}
        disabled={disabled || (max !== undefined && inputValue >= max)}
      >
        +
      </button>
    </div>
  );
};

export default CustomInputNumber;
