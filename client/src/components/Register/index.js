import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const Register = ({
  setCurrentUser,
  currentUser,
  setIsLoggedIn,
  isLoggedIn,
}) => {
  const [emailReg, setEmailReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [passReg, setPassReg] = useState("");
  const [retypePassReg, setRetypePassReg] = useState("");

  const [regStatus, setRegStatus] = useState("");

  const navToProfile = useNavigate();

  const register = (event) => {
    event.preventDefault();

    if (
      emailReg === "" ||
      usernameReg === "" ||
      firstNameReg === "" ||
      lastNameReg === "" ||
      passReg === "" ||
      retypePassReg === ""
    ) {
      setRegStatus("Alert: Missing info");
      console.log("Alert: Missing info");
    } else if (passReg !== retypePassReg) {
      console.log("Alert: Passwords do not match!");
      setRegStatus("Alert: Passwords do not match!");
    } else {
      var todayDate = new Date();
      var todayDates =
        todayDate.getFullYear() +
        "-" +
        (todayDate.getMonth() + 1) +
        "-" +
        todayDate.getDate();
      var todayTime =
        todayDate.getHours() +
        ":" +
        todayDate.getMinutes() +
        ":" +
        todayDate.getSeconds();

      Axios.post("http://localhost:3001/register", {
        username: usernameReg,
        firstName: firstNameReg,
        lastName: lastNameReg,
        email: emailReg,
        password: passReg,
        dateTime: todayDates + " " + todayTime,
      }).then((response) => {
        console.log(response);
        if (response.data.message) {
          setRegStatus(response.data.message);
        } else {
          Axios.post("http://localhost:3001/login", {
            password: passReg,
            email: emailReg,
          }).then((response) => {
            setRegStatus("");
            setCurrentUser(response.data[0]);
            setIsLoggedIn(true);

            setEmailReg("");
            setUsernameReg("");
            setFirstNameReg("");
            setLastNameReg("");
            setPassReg("");
            setRetypePassReg("");
            navToProfile("/profile");
          });
        }
      });
    }
  };

  return (
    <div className="logRegCont">
      <div className="regFormBorder">
        <div className="regFormBody">
          <h1>Register</h1>

          <div className="status">
            <p>{regStatus}</p>
          </div>

          <div className="inputCont">
            <div className="regFormCont">
              <div className="regForm">
                <div className="inputOut">
                  <div className="inputBody">
                    <input
                      placeholder="Username"
                      onChange={(e) => setUsernameReg(e.target.value)}
                      value={usernameReg}
                    />
                  </div>
                </div>
                <div className="inputOut">
                  <div className="inputBody">
                    <input
                      placeholder="Last Name"
                      onChange={(e) => setLastNameReg(e.target.value)}
                      value={lastNameReg}
                    />
                  </div>
                </div>
                <div className="inputOut">
                  <div className="inputBody">
                    <input
                      placeholder="First Name"
                      onChange={(e) => setFirstNameReg(e.target.value)}
                      value={firstNameReg}
                    />
                  </div>
                </div>
              </div>

              <div className="regForm">
                <div className="inputOut">
                  <div className="inputBody">
                    <input
                      placeholder="Email"
                      onChange={(e) => setEmailReg(e.target.value)}
                      value={emailReg}
                    />
                  </div>
                </div>
                <div className="inputOut">
                  <div className="inputBody">
                    <input
                      placeholder="Password"
                      type={"password"}
                      onChange={(e) => setPassReg(e.target.value)}
                      value={passReg}
                    />
                  </div>
                </div>
                <div className="inputOut">
                  <div className="inputBody">
                    <input
                      placeholder="Re-Type Password"
                      type={"password"}
                      onChange={(e) => setRetypePassReg(e.target.value)}
                      value={retypePassReg}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={register}
              style={{ cursor: "pointer" }}
              to="/profile"
            >
              Register
            </button>

            <h4>Have an Account?</h4>
            <Link to={"/login"}>Log in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
