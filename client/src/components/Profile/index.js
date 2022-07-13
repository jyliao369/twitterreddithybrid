import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

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

  const showUsersPost = () => {
    document.getElementById(`usersComments`).style.display = "none";
    document.getElementById(`usersPosts`).style.display = "flex";
    document.getElementById(`usersThreads`).style.display = "none";
  };

  const showUsersThread = () => {
    console.log("My threads");
    Axios.get(`http://localhost:3001/threads/${currentUser.userID}`, {}).then(
      (response) => {
        console.log(response);
        setUsersThread(response.data);
      }
    );

    document.getElementById(`usersComments`).style.display = "none";
    document.getElementById(`usersPosts`).style.display = "none";
    document.getElementById(`usersThreads`).style.display = "flex";
  };

  const showUsersComment = () => {
    Axios.get(
      `http://localhost:3001/getComments/${currentUser.userID}`,
      {}
    ).then((response) => {
      console.log(response.data);
      setUsersComment(response.data.reverse());
    });

    document.getElementById(`usersComments`).style.display = "flex";
    document.getElementById(`usersPosts`).style.display = "none";
    document.getElementById(`usersThreads`).style.display = "none";
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
  }, []);

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
        <div className="usersPosts" id="usersPosts">
          {usersPosts.map((post) => (
            <div className="postAllCont">
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
        <>
          <div className="usersPosts" id="usersPosts">
            <div className="notification">
              <p>
                You have no posts. Have something you want to share? Check out
                the different threads and share your thoughts.
              </p>
            </div>
          </div>
        </>
      )}

      {usersComment.length > 0 ? (
        <>
          <div className="usersPosts" id="usersComments">
            {usersComment.map((comment) => (
              <div key={comment.commentID} className="userPost">
                <Link to={`/post/${comment.postID}`}>
                  <div className="userCommentCont">
                    <div className="userIconCont">
                      <div className="userIcon" />
                    </div>
                    <div className="userPostMain">
                      <p>{comment.commentBody}</p>
                    </div>
                  </div>
                </Link>
                {/* <div className="editBtn">
                  <button
                    value={comment.postID}
                    onClick={(e) => updatePost(e.target.value)}
                  >
                    Update
                  </button>
                  <button
                    value={comment.postID}
                    onClick={(e) => deletePost(e.target.value)}
                  >
                    Delete
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="usersPosts" id="usersComments">
            <div className="notification">
              <p>
                You have no comments. Share your thoughts and ideas on what
                other people have said.
              </p>
            </div>
          </div>
        </>
      )}

      {usersThread.length > 0 ? (
        <>
          <div className="usersThread" id="usersThreads">
            {usersThread.map((thread) => (
              <div className="eachThreadTheme">
                <div className="threadBannerTitleOut">
                  <div className="threadBannerTitleIn">
                    <h3>/{thread.threadName}</h3>
                  </div>
                </div>
                <Link to={`/subthread/${thread.subthreadID}`}>
                  <div className="threadBannerOut">
                    <div className="threadBannerIn">
                      <p>{thread.threadDesc}</p>
                    </div>
                  </div>
                </Link>
              </div>

              // {isLoggedIn ? (
              //       <button
              //         value={[
              //           thread.subthreadID,
              //           thread.threadName,
              //           thread.threadDesc,
              //         ]}
              //         onClick={(e) => joinThread(e.target.value)}
              //       >
              //         Join
              //       </button>
              //     ) : (
              //       <></>
              //     )}
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="usersThreads" id="usersThreads">
            <div className="notification">
              <p>
                You have no threads. Create a thread and find like-minded
                individuals. Check out the threads section first before you
                create a new thread as there may be one already created.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
