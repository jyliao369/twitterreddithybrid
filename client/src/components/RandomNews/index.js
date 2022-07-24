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
      setShowNews(randposts.slice(min, max));
      setMin(min);
      setMax(max);
      setPageIndex(pageIndex);
    } else if (nextBack === "back") {
      min -= 10;
      max -= 10;
      pageIndex--;
      setShowNews(randposts.slice(min, max));
      setMin(min);
      setMax(max);
      setPageIndex(pageIndex);
    }
  };

  return (
    <div className="randNews">
      <h2>What's Happening</h2>

      <div className="nextBackBtn">
        {pageIndex > 0 ? (
          <button
            style={{ cursor: "pointer" }}
            onClick={() => nextBack("back")}
          >
            Back
          </button>
        ) : (
          <button>Back</button>
        )}

        <h3>{pageIndex + 1}</h3>

        {pageIndex === maxPage - 1 ? (
          <button>Next</button>
        ) : (
          <button
            style={{ cursor: "pointer" }}
            onClick={() => nextBack("next")}
          >
            Next
          </button>
        )}
      </div>

      <div className="newsCont">
        {showNews.map((post) => (
          <div className="randomNewsCont">
            <div className="randomNewsTitleCont">
              <div className="randomNewsTitleBorder">
                <div className="randomNewsTitleBody">
                  <h4>{post.title.slice(0, 30)}...</h4>
                </div>
              </div>
            </div>

            <Link to={`/post/${post.postID}`} key={post.postID}>
              <div className="randomNewsBorder">
                <div className="randomNewsBody">
                  <p>{post.postBody}</p>
                </div>
              </div>
            </Link>

            <div className="randomNewsUserCont">
              <div className="randomNewsUserBorder">
                <div className="randomNewsUserBody">
                  <p>Posted By: {post.username}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <br />
    </div>
  );
};

export default RandomNews;
