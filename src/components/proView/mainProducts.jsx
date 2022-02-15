import { Col, Row } from "react-bootstrap";
import SingleProduct from "../SingleProduct";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import NewProgram from "../addPrograms/NewProgram";
import { useParams } from "react-router-dom";

const MainProducts = ({ setView, data }) => {
  const id = useParams().userId;
  const programs = data.programs;
  const { user, role, isloggedin } = useSelector((state) => state.login);

  useEffect(() => {}, []);
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
        {role === "pro" && isloggedin === true && id === "me" &&<NewProgram/>}
      <div className="products-div">
        {isloggedin === true && role === "pro"
          ? user.programs.map((program) => <SingleProduct program={program} />)
          : programs.map((program) => <SingleProduct program={program} />)}
      </div>
    </>
  );
};

export default MainProducts;
