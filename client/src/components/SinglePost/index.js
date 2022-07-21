import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const SinglePost = ({ currentUser, isLoggedIn }) => {
  const { postID } = useParams();

  const [postOP, setPostOP] = useState("");
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

  const openCommentForm = () => {
    if (
      document.getElementById("commentPostFormCont").style.display !== "flex"
    ) {
      document.getElementById("commentPostFormCont").style.display = "flex";
    } else {
      document.getElementById("commentPostFormCont").style.display = "none";
    }
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
      setPostBody(response.data[0].postBody);
      setPostTitle(response.data[0].title);
      setPostSubthreadID(response.data[0].subthreadID);
      setPostDateTime(response.data[0].dateTime);
    });
  }, [comments]);

  return (
    <div className="postCont">
      <div className="postAllCont">
        <div className="generalPost">
          <div className="userPostTitleCont">
            <div className="userPostTitleBorder">
              <div className="userPostTitleBody">
                <h4>{postTitle.slice(0, 60)}</h4>
              </div>
            </div>
          </div>

          {isLoggedIn ? (
            <div className="bookmarkAllBtnCont">
              <div className="bookmarkBtnCont">
                <div className="bookmarkBtn">
                  <button onClick={bookkmarkPost}>Bookmark</button>
                </div>
                <div className="bookmarkBtn">
                  <button
                    onClick={openCommentForm}
                    style={{ cursor: "pointer" }}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="userPostBorder">
            <div className="userPostBody">
              <p>{postBody}</p>
            </div>
          </div>

          <div className="userPostDateTimeCont">
            <div className="userPostDateTimeBorder">
              <div className="userPostDateTimeBody">
                <p>Posted on {postDateTime}</p>
              </div>
            </div>
          </div>

          <div className="userIconAll">
            <div className="userIconCont">
              <div className="userIconOut">
                <div className="userIconBody">
                  <FavoriteBorderOutlinedIcon /> <p>num</p>
                </div>
              </div>
              <div className="userIconOut">
                <div className="userIconBody">
                  <ChatBubbleOutlineOutlinedIcon /> <p>num</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profileAllCont">
          <div className="profileIconOut">
            <div className="profileIconBody"></div>
          </div>
          <div className="userProfileUsername">
            <p>{postOP}</p>
          </div>
        </div>
      </div>

      {currentUser.userID ? (
        <div className="commentPostFormCont" id="commentPostFormCont">
          <div className="profileAllCont">
            <div className="profileIconOut">
              <div className="profileIconBody"></div>
            </div>
            <div className="profileUsername">
              <p>{currentUser.username}</p>
            </div>
          </div>
          <div className="commentPostFormAllCont">
            <div className="commentPostFormBorder">
              <div className="commentPostFormBody">
                <textarea
                  placeholder="Any comments?"
                  rows={4.5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
            <div className="addCommentBtnCont">
              <div className="addCommentBtn">
                {comment !== "" ? (
                  <button onClick={postComment}>Comment</button>
                ) : (
                  <>
                    <button disabled={true}>Comment</button>
                  </>
                )}

                <button onClick={openCommentForm}>Cancel</button>
              </div>
            </div>
          </div>
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

              <div>
                <div className="commentThemeOut">
                  <div className="commentThemeBody">
                    <p>{comment.commentBody}</p>
                  </div>
                </div>
                <div className="commentDateTimeCont">
                  <div className="commentDateTimeBorder">
                    <div className="commentDateTimeBody">
                      <p>{comment.dateTime}</p>
                    </div>
                  </div>
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
