import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const Explore = ({ currentUser, isLoggedIn }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [showedPosts, setShowedPosts] = useState([]);
  const [search, setSearch] = useState("");

  const searchPosts = () => {
    const filteredPosts = [];

    for (let a = 0; a < allPosts.length; a++) {
      console.log(a);
      if (allPosts[a].title.toLowerCase().includes(search)) {
        console.log(true);
        filteredPosts.push(allPosts[a]);
      } else if (allPosts[a].postBody.toLowerCase().includes(search)) {
        console.log(true);
        filteredPosts.push(allPosts[a]);
      } else {
        console.log(false);
      }
    }

    setShowedPosts(filteredPosts);
    setSearch("");
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllPosts", {}).then((response) => {
      setAllPosts(response.data);
      setShowedPosts(response.data);
    });
  }, []);

  return (
    <div>
      <div className="titleBanner">
        <SearchOutlinedIcon sx={{ fontSize: "45px", padding: "10px" }} />
        <div>Explore</div>
      </div>

      <div className="searchPage">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
        <button onClick={searchPosts}>search</button>
        <button onClick={() => setShowedPosts(allPosts)}>reset</button>
      </div>

      {isLoggedIn ? (
        <div className="showPostPageCont">
          <div className="showPostPage">
            {showedPosts.map((post) =>
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

                    <div className="userPostBorder">
                      <div className="userPostBody">
                        <p>{post.postBody}</p>
                      </div>
                    </div>

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
          </div>
        </div>
      ) : (
        <div className="showPostPageCont">
          <div className="showPostPage">
            {allPosts.map((post) => (
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
            ))}
          </div>
        </div>
      )}

      {/* <div className="postsCont">
        {showedPosts.map((post) => (
          <Link to={`/post/${post.postID}`} key={post.postID}>
            <div key={post.postID} className="posts">
              <div className="userIconCont">
                <div className="userIcon" />
              </div>

              <div className="mainPostCont">
                <div className="postBodyCont">
                  <div className="postBody">
                    <h4>
                      Username: {post.username}, UserID: {post.userID}, postID:{" "}
                      {post.postID}
                    </h4>
                    <h2>{post.title}</h2>
                    <p>{post.postBody}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <>
            <div key={post.userID} className="comments">
              <div className="testShapeTwo">
                <div className="testShapes"></div>
              </div>
              <div>
                <div className="addInfoOut">
                  <div className="addInfoIn">
                    <h4>Title: {post.title}</h4>
                  </div>
                </div>

                <div className="addInfoThreeOut">
                  <div className="addInfoThreeIn">
                    <h4>subthread: {post.subthreadID}</h4>
                  </div>
                </div>

                <Link to={`/post/${post.postID}`} key={post.postID}>
                  <div className="testShapeOne">
                    <div className="testShape">
                      <p>{post.postBody}</p>
                    </div>
                  </div>
                </Link>

                <div className="addInfoTwoOut">
                  <div className="addInfoTwoIn">
                    <p>Posted: {post.dateTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div> */}
    </div>
  );
};

export default Explore;
