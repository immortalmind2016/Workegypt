import React from "react";
const Speaker = ({
  speakerName = "speaker",
  speakerInfo = "",
  speakerImgUrl = "http://placehold.it/100/ddd"
}) => {
  return (
    <div className="speaker w-100 d-flex justify-content-center flex-column align-items-center">
      <div
        className="responsive_img_container"
        style={{ width: 75, height: 75, borderRadius: "50%" }}
      >
        <img
          className="speaker__img rounded-circle"
          src={speakerImgUrl || "http://placehold.it/100/ddd"}
          alt=""
        />
      </div>
      <h4>{speakerName}</h4>
      <p className="">{speakerInfo}</p>
    </div>
  );
};

export default Speaker;
