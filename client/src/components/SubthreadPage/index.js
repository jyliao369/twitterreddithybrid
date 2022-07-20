import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const SubthreadPage = ({ currentUser, isLoggedIn }) => {
  const { subthreadID } = useParams();

  const [threadTitle, setThreadTitle] = useState("");
  const [threadDesc, setThreadDesc] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const [threadPost, setThreadPost] = useState([]);

  const addPost = () => {
    var todayDate = new Date();
    var todayDates =
      todayDate.getFullYear() +
      "-" +
      (todayDate.getMonth() + 1) +
      "-" +
      todayDate.getDate();

    var todayTime =
      todayDate.getHours() +
      ":" +
      todayDate.getMinutes() +
      ":" +
      todayDate.getSeconds();

    Axios.post(`http://localhost:3001/addPost`, {
      userID: currentUser.userID,
      username: currentUser.username,
      title: postTitle,
      postBody: postBody,
      subthreadID: subthreadID,
      dateTime: todayDates + " " + todayTime,
    }).then((response) => {
      console.log(response);
    });
  };

  const openPostForm = () => {
    document.getElementById("postFormAllCont").style.display = "flex";
    document.getElementById("createThreadBtn").style.display = "none";
  };

  const closePostForm = () => {
    document.getElementById("postFormAllCont").style.display = "none";
    document.getElementById("createThreadBtn").style.display = "flex";

    setPostTitle("");
    setPostBody("");
  };

  // const joinThread = (thread) => {
  //   Axios.post(`http://localhost:3001/jointhread`, {
  //     userID: currentUser.userID,
  //     subthreadID: thread.split(",")[0],
  //     threadName: thread.split(",")[1],
  //     threadDesc: thread.split(",")[2],
  //   }).then((response) => console.log(response));
  // };

  useEffect(() => {
    Axios.get("http://localhost:3001/allThread", {}).then((response) => {
      //   console.log("hello there");
      //   console.log(response.data[subthreadID - 1]);
      setThreadTitle("/" + response.data[subthreadID - 1].threadName);
      setThreadDesc(response.data[subthreadID - 1].threadDesc);
    });

    Axios.get(`http://localhost:3001/subthread/${subthreadID}`, {}).then(
      (response) => {
        // console.log("hello there");
        // console.log(response.data);
        if (response.data.length > 0) {
          setThreadPost(response.data.reverse());
        } else {
          setThreadPost([]);
        }
      }
    );
  }, [threadPost]);

  return (
    <div>
      <div className="accountBanner">
        <div className="banner"></div>
        <div className="threadPage">
          <div className="accountIconCont">
            <div className="accountIcon" />
            <p>{threadTitle}</p>
          </div>

          <div className="threadDescCont">
            <div className="threadDescBorder">
              <div className="threadDescBody">
                <p>{threadDesc}</p>
              </div>
            </div>

            <div className="allBtnCont">
              <div className="allBtn">
                <div>
                  <h3>+Bookmark</h3>
                </div>
                <div style={{ cursor: "pointer" }} onClick={openPostForm}>
                  <h3>+Post</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoggedIn ? (
        <div className="postFormAllCont" id="postFormAllCont">
          <div className="postFormCont">
            <div className="postTitleFormBorder">
              <div className="postTitleFormBody">
                <input
                  placeholder="title"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="postFormBorder">
              <div className="postFormBody">
                <textarea
                  placeholder="What are you thinking?"
                  rows={5}
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                />
              </div>
            </div>

            <div className="postFormAllBtnCont">
              <div className="postFormBtnCont">
                {postTitle !== "" && postBody !== "" ? (
                  <button onClick={addPost} style={{ cursor: "pointer" }}>
                    Post
                  </button>
                ) : (
                  <button disabled={true}>Post</button>
                )}

                <button onClick={closePostForm} style={{ cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div className="profileAllCont">
            <div className="profileIconOut">
              <div className="profileIconBody"></div>
            </div>
            <div className="userProfileUsername">
              <p>{currentUser.username}</p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {threadPost.length > 0 ? (
        <>
          {threadPost.map((post) =>
            parseInt(post.userID) === currentUser.userID ? (
              <div className="postAllCont">
                <div className="generalPost">
                  <div className="userPostTitleCont">
                    <div className="userPostTitleBorder">
                      <div className="userPostTitleBody">
                        <h4>{post.title.slice(0, 60)}</h4>
                      </div>
                    </div>
                  </div>

                  <Link to={`/post/${post.postID}`}>
                    <div className="userPostBorder">
                      <div className="userPostBody">
                        <p>{post.postBody}</p>
                      </div>
                    </div>
                  </Link>

                  <div className="userPostDateTimeCont">
                    <div className="userPostDateTimeBorder">
                      <div className="userPostDateTimeBody">
                        <p>Posted on {post.dateTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="userIconAll">
                    <div className="userIconCont">
                      <div className="userIconOut">
                        <div className="userIconBody">
                          <FavoriteBorderOutlinedIcon /> <p>num</p>
                        </div>
                      </div>
                      <div className="userIconOut">
                        <div className="userIconBody">
                          <ChatBubbleOutlineOutlinedIcon /> <p>num</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="profileAllCont">
                  <div className="profileIconOut">
                    <div className="profileIconBody"></div>
                  </div>
                  <div className="userProfileUsername">
                    <p>{post.username}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="postAllCont">
                <div className="profileAllCont">
                  <div className="profileIconOut">
                    <div className="profileIconBody"></div>
                  </div>
                  <div className="profileUsername">
                    <p>{post.username}</p>
                  </div>
                </div>

                <div className="generalPost">
                  <div className="postTitleCont">
                    <div className="postTitleBorder">
                      <div className="postTitleBody">
                        <h4>{post.title.slice(0, 60)}</h4>
                      </div>
                    </div>
                  </div>

                  <Link to={`/post/${post.postID}`}>
                    <div className="generalPostBorder">
                      <div className="generalPostBody">
                        <p>{post.postBody}</p>
                      </div>
                    </div>
                  </Link>

                  <div className="postDateTimeCont">
                    <div className="postDateTimeBorder">
                      <div className="postDateTimeBody">
                        <p>Posted on {post.dateTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="iconCont">
                    <div className="iconOut">
                      <div className="iconBody">
                        <FavoriteBorderOutlinedIcon /> <p>num</p>
                      </div>
                    </div>
                    <div className="iconOut">
                      <div className="iconBody">
                        <ChatBubbleOutlineOutlinedIcon /> <p>num</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </>
      ) : (
        <>
          <div className="notification">
            <p>There are no posts here. Be the first and say soemthing.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SubthreadPage;
