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
      let response = await fetch(`${url}/program/newProgram`, {
        method: "POST",
        body: JSON.stringify(program),
        headers: { "Content-Type": "application/json" },
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
  };

  if (!show) {
    return null;
  }
  return (
    <div className="modal" onClick={() => setShow(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">New Product</h4>
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
            <button className="button" onClick={() => newProgram()}>
              Submit
            </button>
            <button className="button" onClick={() => setShow(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProgramModal;
