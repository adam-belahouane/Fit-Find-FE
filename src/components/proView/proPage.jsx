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
  const url = process.env.REACT_APP_BE_URL;
  const user = useParams().userId;
  const [proUser, setProUser] = useState([]);

  const getMe = async () => {
    try {
      let response = await fetch(url + "/proUser/me", {
        credentials: "include",
      });
      if (response.ok) {
        let data = await response.json();
        setProUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProUser = async () => {
    try {
      let response = await fetch(url + "/proUser/getProUser/" + user);
      if (response.ok) {
        let data = await response.json();
        setProUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    user === "me"? dispatch(getProUserAction):dispatch(getProUserIdAction(user))
  }, [user]);
  return (
    <div className="main-con">
      <div className="main-profile-con">
        <div className="header-profile-con">
          <ProHeader data={proUser} />
          <ProMain data={proUser} />
        </div>
        <div className="recommed-users">
          <RecommendUsers />
        </div>
      </div>
    </div>
  );
};

export default ProPage;
