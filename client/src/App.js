import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import PostForm from "./components/PostForm";
import ShowPost from "./components/ShowPost";
import Profile from "./components/Profile";
import Explore from "./components/Explore";
import LoginReg from "./components/LoginReg";
import SinglePost from "./components/SinglePost";
import RandomNews from "./components/RandomNews";
import Settings from "./components/Settings";

function App() {
  const [currentUser, setCurrentUser] = useState([]);
  const [usersPosts, setUsersPosts] = useState([]);

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
      // console.log("hello");
      // console.log(response);
      if (response.data.loggedIn === true) {
        // console.log("HELLO THERE");
        // console.log(response);
        setCurrentUser(response.data.user[0]);

        Axios.get(
          `http://localhost:3001/getAllPosts/${response.data.user[0].userID}`,
          {}
        ).then((response) => {
          setUsersPosts(response.data);
        });
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
            setUsersPosts={setUsersPosts}
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

            {/* PROFILE */}
            <Route
              path="/profile"
              element={
                <>
                  <div className="mainPage">
                    <Profile
                      currentUser={currentUser}
                      usersPosts={usersPosts}
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
                    <Settings currentUser={currentUser} />
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

            {/* LOGIN/REGISTER */}
            <Route
              path="/loginReg"
              element={
                <>
                  <div className="mainPage">
                    <LoginReg
                      setCurrentUser={setCurrentUser}
                      currentUser={currentUser}
                      setUsersPosts={setUsersPosts}
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
