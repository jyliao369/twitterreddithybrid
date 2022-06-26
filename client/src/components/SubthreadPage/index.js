import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

const SubthreadPage = ({ currentUser }) => {
  const { subthreadID } = useParams();

  const [threadTitle, setThreadTitle] = useState("");
  const [threadDesc, setThreadDesc] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const [threadPost, setThreadPost] = useState([]);

  console.log(subthreadID);

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

    // console.log("hello there");
    // console.log(currentUser.userID);
    // console.log(currentUser.username);
    // console.log(postTitle);
    // console.log(postBody);
    // console.log(subthreadID);
    // console.log(todayDates + " " + todayTime);
    Axios.post(`http://localhost:3001/addPost`, {
      userID: currentUser.userID,
      username: currentUser.username,
      title: postTitle,
      postBody: postBody,
      subthreadID: subthreadID,
      dateTime: todayDates + " " + todayTime,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/subthread/${subthreadID}`, {}).then(
      (response) => {
        console.log(response.data);
        setThreadTitle("/" + response.data[0].threadName);
        setThreadDesc(response.data[0].threadDesc);
        setThreadPost(response.data);
      }
    );
  }, []);

  return (
    <div>
      <div className="accountBanner">
        <div className="banner"></div>
        <div className="threadPage">
          <div className="accountIconCont">
            <div className="accountIcon" />
            <p>{threadTitle}</p>
          </div>
          <div className="threadDesc">{threadDesc}</div>
        </div>
      </div>

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

      <div>
        {threadPost.map((post) => (
          <div key={post.postID} className="posts">
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
        ))}
      </div>
    </div>
  );
};

export default SubthreadPage;
