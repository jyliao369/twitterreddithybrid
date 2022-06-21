import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, Navigate } from "react-router-dom";
import App from "../../App";

const Profile = ({ currentUser, isLoggedIn }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [usersPosts, setUsersPosts] = useState([]);

  console.log("Is the user Logged In?");
  console.log(isLoggedIn);

  const addPost = () => {
    Axios.post("http://localhost:3001/addPost", {
      userID: currentUser.userID,
      username: currentUser.username,
      title: postTitle,
      postBody: postBody,
    });

    setPostTitle("");
    setPostBody("");
  };

  const deletePost = (postID) => {
    console.log(postID);
    Axios.delete(`http://localhost:3001/posts/${postID}`, {}).then((response) =>
      console.log(response)
    );
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login", {}).then((response) => {
      if (response.data.loggedIn === true) {
        // console.log("HELLO THERE");
        // console.log(response);
        Axios.get(
          `http://localhost:3001/getAllPosts/${response.data.user[0].userID}`,
          {}
        ).then((response) => {
          console.log(response.data);
          setUsersPosts(response.data);
        });
      }
    });
  });

  if (!isLoggedIn) {
    return <Navigate to="/loginReg" />;
  } else if (isLoggedIn) {
    <Navigate to="/profile" />;
  }

  return (
    <div>
      <div className="accountBanner">
        <div className="banner"></div>
        <div className="account">
          <div>
            <div className="accountIcon" />
            <h2>@{currentUser.username}</h2>
            <h3>{currentUser.email}</h3>
          </div>
          <div>
            <button>
              <Link to="/settings">Settings</Link>
            </button>
          </div>
        </div>
      </div>

      {/* THE SAME FORM FOUND ON THE POSTFORM COMPONENT */}
      <div className="postFormCont">
        <div className="userIconCont">
          <div className="userIcon" />
        </div>

        <div className="postForm">
          <input
            placeholder="title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <textarea
            placeholder="What are you thinking?"
            rows="6"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
          <button onClick={addPost} style={{ cursor: "pointer" }}>
            Post
          </button>
        </div>
      </div>

      <div className="usersPosts">
        {usersPosts.map((post) => (
          <div className="userPost">
            <div className="userIconCont">
              <div className="userIcon" />
            </div>
            <Link key={post.postID} to={`/post/${post.postID}`}>
              <div className="userPostMain">
                <h3>{post.title}</h3>
                <p>{post.postBody}</p>
              </div>
            </Link>

            <div className="editBtn">
              <button>update</button>
              <button
                value={post.postID}
                onClick={(e) => deletePost(e.target.value)}
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
