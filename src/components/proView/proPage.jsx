import ProHeader from "./proHeader";
import { useState } from "react";
import ProMain from "./proMain";
import "../../styles/post.css";
import RecommendUsers from "./recommedUsers";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProUserIdAction } from "../../actions/proUser";
import { getProUserAction } from "../../actions";

const ProPage = () => {
  const dispatch = useDispatch()
  const user = useParams().userId;

  useEffect(() => {
    user === "me"? dispatch(getProUserAction):dispatch(getProUserIdAction(user))
  }, [user]);
  return (
    <div className="main-con">
      <div className="main-profile-con">
        <div className="header-profile-con">
          <ProHeader />
          <ProMain />
        </div>
        <div className="recommed-users">
          <RecommendUsers />
        </div>
      </div>
    </div>
  );
};

export default ProPage;
