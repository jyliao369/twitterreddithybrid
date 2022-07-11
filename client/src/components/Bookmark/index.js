import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";

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
        <BookmarksOutlinedIcon sx={{ fontSize: "45px", padding: "10px" }} />
        <div>My Bookmarks</div>
      </div>

      {userBookmarks.length > 0 ? (
        <>
          <div>
            {userBookmarks.map((post) => (
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

              // <Link to={`/post/${post.postID}`}>
              //   <div key={post.bookmarkID} className="posts">
              //     <div className="userIconCont">
              //       <div className="userIcon" />
              //     </div>

              //     <div className="mainPostCont">
              //       <div className="postBodyCont">
              //         <div className="postBody">
              //           <h4>
              //             Username: {post.username}, UserID: {post.userID},
              //             postID: {post.postID}
              //           </h4>
              //           <h2>{post.title}</h2>
              //           <p>{post.postBody}</p>
              //         </div>
              //       </div>
              //     </div>

              //     <div className="unBookmarkBtn">
              //       <button
              //         value={post.bookmarkID}
              //         onClick={(e) => remove(e.target.value)}
              //       >
              //         Remove
              //       </button>
              //     </div>
              //   </div>
              // </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="notification">
            <p>
              You have no bookmarked posts. Check out any related threads and
              save posts for later.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Bookmark;
