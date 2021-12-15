import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { MdAddAlarm } from "react-icons/md";

import { useContext } from "react";

import { AuthContext } from "../contexts/authContext";

function NavTeste(props) {
  const { loggedInUser, logout } = useContext(AuthContext);

  return (
    
    <Navbar
      expand={false}
      collapseOnSelect={true}
      className=" teste transparent "
      

    >
      <Container fluid>
        <Navbar.Brand href="/" className="text-white">
          <MdAddAlarm className="mx-2" size="80px" />
          Gli Cause App
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar" className="bg-light"/>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body >
            {loggedInUser.user._id ? (
              <>
                <span className="container-fluid">
                  Welcome, {loggedInUser.user.name}
                </span>

                <button onClick={logout} className="btn btn-light ms-3">
                  Logout
                </button>
              </>
            ) : null}
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Item>
                {" "}
                <Nav.Link
                  to="/login"
                  className="text-decoration-none text-dark"
                  as={Link}
                  eventKey="1"
                >
                  Home
                </Nav.Link>{" "}
              </Nav.Item>
              {loggedInUser.user.role === "USER" ? (
                <>
                  {" "}
                  <Nav.Item>
                    {" "}
                    <Nav.Link
                      to="/"
                      className="text-decoration-none text-dark"
                      as={Link}
                      eventKey="2"
                    >
                      User Area
                    </Nav.Link>{" "}
                  </Nav.Item>
                  <Nav.Item>
                    {" "}
                    <Nav.Link
                      to="/blog"
                      className="text-decoration-none text-dark"
                      as={Link}
                      eventKey="3"
                    >
                      Blog
                    </Nav.Link>{" "}
                  </Nav.Item>{" "}
                </>
              ) : loggedInUser.user.role === "ADMIN" ? (
                <Nav.Item>
                  {" "}
                  <Nav.Link
                    to="/blog"
                    className="text-decoration-none text-dark"
                    as={Link}
                    eventKey="3"
                  >
                    Blog
                  </Nav.Link>{" "}
                </Nav.Item>
              ): null}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    
  );
}

export default NavTeste;
