import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RandomNews = () => {
  const [randposts, setRandposts] = useState([]);
  const [showNews, setShowNews] = useState([]);
  let pageNum = 0;

  useEffect(() => {
    Axios.get(`http://localhost:3001/getAllPosts`, {}).then((response) => {
      console.log(response.data);
      setRandposts(response.data);
      setShowNews(randposts.slice(0, 10));
    });
  }, []);

  // console.log(Math.ceil(randposts.length / 10));

  // console.log(randposts.splice(0, 10));

  const nextBack = (nextBack) => {
    if (nextBack === "next") {
      pageNum += 1;
      // console.log("page #: " + (pageNum + 1));
      console.log(randposts.slice(10 * pageNum, 10 + 10 * pageNum));
      // setShowNews(randposts.slice(10 * pageNum, 10 + 10 * pageNum));
    } else if (nextBack === "back") {
      pageNum -= 1;
      // console.log("page #: " + (pageNum + 1));
      console.log(randposts.slice(10 * pageNum, 10 + 10 * pageNum));
      // setShowNews(randposts.slice(10 * pageNum, 10 + 10 * pageNum));
    }
  };

  return (
    <div className="randNews">
      <h2>What's Happening</h2>

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

      <div className="nextBackBtn">
        <button onClick={() => nextBack("back")}>back</button>
        <button onClick={() => nextBack("next")}>next</button>
      </div>

      <br />
      <br />
    </div>
  );
};

export default RandomNews;
