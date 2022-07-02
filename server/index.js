const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "This is a large secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 1000 * 5,
    },
  })
);

const db = mysql.createConnection({
  user: process.env.REACT_APP_SQL_USER,
  password: process.env.REACT_APP_SQL_PASSWORD,
  host: process.env.REACT_APP_SQL_HOST,
  database: process.env.REACT_APP_SQL_DATABASE,
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const dateTime = req.body.dateTime;

  console.log(
    username +
      " " +
      password +
      " " +
      firstName +
      " " +
      lastName +
      " " +
      email +
      " " +
      dateTime
  );

  db.query(
    "SELECT * FROM user_table WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        res.send([
          { message: "There is an account associated with this email." },
        ]);
      } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(err);
          }
          db.query(
            "INSERT INTO user_table (username, lastName, firstName, password, email, dateTime) VALUES (?,?,?,?,?,?)",
            [username, lastName, firstName, hash, email, dateTime],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                // res.send([result]);
                req.session.user = result;
                res.send(result);
              }
            }
          );
        });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM user_table WHERE email = ?", email, (err, result) => {
    if (err) {
      console.log({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response) {
          req.session.user = result;
          console.log(req.session.user);
          res.send(result);
        } else {
          res.send([
            { message: "Combination of user and password not found." },
          ]);
          //   console.log(result[0].password);
          //   console.log(password === result[0].password);
          console.log(response);
        }
      });
    } else {
      res.send([
        { message: "There is no account associated with this email." },
      ]);
    }
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.send("logged out");
    console.log("logged out");
  });
});

// THESE ARE CALLS/GETS TO FETCH DATA FOR USERS
app.get("/getAllUsers", (req, res) => {
  db.query("SELECT * FROM user_table", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/:deleteID", (req, res) => {
  db.query(
    `DELETE FROM user_table WHERE userID=${req.params.deleteID}`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("User deleted");
      }
    }
  );
});

// UPDATE A USER PROFILE BASED ON THE userID
app.put("/updateUser/:userID", (req, res) => {
  const userID = req.params.userID;
  const displayUpdate = req.body.displayUpdate;
  const lastUpdate = req.body.lastUpdate;
  const firstUpdate = req.body.firstUpdate;
  const emailUpdate = req.body.emailUpdate;
  const newPass = req.body.newPass;

  bcrypt.hash(newPass, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      `UPDATE user_table SET username = "${displayUpdate}", lastName = "${lastUpdate}", firstName = "${firstUpdate}", email = "${emailUpdate}", password = "${hash}" WHERE userID = ${userID}`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
});

// UPDATE A SPECIFIC POST BASED ON postID
app.put("/updatePost/:postID", (req, res) => {
  const updateTitle = req.body.title;
  const updatePostBody = req.body.postBody;
  const updateID = req.params.postID;
  //   console.log(
  //     `UPDATE posts_table SET title = ${updateTitle}, postBody = ${updatePostBody}, WHERE postID = ${updateID}`
  //   );
  db.query(
    `UPDATE posts_table SET title = "${updateTitle}", postBody = "${updatePostBody}" WHERE postID = ${updateID}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

// THESE ARE CALLS/GETS TO FETCH DATA FOR POSTS
// ADDING POST
app.post("/addPost", (req, res) => {
  const userID = req.body.userID;
  const username = req.body.username;
  const title = req.body.title;
  const postBody = req.body.postBody;
  const subthreadID = req.body.subthreadID;
  const dateTime = req.body.dateTime;

  console.log(
    userID +
      " " +
      username +
      " " +
      title +
      " " +
      postBody +
      " " +
      subthreadID +
      " " +
      dateTime
  );

  db.query(
    "INSERT INTO posts_table (userID, username, title, postBody, subthreadID, dateTime) VALUES (?,?,?,?,?,?)",
    [userID, username, title, postBody, subthreadID, dateTime],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Post Added");
      }
    }
  );
});

// DELETING POST
app.delete("/posts/:deletePostID", (req, res) => {
  const postID = req.params.deletePostID;
  db.query(`DELETE FROM posts_table WHERE postID=${postID}`, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Post deleted");
    }
  });
});

// LOOKING FOR A SPECIFIC POST BY postID
app.get("/posts/:postID", (req, res) => {
  db.query(
    `SELECT * FROM posts_table WHERE postID=${req.params.postID}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// GET EVERY POSTS
app.get("/getAllPosts", (err, res) => {
  db.query("SELECT * FROM posts_table ORDER BY postID DESC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// GET POSTS ASSOCIATED WITH THE userID
app.get(`/getAllPosts/:userID`, (req, res) => {
  db.query(
    `SELECT * FROM posts_table WHERE userID=${req.params.userID}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// UPDATE A SPECIFIC POST BASED ON postID
app.put("/updatePost/:postID", (req, res) => {
  const updateTitle = req.body.title;
  const updatePostBody = req.body.postBody;
  const updateID = req.params.postID;
  //   console.log(
  //     `UPDATE posts_table SET title = ${updateTitle}, postBody = ${updatePostBody}, WHERE postID = ${updateID}`
  //   );
  db.query(
    `UPDATE posts_table SET title = "${updateTitle}", postBody = "${updatePostBody}" WHERE postID = ${updateID}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// THIS GRABS A SPECIFIC POST BASED ON POSTID AND ASSOCIATED COMMENTS
// THAT GO WITH IT
app.get("/post/:postID", (req, res) => {
  const postID = req.params.postID;
  // console.log(postID);

  db.query(
    `SELECT posts_table.postID, posts_table.userID, posts_table.username, posts_table.title, posts_table.postBody, comments_table.commentID, comments_table.postID, comments_table.userID, comments_table.username, comments_table.commentBody, comments_table.dateTime
    FROM posts_table
    INNER JOIN comments_table
    ON posts_table.postID=comments_table.postID
    WHERE posts_table.postID=${postID};`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        // console.log(result);
      }
    }
  );
});

// ALL THESE FUNCTIONS ARE ASSOCIATED WITH COMMENTS
// ADDING COMMENTS
app.post("/addComment", (req, res) => {
  const postID = req.body.postID;
  const userID = req.body.userID;
  const username = req.body.username;
  const commentBody = req.body.commentBody;
  const dateTime = req.body.dateTime;

  db.query(
    `INSERT INTO comments_table (postID, userID, username, commentBody, dateTime) VALUE (?,?,?,?,?)`,
    [postID, userID, username, commentBody, dateTime],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

// THIS IS FOR THE SUB-THREAD SECTION
// THIS CREATES THREAD
app.post("/addThread", (req, res) => {
  const userID = req.body.userID;
  const username = req.body.username;
  const threadName = req.body.threadName;
  const threadDesc = req.body.threadDesc;
  const dateTime = req.body.dateTime;

  db.query(
    `INSERT INTO subthreads_table (userID, username, threadName, threadDesc, dateTime) VALUE (?,?,?,?,?)`,
    [userID, username, threadName, threadDesc, dateTime],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.put("/updateSubthread/:subthreadID", (req, res) => {
  const subthreadID = req.params.subthreadID;
  const upThreadName = req.body.upThreadName;
  const upThreadDesc = req.body.upThreadDesc;

  db.query(
    `UPDATE subthreads_table SET threadName = "${upThreadName}", threadDesc = "${upThreadDesc}" WHERE subthreadID = ${subthreadID}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// THIS GETS ALL THREADS CREATED
app.get("/allThread", (req, res) => {
  db.query(`SELECT * FROM subthreads_table`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      // console.log(result);
    }
  });
});

// THIS GRABS A SPECIFIC THREAD BASED ON THREADID
// POTENTIALLY THIS WILL GRAB POSTS ASSOCIATED WITH THE THREAD
app.get("/subthread/:subthreadID", (req, res) => {
  const subthreadID = req.params.subthreadID;
  console.log(subthreadID);

  db.query(
    `SELECT posts_table.postID, posts_table.userID, posts_table.username, posts_table.title, posts_table.postBody, subthreads_table.userID, subthreads_table.username, subthreads_table.threadName, subthreads_table.threadDesc, subthreads_table.dateTime, subthreads_table.subthreadID
    FROM posts_table
    INNER JOIN subthreads_table
    ON posts_table.subthreadID=subthreads_table.subthreadID
    WHERE posts_table.subthreadID=${subthreadID};`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

// THIS ALLOWS USER TO JOIN A SPECIFIC THREAD
app.post("/jointhread", (req, res) => {
  const userID = req.body.userID;
  const subthreadID = req.body.subthreadID;
  const threadName = req.body.threadName;
  const threadDesc = req.body.threadDesc;

  // console.log(userID + " " + subthreadID + " " + threadName + " " + threadDesc);

  db.query(
    `INSERT INTO mythreads_table (userID, subthreadID, threadName, threadDesc) VALUES (?,?,?,?)`,
    [userID, subthreadID, threadName, threadDesc],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Thread joined");
      }
    }
  );
});

// GET ALL THREADS A USER JOINED SPECIFIED BY USERID
app.get("/mythreads/:userID", (req, res) => {
  const userID = req.params.userID;
  db.query(
    `SELECT * FROM mythreads_table WHERE userID = ${userID}`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/unfollow/:mythreadsID", (req, res) => {
  const mythreadsID = req.params.mythreadsID;
  console.log(mythreadsID);

  db.query(
    `DELETE FROM mythreads_table WHERE mythreadsID = ${mythreadsID}`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Thread Unfollowed");
      }
    }
  );
});

// ALL OF THESE FETCHES ARE FOR BOOKMARK PAGE
// THIS BOOKMARKS POSTS BASED ON ID TO A USER BASED ON ID
app.post("/bookmark", (req, res) => {
  const userID = req.body.userID;
  const postID = req.body.postID;
  const username = req.body.username;
  const title = req.body.title;
  const postBody = req.body.postBody;
  const subthreadID = req.body.subthreadID;
  const dateTime = req.body.dateTime;

  db.query(
    `INSERT INTO bookmarks_table (userID, postID, username, title, postBody, subthreadID, datetime) VALUES (?,?,?,?,?,?,?)`,
    [userID, postID, username, title, postBody, subthreadID, dateTime],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("bookmarked");
      }
    }
  );
});

// THIS GETS ALL BOOKMARKED POST BASED ON USERID
app.get("/getBookmarks/:userID", (req, res) => {
  const userID = req.params.userID;

  db.query(
    `SELECT * FROM bookmarks_table WHERE userID = ${userID}`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// THIS WILL DELETE BOOKMARKS BASED ON BOOKMARKED ID
app.delete("/deleteBookmark/:bookmarkID", (req, res) => {
  const bookmarkID = req.params.bookmarkID;

  db.query(
    `DELETE FROM bookmarks_table WHERE bookmarkID = ${bookmarkID}`,
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("bookmark removed");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server is running smoothly");
});
