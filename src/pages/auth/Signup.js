import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";
import { MdAddAlarm } from "react-icons/md";

function Signup(props) {
  const [state, setState] = useState({ name: "", password: "", email: "" });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/signup", state);
      setErrors({ name: "", password: "", email: "" });
      navigate("/login");
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        return setErrors({ ...err.response.data.errors });
      }

      console.error(err);
    }
  }

  return (
    <body className="container text-center py-5 my-5 col-md-3" cz-shortcut-listen="true">

      <main className="form-signin">
        <form onSubmit={handleSubmit}>
        <MdAddAlarm className="m-3" size="60px"/>
            <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
           
            <div className="form-floating my-3">              
              <input
                type="text"
                className="form-control"
                id="signupFormName floatingInput"
                value={state.name}
                error={errors.name}
                onChange={handleChange}
              />
              <label htmlFor="signupFormName floatingInput">Name</label>
            </div>

            <div className="form-floating my-3">              
              <input
                type="email"
                className="form-control"
                id="signupFormEmail floatingInput"
                name="email"                
                value={state.email}
                error={errors.email}
                onChange={handleChange}
              />
              <label htmlFor="signupFormEmail floatingInput">E-mail Address</label>
            </div>

            <div className="form-floating my-3">              
              <input
                type="password"
                className="form-control"
                id="signupFormPassword floatingPassword"
                name="password"                
                value={state.password}
                error={errors.password}
                onChange={handleChange}
              />
              <label htmlFor="signupFormPassword floatingPassword">Password</label>
            </div>

            <div>
              <button type="submit" className="w-100 btn btn-lg btn-primary">Sign Up</button>

              <Link to="/login">Already have an account? Click here to login.</Link>
            </div>
        </form>
      </main>
    </body>
  );
}

export default Signup;
