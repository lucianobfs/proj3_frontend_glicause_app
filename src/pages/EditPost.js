import { Link, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../apis/api";

import FormField from "../components/FormField";

function EditPost() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    author: "",
    picture: new File([], ""),
    image: "",
    title: "",
    body: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFormData() {
      try {
        const response = await api.get(`/blog/${id}`);

        delete response.data._id;

        setFormData({ ...response.data });
      } catch (err) {
        console.log(err);
      }
    }
    fetchFormData();
  }, [id]);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  console.log(formData);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await api.patch(`/editPost/${id}`, formData);

      console.log(response);

      navigate("/blog");

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }





  return <div className="container mt-5 mb-5">
          <h1>New Blog Post</h1>
          <form onSubmit={handleSubmit}>
          <FormField
          type="file"
          label="Image"
          id="postFormPicture"
          name="picture"
          onChange={handleChange}
          readOnly={loading}
        />

        <FormField
          label="Post Title"
          id="titleFormName"
          name="title"
          onChange={handleChange}
          value={formData.title}
          required
          readOnly={loading}
        />

        <FormField
          label="Post Body"
          id="postFormBody"
          name="body"
          onChange={handleChange}
          value={formData.body}
          required
          readOnly={loading}
        />

        <div className="mb-3 text-right">
          <button disabled={loading} type="submit" className="btn btn-primary">
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                <span>Carregando...</span>{" "}
              </>
            ) : (
              "Enviar"
            )}
          </button>
        </div>
      </form>
      </div>
}

export default EditPost;
