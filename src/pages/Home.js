import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// imports
import hero from "../assets/images/hero-img.jpg";
import Button from "@restart/ui/esm/Button";
import api from "../apis/api";

function Home() {
  const [glucoseList, setGlucoseList] = useState([]);

  useEffect(() => {
    async function fetchGlucoses() {
      try {
        const response = await api.get("/profile");

        setGlucoseList(response.data.glucose);
      } catch (err) {
        console.log(err);
      }
    }

    fetchGlucoses();
  }, []);

  console.log(glucoseList);

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
        <div className="hero-text text-white text-center">
          <h2 style={{ fontSize: "4rem", marginBottom: "75px" }}>User Area</h2>
          <p style={{ fontSize: "1.8rem" }}>
            All the info about your glucose status
          </p>
        </div>
      </div>

      <div className="container container-fluid">
        <Link to="/AddGlucose">
          <Button className="btn btn-primary ms-2 mb-4 mt-4">
            Add a blood glucose measurement
          </Button>
        </Link>

        <Link to="/blog">
          <Button className="btn btn-primary ms-2 mb-4 mt-4">
            blog
          </Button>
        </Link>
      </div>

      <div className="container container-fluid col">
        {glucoseList.map((item) => {
          return (
            <div className="card text-center mb-4">
              <div className="card-header">Glucose Register</div>
              <div className="card-body">
                <h3 className="card-title">{item.value} mg/dL</h3>
                <p className="card-text">
                  Registered on {item.date} at {item.time}
                </p>
                <Link to={`/EditGlucose/${item._id}`} className="btn btn-primary me-2">
                  Edit this measurement
                </Link>
                <Link to="#" className="btn btn-danger">
                  Delete this measurement
                </Link>
              </div>
              <div className="card-footer text-muted">(tentar fazer calculo de quantas horas atras foi)</div>
            </div>
          );
        }).reverse()}
      </div>
    </>
  );
}

export default Home;


