import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setRedirectAction } from "../actions";
import dateDiff from "../date/datefunction.js"

const SingleProduct = ({ program }) => {
  const navigate = useNavigate();
  const { price, title, description, _id, paidcontent, createdAt } = program;
  const url = process.env.REACT_APP_BE_URL;
  const prouser = useParams().userId;
  const { role, isloggedin, user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [owned, setOwned] = useState(false);

  const b = {
    title: title,
    price: price,
    id: _id,
  };

  const buyProgram = async () => {
    dispatch(setRedirectAction(prouser))
    try {
      let response = await fetch(`${url}/program/payForProgram`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(b),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        let data = await response.json();
        window.location = data.url;
        console.log("ok");
      } else {
        console.log("!!!!!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRedirect = () => {
    dispatch(setRedirectAction(prouser));
    navigate("/login");
  };

  useEffect(() => {
    if (user.programs && user.programs.map((p) => p._id).indexOf(_id) !== -1) {
      setOwned(true);
    } else {
      setOwned(false);
    }
  }, []);

  if (isloggedin === false) {
    return (
      <>
        <div className="product-div">
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="productNotOwned">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-lock"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
            </svg>
          </div>
          <div className="program-footer">
            <h6 style={{"color": "gray"}}>{dateDiff(createdAt)}</h6>
            <div className="btnandprice">
              <div className="programbtn" onClick={() => handleRedirect()}>
                Login
              </div>
              <p className="programprice">£{price / 100}</p>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="product-div">
          <h2>{title}</h2>
          <p>{description}</p>
          {owned === false ? (
            <div className="productNotOwned">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-lock"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
              </svg>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: paidcontent }}></div>
          )}
          <div className="program-footer">
            <h6 style={{"color": "gray"}}>{dateDiff(createdAt)}</h6>
            <div className="btnandprice">
              {owned === true ? (
                <></>
              ) : (
                <div className="programbtn" onClick={() => buyProgram()}>
                  Buy
                </div>
              )}
              <p className="programprice">£{price / 100}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default SingleProduct;
