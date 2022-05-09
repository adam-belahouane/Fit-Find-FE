import { useState } from "react";

const EditHeaderPicModal = ({ showHeader, setShowHeader, setHeaderColor }) => {
    const [color, setColor] = useState()

    const onColorPickerChange = (e) => {
        setColor(e.target.value);
    }

    const handleHeaderChange = () => {
        setHeaderColor(color)
        setShowHeader(false)
    }
  if (!showHeader) {
    return null;
  }
  return (
    <div className="modal" onClick={() => setShowHeader(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Edit Banner</h4>
          <div onClick={() => setShowHeader(false)} className="close-div">
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
            <input type="color" className="edit-header-img" onChange={(e) => onColorPickerChange(e)} />
        </div>
        <div className="modal-footer">
          <div className="modal-btn-div">
            <button className="small-blue-btn" onClick={handleHeaderChange}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHeaderPicModal;
