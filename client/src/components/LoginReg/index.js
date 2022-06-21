import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const LoginReg = ({
  setCurrentUser,
  currentUser,
  setUsersPosts,
  setIsLoggedIn,
  isLoggedIn,
}) => {
  const [emailReg, setEmailReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passReg, setPassReg] = useState("");

  const [emailLogin, setEmailLogin] = useState("");
  const [passLogin, setPassLogin] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const [user, setUser] = useState([]);

  console.log("Is anyone Logged In?");
  console.log(isLoggedIn);

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      email: emailReg,
      password: passReg,
    }).then(() => {
      Axios.post("http://localhost:3001/login", {
        password: passReg,
        email: emailReg,
      }).then((response) => {
        // console.log(response.data[0]);
        setCurrentUser(response.data[0]);
      });
    });
  };

  const login = () => {
    if (passLogin === "" && emailLogin === "") {
      console.log("No email or pass detected");
    } else if (emailLogin === "") {
      console.log("No email is provided");
    } else if (passLogin === "") {
      console.log("No password is provided");
    } else {
      setIsLoggedIn(true);
      Axios.post("http://localhost:3001/login", {
        password: passLogin,
        email: emailLogin,
      }).then((response) => {
        setCurrentUser(response.data[0]);
        setUser(response.data[0]);

        Axios.get(
          `http://localhost:3001/getAllPosts/${response.data[0].userID}`,
          {}
        ).then((response) => {
          console.log("hello");
          console.log(response.data);
          setUsersPosts(response.data);
          document.getElementById("accountInfo").style.display = "block";
        });
      });
    }

    setEmailLogin("");
    setPassLogin("");
  };

  // const logout = () => {
  //   Axios.get("http://localhost:3001/logout", {}).then((response) => {
  //     console.log(response);
  //     document.getElementById("accountInfo").style.display = "none";
  //   });
  //   setCurrentUser([]);
  //   setUser([]);
  //   setUsersPosts([]);
  // };

  const changeLogReg = (type) => {
    if (type === "reg") {
      document.getElementById("regForm").style.display = "flex";
      document.getElementById("loginForm").style.display = "none";
    } else if (type === "log") {
      document.getElementById("loginForm").style.display = "flex";
      document.getElementById("regForm").style.display = "none";
    }
  };

  return (
    <div className="formCont" id="formCont">
      <div className="loginForm" id="loginForm">
        <h1>Log In</h1>
        <div className="form">
          <input
            placeholder="Email"
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
          />
          <input
            placeholder="Password"
            type={"password"}
            value={passLogin}
            onChange={(e) => setPassLogin(e.target.value)}
          />

          <Link onClick={login} to="/profile">
            Log In
          </Link>
        </div>

        <div className="logToReg">
          <h4>No Account?</h4>
          <h4 onClick={() => changeLogReg("reg")} style={{ cursor: "pointer" }}>
            Click to Register
          </h4>
        </div>
      </div>

      <div className="regForm" id="regForm">
        <h1>Register</h1>
        <div className="form">
          <input
            placeholder="Username"
            onChange={(e) => setUsernameReg(e.target.value)}
            value={usernameReg}
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

          <button onClick={register} style={{ cursor: "pointer" }}>
            Register
          </button>
        </div>

        <div className="logToReg">
          <h4>Have A Acount?</h4>
          <h4 style={{ cursor: "pointer" }} onClick={() => changeLogReg("log")}>
            Click here Log In
          </h4>
        </div>
      </div>
    </div>
  );
};

export default LoginReg;
