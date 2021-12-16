import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";

import Error from "../../components/Error";

function Signup(props) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      return setError("Senha e confirmação diferentes.");
    }

    try {
      setLoading(true);
      setError(null);

      const response = await api.post(
        "/signup",
        userData
      );

      console.log(response);

      setLoading(false);

      navigate("/login");
    } catch (err) {
      setLoading(false);
      console.error(err);
      if (err.response) {
        console.error(err.response);
        setError(err.response.data);
      }
    }
  }

  return (
    <div>
      <div style={{ height: "100px", backgroundColor: "#62c2ec" }}></div>
      <body
        className="container text-center py-5 my-5 col-md-3"
        cz-shortcut-listen="true"
      >
        <main className="form-signin">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="name"
                id="signupFormName"
                value={userData.name}
                readOnly={loading}
                // error={errors.password}
                onChange={handleChange}
                className="form-control"
              />
              <label htmlFor="signupFormName" className="">
                Name
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                id="signupFormEmail"
                value={userData.email}
                // error={errors.email}
                onChange={handleChange}
                className="form-control"
                readOnly={loading}
              />
              <label htmlFor="signupFormEmail">E-mail Address</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                name="password"
                id="signupFormPassword"
                value={userData.password}
                // error={errors.password}
                onChange={handleChange}
                className="form-control"
                pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
                readOnly={loading}
              />
              <label htmlFor="signupFormPassword" className="">
                Password
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                name="confirmPassword"
                id="signupFormConfirmPassword"
                value={userData.confirmPassword}
                // error={errors.password}
                onChange={handleChange}
                className="form-control"
                readOnly={loading}
              />
              <label htmlFor="signupFormConfirmPassword" className="">
                Confirm Password
              </label>
            </div>

            <div className="mb-3">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary w-100"
                style={{ height: "48px" }}
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : null}
                Signup!
              </button>
              <div
                style={{ backgroundColor: "grey", color: "white" }}
                className="rounded mt-3"
              >
                <span>
                  The password must contain at least: 8 characters, one upper
                  case letter, one number, and one special character
                </span>
              </div>
            </div>

            {error ? <Error>{error}</Error> : null}
          </form>
        </main>
        <Link to="/login">Already have an account? Click here to login.</Link>
      </body>
    </div>
  );
}

export default Signup;
