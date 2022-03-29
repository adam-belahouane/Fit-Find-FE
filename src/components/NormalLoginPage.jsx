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

  const login = async () => {
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
  return (
    <>
      <Row className="mt-3 view-selector">
        <Col>
          <h2 className="selected" onClick={() => setView("normal")}>
            Normal
          </h2>
        </Col>
        <Col>
          <h2 onClick={() => setView("pro")}>Pro</h2>
        </Col>
      </Row>
      <div className="con">
        <div className="signup-con">
          <h1>Sign in</h1>
          <p>Find Fitness professionals near you</p>
          <form className="login-form">
            <div className="inputbox">
              <input type="email" name="email" id="email" />
              <label className="label">Email</label>
            </div>
            <div className="inputbox">
              <input type="password" name="password" id="email" />
              <label className="label">Password</label>
            </div>
            <a className="forgotPassword" href="">Forgot password?</a>
            <button onClick={login} className="sign-in-btn">
            Sign in
          </button>
          </form>
          {/* <Form className="align-self-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group> */}
          
          {/* <Button variant="primary"  onClick={() => login()}>
          Login
        </Button>
        <Link to="/signup">
        <Button className="mx-3" variant="primary">
          Sign up
        </Button>
        </Link> */}
          {/* </Form> */}
        </div>
      </div>
    </>
  );
};

export default NormalLoginPage;
