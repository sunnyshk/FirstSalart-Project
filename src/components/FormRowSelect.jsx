import React from "react";

const FormRowSelect = ({ name, value, handleChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((e, i) => {
          return (
            <option key={i} value={e}>
              {e}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
