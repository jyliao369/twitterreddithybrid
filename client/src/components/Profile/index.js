import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Profile = ({ currentUser, usersPosts }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  console.log("hello There");
  console.log(currentUser);

  // const deletePost = (postID) => {
  //   // console.log(postID);
  //   Axios.delete(`http://localhost:3001/posts/${postID}`, {}).then(
  //     (response) => {
  //       console.log(response);
  //     }
  //   );
  // };

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
        {usersPosts.map((posts) => (
          <div key={posts.postID} className="userPost">
            <div className="userIconCont">
              <div className="userIcon" />
            </div>
            <div className="userPostMain">
              <h3>{posts.title}</h3>
              <p>{posts.postBody}</p>
            </div>

            {/* <button
              value={posts.postID}
              onClick={(e) => deletePost(e.target.value)}
            >
              Delete
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
