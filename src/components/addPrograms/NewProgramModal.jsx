import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProUserAction } from "../../actions";
import "../../styles/programModal.css";

const NewProgramModal = ({ setShow, show }) => {
  const url = process.env.REACT_APP_BE_URL;
  const dispatch = useDispatch()
  const [program, setProgram] = useState({
    title: "",
    description: "",
    paidcontent: "",
    price: "",
  });

  const handleProgramInput = (field, value) => {
    setProgram({
      ...program,
      [field]: value,
    });
  };

  const newProgram = async () => {
    try {
      let response = await axios.post(`${url}/program/newProgram`, program);

      if (response.status === 201) {
        console.log("success");
        setShow(false);
        dispatch(getProUserAction())
      } else {
        console.log("not success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!show) {
    return null;
  }
  return (
    <div className="modal" onClick={() => setShow(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">New Product</h4>
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
          <h4>Give your new product a title</h4>
          <div className="modal-body-header">
            <input
              type="text"
              placeholder="Title"
              value={program.title}
              onChange={(e) => handleProgramInput("title", e.target.value)}
            />
            <div className="pricecon">
              <p>Price: </p>
              <input
                type="text"
                placeholder="Price in pence"
                value={program.price}
                onChange={(e) => handleProgramInput("price", e.target.value)}
              />
            </div>
          </div>
          <h4>Description</h4>
          <textarea
            name="maincontent"
            id="maindescriptioncontent"
            placeholder="Give your product a description"
            value={program.description}
            onChange={(e) => handleProgramInput("description", e.target.value)}
          ></textarea>
          <h4>Paid content</h4>
          <textarea
            name="maincontent"
            id="maindescriptioncontent"
            placeholder="Give your product some content"
            value={program.paidcontent}
            onChange={(e) => handleProgramInput("paidcontent", e.target.value)}
          ></textarea>
          <div className="modal-footer">
            <div className="modal-btn-div">
            <button className="small-blue-btn" onClick={() => newProgram()}>
              Submit
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProgramModal;
