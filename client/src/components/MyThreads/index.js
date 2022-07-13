import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const MyThreads = ({ currentUser, isLoggedIn }) => {
  const { userID } = useParams();
  const [myThreads, setMyThreads] = useState([]);

  const [curThreadID, setCurThreadID] = useState(0);
  const [curThreadName, setCurThreadName] = useState("");
  const [curThreadDesc, setCurThreadDesc] = useState("");

  const [showThreadPosts, setShowThreadPosts] = useState([]);

  const showCurThreads = (currentThread) => {
    // console.log("hello there");
    // console.log(currentThread.split(","));
    setCurThreadID(currentThread.split(",")[1]);
    setCurThreadName(currentThread.split(",")[2]);
    setCurThreadDesc(currentThread.split(",")[3]);

    Axios.get(
      `http://localhost:3001/subthread/${currentThread.split(",")[1]}`,
      {}
    ).then((response) => {
      console.log(response.data);
      setShowThreadPosts(response.data.reverse());
    });
  };

  const showAllThreadsPost = () => {
    Axios.get(`http://localhost:3001/mythreadsPost/${userID}`, {
      userID: userID,
    }).then((response) => {
      // console.log(response.data);
      setShowThreadPosts(response.data.reverse());
    });
  };

  const unfollowThread = (threadID) => {
    console.log(threadID);

    Axios.delete(`http://localhost:3001/unfollow/${curThreadID}`, {}).then(
      (response) => {
        console.log(response);
      }
    );

    document.getElementById("mythreads").style.display = "none";
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/mythreads/${userID}`, {}).then(
      (response) => {
        // console.log(response.data);
        setMyThreads(response.data);
      }
    );

    Axios.get(`http://localhost:3001/mythreadsPost/${userID}`, {
      userID: userID,
    }).then((response) => {
      // console.log(response.data);
      setShowThreadPosts(response.data.reverse());
    });
  }, []);

  return (
    <div>
      <div className="titleBanner">
        <ListAltOutlinedIcon sx={{ fontSize: "45px", padding: "10px" }} />
        <div>My Threads</div>
      </div>

      <div className="joinedThreadsCont">
        <button className="joinedThreads" onClick={showAllThreadsPost}>
          Show All
        </button>
        {myThreads.map((thread) => (
          <button
            className="joinedThreads"
            key={thread.mythreadsID}
            onClick={(e) => showCurThreads(e.target.value)}
            value={[
              thread.mythreadsID,
              thread.subthreadID,
              thread.threadName,
              thread.threadDesc,
            ]}
          >
            /{thread.threadName}
          </button>
        ))}
      </div>

      {isLoggedIn ? (
        <>
          {showThreadPosts.length > 0 ? (
            <div className="myThreadsPostPage">
              {showThreadPosts.map((post) =>
                parseInt(post.userID) === currentUser.userID ? (
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
                ) : (
                  <div key={post.postID} className="postAllCont">
                    <div className="profileAllCont">
                      <div className="profileIconOut">
                        <div className="profileIconBody"></div>
                      </div>
                      <div className="profileUsername">
                        <p>{post.username}</p>
                      </div>
                    </div>

                    <div className="generalPost">
                      <div className="postTitleCont">
                        <div className="postTitleBorder">
                          <div className="postTitleBody">
                            <h4>{post.title.slice(0, 60)}</h4>
                          </div>
                        </div>
                      </div>

                      <Link to={`/post/${post.postID}`}>
                        <div className="generalPostBorder">
                          <div className="generalPostBody">
                            <p>{post.postBody}</p>
                          </div>
                        </div>
                      </Link>

                      <div className="postDateTimeCont">
                        <div className="postDateTimeBorder">
                          <div className="postDateTimeBody">
                            <p>Posted on {post.dateTime}</p>
                          </div>
                        </div>
                      </div>

                      <div className="iconCont">
                        <div className="iconOut">
                          <div className="iconBody">
                            <FavoriteBorderOutlinedIcon /> <p>num</p>
                          </div>
                        </div>
                        <div className="iconOut">
                          <div className="iconBody">
                            <ChatBubbleOutlineOutlinedIcon /> <p>num</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="notification">
              <p>
                You haven't joined any threads. Check out the threads page join
                any threads you find interesting!!
              </p>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyThreads;
