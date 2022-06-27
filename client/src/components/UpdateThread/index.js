import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

const UpdateThread = () => {
  const { subthreadID } = useParams();

  const [upThreadName, setUpThreadName] = useState("");
  const [upThreadDesc, setUpThreadDesc] = useState("");

  const naviToThread = useNavigate();

  const updateThread = () => {
    console.log(upThreadName);
    console.log(upThreadDesc);

    Axios.put(`http://localhost:3001/updateSubthread/${subthreadID}`, {
      upThreadName: upThreadName,
      upThreadDesc: upThreadDesc,
    }).then((response) => {
      console.log(response);
      naviToThread(`/subthread/${subthreadID}`);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/allThread", {}).then((response) => {
      // console.log("hello there");
      // console.log(response.data[subthreadID - 1]);
      setUpThreadName(response.data[subthreadID - 1].threadName);
      setUpThreadDesc(response.data[subthreadID - 1].threadDesc);
    });
  }, []);

  return (
    <div>
      <div className="createThread">
        <input
          value={upThreadName}
          onChange={(e) => setUpThreadName(e.target.value)}
          placeholder="Name of Sub-Thread"
        />
        <textarea
          value={upThreadDesc}
          onChange={(e) => setUpThreadDesc(e.target.value)}
          rows={"5"}
          placeholder="Description of Thread"
        />
        {/* <button onClick={createThread}>Create Thread</button> */}
        <button onClick={updateThread}>Update Thread</button>
      </div>
    </div>
  );
};

export default UpdateThread;
