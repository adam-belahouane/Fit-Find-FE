import "../styles/homepage.css";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

const MarkerDiv = ({
  First,
  Last,
  Job,
  bio,
  profilePic,
  RatingNum,
  userId,
}) => {
  return (
    <Link
      to={`/user/${userId}`}
      style={{ "textDecoration": "none", color: "unset" }}
    >
      <div className="marker-con">
        {profilePic ? (
          <img src={profilePic} className="marker-img" />
        ) : (
          <img src="https://via.placeholder.com/150" className="marker-img" />
        )}

        <h6 className="marker-name">{First + " " + Last}</h6>
        <p>{Job}</p>
        <p className="bio">{bio}</p>
        {RatingNum === 0 ? (
          <p>no ratings yet</p>
        ) : (
          <Rating
            className="marker-rating"
            defaultValue={RatingNum}
            readOnly
            size="small"
          />
        )}
      </div>
    </Link>
  );
};

export default MarkerDiv;
