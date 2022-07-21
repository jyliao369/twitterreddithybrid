import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const Profile = ({ currentUser, isLoggedIn }) => {
  const [usersPosts, setUsersPosts] = useState([]);
  const [usersThread, setUsersThread] = useState([]);
  const [usersComment, setUsersComment] = useState([]);

  const navToUpdate = useNavigate();

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

  const deleteThread = (subthreadID) => {
    Axios.delete(`http://localhost:3001/deleteThread/${subthreadID}`, {}).then(
      (response) => {
        console.log(response);
      }
    );
  };

  const showUsersPost = () => {
    document.getElementById("allUsersPosts").style.display = "flex";
    document.getElementById("allUsersComments").style.display = "none";
    document.getElementById("allUsersThreads").style.display = "none";
  };

  const showUsersComment = () => {
    document.getElementById("allUsersPosts").style.display = "none";
    document.getElementById("allUsersComments").style.display = "flex";
    document.getElementById("allUsersThreads").style.display = "none";
  };

  const showUsersThread = () => {
    document.getElementById("allUsersPosts").style.display = "none";
    document.getElementById("allUsersComments").style.display = "none";
    document.getElementById("allUsersThreads").style.display = "flex";
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login", {}).then((response) => {
      if (response.data.loggedIn === true) {
        // POSTS
        Axios.get(
          `http://localhost:3001/getAllPosts/${response.data.user[0].userID}`,
          {}
        ).then((response) => {
          setUsersPosts(response.data.reverse());
        });

        // COMMENTS
        Axios.get(
          `http://localhost:3001/getComments/${response.data.user[0].userID}`,
          {}
        ).then((response) => {
          console.log(response.data);
          setUsersComment(response.data.reverse());
        });

        // THREADS
        Axios.get(
          `http://localhost:3001/threads/${response.data.user[0].userID}`,
          {}
        ).then((response) => {
          console.log(response);
          setUsersThread(response.data.reverse());
        });
      }
    });
  }, [usersPosts, usersComment, usersThread]);

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
        </div>
      </div>

      <div className="categoriesCont">
        <div onClick={showUsersPost}>My Posts</div>
        <div onClick={showUsersComment}>My Comments</div>
        <div onClick={showUsersThread}>My Threads</div>
      </div>

      {usersPosts.length > 0 ? (
        <div className="allUsersPosts" id="allUsersPosts">
          {usersPosts.map((post) => (
            <div key={post.postID} className="postAllCont">
              <div className="generalPost">
                <div className="userPostTitleCont">
                  <div className="userPostTitleBorder">
                    <div className="userPostTitleBody">
                      <h4>{post.title.slice(0, 60)}</h4>
                    </div>
                  </div>
                </div>

                <Link to={`/post/${post.postID}`}>
                  <div className="userPostBorder">
                    <div className="userPostBody">
                      <p>{post.postBody}</p>
                    </div>
                  </div>
                </Link>

                <div className="userPostDateTimeCont">
                  <div className="userPostDateTimeBorder">
                    <div className="userPostDateTimeBody">
                      <p>Posted on {post.dateTime}</p>
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
                  <p>{post.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="allUsersPosts" id="allUsersPosts">
          <div className="notification">
            <p>
              You have no posts. Have something you want to share? Check out the
              different threads and share your thoughts.
            </p>
          </div>
        </div>
      )}

      {usersComment.length > 0 ? (
        <div className="allUsersComments" id="allUsersComments">
          {usersComment.map((comment) => (
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

            //   <div className="editBtn">
            //     <button
            //       value={comment.postID}
            //       onClick={(e) => updatePost(e.target.value)}
            //     >
            //       Update
            //     </button>
            //     <button
            //       value={comment.postID}
            //       onClick={(e) => deletePost(e.target.value)}
            //     >
            //       Delete
            //     </button>
            //   </div>
          ))}
        </div>
      ) : (
        <div className="allUsersComments" id="allUsersComments">
          <div className="notification">
            <p>
              You have no comments. Share your thoughts and ideas on what other
              people have said.
            </p>
          </div>
        </div>
      )}

      {usersThread.length > 0 ? (
        <div className="allUsersThreads" id="allUsersThreads">
          {usersThread.map((thread) => (
            <div key={thread.subthreadID} className="threadBannerCont">
              <div className="threadTitleBorder">
                <div className="threadTitleBody">
                  <h3>/{thread.threadName}</h3>
                </div>
              </div>

              <Link to={`/subthread/${thread.subthreadID}`}>
                <div className="threadBorder">
                  <div className="threadBody">
                    <p>{thread.threadDesc}</p>
                  </div>
                </div>
              </Link>

              <div className="threadDateTimeCont">
                <div className="threadDateTimeBorder">
                  <div className="threadDateTimeBody">
                    <p>Posted on {thread.dateTime}</p>
                  </div>
                </div>
              </div>

              <div className="threadEditBtnCont">
                <button
                  className="threadEditBtn"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteThread(thread.subthreadID)}
                >
                  <DeleteForeverOutlinedIcon style={{ fontSize: "30px" }} />
                </button>
                <div
                  className="threadEditBtn"
                  value={thread.subthreadID}
                  style={{ cursor: "pointer" }}
                >
                  <EditOutlinedIcon style={{ fontSize: "30px" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="allUsersThreads" id="allUsersThreads">
          <div className="notification">
            <p>
              You have no threads. Create a thread and find like-minded
              individuals. Check out the threads section first before you create
              a new thread as there may be one already created.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
