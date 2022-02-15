import "../../styles/proHeader.css";
import Button from "react-bootstrap/Button";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProHeader = () => {
  const userme = useParams().userId;
  const { prouser } = useSelector((state) => state.prouser);
  const { user } = useSelector((state) => state.login);

  let { firstName, lastname, jobrole, overallreview, avatar } =
    userme === "me" ? user : prouser;

  useEffect(() => {}, [prouser]);

  return (
    <div className="Pro-user-con">
      <div className="img-text">
        {avatar ? (
          <img src={avatar} className="Pro-user-Image" />
        ) : (
          <img
            src="https://via.placeholder.com/150"
            className="Pro-user-Image"
          />
        )}
        <div className="mx-2">
          <h2>
            {firstName} {lastname}
          </h2>
          <h6>{jobrole}</h6>
          <h6>Westminster, London</h6>
        </div>
      </div>
      <div className="rating-div">
        <h2>Rating</h2>
        <div>
          {overallreview === 0 ? (
            <h6>No reviews yet</h6>
          ) : (
            <Rating
              name="read-only"
              value={Math.round(overallreview)}
              readOnly
              size="small-medium"
            />
          )}
        </div>
        <div className="btn-con">
          {/* <Button>Message</Button> */}
          <Button>Booking</Button>
        </div>
      </div>
    </div>
  );
};

export default ProHeader;
