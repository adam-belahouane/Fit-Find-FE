import { useState } from "react";
import "../styles/login.css";
import Geocode from "react-geocode";
import { Col, Row } from "react-bootstrap";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const ProSignUpPage = ({ setView }) => {
  const url = process.env.REACT_APP_BE_URL;
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

  const handleSignUpInput = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  const handleSignupToServer = async () => {
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
      if (response.ok) {
        console.log("All Signed up");
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
            onClick={() => setView("normal")}
          >
            Normal
          </h2>
          <h2 className="view-selector-btn" id="selected"onClick={() => setView("pro")}>
            Pro
          </h2>
        </div>
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

          <div className="labelinput">
            <p className="label">Address</p>
            <input
              type="text"
              placeholder="Address"
              value={user.address}
              onChange={(e) => handleSignUpInput("address", e.target.value)}
            />
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
          <div className="labelinput">
            <p className="label">Job</p>
            <input
              type="text"
              placeholder="Job Role"
              value={user.jobrole}
              onChange={(e) => handleSignUpInput("jobrole", e.target.value)}
            />
          </div>
          <div className="labelinput">
            <p className="label">Bio</p>
            <textarea
              name=""
              id=""
              placeholder="A short description of you and your skills"
              value={user.bio}
              onChange={(e) => handleSignUpInput("bio", e.target.value)}
            ></textarea>
          </div>
          <button className="signup-btn" onClick={() => handleSignupToServer()}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default ProSignUpPage;
