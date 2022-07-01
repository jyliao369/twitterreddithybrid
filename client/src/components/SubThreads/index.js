import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SubThread = ({ currentUser, isLoggedIn }) => {
  const [threadName, setThreadName] = useState("");
  const [threadDesc, setThreadDesc] = useState("");
  const [status, setStatus] = useState("");

  const [threadList, setThreadList] = useState([]);

  const [searchThread, setSearchThread] = useState("");

  const openThreadForm = () => {
    console.log("opening threadform");
    if (
      document.getElementById("createThread").style.display === "" ||
      document.getElementById("createThread").style.display === "none"
    ) {
      console.log(true);
      document.getElementById("createThread").style.display = "flex";
      document.getElementById("createThreadBtn").style.display = "none";
    } else if (
      document.getElementById("createThread").style.display === "flex"
    ) {
      document.getElementById("createThread").style.display = "none";
      document.getElementById("createThreadBtn").style.display = "flex";
    }
  };

  const createThread = () => {
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

    Axios.post(`http://localhost:3001/addThread`, {
      userID: currentUser.userID,
      username: currentUser.username,
      threadName: threadName,
      threadDesc: threadDesc,
      dateTime: todayDates + " " + todayTime,
    });
  };

  const joinThread = (thread) => {
    // console.log("current userID " + currentUser.userID);
    // console.log("thread ID " + thread.split(",")[0]);
    // console.log("thread name " + thread.split(",")[1]);
    // console.log("thread desc " + thread.split(",")[2]);

    Axios.post(`http://localhost:3001/jointhread`, {
      userID: currentUser.userID,
      subthreadID: thread.split(",")[0],
      threadName: thread.split(",")[1],
      threadDesc: thread.split(",")[2],
    }).then((response) => console.log(response));
  };

  const search = () => {
    console.log(searchThread);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/allThread", {}).then((response) => {
      setThreadList(response.data);
    });
  }, [threadList]);

  return (
    <div>
      <div className="searchPage">
        <input
          value={searchThread}
          onChange={(e) => setSearchThread(e.target.value)}
          placeholder="Search"
        />
        <div style={{ cursor: "pointer" }} onClick={search}>
          Search
        </div>
        <div style={{ cursor: "pointer" }}>Reset</div>
      </div>

      {isLoggedIn ? (
        <div className="createThreadCont">
          <div
            className="createThreadBtn"
            id="createThreadBtn"
            onClick={openThreadForm}
          >
            <h2>Create a Thread</h2>
          </div>
          <div className="createThread" id="createThread">
            <input
              value={threadName}
              onChange={(e) => setThreadName(e.target.value)}
              placeholder="Name of Sub-Thread"
            />
            <textarea
              value={threadDesc}
              onChange={(e) => setThreadDesc(e.target.value)}
              rows={"5"}
              placeholder="Description of Thread"
            />
            <div className="createBtnCont">
              <div onClick={createThread}>Create Thread</div>
              <>{status}</>
              <div onClick={openThreadForm}>Cancel</div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div>
        {threadList.map((thread) => (
          <div key={thread.subthreadID} className="subthreadsCont">
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
            <div className="editBtn">
              <button>
                <Link to={`/updateSubThread/${thread.subthreadID}`}>
                  update
                </Link>
              </button>
              <button>delete</button>
              <button
                value={[
                  thread.subthreadID,
                  thread.threadName,
                  thread.threadDesc,
                ]}
                onClick={(e) => joinThread(e.target.value)}
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubThread;
