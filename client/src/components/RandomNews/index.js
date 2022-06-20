import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const RandomNews = () => {
  const [randposts, setRandposts] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getAllPosts`, {}).then((response) => {
      setRandposts(response.data);
    });
  });

  return (
    <div className="randNews">
      <h2>What's Happening</h2>
      <div className="newsCont">
        {randposts.map((post) => (
          <div key={post.postID} className="news">
            <h3>{post.title}</h3>
            <br />
            <p>{post.postBody}</p>
            <br />
            <p>Posted By: {post.username}</p>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
};

export default RandomNews;
