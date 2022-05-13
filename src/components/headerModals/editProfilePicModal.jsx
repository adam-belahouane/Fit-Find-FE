import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProUserAction } from "../../actions";

const EditProfilePicModal = ({show, setShow, avatar}) => {
    const[image, setImage] = useState(avatar)
    const [imageFile, setImageFile] = useState(null)
    const url = process.env.REACT_APP_BE_URL;
    const dispatch = useDispatch()
    const {role} = useSelector(state => state.login)

    const onImageChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]))
        setImageFile(e.target.files[0])
    }

    const handleUserImageUpdate = async() => {
        try {
            let formData = new FormData()
            formData.append("avatar", imageFile)
            
            let response = await fetch(url + "/proUser/profilePic/me", {
                method: "POST",
                body: formData,
                credentials: "include",
              });
              if (response.ok) {
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
          <h4 className="modal-title">Edit Profile Pic</h4>
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
            <div className="editpic-upload">
                {image?<img src={image} className="edit-user-Image" />:<img src="https://icon-library.com/images/anonymous-person-icon/anonymous-person-icon-18.jpg" className="edit-user-Image" />}
                <input type="file" onChange={(e) => onImageChange(e)} />
            </div>
        </div>
        <div className="modal-footer">
          <div className="modal-btn-div">
            <button className="small-blue-btn" onClick={handleUserImageUpdate}>Save</button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default EditProfilePicModal