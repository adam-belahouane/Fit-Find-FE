import { Col, Row } from "react-bootstrap";
import NewReview from "../NewReview";
import SingleReview from "./SingleReview";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const MainReviews = ({ setView }) => {
  const userme = useParams().userId;
  const { role, user} = useSelector(state => state.login)
  const {prouser} = useSelector(state => state.prouser)

  let reviews = userme === "me" ? user.reviews : prouser.reviews;
  

  useEffect(() => {
  }, [prouser])

  return (
    <>
      <Row className="mt-3 view-selector">
        <Col>
          <h2 onClick={() => setView("posts")}>Posts</h2>
        </Col>
        <Col>
          <h2 onClick={() => setView("products")}>Products</h2>
        </Col>
        <Col>
          <h2 className="selected" onClick={() => setView("Reviews")}>
            Reviews
          </h2>
        </Col>
      </Row>
      {role === "pro"?<></>:<NewReview />}
      {reviews && reviews.map((review) => (
        <SingleReview review={review} key={review._id} />
      ))}
    </>
  );
};

export default MainReviews;
