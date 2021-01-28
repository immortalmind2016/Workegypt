import React from "react";
import { NavLink } from "react-router-dom";
const Contact = ({
  remoteUserID,
  remoteUserName = "chat client",
  remoteUserImg = "http://placehold.it/100/100",
}) => {
  return (
    <NavLink
      to={`/chat/${remoteUserID}`}
      activeClassName="active"
      className="contact d-flex nav-link "
      style={{ color: "#333" }}
    >
      <div
        className="responsive_img_container"
        style={{
          width: 30,
          height: 30,
          border: "1px solid #DDD",
          borderRadius: "50%",
        }}
      >
        <img
          className="rounded-circle w-100 h-100"
          src={remoteUserImg}
          alt=""
        />
      </div>
      <h4 className=" d-md-block d-none">{remoteUserName}</h4>
    </NavLink>
  );
};

export default Contact;
