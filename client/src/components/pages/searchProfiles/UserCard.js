import React from "react";
import { Link } from "react-router-dom";
const UserCard = ({
  username = "",
  userImg = "http://via.placeholder.com/100",
  userId,
}) => {
  return (
    <div className="card">
      <img className="card-img-top" src={userImg} alt="image" />
      <div className="card-body">
        <h3 className="card-title">{username}</h3>
        <Link to={`/profile/${userId}`} className="btn btn-primary">
          Show Profile
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
