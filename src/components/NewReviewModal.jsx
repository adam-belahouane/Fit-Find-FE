import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setRedirectAction } from "../actions";
import { getProUserIdAction } from "../actions/proUser";

const NewReviewModal = ({
  show,
  setShow,
  value,
  setValue,
  review,
  setReview,
}) => {
  const isloggedin = useSelector((state) => state.login.isloggedin);
  const role = useSelector((state) => state.login.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_BE_URL;
  const user = useParams().userId;

  const handleReviewInput = (field, value) => {
    setReview({
      ...review,
      [field]: value,
    });
  };

  const newReview = async () => {
    console.log(review);

    const response = await fetch(`${url}/reviews/newReview/${user}`, {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      console.log("success");
      setShow(false);
      dispatch(getProUserIdAction(user));
    } else {
      console.log("try again");
    }
  };

  const handleRedirect = () => {
    dispatch(setRedirectAction(user));
    navigate("/login");
  };
  if (!show) {
    return null;
  }
  return (
    <div className="modal" onClick={() => setShow(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">New Review</h4>
          <div onClick={() => setShow(false)} className="close-div">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
              />
              <path
                fillRule="evenodd"
                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
              />
            </svg>
          </div>
        </div>
        <div className="modal-body">
          <h4>Give your review a title</h4>
          <div className="modal-body-header">
            <input
              type="text"
              placeholder="Title"
              value={review.title}
              onChange={(e) => handleReviewInput("title", e.target.value)}
            />
            <Rating
              className="modal-rating stars"
              name="half-rating"
              defaultValue={review.ratingNum}
              value={review.ratingNum}
              onChange={(e, newValue) => {
                handleReviewInput("ratingNum", e.target.value);
              }}
              precision={1}
            />
          </div>
          <h4>Tell us what you think</h4>
          <textarea
            name="maincontent"
            id="mainreviewcontent"
            placeholder="Write your review"
            value={review.maintext}
            onChange={(e) => handleReviewInput("maintext", e.target.value)}
          ></textarea>
        </div>
        <div className="modal-footer">
          <div className="modal-btn-div">
          {isloggedin === true && role === "normal" ? (
            <button className="small-blue-btn" onClick={() => newReview()}>
              Submit
            </button>
          ) : (
            <button className="small-blue-btn" onClick={() => handleRedirect()}>
              Login
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReviewModal;
