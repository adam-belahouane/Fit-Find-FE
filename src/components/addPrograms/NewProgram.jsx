import { useState } from "react";
import NewProgramModal from "./NewProgramModal";

const NewProgram = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="post">
        <div className="userimg">
        </div>
        <div className="newprogrambtn" onClick={() => setShow(true)}>
          New Program
        </div>
      </div>
      <NewProgramModal setShow={setShow} show={show}/>
    </>
  );
};

export default NewProgram;
