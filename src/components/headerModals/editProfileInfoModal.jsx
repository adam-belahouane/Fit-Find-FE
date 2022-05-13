import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProUserAction } from "../../actions";

const EditProfileInfoModal = ({ show, setShow }) => {
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch()
  let { firstName, lastname, jobrole, bio, _id } = user;
  const url = process.env.REACT_APP_BE_URL;
  const [userInfo, setUserInfo] = useState({
    firstName: firstName,
    lastname: lastname,
    jobrole: jobrole,
    bio: bio,
  });

  const handleUserInfoEdit = (field, value) => {
    setUserInfo({
      ...userInfo,
      [field]: value,
    });
  };

  const handleEditUserInfo = async () => {
    try {
        let response = await axios.put(url + "/proUser/me", userInfo);
          if (response.status === 200) {
            console.log("success");
            setShow(false);
            dispatch(getProUserAction())
          } else {
            console.log("not success");
          }
    } catch (error) {
        console.log(error);
    }
  }
  if (!show) {
    return null;
  }
  return (
    <div className="modal" onClick={() => setShow(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Edit Info</h4>
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
          <div className="inputnlabel">
            <h3 className="infolabel">First name</h3>
            <input
              type="text"
              className="editinfoinput"
              value={userInfo.firstName}
              onChange={(e) => handleUserInfoEdit("firstName", e.target.value)}
            />
          </div>
          <div className="inputnlabel">
            <h3 className="infolabel">Last name</h3>
            <input 
            type="text" className="editinfoinput" value={userInfo.lastname} onChange={(e) => handleUserInfoEdit("lastname", e.target.value)} />
          </div>
          <div className="inputnlabel">
            <h3 className="infolabel">Profession</h3>
            <input 
            type="text" className="editinfoinput" value={userInfo.jobrole} onChange={(e) => handleUserInfoEdit("jobrole", e.target.value)} />
          </div>
          <div className="inputnlabel">
            <h3 className="infolabel">Bio</h3>
            <input 
            type="text" className="editinfoinput" value={userInfo.bio} onChange={(e) => handleUserInfoEdit("bio", e.target.value)} />
          </div>
        </div>
        <div className="modal-footer">
          <div className="modal-btn-div">
            <button className="small-blue-btn" onClick={handleEditUserInfo}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileInfoModal;
