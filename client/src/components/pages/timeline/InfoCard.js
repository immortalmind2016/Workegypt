import React from "react";
const JobCard = ({ title, info, src, loading }) => {
  return (
    <div className="infoCard">
      {loading ? (
        <div className="flex-centered">
          <div className="spinner-border text-dark " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <img className="infoCard__img" src={src} alt="" />
          <h4>{title}</h4>
          <span>{info}</span>
        </>
      )}
    </div>
  );
};

export default JobCard;
