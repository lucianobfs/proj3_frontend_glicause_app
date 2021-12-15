import { useState } from "react";

import { useNavigate } from "react-router-dom";

import FormField from "../components/FormField";

import TxtArea from "../components/TxtArea";

import api from "../apis/api";
// import MyEditor from "../components/MyEditor";

function PostCreate() {
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    author: "",
    picture: new File([], ""),
    image: "",
    title: "",
    body: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    if (e.target.files) {
      return setPostData({
        ...postData,
        [e.target.name]: e.target.files[0],
      });
    }

    setPostData({ ...postData, [e.target.name]: e.target.value });
  }

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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const image = await handleFileUpload(postData.picture);

      const response = await api.post("/createPost", {
        ...postData,
        image,
      });

      console.log(response);

      setLoading(false);
      navigate("/blog");
    } catch (err) {
      console.error(err);
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
            Create a Blog Post
          </h2>
          <p style={{ fontSize: "1.8rem" }}>Fill the Fields Below</p>
        </div>
      </div>

      <div className="container mt-5 mb-5">
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
            value={postData.title}
            required
            readOnly={loading}
          />

          <TxtArea
            rows={15}
            label="Post Body"
            id="postFormBody"
            name="body"
            onChange={handleChange}
            value={postData.body}
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
                  <span>Loading...</span>{" "}
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

export default PostCreate;
