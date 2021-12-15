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

  function handleChange(e) {
    if (e.target.files) {
      return setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  console.log(formData);

  async function handleFileUpload(file) {
    try {
      const uploadData = new FormData();

      uploadData.append("picture", file);

      const response = await api.post("/upload", uploadData);

      console.log(response);

      return response.data.url;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const image = await handleFileUpload(formData.picture);

      const response = await api.patch(`/editPost/${id}`, {
        ...formData,
        image,
      });

      console.log(response);

      setLoading(false);

      navigate("/blog");

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className=" d-flex align-items-center justify-content-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://res.cloudinary.com/dzm8l29kq/image/upload/v1639530362/pictures/wordpress-g53cddbcc5_1920_yafmzo.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          height: "100vh",
        }}
      >
        <div className="hero-text text-white text-center">
          <h2 style={{ fontSize: "4rem", marginBottom: "75px" }}>
           Edit a Post
          </h2>
          <p style={{ fontSize: "1.8rem" }}>Edit the Fields Below</p>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <h1>Edit Blog Post</h1>
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
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary"
            >
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
    </>
  );
}

export default EditPost;
