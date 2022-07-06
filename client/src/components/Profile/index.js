import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Profile = ({ currentUser, isLoggedIn }) => {
  const [usersPosts, setUsersPosts] = useState([]);
  const [usersThread, setUsersThread] = useState([]);

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
    document.getElementById(`usersPosts`).style.display = "none";
    document.getElementById(`usersThread`).style.display = "flex";
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

      <div className="categoriesCont">
        <div onClick={showUsersPost}>My Posts</div>
        <div onClick={showUsersThread}>My Threads</div>
      </div>

      <div className="usersPosts" id="usersPosts">
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

      <div className="usersThread">
        {usersThread.map((thread) => (
          <div
            key={thread.subthreadID}
            className="subthreadsCont"
            id="usersThread"
          >
            <Link to={`/subthread/${thread.subthreadID}`}>
              <div className="subthreadInfoCont">
                <div className="userIconCont">
                  <div className="userIcon" />
                </div>
                <div className="subthreadInfo">
                  <h3>/{thread.threadName}</h3>
                  <p>{thread.threadDesc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
