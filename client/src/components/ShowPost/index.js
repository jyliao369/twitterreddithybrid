import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const ShowPost = ({ currentUser }) => {
  const [allPosts, setAllPosts] = useState([]);

  const [comment, setComment] = useState("");

  const addComment = (postID) => {
    if (
      document.getElementById(`${postID}`).style.display === "" ||
      document.getElementById(`${postID}`).style.display === "none"
    ) {
      document.getElementById(`${postID}`).style.display = "flex";
    } else {
      document.getElementById(`${postID}`).style.display = "none";
    }
  };

  const postComment = (postID) => {
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

    // console.log("post ID " + postID);
    // console.log(comment);
    // console.log(currentUser.userID);
    // console.log(currentUser.username);
    // console.log(todayDates + " " + todayTime);

    Axios.post("http://localhost:3001/addComment", {
      postID: postID,
      userID: currentUser.userID,
      username: currentUser.username,
      commentBody: comment,
      dateTime: todayDates + " " + todayTime,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllPosts", {}).then((response) => {
      //   console.log(response.data);
      setAllPosts(response.data);
    });
  });

  return (
    <div className="postsCont">
      {allPosts.map((post) => (
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
                {/* <div className="postBtns">
                  <h3 onClick={() => addComment(`post${post.postID}`)}>
                    comment
                  </h3>
                  <h3>heart</h3>
                </div> */}
              </div>

              {/* <div className="addComment" id={`post${post.postID}`}>
                <input
                  value={comment}
                  placeholder="Comment..."
                  onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={() => postComment(post.postID)}>
                  Comment
                </button>
              </div> */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ShowPost;
