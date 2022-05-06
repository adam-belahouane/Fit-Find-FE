import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NewProgramModal from "./NewProgramModal";

const NewProgram = () => {
  const [show, setShow] = useState(false);
  const {user} = useSelector((state) => state.login)
  const {avatar} = user 
  return (
    <>
      <div className="addnewpost">
      <div className="userimg">
        <div className="img">
          {avatar ? (
            <img src={avatar} className="userImg" />
          ) : (
            <img src="https://via.placeholder.com/150" className="userImg" />
          )}
        </div>
      </div>
      <div className="newpostbtn" onClick={() => setShow(true)}>
          Upload a new product
      </div>
    </div>
      <NewProgramModal setShow={setShow} show={show}/>
    </>
  );
};

export default NewProgram;
