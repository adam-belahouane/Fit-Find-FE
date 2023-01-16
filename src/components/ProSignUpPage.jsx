import { useState } from "react";
import "../styles/login.css";
import Geocode from "react-geocode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProUserAction, setIsLoggedInAction, setRoleAction } from "../actions";


Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const ProSignUpPage = ({ setView }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const url = process.env.REACT_APP_BE_URL;
  const [nextPage, setNextPage] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastname: "",
    address: "",
    lat: "",
    lng: "",
    email: "",
    password: "",
    bio: "",
    role: "pro",
    jobrole: "",
  });

  const loginAction = async(details) => {
    try {
      const response = await fetch(`${url}/proUser/login`, {
        method: "POST",
        body: JSON.stringify(details),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.status === 200) {
        console.log("ok");
        dispatch(setIsLoggedInAction(true));
        dispatch(setRoleAction("pro"));
        dispatch(getProUserAction());
        navigate("/user/me", { replace: true });
      } 
    } catch (error) {
      console.log(error);
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
    await Geocode.fromAddress(user.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setUser({
          ...user,
          lat: lat,
          lng: lng,
        });
      },
      (error) => {
        console.error(error);
      }
    );
    console.log(user);

    try {
      let response = await fetch(url + "/proUser/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.status == 409) {
        alert("Sorry a Prouser with this email already exists")
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
          <h2 className="view-selector-btn" onClick={() => setView("normal")}>
            Normal
          </h2>
          <h2
            className="view-selector-btn"
            id="selected"
            onClick={() => setView("pro")}
          >
            Pro
          </h2>
        </div>
        <div className="signup-con">
          {nextPage === false ? (
            <>
              <form className="signup-form">
                <h1>Sign up</h1>
                <p>Become a Fitness professional</p>
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

export default ProSignUpPage;
