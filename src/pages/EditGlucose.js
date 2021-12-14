import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../apis/api";

import FormField from "../components/FormField";
import hero from "../assets/images/hero-img.jpg";

function EditGlucose() {
  const navigate = useNavigate();

  const params = useParams();

  const [formData, setFormData] = useState({
    value: 0,
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFormData() {
      try {
        const response = await api.get(`/glucose/${params.id}`);

        delete response.data._id;

        setFormData({ ...response.data });
      } catch (err) {
        console.log(err);
      }
    }
    fetchFormData();
  }, [params.id]);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  console.log(formData);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await api.patch(`/glucose/${params.id}`, formData);

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
        className="hero-image d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          height: "calc(100vh - 56px)",
        }}
      >
        <div className="hero-text text-white">
          <h2 style={{ fontSize: "4rem", marginBottom: "75px" }}>
            Edit a existent glucose measurement
          </h2>
          <div className="container container-fluid mt-5 mb-5 bg-white rounded">
            <form onSubmit={handleSubmit}>
              <FormField
                className="text-dark"
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

              <button
                disabled={loading}
                type="submit"
                className="btn btn-dark mb-3"
              >
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
      </div>
    </div>
  );
}

export default EditGlucose;
