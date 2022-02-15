import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserAction } from "../../actions";
import RecommendUsers from "../proView/recommedUsers";
import NormalHeader from "./normalHeader";
import NormalMain from "./normalMain";

const NormalPage = () => {
  const url = process.env.REACT_APP_BE_URL;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  return (
    <div className="main-con">
      <div className="main-profile-con">
        <div className="header-profile-con">
          <NormalHeader data={user} />
          <NormalMain data={user} />
        </div>
        <div className="recommed-users">
          <RecommendUsers />
        </div>
      </div>
    </div>
  );
};

export default NormalPage;
