import "../../styles/review.css";
import Rating from "@mui/material/Rating";
import dateDiff from "../../date/datefunction.js";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setProUserIdAction } from "../../actions";
import { getProUserIdAction } from "../../actions/proUser";
import axios from "axios";

const SingleReview = ({ review }) => {
  const { user } = useSelector((state) => state.login);
  const prouser = useParams().userId;
  const url = process.env.REACT_APP_BE_URL;
  const dispatch = useDispatch();

  const deleteReview = async () => {
    try {
      let response = await axios.delete(
        `${url}/reviews/newReview/${prouser}/${review._id}`
      );
      if (response.status === 200) {
        console.log("ok");
        dispatch(getProUserIdAction(prouser));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="review-div">
      <div>
        {review.user.avatar ?<img
          src={review.user.avatar}
          className="userImg-review"
        />:
        <img
          src="https://icon-library.com/images/anonymous-person-icon/anonymous-person-icon-18.jpg"
          className="userImg-review"
        />}
      </div>
      <div className="singlePost">
        <div className="headerOfPosts">
          <div className="textandimg">
            <div className="headerText-reviews">
              <h4>
                {review.user.firstName} {review.user.lastname}
              </h4>
            </div>
          </div>
          <div>
            {user._id === review.user._id && (
              <svg
                onClick={() => deleteReview()}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="red"
                class="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
            )}
          </div>
        </div>
        <div className="ratingandtitle">
          <h3 className="reviewtitle">{review.title}</h3>
          <Rating
            className="rating stars"
            name="read-only"
            value={review.ratingNum}
            readOnly
          />
        </div>
        <div className="postText">
          <p>{review.maintext}</p>
        </div>
        <p className="date">{dateDiff(review.createdAt)}</p>
      </div>
    </div>
  );
};

export default SingleReview;
