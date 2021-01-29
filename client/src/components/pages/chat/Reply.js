import React from "react";
const Reply = ({
  imgSrc = "http://placehold.it/100/ddd",
  time = "1 min ago",
  text,
}) => {
  return (
    <div className="reply d-flex justify-content-end">
      <div className="reply__text">
        <p>{text}</p>
      </div>
      <div className="d-flex flex-column" style={{ minWidth: 70 }}>
        <div
          className="responsive_img_container"
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        >
          <img className="reply__img rounded-circle" src={imgSrc} alt="" />
        </div>

        <small>{time}</small>
      </div>
    </div>
  );
};

export default Reply;
