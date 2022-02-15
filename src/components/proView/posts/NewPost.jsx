import { useState } from "react";
import NewPostModal from "./NewPostModal";

const NewPost = ({ First, Last, avatar, getMe }) => {
    const [show, setShow] = useState(false)
  return (
      <>
    <div className="post">
      <div className="userimg">
        <div className="img">
          {avatar ? (
            <img src={avatar} className="userImg" />
          ) : (
            <img src="https://via.placeholder.com/150" className="userImg" />
          )}
        </div>
      </div>
      <div className="newpostbtn" onClick={() => setShow(true)}>
          New Post
      </div>
    </div>
    <NewPostModal first={First} last={Last} avatar={avatar} show={show} setShow={setShow} getMe={getMe}  />

    </>
  );
};

export default NewPost;
