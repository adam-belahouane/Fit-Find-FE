import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../styles/post.css";
import dateDiff from "../date/datefunction.js";
import { useState } from "react";
import axios from "axios";
import { getProUserAction } from "../actions";

const SinglePost = ({ First, Last, avatar, post }) => {
  const user = useParams().userId;
  const isLoggedIn = useSelector((state) => state.login.isloggedin);
  const [isListOpen, setIsListOpen] = useState(false);
  const url = process.env.REACT_APP_BE_URL;
  const dispatch = useDispatch()

  const handleDeletePost = async() => {
    let res = await axios.delete(`${url}/posts/post/${post._id}`)
    if (res.status === 200) {
      console.log("success");
      dispatch(getProUserAction())
    } else {
      console.log("not success");
    }
  }
  return (
    <>
      <div className="userandname">
        <div className="textandname">
          <div className="img">
            {avatar ? (
              <img src={avatar} className="userImg" />
            ) : (
              <img
                src="https://icon-library.com/images/anonymous-person-icon/anonymous-person-icon-18.jpg"
                className="userImg"
              />
            )}
          </div>
          <div className="headerText">
            <h2>
              {First} {Last}
            </h2>
          </div>
        </div>
        <div>
          {user === "me" && isLoggedIn === true && (
            <h3 className="dotdot" onClick={() => setIsListOpen(!isListOpen)}>
              ...
            </h3>
          )}
          {isListOpen && (
            <div>
              <p onClick={handleDeletePost}>delete</p>
              <p>something else</p>
            </div>
          )}
        </div>
      </div>
      <div className="post">
        <div className="postText">
          <p>{post.text}</p>
        </div>
      </div>
      <div className="postImgDiv">
        {post.img_url ? <img src={post.img_url} className="postImg" /> : <></>}
      </div>
      <div className="dateposted">
        <h6 style={{ color: "gray" }}>{dateDiff(post.createdAt)}</h6>
      </div>
    </>
  );
};

export default SinglePost;
