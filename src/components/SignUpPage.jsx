import ProSignUpPage from "./ProSignUpPage";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import NormalSignUpPage from "./NormalSignUpPage";

const SignUpPage = () => {
  const [view, setView] = useState("normal");

  if(view === "pro"){
    return <ProSignUpPage setView={setView} />;
  } else {
      return <NormalSignUpPage setView={setView} />
  }
 
};

export default SignUpPage;
