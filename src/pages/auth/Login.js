import { AuthContext } from "../../contexts/authContext";
import api from "../../apis/api";
import "../../assets/styles/index.css";
import hero from "../../assets/images/hero-img.jpg";
import location from "../../assets/images/sv.png";

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Accordion from 'react-bootstrap/Accordion'
import CountUp, { useCountUp } from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

import { FcBiohazard } from "react-icons/fc";
import { FcBiotech } from "react-icons/fc";
import { FcElectricalSensor } from "react-icons/fc";

import { FaBookMedical } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaFileMedicalAlt } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

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

            {loggedInUser.user._id ? null : <div className="col-md-10 mx-auto col-lg-5">
              <form onSubmit={handleSubmit} className="p-4 p-md-5 rounded" style={{ backgroundColor: "white" }}>

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

      <div className="container col-xl-10 col-xxl-8 px-4 py-5 ">
        <div className="row align-items-center g-lg-5 py-5">

          <div class="col-lg-7 text-center text-lg-start mt-5 pt-5">
            <h1 class="display-4 fw-bold lh-1 mb-3">How to use our application quickly</h1>
          </div>

          <div className="col-md-10 mx-auto col-lg-5 mt-5 pt-5">
            <Accordion defaultActiveKey="" >
              <Accordion.Item eventKey="0" className="noselect" style={{ border: "none" }}>
                <Accordion.Header><FcElectricalSensor size="45px"/> <h2 className="mx-5 fw-bold" style={{ color: "#383838" }}>Step One 1#</h2>
                </Accordion.Header>
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
              <Accordion.Item eventKey="1" style={{ border: "none" }}>
                <Accordion.Header><FcBiotech size="45px"/> <h2 className="mx-5 fw-bold" style={{ color: "#383838" }}>Step Two 2#</h2></Accordion.Header>
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
              <Accordion.Item eventKey="2" style={{ border: "none" }}>
                <Accordion.Header><FcBiohazard size="45px"/> <h2 className="mx-5 fw-bold" style={{ color: "#383838" }}>Step Three 3#</h2></Accordion.Header>
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
        </div>
      </div>

      <div className="container text-center my-5 py-5">
        <div className="row ">

          <div className="col-lg-4">
            <i className="card-img-top" src="..." alt="Card image cap">
              <FaUserAlt className="pt-2" size="50px" />
            </i>
            <div className="card-body">
              <CountUp start={0} end={15226754} delay={0} duration={4} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <div>
                      <h1 className="fw-bold" ref={countUpRef} />
                    </div>
                  </VisibilitySensor>
                )}
              </CountUp>

              <p className="card-text fw-bold">
                USERS mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <i className="card-img-top" src="..." alt="Card image cap">
              <FaFileMedicalAlt className="pt-2" size="50px" />
            </i>
            <div className="card-body">
              <CountUp start={0} end={15226754} delay={0} duration={4} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <div>
                      <h1 className="fw-bold" ref={countUpRef} />
                    </div>
                  </VisibilitySensor>
                )}
              </CountUp>

              <p className="card-text fw-bold">
                MEASURES mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <i className="card-img-top" src="..." alt="Card image cap">
              <FaBookMedical className="pt-2" size="50px" />
            </i>
            <div className="card-body">
              <CountUp start={0} end={15226754} delay={0} duration={4} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <div>
                      <h1 className="fw-bold" ref={countUpRef} />
                    </div>
                  </VisibilitySensor>
                )}
              </CountUp>

              <p className="card-text fw-bold">
                HEALTHY TIPS mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="">
        <div
          className="hero-image d-flex align-items-center justify-content-center"
          style={{
            backgroundImage: `url(${location})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
            height: "calc(60vh - 56px)",
          }}
        >

          <div className="container">
            <div className="row">
              <div className="col-md-6 my-3">
                <h2>367 Addison Ave, Palo Alto, CA <br /> 94301, United States</h2>
              </div>
              <div className="col-md-6 text-lg-end my-3">
                <h2>+1 (521) 734 315</h2>
              </div>
              <hr />
            </div>

            <div className="row">
              <div className="col-md-6  my-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="text-decoration-none text-dark mx-2"
                >
                  <FaFacebookF color="#0A83ED" size="35px" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="text-decoration-none text-dark mx-2"
                >
                  <FaInstagram color="#C32AA3" size="35px" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="text-decoration-none text-dark mx-2"
                >
                  <FaTwitter color="#00ACEE" size="35px" />
                </a>
              </div>
              <div className="col-md-6 text-lg-end my-3">
                <p>Copyrights © 2021</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Login;
