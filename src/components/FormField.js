import "bootstrap/dist/css/bootstrap.min.css";
// import { Link, Routes, Route, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";

function FormField(props) {
  return (
    <div>
      <label htmlFor={props.id} className="form-label text-dark">
        {props.label}
      </label>
      <input
        type={props.type}
        className="form-control mb-3"
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        required={props.required}
        pattern={props.pattern}
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default FormField;
