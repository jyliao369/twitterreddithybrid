import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

const Settings = ({ currentUser }) => {
  console.log(currentUser);

  const [displayUpdate, setDisplayUpdate] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  const [firstUpdate, setFirstUpdate] = useState("");
  const [emailUpdate, setEmailUpdate] = useState("");

  const [newPass, setNewPass] = useState("");
  const [checkNewPass, setCheckNewPass] = useState("");

  const updateProfile = () => {
    if (newPass === checkNewPass) {
      //   console.log("let's update");
      //   console.log("New Display Name = " + displayUpdate);
      //   console.log("New Last Name = " + lastUpdate);
      //   console.log("New First Name = " + firstUpdate);
      //   console.log("New Email = " + emailUpdate);

      //   console.log("New Pass = " + newPass);
      //   console.log("Re-typed Pass = " + checkNewPass);
      Axios.put(`http://localhost:3001/updateUser/${currentUser.userID}`, {
        displayUpdate: displayUpdate,
        lastUpdate: lastUpdate,
        firstUpdate: firstUpdate,
        emailUpdate: emailUpdate,
        newPass: newPass,
      }).then((response) => {
        console.log(response);
      });
    } else {
      console.log("Passwords do not match. Please try again.");
    }

    setDisplayUpdate("");
    setLastUpdate("");
    setFirstUpdate("");
    setEmailUpdate("");
    setNewPass("");
    setCheckNewPass("");
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login", {}).then((response) => {
      // console.log("hello");
      // console.log(response);
      if (response.data.loggedIn === true) {
        // console.log("HELLO THERE");
        // console.log(response.data.user[0]);
        setDisplayUpdate(response.data.user[0].username);
        setLastUpdate(response.data.user[0].lastName);
        setFirstUpdate(response.data.user[0].firstName);
        setEmailUpdate(response.data.user[0].email);
      }
    });
  }, []);

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
              <Link to="/profile">Complete</Link>
            </button>
          </div>
        </div>
      </div>

      {/* THIS IS SETTINGS. CHANGE NAME, PASSWORD, EMAIL */}
      <div className="updateFormCont">
        <div className="updateForm">
          <div className="userUpdate">
            <h3>Update Profile</h3>
            <input
              placeholder="Display Name"
              value={displayUpdate}
              onChange={(e) => setDisplayUpdate(e.target.value)}
            />
            <input
              placeholder="Last Name"
              value={lastUpdate}
              onChange={(e) => setLastUpdate(e.target.value)}
            />
            <input
              placeholder="First Name"
              value={firstUpdate}
              onChange={(e) => setFirstUpdate(e.target.value)}
            />
            <input
              placeholder="Email"
              value={emailUpdate}
              onChange={(e) => setEmailUpdate(e.target.value)}
            />
          </div>
          <div className="passUpdate">
            <h3>Change Password</h3>
            <input
              placeholder="Password"
              value={newPass}
              type={"password"}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <input
              placeholder="Re-Type Pasword"
              value={checkNewPass}
              type={"password"}
              onChange={(e) => setCheckNewPass(e.target.value)}
            />
          </div>
        </div>
        <div className="updateBtn">
          <button onClick={updateProfile}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
