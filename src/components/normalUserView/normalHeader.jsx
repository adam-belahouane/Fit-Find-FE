import "../../styles/proHeader.css";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditProfileInfoModal from "../headerModals/editProfileInfoModal";
import EditHeaderPicModal from "../headerModals/editHeaderPicModal";
import EditProfilePicModal from "../headerModals/editProfilePicModal";

const NormalHeader = ({ data }) => {
  const userme = useParams().userId;
  const { prouser } = useSelector((state) => state.prouser);
  const { user, isloggedin } = useSelector((state) => state.login);
  const [show, setShow] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showPic, setShowPic] = useState(false);
  const [headerColor, setHeaderColor] = useState("#4385f5");
  const { firstName, lastname, avatar, city } = data;
  return (
    <>
      <div className="top-header" style={{ "background-color": headerColor }}>
        {userme === "me" && isloggedin && (
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
                class="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </button>
            <EditHeaderPicModal
              showHeader={showHeader}
              setShowHeader={setShowHeader}
              setHeaderColor={setHeaderColor}
            />
          </div>
        )}
      </div>
      <div className="Pro-user-con">
        <div className="img-text">
          {avatar ? (
            <img src={avatar} className="Pdro-user-Image" />
          ) : (
            <img
              src="https://icon-library.com/images/anonymous-person-icon/anonymous-person-icon-18.jpg"
              className="Pro-user-Image"
            />
          )}
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
