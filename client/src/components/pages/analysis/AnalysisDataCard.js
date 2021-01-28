import React from "react";
const AnalysisDataCard = ({ title, info, src, loading, className }) => {
  return (
    <div className={`infoCard ${className}`}>
      {loading ? (
        <div className="flex-centered">
          <div className="spinner-border text-dark " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center">
          <div
            className="responsive_img_container mb-3"
            style={{ width: 50, height: 50 }}
          >
            <img className="infoCard__img" src={src} alt="" />
          </div>
          <h4 style={{ textTransform: "capitalize" }}>{title}</h4>
          <span>{info}</span>
        </div>
      )}
    </div>
  );
};

export default AnalysisDataCard;
