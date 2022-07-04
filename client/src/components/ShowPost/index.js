import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const ShowPost = ({ currentUser }) => {
  const [allPosts, setAllPosts] = useState([]);

  const [comment, setComment] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllPosts", {}).then((response) => {
      //   console.log(response.data);
      setAllPosts(response.data);
    });
  });

  return (
    <div>
      <div className="titleBanner">
        <div>Home</div>
      </div>

      <div className="postsCont">
        {allPosts.map((post) => (
          <Link to={`/post/${post.postID}`} key={post.postID}>
            <div className="posts">
              <div className="userIconCont">
                <div className="userIcon" />
              </div>

              <div className="mainPostCont">
                <div className="postBodyCont">
                  <div className="postBody">
                    <h4>
                      Username: {post.username}, UserID: {post.userID}, postID:{" "}
                      {post.postID}
                    </h4>
                    <h2>{post.title}</h2>
                    <p>{post.postBody}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShowPost;
