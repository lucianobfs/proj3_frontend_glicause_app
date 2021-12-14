import { useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";

import FormField from "../components/FormField";

import TxtArea from "../components/TxtArea";

import MDEditor from "@uiw/react-md-editor";

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

      setLoading(false);
      navigate("/blog");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
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
       

        {/* <TxtArea
          label="Post Body"
          id="postFormBody"
          name="body"
          onChange={handleChange}
          value={postData.body}
          required
          readOnly={loading}
        /> */}

        {/* <FormField
        type="text-area"
          label="Post Body"
          id="postFormBody"
          name="body"
          onChange={handleChange}
          value={postData.body}
          required
          readOnly={loading}
        /> */}

        <div className="mb-3 text-right">
          <button disabled={loading} type="submit" className="btn btn-primary">
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
  );
}

export default PostCreate;
