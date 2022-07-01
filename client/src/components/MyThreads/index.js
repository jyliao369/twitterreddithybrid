import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const MyThreads = () => {
  const { userID } = useParams();
  const [myThreads, setMyThreads] = useState([]);

  const [curThreadID, setCureThreadID] = useState(0);
  const [curThreadName, setCurThreadName] = useState("");
  const [curThreadDesc, setCurThreadDesc] = useState("");

  const [threadPosts, setThreadPosts] = useState([]);

  const showCurThreads = (currentThread) => {
    // console.log("hello there");
    // console.log(currentThread.split(","));
    setCureThreadID(currentThread.split(",")[0]);
    setCurThreadName(currentThread.split(",")[2]);
    setCurThreadDesc(currentThread.split(",")[3]);

    Axios.get(
      `http://localhost:3001/subthread/${currentThread.split(",")[1]}`,
      {}
    ).then((response) => {
      console.log(response.data);
      setThreadPosts(response.data);
    });

    document.getElementById("mythreads").style.display = "flex";
  };

  const unfollowThread = (threadID) => {
    console.log(threadID);

    Axios.delete(`http://localhost:3001/unfollow/${curThreadID}`, {}).then(
      (response) => {
        console.log(response);
      }
    );

    // document.getElementById("mythreads").style.display = "none";
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/mythreads/${userID}`, {}).then(
      (response) => {
        // console.log(response.data);
        setMyThreads(response.data);
      }
    );
  });

  return (
    <div>
      <div className="joinedThreadsCont">
        {myThreads.map((thread) => (
          <button
            key={thread.mythreadsID}
            onClick={(e) => showCurThreads(e.target.value)}
            value={[
              thread.mythreadsID,
              thread.subthreadID,
              thread.threadName,
              thread.threadDesc,
            ]}
            className="joinedThreads"
          >
            /{thread.threadName}
          </button>
        ))}
      </div>

      <div className="subthreadsCont" id="mythreads">
        <div className="subthreadInfoCont">
          <div className="userIconCont">
            <div className="userIcon" />
          </div>
          <div className="subthreadInfo">
            <h3>/{curThreadName}</h3>
            <p>{curThreadDesc}</p>
          </div>
          <div className="followBtnCont">
            <button
              value={curThreadID}
              onClick={(e) => unfollowThread(e.target.value)}
            >
              Unfollow
            </button>
          </div>
        </div>
      </div>

      <div>
        {threadPosts.map((post) => (
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

export default MyThreads;
