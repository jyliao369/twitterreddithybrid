import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RandomNews = () => {
  const [randposts, setRandposts] = useState([]);
  const [showNews, setShowNews] = useState([]);

  let [min, setMin] = useState(0);
  let [max, setMax] = useState(10);
  let [pageIndex, setPageIndex] = useState(0);
  let [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getAllPosts`, {}).then((response) => {
      setRandposts(response.data);
      setShowNews(response.data.slice(0, 10));
      setMaxPage(Math.ceil(response.data.length / 10));
    });
  }, []);

  // console.log(Math.ceil(randposts.length / 10));
  // console.log(randposts.splice(0, 10));

  const nextBack = (nextBack) => {
    if (nextBack === "next") {
      min += 10;
      max += 10;
      pageIndex++;
      // console.log(randposts.slice(min, max));
      setShowNews(randposts.slice(min, max));
      setMin(min);
      setMax(max);
      setPageIndex(pageIndex);
      console.log("page " + (pageIndex + 1));
    } else if (nextBack === "back") {
      min -= 10;
      max -= 10;
      pageIndex--;
      // console.log(randposts.slice(min, max));
      setShowNews(randposts.slice(min, max));
      setMin(min);
      setMax(max);
      setPageIndex(pageIndex);
      console.log("page " + (pageIndex + 1));
    }
  };

  return (
    <div className="randNews">
      <h2>What's Happening</h2>

      <div className="nextBackBtn">
        {pageIndex > 0 ? (
          // <button
          //   style={{ cursor: "pointer" }}
          //   onClick={() => nextBack("back")}
          // >
          //   back
          // </button>
          <div onClick={() => nextBack("back")}>Back</div>
        ) : (
          // <button disabled={true} onClick={() => nextBack("back")}>
          //   back
          // </button>
          <div>Stop</div>
        )}

        {pageIndex === maxPage - 1 ? (
          // <button disabled={true} onClick={() => nextBack("next")}>
          //   next
          // </button>
          <div>Stop</div>
        ) : (
          // <button
          //   style={{ cursor: "pointer" }}
          //   onClick={() => nextBack("next")}
          // >
          //   next
          // </button>
          <div onClick={() => nextBack("next")}>Next</div>
        )}
      </div>

      <div className="newsCont">
        {showNews.map((post) => (
          <Link to={`/post/${post.postID}`} key={post.postID}>
            <div className="news">
              <h3>{post.title}</h3>
              <br />
              <p>{post.postBody}</p>
              <br />
              <p>Posted By: {post.username}</p>
            </div>
          </Link>
        ))}
      </div>

      <br />
      <br />
    </div>
  );
};

export default RandomNews;
