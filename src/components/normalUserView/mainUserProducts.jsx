import { Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import SingleProduct from "../SingleProduct"

const MainUserProducts = ({ setView, data }) => {
    const user = useSelector(state => state.login.user)
    const programs = user.programs

    return(
        <>
        <Row className="mt-3 view-selector">
            <Col>
            <h2 onClick={() => setView("bookings")}>Bookings</h2>
            </Col>
            <Col>
            <h2  className="selected" onClick={() => setView("products")}>Products</h2>
            </Col>
            <Col>
            <h2 onClick={() => setView("Reviews")}>Reviews</h2>
            </Col>
        </Row>

        <div className="products-div">
        {
            programs && programs.map((program)=>
            <SingleProduct program={program} key={program._id}/>)
        }
        </div>
        </>
    )
}

export default MainUserProducts