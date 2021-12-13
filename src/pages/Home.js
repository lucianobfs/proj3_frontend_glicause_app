import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// imports
import hero from "../assets/images/hero-img.jpg";
import Button from "@restart/ui/esm/Button";
import api from "../apis/api";
import Graph from "../components/Graph";

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

      <Graph />

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
                <div className="card-header">Glucose Register</div>
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
                    Click here to Change or Delete this measurement
                  </div>
                </Link>
              </div>
            );
          })
          .reverse()}
      </div>
    </>
  );
}

export default Home;
