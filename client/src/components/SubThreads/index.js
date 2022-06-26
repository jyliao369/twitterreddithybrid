import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SubThread = ({ currentUser }) => {
  const [threadName, setThreadName] = useState("");
  const [threadDesc, setThreadDesc] = useState("");

  const [threadList, setThreadList] = useState([]);

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

  useEffect(() => {
    Axios.get("http://localhost:3001/allThread", {}).then((response) => {
      setThreadList(response.data);
    });
  }, [threadList]);

  return (
    <div>
      <div className="createThread">
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
        <button onClick={createThread}>Create Thread</button>
      </div>
      <div className="threadCont">
        {threadList.map((thread) => (
          <Link
            key={thread.subthreadID}
            to={`/subthread/${thread.subthreadID}`}
          >
            <div>/{thread.threadName}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubThread;
