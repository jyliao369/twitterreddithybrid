import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Navbar = ({ setCurrentUser, setIsLoggedIn, isLoggedIn }) => {
  const logout = () => {
    Axios.get("http://localhost:3001/logout", {}).then((response) => {
      console.log(response);
      document.getElementById("accountInfo").style.display = "none";
    });
    setIsLoggedIn(false);
    setCurrentUser([]);
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
          <Link to="/login">
            <div className="userIcon" />
            Log In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
