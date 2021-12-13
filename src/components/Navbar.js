import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";

function Navbar() {
  const { loggedInUser, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-between align-items-center text-light">
        <NavLink className="navbar-brand" to="/login">
          Navbar
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
          )}
        </div>
        <div>
          {loggedInUser.user._id ? (
            <>
              <span>Bem-vindo, {loggedInUser.user.name}</span>

              <button onClick={logout} className="btn btn-link">
                Sair
              </button>
            </>
          ) : (
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/login"
            >
              Entrar
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
