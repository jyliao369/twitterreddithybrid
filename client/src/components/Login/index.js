import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setCurrentUser, currentUser, setIsLoggedIn, isLoggedIn }) => {
  const [emailLogin, setEmailLogin] = useState("");
  const [passLogin, setPassLogin] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const navToProfile = useNavigate();

  const login = () => {
    if (passLogin === "" && emailLogin === "") {
      setLoginStatus("No email or pass detected");
    } else if (emailLogin === "") {
      setLoginStatus("No email is provided");
    } else if (passLogin === "") {
      setLoginStatus("No password is provided");
    } else {
      Axios.post("http://localhost:3001/login", {
        password: passLogin,
        email: emailLogin,
      }).then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          // console.log(response);
          setLoginStatus("");
          setCurrentUser(response.data[0]);
          setIsLoggedIn(true);

          setEmailLogin("");
          setPassLogin("");
          navToProfile("/profile");
        }
      });
    }
  };

  return (
    <div className="logRegCont">
      <div className="loginFormCont">
        <h1>Log In</h1>

        <div className="status">
          <p>{loginStatus}</p>
        </div>

        <div className="loginForm">
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
          <button onClick={login} style={{ cursor: "pointer" }} to="/profile">
            Log In
          </button>

          <br />

          <h4>No Account?</h4>
          <Link to={"/register"}>Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
