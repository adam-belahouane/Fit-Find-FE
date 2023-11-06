import "../../styles/proHeader.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import EditHeaderPicModal from "../headerModals/editHeaderPicModal";
import EditProfilePicModal from "../headerModals/editProfilePicModal";
import EditNormalProfileInfoModal from "../headerModals/editNormalProfileInfoModal";

const NormalHeader = ({ data }) => {
  const { user, isloggedin } = useSelector((state) => state.login);
  const [show, setShow] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showPic, setShowPic] = useState(false);
  const { firstName, lastname, city, avatar, headercolor } = data;

  return (
    <>
      <div className="top-header" style={{ "backgroundColor": headercolor }}>
        {isloggedin && (
          <div className="top-header-pencil">
            <button
              className="edit-header-pic"
              onClick={() => setShowHeader(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </button>
            <EditHeaderPicModal
              showHeader={showHeader}
              setShowHeader={setShowHeader}
            />
          </div>
        )}
      </div>
      <div className="Pro-user-con">
        <div className="img-text">
        {avatar ? (
            isloggedin ? <img onClick={() => setShowPic(true)} style={{"cursor": "pointer"}} src={avatar} className="Pro-user-Image" /> : <img src={avatar} className="Pro-user-Image" />
          ) : (
            <img
              style={{"cursor": "pointer"}}
              onClick={() => setShowPic(true)}
              src="https://icon-library.com/images/anonymous-person-icon/anonymous-person-icon-18.jpg"
              className="Pro-user-Image"
            />
          )}
          { isloggedin &&
          <EditProfilePicModal show={showPic} setShow={setShowPic} avatar={avatar} />}
          { isloggedin &&
          <div className="edit-header-info">
            <button className="edit-header-info-btn" onClick={() => setShow(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
          </button>
          </div>}
          <EditNormalProfileInfoModal show={show} setShow={setShow}/>
          <div className="mx-2">
            <h2 className="proheader-name">
              {firstName} {lastname}
            </h2>
            <h6 className="proheader-location">{city}</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default NormalHeader;
