import "../../styles/recomended.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const RecommendUsers = () => {
  const url = process.env.REACT_APP_BE_URL;
  const [users, setUsers] = useState([]);
  const user = useParams().userId;

  const getAllProUsers = async () => {
    try {
      let response = await fetch(url + "/proUser/getAll");
      if (response.ok) {
        let data = await response.json();
        let filteredData = data.filter((d) => d._id !== user);
        setUsers(filteredData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProUsers();
  }, [user]);

  return (
    <div className="rec-users-list">
      {users.map((user) => (
        <Link to={`/user/${user._id}`} style={{ "text-decoration": "none", color: "unset" }} >
        <div className="rec-user">
          <img src={user.avatar} className="rec-img" />
          <div className="mx-2">
            <h5 className="rec-h5">{user.firstName} {user.lastname}</h5>
            <p className="rec-p">{user.jobrole}</p>
            <p className="rec-p">Westminster, London</p>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendUsers;
