import React from "react";
const ServicesCard = props => {
  return (
    <div className="servicesCard">
      <i className={props.icon}></i>
      
      <h4>{props.header}</h4>
      <p className="">
        {props.content}
      </p>
    </div>
  );
};

export default ServicesCard;
