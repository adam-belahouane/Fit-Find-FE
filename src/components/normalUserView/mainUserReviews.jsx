import { Col, Row } from "react-bootstrap"

const mainUserReviews = ({setView}) => {
  return (
    <Row className="mt-3 view-selector">
      <Col>
        <h2 onClick={() => setView("bookings")}>Bookings</h2>
      </Col>
      <Col>
        <h2 onClick={() => setView("products")}>
          Products
        </h2>
      </Col>
      <Col>
        <h2 className="selected" onClick={() => setView("Reviews")}>Reviews</h2>
      </Col>
    </Row>
  );
};

export default mainUserReviews
