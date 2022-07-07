import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Explore = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [showedPosts, setShowedPosts] = useState([]);
  const [search, setSearch] = useState("");

  const searchPosts = () => {
    const filteredPosts = [];

    for (let a = 0; a < allPosts.length; a++) {
      console.log(a);
      if (allPosts[a].title.toLowerCase().includes(search)) {
        console.log(true);
        filteredPosts.push(allPosts[a]);
      } else if (allPosts[a].postBody.toLowerCase().includes(search)) {
        console.log(true);
        filteredPosts.push(allPosts[a]);
      } else {
        console.log(false);
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
      <div className="titleBanner">
        <SearchOutlinedIcon sx={{ fontSize: "45px", padding: "10px" }} />
        <div>Explore</div>
      </div>

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
