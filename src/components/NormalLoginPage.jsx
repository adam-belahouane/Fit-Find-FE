import { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedInAction, setRoleAction, getUserAction } from "../actions";

const NormalLoginPage = ({ setView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.login.url);
  const url = process.env.REACT_APP_BE_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    
    const details = {
      email: email,
      password: password,
    };

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
  };

  const loginWithDemo = () => {
    setEmail("adam@hotmail.com");
    setPassword("adam1234");
    if(password !== "")
    login();
  };
  return (
    <>
      <div className="con">
        <div className="login-view-selector">
          <h2 className="view-selector-btn" id="selected" onClick={() => setView("normal")}>Normal</h2>
          <h2 className="view-selector-btn" onClick={() => setView("pro")}>Pro</h2>
        </div>
        <div className="signup-con">
          <h1>Sign in</h1>
          <p>Find Fitness professionals near you</p>
          <div className="login-form">
            <div className="inputbox">
              <input
                type="text"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="labelforlogin">Email</label>
            </div>
            <div className="inputbox">
              <input
                type="password"
                name="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="labelforlogin">Password</label>
            </div>
            <a className="forgotPassword blue-link-highlight" href="">
              Forgot password?
            </a>
            <button onClick={(event) => login(event)} className="big-blue-btn">
              Sign in
            </button>
          </div>
          <div className="or-demo">
            <span className="or-text">or</span>
          </div>
          <button onClick={loginWithDemo} className="big-blue-btn">
            Demo sign in
          </button>
        </div>
        <div className="join-now">
          New to FitFind?{" "}
          <a href="/signup" className="blue-link-highlight">
            Join Now
          </a>
        </div>
      </div>
    </>
  );
};

export default NormalLoginPage;
