import React from "react";
const JobDetailsCard = props => {
  return (
    <div className="jobDetailsCard">
      <div className="jobDetailsCard__header d-flex">
        <img className="vodafone-icon" src="images/vod.svg" alt="" />
        <div className="jobDetailsCard__header__text">
          <h5>Vodafone Egypt</h5>
          <p>telecom and communication company</p>
        </div>
      </div>
      <p>
        ras sit amet nibh libero, in gravida nulla. Nulla vel metusscelerisque
        ante sollicitudin Nulla vel metus scelerisque ante sollicitudin Cras sit
        amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
        sollicitudin Nulla vel metus scelerisque ante sollicitudin
      </p>
      <button className="btn btn-primary">show job details</button>
    </div>
  );
};

export default JobDetailsCard;
