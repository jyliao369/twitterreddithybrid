import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({
  setCurrentUser,
  currentUser,
  setUsersPosts,
  setIsLoggedIn,
  isLoggedIn,
}) => {
  const [emailLogin, setEmailLogin] = useState("");
  const [passLogin, setPassLogin] = useState("");

  const navToProfile = useNavigate();
  const [user, setUser] = useState([]);

  // console.log("Is anyone Logged In?");
  // console.log(isLoggedIn);

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

      navToProfile("/profile");
    }

    setEmailLogin("");
    setPassLogin("");
  };

  return (
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
        {/* <Link onClick={login} style={{ cursor: "pointer" }} to="/profile">
          Log In
        </Link> */}
        <button onClick={login} style={{ cursor: "pointer" }} to="/profile">
          Log In
        </button>

        <br />

        <h4>No Account?</h4>
        <Link to={"/register"}>Register here</Link>
      </div>
    </div>
  );
};

export default Login;
