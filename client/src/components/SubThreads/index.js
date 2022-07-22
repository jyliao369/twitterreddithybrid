import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";

const SubThread = ({ currentUser, isLoggedIn }) => {
  const [threadName, setThreadName] = useState("");
  const [threadDesc, setThreadDesc] = useState("");

  const [threadList, setThreadList] = useState([]);

  const [searchThread, setSearchThread] = useState("");

  const openThreadForm = () => {
    if (
      document.getElementById("createThreadFormCont").style.display === "" ||
      document.getElementById("createThreadFormCont").style.display === "none"
    ) {
      document.getElementById("createThreadFormCont").style.display = "flex";
    } else if (
      document.getElementById("createThreadFormCont").style.display === "flex"
    ) {
      document.getElementById("createThreadFormCont").style.display = "none";
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
    }).then(() => {
      Axios.get("http://localhost:3001/allThread", {}).then((response) => {
        console.log(response);
        setThreadList(response.data.reverse());
      });

      setThreadName("");
      setThreadDesc("");
      document.getElementById("createThreadFormCont").style.display = "none";
    });
  };

  const search = () => {
    let filteredThreads = [];
    // console.log(string.includes(word));

    for (let a = 0; a < threadList.length; a++) {
      console.log(threadList[a].threadName);
      console.log(threadList[a].threadName.includes(searchThread));
      if (threadList[a].threadName.includes(searchThread)) {
        filteredThreads.push(threadList[a]);
      } else if (threadList[a].threadDesc.includes(searchThread)) {
        filteredThreads.push(threadList[a]);
      }
    }

    console.log(filteredThreads);
    setThreadList(filteredThreads);
  };

  const resetSearch = () => {
    console.log("hello");
    Axios.get("http://localhost:3001/allThread", {}).then((response) => {
      console.log(response);
      setThreadList(response.data.reverse());
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/allThread", {}).then((response) => {
      setThreadList(response.data.reverse());
    });
  }, [threadList]);

  return (
    <div>
      <div className="titleBanner">
        <FormatListBulletedOutlinedIcon
          sx={{ fontSize: "45px", padding: "10px" }}
        />
        <div>All Threads</div>
      </div>

      <div className="threadSearchPage">
        <div className="threadSearchInputCont">
          <div className="threadSearchInputBorder">
            <div className="threadSearchInputBody">
              <input
                value={searchThread}
                onChange={(e) => setSearchThread(e.target.value)}
                placeholder="Search"
              />
            </div>
          </div>

          <div className="threadSearchAllBtnCont">
            <div className="threadSearchAllBtn">
              {searchThread !== "" ? (
                <div
                  className="threadSearchBtnBorder"
                  style={{ cursor: "pointer" }}
                  onClick={search}
                >
                  <div className="threadSearchBtnBody">
                    <p>Search</p>
                  </div>
                </div>
              ) : (
                <div className="threadSearchBtnBorder">
                  <div className="threadSearchBtnBody">
                    <p>Search</p>
                  </div>
                </div>
              )}

              <div
                className="threadSearchBtnBorder"
                style={{ cursor: "pointer" }}
              >
                <div className="threadSearchBtnBody" onClick={resetSearch}>
                  <p>Reset</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoggedIn ? (
          <div
            className="createThreadBtnBorder"
            style={{ cursor: "pointer" }}
            onClick={openThreadForm}
          >
            <div className="createThreadBtnBody">
              <p>+Thread</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      {isLoggedIn ? (
        <div className="createThreadFormCont" id="createThreadFormCont">
          <div className="createThreadForm">
            <div className="createThreadTitleBorder">
              <div className="createThreadTitleBody">
                <input
                  value={threadName}
                  onChange={(e) => setThreadName(e.target.value)}
                  placeholder="Name of Sub-Thread"
                />
              </div>
            </div>
            <div className="createThreadDescBorder">
              <div className="createThreadDescBody">
                <textarea
                  value={threadDesc}
                  onChange={(e) => setThreadDesc(e.target.value)}
                  rows={"5"}
                  placeholder="Description of Thread"
                />
              </div>
            </div>

            <div className="createThreadBtnAllCont">
              <div className="createThreadBtnAll">
                {threadName !== "" && threadDesc !== "" ? (
                  <div onClick={createThread} style={{ cursor: "pointer" }}>
                    Create Thread
                  </div>
                ) : (
                  <div disabled={false}>Create</div>
                )}

                <div onClick={openThreadForm} style={{ cursor: "pointer" }}>
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="allThreadsCont">
        {threadList.map((thread) => (
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubThread;
