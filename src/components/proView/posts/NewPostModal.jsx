import { useState } from "react";

const NewPostModal = ({ first, last, avatar, setShow, show, getMe }) => {
  const url = process.env.REACT_APP_BE_URL;
  const [text, setText] = useState("");

  const newPost = async () => {
      const body = {
          text : text
      }
    try {
      let response = await fetch(`${url}/posts/newPosts`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      });

      if(response.ok) {
          console.log('success')
          setShow(false)
          getMe()
      } else {
          console.log('not success')
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!show) {
    return null;
  } else {
    return (
      <div className="modal" onClick={() => setShow(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">Create a post</h4>
          </div>
          <div className="modal-body">
            <div className="modal-body-header-posts">
              <div className="userimg">
                <div className="img">
                  {avatar ? (
                    <img src={avatar} className="userImg" />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150"
                      className="userImg"
                    />
                  )}
                </div>
              </div>
              <div className="modal-post-text">
                <h5>
                  {first} {last}
                </h5>
              </div>
            </div>
            <textarea
              name="maincontent"
              id="mainpostcontent"
              placeholder="What would you like to post"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button className="button" onClick={() => newPost()}>
            Submit
          </button>
            <button className="button" onClick={() => setShow(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default NewPostModal;
