import React from "react";

const FormRow = ({type,name,value,handleChange,labletext}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-lable">
        {name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
     
    </div>
  );
};

export default FormRow;
