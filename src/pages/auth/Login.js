import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";
import "../../assets/styles/index.css"

import Accordion from 'react-bootstrap/Accordion'

import hero from "../../assets/images/hero-img.jpg"

import { AuthContext } from "../../contexts/authContext";

function Login(props) {
  const authContext = useContext(AuthContext);

  const { loggedInUser } = useContext(AuthContext);

  const [state, setState] = useState({ password: "", email: "" });
  const [errors, setErrors] = useState({
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
      const response = await api.post("/login", state);
      console.log(response);

      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setErrors({ password: "", email: "" });
      // navigate("/");

      console.log(response.data.user.role)
      if (response.data.user.role === "ADMIN") {
        navigate("/blog")
      } else {
        navigate("/");
      }
      

    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <>
      <div
        className="hero-image d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          height: "calc(100vh - 56px)",
        }}
      >

        <div class="container col-xl-10 col-xxl-8 px-4 py-5">

          <div class="row align-items-center g-lg-5 py-5">

            <div class="col-lg-7 text-center text-lg-start">
              <h1 class="display-4 fw-bold lh-1 mb-3">Vertically centered hero sign-up form</h1>
              <p class="col-lg-10 fs-4">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
            </div>

{loggedInUser.user._id ? null :             <div className="col-md-10 mx-auto col-lg-5">
              <form onSubmit={handleSubmit} className=" p-4 p-md-5">

                <div className="form-floating mb-3">

                  <input
                    type="email"
                    name="email"
                    id="signupFormEmail"
                    value={state.email}
                    error={errors.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <label htmlFor="signupFormEmail">E-mail Address</label>
                </div>

                <div className="form-floating mb-3">

                  <input
                    type="password"
                    name="password"
                    id="signupFormPassword"
                    value={state.password}
                    error={errors.password}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <label htmlFor="signupFormPassword" className="">Password</label>
                </div>

                <div>
                  <button type="submit" className="w-100 btn btn-lg btn-primary">Login</button>
                  <div className="mt-3">
                    <Link to="/signup">Don't have an account? Click here to signup!</Link>
                  </div>
                </div>
              </form>
            </div>}
          </div>
        </div>
      </div>
      <div className="container col-md-3 justify-content-end">
        <Accordion defaultActiveKey="-1">
          <Accordion.Item eventKey="0" className="border-0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <div className="">
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </Accordion.Body>
            </div>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className="border-0">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="border-0">
            <Accordion.Header>Accordion Item #3</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}

export default Login;
