import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import App from "../../App";

const Profile = ({ currentUser, isLoggedIn }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [usersPosts, setUsersPosts] = useState([]);

  // console.log("Is the user Logged In?");
  // console.log(isLoggedIn);

  const navToUpdate = useNavigate();

  const addPost = () => {
    var todayDate = new Date();
    var todayDates =
      todayDate.getFullYear() +
      "-" +
      (todayDate.getMonth() + 1) +
      "-" +
      todayDate.getDate();

    var todayTime =
      todayDate.getHours() +
      ":" +
      todayDate.getMinutes() +
      ":" +
      todayDate.getSeconds();

    // console.log(todayDates + " " + todayTime);

    Axios.post("http://localhost:3001/addPost", {
      userID: currentUser.userID,
      username: currentUser.username,
      title: postTitle,
      postBody: postBody,
      dateTime: todayDates + " " + todayTime,
    });

    // setPostTitle("");
    // setPostBody("");
  };

  const deletePost = (postID) => {
    // console.log(postID);
    Axios.delete(`http://localhost:3001/posts/${postID}`, {}).then((response) =>
      console.log(response)
    );
  };

  const updatePost = (postID) => {
    // console.log(postID);
    navToUpdate(`/updatePost/${postID}`);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login", {}).then((response) => {
      if (response.data.loggedIn === true) {
        Axios.get(
          `http://localhost:3001/getAllPosts/${response.data.user[0].userID}`,
          {}
        ).then((response) => {
          setUsersPosts(response.data.reverse());
        });
      }
    });
  });

  if (!isLoggedIn) {
    <Navigate to={"/login"} />;
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
          <div key={post.postID} className="userPost">
            <div className="userIconCont">
              <div className="userIcon" />
            </div>
            <Link to={`/post/${post.postID}`}>
              <div className="userPostMain">
                <h3>{post.title}</h3>
                <p>{post.postBody}</p>
              </div>
            </Link>

            <div className="editBtn">
              <button
                value={post.postID}
                onClick={(e) => updatePost(e.target.value)}
              >
                Update
              </button>
              <button
                value={post.postID}
                onClick={(e) => deletePost(e.target.value)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
