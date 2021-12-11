import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// imports
import hero from "../assets/images/hero-img.jpg";
import Button from "@restart/ui/esm/Button";
import api from "../apis/api";

function Blog() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get("/blog");

        setPostList(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPosts();
  }, []);

  console.log(postList);

  return (
    <div className="row row-cols-1 row-cols-md-2 g-4 container-fluid">
      {postList.map((item) => {
        return (
          <div className="col ">
            <Link to={`/${item._id}`} className="text-decoration-none text-dark">
              <div className="card text-center">
                <img src={item.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-text">{item.body}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">{item.date.split("T")[0]}</small>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Blog;

{
  /* <div class="card">
<img src="..." class="card-img-top" alt="..." />
<div class="card-body">
  <h5 class="card-title">Card title</h5>
  <p class="card-text">
    This is a longer card with supporting text below as a natural
    lead-in to additional content. This content is a little bit
    longer.
  </p>
</div>
</div> */
}

{
  /* <div class="row row-cols-1 row-cols-md-2 g-4">
<div class="col">
  <div class="card">
    <img src="..." class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">
        This is a longer card with supporting text below as a natural
        lead-in to additional content. This content is a little bit
        longer.
      </p>
    </div>
  </div>
</div>
</div> */
}
