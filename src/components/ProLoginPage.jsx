import { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProUserAction, setIsLoggedInAction, setRoleAction } from "../actions";

const ProLoginPage = ({setView}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const url = process.env.REACT_APP_BE_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const details = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch(`${url}/proUser/login`, {
        method: 'POST',
        body: JSON.stringify(details),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      })
      if (response.ok) {
        console.log('ok');
        dispatch(setIsLoggedInAction(true))
        dispatch(setRoleAction('pro'))
        dispatch(getProUserAction())
        navigate('/user/me', {replace: true})
      }
    } catch (error) {
      console.log(error);
      alert("Wrong credentials, try again!");
    }
  };

    return(
        <>
        <Row className="mt-3 view-selector">
            <Col>
            <h2 onClick={() => setView("normal")}>Normal</h2>
            </Col>
            <Col>
            <h2 className="selected" onClick={() => setView("pro")}>Pro</h2>
            </Col>
        </Row>
        <div className="con">
    <div
      className="signup-con"
    >
      <Form className="align-self-center">
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
        </Form.Group>
        <Button variant="primary"  onClick={() => login()}>
          Login
        </Button>
        <Link to="/signup">
        <Button className="mx-3" variant="primary">
          Sign up
        </Button>
        </Link>
      </Form>
    </div>
    </div>
    </>
    )
}

export default ProLoginPage