import { useSelector } from "react-redux";

const EditProfileInfoModal = ({show, setShow}) => {
    const{ user } = useSelector((state) => state.login)
    let { firstName, lastname, jobrole, bio } = user
    if (!show) {
        return null;
      }
    return(
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
                        <input type="text" className="editinfoinput" value={firstName} />
                    </div>
                    <div className="inputnlabel">
                        <h3 className="infolabel">Last name</h3>
                        <input type="text" className="editinfoinput" value={lastname} />
                    </div>
                    <div className="inputnlabel">
                        <h3 className="infolabel">Profession</h3>
                        <input type="text" className="editinfoinput" value={jobrole} />
                    </div>
                    <div className="inputnlabel">
                        <h3 className="infolabel">Bio</h3>
                        <input type="text" className="editinfoinput" value={bio} />
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="modal-btn-div">
                        <button className="small-blue-btn">
                        Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfileInfoModal