import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const ShowPost = ({ currentUser, isLoggedIn }) => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllPosts", {}).then((response) => {
      // console.log(response.data);
      setAllPosts(response.data);
    });
  }, []);

  return (
    <div>
      <div className="titleBanner">
        <HomeOutlinedIcon sx={{ fontSize: "45px", padding: "10px" }} />
        <div>Home</div>
      </div>

      {isLoggedIn ? (
        <div className="showPostPageCont">
          <div className="showPostPage">
            {allPosts.map((post) =>
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
        {allPosts.map((post) => (
          <Link to={`/post/${post.postID}`} key={post.postID}>
            <div className="posts">
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
        ))}
      </div> */}
    </div>
  );
};

export default ShowPost;
