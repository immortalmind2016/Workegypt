import React from "react";
const Mymessage = ({
  imgSrc = "http://placehold.it/100/ddd",
  time = "1 min ago",
  text,
}) => {
  return (
    <div className="my-message d-flex">
      <div className="d-flex flex-column" style={{ minWidth: 70 }}>
        <div
          className="responsive_img_container"
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        >
          <img
            className="message__img"
            width={"100%"}
            height={"100%"}
            src={imgSrc}
            alt=""
          />
        </div>
        <small>{time}</small>
      </div>

      <div className="my-message__text">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Mymessage;
