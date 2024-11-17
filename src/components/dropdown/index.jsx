import React from "react";

const Dropdown = ({ options, value, onChange, style, className }) => {
  return (
    <span className={className}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={style}
    >
      {options?.map((option) => (
        <option key={option?.value} value={option?.value}>
          {option?.label}
        </option>
      ))}
    </select>
    </span>
  );
};

Dropdown.defaultProps = {
  options: [],
  value: "",
  onChange: () => {},
};

export default Dropdown;
