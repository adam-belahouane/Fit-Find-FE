import { Col, Row } from "react-bootstrap";
import "../../styles/proHeader.css";
import SinglePost from "../SinglePost";
import { useParams } from "react-router-dom";
import NewPost from "./posts/NewPost";
import { useDispatch, useSelector } from "react-redux";

const MainPosts = ({ setView }) => {
  const proUserId = useParams().userId;
  const isloggedin = useSelector(state => state.login.isloggedin)
  const { prouser } = useSelector((state) => state.prouser);
  const { role, user} = useSelector(state => state.login)

  let postsr = proUserId === "me" ? user.posts : prouser.posts;
  const posts = [...postsr].reverse()

  return (
    <>
      <Row className="mt-3 view-selector">
        <Col>
          <h2 className="selected" onClick={() => setView("posts")}>
            Posts
          </h2>
        </Col>
        <Col>
          <h2 onClick={() => setView("products")}>Products</h2>
        </Col>
        <Col>
          <h2 onClick={() => setView("Reviews")}>Reviews</h2>
        </Col>
      </Row>
      {proUserId === 'me' && isloggedin && <NewPost
        First={prouser.firstName}
        Last={prouser.lastname}
        avatar={prouser.avatar}
      />}
      {posts.length > 0 && posts.map((post) => (
        <SinglePost
          key={post._id}
          First={prouser.firstName}
          Last={prouser.lastname}
          avatar={prouser.avatar}
          post={post}
        />
      ))}
    </>
  );
};

export default MainPosts;
