import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Explore = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [showedPosts, setShowedPosts] = useState([]);
  const [search, setSearch] = useState("");

  const searchPosts = () => {
    const filteredPosts = [];

    for (let a = 0; a < allPosts.length; a++) {
      console.log(allPosts[a].title.split(" "));
      for (let b = 0; b < allPosts[a].title.split(" ").length; b++) {
        if (allPosts[a].title.split(" ")[b] === search) {
          console.log("true");
          filteredPosts.push(allPosts[a]);
          break;
        } else {
          console.log("false");
        }
      }
    }

    setShowedPosts(filteredPosts);
    setSearch("");
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllPosts", {}).then((response) => {
      setAllPosts(response.data);
      setShowedPosts(response.data);
    });
  }, []);

  return (
    <div>
      <div className="searchPage">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
        <button onClick={searchPosts}>search</button>
        <button onClick={() => setShowedPosts(allPosts)}>reset</button>
      </div>
      <div className="postsCont">
        {showedPosts.map((post) => (
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
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Explore;
