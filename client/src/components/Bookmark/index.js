import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const Bookmark = () => {
  const { userID } = useParams();

  const [userBookmarks, setUserBookmarks] = useState([]);

  const remove = (bookmarkID) => {
    console.log("hello there");
    console.log(bookmarkID);

    Axios.delete(`http://localhost:3001/deleteBookmark/${bookmarkID}`, {}).then(
      (response) => {
        console.log(response);
      }
    );
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/getBookmarks/${userID}`, {}).then(
      (response) => {
        // console.log(response.data);
        setUserBookmarks(response.data);
      }
    );
  }, [userBookmarks]);

  return (
    <div>
      <div className="titleBanner">
        <div>My Bookmarks</div>
      </div>

      <div>
        {userBookmarks.map((post) => (
          <div key={post.bookmarkID} className="posts">
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

            <div className="unBookmarkBtn">
              <button
                value={post.bookmarkID}
                onClick={(e) => remove(e.target.value)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
