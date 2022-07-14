import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const SinglePost = ({ currentUser, isLoggedIn }) => {
  const { postID } = useParams();

  const [postOP, setPostOP] = useState("");
  const [postOPID, setPostOPID] = useState("");
  const [postEmail, setPostEmail] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postSubthreadID, setPostSubthreadID] = useState(0);
  const [postDateTime, setPostDateTime] = useState("");

  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState("");

  const postComment = () => {
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

    Axios.post("http://localhost:3001/addComment", {
      postID: postID,
      userID: currentUser.userID,
      username: currentUser.username,
      commentBody: comment,
      dateTime: todayDates + " " + todayTime,
    }).then((response) => {
      console.log(response);
    });

    setComment("");
  };

  const bookkmarkPost = () => {
    Axios.post("http://localhost:3001/bookmark", {
      userID: currentUser.userID,
      postID: postID,
      username: postOP,
      title: postTitle,
      postBody: postBody,
      subthreadID: postSubthreadID,
      dateTime: postDateTime.slice(0, 10) + " " + postDateTime.slice(11, 19),
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/post/${postID}`, {}).then((response) => {
      // console.log(response.data);
      setComments(response.data);
    });

    Axios.get(`http://localhost:3001/posts/${postID}`, {}).then((response) => {
      // console.log(response);
      setPostOP(response.data[0].username);
      setPostOPID(response.data[0].userID);
      setPostEmail(response.data[0].email);
      setPostBody(response.data[0].postBody);
      setPostTitle(response.data[0].title);
      setPostSubthreadID(response.data[0].subthreadID);
      setPostDateTime(response.data[0].dateTime);
    });
  }, [comments]);

  return (
    <div className="postCont">
      <div className="post">
        <div className="postUserInfoCont">
          <div className="userIconCont">
            <div className="userIcon" />
          </div>
          <div className="postUserInfo">
            <h3>Username: {postOP}</h3>
            <h4>UserID: {postOPID}</h4>
            <h4>Email: {postEmail}</h4>
          </div>

          {isLoggedIn ? (
            <div className="bookmarkBtn">
              <button onClick={bookkmarkPost}>Bookmark</button>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="postMainCont">
          <div className="postBody">
            <h2>{postTitle}</h2>
            <p>{postBody}</p>
          </div>
        </div>
      </div>

      {currentUser.userID ? (
        <div className="replyPost">
          <div className="userIconCont">
            <div className="userIcon" />
          </div>
          <div className="replyCont">
            <textarea
              placeholder="Any comments?"
              rows={4.5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button onClick={postComment}>Comment</button>
        </div>
      ) : (
        <></>
      )}

      {comments.length > 0 ? (
        <div className="allPostComments">
          {comments.map((comment) => (
            <div key={comment.commentID} className="commentCont">
              <div className="profileAllCont">
                <div className="profileIconOut">
                  <div className="profileIconBody"></div>
                </div>
                <div className="profileUsername">
                  <p>{comment.username}</p>
                </div>
              </div>
              <div className="commentThemeOut">
                <div className="commentThemeBody">
                  <p>{comment.commentBody}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="notification">
            <p>Nobody has said anything. Why don't you say something?</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePost;
