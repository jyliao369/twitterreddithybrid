import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import PostForm from "./components/PostForm";
import ShowPost from "./components/ShowPost";
import Profile from "./components/Profile";
import Explore from "./components/Explore";
import Login from "./components/Login";
import Register from "./components/Register";
import SinglePost from "./components/SinglePost";
import RandomNews from "./components/RandomNews";
import Settings from "./components/Settings";

function App() {
  const [currentUser, setCurrentUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  Axios.defaults.withCredentials = true;

  // const getAllUsers = () => {
  //   Axios.get("http://localhost:3001/getAllUsers", {}).then((response) => {
  //     console.log(response.data);
  //     setAllUsers(response.data);
  //   });
  //   if (showUsers === true) {
  //     setShowUsers(false);
  //   } else {
  //     setShowUsers(true);
  //   }
  // };

  // const deleteUser = (e) => {
  //   Axios.delete(`http://localhost:3001/${e.target.value}`, {}).then(
  //     (response) => {
  //       console.log(response);
  //     }
  //   );

  //   setAllUsers(
  //     allUsers.filter((user) => user.userID !== parseInt(e.target.value))
  //   );
  // };

  // const setUpdate = (e) => {
  //   console.log(e.target.value);
  //   Axios.get(`http://localhost:3001/posts/${e.target.value}`, {}).then(
  //     (response) => {
  //       console.log(response.data[0]);
  //       setUpdateTitle(response.data[0].title);
  //       SetUpdatePostBody(response.data[0].postBody);
  //       setUpdateID(response.data[0].postID);
  //     }
  //   );
  // };

  // const updatePost = () => {
  //   Axios.put(`http://localhost:3001/updatePost/${updateID}`, {
  //     title: updateTitle,
  //     postBody: udpatePostBody,
  //   });
  // };

  useEffect(() => {
    Axios.get("http://localhost:3001/login", {}).then((response) => {
      if (response.data.loggedIn === true) {
        setCurrentUser(response.data.user[0]);
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="appCont">
          <Navbar
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
          />

          <Routes>
            {/* HOME PAGE */}
            <Route
              path="/"
              element={
                <>
                  <div className="mainPage">
                    <div className="homePage" id="homePage">
                      {currentUser.userID ? (
                        <PostForm currentUser={currentUser} />
                      ) : (
                        <></>
                      )}
                      <ShowPost currentUser={currentUser} />
                    </div>
                  </div>
                </>
              }
            />

            {/* EXPLORE */}
            <Route
              path="/explore"
              element={
                <>
                  <div className="mainPage">
                    <Explore />
                  </div>
                </>
              }
            />

            {/* SINGLE POST AND COMMENTS WITH IT */}
            <Route
              path="/post/:postID"
              element={
                <>
                  <div className="mainPage">
                    <SinglePost currentUser={currentUser} />
                  </div>
                </>
              }
            />

            {/* LOGIN */}
            <Route
              path="/login"
              element={
                <>
                  <div className="mainPage">
                    <Login
                      setCurrentUser={setCurrentUser}
                      currentUser={currentUser}
                      setIsLoggedIn={setIsLoggedIn}
                      isLoggedIn={isLoggedIn}
                    />
                  </div>
                </>
              }
            />

            {/* REGISTER */}
            <Route
              path="/register"
              element={
                <>
                  <div className="mainPage">
                    <Register
                      setCurrentUser={setCurrentUser}
                      currentUser={currentUser}
                      setIsLoggedIn={setIsLoggedIn}
                      isLoggedIn={isLoggedIn}
                    />
                  </div>
                </>
              }
            />

            {/* PROFILE */}
            <Route
              path="/profile"
              element={
                <>
                  <div className="mainPage">
                    <Profile
                      currentUser={currentUser}
                      isLoggedIn={isLoggedIn}
                    />
                  </div>
                </>
              }
            />

            {/* THIS IS FOR SETTINGS */}
            <Route
              path="/settings"
              element={
                <>
                  <div className="mainPage">
                    <Settings
                      setCurrentUser={setCurrentUser}
                      currentUser={currentUser}
                    />
                  </div>
                </>
              }
            />
          </Routes>

          <RandomNews />
        </div>
      </div>
    </Router>
  );
}

export default App;
