import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setCurrentUser, currentUser, setIsLoggedIn, isLoggedIn }) => {
  const [emailLogin, setEmailLogin] = useState("");
  const [passLogin, setPassLogin] = useState("");

  const navToProfile = useNavigate();

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
      });

      navToProfile("/profile");
    }

    setEmailLogin("");
    setPassLogin("");
  };

  return (
    <div className="logRegCont">
      <div className="loginFormCont">
        <h1>Log In</h1>
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
