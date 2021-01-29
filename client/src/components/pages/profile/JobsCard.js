import React from "react";
const JobCard = props => {
  return (
    <div className="jobCard">
      <img className="jobCard__img" src={props.img} alt="" />
      <h4>{props.header}</h4>
      <span>{props.span}</span>
    </div>
  );
};

export default JobCard;
