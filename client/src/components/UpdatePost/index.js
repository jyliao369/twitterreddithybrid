import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

const UpdatePost = () => {
  const { postID } = useParams();

  console.log(postID);

  const [post, setPost] = useState([]);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updatePostBody, setUpdateBody] = useState("");

  const navToPost = useNavigate();

  const updatePost = () => {
    console.log(updateTitle);
    console.log(updatePostBody);

    Axios.put(`http://localhost:3001/updatePost/${postID}`, {
      title: updateTitle,
      postBody: updatePostBody,
    }).then((response) => {
      console.log(response);
      navToPost(`/post/${postID}`);
    });
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/post/${postID}`, {}).then((response) => {
      setPost(response.data[0]);
      setUpdateTitle(response.data[0].title);
      setUpdateBody(response.data[0].postBody);
    });
  }, []);

  return (
    <div className="postFormCont">
      <div className="userIconCont">
        <div className="userIcon" />
      </div>
      <div className="postForm">
        <input
          placeholder="title"
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value)}
        />
        <textarea
          placeholder="What are you thinking?"
          rows="6"
          value={updatePostBody}
          onChange={(e) => setUpdateBody(e.target.value)}
        />
        <button onClick={updatePost} style={{ cursor: "pointer" }}>
          Post
        </button>
      </div>
    </div>
  );
};

export default UpdatePost;
