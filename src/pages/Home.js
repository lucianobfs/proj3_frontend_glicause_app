import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

// imports
import hero from "../assets/images/hero-img.jpg";
import Button from "@restart/ui/esm/Button";
import api from "../apis/api";
import Graph from "../components/Graph";
import CountUp, { useCountUp } from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { FaFileMedicalAlt } from "react-icons/fa";
import { FaSyringe } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";

function Home() {
  const [glucoseList, setGlucoseList] = useState([]);

  const [originalArr, setOriginalArr] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [warning, setWarning] = useState(false);

  let [formData, setFormData] = useState({
    initialDate: "",
    finalDate: "",
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value || event.target.option,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("o formData: ", formData);

    if (formData.initialDate !== "" && formData.finalDate !== "") {
      console.log("CAIU NO IF");

      if (new Date(formData.initialDate) > new Date(formData.finalDate)) {
        setWarning(true);
        setShowModal(true);
      } else {
        setGlucoseList(
          originalArr.filter((item) => {
            return (
              new Date(item.date) >= new Date(formData.initialDate) &&
              new Date(item.date) <= new Date(formData.finalDate)
            );
          })
        );
      }
    }
  }

  useEffect(() => {
    async function fetchGlucoses() {
      try {
        const response = await api.get("/profile");

        setOriginalArr(response.data.glucose);

        setGlucoseList(response.data.glucose);
      } catch (err) {
        console.log(err);
      }
    }

    fetchGlucoses();
  }, []);

  console.log("a glucoseList: ", glucoseList);

  function glucoFunction() {
    return glucoseList
      .map((item) => {
        return item.value;
      })
      .reduce((valoranterior, valoratual) => {
        return valoranterior + valoratual;
      }, 0);
  }

  let sortedArr = glucoseList.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  console.log(glucoFunction());

  console.log(
    glucoseList.map((item) => {
      return item.value;
    })
  );

  return (
    <>
      <div
        className=" d-flex align-items-center justify-content-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://res.cloudinary.com/dzm8l29kq/image/upload/v1639575964/pictures/teadsadasdf_tpeuwp.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          height: "100vh",
        }}
      >
        <div className="hero-text text-white text-center">
          <h2 style={{ fontSize: "4rem", marginBottom: "75px" }}>User Area</h2>
          <p style={{ fontSize: "1.8rem" }}>
            All the info about your blood glucose status
          </p>
        </div>
      </div>

      {glucoseList.length === 0 ? null : (
        <>
          <div className="container container-fluid d-flex d-row align-items-center text-center justify-content-center mt-3">
            <form onSubmit={handleSubmit}>
              <label className="label">
                Start:
                <input
                  className="form-control"
                  type="date"
                  name="initialDate"
                  value={formData.initialDate}
                  onChange={handleChange}
                />
              </label>

              <label className="label ">
                End:
                <input
                  className="form-control"
                  type="date"
                  name="finalDate"
                  value={formData.finalDate}
                  onChange={handleChange}
                />
              </label>

              <div className="mt-3 d-flex justify-content-around container-fluid container">
                <button type="submit" className="btn btn-light w-45">
                  Filter
                </button>
                <button
                  type="submit"
                  className="btn btn-primary w-45"
                  onClick={() => {
                    setFormData({
                      initialDate: "",
                      finalDate: "",
                    });
                    setGlucoseList([...originalArr]);
                  }}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
          <Graph glucoseList={glucoseList} />
          <div style={{ backgroundColor: "#62c2ec" }} className="">
            <div className="container text-center my-5 py-5">
              <div className="row ">
                <div className="col-lg-3">
                  <i className="card-img-top" src="..." alt="Card image cap">
                    <FaSyringe className="pt-2" size="50px" />
                  </i>
                  <div className="card-body">
                    <CountUp
                      start={0}
                      end={glucoseList.length}
                      delay={0}
                      duration={2}
                      redraw={true}
                    >
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <div>
                            <h1 className="fw-bold" ref={countUpRef} />
                          </div>
                        </VisibilitySensor>
                      )}
                    </CountUp>

                    <p className="card-text fw-bold">
                      Blood Glucose Measurements
                    </p>
                  </div>
                </div>

                <div className="col-lg-3">
                  <i className="card-img-top" src="..." alt="Card image cap">
                    <FaFileMedicalAlt className="pt-2" size="50px" />
                  </i>
                  <div className="card-body">
                    <CountUp
                      start={0}
                      end={glucoFunction() / glucoseList.length}
                      delay={0}
                      duration={2}
                      redraw={true}
                      decimals={2}
                    >
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <div>
                            <h1 className="fw-bold" ref={countUpRef} />
                          </div>
                        </VisibilitySensor>
                      )}
                    </CountUp>

                    <p className="card-text fw-bold">
                      Averege Blood Glucose in mg/dL
                    </p>
                  </div>
                </div>

                <div className="col-lg-3">
                  <i className="card-img-top" src="..." alt="Card image cap">
                    <FaArrowAltCircleUp className="pt-2" size="50px" />
                  </i>
                  <div className="card-body">
                    <CountUp
                      start={0}
                      end={Math.max.apply(
                        Math,
                        glucoseList.map((item) => {
                          return item.value;
                        })
                      )}
                      delay={0}
                      duration={2}
                      redraw={true}
                    >
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <div>
                            <h1 className="fw-bold" ref={countUpRef} />
                          </div>
                        </VisibilitySensor>
                      )}
                    </CountUp>

                    <p className="card-text fw-bold">Highest Measurement</p>
                  </div>
                </div>

                <div className="col-lg-3">
                  <i className="card-img-top" src="..." alt="Card image cap">
                    <FaArrowAltCircleDown className="pt-2" size="50px" />
                  </i>
                  <div className="card-body">
                    <CountUp
                      start={0}
                      end={Math.min.apply(
                        Math,
                        glucoseList.map((item) => {
                          return item.value;
                        })
                      )}
                      delay={0}
                      duration={2}
                      redraw={true}
                    >
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <div>
                            <h1 className="fw-bold" ref={countUpRef} />
                          </div>
                        </VisibilitySensor>
                      )}
                    </CountUp>

                    <p className="card-text fw-bold">Lowest Measurement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="container container-fluid">
        <Link to="/AddGlucose">
          <Button className="btn btn-primary ms-2 mb-4 mt-4">
            Add a blood glucose measurement
          </Button>
        </Link>
      </div>

      <div className="container container-fluid col">
        {glucoseList
          .map((item) => {
            return (
              <div className="card text-center mb-4" key={item._id}>
                <div className="card-header">Blood Glucose Register</div>
                <Link
                  to={`/glucose/${item._id}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="card-body">
                    <h3 className="card-title">{item.value} mg/dL</h3>
                    <p className="card-text">
                      Registered on {item.date} at {item.time}
                    </p>
                  </div>
                  <div className="card-footer text-muted">
                    Click to Change or Delete
                  </div>
                </Link>
              </div>
            );
          })
          .reverse()}
      </div>

      {warning ? (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Erro</Modal.Title>
          </Modal.Header>
          <Modal.Body>Filtragem inválida</Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setShowModal(false);
                setFormData({
                  initialDate: "",
                  finalDate: "",
                });
              }}
            >
              Ok
            </button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
}

export default Home;
