import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../apis/api"

function GlucoseDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function deleteGlucose() {
      try {
        await api.delete(`/glucose/${id}`);
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
    deleteGlucose();
  }, [id, navigate]);

  return <div>Deletando...</div>;
}

export default GlucoseDelete;