import React from "react";
import { useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";

const Navbar = ({ setCurrentUser, currentUser, setIsLoggedIn, isLoggedIn }) => {
  const logout = () => {
    Axios.get("http://localhost:3001/logout", {}).then((response) => {
      console.log(response);
      document.getElementById("accountInfo").style.display = "none";
    });
    setIsLoggedIn(false);
    setCurrentUser([]);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login", {}).then((response) => {
      if (response.data.loggedIn === true) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  return (
    <div className="navbar">
      <div className="navbarBtns">
        <h1>Threado!</h1>

        <Link to="/">
          <div className="navbarChoices">
            <HomeOutlinedIcon sx={{ fontSize: "45px", paddingRight: "10px" }} />
            <p>Home</p>
          </div>
        </Link>

        <Link to="/explore">
          <div className="navbarChoices">
            <SearchOutlinedIcon
              sx={{ fontSize: "45px", paddingRight: "5px" }}
            />
            <p>Explore</p>
          </div>
        </Link>

        <Link to={"/subthreads"}>
          <div className="navbarChoices">
            <ListOutlinedIcon sx={{ fontSize: "45px", paddingRight: "5px" }} />
            <p>List</p>
          </div>
        </Link>

        {isLoggedIn ? (
          <Link to="/profile">
            <div className="navbarChoices">
              <PermIdentityOutlinedIcon
                sx={{ fontSize: "45px", paddingRight: "5px" }}
              />
              <p>Profile</p>
            </div>
          </Link>
        ) : (
          <></>
        )}

        {isLoggedIn ? (
          <Link to="/profile">
            <div className="navbarChoices">
              <EmailOutlinedIcon
                sx={{ fontSize: "45px", paddingRight: "5px" }}
              />
              <p>Message</p>
            </div>
          </Link>
        ) : (
          <></>
        )}

        {isLoggedIn ? (
          <Link to={`/mythreads/${currentUser.userID}`}>
            <div className="navbarChoices">
              <ListAltOutlinedIcon
                sx={{ fontSize: "45px", paddingRight: "5px" }}
              />
              <p>My Lists</p>
            </div>
          </Link>
        ) : (
          <></>
        )}

        {isLoggedIn ? (
          <Link to={`/bookmark/${currentUser.userID}`}>
            <div className="navbarChoices">
              <BookmarksOutlinedIcon
                sx={{ fontSize: "45px", paddingRight: "5px" }}
              />
              <p>Bookmark</p>
            </div>
          </Link>
        ) : (
          <></>
        )}

        {isLoggedIn ? (
          <Link to="/settings">
            <div className="navbarChoices">
              <SettingsOutlinedIcon
                sx={{ fontSize: "45px", paddingRight: "5px" }}
              />
              <p>Settings</p>
            </div>
          </Link>
        ) : (
          <></>
        )}
      </div>

      {isLoggedIn ? (
        <div className="userIconCont">
          <Link to="/" onClick={logout}>
            <div className="userIcon">
              <LoginOutlinedIcon sx={{ fontSize: "45px" }} />
            </div>
          </Link>
        </div>
      ) : (
        <div className="userIconCont">
          <Link to="/login">
            <div className="userIcon">
              <LoginIcon sx={{ fontSize: "45px" }} />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
