import { useState } from "react";
import { getUserAction, setIsLoggedInAction, setRoleAction } from "../actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NormalSignUpPage = ({ setView }) => {
  const url = process.env.REACT_APP_BE_URL;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useSelector(state => state.login.url)
  const [nextPage, setNextPage] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastname: "",
    city: "London",
    email: "",
    password: "",
    bio: "",
    role: "normal",
  });


  const loginAction = async (details) => {
    try {
      const response = await fetch(`${url}/users/login`, {
        method: "POST",
        body: JSON.stringify(details),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        console.log("ok");
        dispatch(getUserAction());
        dispatch(setIsLoggedInAction(true));
        dispatch(setRoleAction("normal"));
        if (id === "null") {
          navigate("/User/me/norm");
        } else {
          navigate(`/user/${id}`);
        }
      } else {
        console.log("not ok");
      }
    } catch (error) {
      console.log(error);
      alert("Wrong credentials, try again!");
    }
  } 

  const handleSignUpInput = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  const handleSignupToServer = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch(url + "/users/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.status == 409) {
        alert("Sorry a User with this email already exists")
      }
      if (response.ok) {
        console.log("All Signed up");
        const details = {
          email: user.email,
          password: user.password
        }
        loginAction(details)
      }
    } catch (error) {
      console.log(error);

    }
  };


  return (
    <>
      <div className="con">
        <div className="login-view-selector">
          <h2
            className="view-selector-btn"
            id="selected"
            onClick={() => setView("normal")}
          >
            Normal
          </h2>
          <h2 className="view-selector-btn" onClick={() => setView("pro")}>
            Pro
          </h2>
        </div>
        <div className="signup-con">
          {nextPage === false ? (
            <>
              <form className="signup-form">
                <h1>Sign up</h1>
                <p>Find Fitness professionals near you</p>
                <div className="inputbox">
                  <input
                    type="text"
                    name="firstname"
                    id="email"
                    required
                    value={user.firstName}
                    onChange={(e) =>
                      handleSignUpInput("firstName", e.target.value)
                    }
                  />
                  <label className="labelforlogin">First Name</label>
                </div>
                <div className="inputbox">
                  <input
                    type="text"
                    name="lastname"
                    id="password"
                    required
                    value={user.lastname}
                    onChange={(e) =>
                      handleSignUpInput("lastname", e.target.value)
                    }
                  />
                  <label className="labelforlogin">Last Name</label>
                </div>

                <button
                  className="big-blue-btn"
                  onClick={() => setNextPage(true)}
                >
                  Continue
                </button>
              </form>
              <div className="login-now">
                Already on FitFind?{" "}
                <a href="/login" className="blue-link-highlight">
                  Sign in
                </a>
              </div>
            </>
          ) : (
            <form className="signup-form">
              <h1>Sign up</h1>
              <p>Find Fitness professionals near you</p>
              <div className="inputbox">
                <input
                  type="text"
                  name="email"
                  id="email"
                  required
                  value={user.email}
                  onChange={(e) => handleSignUpInput("email", e.target.value)}
                />
                <label className="labelforlogin">Email</label>
              </div>
              <div className="inputbox">
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={user.password}
                  onChange={(e) =>
                    handleSignUpInput("password", e.target.value)
                  }
                />
                <label className="labelforlogin">Password</label>
              </div>

              <button
                className="big-blue-btn"
                onClick={(event) => handleSignupToServer(event)}
              >
                Join
              </button>

              <button
                className="big-back-btn"
                onClick={() => setNextPage(false)}
              >
                Back
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default NormalSignUpPage;
