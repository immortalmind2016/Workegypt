import React from "react";
const HomeCard = props => {
  return (
    <div className="col-12 col-sm-6 col-md-3">
      <div className="homeCard">
        <img className="homeCard__img" src={props.cardImg} alt="" />
        <h3>{props.cardHeader}</h3>
        <p className="">
          ras sit amet nibh libero, in gravida nulla. Nulla vel metusscelerisque
          ante sollicitudin Nulla vel metus scelerisque
        </p>
      </div>
    </div>
  );
};

export default HomeCard;
