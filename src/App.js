import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./components/loginPage";
import SignUpPage from "./components/SignUpPage";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import ProPage from "./components/proView/proPage";
import MyNavbar from "./components/myNavbar";
import HomePage from "./components/HomePage";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import NormalPage from "./components/normalUserView/normalPage";
import Confirmed from "./components/Confirmed";
import Cancel from "./components/Cancel";

const url = process.env.REACT_APP_BE_URL;

function App() {
  const isLoggedIn = useSelector((state) => state.login.isloggedin);
  const role = useSelector((state) => state.login.role);

  axios.defaults.withCredentials = true;

  const refreshAuthLogic = async (failedRequest) => {
    if (role === "normal") {
      try {
        await axios.post(`${url}/users/refreshToken`);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post(`${url}/proUser/refreshToken`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  createAuthRefreshInterceptor(axios, refreshAuthLogic);

  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/User/me/norm" element={<NormalPage />} />
        <Route path="/user/:userId" element={<ProPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/confirmed/:programId" element={<Confirmed />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </div>
  );
}

export default App;
