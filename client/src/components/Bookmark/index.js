import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

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
              <div key={post.bookmarkID} className="postAllCont">
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
