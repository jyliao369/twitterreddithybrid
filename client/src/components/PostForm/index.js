import React from "react";
import { useState } from "react";
import Axios from "axios";

const PostForm = ({ currentUser }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

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
  );
};

export default PostForm;
