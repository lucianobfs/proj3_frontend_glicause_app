import React from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";

// imports
import hero from "../assets/images/hero-img.jpg";

import api from "../apis/api";
import FormField from "../components/FormField";

function AddGlucose() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    value: 0,
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  console.log(formData);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/glucose", { ...formData });
      console.log(response);
      navigate("/");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <div>
      <div
        className="hero-image d-flex align-items-center justify-content-center "
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          height: "100vh",
        }}
      >
        <div className="hero-text text-white text-center">
          <div className="container container-fluid">
            <h2 style={{ fontSize: "3rem", marginBottom: "75px" }}>
              Add a glucose measurement
            </h2>
            <p style={{ fontSize: "1.8rem" }}>
              Fill the fields below to add a measurement
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <form onSubmit={handleSubmit}>
          <FormField
            label="Glucose Value"
            id="GlucoseInput"
            type="number"
            name="value"
            onChange={handleChange}
            value={formData.value}
            placeholder="The value should be in mg/dL"
            required
          />

          <FormField
            label="Date"
            id="DateInput"
            type="date"
            name="date"
            onChange={handleChange}
            value={formData.date}
            placeholder="Insert the date of the measurement in dd/mm/yyyy format"
            required
          />

          <FormField
            label="Time"
            id="TimeInput"
            type="time"
            name="time"
            onChange={handleChange}
            value={formData.time}
            placeholder="Insert the time of the measurement in hh:mm format"
            required
          />

          <button disabled={loading} type="submit" className="btn btn-primary">
            {loading ? (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            ) : null}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddGlucose;
