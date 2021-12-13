import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../apis/api";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { NavItem } from "react-bootstrap";

import { AuthContext } from "../contexts/authContext";

import { Navigate } from "react-router-dom";

import ConfirmationModal from "../components/ConfirmationModal";
import caneta from "../assets/images/diabetes.jpg";

function GlucoseDetails() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  const [details, setDetails] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGlucose() {
      let teste = [];

      const response = await api.get("/profile");

      const resArr = response.data.glucose;

      const foundGlucose = resArr.map((item) => {
        if (item._id === id) {
          teste.push(item);
        }
        return teste;
      })[0];

      setDetails(...foundGlucose);
    }

    fetchGlucose();
  }, [id]);

  console.log(details);

  return (
    <>
      <div
        className="hero-image d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${caneta})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          height: "calc(100vh - 56px)",
        }}
      >
        <div className="hero-text text-white text-center">
          <h2 style={{ fontSize: "4rem", marginBottom: "75px" }}>
            {details.value} mg/dL
          </h2>
          <p style={{ fontSize: "1.8rem" }}>
            on {details.date} at {details.time}
          </p>
          <div className="mt-5">
            <Link
              to={`/EditGlucose/${details._id}`}
              className="btn btn-light me-2"
            >
              Edit this measurement
            </Link>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
            <div>
              <Link to="/" className="btn btn-primary mt-5">
                Back to User Area
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        title="Tem certeza?"
        variant="danger"
        confirmationText="Deletar"
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirmation={() => {
          navigate(`/glucose/delete/${id}`);
          setShowModal(false);
        }}
      >
        Essa ação é irreversível
      </ConfirmationModal>
    </>
  );
}

export default GlucoseDetails;
