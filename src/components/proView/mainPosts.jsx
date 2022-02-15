import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "../../styles/proHeader.css";
import SinglePost from "../SinglePost";
import { useParams } from "react-router-dom";
import NewPost from "./posts/NewPost";
import { useSelector } from "react-redux";

const MainPosts = ({ setView }) => {
  const url = process.env.REACT_APP_BE_URL;
  const user = useParams().userId;
  const isloggedin = useSelector(state => state.login.isloggedin)
  const [proUser, setProUser] = useState([]);
  const [posts, setPosts] = useState([]);

  const getMe = async () => {
    try {
      let response = await fetch(url + "/proUser/me", {
        credentials: "include",
      });
      if (response.ok) {
        let data = await response.json();
        setProUser(data);
        setPosts(data.posts.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProUser = async () => {
    try {
      let response = await fetch(url + "/proUser/getProUser/" + user);
      if (response.ok) {
        let data = await response.json();
        setProUser(data);
        setPosts(data.posts.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    user === "me" ? getMe() : getProUser();
  }, [user]);

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
      {user === 'me' && isloggedin && <NewPost
        First={proUser.firstName}
        Last={proUser.lastname}
        avatar={proUser.avatar}
        getMe={getMe}
      />}
      {posts.map((post) => (
        <SinglePost
          key={post._id}
          First={proUser.firstName}
          Last={proUser.lastname}
          avatar={proUser.avatar}
          post={post}
        />
      ))}
    </>
  );
};

export default MainPosts;
