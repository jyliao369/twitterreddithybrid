import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Navbar = ({ setCurrentUser, currentUser, setUsersPosts }) => {
  const [emailReg, setEmailReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passReg, setPassReg] = useState("");

  const [emailLogin, setEmailLogin] = useState("");
  const [passLogin, setPassLogin] = useState("");

  const [user, setUser] = useState([]);

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
        setUsersPosts(response.data);
        document.getElementById("accountInfo").style.display = "block";
      });
    });

    setEmailLogin("");
    setPassLogin("");
  };

  const logout = () => {
    Axios.get("http://localhost:3001/logout", {}).then((response) => {
      console.log(response);
      document.getElementById("accountInfo").style.display = "none";
    });
    setCurrentUser([]);
    setUser([]);
    setUsersPosts([]);
  };

  return (
    <div className="navbar">
      <div className="navbarBtns">
        <button>What's On Your Mind?</button>

        <button>
          <Link to="/">Home</Link>
        </button>

        <button>
          <Link to="/explore">Explore</Link>
        </button>

        <button>Messages</button>

        {currentUser.userID ? (
          <button>
            <Link to="/profile">Profile</Link>
          </button>
        ) : (
          <></>
        )}

        {currentUser.userID ? (
          <button>
            <Link to="/settings">Settings</Link>
          </button>
        ) : (
          <></>
        )}
      </div>

      {currentUser.userID ? (
        <div className="userIconCont">
          <Link to="/" onClick={logout}>
            <div className="userIcon" />
          </Link>
        </div>
      ) : (
        <div className="userIconCont">
          <Link to="/loginReg">
            <div className="userIcon" />
          </Link>
        </div>
      )}

      {/* <div onClick={logout} className="accountBtn">
        <div className="userIconCont">
          <div className="userIcon" />
        </div>
        <div className="accountInfo" id="accountInfo">
          <p>{currentUser.username}</p>
          <p>{currentUser.email}</p>
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
