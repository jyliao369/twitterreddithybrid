import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Navbar = ({
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
    setIsLoggedIn(false);
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

        {/* {currentUser.userID ? (
          <button>
            <Link to="/profile">Profile</Link>
          </button>
        ) : (
          <></>
        )} */}

        {isLoggedIn ? (
          <button>
            <Link to="/profile">Profile</Link>
          </button>
        ) : (
          <></>
        )}

        {isLoggedIn ? (
          <button>
            <Link to="/settings">Settings</Link>
          </button>
        ) : (
          <></>
        )}
      </div>

      {isLoggedIn ? (
        <div className="userIconCont">
          <Link to="/" onClick={logout}>
            <div className="userIcon" />
            Log Out
          </Link>
        </div>
      ) : (
        <div className="userIconCont">
          <Link to="/loginReg">
            <div className="userIcon" />
            Log In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
