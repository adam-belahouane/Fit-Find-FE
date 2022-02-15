import { Col, Row } from "react-bootstrap";
import { useState } from "react";

const NormalSignUpPage = ({ setView }) => {
  const url = process.env.REACT_APP_BE_URL;
  const [user, setUser] = useState({
    firstName: "",
    lastname: "",
    city: "London",
    email: "",
    password: "",
    bio: "",
    role: "normal",
  });

  const handleSignUpInput = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  const handleSignupToServer = async () => {
    try {
      let response = await fetch(url + "/users/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        console.log("All Signed up");
      }
    } catch (error) {
      console.log(error);
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
          <div className="flexrow">
            <div className="labelinput">
              <p className="label">First Name</p>
              <input
                type="text"
                placeholder="First Name"
                value={user.firstName}
                onChange={(e) => handleSignUpInput("firstName", e.target.value)}
              />
            </div>
            <div className="labelinput">
              <p className="label">Last Name</p>
              <input
                type="text"
                placeholder="Last Name"
                value={user.lastname}
                onChange={(e) => handleSignUpInput("lastname", e.target.value)}
              />
            </div>
          </div>
          <div className="flexrow">
            <div className="labelinput">
              <p className="label">Email</p>
              <input
                type="text"
                placeholder="Email"
                value={user.email}
                onChange={(e) => handleSignUpInput("email", e.target.value)}
              />
            </div>
            <div className="labelinput">
              <p className="label">Password</p>
              <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => handleSignUpInput("password", e.target.value)}
              />
            </div>
          </div>
          <button className="signup-btn" onClick={() => handleSignupToServer()}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default NormalSignUpPage;
