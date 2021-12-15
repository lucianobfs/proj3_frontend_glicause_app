import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";

import { MdAddAlarm } from "react-icons/md";


function Navbar() {
  const { loggedInUser, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark teste transparent">
      <div className="container-fluid d-flex justify-content-between align-items-center text-light">
        <NavLink className="navbar-brand" to="/login">
          <MdAddAlarm className="mx-2" size="40px"/>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {loggedInUser.user._id ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/login"
                >
                  Home
                </NavLink>
              </li>
              {loggedInUser.user.role === "USER" ? (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to="/"
                  >
                    User Area
                  </NavLink>
                </li>
              ) : null}

              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/blog"
                >
                  Blog
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/login"
                >
                  Home
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <div>
          {loggedInUser.user._id ? (
            <>
              <span className="container-fluid">Welcome, {loggedInUser.user.name}</span>

              <button onClick={logout} className="btn btn-light ms-3">
                Logout
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

{/* <NavLink
  className={({ isActive }) => `nav-link  ${isActive ? "active" : ""}`}
  to="/login"
>
  Login
</NavLink>; */}
