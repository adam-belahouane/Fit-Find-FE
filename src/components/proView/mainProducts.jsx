import { Col, Row } from "react-bootstrap";
import SingleProduct from "../SingleProduct";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import NewProgram from "../addPrograms/NewProgram";
import { useParams } from "react-router-dom";

const MainProducts = ({ setView }) => {
  const id = useParams().userId;
  const { user, role, isloggedin } = useSelector((state) => state.login);
  const {prouser} = useSelector(state => state.prouser)

  return (
    <>
      <Row className="mt-3 view-selector">
        <Col>
          <h2 onClick={() => setView("posts")}>Posts</h2>
        </Col>
        <Col>
          <h2 className="selected" onClick={() => setView("products")}>
            Products
          </h2>
        </Col>
        <Col>
          <h2 onClick={() => setView("Reviews")}>Reviews</h2>
        </Col>
      </Row>
        {(id === 'me' || id === user._id) && isloggedin && <NewProgram/>}
      <div className="products-div">
        {isloggedin === true && role === "pro" && id === 'me'
          ? user.programs.map((program) => <SingleProduct program={program} />)
          : prouser.programs.map((program) => <SingleProduct program={program} />)}
      </div>
    </>
  );
};

export default MainProducts;
