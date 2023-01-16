import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.css";
import {
  setIsLoggedInAction,
  setRedirectAction,
  setRoleAction,
  setUserAction,
} from "../actions";
import { useNavigate } from "react-router-dom";
import logo from "../FFlogo.png";
import axios from "axios";
import { useState } from "react";
import { Squash } from "hamburger-react";

const MyNavbar = () => {
  const url = process.env.REACT_APP_BE_URL;
  const navigate = useNavigate();

  const [toggleMenu, setToggleMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  const isLoggedIn = useSelector((state) => state.login.isloggedin);
  const { role, user } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  window.addEventListener("resize", function(){
    if(this.window.innerWidth > 900) {
      setToggleMenu(false)
      setIsOpen(false)
    }
  })

  const logout = async () => {
    if (role === "normal") {
      try {
        const response = await axios.post(`${url}/users/logout`);
        if (response.status === 200) {
          console.log("ok");
          dispatch(setIsLoggedInAction(false));
          dispatch(setRoleAction(""));
          dispatch(setUserAction(""));
          dispatch(setRedirectAction("null"));
          navigate("/", { replace: true });
        } else {
          console.log("try again");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post(`${url}/proUser/logout`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log("ok");
          dispatch(setIsLoggedInAction(false));
          dispatch(setRoleAction(""));
          navigate("/", { replace: true });
        } else {
          console.log("try again");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const navigateToProfile = () => {
    if(role === "pro"){
      navigate("/user/me")
    } else {
      navigate("/user/me/norm")
    }
  }

  return (
    <>
    <div className="nav-bar">
      <div className="navbar-content">
        <div className="logoandhome">
          <img src={logo} className="nav-img" />
          <a href="/" className="home-btn">
            Home
          </a>
        </div>
        {isLoggedIn ? (
          <div className="nav-profile" onClick={() => setShow(!show)}>
            <div className="imageandme">
            {!user.avatar?<img
                    className="dropdown-profilepic"
                    src="https://icon-library.com/images/anonymous-person-icon/anonymous-person-icon-18.jpg"
                    alt="user-pic"
                  />:<img
                  className="dropdown-profilepic"
                  src={user.avatar}
                  alt="user-pic"
                />}
              <span className="profile-dropdown">
                Me
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </span>
            </div>
            {show ? (
              <div
                className="nav-dropdown-container"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="userdetails">
                  {!user.avatar?<img
                    className="dropdown-profilepic"
                    src="https://icon-library.com/images/anonymous-person-icon/anonymous-person-icon-18.jpg"
                    alt="user-pic"
                  />:<img
                  className="dropdown-profilepic"
                  src={user.avatar}
                  alt="user-pic"
                />}
                  <div className="nav-nameandjob">
                    <p className="nav-name">
                      {user.firstName} {user.lastname}
                    </p>
                    {user.jobrole ? (
                      <p className="nav-jobrole">{user.jobrole}</p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
               
                  <button
                    className="view-profile-btn"
                    onClick={navigateToProfile}
                  >
                    View Profile
                  </button>
                
                <div className="signout" onClick={() => logout()}>
                  Sign Out
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="signupandlogin">
            <a href="/signup" className="Join-now-btn">
              Join now
            </a>
            <a href="/login" className="Sign-in-btn">
              Sign in
            </a>
          </div>
        )}
      </div>
      <div className="small-nav">
      <img src={logo} className="nav-img" />
      <Squash toggled={isOpen} toggle={() => setIsOpen(!isOpen)} hideOutline={true} onToggle={() => setToggleMenu(!toggleMenu)} duration={0.5} />
      </div>
    </div>
    {toggleMenu && 
    <div className="small-nav-open">
      <div className="small-nav-links">
        <a href="/">Home</a>
        {isLoggedIn?<><a onClick={navigateToProfile}>View Profile</a>
        <a onClick={logout}>Sign Out</a>
        </>:<><a href="/signup">Join now</a>
        <a href="/login">Sign in</a></>}
        
      </div>
    </div>}
    </>
  );
};

export default MyNavbar;
