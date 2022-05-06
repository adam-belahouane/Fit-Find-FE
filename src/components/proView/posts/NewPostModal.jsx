import { useState } from "react";

const NewPostModal = ({ first, last, avatar, setShow, show, getMe }) => {
  const url = process.env.REACT_APP_BE_URL;
  const [text, setText] = useState("");

  const newPost = async () => {
    const body = {
      text: text,
    };
    try {
      let response = await fetch(`${url}/posts/newPosts`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        console.log("success");
        setShow(false);
        getMe();
      } else {
        console.log("not success");
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
            <div onClick={() => setShow(false)} className="close-div">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                />
                <path
                  fill-rule="evenodd"
                  d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                />
              </svg>
            </div>
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
            <div className="modal-btn-div">
            <button disabled={!text} className="small-blue-btn" onClick={() => newPost()}>
              Post
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default NewPostModal;
