import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const ShowPost = ({ currentUser, isLoggedIn }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [comment, setComment] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllPosts", {}).then((response) => {
      console.log(response.data);
      setAllPosts(response.data);
    });

    setIsLoading(false);
  }, []);

  // console.log(typeof currentUser.userID);
  // console.log(typeof parseInt(allPosts[0].userID));
  // console.log(currentUser.userID === parseInt(allPosts[0].userID));

  return (
    <div>
      <div className="titleBanner">
        <HomeOutlinedIcon sx={{ fontSize: "45px", padding: "10px" }} />
        <div>Home</div>
      </div>

      <div className="postsCont">
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
      </div>

      {/* THIS IS A MORE STYLIZED RENDITION */}
      {/* {isLoading === false ? (
        <div>
          {isLoggedIn ? (
            <div>
              {allPosts.map((post) =>
                parseInt(post.userID) === currentUser.userID ? (
                  <>
                    <div key={post.userID} className="comments">
                      <div>
                        <div className="testShapeOne">
                          <div className="testShape">
                            <p>{post.postBody}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="testShapeTwo">
                          <div className="testShapes"></div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div key={post.userID} className="comments">
                      <div>
                        <div className="testShapeTwo">
                          <div className="testShapes"></div>
                        </div>
                      </div>
                      <div>
                        <div className="testShapeOne">
                          <div className="testShape">
                            <p>{post.postBody}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          ) : (
            <div>
              {allPosts.map((post) => (
                <>
                  <div key={post.userID} className="comments">
                    <div>
                      <div className="testShapeTwo">
                        <div className="testShapes"></div>
                      </div>
                    </div>
                    <div>
                      <div className="testShapeOne">
                        <div className="testShape">
                          <p>{post.postBody}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      ) : (
        <></>
      )} */}
    </div>
  );
};

export default ShowPost;
