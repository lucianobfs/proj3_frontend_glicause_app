import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../apis/api";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


import { AuthContext } from "../contexts/authContext";

import ConfirmationModal from "../components/ConfirmationModal";

function PostDetails() {
  const { loggedInUser } = useContext(AuthContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(`/blog/${id}`);

        setPost(response.data);
        console.log(loggedInUser.user.role);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPost();
  }, [id]);

  return (
    <>
      <div style={{height: "100px", backgroundColor: "#62c2ec"}}></div>

      <div className="container">
        {loading ? (
          <div
            className="text-center d-flex justify-content-center align-items-end"
            style={{ height: "300px" }}
          >
            <div className="spinner-border" role="status"></div>
          </div>
        ) : (
          <div className="row mt-5">
            <div className="text-center mt-5">
              <h1 className="mb-5">{post.title}</h1>

              <div className="align-items-center">
                <img src={post.image} className="w-100 h" alt={post.name}/>
              </div>
            </div>

            <div className="col-md-2 mt-5 ">
              <div>
                <FaFacebookSquare
                  color="#0A83ED"
                  size="50px"
                  className="mb-3 me-1"
                />
                <FaTwitterSquare
                  color="#00ACEE"
                  size="50px"
                  className="mb-3 me-1"
                />
                <FaInstagram color="#C32AA3" size="50px" className="mb-3" />{" "}
              </div>

              <div>
                <p>
                  <span> Written by Admin</span>
                </p>
              </div>

              {loggedInUser.user.role === "ADMIN" ? (
                <div>
                  <Link to={`/EditPost/${post._id}`}>
                    <button type="button" className="btn btn-secondary me-1">
                      Edit Post
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setShowModal(true)}
                  >
                    Delete
                  </button>
                </div>
              ) : null}

              <ConfirmationModal
                title="Are you sure?"
                variant="danger"
                confirmationText="Deletar"
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleConfirmation={() => {
                  navigate(`/post/delete/${id}`);
                  setShowModal(false);
                }}
              >
                This action is irreversible
              </ConfirmationModal>
            </div>

            <div className="col-md-9 mt-5">{post.body}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default PostDetails;
