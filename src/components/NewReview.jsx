import Rating from "@mui/material/Rating";
import { useState } from "react";
import NewReviewModal from "./NewReviewModal";
const NewReview = () => {
  const [show, setShow] = useState(false)
  const[review, setReview] = useState({
    title: "",
    maintext: "",
    ratingNum: ""
  })

  const ratingChange = (newValue) => {
    setReview({
      ...review,
      ratingNum: newValue,
    });
    setShow(true)
  }
  return (
    <>
      <div className="addReview-div">
        <img src="https://icon-library.com/images/anonymous-person-icon/anonymous-person-icon-18.jpg" className="userImg-review" />
        <h6 className="write-review-btn" onClick={() => setShow(true)}>Write Review</h6>
        <Rating
          name="half-rating"
          Value={review.ratingNum}
          onChange={(event, newValue) => {
            ratingChange(newValue);
          }}
          precision={1}
          className="stars"
        />
      </div>

      <NewReviewModal show={show} setShow={setShow} review={review} setReview={setReview}/>
    </>
  );
};

export default NewReview;
