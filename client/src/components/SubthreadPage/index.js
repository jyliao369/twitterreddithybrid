import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const SubthreadPage = ({ currentUser, isLoggedIn }) => {
  const { subthreadID } = useParams();

  const [threadTitle, setThreadTitle] = useState("");
  const [threadDesc, setThreadDesc] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const [threadPost, setThreadPost] = useState([]);

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

  const openPostForm = () => {
    document.getElementById("postFormCont").style.display = "flex";
    document.getElementById("createThreadBtn").style.display = "none";
  };

  const closePostForm = () => {
    document.getElementById("postFormCont").style.display = "none";
    document.getElementById("createThreadBtn").style.display = "flex";
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/allThread", {}).then((response) => {
      //   console.log("hello there");
      //   console.log(response.data[subthreadID - 1]);
      setThreadTitle("/" + response.data[subthreadID - 1].threadName);
      setThreadDesc(response.data[subthreadID - 1].threadDesc);
    });

    Axios.get(`http://localhost:3001/subthread/${subthreadID}`, {}).then(
      (response) => {
        // console.log("hello there");
        // console.log(response.data);
        if (response.data.length > 0) {
          setThreadPost(response.data.reverse());
        } else {
          setThreadPost([]);
        }
      }
    );
  }, [threadPost]);

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

      {isLoggedIn ? (
        <div className="formCont">
          <div
            className="createThreadBtn"
            id="createThreadBtn"
            onClick={openPostForm}
          >
            <h2>Create a Post</h2>
          </div>

          <div className="postFormCont" id="postFormCont">
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

              <div className="postFormBtnCont">
                {postTitle !== "" && postBody !== "" ? (
                  <button onClick={addPost} style={{ cursor: "pointer" }}>
                    Post
                  </button>
                ) : (
                  <button disabled={true} style={{ cursor: "pointer" }}>
                    Post
                  </button>
                )}

                <button onClick={closePostForm} style={{ cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {threadPost.length > 0 ? (
        <>
          {threadPost.map((post) => (
            <Link to={`/post/${post.postID}`}>
              <div key={post.postID} className="posts">
                <div className="userIconCont">
                  <div className="userIcon" />
                </div>
                <div className="mainPostCont">
                  <div className="postBodyCont">
                    <div className="postBody">
                      <h4>
                        Username: {post.username}, UserID: {post.userID},
                        postID: {post.postID}
                      </h4>
                      <h2>{post.title}</h2>
                      <p>{post.postBody}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <>
          <div className="notification">
            <p>There are no posts here. Be the first and say soemthing.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SubthreadPage;
