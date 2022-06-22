import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const Register = ({
  setCurrentUser,
  currentUser,
  setIsLoggedIn,
  isLoggedIn,
}) => {
  const [emailReg, setEmailReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [passReg, setPassReg] = useState("");
  const [retypePassReg, setRetypePassReg] = useState("");

  const navToProfile = useNavigate();

  const register = (event) => {
    event.preventDefault();

    if (
      emailReg === "" ||
      usernameReg === "" ||
      firstNameReg === "" ||
      lastNameReg === "" ||
      passReg === "" ||
      retypePassReg === ""
    ) {
      console.log("Missing important info");
    } else if (passReg === retypePassReg) {
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
      console.log(todayDates + " " + todayTime);
      Axios.post("http://localhost:3001/register", {
        username: usernameReg,
        firstName: firstNameReg,
        lastName: lastNameReg,
        email: emailReg,
        password: passReg,
        dateTime: todayDates + " " + todayTime,
      }).then(() => {
        setIsLoggedIn(true);
        Axios.post("http://localhost:3001/login", {
          password: passReg,
          email: emailReg,
        }).then((response) => {
          // console.log(response.data[0]);
          setCurrentUser(response.data[0]);
        });
      });

      navToProfile("/profile");
    } else {
      console.log("passwords do not match");
    }
  };

  return (
    <div className="regFormCont">
      <h1>Register</h1>
      <div className="regForm">
        <input
          placeholder="Username"
          onChange={(e) => setUsernameReg(e.target.value)}
          value={usernameReg}
        />
        <input
          placeholder="Last Name"
          onChange={(e) => setLastNameReg(e.target.value)}
          value={lastNameReg}
        />
        <input
          placeholder="First Name"
          onChange={(e) => setFirstNameReg(e.target.value)}
          value={firstNameReg}
        />
        <input
          placeholder="Email"
          onChange={(e) => setEmailReg(e.target.value)}
          value={emailReg}
        />
        <input
          placeholder="Password"
          type={"password"}
          onChange={(e) => setPassReg(e.target.value)}
          value={passReg}
        />
        <input
          placeholder="Re-Type Password"
          type={"password"}
          onChange={(e) => setRetypePassReg(e.target.value)}
          value={retypePassReg}
        />
        {/* <Link onClick={register} style={{ cursor: "pointer" }} to="/profile">
          Register
        </Link> */}
        <button onClick={register} style={{ cursor: "pointer" }} to="/profile">
          Register
        </button>

        <br />

        <h4>Have an Account?</h4>
        <Link to={"/login"}>Log in here</Link>
      </div>
    </div>
  );
};

export default Register;
