import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

const SubthreadPage = () => {
  const { subthreadID } = useParams();

  const [threadTitle, setThreadTitle] = useState("");
  const [threadDesc, setThreadDesc] = useState("");

  console.log(subthreadID);

  useEffect(() => {
    Axios.get(`http://localhost:3001/subthread/${subthreadID}`, {}).then(
      (response) => {
        console.log(response.data[0]);
        setThreadTitle("/" + response.data[0].threadName);
        setThreadDesc(response.data[0].threadDesc);
      }
    );
  }, []);

  return (
    <div className="accountBanner">
      <div className="banner"></div>
      <div className="threadPage">
        <div className="accountIconCont">
          <div className="accountIcon" />
          {/* <h2>@{currentUser.username}</h2>
          <h3>{currentUser.email}</h3> */}
          <p>{threadTitle}</p>
        </div>

        <div className="threadDesc">{threadDesc}</div>
      </div>
    </div>
  );
};

export default SubthreadPage;
